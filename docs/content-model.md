# Maintaining portfolio content

Public records are curated in `data/` and rendered from typed, serializable values. Do not add internal source citations, approval notes, private interview content, or confidential employer material to these modules: imported values can enter the browser bundle even when a UI does not display them.

## Record files and relationships

| Record                | Module                       | Relationship                                                                                                                                                                                            |
| --------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profile and education | `data/profile.ts`            | Profile includes approved contacts and optional résumé descriptor; education is exported separately from the same module.                                                                               |
| Experience            | `data/experiences.ts`        | References achievements, projects, and technologies by stable ID.                                                                                                                                       |
| Project               | `data/projects.ts`           | Professional projects reference an experience; personal projects have no experience relationship. Projects may reference achievements, diagrams, technologies, approved links, and an approved snippet. |
| Achievement           | `data/achievements.ts`       | Evidence-backed statement and category; metric is optional and requires approval/support.                                                                                                               |
| Technology            | `data/tech-stack.ts`         | Shared label/category referenced by stable ID.                                                                                                                                                          |
| Diagram               | `data/technical-diagrams.ts` | References a project and contains a text summary, ordered steps, and optional graph nodes/edges.                                                                                                        |

The public TypeScript contracts are in `types/` and re-exported from `types/index.ts`. Check those interfaces before editing records; do not introduce schema fields merely because a plan described them.

## Safe extension procedure

1. **Approve the facts first.** Confirm the exact historical title, employer attribution, dates, location, ownership, public wording, links, and any diagram/snippet permission. Do not infer current employment or project scope from chronology.
2. **Allocate stable IDs.** IDs use lowercase letters/numbers separated by single hyphens. Preserve IDs already referenced elsewhere; do not use array positions or display labels as identity.
3. **Add shared records.** Add a technology or achievement to its central module before referencing it. Use `data/validate.ts` and its tests as the source of relationship/date/link rules.
4. **Add experience and project relationships.** Experiences use `YYYY-MM` dates and arrays of valid record IDs. Professional projects must have the matching `experienceId`; personal projects must not. State personal ownership and retrospective improvements accurately.
5. **Add diagrams only when approved.** A diagram's `projectId` must resolve. Include a useful `altSummary` and ordered steps. For `nodes-edges`, node and edge IDs must be unique within the diagram and every edge endpoint must resolve. Preserve optional and skip paths in text. `svg-asset` is not currently rendered; adding one requires a separately approved implementation.
6. **Validate the feature.** Extend `tests/unit/data/validate.test.ts` for new data relationships; update relevant section, experience, or diagram tests. Run `pnpm test`, `pnpm typecheck`, and `pnpm build`; run browser checks for visible or interactive changes. Stop on the first failed validation and report it before making a repair.
7. **Review the generated output.** Confirm the intended content appears in the correct Layer 1/2/3 location and the static HTML/assets do not contain private facts, draft content, fabricated metrics, or non-approved links.
8. **Obtain final publication approval.** A passing validator is not evidence that facts are approved for publication.

## Dry-run example (test fixture only)

Use a throwaway fixture in a unit test, never production `data/`, to rehearse an extension. The following names and copy are deliberately fictional placeholders and must not be copied into public records:

```text
Experience: id="sample-company", role="Example role", dates={start:"2025-01"}
  projectIds=["sample-workflow"], achievementIds=[], techStackIds=["typescript"]

Project: id="sample-workflow", kind="professional",
  experienceId="sample-company", title="Example workflow (test only)"
  achievementIds=[], technicalDiagramIds=["sample-flow"], techStackIds=["typescript"]

Diagram: id="sample-flow", projectId="sample-workflow", renderer="nodes-edges"
  altSummary="Example input proceeds to an example result."
  steps=[{id:"sample-step", label:"Example stage"}]
  nodes=[{id:"sample-in", label:"Example input"}, {id:"sample-out", label:"Example result"}]
  edges=[{id:"sample-edge", from:"sample-in", to:"sample-out"}]
```

For a fully valid fixture, include a `typescript` stack record (or another existing valid stack record) in the validator's `techStack` input. Pass the assembled records to `validateContent` and assert it returns no diagnostics. Deliberately remove a referenced ID in a separate negative test and assert the diagnostic identifies the broken relationship. The actual test should import the real interfaces and avoid `as` casts; do not add the sample records to production arrays.

## Progressive disclosure and privacy

- **Layer 1:** short experience summary, accurate historical dates, approved evidence-first achievements, and a clear detail action.
- **Layer 2:** project selection, approved diagram or workflow, and equivalent ordered text.
- **Layer 3:** individual ownership, shipped decisions, trade-offs, and optional approved snippets. Keep retrospective improvements distinctly labeled.

Numeric impact requires owner approval and evidence for the value, unit, baseline/time window, and evidence label. A count of providers or systems is scope, not a performance result. Omit unknown links and unavailable optional fields cleanly. Never make private provenance reachable through hidden props or client-side filtering.
