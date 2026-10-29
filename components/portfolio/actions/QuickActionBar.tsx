"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { type ActionResult, executeAction } from "@/lib/actions"
import type { ActionDescriptor } from "@/types"

interface QuickActionBarProps {
  actions: readonly ActionDescriptor[]
  onAction?(action: ActionDescriptor): void
  runAction?(action: ActionDescriptor): Promise<ActionResult>
}

export function QuickActionBar({
  actions,
  onAction,
  runAction = executeAction,
}: QuickActionBarProps) {
  const [announcement, setAnnouncement] = useState("")
  const [fallbackEmail, setFallbackEmail] = useState("")

  const handleAction = async (action: ActionDescriptor) => {
    onAction?.(action)
    setAnnouncement("")
    setFallbackEmail("")

    const result = await runAction(action)
    if (result.success) {
      if (action.kind === "email") setAnnouncement("Email address copied.")
      return
    }

    setAnnouncement(
      action.kind === "email"
        ? "Could not copy the email address. Select it below."
        : result.reason,
    )
    if (action.kind === "email") setFallbackEmail(action.target)
  }

  return (
    <nav aria-label="Quick actions">
      <ul className="flex flex-wrap gap-2">
        {actions.map((action) => (
          <li key={action.id}>
            <Button
              type="button"
              variant="outline"
              className="min-h-11"
              onClick={() => void handleAction(action)}
            >
              {action.label}
            </Button>
          </li>
        ))}
      </ul>
      <div className="mt-2 text-sm" aria-live="polite" role="status">
        {announcement}
        {fallbackEmail && (
          <input
            aria-label="Approved email address to select and copy"
            className="mt-2 block min-h-11 w-full max-w-sm select-all rounded-md border bg-background px-3 text-foreground"
            onClick={(event) => event.currentTarget.select()}
            readOnly
            value={fallbackEmail}
          />
        )}
      </div>
    </nav>
  )
}
