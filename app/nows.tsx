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
  "IVE EMPATHY": {
    title: "IVE EMPATHY",
    artist: "IVE",
    albumLink: "https://open.spotify.com/album/7vwi3kXdpkaRO3if4N2gBN",
    artistLink: "https://open.spotify.com/artist/6RHTUrRF63xao58xh9FXYJ",
  },
  DRIP: {
    title: "DRIP",
    artist: "BABYMONSTER",
    albumLink: "https://open.spotify.com/album/6Lp82GTJXzgtIopT0g7N7k",
    artistLink: "https://open.spotify.com/artist/1SIocsqdEefUTE6XKGUiVS",
  },
  Bewitched: {
    title: "Bewitched",
    artist: "Laufey",
    albumLink: "https://open.spotify.com/album/1rpCHilZQkw84A3Y9czvMO",
    artistLink: "https://open.spotify.com/artist/7gW0r5CkdEUMm42w9XpyZO",
  },
  "Piano Concerto No. 2 in C Minor, Op. 18": {
    title: "Piano Concerto No. 2 in C Minor, Op. 18",
    artist: "Sergei Rachmaninoff",
    albumLink: "https://open.spotify.com/album/5lVqgXqdoIH3W1wUM2hzPx",
    artistLink: "https://open.spotify.com/artist/0Kekt6CKSo0m5mivKcoH51",
  },
};

export const books: BookProps = {
  "Crime and Punishment": {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    bookLink: "https://isbndb.com/book/9780679734505",
    authorLink: "https://isbndb.com/author/Fyodor%20Dostoevsky",
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
    description: "next.js in particular",
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
