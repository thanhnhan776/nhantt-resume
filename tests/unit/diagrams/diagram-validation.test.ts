import { describe, expect, it } from "vitest"
import { validateTechnicalDiagram } from "../../../components/portfolio/diagrams/diagram-validation"
import { technicalDiagrams } from "../../../data/technical-diagrams"

const approvedDiagram = technicalDiagrams[0]
const approvedNodes = approvedDiagram.nodes ?? []
const approvedEdges = approvedDiagram.edges ?? []

describe("validateTechnicalDiagram", () => {
  it("accepts the approved wardrobe workflow", () => {
    expect(validateTechnicalDiagram(approvedDiagram).valid).toBe(true)
  })

  it("rejects duplicate node and edge IDs", () => {
    const diagram = {
      ...approvedDiagram,
      nodes: [...approvedNodes, approvedNodes[0]],
      edges: [...approvedEdges, approvedEdges[0]],
    }
    expect(validateTechnicalDiagram(diagram).errors.join(" ")).toMatch(
      /Duplicate ID.*Duplicate edge ID/,
    )
  })

  it("rejects malformed identifiers and unresolved references", () => {
    const diagram = {
      ...approvedDiagram,
      edges: [{ id: "bad id", from: "missing", to: "upload" }],
    }
    const result = validateTechnicalDiagram(diagram)
    expect(result.errors.join(" ")).toMatch(/Malformed edge ID/)
    expect(result.errors.join(" ")).toMatch(/Unresolved edge reference/)
  })

  it("rejects unsafe asset identifiers and URLs", () => {
    const diagram = {
      ...approvedDiagram,
      svgAssetId: "https://example.test/diagram.svg",
    }
    expect(validateTechnicalDiagram(diagram).valid).toBe(false)
    const unsafeUrl = { ...approvedDiagram, title: "javascript:alert(1)" }
    expect(validateTechnicalDiagram(unsafeUrl).valid).toBe(false)
  })

  it("rejects raw HTML and executable source", () => {
    const html = {
      ...approvedDiagram,
      altSummary: "<img src=x onerror=alert(1)>",
    }
    const source = { ...approvedDiagram, title: "<script>alert(1)</script>" }
    expect(validateTechnicalDiagram(html).valid).toBe(false)
    expect(validateTechnicalDiagram(source).valid).toBe(false)
  })
})
