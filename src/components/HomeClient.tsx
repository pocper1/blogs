'use client'

import { useState, useMemo } from 'react'
import { PostMeta } from '@/types/post'
import { PostCard } from '@/components/PostCard'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import { ArrowRight, Github, Twitter, Rss, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const socialLinks = [
  { href: 'https://github.com/yourusername',  label: 'GitHub',    icon: Github },
  { href: 'https://twitter.com/yourusername', label: 'Twitter/X', icon: Twitter },
  { href: '/feed.xml',                         label: 'RSS Feed',  icon: Rss },
]

interface HomeClientProps {
  posts: PostMeta[]
  tags: Record<string, number>
}

function getYears(posts: PostMeta[]): number[] {
  return [...new Set(posts.map((p) => new Date(p.date).getFullYear()))].sort(
    (a, b) => b - a
  )
}

export function HomeClient({ posts, tags }: HomeClientProps) {
  const { t } = useLanguage()
  const [activeTag, setActiveTag]   = useState<string | null>(null)
  const [activeYear, setActiveYear] = useState<number | null>(null)

  const years = useMemo(() => getYears(posts), [posts])
  const sortedTags = useMemo(
    () => Object.entries(tags).sort((a, b) => b[1] - a[1]),
    [tags]
  )

  const filteredPosts = useMemo(
    () =>
      posts.filter((p) => {
        const tagOk  = !activeTag  || p.tags.includes(activeTag)
        const yearOk = !activeYear || new Date(p.date).getFullYear() === activeYear
        return tagOk && yearOk
      }),
    [posts, activeTag, activeYear]
  )

  const hasFilter = activeTag !== null || activeYear !== null

  function clearFilters() {
    setActiveTag(null)
    setActiveYear(null)
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Dot-grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 bg-dot-grid"
        />
        {/* Radial vignette so dot-grid fades to bg */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,transparent_30%,hsl(var(--background))_80%)]"
        />
        {/* Primary glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_-5%,hsl(var(--primary)/0.14),transparent)]"
        />

        {/* Floating orbs */}
        <div
          aria-hidden
          className="animate-float pointer-events-none absolute -top-24 -right-24 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          style={{ animationDuration: '10s' }}
        />
        <div
          aria-hidden
          className="animate-float pointer-events-none absolute top-28 -left-20 -z-10 h-60 w-60 rounded-full bg-primary/8 blur-2xl"
          style={{ animationDuration: '13s', animationDelay: '4s' }}
        />

        <div className="container mx-auto max-w-5xl px-4 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">

            {/* Avatar */}
            <div className="animate-scale-in shrink-0" style={{ animationDelay: '0ms' }}>
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-125" />
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full ring-4 ring-primary/30 ring-offset-2 ring-offset-background bg-gradient-to-br from-primary/30 via-primary/10 to-transparent flex items-center justify-center text-4xl md:text-5xl font-bold text-primary select-none">
                  {/* Replace with <img src="/avatar.jpg" alt="..." className="rounded-full object-cover" /> */}
                  Y
                </div>
              </div>
            </div>

            {/* Text block */}
            <div className="text-center md:text-left">
              <p
                className="animate-fade-in-up text-muted-foreground mb-1 text-sm font-medium tracking-wide uppercase"
                style={{ animationDelay: '60ms' }}
              >
                {t('home.hero.greeting')}{' '}
                <span className="text-foreground font-semibold">Your Name</span>
              </p>

              <h1
                className="animate-fade-in-up text-3xl md:text-5xl font-bold tracking-tight mb-4"
                style={{ animationDelay: '120ms' }}
              >
                {t('home.hero.role')}
              </h1>

              <p
                className="animate-fade-in-up text-muted-foreground text-lg max-w-xl mb-7"
                style={{ animationDelay: '180ms' }}
              >
                {t('home.hero.bio')}
              </p>

              {/* CTAs */}
              <div
                className="animate-fade-in-up flex flex-wrap justify-center md:justify-start gap-3 mb-7"
                style={{ animationDelay: '240ms' }}
              >
                <a
                  href="#posts"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {t('home.hero.cta.posts')}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/about/"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
                >
                  {t('home.hero.cta.about')}
                </Link>
              </div>

              {/* Social icons */}
              <div
                className="animate-fade-in-up flex justify-center md:justify-start gap-2"
                style={{ animationDelay: '300ms' }}
              >
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    aria-label={label}
                    {...(href.startsWith('http')
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Posts ────────────────────────────────────────── */}
      <section id="posts" className="container mx-auto max-w-5xl px-4 py-14">

        {/* Section header */}
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">
            {t('home.posts.title')}
            <span className="ml-2 text-base font-normal text-muted-foreground">
              ({filteredPosts.length}
              {hasFilter && (
                <span className="text-xs">/{posts.length}</span>
              )}
              )
            </span>
          </h2>

          {hasFilter && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
              {t('home.posts.clearFilter')}
            </button>
          )}
        </div>

        {/* ── Filter bar ───────────────────────────────── */}
        <div className="space-y-4 mb-8">

          {/* Tag pills */}
          {sortedTags.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {t('home.posts.filterByTag')}
              </p>
              <div className="flex flex-wrap gap-2">
                {sortedTags.map(([tag, count]) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
                      activeTag === tag
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-secondary text-secondary-foreground hover:bg-primary/80 hover:text-primary-foreground'
                    )}
                  >
                    #{tag}
                    <span className="opacity-60">({count})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Year pills */}
          {years.length > 0 && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {t('home.posts.filterByYear')}
              </p>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setActiveYear(activeYear === year ? null : year)}
                    className={cn(
                      'rounded-full px-3 py-0.5 text-xs font-medium transition-colors tabular-nums',
                      activeYear === year
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-secondary text-secondary-foreground hover:bg-primary/80 hover:text-primary-foreground'
                    )}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Post grid ────────────────────────────────── */}
        {filteredPosts.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">
            {t('home.posts.empty')}
          </p>
        ) : (
          /* key changes on filter → remounts grid → stagger replays */
          <div
            key={`${activeTag ?? 'all'}-${activeYear ?? 'all'}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredPosts.map((post, i) => (
              <div
                key={post.slug}
                className="animate-fade-in-up h-full"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
