import { describe, expect, it } from "vitest"

import {
  buildExperienceUrl,
  getExperienceIdFromUrl,
} from "@/lib/overlay/url-state"

describe("experience URL state", () => {
  const allowedIds = new Set(["netvirta", "trusting-social"])

  it("reads an allowlisted experience ID", () => {
    expect(
      getExperienceIdFromUrl(
        new URL("https://portfolio.test/?experience=netvirta"),
        allowedIds,
      ),
    ).toBe("netvirta")
  })

  it("ignores an invalid experience ID", () => {
    expect(
      getExperienceIdFromUrl(
        new URL("https://portfolio.test/?experience=unknown"),
        allowedIds,
      ),
    ).toBeUndefined()
  })

  it("sets the selection while preserving unrelated URL state", () => {
    expect(
      buildExperienceUrl(
        "https://portfolio.test/?campaign=summer#contact",
        "netvirta",
      ),
    ).toBe("/?campaign=summer&experience=netvirta#experience")
  })

  it("removes only the selection when closing", () => {
    expect(
      buildExperienceUrl(
        "https://portfolio.test/?campaign=summer&experience=netvirta#contact",
      ),
    ).toBe("/?campaign=summer#contact")
  })
})
