import type { ContentId } from "@/types"

export type OverlayState =
  | { type: "none" }
  | { type: "experience"; experienceId: ContentId }
  | {
      type: "command"
      returnTo: "none" | { type: "experience"; experienceId: ContentId }
    }

export type OverlayAction =
  | { type: "open-experience"; experienceId: ContentId }
  | { type: "open-command" }
  | { type: "close-command" }
  | { type: "close-overlay" }

export const OVERLAY_COMMAND_OPEN_EVENT = "portfolio:command-open"
export const OVERLAY_COMMAND_CLOSE_EVENT = "portfolio:command-close"
export const OVERLAY_EXPERIENCE_SELECT_EVENT = "portfolio:experience-select"

export function requestCommandOpen(): void {
  window.dispatchEvent(new Event(OVERLAY_COMMAND_OPEN_EVENT))
}

export function requestCommandClose(): void {
  window.dispatchEvent(new Event(OVERLAY_COMMAND_CLOSE_EVENT))
}

export function requestExperienceOpen(experienceId: ContentId): void {
  window.dispatchEvent(
    new CustomEvent(OVERLAY_EXPERIENCE_SELECT_EVENT, {
      detail: { experienceId },
    }),
  )
}

export const initialOverlayState: OverlayState = { type: "none" }

export function overlayReducer(
  state: OverlayState,
  action: OverlayAction,
): OverlayState {
  switch (action.type) {
    case "open-experience":
      if (state.type === "command") return state
      return { type: "experience", experienceId: action.experienceId }
    case "open-command":
      if (state.type === "command") return state
      return {
        type: "command",
        returnTo:
          state.type === "experience"
            ? { type: "experience", experienceId: state.experienceId }
            : "none",
      }
    case "close-command":
      if (state.type !== "command") return state
      if (state.returnTo === "none") return initialOverlayState
      return state.returnTo
    case "close-overlay":
      return initialOverlayState
  }
}
