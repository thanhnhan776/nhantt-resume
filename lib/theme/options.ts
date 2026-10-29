export const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const

export type ThemeName = (typeof THEME_OPTIONS)[number]["value"]
