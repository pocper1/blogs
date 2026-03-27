# My Blog

A modern, statically-exported blog built with Next.js 15 and MDX. Write posts in Markdown, push to GitHub, and the site automatically deploys to your VPS via GitHub Actions + rsync.

## ✨ Features

- **MDX posts** — write in Markdown, embed React components when needed
- **Syntax highlighting** — dual light/dark themes via Shiki (zero JS at runtime)
- **Dark / light mode** — system preference aware, no flash on load
- **Tag system** — tag-filtered pages at `/tags/[tag]`
- **Table of Contents** — sticky sidebar with active section tracking
- **Copy code button** — hover any code block to copy
- **Reading progress bar** — thin indicator at top of post pages
- **Prev / Next navigation** — bottom of every post
- **Callout blocks** — `<Callout type="info|tip|warning|danger">` in MDX
- **RSS feed** — auto-generated at `/feed.xml` on every build
- **Sitemap + robots.txt** — SEO ready out of the box
- **Accessibility** — skip-to-content link, `aria-current`, `focus-visible` ring, reduced-motion support

## 🗂 Project Structure

```
blogs/
├── content/
│   └── posts/           ← Write your MDX posts here
├── public/
│   └── images/          ← Static images
├── src/
│   ├── app/             ← Next.js App Router pages
│   │   ├── page.tsx           (post listing)
│   │   ├── blog/[slug]/       (individual post)
│   │   ├── tags/[tag]/        (tag-filtered listing)
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/      ← UI components
│   └── lib/             ← Data layer (posts, toc, utils)
├── scripts/
│   └── generate-rss.mjs ← Runs after build → out/feed.xml
├── nginx/
│   └── blog.conf        ← Nginx config template for VPS
└── .github/
    └── workflows/
        └── deploy.yml   ← CI/CD: build → rsync → VPS
```

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 22
- pnpm

### Local development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
# → http://localhost:3000
```

### Build & preview

```bash
# Build static output → out/
pnpm build

# Preview the static build locally
npx serve out -p 3001
# → http://localhost:3001
```

## ✍️ Writing Posts

Create a new file in `content/posts/`:

```bash
touch content/posts/my-new-post.mdx
```

Every post requires this frontmatter at the top:

```mdx
---
title: "Your Post Title"
date: "2026-04-01"
tags: ["tag1", "tag2"]
excerpt: "A short description shown on the listing page."
coverImage: "/images/cover.jpg"   # optional
published: true                    # set false to keep as draft
---

Your content here...
```

### Callout blocks

Use the built-in `<Callout>` component anywhere in your MDX:

```mdx
<Callout type="tip">
  This is a tip!
</Callout>

<Callout type="warning">
  Be careful here.
</Callout>
```

Available types: `info` · `tip` · `warning` · `danger`

### Code blocks

Annotate code blocks with a language and optional title:

````mdx
```typescript title="src/lib/example.ts"
export function hello(name: string) {
  return `Hello, ${name}!`
}
```
````

Highlight specific lines with `{1,3-5}`:

````mdx
```js {2}
const a = 1
const b = 2   // ← this line is highlighted
const c = 3
```
````

## 🚢 Deployment

### Architecture

```
git push → GitHub Actions → pnpm build → next build → rsync out/ → VPS (Nginx)
```

### One-time VPS setup

```bash
# Install Nginx + Certbot
sudo apt update && sudo apt install -y nginx certbot python3-certbot-nginx

# Create web root
sudo mkdir -p /var/www/blog
sudo chown $USER:www-data /var/www/blog
sudo chmod 755 /var/www/blog

# Copy and enable Nginx config
sudo cp nginx/blog.conf /etc/nginx/sites-available/blog.conf
# Edit blog.conf: replace yourdomain.com with your actual domain
sudo nano /etc/nginx/sites-available/blog.conf

sudo ln -s /etc/nginx/sites-available/blog.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Issue SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### SSH key for GitHub Actions

```bash
# Generate a dedicated deploy key (no passphrase)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/blog_deploy -N ""

# Copy public key to VPS
ssh-copy-id -i ~/.ssh/blog_deploy.pub user@your-vps-ip

# Print private key → paste into GitHub secret VPS_SSH_PRIVATE_KEY
cat ~/.ssh/blog_deploy
```

### GitHub Secrets

Go to **Settings → Secrets and variables → Actions** in your repository and add:

| Secret | Description | Example |
|---|---|---|
| `VPS_SSH_PRIVATE_KEY` | ed25519 private key (no passphrase) | `-----BEGIN OPENSSH...` |
| `VPS_HOST` | VPS IP address or hostname | `123.45.67.89` |
| `VPS_USER` | SSH username on VPS | `ubuntu` |
| `VPS_DEPLOY_PATH` | Absolute path to web root on VPS | `/var/www/blog` |
| `SITE_URL` | Full public URL of your site | `https://yourdomain.com` |

### Deploy

After secrets are configured, every push to `main` triggers a full build and deploy:

```bash
git add content/posts/my-new-post.mdx
git commit -m "feat: add new post"
git push
# → GitHub Actions builds and deploys in ~60 seconds
```

You can also trigger a manual deploy from **Actions → Build and Deploy Blog → Run workflow**.

## ⚙️ Configuration

### Site metadata

Edit `src/app/layout.tsx` to change the site title, description, and social links:

```tsx
export const metadata: Metadata = {
  title: {
    default: 'My Blog',          // ← change this
    template: '%s | My Blog',
  },
  description: 'Your description here.',
}
```

### Social links in footer

Edit `src/components/Footer.tsx`:

```tsx
const socialLinks = [
  { href: 'https://github.com/yourusername', label: 'GitHub', icon: Github },
  { href: 'https://twitter.com/yourusername', label: 'Twitter / X', icon: Twitter },
  { href: '/feed.xml', label: 'RSS Feed', icon: Rss },
]
```

### Environment variables

Copy `.env.example` to `.env.local` for local development:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Full URL used in sitemap and RSS feed |

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router, `output: 'export'`) |
| Language | TypeScript |
| Content | MDX via [`@next/mdx`](https://nextjs.org/docs/app/guides/mdx) + `gray-matter` |
| Styling | [Tailwind CSS v3](https://tailwindcss.com) + CSS variables |
| Dark mode | [`next-themes`](https://github.com/pacocoursey/next-themes) |
| Syntax highlighting | [`rehype-pretty-code`](https://rehype-pretty.pages.dev) + [Shiki](https://shiki.style) |
| Icons | [Lucide React](https://lucide.dev) |
| Package manager | [pnpm](https://pnpm.io) |
| CI/CD | GitHub Actions |
| Web server | Nginx |

## 📝 Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server at `localhost:3000` |
| `pnpm build` | Build static export to `out/` + generate RSS |
| `pnpm lint` | Run Next.js ESLint |

## 📄 License

MIT
