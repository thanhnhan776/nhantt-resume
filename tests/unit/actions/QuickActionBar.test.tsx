import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { QuickActionBar } from "@/components/portfolio/actions/QuickActionBar"
import { ACTIONS } from "@/lib/actions"

describe("QuickActionBar", () => {
  it("makes the shared approved actions visible outside the palette", () => {
    render(<QuickActionBar actions={ACTIONS} />)

    expect(
      screen.getByRole("navigation", { name: "Quick actions" }),
    ).toBeVisible()
    for (const action of ACTIONS) {
      expect(screen.getByRole("button", { name: action.label })).toBeVisible()
    }
    expect(
      screen.getByRole("button", { name: "View résumé PDF" }),
    ).toBeVisible()
  })

  it("announces clipboard denial and exposes the approved email for selection", async () => {
    const user = userEvent.setup()
    const runAction = vi.fn().mockResolvedValue({
      success: false,
      reason: "Clipboard access was denied",
    })
    render(<QuickActionBar actions={ACTIONS} runAction={runAction} />)

    await user.click(screen.getByRole("button", { name: "Copy email address" }))

    expect(screen.getByRole("status")).toHaveTextContent(/could not copy/i)
    const email = screen.getByRole("textbox", {
      name: "Approved email address to select and copy",
    })
    expect(email).toHaveValue("thanhnhan.toantin@gmail.com")
    await user.click(email)
    expect(email).toHaveFocus()
  })

  it("sends the selected shared descriptor to the common executor", async () => {
    const user = userEvent.setup()
    const runAction = vi.fn().mockResolvedValue({ success: true })
    render(<QuickActionBar actions={ACTIONS} runAction={runAction} />)

    await user.click(screen.getByRole("button", { name: "View résumé PDF" }))

    expect(runAction).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "resume-pdf",
        target: ACTIONS.find((a) => a.id === "resume-pdf")?.target,
      }),
    )
  })
})
