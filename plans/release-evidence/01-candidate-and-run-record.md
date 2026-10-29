# A09 candidate and run record — subtask 01

Date: 2026-10-29  
Status: **CURRENT CANDIDATE GATE PASS — current 17-file snapshot hash independently recomputed. Validation is partial; A09 remains blocked on other checks.**

## Candidate gate

- Original candidate (superseded): `A08-2026-10-29-2938a4dbb2be6acb5e86b5311baa1f4f8154fd4e86fc979b454e1abc38b71969` over 12 paths.
- Intermediate candidate (superseded): `A08-2026-10-29-1e462350c3794c64c89218abff92d45e0f795926b59d723306aedb9ab4bbae46` over 13 paths.
- Prior candidate: `A08-2026-10-29-55bb018d648c79e48ea4169b95d5ff25ce3f91bb72734c8f8e1899bf56869cd4`.
- Current candidate: `A08-2026-10-29-de620ee4d0ba8ca9e0b926dfeb7899d1defaf21645aa2d1a5af04f3f7fe96dbf`.
- The orchestrator independently recomputed SHA-256 over exactly the 17 source/test/asset paths listed in `plans/handoffs/08.md`, concatenating each POSIX path, NUL byte, file bytes, NUL byte in order. Observed hash matches the current handoff identifier. `plans/handoffs/08.md` and release evidence are excluded from this source snapshot hash.

## Environment and tools (read-only evidence)

- Initial candidate/hash and environment capture time: `2026-10-29T10:14:17Z`; corrected candidate validated later the same date; macOS ARM64 (browser dry-run reports mac-arm64).
- Locally observed: Node `v24.21.0`; pnpm `12.4.1`; Python `3.13.16`; Playwright CLI `1.64.1` (`pnpm exec playwright --version`).
- Project pins: Next `16.4.3`, React/React DOM `19.3.1`, TypeScript `5.9.3`, Playwright Test `1.64.1`; browser runner uses headless Chromium at `127.0.0.1:4173` with Python static server.
- `pnpm exec playwright install --dry-run chromium` reports expected Chrome Headless Shell `156.0.8078.4` (Playwright chromium-headless-shell build `1248`) and cache location `/Users/nhantt/Library/Caches/ms-playwright/chromium_headless_shell-1248`. Subsequent browser runs launched Chromium `156.0.8078.4` successfully.
- A03 records the approved Playwright install command and one-worker convention. A01/A03 guidance was consulted; no install or deployment is planned.
- A01 official/version-specific tool research is cached at `.tmp/external-context/a01-docs/research.md`; A03 handoff records the approved Playwright Test `1.64.1` and Chromium installation procedure (`pnpm exec playwright install chromium`) and single-worker convention. A03 reports previous harness passes, but no new command is authorized/run here.

## Procedure, result, and stop gate

- Approved candidate procedure: verify the exact source snapshot hash before validation; the current 15-file candidate matches. A09 ownership includes `plans/release-evidence/**`; do not create `tests/e2e/**` unless its use is explicitly approved by the project prompt and harness.
- No tests, audits, build, deploy, server, package-manager, or browser commands were run as part of this gate. No validation artifacts were generated.
- Mandatory stop-on-first-failure/no-repair rule: halt on candidate mismatch, missing required harness/docs/tools, or other hard gate; record blocker and await separately approved correction/new candidate. No repair or rerun.
- Existing hard blockers retained: production hostname not approved/configured; C2 initial-JS numeric budget absent. Neither value is guessed.
- Candidate gate result: **PASS** for the current 17-file source snapshot. Current-candidate scoped checks, performance/bundle, SEO and static-export privacy observations are recorded in `plans/handoffs/08.md` and `02-browser-journeys.md`; the consolidated matrix is `03-release-matrix.md`. Lighthouse is unavailable without installing a new dependency; the numeric initial-JS budget and production hostname remain blocked. A09 validation remains incomplete.
