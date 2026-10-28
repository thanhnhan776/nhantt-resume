import type { ApprovedLink, ContentId } from "./common"

export type ProjectKind = "professional" | "personal"

export interface Project {
  id: ContentId
  kind: ProjectKind
  experienceId?: ContentId
  title: string
  problem: string
  ownership: string
  shippedSolution: string
  tradeOffs: string
  retrospectiveImprovements?: string
  achievementIds: ContentId[]
  technicalDiagramIds: ContentId[]
  techStackIds: ContentId[]
  links?: ApprovedLink[]
  approvedSnippet?: {
    title: string
    content: string
  }
}
