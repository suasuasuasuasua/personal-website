"use client";

import { GitHubRelease } from "@/types/github";

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
    // Show the latest resume
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
        </div>
      )}

      {/* Show the resume history */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Resume History</h2>
        {Object.entries(groupedReleases).map(([monthYear, monthReleases]) => (
          <div key={monthYear} className="space-y-4">
            <h3 className="text-xl font-medium text-gray-700">{monthYear}</h3>
            <div className="space-y-4">
              {/* group the resumes by month and year */}
              {monthReleases.map(release => {
                const pdfAsset = release.assets.find(asset =>
                  asset.name.endsWith(".pdf")
                );
                if (!pdfAsset) return null;

                return (
                  <div
                    key={release.tag_name}
                    className="rounded-lg border p-4 transition hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
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
                      <a
                        href={pdfAsset.browser_download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded border px-3 py-1 text-sm transition hover:bg-gray-100"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
