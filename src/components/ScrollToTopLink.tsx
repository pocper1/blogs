'use client'

export function ScrollToTopLink() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors py-1 w-full text-left"
    >
      ↑ Back to top
    </button>
  )
}
