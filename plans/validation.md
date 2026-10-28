# Validation and release evidence

Status: future checklist. No application tests, installs or builds were run for this documentation package. A09 validates a candidate after A08; see [task register](implementation.md) and [owners](README.md).

## Evidence protocol

For every check record candidate identifier (commit when available, otherwise explicit file snapshot), environment/runtime/browser versions, command or manual procedure, expected/actual result, timestamp and artifact location. Never present a planned check as a pass.

```text
Check: keyboard close restores NetVirta trigger
Candidate: <frozen candidate identifier>
Environment: <browser / OS / viewport / theme>
Procedure: Tab to trigger -> Enter -> Tab through sheet -> Escape
Expected: no background focus; trigger restored; page scroll unchanged
Actual: <observation, not assumption>
Evidence: <screenshot, trace or test report>
Status: pending | pass | fail | blocked
```

On any failed check, stop immediately and report the failure and affected owner. Do not auto-fix, continue unrelated validation or weaken thresholds. Resume only after an approved repair and a new candidate. Do not claim release success with blocked mandatory checks.

## Layered test matrix

| Layer / owner | Required checks | Evidence / release gate |
|---|---|---|
| Data / A02 | All five D4 interfaces; duplicate IDs; invalid date ordering; dangling references; professional/personal distinction; absent contacts/assets; unapproved metric exclusion | Unit/typecheck output; publication allowlist review |
| Foundation / A03 | Production build, typecheck, lint, test harness; semantic tokens; system/light/dark persistence; hydration | Logs plus cold-load recordings; no runtime warning |
| Sections / A04 | Hero/actions visible; exact historical roles/dates; summaries accessible; no fake metrics; long Vietnamese text | Scoped tests and viewport screenshots |
| Sheet / A05 | Focus trap/restoration; inert background; scroll lock/restoration; Escape; project changes; query selection; Back/Forward; invalid ID | Unit and manual interaction evidence |
| Diagrams / A06 | Each renderer, lazy/loading/error/no-data states; keyboard equivalent; text alternatives; missing references rejected | Tests and both-theme graph captures |
| Actions / A07 | Cmd/Ctrl+K; visible launch; typing contexts; copy success/failure; PDF availability; no nested modal; code text readable | Tests for coordinator contract and keyboard flow |
| Integration / A08 | Server overview, correct client boundaries; shared action parity; no unresolved stubs/imports; static-prerender output | Production build report and page-source inspection |
| End-to-end / A09 | Recruiter contact journey; interviewer deep dive; deep link and history; light/dark/reduced motion; mobile sheet; PDF navigation | Reproducible e2e traces and manual matrix |

Do not mock away the modal primitive in all tests: integration must exercise the actual focus/scroll implementation. Automated accessibility tests supplement, not replace, keyboard and screen-reader review.

## Accessibility gate

- WCAG 2.2 AA intent: semantic landmarks, one page h1, ordered headings, skip link, meaningful link names and visible focus.
- Dialog has a name and description; no focus escapes to background; palette and sheet never overlap as active modals.
- Check 320px, tablet, desktop, 200% and 400% zoom; touch targets, long labels and no unintended page overflow.
- Light/dark/system, reduced motion, keyboard-only and one desktop plus one mobile screen-reader/browser pairing. Record actual tested versions, not a universal support claim.
- Graph facts remain obtainable without dragging or seeing color; code overflow is contained; reduced-motion content remains understandable.

## SEO gate — D7

1. Inspect production HTML: approved name, role, company summaries and education are present before JavaScript.
2. Confirm title/description, canonical `/`, approved absolute OG image and social preview dimensions. Strip placeholder domain and private source URLs.
3. Emit valid schema.org **Person** JSON-LD with approved name, URL, job title and public `sameAs` links only. Do not invent a `Resume` schema type, unsupported credentials or current employment.
4. Verify robots/sitemap on the production host; previews are noindex. Query-detail states canonicalize to `/` and are not separate sitemap entries.
5. Test status codes, static PDF MIME/filename and accessible navigation; omit unsupported contact links rather than shipping `#` or fake URLs.

## Performance and static-build gate

Targets, to ratify at C0: LCP <=2.5s, CLS <=0.1, INP <=200ms under representative conditions. Lab tools can estimate responsiveness; do not label a Lighthouse lab value as field INP. New sites have no field Core Web Vitals evidence until real traffic exists.

- Aim for Lighthouse 100/100, but record actual Performance/Accessibility/Best Practices/SEO scores with device/throttling/tool versions and three-run median. Explain deviations; never guarantee perfect scores.
- Compare initial route bundle and deferred explorer/palette chunks. Set a numeric initial-JS budget from the measured foundation at C2, then prevent graph-engine inclusion in the initial overview chunk. No invented achieved bundle sizes.
- Optimize local fonts, dimensions for images/OG, responsive assets and stable diagram placeholders. No autoplay decorative graph animation or unnecessary heavy syntax highlighter.
- Run the exact approved production build command from A03; inspect route output to prove `/` is statically prerendered. Test via the real production-serving mode, not development mode.
- Preferred host supports SSR but v1 overview is static. If pure export was chosen, inspect exported assets and test on a static file server; verify image strategy, query restoration and metadata paths. No runtime OG generator or server endpoint may be required.
- Inspect failed chunk loading/offline behavior: core overview and text remain usable; enhancements fail gracefully.

## Privacy and content gate

Owner reviews rendered copy **and shipped source/data/chunks**, HTML, JSON-LD, source maps if published, PDF metadata and static assets. Ensure internal plans are not copied into deployment artifacts.

Block release on private Notion URLs, raw interview text, phone/compensation data, credentials/tokens, unapproved employer internals, illustrative numbers presented as results, unconfirmed Headsapp attribution or retrospective improvements described as shipped work. The [internal evidence checklist](content-checklist.md) is not a public content feed.

## Release packet — A09 to A10

- Completed D1–D7 and V1–V5 matrix, with pass/blocked states and feature omissions explicitly accepted by owner.
- Version/hosting decision, exact commands, test logs, screenshots, accessibility notes, SEO inspection, Lighthouse report and build/prerender output.
- Public content approval and remaining limitations; approved PDF/contact availability.
- Rollback instructions for selected host and prior approved deployment, or explicit first-release fallback.
- A10 verifies root docs against this evidence; owner separately authorizes publication. Documentation creation is not deployment permission.
