import { projects } from "@/data/projects"

const routeOverrides: Record<string, string> = {
  "wardrobe-workflow": "wardrobe-processing",
  "affiliate-phase-two": "affiliate-tracking",
}

export const professionalProjects = projects.filter(
  (project) => project.kind === "professional",
)

export function workSlug(projectId: string): string {
  return routeOverrides[projectId] ?? projectId
}

export function workHref(projectId: string): string {
  return `/work/${workSlug(projectId)}`
}
