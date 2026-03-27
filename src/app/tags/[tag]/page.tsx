import { getPostsByTag, getAllTags } from '@/lib/posts'
import { PostCard } from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return Object.keys(tags).map((tag) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  return {
    title: `Posts tagged "${decoded}"`,
    description: `All blog posts tagged with ${decoded}`,
  }
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const posts = getPostsByTag(decoded)

  if (posts.length === 0) notFound()

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        All posts
      </Link>

      <section className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          <span className="text-muted-foreground font-normal">Posts tagged </span>
          <span className="text-primary">#{decoded}</span>
        </h1>
        <p className="text-muted-foreground">
          {posts.length} post{posts.length !== 1 ? 's' : ''}
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
