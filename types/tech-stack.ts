import type { ApprovedLink, ContentId } from "./common"

export type TechStackCategory =
  | "language"
  | "framework"
  | "platform"
  | "database"
  | "tool"

export interface TechStack {
  id: ContentId
  label: string
  category: TechStackCategory
  link?: ApprovedLink
}
