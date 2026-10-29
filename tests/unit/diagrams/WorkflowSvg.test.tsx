import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { WorkflowSvg } from "../../../components/portfolio/diagrams/WorkflowSvg"
import type { TechnicalDiagram } from "../../../types/technical-diagram"

const diagram: TechnicalDiagram = {
  id: "simple-flow",
  projectId: "sample-project",
  title: "Sample workflow",
  renderer: "text",
  altSummary: "Images are uploaded, then processed.",
  steps: [
    { id: "upload", label: "Upload images", detail: "Choose source files" },
    { id: "process", label: "Process images" },
  ],
  nodes: [
    { id: "upload", label: "Upload images" },
    { id: "process", label: "Process images" },
    { id: "select", label: "Select images" },
  ],
  edges: [
    { id: "upload-process", from: "upload", to: "process" },
    { id: "process-select", from: "process", to: "select", label: "optional" },
  ],
}

describe("WorkflowSvg", () => {
  it("renders safe SVG labels and equivalent ordered text", () => {
    const { container } = render(<WorkflowSvg diagram={diagram} />)

    expect(container.querySelector("svg")?.getAttribute("viewBox")).toBe(
      "0 0 720 216",
    )
    expect(container.querySelector("svg")?.getAttribute("width")).toBe("100%")
    expect(screen.getAllByText("Upload images")).toHaveLength(2)
    expect(screen.getAllByRole("list")[0].textContent).toContain(
      "Process images",
    )
    expect(
      screen.getByRole("list", { name: "Workflow connections" }),
    ).toHaveTextContent("Process images to Select images (optional)")
    expect(
      screen.getByText("Images are uploaded, then processed."),
    ).toBeInTheDocument()
  })

  it("uses currentColor and supports both theme tokens without animation", () => {
    const { container, rerender } = render(
      <WorkflowSvg diagram={diagram} theme="light" />,
    )
    expect(container.querySelector("figure")).toHaveStyle({
      color: "var(--foreground, #18181b)",
    })
    expect(container.querySelector("path")).toHaveAttribute(
      "stroke",
      "currentColor",
    )

    rerender(<WorkflowSvg diagram={diagram} theme="dark" />)
    expect(container.querySelector("figure")).toHaveStyle({
      color: "var(--foreground, #f4f4f5)",
    })
    expect(container.querySelector("style")?.textContent).toContain(
      "prefers-reduced-motion: reduce",
    )
    expect(container.querySelector("style")?.textContent).not.toContain(
      "@keyframes",
    )
  })

  it("renders no scroll-capturing or interactive SVG controls", () => {
    const { container } = render(<WorkflowSvg diagram={diagram} />)
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    )
    expect(
      container.querySelector("svg [onwheel], svg [onpointerdown]"),
    ).toBeNull()
  })
})
