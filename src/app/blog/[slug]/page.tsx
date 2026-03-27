import { getPostBySlug, getPostSlugs, getAdjacentPosts, getRelatedPosts } from '@/lib/posts'
import { extractToc } from '@/lib/toc'
import { formatDate } from '@/lib/utils'
import { TableOfContents } from '@/components/TableOfContents'
import { TocDrawer } from '@/components/TocDrawer'
import { TagBadge } from '@/components/TagBadge'
import { PostNavigation } from '@/components/PostNavigation'
import { RelatedPosts } from '@/components/RelatedPosts'
import { ReadingProgress } from '@/components/ReadingProgress'
import { BackToTop } from '@/components/BackToTop'
import { ScrollToTopLink } from '@/components/ScrollToTopLink'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = getPostBySlug(slug)
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        tags: post.tags,
        ...(post.coverImage && {
          images: [{ url: post.coverImage, width: 1200, height: 630 }],
        }),
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  let PostContent: React.ComponentType
  try {
    const mdxModule = await import(`@/../content/posts/${slug}.mdx`)
    PostContent = mdxModule.default
  } catch {
    notFound()
  }

  const post = getPostBySlug(slug)
  const toc = extractToc(post.content)
  const { prev, next } = getAdjacentPosts(slug)
  const related = getRelatedPosts(slug, post.tags)

  return (
    <>
      <ReadingProgress />
      <BackToTop />
      {/* Mobile / tablet TOC drawer */}
      <TocDrawer items={toc} label="目錄 / Contents" />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        <div className="flex gap-16">
          {/* ── Main article ─────────────────────────────── */}
          <article className="min-w-0 flex-1 max-w-3xl">
            {post.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 object-cover rounded-xl mb-8"
              />
            )}

            <header className="mb-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </div>

              <h1 className="text-4xl font-bold tracking-tight leading-tight mb-5">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  {post.wordCount.toLocaleString()} words
                </span>
              </div>
            </header>

            {/* MDX content */}
            <div
              className="
                prose prose-neutral dark:prose-invert max-w-none
                prose-headings:scroll-mt-24
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-code:before:content-none prose-code:after:content-none
                prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0
                prose-img:rounded-lg
                prose-blockquote:not-italic
              "
            >
              <PostContent />
            </div>

            {/* Navigation between posts */}
            <PostNavigation prev={prev} next={next} />

            {/* Related posts */}
            <RelatedPosts posts={related} labelEn="Related Posts" />
          </article>

          {/* ── Sticky sidebar (desktop xl+) ─────────────── */}
          {toc.length > 0 && (
            <aside className="hidden xl:block w-56 shrink-0">
              <div className="sticky top-24 space-y-6">
                <TableOfContents items={toc} />

                {/* Quick actions */}
                <div className="border-t border-border pt-4 space-y-1">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                  >
                    <ArrowLeft className="h-3 w-3" />
                    All posts
                  </Link>
                  <ScrollToTopLink />
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  )
}
