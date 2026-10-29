"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { THEME_OPTIONS } from "@/lib/theme/options"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <fieldset className="inline-flex items-center gap-1 rounded-full border border-border/70 p-1">
      <legend className="sr-only">Color theme</legend>
      {THEME_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={mounted && theme === option.value}
          className="theme-option inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-transparent text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-pressed:bg-accent aria-pressed:text-accent-foreground"
          onClick={() => setTheme(option.value)}
          title={option.label}
        >
          {option.value === "system" ? (
            <span aria-hidden="true" className="px-1 text-xs">
              Auto
            </span>
          ) : option.value === "light" ? (
            <Sun aria-hidden="true" size={18} />
          ) : (
            <Moon aria-hidden="true" size={18} />
          )}
          <span className="sr-only">{option.label}</span>
        </button>
      ))}
    </fieldset>
  )
}
