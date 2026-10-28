import type { ContentId, DiagramRendererKind } from "./common"

export interface DiagramStep {
  id: ContentId
  label: string
  detail?: string
}

export interface DiagramNode {
  id: ContentId
  label: string
  detail?: string
}

export interface DiagramEdge {
  id: ContentId
  from: ContentId
  to: ContentId
  label?: string
}

export interface TechnicalDiagram {
  id: ContentId
  projectId: ContentId
  title: string
  renderer: DiagramRendererKind
  altSummary: string
  steps: DiagramStep[]
  nodes?: DiagramNode[]
  edges?: DiagramEdge[]
  svgAssetId?: ContentId
}
