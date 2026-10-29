import type { MetadataRoute } from "next"
import { createSitemap } from "@/lib/seo/crawl-policy"
import { getSiteOrigin } from "@/lib/seo/site-origin"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap(getSiteOrigin())
}
