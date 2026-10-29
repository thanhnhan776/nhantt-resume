"use client"

import { type ReactNode, useState } from "react"

import { Button } from "@/components/ui/button"
import type { ContentId } from "@/types"

interface CodeViewProps {
  snippetId: ContentId
  content: string
  accessibleLabel: string
  title?: string
  presentation?: "plain-text" | "formatted"
  children: ReactNode
}

export function CodeView({
  snippetId,
  content,
  accessibleLabel,
  title,
  presentation = "plain-text",
  children,
}: CodeViewProps) {
  const [mode, setMode] = useState<"narrative" | "code">("narrative")
  const scrollRegionClassName = "max-w-full overflow-x-auto"

  return (
    <section aria-label={title ?? accessibleLabel} data-snippet-id={snippetId}>
      {title && <h3 className="mb-3 font-semibold">{title}</h3>}
      <fieldset className="mb-3 flex flex-wrap gap-2">
        <legend className="sr-only">Story presentation</legend>
        <Button
          type="button"
          variant="outline"
          aria-pressed={mode === "narrative"}
          onClick={() => setMode("narrative")}
        >
          Narrative view
        </Button>
        <Button
          type="button"
          variant="outline"
          aria-pressed={mode === "code"}
          onClick={() => setMode("code")}
        >
          Code view
        </Button>
      </fieldset>
      {mode === "narrative" ? (
        <div>{children}</div>
      ) : (
        <figure aria-label={accessibleLabel}>
          <figcaption className="sr-only">{accessibleLabel}</figcaption>
          <div className={scrollRegionClassName}>
            {/* biome-ignore lint/a11y/noNoninteractiveTabindex: Focus enables keyboard scrolling inside this contained code region. */}
            <section aria-label="Scrollable code sample" tabIndex={0}>
              <pre
                className="w-max min-w-full rounded-md border border-border bg-muted p-4 font-mono text-sm leading-relaxed text-foreground"
                data-presentation={presentation}
              >
                <code>{content}</code>
              </pre>
            </section>
          </div>
        </figure>
      )}
    </section>
  )
}
