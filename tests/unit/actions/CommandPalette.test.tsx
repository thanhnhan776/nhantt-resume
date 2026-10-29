import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import {
  CommandPalette,
  isCommandShortcut,
} from "@/components/portfolio/actions/CommandPalette"
import { InteractionRoot } from "@/components/portfolio/experience/InteractionRoot"
import { experiences } from "@/data/experiences"
import type { ActionResult } from "@/lib/actions"
import { ACTIONS } from "@/lib/actions"
import { requestExperienceOpen } from "@/lib/overlay/coordinator"

class TestResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", TestResizeObserver)
  Element.prototype.scrollIntoView = vi.fn()
})

afterEach(() => {
  Reflect.deleteProperty(Element.prototype, "scrollIntoView")
  vi.unstubAllGlobals()
})

function renderPalette(
  runAction?: (action: (typeof ACTIONS)[number]) => Promise<ActionResult>,
) {
  return render(
    <InteractionRoot experiences={experiences}>
      <CommandPalette actions={ACTIONS} runAction={runAction} />
    </InteractionRoot>,
  )
}

describe("CommandPalette", () => {
  it("opens from the visible launch control and reports no matching actions", async () => {
    const user = userEvent.setup()
    renderPalette()

    await user.click(screen.getByRole("button", { name: /open commands/i }))
    expect(
      await screen.findByRole("dialog", { name: "Command palette" }),
    ).toBeVisible()

    await user.type(
      screen.getByRole("combobox", { name: "Search portfolio commands" }),
      "not-a-command",
    )
    expect(
      screen.getByText("No matching sections or actions. Try another search."),
    ).toBeVisible()
  })

  it("opens with the platform shortcut but ignores the same shortcut in an editable control", async () => {
    renderPalette()
    fireEvent.keyDown(window, { key: "k", metaKey: true })
    expect(
      await screen.findByRole("dialog", { name: "Command palette" }),
    ).toBeVisible()

    const search = screen.getByRole("combobox", {
      name: "Search portfolio commands",
    })
    fireEvent.keyDown(search, { key: "k", metaKey: true })
    expect(
      screen.getByRole("dialog", { name: "Command palette" }),
    ).toBeVisible()
  })

  it("does not claim clipboard success and exposes selectable approved email on denial", async () => {
    const user = userEvent.setup()
    const runAction = vi.fn().mockResolvedValue({
      success: false,
      reason: "Clipboard access was denied",
    })
    renderPalette(runAction)

    await user.click(screen.getByRole("button", { name: /open commands/i }))
    await user.click(
      await screen.findByRole("option", { name: "Copy email address" }),
    )

    expect(await screen.findByRole("status")).toHaveTextContent(
      /could not copy/i,
    )
    expect(
      screen.getByRole("textbox", {
        name: "Approved email address to select and copy",
      }),
    ).toHaveValue("thanhnhan.toantin@gmail.com")
  })

  it("closes the palette before selecting the next experience through the coordinator", async () => {
    const user = userEvent.setup()
    renderPalette()
    requestExperienceOpen("netvirta")
    expect(
      await screen.findByRole("dialog", { name: /netvirta.*experience/i }),
    ).toBeVisible()

    await user.click(
      screen.getByRole("button", { name: "Open command palette" }),
    )
    expect(
      await screen.findByRole("dialog", { name: "Command palette" }),
    ).toBeVisible()
    await user.click(
      screen.getByRole("option", { name: "View Trusting Social" }),
    )

    await waitFor(() => {
      expect(
        screen.getByRole("dialog", { name: /trusting social.*experience/i }),
      ).toBeVisible()
    })
    expect(
      screen.queryByRole("dialog", { name: "Command palette" }),
    ).not.toBeInTheDocument()
  })

  it("returns to the invoking experience sheet on cancel", async () => {
    const user = userEvent.setup()
    renderPalette()
    requestExperienceOpen("netvirta")
    await screen.findByRole("dialog", {
      name: /netvirta.*experience/i,
    })

    await user.click(
      screen.getByRole("button", { name: "Open command palette" }),
    )
    expect(
      await screen.findByRole("dialog", { name: "Command palette" }),
    ).toBeVisible()

    await user.keyboard("{Escape}")
    await waitFor(() => {
      expect(
        screen.queryByRole("dialog", { name: "Command palette" }),
      ).not.toBeInTheDocument()
      expect(
        screen.getByRole("dialog", { name: /netvirta.*experience/i }),
      ).toBeVisible()
    })
    await waitFor(() => {
      const activeSheet = document.querySelector<HTMLElement>(
        '[data-slot="sheet-content"][data-state="open"]',
      )
      expect(activeSheet).not.toBeNull()
      expect(activeSheet).toContainElement(
        document.activeElement as HTMLElement,
      )
    })
  })
})

describe("isCommandShortcut", () => {
  it("rejects composing, extra-modifier, and editable-context shortcuts", () => {
    const input = document.createElement("input")
    document.body.append(input)
    const inputEvent = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: true,
      bubbles: true,
    })
    input.dispatchEvent(inputEvent)

    expect(isCommandShortcut(inputEvent)).toBe(false)
    expect(
      isCommandShortcut(
        new KeyboardEvent("keydown", { key: "k", ctrlKey: true, altKey: true }),
      ),
    ).toBe(false)
    expect(
      isCommandShortcut(
        new KeyboardEvent("keydown", {
          key: "k",
          ctrlKey: true,
          isComposing: true,
        }),
      ),
    ).toBe(false)
  })
})
