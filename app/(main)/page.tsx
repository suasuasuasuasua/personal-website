import { albums, books, technologies, os } from "@/app/(main)/nows";
import ItemList from "@/components/item-list";
import Album from "@/components/now/album";
import Book from "@/components/now/book";
import OperatingSystem from "@/components/now/os";
import Technology from "@/components/now/technology";
import Section from "@/components/section";

export default function Home() {
  return (
    <div className="mx-4 flex flex-col">
      <h1 className="font-bold">Welcome to My Website!</h1>

      <p>
        This is my <span className="italic">now</span> page where I will be
        talking about what&apos;s going on{" "}
        <span className="font-bold"> right now</span> in my life.
      </p>
      <p>
        I&apos;ll also talk about things that I&apos;m interested in or like at
        this moment.
      </p>

      <div className="mt-4 flex flex-col space-y-4">
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

        <Section title="Current Technologies">
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
    </div>
  );
}
