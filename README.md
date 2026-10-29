# Developer portfolio

A static Next.js portfolio that presents approved employment and project content as a concise overview with optional company sheets, text-equivalent workflows, and deeper technical trade-offs. The interactive architecture graph is deferred until needed; the overview and workflow text remain available in the static export.

## Requirements

- Node.js `>=24 <25`
- pnpm `12.4.1` (declared in `package.json`)

## Setup and local development

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The development server runs the Next.js App Router application. The production target is a static export; build it with:

```sh
pnpm build
```

This runs the locked `next build` command and writes the exported site to `out/`. To inspect the built export with a simple local HTTP server:

```sh
python3 -m http.server 4173 --directory out
```

Then visit <http://127.0.0.1:4173/>.

## Validation commands

```sh
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
pnpm test:browser
pnpm lhci
```

Run `pnpm build` before `pnpm test:browser` or `pnpm lhci`; both exercise the generated `out/` export. Playwright uses headless Chromium and one worker. Lighthouse CI runs three local desktop/simulated-throttling audits and writes reports to `.lighthouseci/` (gitignored); reports are not uploaded. Local Lighthouse results are lab measurements, not field Core Web Vitals or an accessibility conformance certification. The LHCI run may print a Python server-readiness warning even when its configured audits complete; inspect the command's final result and reports.

## Project map

- `app/` — static homepage, root metadata, global styles, robots, and sitemap.
- `components/portfolio/` — sections/cards, experience sheet, actions, code view, and diagrams.
- `components/ui/` — shared Radix-based shadcn primitives.
- `data/` and `types/` — approved public records and their TypeScript contracts.
- `lib/` — action allowlist, overlay/URL behavior, and SEO helpers.
- `public/` — approved static résumé and Open Graph assets.
- `tests/unit/`, `tests/browser/` — validation suites.
- `docs/` — maintainer guides for content changes and hosting/validation.

See [`AGENTS.md`](AGENTS.md) for contribution constraints and [`docs/content-model.md`](docs/content-model.md) for the non-production content-extension walkthrough.

## Hosting and current limitations

The repository is configured for Next.js static export (`output: "export"`); the expected build output directory is `out/`. The owner handles GitHub/Cloudflare connection, production hostname, deployment, and release authorization. No deployment or production-host validation is claimed here.

Set `NEXT_PUBLIC_SITE_URL` to the actual approved HTTPS production origin in the production build environment. Without it, the site intentionally emits `noindex, nofollow` and omits canonical and absolute social metadata; never substitute a guessed hostname. Keep preview builds non-indexable.

The accepted initial-route JavaScript budget is 256 KiB gzip, measured over JavaScript assets directly referenced from initial overview HTML and excluding deferred chunks. The recorded 216.28 KiB figure is a local deterministic compression estimate, not actual Cloudflare transfer bytes. Recheck the hosted build after configuring the production hostname. The A09 evidence matrix records owner-skipped checks and remaining production/PDF review limits.

## Content changes

Only publish content with owner approval and evidence. Keep personal projects separate from employer work, preserve exact historical role/month dates and ownership boundaries, and label owner-recalled estimates as such. Missing links should be omitted rather than replaced with placeholders. Follow [`docs/content-model.md`](docs/content-model.md) and update tests for the changed data relationships and presentation.
