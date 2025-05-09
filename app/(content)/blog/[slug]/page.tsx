import { generateTableOfContents, getReadingTime } from "../utils";
import TableOfContents from "@/components/blog/table-of-contents";
import Tags from "@/components/blog/tags";
import Section from "@/components/section";
import fs from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import path from "path";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const fullPath = path.join(
    process.cwd(),
    "app/(content)/blog/posts",
    `${slug}.mdx`
  );

  try {
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const metadata = fileContent.match(
      /export const metadata = ({[\s\S]*?})/
    )?.[1];
    if (!metadata) {
      notFound();
    }

    // TODO: is eval safe here?
    const { title, date, tags = [] } = eval(`(${metadata})`);
    const readingTime = getReadingTime(fileContent);
    const toc = generateTableOfContents(fileContent);

    return (
      <div className="mx-auto mb-8 w-11/12 space-y-4 md:w-8/12 lg:w-7/12">
        <Section title={title}>
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <time>{date}</time>
                <span>•</span>
                <span>{readingTime}</span>
              </div>
              <Tags tags={tags} />
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
    notFound();
  }
}
