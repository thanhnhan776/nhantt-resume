# Portfolio maintainer instructions

## Mission and approval

Keep the portfolio accurate, accessible, maintainable, and aligned with approved public content. Preserve historical role/date accuracy, personal ownership boundaries, and employer confidentiality. Treat retrospectives as future improvements, never as shipped features.

Before changing files, inspect the relevant implementation and project guidance, propose the smallest scoped change, and obtain approval. Do not install or upgrade dependencies, deploy, publish, widen ownership, or activate external integrations without approval. On any failed check, stop, report the exact result, and wait for approval before changing or rerunning. Never delete source evidence or session context without permission.

## Architecture and folders

- `app/`: Next.js App Router layout, static homepage, global styles, and robots/sitemap metadata routes. `next.config.ts` sets `output: "export"`; `pnpm build` writes the static site to `out/`.
- `components/providers/` and `components/theme/`: the narrow theme provider and System/Light/Dark control.
- `components/ui/`: shared shadcn-generated Radix primitives. Review `components/ui/README.md` and its license notice before adding or replacing primitives; compose shared components instead of forking them.
- `components/portfolio/sections/` and `cards/`: overview, employment cards, personal projects, education, and contact.
- `components/portfolio/experience/`: the single experience-sheet/command overlay coordinator, triggers, and modal sheet.
- `components/portfolio/diagrams/`: text/SVG workflow, validated renderer container, and lazy client-only architecture explorer.
- `components/portfolio/actions/` and `code/`: visible quick actions, command palette, and optional narrative/code presentation.
- `data/`: approved serializable public content only. Current modules are `profile.ts`, `experiences.ts`, `projects.ts`, `achievements.ts`, `tech-stack.ts`, and `technical-diagrams.ts`; `validate.ts` checks IDs, dates, references, links, and diagram relationships.
- `types/`: shared domain interfaces and value types, exported through `types/index.ts`.
- `lib/actions/`, `lib/overlay/`, and `lib/seo/`: shared action contracts, overlay/URL state, and metadata/schema/crawl helpers.
- `public/`: approved static assets, including the résumé PDF and Open Graph image. Do not add internal plans, private source material, or unapproved employer artifacts.
- `tests/unit/` and `tests/browser/`: unit/contract tests and Playwright browser tests. Internal project evidence is under `plans/` and must never be copied into public data or deployment assets.

The homepage is statically rendered; theme, URL selection, overlays, and the lazy graph are client enhancements. Keep client boundaries narrow and overview content useful before hydration. The graph engine is dynamically loaded only for interactive exploration; preserve ordered text alternatives and do not make drag, color, or hover the sole way to access facts.

The production hostname is owner-managed. Set `NEXT_PUBLIC_SITE_URL` to the actual approved HTTPS origin at build time. Without it, the build intentionally emits `noindex, nofollow` and omits canonical/absolute social URLs; never invent a `pages.dev` or custom domain.

## Public data and extension rules

1. Obtain evidence and publication approval before adding content. Do not copy internal citations, interview answers, private links, customer/patient information, compensation/search notes, credentials, or confidential employer details into `data/`, client props, examples, or static assets.
2. Use stable lowercase kebab-case IDs. Do not use array positions or editable labels as IDs, and do not recycle an ID after publication.
3. Add dated employment records in `data/experiences.ts` with exact historical role/location, `YYYY-MM` dates, concise approved summary, and valid achievement/project/stack IDs. Keep the array in intended chronological display order; do not mark an ended role current.
4. Add professional records to `data/projects.ts` with a matching `experienceId`; keep personal projects separate and omit `experienceId`. Preserve explicit ownership boundaries, shipped solution, trade-offs, and separately labeled retrospective improvements. Missing public demos/repositories mean omit the link.
5. Add achievements in `data/achievements.ts` only with approved wording. A numeric metric requires owner approval and evidence for value, unit, baseline/time window, and evidence label. Provider counts or other scope are scope, not impact.
6. Add technologies centrally in `data/tech-stack.ts`; reference their stable IDs from experiences/projects.
7. Diagrams in `data/technical-diagrams.ts` require an existing project, unique stable IDs, meaningful `altSummary`, ordered `steps`, and valid node/edge endpoints. Keep step/node/edge IDs unique within a diagram. `text` renders the sequential workflow; `nodes-edges` adds the lazy explorer while retaining text. `svg-asset` currently has no renderer and will show an unavailable state; do not claim it works or add asset loading without a separately approved implementation.
8. Run `validateContent`-related tests and the relevant section/diagram tests after data changes. Extend tests for references, omitted links/assets, and the intended UI behavior. Do not put fake records in production data to demonstrate an extension.

For the non-production extension walkthrough, use [`docs/content-model.md`](docs/content-model.md); its schematic placeholders are not publishable records.

## Design and interaction conventions

- Use semantic CSS variables defined in `app/globals.css` (background, foreground, card, muted, primary, border, ring, and status colors). The design uses a cool neutral base with a restrained warm accent; avoid unrelated hard-coded light/dark palettes.
- Tailwind spacing is based on the project's `--spacing: 0.25rem` token. Body text is 1rem with 1.65 line-height; the content width is capped at 72rem. Prefer existing utilities/tokens over one-off values.
- Preserve visible `:focus-visible` outlines, semantic landmarks/headings, readable Vietnamese diacritics, responsive layouts, and at least 44px primary touch targets.
- The System/Light/Dark control persists the selected theme. Keep server output hydration-safe and honor system preference and reduced motion.
- The experience sheet is a modal and shares a single overlay coordinator with the command palette. Preserve focus containment/restoration, Escape/close behavior, background isolation, browser history, and page scroll. Never open a second competing modal.
- Keep Layer 1 concise on the homepage; Layer 2 presents project/workflow and equivalent text; Layer 3 presents ownership, shipped decisions, trade-offs, and clearly labeled retrospective improvements.
- Simple workflows use the existing responsive SVG/text renderer. The interactive graph must remain optional, lazy, keyboard-selectable, theme-aware, and accompanied by ordered text and announced selection state. Preserve the usable text-stage list on narrow screens; do not require pan/drag or color alone to access facts. Avoid proprietary details and unapproved snippets.
- Preserve implemented motion tokens and primitive timings: theme-control feedback uses `--motion-fast` (150ms, ease-out; 0ms for reduced motion), the sheet content transition is 200ms ease-in-out, and its overlay fade uses 100ms. Use similarly restrained motion; do not add a second animation owner, continuous/decorative motion, or movement necessary to understand content. Keep reduced-motion behavior effective for any new interaction.

## Verified commands and validation

Runtime and package manager are pinned by `package.json`/`pnpm-lock.yaml`: Node `>=24 <25`, pnpm `12.4.1`. Install from the lockfile with `pnpm install --frozen-lockfile`.

Available scripts:

```sh
pnpm dev
pnpm build
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm test:browser
pnpm lhci
```

`pnpm test:browser` expects a prior production export in `out/`; use `pnpm build` first. To serve the built static export manually, use `python3 -m http.server 4173 --directory out` and visit `http://127.0.0.1:4173/`. For the configured three-run local Lighthouse audit, use `pnpm build && pnpm lhci`; reports are local under the gitignored `.lighthouseci/` directory and are not uploaded.

The owner-approved initial-route JavaScript budget is 256 KiB gzip for JavaScript files referenced by the initial overview HTML, excluding deferred chunks. The recorded Node zlib size is a deterministic offline estimate, not an HTTP transfer measurement. Verify actual bytes and host behavior after the owner configures the production hostname. Lighthouse lab values are not field Core Web Vitals; do not claim WCAG conformance from an automated score.

## Release and publication

Use actual scripts and report exact outcomes. Check relevant tests, lint/format/typecheck, static build, affected viewport/theme/accessibility behavior, and content approvals. Never describe owner-skipped or blocked checks as passing. Production metadata, indexing, robots/sitemap, and actual transferred bundle size require the owner's configured hostname and production build. Code or documentation completion is not deployment or publication permission.
