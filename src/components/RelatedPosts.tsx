import Link from 'next/link'
import { PostMeta } from '@/types/post'
import { formatDate } from '@/lib/utils'
import { TagBadge } from './TagBadge'
import { ArrowRight } from 'lucide-react'

interface RelatedPostsProps {
  posts: PostMeta[]
  labelEn?: string
}

export function RelatedPosts({ posts, labelEn = 'Related Posts' }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-lg font-semibold mb-5">{labelEn}</h2>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}/`}
              className="group flex items-start justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 hover:border-primary/40 hover:shadow-sm transition-all"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {post.tags.slice(0, 3).map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                  ))}
                </div>
                <p className="font-medium text-sm leading-snug group-hover:text-primary transition-colors truncate">
                  {post.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{formatDate(post.date)}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-1" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
