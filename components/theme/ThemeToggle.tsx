"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { THEME_OPTIONS } from "@/lib/theme/options"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <fieldset className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-border p-1">
      <legend className="sr-only">Color theme</legend>
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={mounted && theme === option.value}
          className="theme-option inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-transparent px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-pressed:bg-accent aria-pressed:text-accent-foreground"
          onClick={() => setTheme(option.value)}
        >
          {option.label}
        </button>
      ))}
    </fieldset>
  )
}
