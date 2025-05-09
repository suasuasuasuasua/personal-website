import { getAllPosts } from "../../utils";
import Tags from "@/components/blog/tags";
import Section from "@/components/section";
import Link from "next/link";

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getAllPosts();
  // Filter posts by the tag from the URL
  const filteredPosts = posts.filter(post => post.tags.includes(params.tag));

  return (
    <div className="mx-auto mb-8 w-11/12 space-y-4 md:w-8/12 lg:w-7/12">
      <Section title={`Posts tagged with "${params.tag}"`}>
        <div className="space-y-8">
          {/* Display filtered posts */}
          {filteredPosts.map(post => (
            <article key={post.slug} className="space-y-2">
              <Link href={`/blog/${post.slug}`}>
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
      </Section>
    </div>
  );
}
