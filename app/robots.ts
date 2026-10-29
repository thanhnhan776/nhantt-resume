import type { MetadataRoute } from "next"
import { createRobots } from "@/lib/seo/crawl-policy"
import { getSiteOrigin } from "@/lib/seo/site-origin"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  return createRobots(getSiteOrigin())
}
