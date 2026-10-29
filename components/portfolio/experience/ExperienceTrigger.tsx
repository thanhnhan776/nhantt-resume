"use client"

import { requestExperienceOpen } from "@/lib/overlay/coordinator"
import type { ContentId } from "@/types"

interface ExperienceTriggerProps {
  experienceId: ContentId
  children: React.ReactNode
}

export function ExperienceTrigger({
  experienceId,
  children,
}: ExperienceTriggerProps) {
  function openExperience() {
    requestExperienceOpen(experienceId)
  }

  return (
    <button type="button" onClick={openExperience} className="group">
      {children}
    </button>
  )
}
