'use client'

import { useEffect, useState } from 'react'
import { TocItem } from '@/types/post'
import { cn } from '@/lib/utils'

interface TableOfContentsProps {
  items: TocItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
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

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
        On This Page
      </p>
      <ul className="space-y-1 border-l border-border pl-4">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                'block text-sm py-0.5 transition-colors hover:text-foreground truncate',
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
  )
}
