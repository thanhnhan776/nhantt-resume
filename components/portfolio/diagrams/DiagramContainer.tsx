import type { CSSProperties } from "react"
import type { ContentId, DiagramRendererKind } from "../../../types/common"
import type { TechnicalDiagram } from "../../../types/technical-diagram"
import { ArchitectureExplorer } from "./ArchitectureExplorer"
import { validateTechnicalDiagram } from "./diagram-validation"
import { WorkflowSvg } from "./WorkflowSvg"

export interface DiagramContainerProps {
  diagram: TechnicalDiagram
  selectedModuleId?: ContentId
  status?: "loading" | "error" | "empty" | "ready"
  permitted?: boolean
  explanation?: string
}

const RENDERERS: Readonly<
  Record<DiagramRendererKind, "workflow" | "explorer" | null>
> = {
  text: "workflow",
  "nodes-edges": "explorer",
  "svg-asset": null,
}

const layoutStyle: CSSProperties = {
  aspectRatio: "16 / 9",
  minHeight: "12rem",
  width: "100%",
}

const APPROVED_STATE_COPY = {
  loading: "Diagram loading.",
  error: "Diagram unavailable.",
  empty: "No diagram content is available.",
  permission: "This diagram is not available for display.",
} as const

export function DiagramContainer({
  diagram,
  selectedModuleId,
  status = "ready",
  permitted = true,
  explanation,
}: DiagramContainerProps) {
  const validation = validateTechnicalDiagram(diagram)
  const stateCopy =
    explanation ??
    APPROVED_STATE_COPY[
      status === "ready" ? (validation.valid ? "empty" : "error") : status
    ]
  const renderer = RENDERERS[diagram.renderer as DiagramRendererKind]
  const hasSteps = diagram.steps.length > 0
  const unavailable =
    status !== "ready" ||
    !permitted ||
    !hasSteps ||
    !renderer ||
    !validation.valid

  return (
    <div className="diagram-container" style={layoutStyle}>
      {unavailable ? (
        <>
          <p role="status">
            {!permitted ? APPROVED_STATE_COPY.permission : stateCopy}
          </p>
          {explanation && !permitted && <p>{explanation}</p>}
          {permitted && diagram.title && <p>{diagram.title}</p>}
        </>
      ) : (
        <>
          <h2>{diagram.title}</h2>
          {renderer === "workflow" ? (
            <WorkflowSvg diagram={diagram} />
          ) : (
            <>
              <WorkflowSvg diagram={diagram} showSvg={false} />
              <ArchitectureExplorer
                diagram={diagram}
                selectedModuleId={selectedModuleId}
              />
            </>
          )}
        </>
      )}
      <style>{`.diagram-container { box-sizing: border-box; min-width: 0; }`}</style>
    </div>
  )
}
