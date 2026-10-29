# UX and component specifications

Status: proposed. [Architecture](architecture.md) defines contracts; [content review](content-checklist.md) determines what can be shown. Visual behavior below is acceptance intent, not verified library API usage.

## Viewer journey — D1, D2

| Layer                   | Recruiter / interviewer goal                    | Visible content                                                                                               | Exit / next action                                   |
| ----------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| 1 Overview              | Understand fit in 30 seconds                    | Name, chosen headline, UTC+7, strengths, dated company cards, approved impact/scope badges                    | Contact/PDF, open a company, jump to projects        |
| 2 Architecture/workflow | Understand the system and personal contribution | Sheet overview, selected project, simplified workflow/explorer, ownership boundary                            | Select node, read text steps, open technical details |
| 3 Deep dive             | Evaluate judgment                               | Shipped decisions, trade-offs, challenges, approved snippet and separately labeled retrospective improvements | Return to diagram/company without losing place       |

Do not put every diagram or long technical narrative on the main page. Keep card summaries to a role/date line, 2–3 evidence-based bullets and a clear “Explore work” action. Unknown impact gets a qualitative outcome, not an invented number. Company projects are sheet stories; VCS Badminton Admin is the personal-project candidate.

Example journey: `NetVirta card -> Explore work -> Wardrobe workflow -> Text steps -> Retry handling -> Close -> same card and scroll position`.

## Employment sheet — A05, D2, D5

- Desktop proposal: right-hand sheet approximately 48–64rem wide, capped near 85vw, leaving a visible slice of context. Overlay dims and makes the background inert: **visible is not interactive**.
- Mobile: full available width and dynamic viewport height; internal content scrolls with safe-area padding. Close control and heading remain easy to find; avoid nested scrolling diagram traps.
- Header: employer, exact historical role and dates, accessible title, explicit close button. Body: summary, project tabs where needed, diagram/text, ownership and optional deep-dive accordion inside the sheet.
- Use a verified modal dialog primitive. Trap focus, label the dialog, lock background scroll, make Escape and close work, and restore focus to the invoking card. If a deep link opened it without a trigger, restore to the experience heading.
- Save page scroll before open and restore on close without jumping to the top. Company/project changes reset sheet content scroll intentionally, not the underlying page.
- URL contract: direct valid ID opens after hydration; opening sets the selected ID without scrolling; closing removes it while retaining unrelated parameters. Back/Forward restores selection. Invalid ID does not create an empty dialog. Freeze push/replace behavior in A03 and test in A09.
- One modal at a time. Opening commands from a sheet closes/suspends that sheet through the coordinator; selecting an experience from commands closes the palette before opening the sheet. No stacked Radix focus traps.

State example:

```text
none -> experience(netvirta) -> command(previous=netvirta)
command -> experience(trusting-social) on selection
command -> experience(netvirta) on cancel, only after palette fully closes
experience -> none on close; restore original trigger and page scroll
```

## DiagramContainer and explorer — A06, V1

- Simple sequential workflows use lightweight responsive SVG. Interactive module selection uses lazy `@xyflow/react`, subject to A01 version verification. Mermaid is optional and not a mandatory dependency.
- Reserve a stable aspect ratio/min-height to prevent layout shift. Provide loading, failed-render and no-diagram states. The textual steps remain available even if visualization fails.
- Node details show module responsibility, stack references, personal ownership, shipped decision/trade-off and a separate retrospective section. No tooltip-only facts or hover-only actions.
- Provide keyboard-selectable node list/buttons equivalent to the visual graph, visible focus, selected-state announcement, fit/reset controls and labeled zoom controls. Do not require pan/drag or trackpad precision to obtain content.
- For narrow screens prefer ordered stages plus selected detail rather than an unreadably shrunken graph. Preserve native vertical scrolling; permit explicit opt-in diagram manipulation.
- Match light/dark tokens, use sufficient contrast, and distinguish edges/status by text or shape as well as color. Never animate essential meaning only through moving particles.
- Render no raw user-supplied HTML, executable diagram strings or arbitrary remote SVG. Data references approved local renderer IDs; sanitize/allowlist any optional Mermaid use before enabling it.

Example public reconstruction: `upload session -> detection -> background removal -> optional beautification -> user selection -> wardrobe creation`. Show retries/states only at the level approved for publication; do not invent a durable queue or DLQ as historical infrastructure.

## Theme and visual system — A03

- Slate/Zinc neutral base with a restrained single primary accent. Semantic CSS variables cover background, surface, text, muted text, border, primary, focus and status; components do not hard-code independent light/dark palettes.
- Proposed spacing scale: 4/8/12/16/24/32/48/64px; content max-width roughly 72rem. Readable body measure 60–75 characters; 16px base text; monospace for code and small metadata only.
- Theme control exposes System / Light / Dark with a textual accessible name and selected state. Resolve system preference without rendering contradictory theme-dependent labels in server HTML.
- Follow verified next-themes bootstrapping, CSP and hydration guidance. Do not claim “zero flicker” from inspection alone: test cold load, reload, persisted choice and system changes, with no hydration warning or wrong-theme flash on supported browsers.
- Mobile target size at least 44px for primary controls; keyboard-visible focus never removed. Text contrast targets WCAG AA (4.5:1 body, 3:1 large text); essential UI boundaries target 3:1.

## Motion and loading

Proposal: 150–220ms hover/focus feedback, 200–300ms sheet transitions, restrained easing and transform/opacity animation. Framer Motion handles purposeful entrances/transitions only after compatible-version verification. Avoid double animation ownership between Sheet and motion wrappers.

With reduced motion: no draw-in paths, parallax, repeated pulses or spatial slides; use immediate state changes or short opacity changes. Never block focus until an animation completes. Lazy-load diagrams and palette-heavy dependencies, but retain usable fallback actions during loading.

## Five value-add specifications

| ID                     | UI specification                                                                            | Acceptance example                                                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| V1 Explorer            | Module selection reveals approved stack/decisions without second modal                      | Keyboard node list yields same detail as graph click                                                                        |
| V2 Impact-first badges | Evidence-based outcome first; scope explicitly labeled                                      | “5 affiliate providers” is scope, never an invented reliability percentage                                                  |
| V3 Command palette     | Visible launch control plus Cmd/Ctrl+K; searchable sections, email, PDF                     | Suppress shortcut in editable input contexts; clipboard failure offers selectable email; all actions also available visibly |
| V4 Code view           | Optional plain/code toggle inside story; semantic code block, horizontal overflow contained | Summary remains readable; approved illustrative reconstruction labeled as such; no actual secrets/config keys               |
| V5 PDF                 | Same approved static asset in Hero and Navigation                                           | Descriptive “View résumé PDF”; hide unavailable action instead of shipping a broken link; generation is optional follow-up  |

## Accessibility review scenarios

1. Keyboard-only: skip link, navigate sections, open each company, switch projects, read node details, close and regain origin.
2. Screen reader: headings form a logical hierarchy; dialog name is announced; async status uses a restrained live region; icons are not duplicated announcements.
3. Touch/zoom: 320px viewport, 200%/400% zoom, long titles and Vietnamese diacritics; no page-level horizontal overflow.
4. Theme/motion: light, dark, system, reduced motion and forced colors where supported; graph and code are readable in every supported mode.
5. JavaScript or graph failure: overview/contact remain useful; text alternatives explain available approved workflows.
