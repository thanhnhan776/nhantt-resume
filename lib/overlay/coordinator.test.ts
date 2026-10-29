import { describe, expect, it } from "vitest"

import { initialOverlayState, overlayReducer } from "@/lib/overlay/coordinator"

describe("overlay coordinator", () => {
  it("returns to the previous experience after command cancellation", () => {
    const experience = overlayReducer(initialOverlayState, {
      type: "open-experience",
      experienceId: "netvirta",
    })
    const command = overlayReducer(experience, { type: "open-command" })

    expect(overlayReducer(command, { type: "close-command" })).toEqual(
      experience,
    )
  })

  it("opens command without a prior experience", () => {
    expect(
      overlayReducer(initialOverlayState, { type: "open-command" }),
    ).toEqual({ type: "command", returnTo: "none" })
  })

  it("does not overwrite a command return target with a second open", () => {
    const command = overlayReducer(
      { type: "experience", experienceId: "netvirta" },
      { type: "open-command" },
    )

    expect(overlayReducer(command, { type: "open-command" })).toEqual(command)
  })
})
