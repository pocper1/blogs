import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-32 text-center">
      <p className="text-8xl font-bold text-muted-foreground/20 mb-4">404</p>
      <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-8">
        The page you&#39;re looking for doesn&#39;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Back to blog
      </Link>
    </div>
  )
}
