import { execSync } from "child_process";
import fs from "fs";
import path from "path";
// Sanitize-html is used to prevent XSS attacks by cleaning user input
import sanitizeHtml from "sanitize-html";

// Cache for storing blog posts to improve performance
let cachedPosts: BlogPost[] | null = null;
let lastCacheUpdate = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL

const postsDirectory = path.join(process.cwd(), "app/(content)/blog/posts");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  firstPosted?: string;
  lastEdited?: string;
  tags: string[];
  readingTime?: string;
  content?: string | Record<string, unknown>;
}

export interface TableOfContents {
  id: string;
  title: string;
  level: number;
}

/**
 * Sanitizes URL slugs to prevent path traversal attacks and ensure valid URLs.
 * This is crucial for security as slugs are used in file paths and URLs.
 * - Prevents directory traversal attacks by removing path-breaking characters
 * - Ensures consistent URL-safe format
 */
export function sanitizeSlug(slug: string): string {
  return slug.replace(/[^a-zA-Z0-9-_]/g, "").toLowerCase();
}

/**
 * Sanitizes tags to prevent XSS attacks and ensure consistent formatting.
 * - Removes all HTML tags to prevent script injection
 * - Removes special characters that could be used for attacks
 * - Ensures tags are URL-safe and consistently formatted
 */
export function sanitizeTag(tag: string): string {
  const sanitizedTag = sanitizeHtml(tag, {
    allowedTags: [], // Blocks all HTML tags to prevent XSS
    allowedAttributes: {}, // Blocks all HTML attributes
  }).replace(/[^a-zA-Z0-9-_]/g, "-");
  return sanitizedTag.toLowerCase();
}

/**
 * Calculate estimated reading time for a piece of content
 * @param {string} content - The text content to analyze
 * @returns {string} Estimated reading time in minutes (e.g. "5 min read")
 */
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Generate table of contents from markdown content
 * @param {string} content - The markdown content to parse for headings
 * @returns {TableOfContents[]} Array of heading objects containing id, title and heading level
 */
export function generateTableOfContents(content: string): TableOfContents[] {
  const headingRegex = /^#{1,6}\s+(.+?)$/gm;
  const toc: TableOfContents[] = [];

  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const title = match[1];
    const level = match[0].indexOf(" ");
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    toc.push({ id, title, level });
  }

  return toc;
}

/**
 * Get array of all blog post slugs
 * @returns {string[]} Array of blog post slugs (filenames without .mdx extension)
 */
export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => fileName.replace(/\.mdx$/, ""));
}

/**
 * Get git history dates for a file
 * @param {string} filePath - Path to the file
 * @returns {{ firstPosted: string, lastEdited: string }} Object containing the first commit and last modified dates
 */
function getGitDates(filePath: string): {
  firstPosted: string;
  lastEdited: string;
} {
  try {
    // Get the first commit date (creation date)
    const firstCommit = execSync(
      `git log --follow --format=%aI --reverse "${filePath}" | head -n 1`,
      { encoding: "utf-8" }
    ).trim();

    // Get the last commit date (last modified)
    const lastCommit = execSync(`git log -1 --format=%aI "${filePath}"`, {
      encoding: "utf-8",
    }).trim();

    return {
      firstPosted: firstCommit || new Date().toISOString(),
      lastEdited: lastCommit || new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error getting git dates:", error);

    // If git commands fail or file isn't in git, return current date for both
    const now = new Date().toISOString();
    return {
      firstPosted: now,
      lastEdited: now,
    };
  }
}

/**
 * Gets all blog posts with metadata. Implements caching for performance.
 * - Caches results to avoid frequent filesystem reads
 * - Sanitizes all user-generated content to prevent XSS
 * - Validates file paths to prevent directory traversal
 */
export function getAllPosts(): BlogPost[] {
  // Return cached posts if they're still valid
  if (cachedPosts && Date.now() - lastCacheUpdate < CACHE_TTL) {
    return cachedPosts;
  }

  // Ensure we're only reading from the designated posts directory
  const normalizedPostsDirectory = path.normalize(postsDirectory);
  if (!fs.existsSync(normalizedPostsDirectory)) {
    throw new Error("Posts directory does not exist");
  }

  const fileNames = fs.readdirSync(normalizedPostsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith(".mdx"))
    .map(fileName => {
      const slug = sanitizeSlug(fileName.replace(/\.mdx$/, ""));
      const fullPath = path.join(normalizedPostsDirectory, fileName);

      // Security: Validate the full path is within the posts directory
      const normalizedFullPath = path.normalize(fullPath);
      if (!normalizedFullPath.startsWith(normalizedPostsDirectory)) {
        throw new Error(
          "Invalid file path detected - possible path traversal attempt"
        );
      }

      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Extract metadata using a safer regex pattern
      const metadataMatch = fileContents.match(
        /export\s+const\s+metadata\s*=\s*({[\s\S]*?});/
      );

      if (!metadataMatch?.[1]) {
        throw new Error(`No metadata found in ${fileName}`);
      }

      try {
        // Parse metadata safely as JSON instead of using eval
        const metadata = JSON.parse(
          metadataMatch[1]
            .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2": ') // Ensure valid JSON property names
            .replace(/'/g, '"')
            .replace(/,(\s*[}\]])/g, "$1")
        );

        // Sanitize all user-provided content
        const title = sanitizeHtml(metadata.title || "", {
          allowedTags: [],
          allowedAttributes: {},
        });
        const description = sanitizeHtml(metadata.description || "", {
          allowedTags: [],
          allowedAttributes: {},
        });
        const date = new Date(metadata.date).toISOString();
        const tags = (metadata.tags || []).map(sanitizeTag);

        const gitDates = getGitDates(fullPath);

        return {
          slug,
          title,
          description,
          date,
          firstPosted: gitDates.firstPosted,
          lastEdited: gitDates.lastEdited,
          tags,
          readingTime: getReadingTime(fileContents),
        };
      } catch (error) {
        console.error(`Error parsing metadata in ${fileName}:`, error);
        throw new Error(`Invalid metadata format in ${fileName}`);
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Update cache
  cachedPosts = allPosts;
  lastCacheUpdate = Date.now();

  return allPosts;
}
