---
title: "Hello World: Starting My Blog"
pubDatetime: 2026-03-01T00:00:00+08:00
tags: ["meta", "writing"]
description: "Why I started this blog and what to expect going forward."
---

Welcome to my blog! This is the first post.

## Why I Started Writing

Writing forces clarity. When you can't explain something simply, you probably don't understand it well enough. This blog is as much for me as it is for you.

## What to Expect

I'll be writing about:

- **Software engineering** — TypeScript, system design, architecture patterns
- **DevOps & infrastructure** — VPS management, CI/CD, containers
- **Open source** — tools I build and use

## The Stack

This blog is built with **Astro** (AstroPaper theme), deployed as a static site to a VPS via **GitHub Actions + rsync**. Posts are written in **Markdown**, synced automatically from my Obsidian vault.

Here's the deployment pipeline at a glance:

```bash title="Deploy flow"
# 1. Write a post in Obsidian (notes/blog/new-post.md)
# 2. Push the vault — a GitHub Action syncs it into this repo

# GitHub Actions then:
# → pnpm install → astro build → rsync dist/ to VPS
```

## Code Highlighting

Syntax highlighting works beautifully with Shiki:

```typescript title="src/lib/posts.ts"
export function getAllPostsMeta(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
```

> "The scariest moment is always just before you start." — Stephen King

That's all for now. More posts coming soon.
