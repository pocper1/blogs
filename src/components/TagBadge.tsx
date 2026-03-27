import Link from 'next/link'
import { cn } from '@/lib/utils'

interface TagBadgeProps {
  tag: string
  count?: number
  className?: string
}

export function TagBadge({ tag, count, className }: TagBadgeProps) {
  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}/`}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors',
        className
      )}
    >
      #{tag}
      {count !== undefined && (
        <span className="opacity-70">({count})</span>
      )}
    </Link>
  )
}
