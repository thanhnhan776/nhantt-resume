"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { type ActionResult, executeAction } from "@/lib/actions"
import {
  OVERLAY_COMMAND_CLOSE_EVENT,
  OVERLAY_COMMAND_OPEN_EVENT,
  requestCommandClose,
  requestCommandOpen,
  requestExperienceOpen,
} from "@/lib/overlay/coordinator"
import type { ActionDescriptor } from "@/types"

interface CommandPaletteProps {
  actions: readonly ActionDescriptor[]
  runAction?(action: ActionDescriptor): Promise<ActionResult>
}

export function CommandPalette({
  actions,
  runAction = executeAction,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [announcement, setAnnouncement] = useState("")
  const [fallbackEmail, setFallbackEmail] = useState("")
  const pendingExperienceRef = useRef<string | null>(null)

  const togglePalette = useCallback(() => {
    if (open) requestCommandClose()
    else requestCommandOpen()
  }, [open])

  useEffect(() => {
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isCommandShortcut(event)) return
      event.preventDefault()
      togglePalette()
    }

    window.addEventListener(OVERLAY_COMMAND_OPEN_EVENT, handleOpen)
    window.addEventListener(OVERLAY_COMMAND_CLOSE_EVENT, handleClose)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener(OVERLAY_COMMAND_OPEN_EVENT, handleOpen)
      window.removeEventListener(OVERLAY_COMMAND_CLOSE_EVENT, handleClose)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [togglePalette])

  const handleAction = async (action: ActionDescriptor) => {
    setAnnouncement("")
    setFallbackEmail("")

    if (action.kind === "resume" && action.id.startsWith("experience-")) {
      pendingExperienceRef.current = action.target
      requestCommandClose()
      return
    }

    const result = await runAction(action)
    if (result.success) {
      setAnnouncement(
        action.kind === "email"
          ? "Email address copied."
          : `${action.label} selected.`,
      )
      if (action.kind !== "email") requestCommandClose()
      return
    }

    setAnnouncement(
      action.kind === "email"
        ? "Could not copy the email address. Select it below."
        : result.reason,
    )
    if (action.kind === "email") setFallbackEmail(action.target)
  }

  const handleCloseAutoFocus = (event: Event) => {
    event.preventDefault()
    const experienceId = pendingExperienceRef.current
    if (!experienceId) return

    pendingExperienceRef.current = null
    requestAnimationFrame(() => requestExperienceOpen(experienceId))
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        aria-keyshortcuts="Meta+K Control+K"
        onClick={requestCommandOpen}
      >
        Open commands <kbd>⌘/Ctrl K</kbd>
      </Button>
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (nextOpen) requestCommandOpen()
          else requestCommandClose()
        }}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Command palette</DialogTitle>
          <DialogDescription>
            Search portfolio sections and approved actions.
          </DialogDescription>
        </DialogHeader>
        <DialogContent
          className="top-1/3 translate-y-0 overflow-hidden p-0"
          onCloseAutoFocus={handleCloseAutoFocus}
          showCloseButton={false}
        >
          <Command label="Search portfolio commands">
            <CommandInput
              aria-label="Search portfolio commands"
              placeholder="Search sections and actions…"
            />
            <CommandList>
              <CommandEmpty>
                No matching sections or actions. Try another search.
              </CommandEmpty>
              {actions.map((action) => (
                <CommandItem
                  key={action.id}
                  value={`${action.label} ${action.target}`}
                  onSelect={() => void handleAction(action)}
                >
                  {action.label}
                </CommandItem>
              ))}
            </CommandList>
            <div
              className="border-t px-3 py-2 text-sm"
              aria-live="polite"
              role="status"
            >
              {announcement}
              {fallbackEmail && (
                <input
                  aria-label="Approved email address to select and copy"
                  className="mt-2 block min-h-11 w-full select-all rounded-md border bg-background px-3 text-foreground"
                  onClick={(event) => event.currentTarget.select()}
                  readOnly
                  value={fallbackEmail}
                />
              )}
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function isCommandShortcut(event: KeyboardEvent): boolean {
  const key = event.key.toLowerCase()
  const modifier = event.metaKey !== event.ctrlKey
  const extraModifier = event.altKey || event.shiftKey

  return (
    key === "k" &&
    modifier &&
    !extraModifier &&
    !event.defaultPrevented &&
    !event.isComposing &&
    !isEditableTarget(event.target)
  )
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false

  return (
    target.isContentEditable ||
    target.closest(
      '[contenteditable="true"], input, textarea, select, [role="textbox"]',
    ) !== null
  )
}
