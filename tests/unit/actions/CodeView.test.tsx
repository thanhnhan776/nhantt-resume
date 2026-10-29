import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { CodeView } from "@/components/portfolio/code/CodeView"

describe("CodeView", () => {
  it("keeps the narrative as the initial view and toggles to semantic code", async () => {
    const user = userEvent.setup()
    render(
      <CodeView
        snippetId="test-reconstruction"
        accessibleLabel="Test-only illustrative reconstruction"
        title="Illustrative snippet"
        content={'const example = "not executed"'}
      >
        <p>Test-only reconstructed narrative.</p>
      </CodeView>,
    )

    expect(screen.getByText("Test-only reconstructed narrative.")).toBeVisible()
    expect(
      screen.getByRole("button", { name: "Narrative view" }),
    ).toHaveAttribute("aria-pressed", "true")

    await user.click(screen.getByRole("button", { name: "Code view" }))

    expect(screen.getByRole("button", { name: "Code view" })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
    expect(
      screen.getByText('const example = "not executed"').closest("code"),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("figure", {
        name: "Test-only illustrative reconstruction",
      }),
    ).toBeVisible()
  })

  it("contains horizontal overflow and uses semantic theme tokens", async () => {
    const user = userEvent.setup()
    const { container } = render(
      <CodeView
        snippetId="long-line-reconstruction"
        accessibleLabel="Test-only long-line reconstruction"
        content="a-very-long-reconstructed-line-that-needs-horizontal-scrolling"
      >
        <p>Readable narrative.</p>
      </CodeView>,
    )

    await user.click(screen.getByRole("button", { name: "Code view" }))
    const scrollRegion = screen.getByRole("region", {
      name: "Scrollable code sample",
    })
    expect(scrollRegion.parentElement).toHaveClass(
      "overflow-x-auto",
      "max-w-full",
    )
    expect(container.querySelector("pre")).toHaveClass(
      "bg-muted",
      "text-foreground",
    )
  })
})
