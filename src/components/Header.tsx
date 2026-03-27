'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'
import { PenLine, Rss } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const navLinks = [
    { href: '/',       label: t('nav.posts') },
    { href: '/about/', label: t('nav.about') },
  ]

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg focus:ring-2 focus:ring-primary"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              aria-label="My Blog – home"
              className="flex items-center gap-2 font-semibold text-lg hover:text-primary transition-colors"
            >
              <PenLine className="h-5 w-5" />
              <span>My Blog</span>
            </Link>

            {/* Nav */}
            <nav aria-label="Main navigation" className="flex items-center gap-1">
              {navLinks.map(({ href, label }) => {
                const isActive =
                  href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(href)

                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'px-3 py-2 text-sm rounded-md transition-colors',
                      isActive
                        ? 'text-foreground font-medium bg-accent'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    )}
                  >
                    {label}
                  </Link>
                )
              })}

              <Link
                href="/feed.xml"
                aria-label={t('nav.rss')}
                className="inline-flex items-center justify-center w-9 h-9 text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
              >
                <Rss className="h-4 w-4" />
              </Link>

              <div className="w-px h-5 bg-border mx-1" />

              <LanguageToggle />
              <ThemeToggle />
            </nav>

          </div>
        </div>
      </header>
    </>
  )
}
