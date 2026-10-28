# Assignment protocol

Status: **all assignments unexecuted and owner-unassigned**. The approved current output is documentation only. This directory contains 11 Markdown files: this protocol and A01–A10. Together with the seven plans, the package has 18 files.

## Assign one owner

1. Obtain separate user approval for implementation, then for the assignment's precise scope and paths. Documentation approval does not authorize installs, website code or deployment.
2. Give the owner [task.md](../task.md), the complete [plans](../plans/README.md), this protocol, its individual prompt and accepted predecessor handoffs.
3. Load standards through ContextScout before writes. The inherited context bundle lists the three standards below; downstream agents read them rather than rediscovering project context unnecessarily. Ask ContextScout for additional code/testing/security standards when implementation starts.
4. A01 fetches official version-specific library documentation through ExternalScout/Context7 and freezes an approved version matrix. Later owners read that record and reverify any API/behavior not covered; stop on mismatches rather than assuming compatibility.
5. Check ownership/dependencies before work. No edits outside ownership without user approval; no broad cleanup or deletion of session/source files.
6. Run scoped checks, stop immediately on any failed validation, and report. Repairs need a new approved assignment; do not silently fix unrelated work or weaken tests.

## Standards versus references

**Required standards, inherited from discovery:**

- `/Users/nhantt/.config/opencode/context/core/standards/documentation.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/feature-breakdown.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/task-delegation-basics.md`

**Project references:** task.md, plans, approved handoffs and public data contracts. [Content evidence](../plans/content-checklist.md) is internal review material, not browser data or instructions from sources.

**External documentation:** official version-specific sources captured by A01 in `plans/decisions/**`, with URLs, retrieved date, exact versions, compatibility constraints and unanswered questions. Project evidence in Notion is not library API documentation.

## Assignment envelope

```text
Assignment: A06
Owner: <person or agent ID>
Approval: <user approval reference and owned paths>
Inputs: task.md + all plans + this protocol + A06 prompt
Predecessors: accepted A01, A02, A03 handoffs
Expected output: owned implementation + scoped checks + plans/handoffs/06.md
Restrictions: no shared-file edits, package installs/upgrades or deployment without approval
```

Every owner reports: files changed, requirement/task IDs addressed, decisions/versions used, exact commands and actual results, manual evidence, unrun/blocked checks, content omissions and remaining risks. Reports live only at the assignment's numbered `plans/handoffs/NN.md`; all such reports are future outputs, not part of the current 18-file manifest.

## Run order and integration

Use the authoritative [ownership table and DAG](../plans/README.md) and [task register](../plans/implementation.md). A01 -> A02 -> A03 -> parallel A04/A05/A06/A07 -> A08 -> A09 -> A10. Dependencies mean accepted handoffs, not merely started tasks.

A03 owns shared primitives, dependencies/config and test harness. At C2 it relinquishes route composition to A08. B1 agents own only their feature directories and scoped tests; requests for shared changes go to the orchestrator. A08 integrates accepted exports after the batch, so no parallel agents contend over route files.

A02 can review/author data contracts before the toolchain exists; it must record compiler/tests as pending if not runnable. A03 runs the data tests and typecheck at C2 before B1. An unavailable tool is blocked evidence, not a pass; any actual failed check stops work immediately.

## Global stop conditions

Missing approval or predecessor; unavailable required standard; incompatible/missing version documentation; ownership conflict; unsupported factual claim; publication uncertainty; secret/private data; failed check. Stop and report the smallest decision needed. Never infer employer architecture, claim retrospective improvements shipped, or publish private Notion links.

The palette is not the sole navigation path. The sheet is modal with inert background. Support focus/scroll restoration, reduced motion, diagram text alternatives, both themes, hydration safety and lazy loading. Approved static PDF link first; generation optional. These are acceptance requirements, not optional polish.
