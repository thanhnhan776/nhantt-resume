# A09 browser validation — evidence log

Original candidate: `A08-2026-10-29-2938a4dbb2be6acb5e86b5311baa1f4f8154fd4e86fc979b454e1abc38b71969` (superseded). Intermediate candidates: `A08-2026-10-29-1e462350c3794c64c89218abff92d45e0f795926b59d723306aedb9ab4bbae46` and `A08-2026-10-29-55bb018d648c79e48ea4169b95d5ff25ce3f91bb72734c8f8e1899bf56869cd4` (superseded). Current candidate: `A08-2026-10-29-de620ee4d0ba8ca9e0b926dfeb7899d1defaf21645aa2d1a5af04f3f7fe96dbf` (17-file SHA; see [candidate/run record](01-candidate-and-run-record.md)).

## Environment

- Run date: 2026-10-29; command run at approximately 17:14 local time (Playwright static server log).
- macOS ARM64; Node `v24.21.0`; pnpm `12.4.1`; Python `3.13.16`.
- Playwright Test `1.64.1`; Chromium `156.0.8078.4` (`browser.version()`); headless Chromium.
- Harness: `playwright.config.ts`, one worker, static server `python3 -m http.server 4173 --directory out`, base URL `http://127.0.0.1:4173`.

## Check 02.1 — existing browser smoke suite

- Procedure/command: `pnpm test:browser`.
- Expected: three approved static-shell/theme browser tests pass; cold load has no console/page errors, theme persistence/system changes work, and 320px/reduced-motion/keyboard shell assertions pass.
- Actual: **PASS**, 3/3 tests in 1.7s. Test cases: cold system-theme load and no hydration errors; Light persistence/system preference; 320px shell, reduced motion and keyboard focus. Static server returned HTTP 200 for `/` and chunks; expected 304 on subsequent cached `/` request.
- Artifact: terminal output from this run; no Playwright trace or screenshot was configured/generated.
- Scope note: This is existing `tests/browser/theme.spec.ts` coverage, not evidence for the additional A09 recruiter/interviewer journeys or full accessibility matrix.

## Baseline checks run after browser smoke

- `pnpm test` — **PASS**, Vitest 5.0.5, 18 files / 86 tests passed, 2.52s. Output included `Not implemented: Window's scrollTo() method` from jsdom; command exited successfully. This notice is retained rather than treated as a failed check.
- `pnpm typecheck` — **PASS**, `tsc --noEmit`, exit 0.
- `pnpm lint` — **PASS**, Biome checked 122 files, no fixes, exit 0.
- `pnpm format:check` — **PASS**, Biome checked 119 files, no changes, exit 0.
- `pnpm build` — **PASS**, Next.js 16.4.3/Turbopack. Routes `/`, `/_not-found`, `/robots.txt`, `/sitemap.xml` reported static and prerendered. This regenerated the approved static export at `out/` for subsequent inspection.
- These commands were run serially on the candidate; no failure occurred. Terminal output is the evidence; no separate log artifact or build manifest was configured.

## Remaining browser checks

Not run yet: contact/PDF journey; each employer sheet; project switching; diagram/text equivalence; code toggle; command coverage; valid/invalid direct selection; Back/Forward; focus containment/restoration; inert background; scroll preservation; direct-link fallback; modal sequencing; editable-control shortcut behavior; clipboard-denial fallback; mobile/tablet/desktop and assistive technology pairings. Do not treat this list as passed. Continue in prescribed sequence; halt and record immediately if any attempted check fails.

## Check 02.2 — original-candidate STOP: focus and overlay behavior failure

- Candidate: same verified A08 candidate above.
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; static export at `out/`, served with `python3 -m http.server 4173 --directory out`; viewport 1280×900.
- Procedure: navigate to `/`; locate and focus button `Explore work at NetVirta Pte. Ltd`; record `window.scrollY`; click trigger; wait up to 30 seconds for dialog named `NetVirta Pte. Ltd experience`.
- Expected: selecting the NetVirta experience opens its named dialog, allowing subsequent checks of initial focus, background hidden state, Tab containment, focus restoration and scroll restoration.
- Actual: **FAIL** — named dialog did not become visible within 30 seconds. Playwright `locator.waitFor` timed out at the dialog visibility assertion. Later focus, inertness, keyboard containment, close, restoration and scroll assertions were not executed.
- Command/artifact: inline Node Playwright script run via `node --input-type=module`; terminal failure output recorded in the A09 session transcript. No trace or screenshot was configured.
- Affected area/owner to investigate: A05 experience-sheet opening behavior / A08 overlay integration; exact cause is undiagnosed. No repair or diagnosis attempted under the stop rule.
- **STOP CONDITION APPLIED:** no further checks were run on the original candidate. The user then approved an A05/A08 cross-story repair and a new candidate was frozen; the following check records that candidate's result.

## Check 02.3 — STOP: corrected-candidate focus assertion failure

- Candidate: corrected candidate `A08-2026-10-29-1e462350c3794c64c89218abff92d45e0f795926b59d723306aedb9ab4bbae46` (13-file snapshot, including `InteractionRoot.tsx`).
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; static export rebuilt with Next.js `16.4.3`, served at `127.0.0.1:4173`; viewport 1280×900.
- Procedure: navigate to `/`; focus and click NetVirta trigger; wait for named dialog (10s); assert active element id is `experience-title`; then intended checks of background hidden state, Tab containment, focus restoration and scroll restoration.
- Expected: dialog opens and `onOpenAutoFocus` focuses the sheet heading before subsequent dialog checks.
- Actual: dialog opened within 10s, but the focus assertion **FAILED**: `document.activeElement?.id` was `""`, expected `"experience-title"`. The script exited at this assertion. Background, Tab containment, close/restoration and scroll assertions were not executed.
- Command/artifact: inline Node Playwright script in the session transcript; no trace/screenshot configured.
- Affected area/owner: A05 `ExperienceSheet` / Radix Sheet focus initialization, with A08/A09 integration evidence. Cause is undiagnosed.
- **STOP CONDITION APPLIED:** no additional validation was run on the corrected candidate. No further repair or rerun until separately approved.

## Check 02.4 — STOP: background-hidden assertion target mismatch

- Candidate: current candidate `A08-2026-10-29-55bb018d648c79e48ea4169b95d5ff25ce3f91bb72734c8f8e1899bf56869cd4` (15-file snapshot listed in the A08 handoff).
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; latest static export at `out/`, served at `127.0.0.1:4173`; viewport 1280×900.
- Procedure: navigate to `/`; focus and click NetVirta trigger; wait for named dialog; assert `document.activeElement.id === "experience-sheet-title"`; then assert `main[aria-hidden] === "true"`.
- Expected: corrected dialog opens and initially focuses the unique sheet heading; background content is hidden from assistive technology.
- Actual: dialog opened and the sheet-heading focus assertion **PASSED**. The next assertion **FAILED** because `main.getAttribute("aria-hidden")` returned `null`, not `"true"`. The check inspected `main` specifically; it did not establish that the application background was exposed or hidden elsewhere. Tab containment, close, trigger restoration and scroll restoration were not executed.
- Command/artifact: inline Node Playwright script in the session transcript; no trace/screenshot configured.
- Affected area: A09 validation procedure/assertion target; A05 handoff's existing unit evidence says Radix marks a body-level app wrapper `aria-hidden`, not necessarily the `<main>` element. Actual browser target remains unverified.
- **STOP CONDITION APPLIED:** no further checks were run. This is recorded as a failed assertion/check procedure, not a confirmed product accessibility defect. Correct the target using evidence from the actual DOM only after approval, then resume with approved procedure.

## DOM diagnostic and corrected check — current candidate

- The user approved inspecting the live DOM and rerunning with a behavior-based assertion. Official Radix Dialog docs were fetched; they require modal background inertness/focus trapping but do not guarantee a specific `aria-hidden` or `inert` attribute.
- DOM diagnostic procedure: served current `out/`, opened NetVirta sheet, and captured `document.activeElement`, direct body-child attributes, dialogs, `[inert]`, and `[aria-hidden=true]` nodes.
- Actual: focus was `H2#experience-sheet-title`. `main#main-content` itself had no `aria-hidden`; Radix had `aria-hidden=true` on background descendants (including the trigger button) and left the dialog portal visible. No `[inert]` roots were present in this browser build. This explains why asserting `main[aria-hidden]` was not a valid contract assertion.
- Corrected browser procedure on the current 15-file candidate: open sheet from the focused NetVirta trigger; assert focus is on `experience-sheet-title`; assert the background trigger is absent from the accessible role tree; press Tab and Shift+Tab and assert focus remains within the dialog; close and assert focus returns to the trigger.
- Actual: **PASS** for all assertions in headless Chromium `156.0.8078.4`, viewport 1280×900. Command was an inline Node Playwright script with static server `python3 -m http.server 4173 --directory out`; no trace/screenshot configured. Timestamp: 2026-10-29, after the approval to inspect and rerun.
- This corrected check does not substitute for a screen-reader pairing, mobile browser, background pointer-activation, scroll-restoration, or broader A09 validation. Earlier failed assertions remain as historical records for superseded candidates or the invalid `main[aria-hidden]` check.

## Check 02.5 — current-candidate URL/history journey

- Candidate: current 15-file candidate above.
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; static export at `out/`, served at `127.0.0.1:4173`; viewport 1280×900.
- Procedure: load `/`; wait for H1; click NetVirta trigger; verify dialog and `?experience=netvirta`; browser Back; verify dialog closes and query clears; Forward; verify dialog/query restore; navigate to `/?experience=not-valid`; wait for invalid query removal and verify no dialog.
- Expected: valid selection is represented in history; Back closes it; Forward restores it; invalid direct IDs are normalized away without opening a sheet.
- Actual: **PASS** for all assertions. No trace/screenshot configured; inline Node Playwright output is in the session transcript.
- Remaining: no evidence yet for PDF/contact journey, every project/diagram fallback, command/palette paths, scroll restoration, mobile/responsive, screen-reader pairings, automated accessibility scan, or performance/SEO/content gates.

## Current-candidate regression suites

- `pnpm test:browser` — **PASS**, 3/3 existing Playwright tests in 1.3s on headless Chromium 156.0.8078.4; static server returned HTTP 200 for `/` and chunks (304 for a cached `/`). The suite covers hydration/theme, persistence/system mode, and 320px/reduced-motion/keyboard shell behavior. It does not cover the new focus check; that is documented separately above.
- `pnpm test` — **PASS**, Vitest 5.0.5, 18 files / 87 tests, 2.62s. Output logged jsdom's `Window.scrollTo()` unimplemented notice and performance advisory; exit was successful. No scroll-restoration claim is made from this unit run.
- Both commands ran against the current rebuilt static export/source after the overlay and focus correction; exact current candidate is the 15-file snapshot at the top of the record.

## Check 02.6 — STOP: mobile sheet opening timed out

- Candidate: current 15-file candidate above.
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; static export at `out/`, served at `127.0.0.1:4173`; intended final viewport 320×740.
- Procedure: load `/`; sequentially set viewport widths 320, 375, 768, 1024 and 1440, checking overview `documentElement.scrollWidth <= innerWidth` at each; restore 320×740; click NetVirta trigger; wait for named dialog.
- Expected: no horizontal overflow at each viewport; at 320px the experience dialog opens and fits within the viewport.
- Actual: the five overview width checks completed without assertion failure. The dialog did not become visible before Playwright's 30-second timeout; the command runner then closed the browser. Sheet bounds and open-sheet overflow were not measured. The script did not attach page-error listeners and did not explicitly wait for the H1/hydration before clicking.
- Command/artifact: inline Node Playwright script from session transcript; no trace/screenshot configured.
- Affected area: A05/A08 mobile overlay opening or test readiness; cause undiagnosed. Do not assume the earlier timing correction fully resolves this path.
- **STOP CONDITION APPLIED:** no further validation was run after this failed check. Resume only after the failure is reviewed and a separately approved correction/procedure is defined.

## Check 02.7 — approved readiness diagnostic and corrected mobile check

- Candidate: current 15-file candidate above.
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; static export at `out/`, served at `127.0.0.1:4173`; widths 320, 375, 768, 1024, 1440px and final sheet viewport 320×740.
- Procedure: attach page/console error listeners; load `/`; wait for H1; click Light and assert `aria-pressed=true`, then click System and assert its pressed state (explicit client-interactivity readiness); test overview overflow at each width; set 320×740; click NetVirta trigger; assert dialog opens, bounding rect stays within viewport, page has no horizontal overflow, and browser error list is empty.
- Expected: after a real client control responds, the page and sheet fit all tested widths and sheet opens without browser errors.
- Actual: **PASS**. Theme control responded as readiness check; all five overview widths had no horizontal overflow; NetVirta sheet opened at 320px, stayed within viewport without page overflow; no page or console errors.
- Artifact: inline Node Playwright output in session transcript; no trace/screenshot configured.
- Interpretation: Check 02.6's trigger click occurred without an explicit hydration/readiness assertion. With user-approved readiness gating, the mobile scenario passed. This does not establish whether a user click during hydration is replayed reliably; cold/interactivity timing beyond this tested path remains unverified. The failed run is retained as historical evidence, not erased.
- No further A09 validation was performed in this diagnostic step.

## Check 02.8 — STOP: command search locator did not resolve

- Candidate: current 15-file candidate above.
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; static export at `out/`, served at `127.0.0.1:4173`; viewport 1280×900.
- Procedure: wait for H1; press Ctrl+K; wait for Command palette dialog; select `View NetVirta Pte. Ltd`; verify sheet opens, command dialog closes, and URL contains `experience=netvirta`; close sheet; reopen commands using the visible button; locate a textbox named `Search portfolio commands` and fill it.
- Expected: command palette interaction changes cleanly to the experience sheet; search control is locatable for editable-shortcut testing.
- Actual: the initial palette selection, single-sheet transition, URL assertion, close, and palette reopen completed; then **FAIL** — Playwright could not resolve `getByRole("textbox", { name: "Search portfolio commands" })` before the 30-second command timeout. The script exited; shortcut-in-input and Escape checks did not run. No pageerror listener output was available before exit.
- Command/artifact: inline Node Playwright script in session transcript; no trace/screenshot configured.
- Affected area: validation locator may not match the rendered command input role; product behavior is undiagnosed. No source changed.
- **STOP CONDITION APPLIED:** no further A09 checks were run. Inspect the actual command dialog role and correct the procedure only after approval.

## DOM diagnostic and corrected command-palette checks

- With approval, opened the Command palette and inspected input attributes/roles and active element in the live DOM. Actual input: native `input[data-slot="command-input"]`, `role="combobox"`, `aria-label="Search portfolio commands"`, visible and focused. cmdk adds combobox semantics; `getByRole("textbox")` was therefore the wrong locator. No product accessibility defect was established by Check 02.8.
- Corrected procedure on current candidate: wait H1; Ctrl+K; locate named command dialog and named combobox; select NetVirta; assert palette closes before experience sheet is active and URL is selected; close, reopen palette; fill combobox; press Ctrl+K while editing; assert palette stays open and text is unchanged; Escape; assert dialog closes.
- Actual: **PASS** in headless Chromium `156.0.8078.4`, 1280×900. No page errors. Inline Node Playwright output is in the session transcript; no trace/screenshot configured.
- The previously failed `textbox` locator is retained as a historical test-procedure failure; the corrected check used the observed accessible role.

## Check 02.9 — STOP: ambiguous diagram-list locator

- Candidate: current 15-file candidate above.
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; static export at `out/`, served at `127.0.0.1:4173`; initial viewport 1280×900.
- Procedure: wait for H1; open/close NetVirta, Trusting Social and FPT Software sheets in sequence; reopen NetVirta; activate Wardrobe processing workflow tab; wait for a list in the tabpanel.
- Expected: all three employer sheets open/close; then diagram text/list equivalence and project switching can be checked.
- Actual: all three employer sheet open/close and heading assertions completed. **FAIL / test procedure blocked** at `getByRole("tabpanel").getByRole("list")`: strict-mode violation because five lists were present (workflow steps, workflow connections, explorer node list, tech stack, selected outcomes). Diagram assertions and subsequent project switching/mobile checks were not reached.
- Command/artifact: inline Node Playwright output in session transcript; no trace/screenshot configured.
- Affected area: test locator ambiguity, not a confirmed product defect. The DOM contains multiple legitimate lists; target the specific workflow text list instead of a generic list role.
- **STOP CONDITION APPLIED:** no further A09 checks were run. Correct the locator and resume only after approval.

## Check 02.10 — STOP: expected SVG text labels not found

- Candidate: current 15-file candidate above.
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; static export at `out/`, served at `127.0.0.1:4173`; viewport 1280×900.
- Procedure: wait for H1; open NetVirta sheet; select Wardrobe processing workflow; locate `.workflow-diagram__steps`; collect ordered text labels and descendant `.workflow-diagram svg text` labels; compare arrays.
- Expected: SVG's visible step labels match the ordered HTML text equivalent.
- Actual: ordered text alternative contained six labels (`Upload`, `Detection and metadata`, `Background removal`, `Optional beautification`, `Selection`, `Final wardrobe creation`); SVG text locator returned an empty array. **FAIL** at equality assertion. Desktop SVG visibility, mobile behavior and subsequent project-switch assertions were not reached.
- Command/artifact: inline Node Playwright script in session transcript; no trace/screenshot configured.
- Affected area: A06 workflow diagram rendering or the SVG selector/DOM; cause undiagnosed. No code changed.
- **STOP CONDITION APPLIED:** no further validation was run. Inspect the rendered diagram DOM and determine whether SVG markup is missing or the locator is incorrect only after approval.

## Check 02.11 — STOP: workflow-stage pointer click intercepted

- Candidate: current 15-file candidate above.
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; static export at `out/`, served at `127.0.0.1:4173`; viewport 1280×900.
- Procedure: wait for H1; open NetVirta sheet; select Wardrobe processing workflow; verify the interactive explorer region, six stage text controls, graph region, and approved alt-summary; click the Background removal text stage button.
- Expected: the text-stage control is operable and updates its `aria-pressed` selected state.
- Actual: preceding structure/content checks completed. **FAIL** — Playwright resolved the visible, enabled stage button but could not click it: an unrelated retrospective-improvement paragraph intercepted pointer events at the target coordinates through the retry period; command runner then closed the browser at its 30-second timeout. Selection, project-switching, and mobile graph/text assertions were not reached.
- Command/artifact: inline Node Playwright output in session transcript; no trace/screenshot configured.
- Affected area: A06 `ArchitectureExplorerClient` layout/pointer behavior or responsive containment; cause undiagnosed. This may be a real overlap in the interactive explorer, not merely a locator mismatch.
- **STOP CONDITION APPLIED:** no further validation or edits were made. Inspect the geometry/overlap and propose a bounded correction only after approval.

## Check 02.12 — STOP: immediate selection-state assertion did not wait

- Candidate: current 17-file candidate above.
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; rebuilt static export at `out/`, served at `127.0.0.1:4173`; viewport 1280×900.
- Procedure: open NetVirta sheet and Wardrobe processing workflow; assert `.diagram-container` encloses `.architecture-explorer`; click the Background removal text-stage button with a 5-second timeout; immediately read `aria-pressed`.
- Expected: explorer container encloses its full content; the stage click updates selection to pressed.
- Actual: container-enclosure assertion **PASSED**; click completed without pointer interception. Immediate `aria-pressed` read returned `false`, expected `true`; script failed at this synchronous assertion. No page errors were checked after that point. No code changed in this run.
- Command/artifact: inline Node Playwright output in session transcript; no trace/screenshot configured.
- Affected area: A06 text-stage selection or test's missing wait for React state update; cause not established. The pointer-overlap symptom appears resolved by the container sizing correction, but the selection state is not yet verified.
- **STOP CONDITION APPLIED:** no further validation was run. Resume after approval with a state-aware assertion (auto-wait) or diagnosis.

## Check 02.13 — approved auto-wait selection check

- Candidate: current 17-file candidate above.
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; rebuilt export at `out/`, served at `127.0.0.1:4173`; viewport 1280×900.
- Procedure: load `/`; wait H1; open NetVirta; select Wardrobe processing workflow; click the Background removal button in `.explorer-node-list`; use Playwright web-first `expect(stage).toHaveAttribute("aria-pressed", "true", { timeout: 5000 })`.
- Expected: no overlap blocks the pointer click and React updates the text-stage selected state.
- Actual: **PASS** — click completed and auto-retrying assertion observed `aria-pressed="true"` within 5s. Inline Node Playwright output in session transcript; no trace/screenshot configured.
- This resolves Check 02.12's stale one-shot read; it does not substitute for remaining project-switching/mobile/browser checks.

## Check 02.14 — current-candidate interactive diagram, project and mobile check

- Candidate: current 17-file candidate above.
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; rebuilt export at `out/`, served at `127.0.0.1:4173`; desktop 1280×900 then mobile 320×740.
- Procedure: open NetVirta; select Wardrobe processing workflow; assert six text-stage controls and graph region; check diagram summary; click Background removal and wait for `aria-pressed=true` and live announcement; switch to Parallel media URL signing and verify project content; return to workflow; resize to 320px; assert canvas hidden, text controls visible/operable and no page-level horizontal overflow.
- Expected: rendered interactive graph and accessible stage equivalent coexist on desktop; state can be changed from text controls and is announced; project switching works; mobile retains usable text controls while hiding graph canvas.
- Actual: **PASS** for all assertions. At 1280px the graph and summary were present; six controls were found; text selection updated and announced; project tab switching rendered expected content. At 320px the canvas was hidden, text controls remained visible/clickable, and the page had no horizontal overflow.
- Artifact: inline Node Playwright output in session transcript; no trace/screenshot configured.
- The diagram pointer overlap was diagnosed as the fixed 16:9 `DiagramContainer` constraining content taller than its box; a body paragraph from following project content then painted over stage controls. The A06 container now uses natural height for the `nodes-edges` renderer. Browser result verifies the previously blocked interaction path on this candidate.

## Current-candidate regression suites after diagram correction

- `pnpm test` — **PASS**, Vitest 5.0.5, 18 files / 87 tests, 2.51s. jsdom emitted its existing `Window.scrollTo()` notice and performance advisory; exit 0.
- `pnpm test:browser` — **PASS**, Playwright Test 1.64.1 / Chromium 156.0.8078.4, 3/3 tests in 1.3s; static page/chunks served successfully.
- `pnpm lint` — **PASS**, Biome checked 122 files.
- `pnpm format:check` — **PASS**, Biome checked 119 files.
- `pnpm typecheck` and `pnpm build` for the current 17-file source candidate passed earlier in this correction sequence; see the A08 handoff's current-candidate section.

## Check 02.15 — STOP: palette-to-PDF navigation timed out

- Candidate: current 17-file candidate above.
- Environment: macOS ARM64; Node `v24.21.0`; Playwright `1.64.1`; headless Chromium `156.0.8078.4`; static export at `out/`, served at `127.0.0.1:4173`; viewport 1280×900.
- Procedure: request `/resume/Tran-Thanh-Nhan_Resume_VN_Remote.pdf`; assert HTTP status, MIME and `%PDF-` signature; open command palette; select `View résumé PDF`; wait up to 10 seconds for current page URL to end with the PDF path.
- Expected: static PDF responds successfully and the palette action navigates to the approved PDF filename.
- Actual: PDF request checks **PASSED**: HTTP 200, `application/pdf`, `%PDF-` signature. **FAIL / unresolved**: Playwright `waitForURL` timed out waiting for same-page navigation after selecting the palette option. No subsequent page URL, popup/download event, or browser error was captured.
- Command/artifact: inline Node Playwright script in session transcript; no trace/screenshot configured.
- Affected area: PDF action/navigation or test's assumed same-page behavior; cause undiagnosed. Do not assume navigation works based solely on asset HTTP availability.
- **STOP CONDITION APPLIED:** no further A09 checks were run. Inspect actual navigation/popup/download behavior and correct procedure only after approval.

## Owner-directed disposition of Check 02.15

- The user stated the PDF is good and directed A09 to skip further PDF-action verification and proceed to the next item.
- The asset-level checks remain **PASS** (HTTP 200, `application/pdf`, `%PDF-` header, approved filename). Palette-triggered browser navigation remains **UNVERIFIED / SKIPPED BY OWNER**, not pass. No further PDF navigation or popup/download investigation will be performed unless requested.

## Performance and bundle observations — current candidate

- Candidate: `A08-2026-10-29-de620ee4d0ba8ca9e0b926dfeb7899d1defaf21645aa2d1a5af04f3f7fe96dbf`; independent recomputation over the listed 17 paths matched. Environment: macOS ARM64, Node `v24.21.0`, pnpm `12.4.1`, Playwright `1.64.1`, headless Chromium `156.0.8078.4`.
- Tool availability: no Lighthouse/LHCI executable, package script, or dependency is present; no dependency was installed. Therefore the required Lighthouse three-run scores and median are **UNRUN / TOOL UNAVAILABLE**, not inferred from Chromium metrics.
- Static bundle inspection of `out/index.html`: 66,815 bytes; eight directly referenced JS assets; aggregate 704,742 raw bytes and 221,019 bytes as the sum of individually gzipped files (compression of separate files, not an HTTP transfer measurement). These numbers differ slightly from the previous handoff observation (704,672 / 220,998); the current export values above are the remeasured values.
- Deferred graph evidence: `.next/server/app/page/react-loadable-manifest.json` exists; `out/_next/static/chunks/06nti3_3whmk2.js` is 180,585 raw bytes / 57,494 bytes individually gzipped and is not referenced in the initial HTML. Static inspection shows that chunk is the deferred React Flow chunk. This supports that the graph engine is excluded from the initial HTML script references; it does not establish a C2 budget pass.
- Three cold loads via `python3 -m http.server 4173 --directory out`, viewport 1365×768, `waitUntil: networkidle`: all 7 JavaScript responses per run were successful (no JS status >=400). CDP metric snapshots reported DOMContentLoaded deltas 0.027s, 0.010s, 0.012s; task durations 0.120s, 0.087s, 0.083s; script durations 0.029s, 0.019s, 0.018s. These are local, unthrottled lab observations—not Lighthouse timings, LCP/CLS/INP, field data, or representative-network claims. `FirstMeaningfulPaint` was 0 in each snapshot and is not reported as a paint result.
- Production JS loading on the overview: **PASS** for these three static local runs. Error/offline/deferred-chunk failure graceful-degradation scenario: **UNRUN**. No screenshot, trace, Lighthouse report, or network archive was saved.
- Numeric initial-JS budget comparison remains **BLOCKED**: A03/C2 did not record an approved budget. Do not infer a pass from measured sizes.

## Check 02.16 — STOP: built HTML employer-name assertion failed

- Candidate: current 17-file candidate; inspected existing `out/index.html`, `out/robots.txt`, `out/sitemap.xml` without rebuilding.
- Environment: Node `v24.21.0`, macOS ARM64.
- Procedure: assert production-export HTML contains the exact approved title, description, exactly one `<h1>`, role, three expected employer strings, education, no-host canonical absence/noindex, Person and no Resume JSON-LD, no private Notion URLs; also assert robots allow and empty no-host sitemap.
- Expected: every assertion matches the validation/content ledger.
- Actual: title, description, one H1, role, education, no-host canonical absence, noindex, Person schema/no Resume schema, no private Notion URL, robots allow, and empty sitemap assertions **PASSED**. Exact employer-name assertion **FAILED**: the test expected `NetVirta Pte. Ltd.`, `Trusting Social`, and `FPT Software`; at least one exact string was not found. Script exited nonzero before reporting which name was missing. No code changed.
- Command/artifact: inline Node assertions in session transcript; no saved artifact.
- Affected area: rendered-content expectation versus actual company naming/HTML; not yet determined whether assertion mismatch or missing content.
- **STOP CONDITION APPLIED:** halted validation. Do not continue SEO/privacy checks until this assertion is diagnosed with approval.

## Diagnosis of Check 02.16 — assertion punctuation mismatch

- Approved source `data/experiences.ts` lists employer names `NetVirta Pte. Ltd`, `Trusting Social`, and `FPT Software`. The internal content ledger also identifies NetVirta as “NetVirta Pte. Ltd” without a final period in its employer record.
- The built HTML contains all three approved rendered names, including `NetVirta Pte. Ltd` in visible experience headings and recruiter actions, as well as the approved role, education, and project content. The failed exact search expected `NetVirta Pte. Ltd.` (extra final period), which does not match the source or rendered copy.
- Classification: **invalid test assertion / content is present**, not a product failure. This resolves the employer-name mismatch. No application source was modified. Resume SEO/content/privacy inspection may proceed.

## Check 02.17 — STOP: broad static-export privacy scan produced pattern hits

- Candidate: current 17-file candidate; scanned existing 30 files under `out/` as text where possible, without rebuilding.
- Environment: Node `v24.21.0`, macOS ARM64; Python `3.13.16`.
- Procedure: byte-pattern scan all text assets for private Notion URLs, phone-like digit sequences, compensation terms, credential-related words, and private job-search phrases.
- Expected: no private information or credential material is shipped.
- Actual: private Notion URL patterns **0**; compensation terms **0**; private job-search phrases **0**. Broad phone-number heuristic returned **178 hits**, including SVG icon geometry and coordinate strings in the deferred React Flow vendor chunk. Credential-word heuristic returned **21 hits**, with observed examples being the generic URL parser's `username`/`password` fields in the Next.js fallback chunk. The checker exited nonzero due to these hits; no determination was made whether any pattern indicates actual private data. No source changed.
- Command/artifact: inline Python output in session transcript; no saved scan report.
- Affected area: privacy scan methodology requires contextual triage; current result is **inconclusive**, not a confirmed leak and not a pass.
- **STOP CONDITION APPLIED:** no further SEO/content/privacy validation will proceed until the scan hits are reviewed and the scan is either validated or corrected with approval.

## Resolution of Check 02.17 — contextual privacy triage

- The 178 phone-like matches came from the broad scan's indiscriminate treatment of digit runs as contact data. Contextual review showed the sampled matches were SVG viewBox/path geometry, bundled icon coordinates, or CSS numeric color values. A refined scan of the 14 exported HTML/TXT/XML/SVG/JSON text files found no phone-like content other than the false match on the SVG namespace/viewBox line. Every authored public file in `data/**` had zero phone-like or credential-pattern matches.
- The 21 credential-word matches were generic URL parser fields such as `username` and `password`, not credential values. A value-oriented scan for private-key headers, common key/token formats (`sk-…`, GitHub token prefixes, AWS access-key IDs), and secret assignments found zero candidate values in exported text files or authored public data.
- Additional scoped checks: private Notion URL patterns **0**; salary/compensation terms **0**; private job-search phrase patterns **0**. Internal checklist/source URLs are confined to repository planning records and are not present in the 30-file `out/` export scan.
- Classification: broad scan false positives resolved by contextual triage; no leak detected in the inspected static export. This is a pattern-based review, not a guarantee against every possible sensitive string or encoded value. No application source or data changed.

## Current-candidate SEO and shipped-content inspection

- Candidate: `A08-2026-10-29-de620ee4d0ba8ca9e0b926dfeb7899d1defaf21645aa2d1a5af04f3f7fe96dbf`; inspected existing static export artifacts and approved data sources without rebuilding.
- Production HTML facts: title `Trần Thành Nhân — Senior Full-Stack Engineer`; description identifies the approved name, headline and Ho Chi Minh City location; exactly one H1; approved role/employer/education text appears in pre-JavaScript HTML. All three employer names are present; NetVirta source spelling is `NetVirta Pte. Ltd` (no final period).
- Robots/schema: no approved production hostname is configured. Export therefore correctly has `noindex, nofollow`, no canonical, no invented absolute OG URL, Person JSON-LD with approved name/job title/public LinkedIn and GitHub `sameAs`, and no `Resume` schema. Robots allows `/` but has no sitemap URL; sitemap is empty rather than inventing a hostname. Production canonical/indexing/social image and non-empty sitemap checks remain **BLOCKED** on the owner-approved hostname.
- Public copy/data review against `plans/content-checklist.md`: shipped employers, roles/dates, education and project narratives align with the approved curation record. The media-signing copy labels timing as approximate owner recollection; VCS under-10-minute statement is explicitly an owner estimate; wardrobe retrospective improvements are labeled retrospective. Headsapp attribution, phone numbers, compensation/search notes, private interview source text and unapproved scale figures are absent from public `data/**` and inspected static text assets.
- Contact links: approved email uses `mailto:`; public LinkedIn and GitHub URLs are supplied and appear in UI/schema. No placeholder `#` or unsupported Resume schema type was found.
- Static export privacy scan: no private Notion URLs, salary/compensation terms, private job-search phrases or credential values detected in the inspected export. Broad phone and credential-word matches were contextualized as SVG/CSS geometry and framework URL-parser identifiers; no actual phone/credential leak detected. See Check 02.17 resolution.
- SEO/content/privacy findings above are scoped to the current static export; PDF metadata inspection and owner publication review of the exact final deployment remain pending. The approved hostname is still required before production-host URL/status validation.

## Lighthouse CI setup and three-run result

- User approved adding Lighthouse and recording an initial-route JavaScript budget of **256 KiB gzip**. Tooling changes are validation-only and do not change the 17-file production-source candidate hash.
- Added `@lhci/cli` `0.15.1` as a dev dependency and `pnpm lhci` script. `lighthouserc.cjs` runs three desktop/simulated-throttling audits against the production static export served by Python at `127.0.0.1:4173`; report target is local filesystem (`.lighthouseci/`, gitignored), with no upload.
- `pnpm build` — **PASS**; static routes `/`, `/_not-found`, `/robots.txt`, `/sitemap.xml` prerendered.
- `pnpm lhci` — **PASS**, Lighthouse CI `0.15.1`, embedded Lighthouse `12.6.1`, three reports completed and written locally. LHCI printed a server-readiness timeout warning because Python's startup line did not match the readiness pattern; despite the warning the server was started and all three audits completed. No audit upload occurred. The reports are generated artifacts under the ignored `.lighthouseci/` directory.
- Environment: macOS ARM64; Node `v24.21.0`; pnpm `12.4.1`; Chromium available to LHCI; desktop preset, simulated throttling; target `http://127.0.0.1:4173/` over local static HTTP. The three fetch times were `2026-10-29T13:22:09.209Z`, `13:22:20.344Z`, and `13:22:30.472Z`.
- Scores, with three-run median (all three runs returned the same category scores): **Performance 99**, **Accessibility 100**, **Best Practices 96**, **SEO 63**. This is a local lab result, not a field score or conformance claim.
- Median lab metrics: FCP **328.65 ms**, LCP **981.59 ms**, CLS **0**, TBT **0 ms**. These simulated desktop laboratory observations are not field INP/Core Web Vitals.
- Audit context: SEO `is-crawlable` fails because the no-host build intentionally emits `noindex, nofollow`; this should change only after the approved hostname is configured. Best Practices logs a 404 for `/favicon.ico`, which also triggered the console-error audit. Performance diagnostics include uncompressed assets from Python's bare static server and unused/legacy JavaScript estimates; those server-specific findings are not evidence of production Cloudflare transfer behavior. No application change is authorized or implied by these audit findings.
- Initial-route budget measurement after current build: eight script `src` files in `out/index.html`, **704,753 raw bytes**, **221,468 bytes (216.28 KiB) when each asset is gzip-compressed with Node zlib level 9**. Budget is **262,144 bytes (256 KiB)**, leaving **40,676 bytes (39.72 KiB)** headroom. This is an offline reproducible gzip estimate, not measured HTTP content-encoding transfer. Deferred graph/palette chunks are excluded by defining the budget over script references in the initial HTML.
- The `pnpm exec lighthouse --version` probe failed because the standalone `lighthouse` executable is not installed; this is expected for the chosen LHCI-only integration. The actual installed Lighthouse version was read from the three successful LHCI result JSONs (`12.6.1`), so no additional dependency is needed.
- Post-tooling validation: `pnpm lint` **PASS** (Biome, 124 files); `pnpm format:check` **PASS** (Biome, 121 files after formatting the release matrix with approval); `pnpm typecheck` **PASS**; `pnpm test` **PASS** (18 files / 87 tests); `pnpm test:browser` **PASS** (3/3). The existing jsdom `Window.scrollTo()` notice/performance advisory remains non-fatal. Lighthouse integration verification is complete for this candidate; no production source/data changes were made.
