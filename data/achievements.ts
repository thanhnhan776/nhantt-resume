import type { Achievement } from "../types"

export const achievements: Achievement[] = [
  {
    id: "wardrobe-workflow-delivery",
    statement:
      "Delivered a multi-stage wardrobe workflow with batch upload, processing states, and error/retry handling.",
    category: "delivery",
  },
  {
    id: "media-signing-optimization",
    statement:
      "Introduced parallel media URL signing through a Go service; approximate owner recollection is that initial multi-second API loading fell to under one second.",
    category: "impact",
  },
  {
    id: "affiliate-phase-two",
    statement:
      "Implemented phase-two conversion tracking across five affiliate providers, including webhook or scheduled polling ingestion and reconciliation.",
    category: "scope",
  },
  {
    id: "vcs-admin-workflow",
    statement:
      "The active admin workflow replaces manual form setup, link sharing, submission sorting, and report preparation; the owner reports completing the workflow while commuting in under 10 minutes, an estimate not independently measured.",
    category: "delivery",
  },
]
