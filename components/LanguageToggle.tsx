"use client";
import React from "react";
import { useI18n } from "@/lib/i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <div className="language-toggle inline-flex items-center gap-2">
      <button
        aria-label="Switch to Spanish"
        className={`px-2 py-1 rounded text-sm ${lang === "es" ? "bg-white text-black" : "bg-transparent text-neutral-300"}`}
        onClick={() => setLang("es")}
      >ES</button>
      <button
        aria-label="Switch to English"
        className={`px-2 py-1 rounded text-sm ${lang === "en" ? "bg-white text-black" : "bg-transparent text-neutral-300"}`}
        onClick={() => setLang("en")}
      >EN</button>
    </div>
  );
}
