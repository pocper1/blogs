import Link from 'next/link'
import { PostMeta } from '@/types/post'
import { formatDate } from '@/lib/utils'
import { TagBadge } from './TagBadge'
import { Calendar, Clock } from 'lucide-react'

interface PostCardProps {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative flex flex-col h-full rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:border-primary/40">
      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-44 object-cover rounded-lg mb-4 flex-shrink-0"
        />
      )}

      {/* Tags — z-10 lifts them above the stretched-link overlay so they remain clickable */}
      {post.tags.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-1.5 mb-3">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      {/* Title — after:absolute after:inset-0 stretches the link to cover the whole card */}
      <h2 className="text-xl font-semibold leading-snug mb-2 group-hover:text-primary transition-colors flex-grow-0">
        <Link
          href={`/blog/${post.slug}/`}
          className="after:absolute after:inset-0"
        >
          {post.title}
        </Link>
      </h2>

      {/* Excerpt — pushes meta to bottom */}
      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
        {post.excerpt}
      </p>

      {/* Meta — z-10 so it sits above the stretched-link overlay */}
      <div className="relative z-10 flex items-center gap-4 text-xs text-muted-foreground mt-auto pt-2 border-t border-border/50">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {post.readingTime}
        </span>
      </div>
    </article>
  )
}
