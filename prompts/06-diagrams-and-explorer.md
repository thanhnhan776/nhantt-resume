# A06 — DiagramContainer and architecture explorer

Owner: unassigned. Status: not executed. Role: visualization/accessibility engineer. Tasks: T06.1–T06.2; requirements D2, D5 DiagramContainer, V1. Estimate: 4h.

## Required reads and approval

Read [task.md](../task.md), all [plans](../plans/README.md), especially [UX](../plans/ux-design.md), [architecture contracts](../plans/architecture.md), [internal case-study mapping](../plans/content-checklist.md), [protocol](README.md), and accepted A01–A03 handoffs.

Load standards with ContextScout before writes and read:
- `/Users/nhantt/.config/opencode/context/core/standards/documentation.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/feature-breakdown.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/task-delegation-basics.md`

Read discovered coding/testing/accessibility standards. Require explicit assignment and asset-publication approval. Verify A01's official version-specific @xyflow/react, SVG and lazy-client guidance; fetch uncovered APIs through ExternalScout/Context7. Do not assume obsolete reactflow APIs are equivalent.

## Prerequisites and ownership

Requires accepted A03 C2, A02 approved public diagram records and frozen container contract. Own `components/portfolio/diagrams/**`, `public/diagrams/**`, `tests/unit/diagrams/**`, `plans/handoffs/06.md`.

No changes to data/types, routes, global CSS, primitives/config, dependencies, sheet or command files. No edits outside ownership without approval. A05 consumes your export; it is a parallel assignment, not a reason to change its code.

## Tasks

1. Implement actual DiagramContainer with allowlisted renderer selection, stable dimensions, caption and equivalent ordered text. Support loading, error, empty and no-permission omission states without losing approved explanatory content.
2. Use responsive lightweight SVG for simple flows. Use a lazy client-only interactive @xyflow/react island for genuine module exploration; prove the heavy engine is not required for initial overview HTML. Do not install an additional graph engine.
3. Render approved simplified public reconstructions only. Prefer approved wardrobe/media/auth lead stories, with the internal mapping as review reference rather than public payload. Never draw a proprietary network topology from assumptions.
4. Selecting a module reveals responsibility, approved stack, personal ownership and decision/trade-off detail within the existing sheet. Retrospective improvements have a separate label; no extra modal.
5. Provide keyboard-selectable node list equivalent to graph selection, selected-state announcement and labeled fit/reset/zoom controls. No essential hover-only tooltip, drag-only action or color-only distinction.
6. For small screens expose readable ordered stages and detail; avoid shrinking labels into unreadability or capturing normal page scroll. Keep diagrams readable in both themes and at zoom.
7. Validate unique node/edge IDs and references; reject unsafe assets/raw HTML. Mermaid remains optional and requires an approved safe rendering strategy before use, not execution of arbitrary source strings.
8. Respect reduced motion, remove continuous decorative movement and preserve layout during load/failure. Test renderers and keyboard equivalence, responsive dimensions, malformed references, missing assets and theme contrast.

Example approved-content boundary:

```text
Historical wardrobe: upload -> detection -> background removal -> optional beautification
User selection -> final wardrobe; retry/status detail only as approved
Retrospective improvement: formal durable queue/DLQ model
Never render retrospective queue as a shipped component without evidence
```

## Acceptance and handoff

- Actual DiagramContainer and explorer code exist; text/keyboard paths reveal the same facts as graph clicking.
- Both-theme/mobile/reduced-motion and loading/failure states pass scoped checks.
- `plans/handoffs/06.md` records exports, assets/permissions, lazy-loading evidence, test results and limitations for A08/A09.
- No invented performance metrics, public demo permissions or employer topology.

## Stop conditions

Stop on failed validation, missing publication approval, invalid public data, uncovered incompatible APIs or ownership expansion. Report; do not alter A02 records, add dependencies, repair sheet internals or claim shipped architecture from retrospective proposals.
