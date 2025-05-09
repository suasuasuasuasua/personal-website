import { TableOfContents as TOC } from "@/app/(content)/blog/utils";

export default function TableOfContents({ items }: { items: TOC[] }) {
  return (
    // Display the table of contents as a navigation menu
    <nav className="mb-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
      <h2 className="mb-2 text-lg font-semibold">Table of Contents</h2>
      <ul className="space-y-1">
        {items.map(item => (
          <li
            key={item.id}
            style={{ marginLeft: `${(item.level - 1) * 1}rem` }}
          >
            <a href={`#${item.id}`} className="text-blue-500 hover:underline">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
