import {
  generateTableOfContents,
  getReadingTime,
  getAllPosts,
  sanitizeSlug,
} from "../utils";
import TableOfContents from "@/components/blog/table-of-contents";
import Tags from "@/components/blog/tags";
import Section from "@/components/section";
import fs from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import path from "path";
import { cache } from "react";

// Cache the date formatting to avoid repeated calculations
const formatDate = cache((dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// Generate static params at build time for better performance
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sanitizedSlug = sanitizeSlug(slug);

  // Get post data from cache
  const post = getAllPosts().find(post => post.slug === sanitizedSlug);
  if (!post) {
    notFound();
  }

  const fullPath = path.join(
    process.cwd(),
    "app/(content)/blog/posts",
    `${sanitizedSlug}.mdx`
  );

  try {
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const readingTime = getReadingTime(fileContent);
    const toc = generateTableOfContents(fileContent);

    return (
      <div className="mx-auto mb-8 w-11/12 space-y-4 md:w-8/12 lg:w-7/12">
        <Section title={post.title}>
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col space-y-1 text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <time dateTime={post.firstPosted || post.date}>
                    Posted {formatDate(post.firstPosted || post.date)}
                  </time>
                  <span>•</span>
                  <span>{readingTime}</span>
                </div>
                {post.lastEdited && post.lastEdited !== post.firstPosted && (
                  <div className="text-gray-400">
                    Last edited {formatDate(post.lastEdited)}
                  </div>
                )}
              </div>
              <Tags tags={post.tags} />
            </div>

            {/* Only render ToC if there are headings */}
            {toc.length > 0 && <TableOfContents items={toc} />}

            <article className="prose prose-slate max-w-none dark:prose-invert">
              <MDXRemote
                source={fileContent}
                options={{
                  parseFrontmatter: false, // Disable frontmatter parsing since we handle it separately
                  mdxOptions: {
                    remarkPlugins: [],
                    rehypePlugins: [],
                    format: "mdx",
                  },
                }}
              />
            </article>
          </div>
        </Section>
      </div>
    );
  } catch (error) {
    console.error(`Error reading blog post ${sanitizedSlug}:`, error);
    notFound();
  }
}
