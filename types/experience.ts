import type { ContentId, DateRange } from "./common"

export interface Experience {
  id: ContentId
  employer: string
  role: string
  location: string
  dates: DateRange
  summary: string
  achievementIds: ContentId[]
  projectIds: ContentId[]
  techStackIds: ContentId[]
}
