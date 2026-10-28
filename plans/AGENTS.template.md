# Portfolio contributor instructions

> Proposed future root `AGENTS.md`. Do not activate during planning. A10 must reconcile this template with actual verified versions, commands and paths before copying it to the repository root. All instructions below describe the intended implemented project, not current code.

## Mission and approval

Maintain a fast, accessible portfolio that separates overview, visual explanation and technical deep dive. Preserve factual accuracy, personal ownership boundaries and employer confidentiality. Load current project standards through ContextScout before changing documentation or code; propose scoped changes and obtain user approval before writes. Verify official version-specific APIs through ExternalScout/Context7 before library-dependent implementation.

Never install, upgrade, deploy, widen ownership or activate integrations without approval. On failed validation stop and report the exact failure; do not silently repair unrelated work. Never delete session context or source evidence without permission.

## Architecture and folders

- `app/`: App Router layout, canonical homepage, global styles and SEO metadata routes. Overview content is server-rendered/static-prerendered; keep interactive client boundaries narrow.
- `data/`: approved public records only. `data/experience.ts` holds employer entries and stable project relationships; companion files hold profile, projects, education and stacks.
- `types/`: `Experience`, `Project`, `Achievement`, `TechnicalDiagram`, `TechStack` interfaces and shared value types. Changes require consumer and validation review.
- `components/ui/`: shared shadcn/Radix primitives; do not fork a primitive per feature.
- `components/portfolio/`: sections/cards, experience modal coordination, diagrams, actions and code views.
- `components/providers/` and `components/theme/`: verified theme provider and accessible switch control.
- `public/`: approved static résumé PDF, diagram assets and OG images only. No private sources or raw employer material.
- `tests/`: scoped unit suites, end-to-end journeys, accessibility and performance evidence.
- Internal planning/evidence files are not website content and must not be copied into deployment assets.

Default deployment is a static-prerendered homepage on an SSR-capable Next.js host. Pure static export is an explicit alternate decision with separate image/metadata limitations; do not introduce runtime-only features into an export. A10 records the actual approved deployment decision and exact commands here before activation.

## Content and data rules

1. Obtain evidence and publication approval first; historical roles/dates are not inferred from headline or list order.
2. Assign URL-safe stable IDs; never use array indexes or editable company names as identity. Preserve old IDs when editing copy.
3. Add a company to `data/experience.ts` with exact historical role, month dates, location, concise summary and references to approved project/achievement/stack records. Sort by actual dates; do not mark ended employment current.
4. Professional projects require confirmed employer relationships. Personal projects are separate; unknown attribution blocks publication.
5. Achievement metrics require baseline, measured result, time window and permission. Scope counts are labeled as scope; illustrative examples are never claimed results.
6. Diagrams require text summaries, ordered steps and valid references. Snippets are approved, non-executable public examples; strip secrets and proprietary configuration.
7. Omit unavailable links/assets cleanly. Never ship draft evidence/private fields and merely hide them in UI.
8. Update relevant tests and maintainer guidance when data contracts change. No direct runtime fetching from Notion is required.

Worked extension example (procedure, not TypeScript):

```text
Approved company -> stable experience ID -> exact role/month dates
Approved project -> professional kind + experience ID + ownership boundary
Diagram -> project ID + approved renderer + alt summary + ordered text steps
Validate all references -> test card/sheet in both themes -> obtain publication sign-off
```

Do not put invented example companies or fake impact into production records. A10 adds the actual verified validation commands here before activation, rather than guessing package scripts.

## Design system

- Use semantic CSS color variables with a Slate/Zinc neutral base and one restrained primary accent. Tailwind utilities consume these tokens; do not add unrelated hard-coded light/dark palettes.
- Use the shared 4/8/12/16/24/32/48/64px spacing scale, readable 16px body type and restrained hierarchy. Monospace is for code/metadata, not long body paragraphs.
- Preserve visible focus, WCAG AA contrast, generous touch targets and responsive line lengths. Test long names and Vietnamese diacritics.
- Respect the user's System/Light/Dark choice and persistence. Avoid theme-dependent server/client markup mismatch; verify cold-load appearance and hydration.

## Progressive disclosure

- Layer 1 cards: employer, historical role/tenure, 2–3 strongest approved outcomes and clear detail action.
- Layer 2 sheet: architecture/workflow visuals, equivalent text steps, project selection and scope of personal ownership.
- Layer 3: decisions, trade-offs, technical detail and optional code. Retrospective improvements are separately labeled, never described as shipped features.
- Do not move every deep dive onto the homepage or replace the employment sheet with a page-expanding accordion.

## Interaction and motion

The experience sheet is a modal dialog: background context may be visible on desktop but remains inert. Mobile uses full width. Preserve page scroll, trap/restore focus, expose Escape and a labeled close button, and test browser history/deep links.

Only one modal owns focus. Commands and experience details coordinate through the shared overlay contract; no nested competing focus traps. Palette actions also have visible navigation/contact/PDF equivalents.

Use restrained 150–220ms feedback and 200–300ms transitions unless the implemented tokens specify tighter values. Animate transform/opacity rather than expensive layout work; avoid duplicate primitive/motion animations. Reduced motion disables spatial/continuous effects without removing information or delaying focus.

## Diagram and workflow conventions

- Use lightweight responsive SVG for simple flows; lazy-load verified `@xyflow/react` for interactive module exploration. Mermaid is optional and must not render untrusted executable content.
- Nodes/edges use stable IDs, resolve all endpoints and refer to approved public detail records. Do not recreate proprietary infrastructure from assumptions.
- Provide keyboard-selectable equivalent node details and an ordered textual workflow. Pan, drag, hover and color cannot be the only access paths.
- Set stable dimensions/loading/error fallbacks, fit/reset controls and theme-aware labels/edges. Test mobile, zoom, light/dark and reduced motion.
- Keep diagram selection inside the sheet rather than opening a second modal. Defer graph dependencies until needed.

## SEO, performance and validation

Use approved canonical/social URLs and schema.org Person JSON-LD, not an invented Resume type. Static OG assets and approved PDF links are the baseline. Do not publish private source URLs, unsupported credentials or fake numeric achievements.

For every change: run the implementation's recorded typecheck/lint/scoped tests and production build as appropriate; inspect accessibility and affected viewports/themes. Record exact commands and observed results. Lighthouse 100/100 is an aspiration; report real measurements, tool settings and limitations. Never claim field Core Web Vitals from lab-only evidence.

Stop and report failed checks or privacy/contract ambiguity. Publication requires content-owner approval and a release review; code completion alone is not deployment permission.
