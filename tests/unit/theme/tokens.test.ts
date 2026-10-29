import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { describe, expect, test } from "vitest"

const stylesheetPath = resolve(process.cwd(), "app/globals.css")

describe("theme tokens", () => {
  test("defines shared semantic tokens for light and dark themes", async () => {
    const stylesheet = await readFile(stylesheetPath, "utf8")

    expect(stylesheet).toContain(":root {")
    expect(stylesheet).toContain(".dark {")
    expect(stylesheet).toContain("--background:")
    expect(stylesheet).toContain("--foreground:")
    expect(stylesheet).toContain("--muted-foreground:")
    expect(stylesheet).toContain("--border:")
    expect(stylesheet).toContain("--primary:")
    expect(stylesheet).toContain("--ring:")
    expect(stylesheet).toContain("--success:")
    expect(stylesheet).toContain("--warning:")
    expect(stylesheet).toContain("--info:")
    expect(stylesheet).toContain("--destructive:")
    expect(stylesheet).toContain("@theme inline {")
  })

  test("respects reduced motion and declares visible focus styling", async () => {
    const stylesheet = await readFile(stylesheetPath, "utf8")

    expect(stylesheet).toContain("@media (prefers-reduced-motion: reduce)")
    expect(stylesheet).toContain("--motion-fast: 0ms")
    expect(stylesheet).toContain(":focus-visible")
  })
})
