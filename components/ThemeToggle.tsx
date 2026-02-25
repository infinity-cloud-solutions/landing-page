'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ics_theme'

type ThemeMode = 'dark' | 'light'

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('dark')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    const next = stored === 'light' ? 'light' : 'dark'
    setMode(next)
    if (next === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }, [])

  function toggle() {
    const next: ThemeMode = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    window.localStorage.setItem(STORAGE_KEY, next)
    if (next === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-600/70 bg-slate-900/70 text-slate-100 transition hover:border-slate-400 hover:bg-slate-800/80"
    >
      <span className="icon-outlined text-[20px]">{mode === 'dark' ? 'light_mode' : 'dark_mode'}</span>
    </button>
  )
}
