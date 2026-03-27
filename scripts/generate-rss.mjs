import { Feed } from 'feed'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const POSTS_DIR = path.join(ROOT, 'content/posts')
const OUT_DIR = path.join(ROOT, 'out')

const getSiteUrl = () => {
  const url = process.env.NEXT_PUBLIC_SITE_URL
  if (!url) return 'https://example.com'
  return url.startsWith('http') ? url : `http://${url}`
}

const SITE_URL = getSiteUrl()

function getPostsMeta() {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8')
      const { data } = matter(raw)
      return { slug, ...data }
    })
    .filter((p) => p.published !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

const posts = getPostsMeta()

const feed = new Feed({
  title: 'My Blog',
  description: 'Thoughts on software engineering, DevOps, and technology.',
  id: SITE_URL,
  link: SITE_URL,
  language: 'en',
  feedLinks: { rss2: `${SITE_URL}/feed.xml` },
  author: { name: 'Blog Author', email: 'hello@example.com' },
  copyright: `All rights reserved ${new Date().getFullYear()}`,
})

posts.forEach((post) => {
  feed.addItem({
    title: post.title,
    id: `${SITE_URL}/blog/${post.slug}/`,
    link: `${SITE_URL}/blog/${post.slug}/`,
    description: post.excerpt,
    date: new Date(post.date),
    category: (post.tags ?? []).map((t) => ({ name: t })),
  })
})

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true })
}

fs.writeFileSync(path.join(OUT_DIR, 'feed.xml'), feed.rss2())
console.log(`✓ RSS feed generated → out/feed.xml (${posts.length} posts)`)
