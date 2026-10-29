# Hosting and validation

## Rendering and hosting model

`next.config.ts` sets `output: "export"`. The approved homepage is statically rendered and `pnpm build` exports the production site to `out/`; no request-time server runtime is required for the current feature set. Query-based experience selection is restored on the client. Simple workflows include HTML/SVG/text output, while the React Flow explorer is isolated behind a lazy client boundary.

The owner handles repository connection, Cloudflare Pages project settings, the production hostname, and deployment. The repository build command is `pnpm build`; its static output directory is `out/`. Confirm the configured build image provides the required Node/pnpm versions. This guide does not claim that a live Pages project or custom domain has been created or validated.

## Production origin and previews

Set `NEXT_PUBLIC_SITE_URL` to the exact approved HTTPS origin (scheme and hostname, root path only) in the production build environment. The metadata helper rejects invalid origins. When unset, the export intentionally uses `noindex, nofollow`, has no canonical or absolute social URLs, and emits an empty sitemap rather than inventing a hostname. Do not provide the production origin to preview builds; verify preview indexing policy in the host configuration.

After hostname setup, rebuild and inspect the exported homepage head plus `robots.txt` and `sitemap.xml`; then validate the live production responses and social image URL. No production-host result is included in the A09 local evidence.

## Local build, browser tests, and Lighthouse

Use Node `>=24 <25` and pnpm `12.4.1` from the package manifest. Main commands:

```sh
pnpm install --frozen-lockfile
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
pnpm test:browser
pnpm lhci
```

`pnpm test:browser` and `pnpm lhci` target the production export in `out/`, so build first. Playwright uses the existing Python static server on port 4173 and one Chromium worker. LHCI config in `lighthouserc.cjs` starts a local Python server, collects three desktop/simulated-throttling runs for `/`, and writes reports into the gitignored `.lighthouseci/` directory; nothing is uploaded. The current config may show a server-readiness timeout warning although the server starts and audits finish; check the final command status and generated reports.

To inspect manually, build and serve the export:

```sh
pnpm build
python3 -m http.server 4173 --directory out
```

Open <http://127.0.0.1:4173/>. This simple local server does not model Cloudflare compression, cache headers, network geography, or edge behavior.

## Recorded A09 performance evidence

The approved initial-route JavaScript budget is **256 KiB gzip** across JavaScript files referenced directly by the initial overview HTML; deferred chunks are excluded. The current offline Node zlib level-9 estimate is **221,468 bytes (216.28 KiB)**, with **39.72 KiB** estimated headroom. This is not a measurement of HTTP `Content-Encoding`; confirm actual initial transfer bytes on the hosted build.

The three local Lighthouse 12.6.1 runs each scored Performance **99**, Accessibility **100**, Best Practices **96**, SEO **63**. Median simulated lab metrics were FCP **328.65 ms**, LCP **981.59 ms**, CLS **0**, and TBT **0 ms**. SEO is low because the no-host build intentionally says `noindex`; the console-error finding came from a missing `/favicon.ico`. These scores describe only local lab runs, not field Core Web Vitals or WCAG conformance. The LHCI report files are temporary/ignored; the recorded values and caveats are in this guide and the internal A09 evidence packet.

## Remaining validation and release limits

- The user owns hostname provisioning/Cloudflare connection and deployment. Canonical/social URLs, production robots/sitemap, live status/MIME, production Lighthouse, and actual transferred JavaScript remain unverified until then.
- Manual screen-reader pairings, broader viewport/zoom matrix, full keyboard journey, dedicated axe scan, offline/chunk-failure behavior, and complete recruiter/interviewer journeys were skipped or not run in A09. Do not describe them as passes or claim full accessibility conformance.
- The résumé PDF asset's status, MIME, signature, and filename were checked. Palette-triggered PDF navigation was skipped at the user's direction; PDF metadata review remains outstanding.
- The release matrix is at `plans/release-evidence/03-release-matrix.md` for internal use. A09 evidence is not deployment permission or a release sign-off; the owner makes the final decision.
