# A04 — Overview sections and evidence-first cards

Owner: unassigned. Status: not executed. Role: product UI engineer. Tasks: T04.1–T04.2; requirements D1, D5 Hero/Card, V2, V5 visible entry points. Estimate: 4h.

## Required reads and approval

Read [task.md](../task.md), all [plans](../plans/README.md), especially [UX](../plans/ux-design.md), [content gates](../plans/content-checklist.md), [architecture](../plans/architecture.md), [protocol](README.md), and accepted A01–A03 handoffs.

Load standards through ContextScout before writes and read:
- `/Users/nhantt/.config/opencode/context/core/standards/documentation.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/feature-breakdown.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/task-delegation-basics.md`

Read discovered coding/testing standards; require explicit assignment approval. Check A01's official version-specific docs and verify uncovered component APIs via ExternalScout/Context7. Approval does not extend to package changes or deployment.

## Prerequisites and ownership

Requires accepted A03 C2, including A02 public content and types. Own only `components/portfolio/sections/**`, `components/portfolio/cards/**`, `tests/unit/sections/**`, `plans/handoffs/04.md`.

No edits to routes/layout, global styles, shared primitives/config, data or action/sheet/diagram internals. No edits outside ownership without approval. A05–A07 run in parallel; consume frozen contracts and use test-only mocks if needed, not shipped stubs. A08 owns final route integration.

## Tasks

1. Implement actual semantic section components: Hero, summary/core strengths, employment overview, personal projects, education and contact footer. Expose the agreed section anchors and sensible heading order/skip-link target.
2. Hero includes approved name/headline/location and consumes A03 ThemeToggle plus A07 QuickActionBar exports. Provide navigation-facing section/action content according to frozen contracts; do not create a second action registry.
3. Implement ExperienceCard and ImpactBadge: exact historical role/date/location, 2–3 approved bullets and a clear keyboard-accessible A05 trigger carrying stable ID. Cards must not contain conflicting nested interactive click areas.
4. Render reverse-chronological dated employers. Never mark NetVirta current or promote historical titles. Keep professional case studies in employer detail, personal project grid for approved VCS content only.
5. Show approved impact first. Label five affiliate providers as scope; omit numeric badge if measurement evidence is absent. Missing demo/repository/certification renders cleanly without fake links.
6. Expose email, LinkedIn and approved PDF visibly in Hero/Navigation through shared action contracts; palette is not sole access. Hide unavailable actions; report V5 blocked if no approved asset.
7. Keep static sections server-compatible. Isolate only triggers/controls as clients; no theme/selection hook that converts the entire page into a client component.
8. Test long Vietnamese text, 320px and desktop layout, keyboard focus, both themes and approved-empty/missing optional states. Use shared spacing/tokens, no local hard-coded theme palette.

Example card acceptance:

```text
NetVirta Pte. Ltd — Software Engineer (Full Stack)
Jan 2022–Jul 2026 — Singapore
Approved qualitative achievements; no invented percentage
Explore work -> stable netvirta ID -> A05 contract
```

## Acceptance and handoff

- Actual Hero/Card and all six requested content areas exist; overview is concise and searchable.
- Tests show exact dates/labels, correct personal/professional separation, safe badges and no dead links.
- Hero actions remain visible without command palette; optional missing content is explicitly omitted.
- `plans/handoffs/04.md` lists exports/props, files, task/requirement coverage, actual checks, screenshots and pending A08 integration. Do not claim full app behavior before integration.

## Stop conditions

Stop on failed checks, missing export contract/version documentation, contested content, publication ambiguity or any need to edit outside ownership. Report rather than silently change A02 data, duplicate A07 actions or modify route composition.
