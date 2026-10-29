import { readFileSync } from "node:fs"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"
import { ArchitectureExplorer } from "../../../components/portfolio/diagrams/ArchitectureExplorer"
import { ArchitectureExplorerClient } from "../../../components/portfolio/diagrams/ArchitectureExplorerClient"
import { technicalDiagrams } from "../../../data/technical-diagrams"

const diagram = technicalDiagrams.find(
  (item) => item.id === "wardrobe-processing-flow",
)

if (!diagram) {
  throw new Error("Missing wardrobe-processing-flow test fixture")
}

afterEach(() => vi.unstubAllGlobals())

describe("ArchitectureExplorer lazy boundary", () => {
  it("places the graph engine behind a client-only dynamic boundary", () => {
    const source = readFileSync(
      "components/portfolio/diagrams/ArchitectureExplorer.tsx",
      "utf8",
    )
    expect(source).toContain('"use client"')
    expect(source).toContain("dynamic(")
    expect(source).toContain("ssr: false")
    expect(source).not.toContain("@xyflow/react")
  })

  it("exposes the interactive island loading announcement", () => {
    render(<ArchitectureExplorer diagram={diagram} />)
    expect(screen.getByRole("status")).toHaveTextContent(
      "Interactive architecture view loading",
    )
  })

  it("lets keyboard users select a node and exposes its detail and announcement", async () => {
    vi.stubGlobal(
      "ResizeObserver",
      class ResizeObserverMock {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    )
    const user = userEvent.setup()
    render(<ArchitectureExplorerClient diagram={diagram} />)
    const selection = screen.getByRole("button", { name: "Selection" })
    selection.focus()
    await user.keyboard("{Enter}")
    expect(
      screen.getByRole("button", { name: "Selection — selected" }),
    ).toHaveAttribute("aria-pressed", "true")
    expect(
      screen.getByRole("heading", { name: "Selection" }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Selected module: Selection/)).toBeInTheDocument()
    expect(
      screen.getByText(/Owned the end-to-end batch upload flow/),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByLabelText("Select Background removal"))
    expect(
      screen.getByRole("button", { name: "Background removal — selected" }),
    ).toHaveAttribute("aria-pressed", "true")
    expect(
      screen.getByRole("heading", { name: "Background removal" }),
    ).toBeInTheDocument()
  })
})
