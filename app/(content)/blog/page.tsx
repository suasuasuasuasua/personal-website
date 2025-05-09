import { getAllPosts, sanitizeSlug } from "./utils";
import Tags from "@/components/blog/tags";
import Section from "@/components/section";
import Link from "next/link";

const POSTS_PER_PAGE = 5;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  // Await the params promise to get the page
  const resolvedParams = await searchParams;
  const { page } = resolvedParams;

  const posts = getAllPosts();
  const currentPage = Number(page) || 1;
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginatedPosts = posts.slice(start, end);

  return (
    <div className="mx-auto mb-8 w-11/12 space-y-8 md:w-8/12 lg:w-7/12">
      <Section title="Blog">
        <div className="space-y-8">
          {/* Display paginated posts */}
          {paginatedPosts.map(post => (
            <article key={sanitizeSlug(post.slug)} className="space-y-2">
              <Link href={`/blog/${sanitizeSlug(post.slug)}`}>
                <h2 className="text-xl font-semibold hover:underline">
                  {post.title}
                </h2>
              </Link>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <time>{post.date}</time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <p className="text-gray-700">{post.description}</p>
              <Tags tags={post.tags} />
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-4">
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="text-blue-500 hover:underline"
              >
                Previous
              </Link>
            )}
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="text-blue-500 hover:underline"
              >
                Next
              </Link>
            )}
          </div>
        )}
      </Section>
    </div>
  );
}
