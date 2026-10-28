# A01 decision proposal: B1 export and interaction contracts

Date: 2026-10-28
Status: **owner accepted; A03 must implement/freeze exact code-level exports**
Scope: interface/state/ownership freeze requested by A01; no code

These are serializable behavior contracts, not TypeScript definitions or React APIs. A02 implements the five domain interfaces. A03 confirms the contract against the selected shadcn Radix component source and version matrix before B1 begins. Domain records shipped to the browser must contain only approved public facts.

## Stable public identifiers and data exports

- Stable IDs: lowercase URL-safe strings, never array indices or display labels; IDs are not reused after retirement.
- Public content exports remain serializable plain data. No callbacks, React nodes, internal Notion links, unapproved evidence, hidden drafts, or employer-private records in browser props/bundles.
- Required domain exports: `Experience`, `Project`, `Achievement`, `TechnicalDiagram`, `TechStack`; exact fields and validation remain A02's owned responsibility under `plans/architecture.md`.
- `ExperienceTrigger` sends an allowlisted stable `experienceId`; trigger does not serialize the entire experience object to the URL.

## Overlay and browser URL behavior

State shape proposal:

```text
OverlayState =
  | { type: "none" }
  | { type: "experience"; experienceId: ExperienceId }
  | { type: "command"; returnTo: "none" | { type: "experience"; experienceId: ExperienceId } }
```

Only one modal/focus owner at a time. The experience sheet is a modal dialog with inert background, even when background context remains visually visible. Palette selection closes the palette before opening the selected experience; cancel from a palette invoked over a sheet returns to the prior sheet only after palette close completes. No nested focus traps.

URL proposal: `/?experience=<stable-id>#experience` is a shareable selection. Initial server render remains useful and does not depend on browser search params. After hydration, validate the query ID against the public experience registry; valid value opens the sheet. Invalid ID is ignored and does not show a blank sheet. Opening uses history `pushState` (so browser Back closes/restores selection); closing uses `replaceState` to remove only the `experience` parameter while preserving unrelated query/hash. Direct-load close uses the same replacement fallback. Back/Forward synchronize the sheet state; do not create duplicate history entries on popstate. A03 must confirm this contract and exact event names; A05 implements and tests it.

## Shared interaction payloads

| Contract | Serializable input | Behavior/owner |
|---|---|---|
| Shared ActionDescriptor | stable `id`; action kind `section | email | resume`; label; target/approved value; optional shortcut metadata | A07 owns descriptors/actions and palette; A04 consumes visible quick-action exports; no fake targets |
| DiagramContainer | `TechnicalDiagram` record by approved public data, selected module ID optional | A06 owns renderer registry, SVG/text fallback and lazy graph. Selection detail remains in same sheet; no nested modal |
| CodeView | approved snippet ID/content supplied as static safe data, accessible label/title, plain-text vs optional presentation toggle | A07 owns; do not execute snippets or include real secrets/config values |
| ExperienceSheet | stable experience ID; selected project ID optional | A05 owns overlay, URL/history, focus, scroll and trigger restoration |
| InteractionRoot | public experience registry/IDs and initial overlay state | A05 owns sole modal coordinator; A07 requests actions through the frozen public contract |

Avoid passing component callbacks through serialized server component props where the framework boundary does not support it. A03 defines client-side exports/events in code; table above is the compatibility target, not a claim of a frozen implementation.

## Route ownership transfer

- A03 alone owns initial `app/layout.tsx` and `app/page.tsx` during foundation.
- At C2, A03 verifies baseline build/typecheck, records exact exports/contracts, and explicitly relinquishes those route files.
- A04–A07 own only their approved feature directories and test paths; they do not change route files, dependencies, shared UI, or each other's files.
- A08 alone takes final ownership of `app/layout.tsx` and `app/page.tsx` after accepted B1 handoffs, integrating server-rendered overview plus client interaction root.
- Any shared-contract change blocks the affected branches until the orchestrator approves and updates ownership; no concurrent “just this import” edits.

## Content gates: omit vs block acceptance

May omit safely from a public preview if owner approves the reduced preview: GitHub icon/link, optional credentials, optional personal-project demo/screenshot, unverified numeric badge, optional employer detail/story with confidentiality hold. Hide absent links/actions completely; do not ship private records behind CSS/client conditionals.

Blocks corresponding required acceptance: no approved public profile content means no public launch; unresolved project ownership blocks that project card; no employer-detail permission blocks detailed diagram/snippet; unavailable approved PDF blocks V5 acceptance and its buttons; absent canonical domain blocks production canonical/OG publication; lack of keyboard/text equivalence blocks graph completion, not merely decorative graph polish.

GreenHuman.com.vn is currently user-supplied evidence, not Notion-verified. Keep it out of public data until ownership, copy, dates, links/media and permission are explicitly approved. VCS remains separately source-backed but status/demo permission require confirmation. No example metrics from task.md count as achievements.

## Recorded decisions and remaining A02/A03 work

1. Owner accepted the proposed interaction contracts and selected Cloudflare Pages static export, pnpm and the shadcn Radix base. A03 freezes event names, exports, generated source versions and lockfile contracts before B1 starts.
2. Custom domain is deferred until Cloudflare provisioning. Use the actual `*.pages.dev` hostname once created; do not use a made-up placeholder.
3. Public-content approvals and exact A02 schemas remain A02 prerequisites; the interaction-contract proposal itself is accepted.
4. A03 confirms the implementation contracts and versions before B1 starts.
