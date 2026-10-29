import { ThemeToggle } from "@/components/theme/ThemeToggle"

interface SiteNavigationProps {
  name: string
}

const sections = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
  { label: "Résumé", href: "/resume/Tran-Thanh-Nhan_Resume_VN_Remote.pdf" },
] as const

export function SiteNavigation({ name }: SiteNavigationProps) {
  return (
    <header className="site-header">
      <a className="site-brand" href="/" aria-label={`${name} — home`}>
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
