import { expect, test } from "@playwright/test"

test("selected work links lead to shareable case studies and browser Back", async ({ page }) => {
  await page.goto("/#work")
  await page.getByRole("link", { name: /Read case study: Wardrobe processing workflow/ }).click()
  await expect(page).toHaveURL(/\/work\/wardrobe-processing\/?$/)
  await expect(page.getByRole("heading", { level: 1, name: "Wardrobe processing workflow" })).toBeVisible()
  await page.goBack()
  await expect(page).toHaveURL(/\/#work$/)
})

test("legacy experience links reveal the matching employment entry", async ({ page }) => {
  await page.goto("/?experience=trusting-social#experience")
  await expect(page.locator("#trusting-social")).toBeInViewport()
  await expect(page.getByRole("heading", { name: "Trusting Social" })).toBeVisible()
})

test("each featured case study is directly accessible", async ({ page }) => {
  for (const [slug, title] of [
    ["wardrobe-processing", "Wardrobe processing workflow"],
    ["media-signing", "Parallel media URL signing"],
    ["affiliate-tracking", "Affiliate conversion tracking"],
  ]) {
    await page.goto(`/work/${slug}`)
    await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible()
    await expect(page.getByRole("link", { name: "← Back to selected work" })).toHaveAttribute("href", "/#work")
  }
})
