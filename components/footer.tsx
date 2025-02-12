import HighlightedLink from "@/components/link";
import { IconType } from "react-icons";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiMatrix, SiProton } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="mt-auto space-y-2">
      {/* Row 1 - List of socials */}
      <ul className="flex flex-row justify-center space-x-10">
        {/* Map each of the social entries to a icon */}
        {Object.entries(socialIcons).map(([key, value]) => (
          <li key={key}>
            <FooterIcon icon={value.icon} link={value.link}></FooterIcon>
          </li>
        ))}
      </ul>

      {/* Row 2 - GitHub Plug */}
      <p className="gap-2 text-center text-sm">
        <span className="mx-1">made with ❤️ by</span>
        <HighlightedLink
          link="https://github.com/suasuasuasuasua/"
          highlight=""
        >
          suasuasuasuasua
        </HighlightedLink>
      </p>
    </footer>
  );
}

const socialIcons = {
  github: {
    icon: FaGithub,
    link: "https://github.com/suasuasuasuasua/personal-website",
  },
  linkedIn: {
    icon: FaLinkedin,
    link: "https://linkedin.com/in/jhoang124",
  },
  matrix: {
    icon: SiMatrix,
    link: "https://matrix.to/#/@suasuasuasuasua:matrix.org",
  },
  email: {
    icon: SiProton,
    link: "mailto:j124.dev@proton.me",
  },
};

function FooterIcon({ icon: Icon, link }: { icon: IconType; link: string }) {
  return (
    <HighlightedLink link={link} highlight="">
      <Icon />
    </HighlightedLink>
  );
}
