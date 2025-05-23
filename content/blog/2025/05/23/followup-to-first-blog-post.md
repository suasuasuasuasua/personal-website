---
title: First Blog Post [follow-up]
description: 11ty and Why I'm switching
date: 2025-05-23
tags:
  - ai
  - web-development
---

<!--toc:start-->
- [AI](#ai)
- [11ty](#11ty)
<!--toc:end-->

## AI

Not going to lie, I hated that I used AI to get most of the legwork done on the
website. Even though the agent mode was really cool to use for the resume and
blog sections, it felt like I wasn't learning anything – which is true. I was
just prompting the AI agent over and over and saying things like:

- "Fix the buttons"
- "Fix the header"
- "Add the latest resumes from GitHub"
- "You didn't do it right, try again!"
- \*_Pastes an error from the terminal directly into the chatbot_\*

It was cool in the moment, but I think that solely depending on it is too much
of a cheat – at least I cheated myself out of learning. I know I'm not a web
developer by trade, so I don't _have_ to learn these things, but still I should
at least grasp the fundamentals and think about how _I_ would solve these
problems.

And so, I am switching my static site generator (SSG) framework to
[11ty](https://www.11ty.dev/) (pronounced 'eleventy') from
[Next.js](https://nextjs.org/). Even though Next.js is modern and sleek, I
found it to be a beast to learn in my free time, especially when it came down to
learning React, TailwindCSS, Typescript, and more _all at the same time_. I'll
admit, it was ambitious of me to try to do everything without any experience
while in graduate school and working full-time!

Ideally, I wanted to get a website that could help me express my hobbies,
thoughts, and interests up and running with minimal friction. I think web
development is cool and all, but I don't have the time to fully learn it and get
it the attention that it demands. That is unless I want to pivot my career into
full-stack development...

## 11ty

My friend James suggested that I look into 11ty because it was simple to setup
and get going. You can use many different markup and template languages.

```bash
# install the package
$ npm install @11ty/eleventy

# run a local eleventy server to generate the html files (watches for changes)
$ npx @11ty/eleventy --serve
```

That's it. I love how fast and responsive the web server is too because I can
make changes and immediately see the result – it's way different from work
because I never get to work with any cool frontend things. I'll admit that I
cheated a little bit by using the official [blog
template](https://github.com/11ty/eleventy-base-blog). I was a bit underwhelmed
with the documentation, to be honest, but I do know that there is plenty of
tutorials and blog posts online to help me get started. I was just in the mood
to go go go.

> Don't worry, I will be going through with more follow-up posts to talk about
> what I'm learning, what I think is confusing, and what I think is interesting.

TLDR; I had grand plans to learn Next.js (and the accompanying tech stack), but
I am going to be scaling back with 11ty to focus on the blog and tech component
of my personal website.
