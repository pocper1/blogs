export interface Frontmatter {
  title: string
  date: string
  tags: string[]
  excerpt: string
  coverImage?: string
  published?: boolean
}

export interface PostMeta extends Frontmatter {
  slug: string
  readingTime: string
  wordCount: number
}

export interface Post extends PostMeta {
  content: string
}

export interface TocItem {
  id: string
  text: string
  level: 2 | 3 | 4
}
