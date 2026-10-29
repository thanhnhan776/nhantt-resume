import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, test, vi } from "vitest"
import { ThemeToggle } from "../../../components/theme/ThemeToggle"

const { useThemeMock } = vi.hoisted(() => ({ useThemeMock: vi.fn() }))

vi.mock("next-themes", () => ({ useTheme: useThemeMock }))

describe("ThemeToggle", () => {
  const setTheme = vi.fn()

  beforeEach(() => {
    setTheme.mockReset()
    useThemeMock.mockReturnValue({ theme: "dark", setTheme })
  })

  test("exposes labeled theme buttons and the current selection", async () => {
    render(<ThemeToggle />)

    const group = screen.getByRole("group", { name: "Color theme" })
    const darkButton = await screen.findByRole("button", { name: "Dark" })

    expect(group).toContainElement(darkButton)
    expect(darkButton).toHaveAttribute("aria-pressed", "true")
    expect(darkButton).toHaveClass("min-h-11", "min-w-11")
    expect(screen.queryByRole("button", { name: "System" })).not.toBeInTheDocument()
  })

  test("persists a selected theme through next-themes", async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)

    await user.click(screen.getByRole("button", { name: "Light" }))

    expect(setTheme).toHaveBeenCalledWith("light")
  })
})
