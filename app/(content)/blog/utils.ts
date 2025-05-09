import { execSync } from "child_process";
import fs from "fs";
import path from "path";

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

// Sanitize the tag parameter
export function sanitizeTag(tag: string): string {
  // Remove any HTML tags and limit special characters
  let sanitizedTag = tag;
  let previous;
  do {
    previous = sanitizedTag;
    sanitizedTag = sanitizedTag
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .replace(/[^a-zA-Z0-9-_]/g, "-"); // Replace special characters
  } while (sanitizedTag !== previous);
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
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Extract metadata from the MDX file
      const metadata = fileContents.match(
        /export const metadata = ({[\s\S]*?})/
      )?.[1];
      if (!metadata) {
        throw new Error(`No metadata found in ${fileName}`);
      }

      const { title, description, date, tags = [] } = eval(`(${metadata})`);
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
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return allPosts;
}
