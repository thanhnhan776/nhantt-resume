"use client"

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
} from "react"
import { achievements as publicAchievements } from "@/data/achievements"
import { projects as publicProjects } from "@/data/projects"
import { techStack as publicTechStack } from "@/data/tech-stack"
import { technicalDiagrams as publicTechnicalDiagrams } from "@/data/technical-diagrams"
import {
  initialOverlayState,
  OVERLAY_COMMAND_CLOSE_EVENT,
  OVERLAY_COMMAND_OPEN_EVENT,
  OVERLAY_EXPERIENCE_SELECT_EVENT,
  type OverlayState,
  overlayReducer,
} from "@/lib/overlay/coordinator"
import {
  buildExperienceUrl,
  getExperienceIdFromUrl,
} from "@/lib/overlay/url-state"
import type {
  Achievement,
  ContentId,
  Experience,
  Project,
  TechnicalDiagram,
  TechStack,
} from "@/types"
import { ExperienceSheet } from "./ExperienceSheet"

export interface InteractionRootProps {
  experiences: readonly Experience[]
  projects?: readonly Project[]
  achievements?: readonly Achievement[]
  techStack?: readonly TechStack[]
  diagrams?: readonly TechnicalDiagram[]
  initialOverlay?: OverlayState
  children?: React.ReactNode
}

interface PageSnapshot {
  focusedElement: HTMLElement | null
  scrollX: number
  scrollY: number
}

function normalizeRouteUrl(overlay: OverlayState): void {
  const url = new URL(window.location.href)
  const nextExperience =
    overlay.type === "experience" ? overlay.experienceId : undefined
  if (url.searchParams.get("experience") === nextExperience) return
  window.history.replaceState(
    window.history.state,
    "",
    buildExperienceUrl(window.location.href, nextExperience),
  )
}

function restorePage(
  snapshot: PageSnapshot | null,
  fallback: HTMLElement | null,
) {
  if (snapshot) window.scrollTo(snapshot.scrollX, snapshot.scrollY)
  const target = snapshot?.focusedElement?.isConnected
    ? snapshot.focusedElement
    : fallback
  target?.focus({ preventScroll: true })
}

export function InteractionRoot({
  experiences,
  projects = publicProjects,
  achievements = publicAchievements,
  techStack = publicTechStack,
  diagrams = publicTechnicalDiagrams,
  initialOverlay = initialOverlayState,
  children,
}: InteractionRootProps) {
  const [overlay, dispatch] = useReducer(overlayReducer, initialOverlay)
  const registry = useMemo(
    () => new Map(experiences.map((experience) => [experience.id, experience])),
    [experiences],
  )
  const allowedIds = useMemo(() => new Set(registry.keys()), [registry])
  const snapshotRef = useRef<PageSnapshot | null>(null)
  const previousOverlayRef = useRef<OverlayState>(overlay)
  const fallbackRef = useRef<HTMLElement | null>(null)
  const pendingCommandReturnRef = useRef(false)
  const fallbackRefCallback = useCallback((node: HTMLSpanElement | null) => {
    fallbackRef.current =
      node?.parentElement?.querySelector<HTMLElement>("#experience") ?? null
  }, [])

  const openExperience = useCallback(
    (experienceId: ContentId, { fromHistory = false } = {}) => {
      if (!registry.has(experienceId)) return
      if (overlay.type === "command") return
      if (overlay.type !== "experience") {
        snapshotRef.current = {
          focusedElement:
            document.activeElement instanceof HTMLElement &&
            document.activeElement !== document.body
              ? document.activeElement
              : null,
          scrollX: window.scrollX,
          scrollY: window.scrollY,
        }
      }
      if (!fromHistory) {
        window.history.pushState(
          window.history.state,
          "",
          buildExperienceUrl(window.location.href, experienceId),
        )
      }
      dispatch({ type: "open-experience", experienceId })
    },
    [overlay.type, registry],
  )

  const closeExperience = useCallback(() => {
    if (overlay.type !== "experience") return
    const urlHasSelection = new URL(window.location.href).searchParams.has(
      "experience",
    )
    if (urlHasSelection) {
      window.history.replaceState(
        window.history.state,
        "",
        buildExperienceUrl(window.location.href),
      )
    }
    dispatch({ type: "close-overlay" })
  }, [overlay.type])

  const openCommand = useCallback(() => {
    if (overlay.type === "experience") pendingCommandReturnRef.current = true
    dispatch({ type: "open-command" })
  }, [overlay.type])

  const closeCommand = useCallback(() => {
    dispatch({ type: "close-command" })
  }, [])

  useLayoutEffect(() => {
    const onExperienceSelect = (event: Event) => {
      const id = (event as CustomEvent<{ experienceId?: string }>).detail
        ?.experienceId
      if (typeof id === "string") openExperience(id)
    }
    const onPopState = () => {
      const id = getExperienceIdFromUrl(
        new URL(window.location.href),
        allowedIds,
      )
      if (id) {
        openExperience(id, { fromHistory: true })
      } else if (overlay.type === "experience") {
        dispatch({ type: "close-overlay" })
      }
    }
    window.addEventListener(OVERLAY_EXPERIENCE_SELECT_EVENT, onExperienceSelect)
    window.addEventListener("popstate", onPopState)
    window.addEventListener(OVERLAY_COMMAND_OPEN_EVENT, openCommand)
    window.addEventListener(OVERLAY_COMMAND_CLOSE_EVENT, closeCommand)
    const initialId = getExperienceIdFromUrl(
      new URL(window.location.href),
      allowedIds,
    )
    if (initialId) openExperience(initialId, { fromHistory: true })
    else if (new URL(window.location.href).searchParams.has("experience")) {
      window.history.replaceState(
        window.history.state,
        "",
        buildExperienceUrl(window.location.href),
      )
    }
    return () => {
      window.removeEventListener(
        OVERLAY_EXPERIENCE_SELECT_EVENT,
        onExperienceSelect,
      )
      window.removeEventListener("popstate", onPopState)
      window.removeEventListener(OVERLAY_COMMAND_OPEN_EVENT, openCommand)
      window.removeEventListener(OVERLAY_COMMAND_CLOSE_EVENT, closeCommand)
    }
  }, [allowedIds, closeCommand, openCommand, openExperience, overlay.type])

  useEffect(() => {
    if (overlay.type === "experience") normalizeRouteUrl(overlay)
    const previous = previousOverlayRef.current
    if (previous.type === "command" && overlay.type !== "command") {
      const wasReturn =
        previous.returnTo !== "none" && overlay.type === "experience"
      if (wasReturn && pendingCommandReturnRef.current) {
        pendingCommandReturnRef.current = false
        requestAnimationFrame(() =>
          document
            .querySelector<HTMLElement>("[data-slot='sheet-content']")
            ?.focus(),
        )
      } else if (overlay.type === "none") {
        restorePage(snapshotRef.current, fallbackRef.current)
        snapshotRef.current = null
      }
    }
    if (previous.type === "experience" && overlay.type === "none") {
      restorePage(snapshotRef.current, fallbackRef.current)
      snapshotRef.current = null
    }
    previousOverlayRef.current = overlay
  }, [overlay])

  const activeExperience =
    overlay.type === "experience"
      ? registry.get(overlay.experienceId)
      : undefined

  return (
    <>
      {children}
      <span ref={fallbackRefCallback} hidden />
      {activeExperience && (
        <ExperienceSheet
          key={activeExperience.id}
          experience={activeExperience}
          projects={projects}
          achievements={achievements}
          techStack={techStack}
          diagrams={diagrams}
          onClose={closeExperience}
        />
      )}
    </>
  )
}
