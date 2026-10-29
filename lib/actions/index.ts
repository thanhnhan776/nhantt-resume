import { experiences } from "@/data/experiences"
import { profile } from "@/data/profile"
import type { ActionDescriptor } from "@/types"

const SECTIONS = [
  { id: "summary", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const

export const ACTIONS: readonly ActionDescriptor[] = [
  ...SECTIONS.map(({ id, label }) => ({
    id: `section-${id}`,
    kind: "section" as const,
    label: `Go to ${label}`,
    target: id,
  })),
  ...experiences.map((experience) => ({
    id: `experience-${experience.id}`,
    kind: "resume" as const,
    label: `View ${experience.employer}`,
    target: experience.id,
  })),
  ...(profile.resume
    ? [
        {
          id: "resume-pdf",
          kind: "resume" as const,
          label: profile.resume.label,
          target: profile.resume.href,
        },
      ]
    : []),
  {
    id: "copy-email",
    kind: "email",
    label: "Copy email address",
    target: profile.contact.email,
  },
  ...profile.contact.links
    .filter((link) => link.kind === "linkedin" || link.label === "GitHub")
    .map((link) => ({
      id: link.label.toLowerCase(),
      kind: link.label.toLowerCase() as "linkedin" | "github",
      label: link.label,
      target: link.href,
    })),
]

export type ActionResult =
  | { success: true }
  | { success: false; reason: string }

export async function executeAction(
  action: ActionDescriptor,
  dependencies: {
    navigate?: (target: string) => void
    clipboard?: Pick<Clipboard, "writeText">
    dispatch?: (event: CustomEvent<{ experienceId: string }>) => void
  } = {},
): Promise<ActionResult> {
  if (
    !ACTIONS.some(
      (allowed) =>
        allowed.id === action.id &&
        allowed.kind === action.kind &&
        allowed.target === action.target,
    )
  ) {
    return { success: false, reason: "Action is not approved" }
  }
  if (action.kind === "section") {
    const element = document.getElementById(action.target)
    if (!element) return { success: false, reason: "Section was not found" }
    element.scrollIntoView()
    return { success: true }
  }
  if (action.kind === "resume") {
    if (action.id.startsWith("experience-")) {
      if (!experiences.some(({ id }) => id === action.target))
        return { success: false, reason: "Experience was not found" }
      const event = new CustomEvent("portfolio:experience-select", {
        detail: { experienceId: action.target },
      })
      ;(dependencies.dispatch ?? ((value) => window.dispatchEvent(value)))(
        event,
      )
      return { success: true }
    }
    if (action.id === "resume-pdf" && profile.resume?.href === action.target) {
      ;(dependencies.navigate ?? ((target) => window.location.assign(target)))(
        action.target,
      )
      return { success: true }
    }
    return { success: false, reason: "Resume action is not approved" }
  }
  if (action.kind === "email") {
    try {
      await (dependencies.clipboard ?? navigator.clipboard).writeText(
        action.target,
      )
      return { success: true }
    } catch {
      return { success: false, reason: "Clipboard access was denied" }
    }
  }
  if (action.kind === "linkedin" || action.kind === "github") {
    ;(dependencies.navigate ?? ((target) => window.location.assign(target)))(
      action.target,
    )
    return { success: true }
  }
  return { success: false, reason: "Unsupported action" }
}
