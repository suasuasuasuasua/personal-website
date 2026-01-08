# Personal Website

[![Build and deploy](https://github.com/suasuasuasuasua/personal-website/actions/workflows/hugo.yaml/badge.svg?branch=main)](https://github.com/suasuasuasuasua/personal-website/actions/workflows/hugo.yaml)

Hi, this is my personal website!

## Tech Stack

- `nix` to setup the [development machine](#developer-workflow)
- `hugo` for the static website generator framework

## Project Workflow

I'm drafting small issues and pull requests that squash merge into the staging branch.
When I've made significant enough progress, I'll rebase and fast-forward back
the staging branch into main.

```mermaid
---
title: Example workflow
---
gitGraph
   commit
   commit tag: "v0.1.0"
   branch staging
   checkout staging
   commit
   branch feature-1
   checkout feature-1
   commit
   checkout staging
   merge feature-1 tag: "v0.1.1"
   commit
   branch feature-2
   checkout feature-2
   commit
   checkout staging
   merge feature-2  tag: "v0.1.2"
   commit
   checkout main
   merge staging tag: "v0.2.0"
   commit
```

## Developer Workflow

### Installation

First, install `nix` from [Determinate
Systems](https://determinate.systems/posts/determinate-nix-installer/). Next,
use [`direnv`](https://direnv.net) to install and load the developer shell with
all the tooling built in.

I recommend using [`neovim`](https://Neovim.io) or
[`vscode`](https://code.visualstudio.com) with the [devcontainer
extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
for the text editor.

### Run the Server

Run `hugo serve` to start up the local development web server.

### Contribution

When committing, use
[commitizen](https://commitizen-tools.github.io/commitizen/) to format the
commit title and subtext to ensure
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

Commit hooks set up for [pre-commit](https://pre-commit.com) to ensure
consistent formatting and style.
