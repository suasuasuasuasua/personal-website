import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  link: string;
  highlight: string;
};

function isExternalLink(url: string): boolean {
  return url.startsWith("http") || url.startsWith("mailto:");
}

function sanitizeUrl(url: string): string {
  // Only allow certain protocols
  if (url.startsWith("mailto:")) {
    return url;
  }

  try {
    const parsed = new URL(url);
    if (["http:", "https:"].includes(parsed.protocol)) {
      return url;
    }
    return "#";
  } catch {
    // If URL is invalid or relative, return as is (Next.js will handle relative URLs)
    if (url.startsWith("/")) {
      return url;
    }
    return "#";
  }
}

export default function HighlightedLink({
  children,
  link,
  highlight,
  ...props
}: Props) {
  const sanitizedUrl = sanitizeUrl(link);
  const isExternal = isExternalLink(sanitizedUrl);

  const commonProps = {
    className: `${highlight} underline underline-offset-2 ${props}`,
    ...(!isExternal
      ? {}
      : {
          target: "_blank",
          rel: "noopener noreferrer",
        }),
  };

  return isExternal ? (
    <a href={sanitizedUrl} {...commonProps}>
      {children}
    </a>
  ) : (
    <Link href={sanitizedUrl} {...commonProps}>
      {children}
    </Link>
  );
}
