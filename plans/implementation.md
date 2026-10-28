# Implementation stages and checkpoints

Status: future work, not execution approval. Use [assignment owners and DAG](README.md), [architecture](architecture.md), [UX](ux-design.md), [content gates](content-checklist.md) and [validation](validation.md). Actual TypeScript interfaces and component implementations are assigned deliverables, not missing work in this docs-only package.

## Prerequisites

- [ ] Owner approves implementation scope, ownership map and deployment direction.
- [ ] A01 loads coding/testing standards via ContextScout, fetches official version-specific stack docs via ExternalScout/Context7 and obtains approval for the version matrix.
- [ ] Owner reviews content publication gates; private sources remain outside browser assets.
- [ ] Agents receive task.md, all plans and their prompt. No assignment below is executed by creating this package.

## Task register

Each row is a verifiable 1–2 hour work unit, including local checks. Estimates exclude owner response time and unforeseen compatibility problems. Outputs stay inside the assignment's ownership paths in the README.

| Task | Owner | Work / output | Requires | Estimate | Acceptance |
|---|---|---|---|---|---|
| T01.1 | A01 | Audit workspace, host/export alternatives, required standards | approval | 1h | Record existing files, constraints, chosen render mode |
| T01.2 | A01 | Fetch official docs and propose compatible exact version matrix | T01.1 | 2h | Sources, access dates, peer/runtime constraints and user approval recorded |
| T02.1 | A02 | Curate dated profile, employers, education, personal vs professional stories | T01.2 | 2h | Public field allowlist and owner approval/omission ledger |
| T02.2 | A02 | Implement five interfaces, stable references and validated public records | T02.1 | 2h | D4 actual TypeScript and contract tests ready; invalid dates/references covered; compiler verification closes at C2 |
| T02.3 | A02 | Evidence tests, missing-link behavior and approved static PDF | T02.2 | 1h | No private provenance, unapproved metric or broken PDF action |
| T03.1 | A03 | Approved setup, dependencies, shared primitives and test harness | T02.3 | 2h | D3 baseline production build and typecheck succeed |
| T03.2 | A03 | Tokens, provider, theme control, layout and static shell | T03.1 | 2h | Theme reload matrix and hydration checks pass |
| T03.3 | A03 | Freeze exports, overlay/URL/action contracts and transfer route ownership | T03.2 | 1h | B1 owners accept contracts; A03 relinquishes routes |
| T04.1 | A04 | Hero, strengths, navigation-facing section content, footer | T03.3 | 2h | D5 actual Hero; visible contact/PDF actions via A07 contract |
| T04.2 | A04 | Experience cards with evidence badges, personal projects and education | T04.1 | 2h | Dates/order correct, V2 safe, no employer projects mislabeled personal |
| T05.1 | A05 | InteractionRoot, overlay coordinator and experience selection/URL state | T03.3 | 2h | One modal owner; valid/invalid/direct/back selection behavior |
| T05.2 | A05 | Modal sheet, project tabs, deep dive and focus/scroll tests | T05.1 | 2h | D5 Sheet code; Escape/focus restoration, inert background, mobile fit |
| T06.1 | A06 | DiagramContainer, responsive SVG, text fallback and renderer registry | T03.3 | 2h | D5 actual renderer; no-diagram/loading/error paths accessible |
| T06.2 | A06 | Lazy architecture explorer, node details and equivalent keyboard list | T06.1 | 2h | V1 works in both themes without pan/drag requirement |
| T07.1 | A07 | Shared visible actions, command palette and overlay contract consumer | T03.3 | 2h | V3 shortcut/search/copy/PDF work without nested dialogs |
| T07.2 | A07 | Code toggle, approved snippet treatment and action fallbacks | T07.1 | 1h | V4 semantic code, no secrets, unsupported clipboard handled |
| T08.1 | A08 | Integrate B1 exports into final server/client route composition | T04.2, T05.2, T06.2, T07.2 | 2h | D1/D5 integrated journey; server overview remains searchable |
| T08.2 | A08 | Metadata, Person JSON-LD, canonical, OG, sitemap and robots | T08.1 | 2h | D7 correct approved URLs; previews not indexed |
| T08.3 | A08 | Lazy loading, asset/bundle analysis and deployment-mode build | T08.2 | 2h | Static overview verified; limitations and measured budgets recorded |
| T09.1 | A09 | End-to-end selection, history, palette, theme and PDF tests | T08.3 | 2h | Reproducible passes on frozen candidate |
| T09.2 | A09 | Accessibility, screen-reader and responsive/manual matrix | T09.1 | 2h | No unresolved release-blocking access defect |
| T09.3 | A09 | Production SEO/performance/static artifact and privacy audit | T09.2 | 2h | D7 evidence, real scores, no private content in shipped assets |
| T10.1 | A10 | Activate accurate root instructions and setup/content-extension README | T09.3 | 2h | D6 root AGENTS, exact commands and ownership verified |
| T10.2 | A10 | Worked extension exercise, links and release handoff | T10.1 | 1h | Maintainer can follow procedure; final docs review passes |

Baseline effort: **43 engineer-hours**, plus approximately 20–30% contingency (9–13h). B1 parallelism reduces elapsed time, not total work. Content permission, host selection and unavailable source metrics can block calendar progress indefinitely.

## Stages and approval checkpoints

| Stage | Assignments / batch | Checkpoint and go/no-go |
|---|---|---|
| Discovery | A01 | C0: user accepts official-doc version matrix, hosting choice and precise ownership |
| Content | A02 | C1: owner approves public content subset, actual D4 interfaces and safe omissions |
| Foundation | A03 | C2: baseline checks pass, contracts freeze, route ownership transfer recorded |
| Features | A04–A07 / B1 | C3: each owner hands off code, unit checks, screenshots and limitations; no shared-file edits |
| Integration | A08 / B2 | C4: D1–D5 integrated, D7 build/metadata candidate frozen |
| Validation | A09 / B3 | C5: release evidence passes; any failure stops and returns to orchestrator |
| Maintenance | A10 / B4 | C6: D6 active docs accurate, content owner approves publication, release explicitly approved |

Example checkpoint decision: `C1 conditional pass: omit GitHub, certificates, PDF and quantified impact until supplied; public employment summaries approved; detailed auth diagram remains blocked.` A conditional pass must specify exactly which features are disabled and whether task acceptance permits the omission. Missing required V5 PDF means feature acceptance remains open, even if a safe preview can proceed.

## Requirement completion, not just planning

- D1: A08 must deliver actual routes/anchors and final hierarchy; A04 supplies sections.
- D2: A03/A05/A06 demonstrate theme, modal sheet and diagrams against UX scenarios.
- D3: A03 supplies actual App Router folders/configuration from the verified stack.
- D4: A02 supplies actual `Experience`, `Project`, `Achievement`, `TechnicalDiagram`, `TechStack` interfaces; prose contracts alone do not close this item.
- D5: A04/A05/A06 supply actual component code for Hero/theme/actions, experience Card/Sheet and DiagramContainer; A08 integrates it.
- D6: the [template](AGENTS.template.md) is reviewable now; A10 activates root instructions only after explicit approval.
- D7: A08 implements optimization/build setup; A09 measures results. Lighthouse 100/100 is an aspiration, never a guaranteed acceptance claim.
- V1–V5: ownership and evidence are itemized in the [coverage matrix](README.md). PDF generation, extra routes and runtime CMS are not prerequisites.

## Failure and change policy

Run scoped checks after each task and record exact command, candidate and result. **Stop on the first failed validation; report it, do not silently fix or expand ownership.** The orchestrator may authorize a separate corrective task for the responsible owner, then restart checks on the changed candidate. Missing contracts, incompatible versions, privacy uncertainty or requests outside ownership also require a stop and decision.
