export function getSiteOrigin(value = process.env.NEXT_PUBLIC_SITE_URL) {
  if (!value) return undefined

  try {
    const url = new URL(value)
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return undefined
    }

    return url.origin
  } catch {
    return undefined
  }
}
