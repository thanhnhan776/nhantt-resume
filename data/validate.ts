import type { Achievement, ApprovedLink, DateRange, Experience, Project, TechStack, TechnicalDiagram } from "../types"

export interface ValidationDiagnostic {
  path: string
  message: string
}

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const MONTH_PATTERN = /^(\d{4})-(\d{2})$/

export function validateId(id: string, path: string): ValidationDiagnostic[] {
  return ID_PATTERN.test(id) ? [] : [{ path, message: `"${id}" must be lowercase URL-safe text using letters, numbers, and single hyphens.` }]
}

export function validateUniqueIds(records: readonly { id: string }[], domain: string): ValidationDiagnostic[] {
  const seen = new Set<string>()
  return records.flatMap((record, index) => {
    const path = `${domain}[${index}].id`
    const idIssues = validateId(record.id, path)
    if (seen.has(record.id)) return [...idIssues, { path, message: `Duplicate ID "${record.id}" in ${domain}.` }]
    seen.add(record.id)
    return idIssues
  })
}

export function validateYearMonth(value: string, path: string): ValidationDiagnostic[] {
  const match = MONTH_PATTERN.exec(value)
  if (!match || Number(match[2]) < 1 || Number(match[2]) > 12) {
    return [{ path, message: `"${value}" must be a real calendar month in YYYY-MM format.` }]
  }
  return []
}

export function validateDateRange(range: DateRange, path: string): ValidationDiagnostic[] {
  const issues = validateYearMonth(range.start, `${path}.start`)
  if (range.end !== undefined) issues.push(...validateYearMonth(range.end, `${path}.end`))
  if (range.end !== undefined && MONTH_PATTERN.test(range.start) && MONTH_PATTERN.test(range.end) && range.end < range.start) {
    issues.push({ path: `${path}.end`, message: "End month must not precede the start month." })
  }
  return issues
}

function validateLinks(links: readonly ApprovedLink[] | undefined, path: string): ValidationDiagnostic[] {
  return (links ?? []).flatMap((link, index) => {
    const valid = link.href.startsWith("mailto:") ? /^mailto:[^\s@]+@[^\s@]+$/.test(link.href) : /^https:\/\//.test(link.href)
    return valid ? [] : [{ path: `${path}[${index}].href`, message: "Link must use https: or a valid mailto: address." }]
  })
}

export interface ContentRecords {
  experiences: readonly Experience[]
  projects: readonly Project[]
  achievements: readonly Achievement[]
  techStack: readonly TechStack[]
  diagrams?: readonly TechnicalDiagram[]
}

export function validateContent(records: ContentRecords): ValidationDiagnostic[] {
  const diagrams = records.diagrams ?? []
  const issues = [
    ...validateUniqueIds(records.experiences, "experiences"),
    ...validateUniqueIds(records.projects, "projects"),
    ...validateUniqueIds(records.achievements, "achievements"),
    ...validateUniqueIds(records.techStack, "techStack"),
    ...validateUniqueIds(diagrams, "diagrams"),
  ]
  const experienceIds = new Set(records.experiences.map((item) => item.id))
  const projectIds = new Set(records.projects.map((item) => item.id))
  const achievementIds = new Set(records.achievements.map((item) => item.id))
  const stackIds = new Set(records.techStack.map((item) => item.id))
  const diagramIds = new Set(diagrams.map((item) => item.id))
  const references = (ids: readonly string[], available: ReadonlySet<string>, path: string) => ids.flatMap((id, index) => available.has(id) ? [] : [{ path: `${path}[${index}]`, message: `Reference "${id}" does not exist.` }])
  const projectById = new Map(records.projects.map((item) => [item.id, item]))

  records.experiences.forEach((item, index) => {
    const path = `experiences[${index}]`
    issues.push(...validateDateRange(item.dates, `${path}.dates`), ...references(item.achievementIds, achievementIds, `${path}.achievementIds`), ...references(item.projectIds, projectIds, `${path}.projectIds`), ...references(item.techStackIds, stackIds, `${path}.techStackIds`))
    item.projectIds.forEach((projectId, referenceIndex) => {
      const project = projectById.get(projectId)
      if (project?.kind === "professional" && project.experienceId !== item.id) issues.push({ path: `${path}.projectIds[${referenceIndex}]`, message: `Professional project "${projectId}" must reference experience "${item.id}".` })
      if (project?.kind === "personal") issues.push({ path: `${path}.projectIds[${referenceIndex}]`, message: `Personal project "${projectId}" must not be listed under an experience.` })
    })
  })
  records.projects.forEach((item, index) => {
    const path = `projects[${index}]`
    if (item.kind === "professional" && (!item.experienceId || !experienceIds.has(item.experienceId))) issues.push({ path: `${path}.experienceId`, message: "Professional projects must reference an existing experience." })
    if (item.kind === "personal" && item.experienceId !== undefined) issues.push({ path: `${path}.experienceId`, message: "Personal projects must not reference an experience." })
    issues.push(...references(item.achievementIds, achievementIds, `${path}.achievementIds`), ...references(item.technicalDiagramIds, diagramIds, `${path}.technicalDiagramIds`), ...references(item.techStackIds, stackIds, `${path}.techStackIds`), ...validateLinks(item.links, `${path}.links`))
  })
  records.techStack.forEach((item, index) => issues.push(...validateLinks(item.link ? [item.link] : [], `techStack[${index}].link`)))
  diagrams.forEach((diagram, index) => {
    const path = `diagrams[${index}]`
    if (!projectIds.has(diagram.projectId)) issues.push({ path: `${path}.projectId`, message: `Project "${diagram.projectId}" does not exist.` })
    if (diagram.renderer === "svg-asset" && !diagram.svgAssetId) issues.push({ path: `${path}.svgAssetId`, message: "SVG diagrams must reference an approved SVG asset." })
    if (diagram.renderer !== "svg-asset" && diagram.svgAssetId) issues.push({ path: `${path}.svgAssetId`, message: "Only SVG diagrams may reference an SVG asset." })
    if (diagram.svgAssetId && !ID_PATTERN.test(diagram.svgAssetId)) issues.push(...validateId(diagram.svgAssetId, `${path}.svgAssetId`))
    const localIds = [...diagram.steps, ...(diagram.nodes ?? []), ...(diagram.edges ?? [])].map((item) => item.id)
    const seen = new Set<string>()
    localIds.forEach((id, localIndex) => {
      const localPath = `${path}.items[${localIndex}].id`
      issues.push(...validateId(id, localPath))
      if (seen.has(id)) issues.push({ path: localPath, message: `Duplicate step/node/edge ID "${id}" within diagram.` })
      seen.add(id)
    })
    const nodeIds = new Set((diagram.nodes ?? []).map((node) => node.id))
    ;(diagram.edges ?? []).forEach((edge, edgeIndex) => {
      if (!nodeIds.has(edge.from)) issues.push({ path: `${path}.edges[${edgeIndex}].from`, message: `Node "${edge.from}" does not exist in this diagram.` })
      if (!nodeIds.has(edge.to)) issues.push({ path: `${path}.edges[${edgeIndex}].to`, message: `Node "${edge.to}" does not exist in this diagram.` })
    })
  })
  return issues
}
