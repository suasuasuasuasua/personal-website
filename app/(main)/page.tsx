import { getAllPosts } from "@/app/(content)/blog/utils";
import { albums, books, technologies, os } from "@/app/(main)/nows";
import Tags from "@/components/blog/tags";
import ItemList from "@/components/item-list";
import Album from "@/components/now/album";
import Book from "@/components/now/book";
import OperatingSystem from "@/components/now/os";
import Technology from "@/components/now/technology";
import Section from "@/components/section";
import Link from "next/link";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-4 flex flex-col space-y-4">
      <h1 className="font-bold">Welcome to My Website!</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Now Content */}
        <div className="space-y-4">
          <div className="space-y-2">
            <p>
              This is my <span className="italic">now</span> page where I will
              be talking about what&apos;s going on{" "}
              <span className="font-bold"> right now</span> in my life.
            </p>
            <p>
              I&apos;ll also talk about things that I&apos;m interested in or
              like at this moment.
            </p>
          </div>

          <Section title="Albums">
            <ItemList
              items={albums}
              renderItem={album => (
                <Album
                  title={album.title}
                  artist={album.artist}
                  albumLink={album.albumLink}
                  artistLink={album.artistLink}
                />
              )}
            />
          </Section>

          <Section title="Books">
            <ItemList
              items={books}
              renderItem={book => (
                <Book
                  title={book.title}
                  author={book.author}
                  bookLink={book.bookLink}
                  authorLink={book.authorLink}
                />
              )}
            />
          </Section>

          <Section title="Technologies">
            <ItemList
              items={technologies}
              renderItem={tech => (
                <Technology
                  name={tech.name}
                  description={tech.description}
                  link={tech.link}
                />
              )}
            />
          </Section>

          <Section title="Operating Systems">
            <ItemList
              items={os}
              renderItem={system => (
                <OperatingSystem
                  name={system.name}
                  icon={system.icon}
                  link={system.link}
                />
              )}
            />
          </Section>
        </div>

        {/* Right Column - Latest Blog Posts */}
        <div>
          <Section title="Latest Posts">
            <div className="space-y-6">
              {latestPosts.map(post => (
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
              <div className="pt-4">
                <Link href="/blog" className="text-blue-500 hover:underline">
                  View all posts →
                </Link>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
