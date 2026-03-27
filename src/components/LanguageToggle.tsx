'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className="flex items-center rounded-md border border-border overflow-hidden text-xs font-medium"
      role="group"
      aria-label="Language selector"
    >
      <button
        onClick={() => setLang('zh')}
        aria-pressed={lang === 'zh'}
        className={cn(
          'px-2 py-1.5 transition-colors',
          lang === 'zh'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        )}
      >
        中
      </button>
      <button
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={cn(
          'px-2 py-1.5 transition-colors',
          lang === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
        )}
      >
        EN
      </button>
    </div>
  )
}
