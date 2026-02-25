"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { type Locale, translations } from "@/lib/translations";

type I18nContextValue = {
  lang: Locale;
  setLang: (next: Locale) => void;
  t: (typeof translations)[Locale];
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "ics_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>("es");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "es" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      t: translations[lang]
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside LanguageProvider");
  }
  return context;
}
