import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { DiagramContainer } from "../../../components/portfolio/diagrams/DiagramContainer"
import type { TechnicalDiagram } from "../../../types/technical-diagram"

const diagram: TechnicalDiagram = {
  id: "example-flow",
  projectId: "example-project",
  title: "Example flow",
  renderer: "text",
  altSummary: "Files are uploaded and then processed.",
  steps: [
    { id: "upload", label: "Upload files", detail: "Choose source files" },
    { id: "process", label: "Process files" },
  ],
}

describe("DiagramContainer", () => {
  it("renders caption, accessible title, ordered steps, and stable dimensions", () => {
    const { container } = render(<DiagramContainer diagram={diagram} />)
    expect(
      screen.getByRole("heading", { name: "Example flow" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("list").textContent).toContain("Upload files")
    expect(screen.getByText(diagram.altSummary)).toBeInTheDocument()
    expect(container.querySelector(".diagram-container")).toHaveStyle({
      aspectRatio: "16 / 9",
      minHeight: "12rem",
      width: "100%",
    })
  })

  it.each(["loading", "error", "empty"] as const)(
    "renders safe %s copy only",
    (status) => {
      render(
        <DiagramContainer
          diagram={diagram}
          status={status}
          explanation="Approved status message."
        />,
      )
      expect(screen.getByText("Approved status message.")).toBeInTheDocument()
      expect(screen.queryByText("Upload files")).not.toBeInTheDocument()
    },
  )

  it("omits diagram data when permission is absent", () => {
    render(<DiagramContainer diagram={diagram} permitted={false} />)
    expect(
      screen.getByText("This diagram is not available for display."),
    ).toBeInTheDocument()
    expect(screen.queryByText("Example flow")).not.toBeInTheDocument()
    expect(screen.queryByText("Upload files")).not.toBeInTheDocument()
  })

  it("rejects unknown or missing renderer values", () => {
    const unknown = {
      ...diagram,
      renderer: "unknown" as TechnicalDiagram["renderer"],
    }
    const missing = {
      ...diagram,
      renderer: undefined as unknown as TechnicalDiagram["renderer"],
    }
    const { rerender } = render(<DiagramContainer diagram={unknown} />)
    expect(screen.queryByRole("list")).not.toBeInTheDocument()
    rerender(<DiagramContainer diagram={missing} />)
    expect(screen.queryByRole("list")).not.toBeInTheDocument()
  })

  it("omits an unconfigured SVG asset renderer safely", () => {
    const assetDiagram = {
      ...diagram,
      renderer: "svg-asset" as const,
      svgAssetId: "unpublished-flow",
    }
    render(<DiagramContainer diagram={assetDiagram} />)
    expect(screen.getByRole("status")).toHaveTextContent(
      "No diagram content is available.",
    )
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })

  it("rejects malformed graph references before rendering a graph", () => {
    const malformed = {
      ...diagram,
      renderer: "nodes-edges" as const,
      nodes: [{ id: "upload", label: "Upload files" }],
      edges: [{ id: "invalid-edge", from: "upload", to: "missing-node" }],
    }
    render(<DiagramContainer diagram={malformed} />)
    expect(screen.getByRole("status")).toHaveTextContent("Diagram unavailable.")
    expect(
      screen.queryByRole("region", {
        name: "Interactive architecture explorer",
      }),
    ).not.toBeInTheDocument()
  })

  it("keeps node-edge text available while the interactive island loads", () => {
    const graph = {
      ...diagram,
      renderer: "nodes-edges" as const,
      steps: [
        { id: "upload-stage", label: "Upload files" },
        { id: "process-stage", label: "Process files" },
      ],
      nodes: [
        { id: "upload", label: "Upload files" },
        { id: "process", label: "Process files" },
        { id: "select", label: "Select files" },
      ],
      edges: [
        { id: "upload-process", from: "upload", to: "process" },
        {
          id: "process-select",
          from: "process",
          to: "select",
          label: "skip optional step",
        },
      ],
    }
    const { container } = render(<DiagramContainer diagram={graph} />)
    expect(container.querySelector(".diagram-container")).not.toHaveStyle({
      aspectRatio: "16 / 9",
    })
    expect(
      screen.getByRole("list", { name: "Workflow connections" }),
    ).toHaveTextContent("Process files to Select files (skip optional step)")
    expect(screen.getByRole("status")).toHaveTextContent(
      "Interactive architecture view loading",
    )
  })
})
