import {
  AlbumProps,
  BookProps,
  OperatingSystemProps,
  TechnologyProps,
} from "@/types/nows";
import { FaApple } from "react-icons/fa";
import { SiNixos } from "react-icons/si";

export const albums: AlbumProps = {
  "Lose Yourself": {
    title: "Lose Yourself",
    artist: "Kiss of Life",
    albumLink: "https://open.spotify.com/album/4eguh1dJUXRh0IMiLKRwab",
    artistLink:
      "https://open.spotify.com/artist/4TEK9tIkcoxib4GxT3O4ky?si=RM2MZ7fSREG0xgWXm5v2Dg",
  },
  "Piano Concerto No. 2 in C Minor, Op. 18": {
    title: "Piano Concerto No. 2 in C Minor, Op. 18",
    artist: "Sergei Rachmaninoff",
    albumLink: "https://open.spotify.com/album/5lVqgXqdoIH3W1wUM2hzPx",
    artistLink: "https://open.spotify.com/artist/0Kekt6CKSo0m5mivKcoH51",
  },
};

export const books: BookProps = {
  "Invisible Cities": {
    title: "Invisible Cities",
    author: "Italo Calvino",
    bookLink: "https://isbndb.com/book/9780544133204",
    authorLink: "https://isbndb.com/author/Italo%20Calvino",
  },
};

export const technologies: TechnologyProps = {
  nix: {
    name: "nix",
    description: "declarative package manager",
    link: "https://nixos.org/",
  },
  "self hosting": {
    name: "self hosting",
    description: "self sufficient technology management",
    link: "https://selfh.st/",
  },
  "web development": {
    name: "web development",
    description: "next.js",
    link: "https://nextjs.org/",
  },
};

export const os: OperatingSystemProps = {
  nixos: {
    name: "NixOS",
    icon: SiNixos,
    link: "https://nixos.org/",
  },
  macOS: {
    name: "macOS",
    icon: FaApple,
    link: "https://www.apple.com/macos/macos-sequoia/",
  },
};
