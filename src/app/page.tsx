import { getAllPostsMeta, getAllTags } from '@/lib/posts'
import { HomeClient } from '@/components/HomeClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Software engineer blog – TypeScript, DevOps, and the web.',
}

export default function HomePage() {
  // Server-side: safe to use fs-based helpers here
  const posts = getAllPostsMeta()
  const tags = getAllTags()
  return <HomeClient posts={posts} tags={tags} />
}
