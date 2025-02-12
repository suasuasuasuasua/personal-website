import { ComputerProps } from "@/types/computer";
import { FaApple } from "react-icons/fa";
import { SiNixos, SiWindows11 } from "react-icons/si";

export const computers: ComputerProps = {
  macbook: {
    specs: {
      os: {
        icon: FaApple,
        name: "macOS Sequoia",
      },
    },
    meta: {
      name: "Macbook Pro M3 Max",
      description: `
      My daily driver laptop for general purpose and software development.
      `,
      link: "https://support.apple.com/en-us/117736",
    },
  },
  lab: {
    specs: {
      os: {
        icon: SiNixos,
        name: "NixOS 25.05 (unstable)",
      },
    },
    meta: {
      name: "lab",
      description: `
      My custom-built home server! Running an i3-14100, 32GB 4800MHz DDR5,
      mirrored 2TB NVME Gen. 4 SSD ZFS root drive, and 3x4TB HDD in Raid-Z1.
      Hosting services like file storage, media streaming, DNS ad-blocking, and
      more. This is my gateway into home-labbing and networking lol.
       `,
    },
  },
  pi: {
    specs: {
      os: {
        icon: SiNixos,
        name: "NixOS 25.05 (unstable)",
      },
    },
    meta: {
      name: "pi",
      description: `
      Support device for the home-labbing learning journey. Currently running
      lightweight applications like Adguard Home.
       `,
      link: "https://www.canakit.com/raspberry-pi-4-2gb.html?srsltid=AfmBOora__zOpTlZ4hJqGRrtSNXEaG3Ui7gHvciKoweoHYb8QwErd5e5",
    },
  },
  penguin: {
    specs: {
      os: {
        icon: SiNixos,
        name: "NixOS 25.05 (unstable)",
      },
    },
    meta: {
      name: "Acer Spin 713-3w",
      description: `
      Secondary driver for experimenting with Linux and NixOS in particular.
      Used as a beater laptop around the house or for small trips.
       `,
      link: "https://store.acer.com/en-us/chromebook-spin-713-cp713-3w-5102",
    },
  },
  legion: {
    specs: {
      os: {
        icon: SiWindows11,
        name: "Windows 11",
      },
    },
    meta: {
      name: "Lenovo Legion T730-28ICO",
      description: `
      Primarily used for Windows exclusive apps (like video games and whatnot)
      and software development sometimes.
`,
      link: "https://www.lenovo.com/us/outletus/en/p/desktops/legion-desktops/legion-t-series-towers/lenovo-legion-t730-28ico/90jf00kvus?orgRef=https%253A%252F%252Fwww.google.com%252F&srsltid=AfmBOop5EtlrcGhEQFudRHxKuXM56kAEJmC7ByIk1Bl9RoVJX4hCC3Tk",
    },
  },
};

export default computers;
