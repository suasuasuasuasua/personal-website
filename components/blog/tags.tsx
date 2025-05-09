import { sanitizeTag } from "@/app/(content)/blog/utils";
import Link from "next/link";

type Props = {
  tags: string[];
};

export default function Tags({ tags }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Link
          key={sanitizeTag(tag)}
          href={`/blog/tags/${sanitizeTag(tag)}`}
          className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
