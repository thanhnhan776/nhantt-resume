# Portfolio planning package

Status: proposed implementation; documentation approved 2026-10-28. No website exists as a result of this assignment. The manifest is **18 Markdown files: 7 plans + 11 prompt files**, including both READMEs.

## Review in this order

1. [Content and publication gates](content-checklist.md): approve facts, redactions and story selection.
2. [Architecture](architecture.md): approve hosting mode, contracts and boundaries.
3. [UX specifications](ux-design.md): approve the three-layer journey and interaction behavior.
4. [Implementation stages](implementation.md) and [validation](validation.md): approve budget and checkpoints.
5. [Future root instructions](AGENTS.template.md): review now; activate only in A10.
6. [Assignment protocol](../prompts/README.md): assign one owner per prompt after implementation approval.

## Ownership and dependency map

All paths below are **future** outputs, not permission to implement now. A01 freezes exact paths and export contracts before parallel assignments. `**` means descendants; no owner may expand its area without approval.

| ID / assignment | Exclusive future ownership | Requires |
|---|---|---|
| A01 [Discovery](../prompts/01-discovery-and-stack.md) | `plans/decisions/**` | implementation approval |
| A02 [Content and data](../prompts/02-content-and-data.md) | `types/**`, `data/**`, `public/resume/**`, `tests/unit/data/**` | A01 |
| A03 [Foundation](../prompts/03-foundation-and-theme.md) | dependency/config files, lockfile, `app/globals.css`, `components/ui/**`, `components/providers/**`, `components/theme/**`, `lib/theme/**`, `tests/unit/theme/**`; initial `app/layout.tsx`, `app/page.tsx` | A02 |
| A04 [Page sections](../prompts/04-page-sections.md) | `components/portfolio/sections/**`, `components/portfolio/cards/**`, `tests/unit/sections/**` | A03 |
| A05 [Experience sheet](../prompts/05-experience-sheet.md) | `components/portfolio/experience/**`, `lib/overlay/**`, `tests/unit/experience/**` | A03 |
| A06 [Diagrams](../prompts/06-diagrams-and-explorer.md) | `components/portfolio/diagrams/**`, `public/diagrams/**`, `tests/unit/diagrams/**` | A03 |
| A07 [Commands and code](../prompts/07-command-and-code-view.md) | `components/portfolio/actions/**`, `components/portfolio/code/**`, `lib/actions/**`, `tests/unit/actions/**` | A03 |
| A08 [Integration, SEO, performance](../prompts/08-seo-performance.md) | final `app/layout.tsx`, `app/page.tsx`, `app/robots.ts`, `app/sitemap.ts`, `public/og/**`, `lib/seo/**`, `tests/unit/seo/**` | A04, A05, A06, A07 |
| A09 [Validation](../prompts/09-validation.md) | `tests/e2e/**`, `tests/accessibility/**`, `tests/performance/**`, `plans/release-evidence/**` | A08 |
| A10 [Maintainer documentation](../prompts/10-maintainer-documentation.md) | future root `AGENTS.md`, root `README.md`, `docs/**` | A09 |

Each assignment also owns only its numbered report, `plans/handoffs/01.md` through `10.md`. A03 owns all shared configuration, including test-runner configuration; A09 requests changes rather than editing it. `task.md`, this package and session context are otherwise read-only to implementation owners.

**Serialized transfer:** A03 must finish and relinquish `app/layout.tsx` and `app/page.tsx` at checkpoint C2. A08 alone edits them afterward. A04–A07 never edit route composition, dependencies, shared primitives or each other's files.

## DAG and parallel batches

```text
implementation approval -> A01 -> A02 -> A03 -> A04 --+
                                      |----> A05 --|
                                      |----> A06 --+-> A08 -> A09 -> A10
                                      +----> A07 --+
```

- B0: A01, then A02, then A03; each gated by its predecessor's accepted handoff.
- B1: A04 / A05 / A06 / A07 in parallel against frozen contracts. Shared imports may be unresolved until integration; isolated fixtures are test-only, never shipped data.
- B2: A08 integrates the four accepted outputs; no concurrent route edits.
- B3: A09 validates a frozen candidate. On failure stop and return to the orchestrator for an approved owner-specific repair assignment, then rerun from a new candidate.
- B4: A10 documents the successful candidate. Final documentation review precedes release.

Example assignment: `Assign A06 with task.md, this package, A01 version decision, A02 public data contract and A03 UI contracts. Approve only the A06 ownership paths.`

## Requirement traceability

IDs below label requirements from [task.md](../task.md), not invented implementation completion claims.

| Requirement | Design / execution owner | Required evidence |
|---|---|---|
| D1 Information architecture and routes | architecture; A04, A08 | section hierarchy, anchors and direct-detail restoration |
| D2 UX flow and component specs | ux-design; A03, A05, A06 | keyboard sheet, theme matrix, diagram fallback |
| D3 Setup and folder structure | architecture; A01, A03 | version record, folder tree, successful baseline build |
| D4 Five TypeScript interfaces | architecture; A02 | actual Experience, Project, Achievement, TechnicalDiagram, TechStack interfaces and contract tests |
| D5 Key component implementation code | ux-design; A04, A05, A06, A08 | actual Hero, Theme Toggle, Quick Actions, Card, Sheet and DiagramContainer code, integrated and tested |
| D6 Complete AGENTS template | AGENTS.template; A10 | activated, accurate root instructions and worked extension example |
| D7 SEO and performance steps | validation; A08, A09 | metadata, Person JSON-LD, OG, static prerender/build and measured audit |
| V1 Architecture Explorer | ux-design; A06 | node selection with equivalent text navigation |
| V2 Impact-first badges | content-checklist; A02, A04 | approved evidence or no numeric badge; no illustrative metrics |
| V3 Command palette | ux-design; A07 | Cmd/Ctrl+K, visible alternate actions, overlay coordination |
| V4 Terminal/code toggle | ux-design; A07 | approved snippets, accessible visual toggle, no secrets |
| V5 PDF action | content-checklist; A02, A04, A07 | approved static PDF in Hero and Navigation; generation optional later |

## Decisions required before execution

- Implementation approval is separate from this docs-only approval.
- A01 must verify official, version-specific library documentation; no compatibility has been verified here.
- Default proposal: static-prerendered App Router homepage on an SSR-capable Next.js host, not pure static export. Confirm host, domain and canonical URL.
- Owner approves headline, public contacts, employer case-study redactions and PDF. Missing optional fields may be omitted; missing permission cannot be bypassed with hidden draft payloads.
- Plans and source citations are internal review material. Do not copy them to `public/`, application bundles or public deployment artifacts.
