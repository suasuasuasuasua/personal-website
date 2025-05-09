import { ResumeListUI } from "./resume-list-ui";
import { GitHubRelease } from "@/types/github";

export async function ResumeList() {
  const response = await fetch(
    "https://api.github.com/repos/suasuasuasuasua/resume/releases",
    { next: { revalidate: 3600 } }
  );
  const releases = (await response.json()) as GitHubRelease[];

  return <ResumeListUI releases={releases} />;
}
