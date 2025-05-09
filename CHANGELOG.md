# CHANGELOG

## 0.4.1 (2025-05-09)

### Fix

- sanitize the slugs and urls

## 0.4.0 (2025-05-09)

### Feat

- **portfolio**: added last edited date on each post

## 0.3.0 (2025-05-09)

### Feat

- **portfolio**: added portfolio page
- added blog!
- add ItemList and Section components; refactor About, Home, and Tech pages

### Refactor

- rearrange using groups

## 0.2.7 (2025-03-10)

### Fix

- update NixOS version to 24.11

## 0.2.6 (2025-02-13)

### Fix

- updated computers and whatnot on the tech page

## 0.2.5 (2024-12-20)

### Fix

- flipping conditional for bump version

## 0.2.4 (2024-12-20)

### Fix

- added dry run flag to release workflow

## 0.2.3 (2024-12-20)

### Fix

- fixed height offset for software icons (#168)

## 0.2.2 (2024-12-20)

### Fix

- added small margin between name and icon for software (#159)

## 0.2.1 (2024-12-20)

### Fix

- increased padding for software platforms under tech (#157)

## 0.2.0 (2024-12-19)

### Feat

- added the latest version to footer

## 0.1.2 (2024-12-19)

### Fix

- reverting to commitizen from git-cliff

## 0.1.1 (2024-12-19)

### Fix

- added git cliff for release body

## 0.1.0 (2024-12-19)

### Feat

- added section for various devices
- added links for the artist on the now page
- added The Old Man and The Sea
- **app/about/page.tsx**: updated the about page route
- **app/about/emails.tsx**: added email hardcoded data
- **types/email.tsx**: added basic email interface for contact
- **app/about/page.tsx**: filled out the about page route
- **app/about/faq.tsx**: added initial write up for the about faq content
- **components/about/faq.tsx**: added basic typing for the about page
- **app/tech/page.tsx**: added general software that i use
- **app/tech/computers.tsx**: added all the descriptions for the main machines
- **app/tech/page.tsx**: added basic setup for the tech page
- **app/tech/computers.tsx**: added first draft writeup for the computers
- **types/computer.tsx**: added a typing system for computers
- **components/link.tsx**: added a unified highlighted link object
- **app/page.tsx**: added a basic home page with a "now" section
- **components/now**: added a few basic components for "now" page
- **app/page.tsx**: added spotify widget component
- **components/placeholder.tsx**: added a placeholder component
- **components/header.tsx**: added an indicator for the currently opened page
- **app/ui/header.tsx**: moved the penguin icon and right aligned pages
- **app/\*/page.tsx**: Added dummy pages
- **cliff.toml**: added git-cliff to devenv and github action
- **app/page.tsx**: added a second row to the footer
- **app/page.tsx**: added font awesome icons
- **README.md**: Added notes about the project
- **all**: added skeleton for next.js web app
- **devenv.nix**: added yarn and remove just
- **package.json**: added prettier import sort
- **all**: initial commit!

### Fix

- added semantic version github workflow
- **updated-computer-descriptions**: descriptions are now more concise and the
  computers list vertically
- bumped nixos version to 25.05
- updated msi raider operating system
- changed lenovo legion ram type
- **app/tech/page.tsx**: added bottom padding to the tech content
- converted existing assets to webp
- **app/about/page.tsx**: put the emails on the about page on same row
- **app/tech/computers.tsx**: added two floating points for RAM on computers
  page
- **app/tech/computers.tsx**: added versioning for nixos and proxmox
- **components/tech/software.tsx**: added the icon wrapping for the CLI software
- **components/header.tsx**: using the pathname instead of a state hook
- **components/tech/software.tsx**: added dynamic shifting of icons
- **app/tech/software.tsx**: fixed safari link reference
- **app/tech/page.tsx**: added dynamic spacing, margins, and widths
- **components/placeholder.tsx**: deleted the layout prop
- **app/page.tsx**: fixed the books using the album component
- **components/footer.tsx**: changed anchor tags to Link component
- **component/placeholder.tsx**: added more responsive design for the plink
- **components/header.tsx**: spaced out the header elements much cleaner
- **devenv.nix**: fixed eslint filetype checker
- **app/layout.tsx**: fixed header and pushed the footer component to the bottom
- **app/ui**: merged icons into footer file
- **all**: added readme and fixed missing image
- **src**: moved penguin to public
- **src/**: reverted last change!

### Refactor

- **components/tech/computer.tsx**: disabling the description for now
- **components/tech/computer.tsx**: destructured the parameters further
- **components/header.tsx**: made the activate indicator more obvious
- **app/page.tsx**: removed the placeholder for the home page
- **app/**: added the placeholder component to all existing pages
- **app/ui/footer.tsx**: refactored social icons to be in a dictionary
- **package.json**: added autoprefixer as per tailwindcss docs
- **app/ui/footer/icon.tsx**: moved the footer icon to a dedicated file
- **styles/globals.css**: moved the global.css to an outer styles folder
- **app/layout.tsx**: moved the fonts to the public folder
