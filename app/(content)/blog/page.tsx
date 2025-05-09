import { BlogPost, getAllPosts, sanitizeSlug } from "./utils";
import Tags from "@/components/blog/tags";
import Section from "@/components/section";
import Link from "next/link";
import { cache } from "react";

const POSTS_PER_PAGE = 5;

// Cache the pagination calculation
const getPaginatedPosts = cache((posts: BlogPost[], page: number = 1) => {
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  return posts.slice(start, end);
});

// Generate static params for the first few pages at build time
export function generateStaticParams() {
  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  return Array.from({ length: Math.min(totalPages, 3) }, (_, i) => ({
    searchParams: { page: (i + 1).toString() },
  }));
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page = "1" } = await searchParams;
  const currentPage = parseInt(page);

  if (isNaN(currentPage) || currentPage < 1) {
    return { notFound: true };
  }

  const posts = getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  if (currentPage > totalPages) {
    return { notFound: true };
  }

  const paginatedPosts = getPaginatedPosts(posts, currentPage);

  return (
    <div className="mx-auto mb-8 w-11/12 space-y-8 md:w-8/12 lg:w-7/12">
      <Section title="Blog">
        <div className="space-y-8">
          {paginatedPosts.map(post => (
            <article key={sanitizeSlug(post.slug)} className="space-y-2">
              <Link href={`/blog/${sanitizeSlug(post.slug)}`}>
                <h2 className="text-xl font-semibold hover:underline">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-400">
                {post.description}
              </p>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">
                  {post.readingTime} •{" "}
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <Tags tags={post.tags} />
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-4">
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                ← Previous
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Next →
              </Link>
            )}
          </div>
        )}
      </Section>
    </div>
  );
}
