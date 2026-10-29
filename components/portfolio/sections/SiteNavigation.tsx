import { ThemeToggle } from "@/components/theme/ThemeToggle"

interface SiteNavigationProps {
  name: string
}

const sections = [
  { label: "Overview", href: "#summary" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const

export function SiteNavigation({ name }: SiteNavigationProps) {
  return (
    <header className="site-header">
      <a className="site-brand" href="#top" aria-label={`${name} — home`}>
        {name}
      </a>
      <nav aria-label="Page sections" className="site-nav">
        {sections.map((section) => (
          <a key={section.href} href={section.href}>
            {section.label}
          </a>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  )
}
