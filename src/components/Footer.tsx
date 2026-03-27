import Link from 'next/link'
import { Github, Twitter, Rss } from 'lucide-react'

const socialLinks = [
  { href: 'https://github.com/yourusername', label: 'GitHub', icon: Github },
  { href: 'https://twitter.com/yourusername', label: 'Twitter / X', icon: Twitter },
  { href: '/feed.xml', label: 'RSS Feed', icon: Rss },
]

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} My Blog. Built with{' '}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
            >
              Next.js
            </a>
            .
          </p>

          <nav aria-label="Social links" className="flex items-center gap-2">
            {socialLinks.map(({ href, label, icon: Icon }) => {
              const isExternal = href.startsWith('http')
              return (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
