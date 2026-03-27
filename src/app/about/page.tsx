'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { LanguageToggle } from '@/components/LanguageToggle'
import Link from 'next/link'
import { Github, Twitter, Mail, ExternalLink, Download } from 'lucide-react'
import type { Metadata } from 'next'

// ────────────────────────────────────────────────────────────
// CONFIGURE YOUR CONTENT HERE
// ────────────────────────────────────────────────────────────

// 1. Upload your resume PDF to Google Drive
// 2. Share it: "Anyone with the link can view"
// 3. Copy the File ID from the share URL:
//    https://drive.google.com/file/d/<FILE_ID>/view
// 4. Paste the FILE_ID below

const RESUME = {
  zh: {
    fileId: 'YOUR_CHINESE_RESUME_FILE_ID',  // ← 替換成中文履歷 File ID
    label: '中文履歷',
  },
  en: {
    fileId: 'YOUR_ENGLISH_RESUME_FILE_ID',  // ← replace with English résumé File ID
    label: 'English Résumé',
  },
}

const SOCIAL = [
  { href: 'https://github.com/yourusername',  icon: Github, label: 'GitHub' },
  { href: 'https://twitter.com/yourusername', icon: Twitter, label: 'Twitter / X' },
  { href: 'mailto:hello@example.com',         icon: Mail,   label: 'Email' },
]

const SKILLS = [
  { category: 'Frontend',  items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'] },
  { category: 'Backend',   items: ['Node.js', 'PostgreSQL', 'Redis', 'REST / GraphQL'] },
  { category: 'DevOps',    items: ['Linux', 'Nginx', 'Docker', 'GitHub Actions'] },
  { category: 'Tools',     items: ['Git', 'VS Code', 'Figma', 'Notion'] },
]

const BIO = {
  en: `Hi! I'm a software engineer based in Taiwan.
I'm passionate about building clean, fast, and accessible web applications.
Outside of coding, I enjoy reading, hiking, and experimenting with new technologies.`,
  zh: `嗨！我是一位位於台灣的軟體工程師。
我熱衷於打造乾淨、快速且具備無障礙性的網頁應用程式。
除了寫程式之外，我喜歡閱讀、爬山，以及嘗試各種新技術。`,
}

// ────────────────────────────────────────────────────────────

function driveEmbedUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`
}

function driveDownloadUrl(fileId: string) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

export default function AboutPage() {
  const { lang, t } = useLanguage()
  const resume = RESUME[lang]
  const isPlaceholder = resume.fileId.startsWith('YOUR_')

  return (
    <div className="container mx-auto max-w-4xl px-4 py-14">

      {/* ── Profile ─────────────────────────────────────────── */}
      <section className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-14">
        {/* Avatar */}
        <div className="shrink-0 w-28 h-28 rounded-full ring-4 ring-primary/20 bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center text-4xl font-bold text-primary select-none">
          Y
        </div>

        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">{t('about.title')}</h1>
            <LanguageToggle />
          </div>
          <p className="text-muted-foreground mb-4">Software Engineer · Taiwan</p>

          {/* Social */}
          <div className="flex justify-center sm:justify-start gap-2">
            {SOCIAL.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bio ─────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">{t('about.bio.title')}</h2>
        <div className="rounded-xl border border-border bg-card p-6">
          {BIO[lang].split('\n').map((line, i) => (
            <p key={i} className={`text-muted-foreground leading-relaxed ${i > 0 ? 'mt-3' : ''}`}>
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* ── Skills ──────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-4">{t('about.skills.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILLS.map(({ category, items }) => (
            <div key={category} className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md bg-secondary text-secondary-foreground px-2.5 py-1 text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Resume ──────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{t('about.resume.title')}</h2>
          <div className="flex items-center gap-3">
            {/* Resume lang toggle */}
            <LanguageToggle />
            {/* Download */}
            {!isPlaceholder && (
              <a
                href={driveDownloadUrl(resume.fileId)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                {t('about.resume.download')}
              </a>
            )}
          </div>
        </div>

        {isPlaceholder ? (
          /* Setup instructions */
          <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">{t('about.resume.hint')}</p>
            <p className="text-xs text-muted-foreground/70">
              Share your PDF on Google Drive → copy the File ID → paste it in{' '}
              <code className="font-mono bg-muted px-1 py-0.5 rounded">
                src/app/about/page.tsx
              </code>
            </p>
          </div>
        ) : (
          /* Google Drive embed */
          <div className="rounded-xl border border-border overflow-hidden bg-muted/20">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
              <span className="text-xs font-medium text-muted-foreground">
                {resume.label}
              </span>
              <a
                href={`https://drive.google.com/file/d/${resume.fileId}/view`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                Open in Drive
              </a>
            </div>
            <iframe
              src={driveEmbedUrl(resume.fileId)}
              className="w-full"
              style={{ height: '80vh', minHeight: '600px' }}
              allow="autoplay"
              title={resume.label}
            />
          </div>
        )}
      </section>

      {/* ── Contact ─────────────────────────────────────────── */}
      <section>
        <h2 className="text-lg font-semibold mb-4">{t('about.contact.title')}</h2>
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <p className="text-muted-foreground text-sm">
            {lang === 'zh'
              ? '有任何問題或合作機會，歡迎直接來信！'
              : 'Have a question or want to work together? Feel free to reach out!'}
          </p>
          <a
            href="mailto:hello@example.com"
            className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Mail className="h-4 w-4" />
            {lang === 'zh' ? '傳送郵件' : 'Send Email'}
          </a>
        </div>
      </section>

    </div>
  )
}
