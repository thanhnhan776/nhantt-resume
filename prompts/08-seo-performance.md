# A08 — Integration, SEO and performance candidate

Owner: unassigned. Status: not executed. Role: Next.js integration/performance engineer. Tasks: T08.1–T08.3; requirements D1, D5 integration, D7. Estimate: 6h.

## Required reads and approval

Read [task.md](../task.md), all [plans](../plans/README.md), especially [architecture](../plans/architecture.md), [validation](../plans/validation.md), [content gates](../plans/content-checklist.md), [protocol](README.md), and accepted A01–A07 handoffs.

Load ContextScout standards before writes and read:
- `/Users/nhantt/.config/opencode/context/core/standards/documentation.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/feature-breakdown.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/task-delegation-basics.md`

Read discovered coding/testing/security standards. Require explicit integration approval and A03's route-ownership relinquishment. Verify official version-specific App Router, metadata/JSON-LD, static build/export and bundle guidance against A01; use ExternalScout/Context7 for uncovered APIs.

## Prerequisites and ownership

Requires accepted A04, A05, A06 and A07 handoffs, transitively A01–A03. Own final `app/layout.tsx`, `app/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, `public/og/**`, `lib/seo/**`, `tests/unit/seo/**`, `plans/handoffs/08.md`.

No edits to feature components, global CSS, dependencies/config, public content or tests owned by others. No edits outside ownership without approval. Request owner-specific changes rather than repairing upstream modules. No deployment or package upgrade.

## Tasks

1. Confirm B1 exports match frozen contracts and assemble final RootLayout/homepage from server sections and narrow client islands. Integrate Hero/theme/QuickActionBar, Card/Sheet, DiagramContainer, commands and CodeView; remove no required section.
2. Preserve server-rendered approved overview text and static prerender eligibility. Client-side experience query restoration must not require request-time overview rendering; verify the actual framework version's behavior.
3. Implement approved title/description, canonical `/`, static OG/social asset and schema.org **Person** JSON-LD. Use only approved public facts/URLs; no invented Resume type, current employer or credentials. Escape structured data safely using verified guidance.
4. Implement correct production robots/sitemap and preview noindex behavior under the approved hosting model. No placeholder domain may ship; missing canonical/domain approval blocks production readiness.
5. Follow the C0 hosting decision: default static-prerendered page on SSR-capable host. If pure export was approved, prove images/metadata routes/query restoration work without runtime endpoints; prebuild OG assets. Do not silently switch modes.
6. Measure initial route JS and deferred graph/palette chunks using the approved tooling. Compare C2 budget; preserve lazy graphs, reserved dimensions, optimized approved fonts/assets and no unnecessary highlighter.
7. Run scoped SEO checks, integrated journey smoke checks and exact production build. Inspect route output for static prerendering and production page source for meaningful overview text.
8. Freeze the candidate for A09 with identifier, exact serving/build commands, artifact locations and unverified/blocked items. No Lighthouse score is assumed or guaranteed.

Example metadata audit:

```text
canonical: approved production origin + /
query-selected experience: same canonical, not extra sitemap URL
JSON-LD: Person with approved public links only
OG: approved static file; no request-time generator dependency
preview: noindex; no private Notion URLs anywhere in shipped payload
```

## Acceptance and handoff

- D1/D5 features are actually integrated, not only individually mocked; all scoped checks pass.
- D7 metadata/static-build strategy works under selected host and actual versions.
- `plans/handoffs/08.md` includes files, route transfer, commands/results, prerender/bundle evidence, candidate ID, domain/content approvals and limitations for A09.

## Stop conditions

Stop immediately on failed check, mismatched export, missing route transfer, domain/content approval gap, undocumented API or outside-ownership repair. Report responsible owner and evidence; do not silently rewrite feature modules or change deployment mode.
