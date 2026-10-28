# A10 — Activate accurate maintainer documentation

Owner: unassigned. Status: not executed. Role: technical writer and maintainer reviewer. Tasks: T10.1–T10.2; requirement D6. Estimate: 3h.

## Required reads and approval

Read [task.md](../task.md), all [plans](../plans/README.md), especially [AGENTS template](../plans/AGENTS.template.md), [architecture](../plans/architecture.md), [validation](../plans/validation.md), [protocol](README.md), and accepted A01–A09 handoffs/release evidence. Inspect actual implemented files read-only to verify documentation accuracy.

Call ContextScout before writing and read inherited standards:
- `/Users/nhantt/.config/opencode/context/core/standards/documentation.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/feature-breakdown.md`
- `/Users/nhantt/.config/opencode/context/core/workflows/task-delegation-basics.md`

Load additional documentation standards it recommends. Propose precise documentation changes and obtain explicit approval to activate root instructions. Use A01 official version-specific sources; verify uncovered API claims through ExternalScout/Context7, or omit unverified instructions. Standards, project references and external docs stay distinct.

## Prerequisites and ownership

Requires accepted A09 C5 evidence for the frozen candidate and separate root-instruction activation approval. Own future root `AGENTS.md`, root `README.md`, `docs/**`, `plans/handoffs/10.md`; **Markdown only**. Do not edit plans/template, task.md, code/config/assets/dependencies or raw evidence. No edits outside ownership without approval; no deployment/source deletion.

## Tasks

1. Compare proposed template with actual folders, exports, approved versions, rendering/hosting mode and measured limitations. Document implemented reality, not planned features that were omitted or blocked.
2. Create root AGENTS from the template with actual commands and accurate paths. Cover `/data`, `/types`, `/components/ui`, `/components/portfolio`, approved assets and narrow server/client boundaries.
3. Explain adding companies/projects/achievements/diagrams in `data/experience.ts` and related files: stable IDs, exact roles/month dates, references, professional/personal classification, permission, validation and safe omission.
4. Cover all requested design rules: semantic color tokens, Slate/Zinc + accent, spacing/type scale, motion durations/easing/reduced motion, Layer 1/2/3 placement and diagram theme/mobile/keyboard/text conventions.
5. Root README provides concise approved setup/build/test/serve steps, environment requirements, features and limitations. Include exact commands only from verified scripts and A09 evidence; do not install or execute assignments as part of writing.
6. Provide a worked, clearly non-production extension example or dry-run procedure that shows a new experience -> professional project -> diagram -> tests -> publication review. Never introduce fake content into production data or reproduce private sources.
7. Explain static-prerender vs pure-export decision, OG/PDF limitations, Person JSON-LD, visible alternatives to palette, modal focus/scroll rules and initial/deferred dependency boundaries.
8. Validate all created documentation links, folder/command references and D6's five required instruction areas against actual files/evidence. Record unresolved docs questions; internal source URLs/raw content do not belong in public maintainer examples.

Example extension procedure:

```text
Obtain publication approval -> assign stable IDs -> add approved public records
Resolve stack/project/diagram references -> run exact recorded scoped commands
Check both themes/mobile/reduced motion -> owner approves release
```

## Acceptance and handoff

- Complete root AGENTS is accurate, explicitly approved and ready to commit; template is not activated prematurely.
- Root README/docs contain concise, usable examples and exact verified commands without secrets/private evidence.
- `plans/handoffs/10.md` lists files, D6 coverage, checks/results and remaining limitations; owner makes final release decision.

## Stop conditions

Stop on failed documentation validation, missing C5 evidence/activation approval, unavailable standards/docs, factual mismatch or any requested non-Markdown/outside-ownership edit. Report; do not fix production issues, claim unrun commands succeeded or publish private evidence.
