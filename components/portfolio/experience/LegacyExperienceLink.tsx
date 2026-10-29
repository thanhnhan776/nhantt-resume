"use client"

import { useEffect } from "react"
import { getExperienceIdFromUrl } from "@/lib/overlay/url-state"

export function LegacyExperienceLink({ ids }: { ids: readonly string[] }) {
  useEffect(() => {
    const id = getExperienceIdFromUrl(new URL(window.location.href), new Set(ids))
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [ids])

  return null
}
