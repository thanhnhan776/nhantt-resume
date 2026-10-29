import { expect, test } from "@playwright/test"

test("cold-loads with the system color scheme and no hydration errors", async ({
  browser,
}) => {
  const context = await browser.newContext({ colorScheme: "dark" })
  const page = await context.newPage()
  const errors: string[] = []

  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text())
  })
  page.on("pageerror", (error) => errors.push(error.message))

  await page.goto("/")
  await expect(page.locator("html")).toHaveClass(/dark/)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Trần Thành Nhân",
  )
  await expect(page.getByRole("button", { name: "System" })).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  expect(errors).toEqual([])

  await context.close()
})

test("persists Light and follows the system preference in System mode", async ({
  browser,
}) => {
  const context = await browser.newContext({ colorScheme: "dark" })
  const page = await context.newPage()

  await page.goto("/")
  await expect(page.getByRole("button", { name: "System" })).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  await page.getByRole("button", { name: "Light" }).click()
  await expect(page.locator("html")).not.toHaveClass(/dark/)
  await expect(page.getByRole("button", { name: "Light" })).toHaveAttribute(
    "aria-pressed",
    "true",
  )
  await page.reload()
  await expect(page.locator("html")).not.toHaveClass(/dark/)
  await expect(page.getByRole("button", { name: "Light" })).toHaveAttribute(
    "aria-pressed",
    "true",
  )

  await page.getByRole("button", { name: "System" }).click()
  await expect(page.locator("html")).toHaveClass(/dark/)
  await page.emulateMedia({ colorScheme: "light" })
  await expect(page.locator("html")).not.toHaveClass(/dark/)

  await context.close()
})

test("keeps the shell usable at 320px with reduced motion and keyboard focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 })
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")

  await page.keyboard.press("Tab")
  await expect(
    page.getByRole("link", { name: "Skip to main content" }),
  ).toBeFocused()

  const dimensions = await page
    .locator(".theme-option")
    .evaluateAll((buttons) =>
      buttons.map((button) => {
        const rect = button.getBoundingClientRect()
        return { width: rect.width, height: rect.height }
      }),
    )
  expect(dimensions.length).toBe(3)
  expect(
    dimensions.every(({ width, height }) => width >= 44 && height >= 44),
  ).toBe(true)

  const layout = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
    transitionDuration: getComputedStyle(
      document.querySelector(".theme-option") as HTMLElement,
    ).transitionDuration,
  }))
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
  expect(layout.transitionDuration).toBe("0s")
})
