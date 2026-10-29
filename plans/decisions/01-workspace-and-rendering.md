# A01 decision proposal: workspace and rendering

Date: 2026-10-28 (updated after owner decision)
Status: **approved: Cloudflare Pages static export**
Owner: project owner
Scope: T01.1, T01.2; documentation only

## Read-only workspace audit

Audit performed from `/Users/nhantt/work/me/nt-portfolio` using directory listing and `find` to depth 2. Current workspace contains `task.md`, `plans/*.md`, `prompts/*.md`, and `.tmp/`. It contains **no application source, package manifest, lockfile, Next configuration, tests, or build scripts**. Environment exposes Node `v24.21.0`, npm `12.2.0`, pnpm `12.4.1`, and yarn `1.22.22`; bun was not found. Git executable exists, but `git rev-parse --is-inside-work-tree` returned no repository. No installs or code were performed.

## Rendering proposal

**Owner-approved deployment:** Next.js App Router static export (`output: 'export'`) deployed to Cloudflare Pages. This matches the planned static portfolio page, prebuilt OG asset, and client-only experience-sheet query state, provided the app does not introduce request-time server features. Cloudflare's official guide supports static Next.js exports on Pages. The query-driven sheet must parse/update the URL in the browser; server output and metadata do not vary by query string. Test direct query URLs, back/forward, and page fallback on the actual Pages deployment.

Cloudflare Pages uses build command `pnpm exec next build` and output directory `out`; choose the **Next.js (Static HTML Export)** framework preset. A `*.pages.dev` hostname is available after creating the Pages project. Configure a custom domain later in Cloudflare Pages when the owner creates/selects it. Do not invent or publish `nhantt.page.dev`; record the actual Pages/custom hostname after provisioning.

Static-export limitations documented by [Next.js](https://nextjs.org/docs/app/guides/static-exports) still apply: no request-dependent routes/handlers, cookies, Server Actions, ISR, proxy, or default `next/image` optimization. Use static assets or an approved external image strategy; use a prebuilt OG image. Do not add runtime features requiring a Next.js server without revisiting deployment architecture.

**Alternative if server runtime becomes necessary:** Cloudflare Workers can host a Next-compatible runtime through Cloudflare's adapter ecosystem. As of the documentation reviewed, Cloudflare recommends beta `vinext` for new Next applications and documents OpenNext primarily for existing apps with compatibility gaps. This adds adapter compatibility work and is not selected for this static portfolio. Re-evaluate using current official docs if runtime rendering/server APIs become necessary.

| Decision                | Proposal                                                                         | State                                    |
| ----------------------- | -------------------------------------------------------------------------------- | ---------------------------------------- |
| App routing             | Next.js App Router, single canonical `/`                                         | Proposed                                 |
| Rendering               | Next.js App Router static export on Cloudflare Pages                             | **Approved**                             |
| Build output            | `pnpm exec next build` -> `out/`                                                 | **Approved proposal; verify in A03/A08** |
| Cloudflare project URL  | Actual generated `<project>.pages.dev` after project creation                    | Later; do not guess now                  |
| Custom domain/canonical | Set after owner provisions a domain; use the real deployed URL at metadata build | Deferred; no invented placeholder        |
| OG                      | Prebuilt static image; metadata base URL configured from actual deployed URL     | **Approved**                             |
| Package manager         | pnpm                                                                             | **Approved**; pnpm is available locally  |

## Content boundary relevant to rendering

Only owner-approved public content may enter public data, metadata, static assets, or generated bundles. Employer case-study copy, topology, snippets and screenshots need their own publication approval; until then omit detailed story content from the public build rather than shipping hidden draft fields. Missing GitHub, approved PDF, canonical host and metric evidence cannot be replaced by placeholders. The GreenHuman.com.vn entry is user-provided, distinct personal-project content; verify scope/ownership/link permission before publishing.

## Owner decisions recorded

1. Owner selected Cloudflare and accepted the proposal if Cloudflare-compatible; official Cloudflare docs support this use case as Pages static export.
2. Owner selected pnpm and accepted the proposed interaction contracts.
3. Custom domain is deferred until Cloudflare integration. Use the actual generated `*.pages.dev` URL once provisioned; update canonical metadata when the real custom domain exists.
4. Public content selection remains an A02 publication gate; it does not block A01's deployment recommendation.

## Official sources (retrieved 2026-10-28)

- Next static exports: https://nextjs.org/docs/app/guides/static-exports
- Next server/client components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next metadata and OG: https://nextjs.org/docs/app/getting-started/metadata-and-og-images and https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- Next installation and supported runtime/package managers: https://nextjs.org/docs/app/getting-started/installation
- Cloudflare Pages static Next export: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
- Cloudflare Next.js Workers options (not selected): https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- Cloudflare Pages custom domain setup: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Cloudflare docs reviewed 2026-10-28; actual Pages build/deployment and custom domain remain untested/unprovisioned.
