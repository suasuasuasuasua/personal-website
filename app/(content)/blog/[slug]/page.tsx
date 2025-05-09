import { generateTableOfContents, getReadingTime, getAllPosts } from "../utils";
import TableOfContents from "@/components/blog/table-of-contents";
import Tags from "@/components/blog/tags";
import Section from "@/components/section";
import fs from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import path from "path";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Get post data including git dates
  const post = getAllPosts().find(post => post.slug === slug);
  if (!post) {
    notFound();
  }

  const fullPath = path.join(
    process.cwd(),
    "app/(content)/blog/posts",
    `${slug}.mdx`
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
                  <time>
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

            {toc.length > 0 && <TableOfContents items={toc} />}

            <article className="prose prose-slate max-w-none dark:prose-invert">
              <MDXRemote source={fileContent} />
            </article>
          </div>
        </Section>
      </div>
    );
  } catch (error) {
    console.error("Error reading file:", error);
    notFound();
  }
}
