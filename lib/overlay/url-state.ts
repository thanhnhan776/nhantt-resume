import type { ContentId } from "@/types"

export const EXPERIENCE_QUERY_PARAM = "experience"
export const EXPERIENCE_SECTION_HASH = "#experience"

export function getExperienceIdFromUrl(
  url: URL,
  allowedIds: ReadonlySet<ContentId>,
): ContentId | undefined {
  const id = url.searchParams.get(EXPERIENCE_QUERY_PARAM)
  return id && allowedIds.has(id) ? id : undefined
}

export function buildExperienceUrl(
  currentUrl: string,
  experienceId?: ContentId,
): string {
  const url = new URL(currentUrl)
  if (experienceId) {
    url.searchParams.set(EXPERIENCE_QUERY_PARAM, experienceId)
    url.hash = EXPERIENCE_SECTION_HASH
  } else {
    url.searchParams.delete(EXPERIENCE_QUERY_PARAM)
  }
  return `${url.pathname}${url.search}${url.hash}`
}
