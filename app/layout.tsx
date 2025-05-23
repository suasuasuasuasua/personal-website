import Footer from "@/components/footer";
import Header from "@/components/header";
import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "sua's personal website",
  description: "come see what i've been working on :)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>

      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col pb-1 antialiased`}
      >
        <Header />
        <main className="container mx-auto flex-1 px-6 sm:px-8 md:px-12 lg:px-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
