import Link from "next/link";

export default function Tags({ tags }: { tags: string[] }) {
  return (
    // Display tags as a list of links
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Link
          key={tag}
          href={`/blog/tags/${tag}`}
          className="rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
