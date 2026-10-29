import { describe, expect, it } from "vitest"
import { profile } from "@/data/profile"
import { createPersonJsonLd, serializeJsonLd } from "@/lib/seo/person-json-ld"

describe("createPersonJsonLd", () => {
  it("uses approved public identity, role and public profile links", () => {
    expect(createPersonJsonLd(profile)).toEqual({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Trần Thành Nhân",
      jobTitle: "Senior Full-Stack Engineer",
      sameAs: [
        "https://www.linkedin.com/in/nhantt/",
        "https://github.com/thanhnhan776/",
      ],
    })
  })

  it("adds the site URL only when an origin is supplied", () => {
    expect(createPersonJsonLd(profile, "https://portfolio.example").url).toBe(
      "https://portfolio.example",
    )
  })
})

describe("serializeJsonLd", () => {
  it("escapes less-than characters to prevent script termination", () => {
    const json = serializeJsonLd({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "</script><script>alert(1)</script>",
      jobTitle: "Engineer",
      sameAs: [],
    })

    expect(json).not.toContain("</script>")
    expect(json).toContain("\\u003c/script>")
  })
})
