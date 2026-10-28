# A09 — Independent validation and release evidence

Owner: unassigned. Status: not executed. Role: test/accessibility/performance engineer. Tasks: T09.1–T09.3; requirements D1–D7 and V1–V5 verification. Estimate: 6h.

## Required reads and approval

Read [task.md](../task.md), all [plans](../plans/README.md), especially [validation](../plans/validation.md), [implementation register](../plans/implementation.md), [content gates](../plans/content-checklist.md), [protocol](README.md), and accepted A01–A08 handoffs.

Load standards via ContextScout before writes and read:
- `/Users/nhantt/.config/opencode/context/core/standards/documentation.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/feature-breakdown.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/task-delegation-basics.md`

Read discovered testing/accessibility/security standards. Require explicit validation scope approval. Verify exact test/audit tool docs through A01's official version-specific record; fetch missing guidance with ExternalScout/Context7. Testing permission does not imply permission to repair production code.

## Prerequisites and ownership

Requires accepted A08 frozen candidate and runnable A03 harness/commands. Own `tests/e2e/**`, `tests/accessibility/**`, `tests/performance/**`, `plans/release-evidence/**`, `plans/handoffs/09.md`.

No production code/data/assets/config edits, dependency installs, root documentation activation or deployment. No edits outside ownership without approval. Tests may expose bugs; they must not conceal them by weakening assertions or silently changing expected behavior.

## Tasks

1. Record candidate identifier, environment, exact runtime/browser/tool versions and commands before testing. Check authored feature suites and baseline checks using existing approved scripts.
2. Add/run end-to-end recruiter and interviewer journeys: overview/contact/PDF, each company sheet, project switching, diagram/text equivalence, code toggle, commands, direct valid/invalid selection and Back/Forward restoration.
3. Exercise real focus traps and overlay sequencing: keyboard open/close, inert background, scroll preservation, deep-link focus fallback and no nested active modal. Check shortcut handling inside editable controls and clipboard denial fallback.
4. Test mobile/tablet/desktop, long Vietnamese text, 320px/zoom, light/dark/system persistence, cold-load hydration and reduced motion. Run automated accessibility and manual keyboard/screen-reader matrix; record actual tested pairings.
5. Inspect production HTML/JSON-LD/canonical/OG/robots/sitemap; use Person, never invented Resume schema. Confirm server overview and production status/MIME behavior.
6. Verify actual build/prerender artifacts and selected serving mode. For pure export, use static serving and prove no runtime endpoint/image optimizer dependency. For normal build, prove homepage prerendering rather than assuming SSR capability implies per-request rendering.
7. Capture three-run Lighthouse median with settings, measured bundle/lazy-loading evidence and representative loading behavior. 100/100 is aspiration; report real results. Do not claim field INP/CWV from lab data.
8. Audit shipped HTML/modules/chunks/maps/assets/PDF metadata for private URLs, phones, compensation, raw interviews, secrets, unapproved employer detail and invented impact. Review actual public content approvals and retrospective labels.
9. Produce D1–D7 / V1–V5 pass/blocked matrix and release packet for A10/owner, including explicit unrun checks and feature omissions. No release sign-off if mandatory checks remain blocked.

Example evidence:

```text
Requirement: V1 keyboard/text equivalent
Candidate/environment: <frozen ID and browser/theme>
Expected: node-list selection reveals same detail as graph click
Actual/artifact: <recorded observation and trace>
Status: pass | fail | blocked
```

## Acceptance and handoff

- All performed checks have reproducible actual evidence, not a copied checklist.
- Release-blocking defects and missing required content are visible; privacy approval is separate from technical test passes.
- `plans/handoffs/09.md` links internal evidence, identifies candidate, exact results, limitations and C5 go/no-go recommendation. Publication still requires owner approval.

## Stop conditions — mandatory

**Stop immediately on the first validation failure**, record expected/actual, command and affected owner, then report to orchestrator. Do not auto-fix, continue unrelated tests, alter production files or rerun after an unapproved repair. Missing harness/docs/approval or unavailable required tools are blockers, not passes. Resume only after a separately approved correction and new candidate.
