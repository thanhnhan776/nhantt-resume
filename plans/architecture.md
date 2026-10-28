# Proposed architecture

Status: design only. Read [requirements](../task.md), [UX](ux-design.md) and [content gates](content-checklist.md) before approving implementation. A01 verifies versions; A02 writes actual interfaces; A04–A08 write actual component code.

## Routes and information architecture — D1, D3

| URL | Purpose | Rendering / behavior |
|---|---|---|
| `/` | Single canonical portfolio | Prerender approved overview content; interactive islands hydrate afterward |
| `/#summary`, `/#experience`, `/#projects`, `/#education`, `/#contact` | Native section access | Real heading targets, scroll margin, keyboard navigation; work without palette |
| `/?experience=<stable-id>#experience` | Share selected employment detail | Same canonical `/`; client reads allowlisted ID after hydration, opens sheet, invalid IDs are ignored |
| `/resume/<approved-file>.pdf` | Optional approved static asset | Enable actions only when file and publication permission exist |
| `/robots.txt`, `/sitemap.xml` | Discovery | Production domain only; preview environments must not be indexed |

Do not add per-employer routes or intercepted modal routes in v1: a single selected experience and browser URL state are sufficient. Keep overview HTML useful without JavaScript. Detail entry links expose a concise noninteractive summary as well as the enhancement trigger.

Default order after owner confirmation: NetVirta (Jan 2022–Jul 2026), Trusting Social (Jul–Dec 2021), FPT Software (Feb 2020–Jun 2021). This derives from dated resume evidence, not the unsorted company list in task.md. Do not mark NetVirta current.

## Component hierarchy — D1, D5

```text
RootLayout [server]
  ThemeProvider [client; narrow theme boundary]
  Header / Navigation [server content + client controls]
  Main [server]
    Hero -> ThemeToggle + QuickActionBar
    SummaryAndStrengths
    ExperienceList -> ExperienceCard -> ExperienceTrigger
    PersonalProjectList -> ProjectCard
    Education
    ContactFooter
  InteractionRoot [client]
    OverlayCoordinator (none | experience | command)
    ExperienceSheet -> project tabs -> DiagramContainer + DeepDive + CodeView
    CommandPalette
```

Server sections receive only approved content. Do not make the whole homepage a client component to access theme or selection state. Client boundaries carry serializable public props, stable IDs and small action descriptors, not component functions from data files.

## Proposed folders

```text
app/                     layout, page, metadata routes, globals.css
components/ui/           version-verified shadcn/Radix primitives
components/providers/    theme provider
components/theme/        theme switch control
components/portfolio/
  sections/              Hero, Summary, ExperienceList, Projects, Education, Footer
  cards/                 ExperienceCard, ProjectCard, ImpactBadge
  experience/            InteractionRoot, ExperienceTrigger, ExperienceSheet
  diagrams/              DiagramContainer, SVG renderer, lazy Explorer
  actions/               QuickActionBar, CommandPalette, PDF/contact actions
  code/                  CodeView
data/                    approved public profile, experience, projects, education
types/                   the five domain interfaces and related value types
lib/                     theme, overlay, actions, seo
public/                  approved resume, diagrams, static OG assets
tests/                   owner-separated unit suites, e2e, accessibility, performance
```

The full [ownership map](README.md) controls writes, including serialized route ownership. No runtime CMS or Notion client is needed: content is curated at build time. Source review stays in Markdown outside the website's asset pipeline.

## Domain contracts — D4

These are field requirements, **not TypeScript implementation**. A02 must implement and export all five named interfaces, value unions and validation tests. Stable IDs are lowercase, URL-safe and never recycled; labels are not keys. Use plain serializable data and month-level dates (`YYYY-MM`) to avoid timezone shifts.

| Contract | Required content and relationships | Validation / omission behavior |
|---|---|---|
| Experience | id, employer, historical role, location, start/end month, summary, achievement references, project references, stack references | end >= start; current only when owner confirms; references resolve; sort by actual dates |
| Project | id, kind (professional/personal), optional experienceId, title, problem, ownership, shipped solution, trade-offs, optional retrospective improvements, diagram IDs, stack IDs, optional approved links/snippets | professional belongs to confirmed employer; no employer project in personal grid; missing demo means no button |
| Achievement | id, statement, scope/outcome category, optional metric value/unit/baseline/time window, optional public evidence label | numeric impact needs owner-approved evidence; scope counts are not impact rates; no empty or fabricated badges |
| TechnicalDiagram | id, projectId, title, renderer kind, alt summary, ordered text steps, nodes/edges or allowlisted SVG asset ID, node detail references | node/edge IDs unique; every edge endpoint and detail reference resolves; text alternative mandatory |
| TechStack | id, label, category, optional approved public URL | deduplicate centrally; allowlist URL schemes; no implied proficiency score |

Related profile fields: display name, selected headline, location/timezone, experience claim with as-of context, approved contact links and optional resume asset. Education stores degree, school, start/end month and approved honors; certifications remain absent until evidence exists.

Use separate **internal review evidence** and **public content**. Public `data/**` must contain only approved records; never merely filter private fields in React while leaving them in imported modules or generated JSON. A02 records publication decisions in its internal handoff, not in browser-shipped provenance objects.

Example review contract (not a deployable record):

```text
experience: netvirta, Jan 2022–Jul 2026, Software Engineer (Full Stack)
project: wardrobe-workflow, professional, parent netvirta
achievement: multi-stage retry handling; metric absent until approved
diagram: wardrobe-flow, text alternative required, simplified public reconstruction
```

## Server/client and state boundaries

| Concern | Boundary | Reason |
|---|---|---|
| Overview, education, approved facts | Server-rendered | Searchable content and small initial bundle |
| Metadata / Person JSON-LD | Server build | Canonical, stable and independent of theme |
| Theme | Small client provider/control | System preference and persisted choice; match verified next-themes setup |
| Selected experience and URL | Client InteractionRoot | Browser history without request-time data; read after hydration |
| Sheet / palette | Client coordinator | One modal owner, focus and scroll restoration |
| Explorer | Lazy client child | Avoid loading @xyflow/react on first page view |
| Simple diagrams | Static SVG + text | Cheaper than a graph engine for linear workflows |
| Code view | Client toggle + static approved snippet | No execution, remote fetch or syntax-highlighter bundle by default |

A03 freezes event names and exports: experience trigger dispatches a stable public ID; sheet consumes the same registry; QuickActionBar and palette share allowlisted action descriptors; DiagramContainer accepts a diagram record; CodeView accepts an approved snippet plus accessible label. A05 owns overlay transitions; A07 consumes its contract without rewriting it. A08 wires all exports together after B1.

## Hosting and static-generation decision — D7

**Preferred:** normal Next.js production build with static prerendering of `/` on an SSR-capable host. SSR capability does not require rendering this content on every request. Avoid request-time cookies, headers or server search-param dependencies in the overview; verify client URL-reading does not deopt static rendering in the frozen Next.js version.

**Pure export alternative:** only if the owner selects static-only hosting. A01 must verify export support for chosen features, image optimization constraints, metadata routes and query deep links. Use prebuilt static OG files and an approved image strategy. Do not assume runtime OG image generation, server actions, API handlers, ISR or server redirects exist in an export.

Use a static OG asset by default in either mode. Dynamic request-time OG personalization is outside v1. Record host-specific fallback, asset paths and trailing-slash/base-path behavior before setup; changing deployment mode later requires approval and a fresh build audit.
