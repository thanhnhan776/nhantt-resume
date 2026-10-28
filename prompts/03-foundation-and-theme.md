# A03 — Verified foundation, tokens and theme

Owner: unassigned. Status: not executed. Role: frontend platform engineer. Tasks: T03.1–T03.3; requirements D2, D3 and D5 theme control. Estimate: 5h.

## Required reads and approval

Read [task.md](../task.md), all [plans](../plans/README.md), especially [architecture](../plans/architecture.md), [UX](../plans/ux-design.md), [validation](../plans/validation.md), [protocol](README.md), accepted A01 decisions and A02 types/public-data handoff.

Load ContextScout standards before writes, including:
- `/Users/nhantt/.config/opencode/context/core/standards/documentation.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/feature-breakdown.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/task-delegation-basics.md`

Read discovered coding/testing/security standards. Obtain explicit setup and package-install approval. Use A01's official version-specific docs; fetch uncovered APIs via ExternalScout/Context7 before implementation. Do not assume compatibility or upgrade beyond the approved matrix.

## Prerequisites and ownership

Requires accepted A02 and A01 handoffs; A02's pre-toolchain checks may be pending, not failed. Own dependency/config files, lockfile, `app/globals.css`, `components/ui/**`, `components/providers/**`, `components/theme/**`, `lib/theme/**`, `tests/unit/theme/**`, initial `app/layout.tsx` and `app/page.tsx`, and `plans/handoffs/03.md`.

Shared configuration includes test/e2e/a11y/performance runner setup; agree needs with A09 before freezing. Do not edit A02 data/tests or other feature directories. No edits outside ownership without approval. No source/plan deletion or deployment.

## Tasks

1. Set up only the approved framework/runtime/package-manager matrix, respecting any existing files. Record exact install/build/test commands, never guessed script names. Use current supported Next.js >=14, not a deliberately obsolete minimum.
2. Configure TypeScript, lint and test harness with accessible component-test capability and the planned integration/audit tooling. Generate only needed shadcn/Radix primitives: Sheet, Command, Tabs, Accordion, buttons and required controls. Avoid feature-specific copies in parallel owners' folders.
3. Run A02 data tests/typecheck under the actual toolchain. If they fail, stop and report to the orchestrator/A02; do not repair their files. C2 cannot pass with pending contract failures.
4. Implement shared semantic tokens, spacing/type scale, responsive shell, focus/touch styles and reduced-motion tokens. Slate/Zinc neutrals with one accent; test long Vietnamese names.
5. Implement actual ThemeProvider and ThemeToggle using verified next-themes/App Router guidance. Support System/Light/Dark, persisted choice and accessible state. Verify bootstrapping/CSP and avoid hydration mismatch or wrong-theme flash; do not suppress all warnings to hide problems.
6. Provide only baseline server layout/page, not full sections. Keep theme/client scope narrow. Freeze export contracts for triggers/selection, coordinator, QuickActionBar/action descriptors, DiagramContainer, CodeView and slot composition from A01.
7. Specify overlay state transitions, focus/scroll responsibilities and URL semantics so A05 owns implementation and A07 consumes it. Record import paths and prop signatures for B1 owners without implementing their features.
8. Complete baseline production build, lint, typecheck and tests, then record **relinquishment of `app/layout.tsx` and `app/page.tsx` to A08** at C2. Do not continue editing those routes during B1.

Example theme check:

```text
Cold load in system dark -> no incorrect light frame
Choose Light -> reload -> Light remains selected
Choose System -> change OS preference -> follows system
All paths -> no hydration warnings, label/focus remain correct
```

## Acceptance and handoff

- Baseline commands pass with real logs; A02 compiler/tests are no longer pending.
- Actual theme control satisfies both-theme/system/reload/reduced-motion checks.
- B1 has stable primitives/exports and no need to modify shared config or route files.
- `plans/handoffs/03.md` includes versions, commands, files, screenshots, contracts and explicit route transfer. C2 acceptance is required before A04–A07 start.

## Stop conditions

Stop on any failed check, incompatible API, missing approval, unavailable standard/docs or ownership conflict. Report the responsible area; no silent upstream repairs, broad upgrades or website feature implementation outside this assignment.
