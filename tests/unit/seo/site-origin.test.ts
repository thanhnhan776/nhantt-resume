import { describe, expect, it } from "vitest"
import { getSiteOrigin } from "@/lib/seo/site-origin"

describe("getSiteOrigin", () => {
  it("returns undefined when no production origin is configured", () => {
    expect(getSiteOrigin(undefined)).toBeUndefined()
  })

  it("normalizes an approved HTTPS origin", () => {
    expect(getSiteOrigin("https://portfolio.example/")).toBe(
      "https://portfolio.example",
    )
  })

  it.each([
    "not a URL",
    "http://portfolio.example",
    "https://user:password@portfolio.example",
    "https://portfolio.example/path",
    "https://portfolio.example/?preview=true",
    "https://portfolio.example/#home",
  ])("rejects an unsafe or non-origin value: %s", (value) => {
    expect(getSiteOrigin(value)).toBeUndefined()
  })
})
