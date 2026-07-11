# blogs

Personal blog — built with [Astro](https://astro.build) using the [AstroPaper](https://github.com/satnaing/astro-paper) theme, statically exported and auto-deployed to a self-hosted VPS.

## Content pipeline

```
Obsidian vault (pocper1/notes, private)
  └─ blog/           ── GitHub Action (sync-blog.yml) ──▶  src/content/posts/
                                                              │
                                                              ▼
                                            deploy.yml: astro build ──▶ rsync dist/ to VPS
```

Posts are authored in Obsidian inside the private `notes` repo. Pushing the vault triggers a sync into `src/content/posts/`, which triggers the build & deploy here. **Don't edit posts directly in this repo** — they'll be overwritten by the next sync.

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output in dist/
```

## Post frontmatter

```yaml
---
title: "Post title"
description: "One-line summary shown in lists and meta tags."
pubDatetime: 2026-07-11T00:00:00+08:00
tags: ["backend", "infra"]
---
```

## Credits

Theme: [AstroPaper](https://github.com/satnaing/astro-paper) by Sat Naing (MIT).
