import { afterEach, describe, expect, it, vi } from "vitest"

import { ACTIONS, executeAction } from "@/lib/actions"
import type { ActionDescriptor } from "@/types"

afterEach(() => {
  document.body.replaceChildren()
})

describe("portfolio actions", () => {
  it("includes experience actions and the supplied approved resume asset", () => {
    expect(
      ACTIONS.filter(({ id }) => id.startsWith("experience-")).length,
    ).toBeGreaterThan(0)
    expect(ACTIONS).toContainEqual({
      id: "resume-pdf",
      kind: "resume",
      label: "View résumé PDF",
      target: "/resume/Tran-Thanh-Nhan_Resume_VN_Remote.pdf",
    })
  })

  it("navigates to an existing section target", async () => {
    const section = document.createElement("section")
    section.id = "summary"
    section.scrollIntoView = vi.fn()
    document.body.append(section)

    const result = await executeAction(actionById("section-summary"))

    expect(result).toEqual({ success: true })
    expect(section.scrollIntoView).toHaveBeenCalledOnce()
  })

  it("dispatches only the stable experience ID", async () => {
    const dispatch = vi.fn()
    const result = await executeAction(actionById("experience-netvirta"), {
      dispatch,
    })

    expect(result).toEqual({ success: true })
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "portfolio:experience-select",
        detail: { experienceId: "netvirta" },
      }),
    )
  })

  it("navigates to the approved static PDF", async () => {
    const navigate = vi.fn()
    const result = await executeAction(actionById("resume-pdf"), { navigate })

    expect(result).toEqual({ success: true })
    expect(navigate).toHaveBeenCalledWith(
      "/resume/Tran-Thanh-Nhan_Resume_VN_Remote.pdf",
    )
  })

  it("reports clipboard denial without claiming success", async () => {
    const writeText = vi
      .fn()
      .mockRejectedValue(new DOMException("Denied", "NotAllowedError"))
    const result = await executeAction(actionById("copy-email"), {
      clipboard: { writeText },
    })

    expect(result).toEqual({
      success: false,
      reason: "Clipboard access was denied",
    })
    expect(writeText).toHaveBeenCalledWith("thanhnhan.toantin@gmail.com")
  })

  it("rejects a modified descriptor", async () => {
    const forged: ActionDescriptor = {
      ...actionById("copy-email"),
      target: "attacker@example.com",
    }

    await expect(executeAction(forged)).resolves.toEqual({
      success: false,
      reason: "Action is not approved",
    })
  })
})

function actionById(id: string): ActionDescriptor {
  const action = ACTIONS.find((candidate) => candidate.id === id)
  if (!action) throw new Error(`Missing test action: ${id}`)
  return action
}
