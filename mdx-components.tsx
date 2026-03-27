import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { CopyButton } from '@/components/CopyButton'
import React from 'react'

// Callout component used as <Callout type="info"> in MDX
export function Callout({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'tip' | 'danger'
  children: React.ReactNode
}) {
  const styles = {
    info:    { border: 'border-blue-500/50',   bg: 'bg-blue-500/5',   icon: 'ℹ',  label: 'Info' },
    tip:     { border: 'border-green-500/50',  bg: 'bg-green-500/5',  icon: '💡', label: 'Tip' },
    warning: { border: 'border-yellow-500/50', bg: 'bg-yellow-500/5', icon: '⚠️', label: 'Warning' },
    danger:  { border: 'border-red-500/50',    bg: 'bg-red-500/5',    icon: '🚨', label: 'Danger' },
  }
  const s = styles[type]
  return (
    <div className={`my-6 rounded-lg border-l-4 ${s.border} ${s.bg} px-4 py-3`} role="note">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {s.icon} {s.label}
      </p>
      <div className="text-sm [&>p]:mb-0">{children}</div>
    </div>
  )
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children, id, ...props }) => (
      <h2 id={id} className="group" {...props}>
        <a href={`#${id}`} className="no-underline">
          {children}
          <span className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground">#</span>
        </a>
      </h2>
    ),
    h3: ({ children, id, ...props }) => (
      <h3 id={id} className="group" {...props}>
        <a href={`#${id}`} className="no-underline">
          {children}
          <span className="ml-2 opacity-0 group-hover:opacity-100 text-muted-foreground">#</span>
        </a>
      </h3>
    ),
    // Wrap <pre> with a relative group container for the copy button
    pre: ({ children, ...props }) => {
      // Extract raw text from the code element inside <pre>
      const codeEl = React.Children.toArray(children).find(
        (child): child is React.ReactElement<{ children?: string }> =>
          React.isValidElement(child) && child.type === 'code'
      )
      const rawText =
        codeEl && typeof codeEl.props.children === 'string'
          ? codeEl.props.children
          : ''

      return (
        <div className="relative group">
          <pre {...props}>{children}</pre>
          {rawText && <CopyButton text={rawText} />}
        </div>
      )
    },
    img: ({ src, alt, ...props }) => (
      <span className="block my-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? ''} className="rounded-lg mx-auto max-w-full" {...props} />
      </span>
    ),
    a: ({ href, children, ...props }) => {
      // Only http(s) and mailto are truly external — everything else
      // (relative paths, /pages, #anchors) is internal.
      const isExternal =
        href?.startsWith('http://') ||
        href?.startsWith('https://') ||
        href?.startsWith('mailto:')

      if (!isExternal) {
        // Absolute internal path → Next.js Link for prefetching
        if (href?.startsWith('/')) {
          return <Link href={href} {...props}>{children}</Link>
        }
        // Hash anchors (#section) or relative paths → plain <a>
        return <a href={href} {...props}>{children}</a>
      }

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={
            typeof children === 'string'
              ? `${children} (opens in new tab)`
              : undefined
          }
          {...props}
        >
          {children}
        </a>
      )
    },
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-primary/50 bg-muted/50 px-4 py-3 rounded-r-lg my-6 not-italic"
        {...props}
      >
        {children}
      </blockquote>
    ),
    // Export Callout so MDX files can use <Callout type="warning">
    Callout,
    ...components,
  }
}
