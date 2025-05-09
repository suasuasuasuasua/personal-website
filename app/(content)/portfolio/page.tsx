import HighlightedLink from "@/components/link";
import { ResumeList } from "@/components/portfolio/resume-list";

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <HighlightedLink
          link="https://github.com/suasuasuasuasua/resume/releases"
          highlight="blue"
        >
          Resumes
        </HighlightedLink>
        <p className="text-gray-600">
          Welcome to my portfolio! Here you can find my latest resume and track
          its evolution over time. Each version represents a milestone in my
          professional journey, with updates reflecting new skills, experiences,
          and achievements.
        </p>
      </section>

      <ResumeList />
    </div>
  );
}
