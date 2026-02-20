"use client"
import React, { createContext, useContext, useState } from 'react'
import translations from './translations'

type Lang = 'es' | 'en'

const LanguageContext = createContext({
  lang: 'es' as Lang,
  setLang: (l: Lang) => {}
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useTranslations() {
  const { lang } = useContext(LanguageContext)
  return (key: string) => {
    const parts = key.split('.')
    let cur: any = translations[lang]
    for (const p of parts) {
      cur = cur?.[p]
      if (cur == null) return key
    }
    return cur
  }
}
