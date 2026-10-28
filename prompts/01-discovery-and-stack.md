# A01 — Discovery and verified stack decision

Owner: project owner / orchestrator. Status: **complete — decisions approved; whole-stack build verification deferred to A03**. Role: Principal Frontend Architect. Tasks: T01.1–T01.2; requirements D1, D3, D7. Estimate: 3h.

## Completion record — 2026-10-28

- Workspace audit and official-source research are recorded in [A01 handoff](../plans/handoffs/01.md) and [decision records](../plans/decisions/).
- Owner approved Cloudflare Pages static export, pnpm, the shadcn Radix base, and the proposed interaction contracts.
- Cloudflare Pages is compatible with the planned static homepage, client-side query-driven sheet, and prebuilt OG image. The custom domain is deferred until Cloudflare setup; use the actual generated `*.pages.dev` hostname when available, never a guessed placeholder.
- A01 performed no installation, build, or deployment. A03 must inspect the generated Radix components and prove the locked integrated stack with its approved install/build; no whole-stack build verification is claimed by A01.
- Public content approval is recorded in [content checklist](../plans/content-checklist.md); A02 uses only the approved subset. Employer visual assets still require separate review.

## Required reads and approval

Read [task.md](../task.md), all files indexed in [plans](../plans/README.md), especially [architecture](../plans/architecture.md), [validation](../plans/validation.md), [content gates](../plans/content-checklist.md), and [assignment protocol](README.md).

Load standards with ContextScout before writing; read the inherited standards:
- `/Users/nhantt/.config/opencode/context/core/standards/documentation.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/feature-breakdown.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/task-delegation-basics.md`

Discover additional implementation/testing/security standards, keeping standards separate from project references and external docs. Require explicit implementation/discovery approval before work. This prompt's existence is not approval to install anything.

## Prerequisites and ownership

Requires user approval, no prior assignment. Own only `plans/decisions/**` and `plans/handoffs/01.md`. Inspect existing workspace read-only; do not overwrite existing work. No code/config/dependency edits, scaffolding, package installation, deployment, task.md edits or source cleanup. No edits outside ownership without approval.

## Tasks

1. Audit current tree and available tools. Record whether code/package manager/runtime already exist; do not assume a git repository or working app.
2. Confirm requested stack: supported Next.js App Router release >=14, compatible React/React DOM/TypeScript, shadcn/ui + Radix + Tailwind, next-themes, framer-motion, lucide-react, lazy @xyflow/react. Prefer SVG for simple flows; Mermaid remains optional. Do not silently replace framer-motion or add a second graph library.
3. Use ExternalScout/Context7 to fetch **official version-specific** docs for runtime/peer requirements, App Router client/server boundaries, static prerender/export, metadata/OG, theme hydration, modal Sheet/Command behavior, motion reduced-motion and graph lazy loading/accessibility. Follow official-source links where Context7 is incomplete.
4. Record exact proposed versions, source URLs/retrieval dates, compatible runtime/package manager, peer constraints, relevant API guidance, gaps and licensing/copy-generation considerations. A source list without compatibility reasoning is insufficient. Obtain owner approval of the matrix; A03 installs only after its separate approved setup scope.
5. Recommend the owner-approved Next.js static export on Cloudflare Pages for the current portfolio. Contrast Cloudflare Workers adapter alternatives if request-time server features become necessary. Record static-export constraints, actual Pages hostname when provisioned, and deferred custom domain; never use a placeholder canonical.
6. Freeze paths and export/state contracts for A02–A08: serializable public types; experience trigger ID; overlay union; URL push/replace/Back semantics; shared action descriptors; DiagramContainer and CodeView inputs; A03-to-A08 route ownership transfer.
7. Identify content gates that can safely produce omission versus block required feature completion. No public detailed diagrams until permission exists.

Example decision record:

```text
Feature: static overview + client experience query restoration
Versions: <exact proposed framework/React versions>
Official sources: <URL + version + fetched date>
Rendering: prerender homepage; selection read after hydration
Export alternative: prebuilt OG; no runtime endpoints
Approval / unresolved risks: <explicit owner decision>
```

## Acceptance and handoff

- Version matrix is sourced and approved, with no unverified compatibility claim.
- Deployment mode, metadata strategy and public-content boundaries are explicit.
- Ownership/export contracts support A04–A07 parallel work without shared-file edits.
- Report files, decisions, source coverage, missing docs and approvals in `plans/handoffs/01.md`; no fabricated build/test results.

## Stop conditions

Stop on failed validation, unavailable standards/docs, incompatible versions, absent approval, ambiguous hosting/content permission or ownership expansion. Report the exact question; do not install to “try it”, silently substitute libraries or implement another assignment.
