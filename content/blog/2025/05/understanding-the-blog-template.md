---
title: Understand the Blog Template
description: What code did I copy anyway?
date: 2025-05-23
tags:
  - web-development
---

<!--toc:start-->
- [Top Level Configuration](#top-level-configuration)
  - [`devenv.nix`](#devenvnix)
  - [`package.json`](#packagejson)
  - [`treefmt.toml`](#treefmttoml)
  - [`.devcontainer.json`](#devcontainerjson)
  - [`.editorconfig`](#editorconfig)
  - [`.envrc`](#envrc)
- [Folders](#folders)
  - [`_config/`](#config)
  - [`_data/`](#data)
  - [`_includes/`](#includes)
  - [`content/`](#content)
    - [`blog/`](#blog)
    - [`feed/`](#feed)
  - [`css/`](#css)
  - [`public/`](#public)
<!--toc:end-->

# Top Level Configuration

I am going to be looking at the repo at [this point in
time](https://github.com/suasuasuasuasua/personal-website/tree/c40e1abe6a76de1c11a43f0b870a9186cc33145a)
(called a hash).

## `devenv.nix`

I use [`devenv`](https://devenv.sh/) to define per-project development shells.
The packages come from [`nixpkgs`](https://github.com/NixOS/nixpkgs), the
largest package repository in the world. Since `devenv` uses `nix` and `nixpkgs`
under the hood, you get two important benefits: 1) a reproducible build with the
lockfile (`devenv.lock`) and 2) an elegant way to define all dependencies in a
unified interface.

You might be thinking, "doesn't `package-lock.json`" do that for you already?
Yes, but only for the project dependencies. This does nothing for external
tooling and programs.

In the `devenv.nix`, you'll find declarations for packages, languages,
git-hooks, and more. As an aside, `devenv` has a long list of features like
processes, services, and containers that I haven't even scratched the surface
of.

```nix
# devenv.nix
#
# nix is a domain specific language (DSL) and has a
# json-like structure
{
  # https://devenv.sh/packages/
  packages = with pkgs; [
    git
    pre-commit
    treefmt
    # ...
  ];

  # https://devenv.sh/languages/
  languages.javascript = {
    enable = true;
    pnpm = {
      enable = true;
      install.enable = true;
    };
  };

  # https://devenv.sh/git-hooks/
  git-hooks.hooks = {
    treefmt.enable = true;
  };
}

```

Admittedly, this is something that _I_ added and was not in the template
repository. I do think that it's worth mentioning because it's so cool (and
because I learned about it a few months ago when I made the full transition to
NixOS and nix-darwin). I would use a pure
[`flake.nix`](https://wiki.nixos.org/wiki/Flakes) `devShell`, but I've found
that it can be tricky and you'll often spend more time debugging the flake file
than actually doing useful work.

## `package.json`

The `package.json` file specifies the properties of the package like the name,
version, dependencies, website links, and more. It's pretty straight forward and
standard file for any web-based project with `javascript` or `typescript`.

## `treefmt.toml`

[`treefmt`](https://github.com/numtide/treefmt) is another program that I've
recently fell in love with. The idea is that `treefmt` unifies the interface for
all your formatters. This is especially useful in a multi-programming language
project like a web app.

For my website, I'll admit that this isn't super helpful since I use `prettier`
for most of the files. Again, this is something that I personally added to the
repository and was not present in the template.

## `.devcontainer.json`

This file is used to spin up a `devcontainer`, which is another layer of
dependency isolation and reproducibility. The base image also uses `nix` and
reads from the `devenv.nix` and `devenv.lock` files, so I thought that was
funny. It's like a double condom of safety.

devcontainers are super easy to do [in
VSCode](https://code.visualstudio.com/docs/devcontainers/containers). I've been
trying to get [`remote-nvim`](https://github.com/amitds1997/remote-nvim.nvim)
to work, but it's been finicky because I'm using
[`nixvim`](https://github.com/nix-community/nixvim) on NixOS and nix-darwin
machines (probably).

## `.editorconfig`

[EditorConfig](https://editorconfig.org/) is a file that defines a set of
standards regardless of which text editor or IDE you are using. This is a
project that I recently learned about and think is super neat.

[Some editors](https://editorconfig.org/#pre-installed) recognize EditorConfig
and work out of the box. [Other editors](https://editorconfig.org/#download)
require you to download a plugin.

## `.envrc`

The `.envrc` tells [`direnv`](https://direnv.net/) what to load when you enter
the project directory. My `.envrc` loads up the [`devenv` shell](#devenv).
Moreover, `direnv` is going to watch the `devenv.nix` file for any changes and
rebuild the shell. Super useful.

```text
# .envrc
use devenv
```

If this feels sus, that's fine. You don't have to use `direnv`, and if you are,
you can just disable it in the directory with `direnv block`.

## `.eleventy.config.js`

I think this is the most important file of the website. In here, we setup 11ty
just how we need it according to the [specs](https://www.11ty.dev/docs/config/).
From what I understand, we add many plugins for the blog, setup pre-processors
for drafts, copy folders (like `public/`) around, add watch targets, templating
files, and more.

# Folders

## `_config/`

There is a single file here called `filters.js`. From what I can tell, this file
is used to define helper filter functions for the blog posts. Inside of
`eleventy.config.js`, we import and add that file (the exported function) as a
plugin.

According to [11ty](https://www.11ty.dev/docs/plugins/), plugins are "custom
code that Eleventy can import into a project from an external repository."
That's really cool! So that means that we can extend Eleventy in many different
ways, and there is support for doing that locally or from someone else's code
online. At the top of `eleventy.config.js`, there's a block of imports from
`@11ty`, which are a bunch of different plugins that make the blog _a blog_. I
won't dive into what each plugin does right now, but I'll do more research along
the way.

## `_data/`

This folder is _global_ data that is exposed to every template in the [11ty
project](https://www.11ty.dev/docs/data-global/). I think this is really neat
because we can ensure consistency across all the web-pages without horribly
hardcoding everything.

There are two files in this folder: `eleventyDataScheme.js` and `metadata.js`.
I'm not one hundred percent sure about the first file, but it seems to do
something with validating draft content. I'm not even sure _how_ to make draft
content in the first place. The second file defines some metadata about the
website and author. This was easy to fill in.

## `_includes/`

## `content/`

### `blog/`

### `feed/`

## `css/`

## `public/`
