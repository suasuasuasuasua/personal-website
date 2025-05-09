"use client";

import { GitHubRelease } from "@/types/github";
import { MDXRemote } from "next-mdx-remote/rsc";

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function getMonthYear(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(new Date(date));
}

interface GroupedReleases {
  [key: string]: GitHubRelease[];
}

interface ResumeListUIProps {
  releases: GitHubRelease[];
}

export function ResumeListUI({ releases }: ResumeListUIProps) {
  // Get the latest resume PDF URL
  const latestRelease = releases[0];
  const latestPdfUrl = latestRelease?.assets.find(asset =>
    asset.name.endsWith(".pdf")
  )?.browser_download_url;

  // Group releases by month and year
  const groupedReleases = releases.reduce(
    (groups: GroupedReleases, release) => {
      const monthYear = getMonthYear(release.published_at);
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(release);
      return groups;
    },
    {}
  );

  return (
    <div className="space-y-8">
      {latestPdfUrl && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest Resume</h2>
            <a
              href={latestPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              Download Latest
            </a>
          </div>
          {latestRelease.body && (
            <div className="prose prose-slate max-w-none rounded-lg border p-4 dark:prose-invert">
              <MDXRemote source={latestRelease.body} />
            </div>
          )}
        </div>
      )}

      {/* Show the resume history */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Resume History</h2>
        {Object.entries(groupedReleases).map(([monthYear, monthReleases]) => (
          <div key={monthYear} className="space-y-4">
            <h3 className="text-xl font-medium text-gray-700">{monthYear}</h3>
            <div className="space-y-4">
              {monthReleases.map(release => {
                const pdfAsset = release.assets.find(asset =>
                  asset.name.endsWith(".pdf")
                );
                if (!pdfAsset) return null;

                return (
                  <details
                    key={release.tag_name}
                    className="group rounded-lg border transition"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50">
                      <div className="space-y-1">
                        <h4 className="text-lg font-medium">
                          Version {release.tag_name}
                        </h4>
                        {release.name && (
                          <p className="text-sm text-gray-600">
                            {release.name}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">
                          {formatDate(new Date(release.published_at))}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <a
                          href={pdfAsset.browser_download_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded border px-3 py-1 text-sm transition hover:bg-gray-100"
                          onClick={e => e.stopPropagation()}
                        >
                          Download
                        </a>
                        <svg
                          className="h-5 w-5 rotate-0 transform text-gray-500 transition-transform group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </summary>
                    {release.body && (
                      <div className="border-t p-4">
                        <div className="prose prose-slate max-w-none dark:prose-invert">
                          <MDXRemote source={release.body} />
                        </div>
                      </div>
                    )}
                  </details>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
