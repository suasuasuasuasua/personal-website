import {
  BlogPost,
  getAllPosts,
  sanitizeSlug,
  sanitizeTag,
} from "@/app/(content)/blog/utils";
import Section from "@/components/section";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  // Await the params promise to get the tag
  const resolvedParams = await params;
  const { tag } = resolvedParams;
  const sanitizedTag = sanitizeTag(tag);

  const posts = getAllPosts().filter((post: BlogPost) =>
    post.tags.map((tag: string) => sanitizeTag(tag)).includes(sanitizedTag)
  );

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="mx-auto mb-8 w-11/12 space-y-8 md:w-8/12 lg:w-7/12">
      <Section title={`Posts tagged "${sanitizedTag}"`}>
        <div className="space-y-8">
          {posts.map((post: BlogPost) => (
            <article key={sanitizeSlug(post.slug)} className="space-y-2">
              <Link href={`/blog/${sanitizeSlug(post.slug)}`}>
                <h2 className="text-xl font-semibold hover:underline">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <time>{new Date(post.date).toLocaleDateString()}</time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <p className="text-gray-700">{post.description}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
