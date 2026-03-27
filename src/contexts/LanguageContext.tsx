'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { type Lang, t as translate, type dict } from '@/lib/i18n'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Translate a key using the current language */
  t: (key: keyof typeof dict.en) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (k) => k,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  // Hydrate from localStorage once on mount
  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'zh' || stored === 'en') setLangState(stored)
  }, [])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    localStorage.setItem('lang', next)
  }, [])

  const t = useCallback(
    (key: keyof typeof dict.en) => translate(lang, key),
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
