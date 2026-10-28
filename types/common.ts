/** Stable, lowercase URL-safe identifier shared by public records. */
export type ContentId = string

/** Calendar month in YYYY-MM form; intentionally has no timezone semantics. */
export type YearMonth = string

export interface DateRange {
  start: YearMonth
  end?: YearMonth
}

export type ApprovedLinkKind = "website" | "repository" | "demo" | "article" | "linkedin" | "email"

export interface ApprovedLink {
  kind: ApprovedLinkKind
  label: string
  href: string
}

export type ContactAction = "email" | "linkedin" | "github"

/** Action descriptor is data only; consumers implement the behavior. */
export interface ActionDescriptor {
  id: ContentId
  kind: ContactAction | "section" | "resume"
  label: string
  target: string
  shortcut?: string
}

export interface Profile {
  name: string
  headline: string
  location: string
  timezone: string
  experienceClaim?: {
    label: string
    asOf: YearMonth
  }
  contact: {
    email: string
    links: ApprovedLink[]
  }
  resume?: {
    href: string
    label: string
  }
}

export interface Education {
  id: ContentId
  school: string
  degree: string
  dates: DateRange
  honors?: string[]
}

export type DiagramRendererKind = "text" | "nodes-edges" | "svg-asset"

export type AchievementCategory = "scope" | "quality" | "delivery" | "reliability" | "impact"

export interface AchievementMetric {
  value: number
  unit: string
  baseline?: string
  timeWindow?: string
  evidenceLabel: string
}
