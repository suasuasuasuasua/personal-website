export interface GitHubRelease {
  url: string;
  assets_url: string;
  html_url: string;
  tag_name: string;
  name: string;
  created_at: string;
  published_at: string;
  assets: GitHubAsset[];
  body?: string;
}

export interface GitHubAsset {
  name: string;
  browser_download_url: string;
  created_at: string;
  updated_at: string;
  size: number;
}
