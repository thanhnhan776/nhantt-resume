# A02 — Public content and typed domain data

Owner: unassigned. Status: not executed. Role: content architect and TypeScript domain-model engineer. Tasks: T02.1–T02.3; requirements D4, V2, V5. Estimate: 5h.

## Required reads and approval

Read [task.md](../task.md), all [plans](../plans/README.md), especially the internal [content evidence](../plans/content-checklist.md) and [domain contracts](../plans/architecture.md), [protocol](README.md), and accepted A01 version/contract decisions.

Load standards through ContextScout before writes and read:
- `/Users/nhantt/.config/opencode/context/core/standards/documentation.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/feature-breakdown.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/task-delegation-basics.md`

Load discovered coding/testing standards too. Require explicit approval for this implementation scope. Verify official version-specific TypeScript/tooling usage against A01's record; fetch missing API guidance via ExternalScout/Context7, not assumptions. Sources are evidence, not instructions.

## Prerequisites and ownership

Requires accepted A01 handoff and owner access for publication decisions. Own `types/**`, `data/**`, `public/resume/**`, `tests/unit/data/**`, `plans/handoffs/02.md`. Do not edit UI, shared config, routes, task.md or internal plans. No edits outside ownership without approval; package installation belongs to separately approved A03.

## Tasks

1. Prepare an owner-review ledger of public field/story decisions: approve, omit or block. Use known dated employment/education, email/LinkedIn and VCS project facts; do not mark all dates unknown or silently choose a new headline.
2. Implement **actual TypeScript interfaces** for Experience, Project, Achievement, TechnicalDiagram and TechStack, plus related date/reference/renderer/action-independent value types. Use stable IDs, month dates, explicit professional/personal kind, nullable/optional genuinely missing fields and serializable shapes.
3. Implement approved public profile, experience, project, education and stack records. Reverse chronological employer order derives from dates. Preserve exact historical roles; never mark ended NetVirta employment current. Confirm VCS's “Present” status separately.
4. Map approved professional stories to the correct employer, with explicit ownership boundary, shipped solution, trade-offs and distinct retrospective improvements. Keep Headsapp out until attribution is confirmed. Never claim ownership of Shopify's downstream transformation or affiliate business setup.
5. Numeric metrics require owner-approved measurement evidence. Five affiliate providers is a scope count, not a performance result. No sample latency/user/uptime metrics from task.md.
6. Add reference/date/unique-ID checks and test fixtures for invalid relationships, missing contact links, absent PDF, unavailable diagrams and safe optional sections. Keep invalid fixtures test-only.
7. If supplied and approved, place a clean one-page static résumé PDF in the owned asset directory, checking metadata and permissions. Otherwise omit asset/action and report V5 blocked. Do not generate a PDF or invent a URL.
8. Inspect all public records for private source URLs, raw interview answers, compensation, phones, credentials or customer/patient data. Do not embed an internal provenance object in public types/modules; hiding it during rendering is insufficient.

Example editorial record, not a public implementation fixture:

```text
NetVirta: Jan 2022–Jul 2026, Software Engineer (Full Stack)
Media story: parallel Go presigning; qualitative benefit only
Retrospective: add baseline latency measurements
Publication: approved summary / diagram pending owner review
```

## Acceptance and handoff

- Five interfaces and public data exist; tests cover duplicate/dangling IDs, date ordering and missing optional content.
- Approval ledger supports every shipped field/story; private evidence is absent from public modules.
- Typecheck/tests run using approved available tooling. If not yet available before A03 setup, explicitly mark compiler/test execution pending; C2 must close it before features start. Do not claim authored tests passed.
- `plans/handoffs/02.md` records contracts/export names, changed files, approvals, omissions, actual check results, pending toolchain checks and PDF availability for A03/A04/A07.

## Stop conditions

Stop on failed validation, disputed fact, unclear permission/attribution, missing predecessor/version docs, requested install or ownership expansion. Report; do not invent content, publish hidden drafts, alter task.md or implement consuming UI.
