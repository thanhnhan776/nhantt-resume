# A07 — Visible actions, command palette and code view

Owner: unassigned. Status: not executed. Role: interaction/productivity UI engineer. Tasks: T07.1–T07.2; requirements V3, V4, V5 and D5 quick actions. Estimate: 3h.

## Required reads and approval

Read [task.md](../task.md), all [plans](../plans/README.md), especially [UX](../plans/ux-design.md), [architecture](../plans/architecture.md), [content gates](../plans/content-checklist.md), [protocol](README.md), and accepted A01–A03 handoffs.

Load ContextScout standards before writes and read:
- `/Users/nhantt/.config/opencode/context/core/standards/documentation.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/feature-breakdown.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/task-delegation-basics.md`

Read discovered coding/testing/accessibility standards. Require explicit assignment approval and publication permission for contacts/PDF/snippets. Verify official version-specific Command/dialog/clipboard guidance against A01, fetching missing docs through ExternalScout/Context7 before API-dependent work.

## Prerequisites and ownership

Requires accepted A03 C2, A02 public action inputs and frozen A05 overlay consumer contract. A05 runs in parallel; test against the frozen contract until A08 integrates actual modules.

Own `components/portfolio/actions/**`, `components/portfolio/code/**`, `lib/actions/**`, `tests/unit/actions/**`, `plans/handoffs/07.md`. No edits to A05 coordinator, routes, primitives/config, dependencies, data or static PDF. No edits outside ownership without approval; no PDF generator or deployment.

## Tasks

1. Implement allowlisted action descriptors and one action executor shared by visible QuickActionBar/navigation consumers and the palette. Supported actions: section jumps, experience selection, approved email copy/contact and approved static PDF.
2. Implement accessible Command palette with visible launch control and Cmd+K/Ctrl+K toggle. Ignore inappropriate editable/composing contexts, do not hijack unrelated shortcuts, label search and provide meaningful no-result state.
3. Use A05 coordinator contract so only one modal owns focus. Selecting experience closes palette before opening sheet; cancelling returns to prior context as specified. Do not create a second independently open dialog stack.
4. Navigate native sections and valid experience IDs, restoring focus appropriately. Clipboard success/failure gets a restrained announcement; failure offers selectable approved email rather than pretending success.
5. Provide identical visible actions outside palette. Hide email/GitHub/PDF actions if not approved/supplied; report V5 blocked rather than inventing a résumé or broken link. Reuse same PDF descriptor in Hero/Navigation.
6. Implement actual optional CodeView toggle in the story using semantic pre/code, accessible toggle state, contained horizontal overflow and readable light/dark tokens. Plain narrative remains available.
7. Accept only approved public snippets or clearly labeled reconstructions. Never import proprietary configs, tokens, raw interview material or executable code. No terminal command execution or heavyweight highlighting dependency by default.
8. Test shortcut contexts, keyboard navigation, no results, clipboard denial, missing assets, overlay sequencing, focus restoration and code readability with reduced motion.

Example behavior:

```text
No PDF approved -> no PDF action in Hero, Navigation or palette
Email copy denied -> announce failure and expose selectable approved address
Sheet open -> Cmd/Ctrl+K -> one palette modal; cancel returns to sheet
Code mode -> readable approved snippet; no code runs in browser
```

## Acceptance and handoff

- Shared actions work visibly and through palette; command palette is not sole access.
- V3/V4 scoped tests pass; V5 state reflects actual approved asset availability.
- `plans/handoffs/07.md` records action/export contracts, shortcut policy, snippet permissions, files, actual tests and A05/A08 integration needs.

## Stop conditions

Stop on failed checks, missing predecessor/API documentation, publication ambiguity, coordinator incompatibility or any need to edit outside ownership. Report rather than copy private snippets, add a package, stack modals or modify another owner's data.
