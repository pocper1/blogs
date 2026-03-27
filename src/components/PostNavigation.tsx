'use client'

import Link from 'next/link'
import { PostMeta } from '@/types/post'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface PostNavigationProps {
  prev: PostMeta | null
  next: PostMeta | null
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  const { t } = useLanguage()
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Post navigation"
      className="mt-16 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {prev ? (
        <Link
          href={`/blog/${prev.slug}/`}
          className="group flex flex-col gap-1 rounded-xl border border-border p-4 hover:border-primary/50 hover:bg-accent/50 transition-all"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wider">
            <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" />
            {t('post.nav.prev')}
          </span>
          <span className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}/`}
          className="group flex flex-col gap-1 rounded-xl border border-border p-4 hover:border-primary/50 hover:bg-accent/50 transition-all sm:text-right"
        >
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wider sm:justify-end">
            {t('post.nav.next')}
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
          <span className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
