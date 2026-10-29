import type { TechnicalDiagram } from "../../../types/technical-diagram"

export interface DiagramValidationResult {
  valid: boolean
  errors: string[]
}

const SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const EXECUTABLE_CONTENT =
  /<\/?(?:[a-z][^>]*|!DOCTYPE|script|iframe|object|embed)\b|\bon[a-z]+\s*=|\b(?:javascript|data|vbscript)\s*:/i

function hasUnsafeText(value: unknown): boolean {
  return typeof value === "string" && EXECUTABLE_CONTENT.test(value)
}

export function validateTechnicalDiagram(
  diagram: TechnicalDiagram,
): DiagramValidationResult {
  const errors: string[] = []
  const ids = new Set<string>()
  const nodes = diagram.nodes ?? []

  const addId = (id: string, kind: string) => {
    if (!SAFE_ID.test(id)) errors.push(`Malformed ${kind} ID: ${id}`)
    if (ids.has(id)) errors.push(`Duplicate ID: ${id}`)
    ids.add(id)
  }

  addId(diagram.id, "diagram")
  diagram.steps.forEach((step) => {
    addId(step.id, "step")
    if (hasUnsafeText(step.label) || hasUnsafeText(step.detail)) {
      errors.push(`Unsafe step content: ${step.id}`)
    }
  })
  nodes.forEach((node) => {
    addId(node.id, "node")
    if (hasUnsafeText(node.label) || hasUnsafeText(node.detail)) {
      errors.push(`Unsafe node content: ${node.id}`)
    }
  })

  const edgeIds = new Set<string>()
  ;(diagram.edges ?? []).forEach((edge) => {
    if (!SAFE_ID.test(edge.id)) errors.push(`Malformed edge ID: ${edge.id}`)
    if (edgeIds.has(edge.id)) errors.push(`Duplicate edge ID: ${edge.id}`)
    edgeIds.add(edge.id)
    if (
      !nodes.some((node) => node.id === edge.from) ||
      !nodes.some((node) => node.id === edge.to)
    ) {
      errors.push(`Unresolved edge reference: ${edge.id}`)
    }
    if (hasUnsafeText(edge.label))
      errors.push(`Unsafe edge content: ${edge.id}`)
  })

  if (diagram.svgAssetId && !SAFE_ID.test(diagram.svgAssetId))
    errors.push("Unsafe SVG asset identifier")
  const strings = [diagram.projectId, diagram.title, diagram.altSummary]
  if (strings.some(hasUnsafeText)) errors.push("Unsafe diagram content")
  return { valid: errors.length === 0, errors }
}
