import { readFileSync } from "node:fs"
import { afterEach, describe, expect, it, vi } from "vitest"

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe("social preview", () => {
  it("uses an absolute PNG image URL when the site origin is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://nhantt-resume.pages.dev")
    vi.resetModules()
    const { metadata } = await import("@/app/layout")
    const imageUrl = "https://nhantt-resume.pages.dev/og/portfolio.png"

    expect(metadata.openGraph?.images).toEqual([
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Portfolio of Trần Thành Nhân",
      },
    ])
    expect(metadata.twitter?.images).toEqual([imageUrl])
  })

  it("omits social metadata without a configured site origin", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "")
    vi.resetModules()
    const { metadata } = await import("@/app/layout")

    expect(metadata.openGraph).toBeUndefined()
    expect(metadata.twitter).toBeUndefined()
  })

  it("provides a 1200 by 630 PNG asset", () => {
    const image = readFileSync("public/og/portfolio.png")

    expect(image.subarray(0, 8)).toEqual(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    )
    expect(image.readUInt32BE(16)).toBe(1200)
    expect(image.readUInt32BE(20)).toBe(630)
  })
})
