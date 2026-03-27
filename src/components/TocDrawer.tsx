'use client'

import { useState, useEffect } from 'react'
import { TocItem } from '@/types/post'
import { cn } from '@/lib/utils'
import { AlignLeft, X } from 'lucide-react'

interface TocDrawerProps {
  items: TocItem[]
  label?: string
}

export function TocDrawer({ items, label = 'On This Page' }: TocDrawerProps) {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id)
        })
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0.1 }
    )
    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  if (items.length === 0) return null

  return (
    <>
      {/* Floating trigger — hidden on xl where static sidebar shows */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open table of contents"
        className={cn(
          'fixed bottom-6 left-6 z-40 xl:hidden',
          'flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium',
          'bg-background border border-border shadow-md text-muted-foreground',
          'hover:text-foreground hover:border-primary/50 transition-all'
        )}
      >
        <AlignLeft className="h-3.5 w-3.5" />
        目錄 / Contents
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm xl:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-label="Table of contents"
        aria-modal="true"
        className={cn(
          'fixed top-0 left-0 h-full z-50 w-72 max-w-[85vw] xl:hidden',
          'bg-background border-r border-border shadow-xl',
          'flex flex-col transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-sm font-semibold">{label}</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close table of contents"
            className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* TOC list */}
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="space-y-0.5 border-l border-border pl-4">
            {items.map((item) => (
              <li
                key={item.id}
                style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
              >
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block py-1.5 text-sm transition-colors hover:text-foreground',
                    activeId === item.id
                      ? 'text-primary font-medium'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
