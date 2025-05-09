import { execSync } from "child_process";
import fs from "fs";
import path from "path";
// Sanitize the tag parameter
import sanitizeHtml from "sanitize-html";

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

// Sanitize URL parameters
export function sanitizeSlug(slug: string): string {
  // Only allow alphanumeric characters, hyphens, and underscores
  return slug.replace(/[^a-zA-Z0-9-_]/g, "").toLowerCase();
}

export function sanitizeTag(tag: string): string {
  // Use sanitize-html to remove unsafe HTML and limit special characters
  const sanitizedTag = sanitizeHtml(tag, {
    allowedTags: [], // Disallow all HTML tags
    allowedAttributes: {}, // Disallow all attributes
  }).replace(/[^a-zA-Z0-9-_]/g, "-"); // Replace special characters
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
 * Get all blog posts with metadata
 * @returns {BlogPost[]} Array of blog posts with metadata, sorted by date descending
 */
export function getAllPosts(): BlogPost[] {
  // Ensure we're only reading from the designated posts directory
  const normalizedPostsDirectory = path.normalize(postsDirectory);
  if (!fs.existsSync(normalizedPostsDirectory)) {
    throw new Error("Posts directory does not exist");
  }

  const fileNames = fs.readdirSync(normalizedPostsDirectory);
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith(".mdx")) // Only process .mdx files
    .map(fileName => {
      const slug = sanitizeSlug(fileName.replace(/\.mdx$/, ""));
      const fullPath = path.join(normalizedPostsDirectory, fileName);

      // Validate the full path is still within the posts directory
      const normalizedFullPath = path.normalize(fullPath);
      if (!normalizedFullPath.startsWith(normalizedPostsDirectory)) {
        throw new Error("Invalid file path detected");
      }

      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Extract metadata using a safer regex pattern and JSON parsing
      const metadataMatch = fileContents.match(
        /export\s+const\s+metadata\s*=\s*({[\s\S]*?});/
      );

      if (!metadataMatch?.[1]) {
        throw new Error(`No metadata found in ${fileName}`);
      }

      try {
        // Parse metadata as JSON instead of using eval
        const metadata = JSON.parse(
          metadataMatch[1]
            .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2": ') // Ensure valid JSON property names
            .replace(/'/g, '"') // Replace single quotes with double quotes
            .replace(/,(\s*[}\]])/g, "$1") // Remove trailing commas
        );

        // Validate and sanitize metadata fields
        const title = sanitizeHtml(metadata.title || "", {
          allowedTags: [],
          allowedAttributes: {},
        });
        const description = sanitizeHtml(metadata.description || "", {
          allowedTags: [],
          allowedAttributes: {},
        });
        const date = new Date(metadata.date).toISOString();
        const tags = (metadata.tags || []).map((tag: string) =>
          sanitizeTag(tag)
        );

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

  return allPosts;
}
