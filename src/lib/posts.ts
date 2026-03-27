import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Frontmatter, Post, PostMeta } from '@/types/post'
import { calculateReadingTime } from './reading-time'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const frontmatter = data as Frontmatter
  const { text: readingTime, words: wordCount } = calculateReadingTime(content)

  return {
    slug,
    content,
    readingTime,
    wordCount,
    ...frontmatter,
    tags: frontmatter.tags ?? [],
  }
}

export function getAllPostsMeta(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const { content: _content, ...meta } = getPostBySlug(slug)
      return meta
    })
    .filter((post) => post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllTags(): Record<string, number> {
  const tagCounts: Record<string, number> = {}
  getAllPostsMeta().forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] ?? 0) + 1
    })
  })
  return tagCounts
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostsMeta().filter((post) => post.tags?.includes(tag))
}

/** Returns up to `limit` posts that share at least one tag with the given post */
export function getRelatedPosts(slug: string, tags: string[], limit = 3): PostMeta[] {
  return getAllPostsMeta()
    .filter((p) => p.slug !== slug && p.tags.some((t) => tags.includes(t)))
    .slice(0, limit)
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null
  next: PostMeta | null
} {
  const posts = getAllPostsMeta()
  const index = posts.findIndex((p) => p.slug === slug)
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  }
}
