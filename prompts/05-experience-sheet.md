# A05 — Experience sheet and overlay coordination

Owner: unassigned. Status: not executed. Role: accessible interaction engineer. Tasks: T05.1–T05.2; requirements D2, D5 Card-to-Sheet journey. Estimate: 4h.

## Required reads and approval

Read [task.md](../task.md), all [plans](../plans/README.md), especially [UX dialog specification](../plans/ux-design.md), [architecture](../plans/architecture.md), [validation](../plans/validation.md), [protocol](README.md) and accepted A01–A03 handoffs.

Load ContextScout standards before writes and read:
- `/Users/nhantt/.config/opencode/context/core/standards/documentation.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/feature-breakdown.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/task-delegation-basics.md`

Read discovered coding/testing/accessibility standards. Require explicit assignment approval. Use A01's official version-specific Radix/shadcn Sheet, Next.js history and framer-motion documentation; fetch uncovered behavior through ExternalScout/Context7 before implementing it.

## Prerequisites and ownership

Requires accepted A03 C2, including frozen overlay/URL contracts and approved A02 public data. Own `components/portfolio/experience/**`, `lib/overlay/**`, `tests/unit/experience/**`, `plans/handoffs/05.md`.

No route edits, primitive/config changes, dependency installs, data changes, A06 renderers or A07 command internals. No edits outside ownership without approval. A04/A06/A07 are parallel contract consumers, not prerequisites or shared-file collaborators.

## Tasks

1. Implement InteractionRoot/ExperienceTrigger/ExperienceSheet against frozen exports. Resolve only allowlisted stable IDs from approved public records; missing/invalid ID must not crash or open an empty dialog.
2. Implement the overlay coordinator (`none`, experience, command) as the single focus-owning modal state. Publish consumer functions/events exactly as A03 agreed, including return-to-experience on palette cancel after closure. Do not add nested modal focus traps.
3. Implement actual shadcn Sheet with Framer Motion-compatible restrained transitions, verifying primitive/motion composition. Desktop leaves visible context but background is inert; mobile full width with safe areas and internal scroll.
4. Render title, historical role/dates, project tabs, Layer 2 visual/text slots, ownership and Layer 3 details. Consume A06 DiagramContainer and A07 CodeView contracts without editing their files or inventing diagram content.
5. Capture origin focus and page scroll, focus an appropriate dialog target, trap focus, lock background scroll and expose labeled close/Escape. Restore trigger and scroll; use section heading fallback for a direct deep link with no origin.
6. Implement agreed query-param selection/history semantics after hydration: direct valid ID, invalid ID ignored, open/close preserve unrelated URL parameters, Back/Forward restores selection, no unwanted route scroll. Verify static overview rendering is not accidentally deoptimized.
7. Company/project changes intentionally reset only sheet scroll; closing preserves main-page position. No page-level layout shift or background interaction while modal is open.
8. Test actual primitive integration, reduced motion, keyboard loop, mobile viewport, long content, direct navigation and palette transition contract. Do not mock away all focus behavior.

Example scenario:

```text
Scroll to Trusting Social -> keyboard open -> focus stays in sheet
Switch project -> only sheet scroll resets
Open command -> sheet releases modal ownership
Cancel command -> sheet restored without stacked traps
Escape sheet -> original trigger focused; page scroll preserved
```

## Acceptance and handoff

- Actual Sheet and coordinator code satisfy specified modal/focus/scroll/history behavior in scoped tests.
- Desktop context is visible but inert; mobile content/close controls fit; reduced motion preserves meaning.
- `plans/handoffs/05.md` records exports, URL behavior, focus fallback, tests/manual evidence, files and integration needs for A07/A08.
- Any cross-owner failure is reported; no claim of complete e2e validation before A09.

## Stop conditions

Stop on any failed validation, missing approval/docs, incompatible contract, uncertain content permission or need to edit shared/other-owned files. Report rather than replacing the modal primitive, inventing company details or broadening routes.
