import { describe, expect, it } from "vitest"
import { createRobots, createSitemap } from "@/lib/seo/crawl-policy"

describe("createRobots", () => {
  it("keeps the no-host preview crawlable so the page-level noindex is visible", () => {
    expect(createRobots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
    })
  })

  it("publishes the sitemap URL only for a configured production origin", () => {
    expect(createRobots("https://portfolio.example")).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://portfolio.example/sitemap.xml",
    })
  })
})

describe("createSitemap", () => {
  it("omits absolute sitemap entries when the production host is not approved", () => {
    expect(createSitemap()).toEqual([])
  })

  it("contains only the canonical homepage, without query-selected states", () => {
    expect(createSitemap("https://portfolio.example")).toEqual([
      { url: "https://portfolio.example" },
    ])
  })
})
