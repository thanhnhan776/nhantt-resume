# A01 decision proposal: version and dependency matrix

Date: 2026-10-28
Status: **owner-approved candidate matrix; integration verification deferred to A03**
Owner: project owner
Scope: T01.2; no install or implementation

## Compatibility policy

The exact package set must be pinned in the implementation lockfile after owner approval and a clean install/build under A03's separately approved setup scope. Registry `latest` tags are observations, not vendor support guarantees, and may change. Declared peer ranges are necessary but not sufficient for an integrated compatibility claim. This matrix is a proposal, not proof of a working build.

| Layer | Proposed version / choice | Evidence and constraint |
|---|---|---|
| Runtime | Node 24 LTS | Next install docs require Node >=20.9; official Node release status identifies v24 as LTS and recommends Active/Maintenance LTS for production |
| Framework | Next.js 16.4.3 | npm latest metadata observed 2026-10-28; official release line 16.4. Next supports React 18.2 or React 19; Node floor above |
| UI runtime | React 19.3.1 + React DOM 19.3.1, matched | npm peer metadata: Next accepts React `^19.0.0`; React DOM 19.3.1 peers on React `^19.3.1`. Peer-range evidence only |
| Language | TypeScript stable 5.x, exact patch deferred to approved setup | Next install docs establish floor 5.1.0, not a documented upper bound; npm `latest` observed 7.0.2 but Next support/React declaration compatibility for TS 7 is not established. Do not choose TS 7 without further proof |
| Styling | Tailwind CSS 4.x + official Next/PostCSS integration | Official guide: `tailwindcss`, `@tailwindcss/postcss`, `postcss`; CSS-first `@import "tailwindcss"`. Pin exact plugin versions together during setup |
| Components | shadcn generated/copied source, **Radix base selected** | Owner selects Radix to match requested shadcn/Radix architecture. Other official shadcn base choices include Base UI and React Aria; these are alternative implementations, not “Radix variants.” Generated component source and primitive versions are recorded by A03 after approved CLI generation |
| Theme | next-themes 0.4.6 | npm latest metadata; React 19 within declared peer. Verify hydration behavior against official project README and runtime cold-load checks |
| Motion | framer-motion 14.7.1 candidate | npm latest metadata and React 18/19 peer. Current docs use Motion branding; verify package-name/API correspond before freeze. Honor reduced-motion preference |
| Icons | lucide-react 1.63.0 | npm latest metadata; React peer includes 19; named imports for tree-shaking |
| Interactive graph | @xyflow/react 12.12.0 candidate, lazy client-only | npm latest metadata and React peer >=17. Official docs recommend attention to SSR/SSG, performance and accessibility. Keep simple diagrams SVG |
| Graph primitive | Radix Dialog 1.3.1 candidate only, not locked | npm metadata has React 19 peer range; exact Sheet/Command generated source dependencies/version/license cannot be fixed without choosing registry variant and inspecting generated output |
| Command | shadcn Command variant TBD; do not add a second palette framework | Current shadcn docs are variant-specific; inspect generated source and transitive license notices after selection |
| Package manager | pnpm | Owner-approved; Next documents npm/pnpm/yarn/bun; pnpm 12.4.1 is present locally. No lockfile exists |
| Deployment adapter | None for static export; Cloudflare Pages static Next preset | Owner-approved. Do not add vinext/OpenNext for this static site; revisit only if server runtime features become necessary |

The npm versions above were observed at `https://registry.npmjs.org/<package>/latest` on 2026-10-28 and are mutable. Full registry URLs, official documentation links, and peer/license details are in the external evidence report listed below. They must be checked again when A03 actually sets up the project.

## Compatibility analysis and unresolved checks

- Next's published peer range and the React DOM peer metadata support the **React/React DOM peer pairing** above; this does not establish compatibility across build, CSS, generated primitives, runtime behavior, or a production build.
- Next documentation supports the proposed Node 24 LTS runtime and sets TypeScript minimum 5.1. Use a stable TS 5.x patch; exact patch and current support status must be reconfirmed at setup time.
- Tailwind v4 has an official Next integration guide; the specific PostCSS package/plugin patch versions must be pinned as one tested set.
- **Radix base decision: approved by owner.** A03 must select the official shadcn registry/version at setup and record generated component sources, exact primitive dependencies and licenses. Radix is one shadcn implementation base; Base UI and React Aria are alternatives. No further owner choice among Radix “variants” is needed unless an alternative registry/source is proposed.
- **Blocking integrated-matrix proof:** actual lockfile install, typecheck/build and test are A03 work under separately approved setup; A01 cannot claim a tested matrix.
- Graph component needs client isolation and lazy loading. Confirm its chosen Next dynamic-import boundary in A06/A08; a peer range does not guarantee static export behavior.
- Cloudflare Pages static export matches the described architecture: no request-time server handlers needed; use client-side query restoration and prebuilt OG/static images. Direct query loading and browser history need verification after deployment. No adapter is required.
- `framer-motion` is the requested package name while current vendor documentation is branded Motion. Confirm the selected package's actual API/version, React peer and reduced-motion behavior from the corresponding official docs.

## Licensing and source generation

Registry metadata lists permissive package licenses for candidates (MIT for Next/React/Tailwind/next-themes/framer-motion/@xyflow/Radix Dialog; ISC for lucide-react; Apache-2.0 for TypeScript). Verify exact package and transitive licenses from installed package notices at setup. shadcn copies generated source into the repository; preserve source notices and review every generated primitive's license. React Flow core is MIT; paid Pro examples/templates are separate and must not be copied without applicable rights. No licensing/legal approval is implied by these observations.

## Evidence sources (retrieved 2026-10-28)

Official documentation:
- Next install/runtime/package managers: https://nextjs.org/docs/app/getting-started/installation
- Next App Router server/client boundaries: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next export: https://nextjs.org/docs/app/guides/static-exports
- Next metadata/OG: https://nextjs.org/docs/app/getting-started/metadata-and-og-images and https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- Node release status: https://nodejs.org/en/about/previous-releases
- Tailwind Next guide: https://tailwindcss.com/docs/installation/framework-guides/nextjs
- shadcn Next setup/CLI/Sheet/Command: https://ui.shadcn.com/docs/installation/next ; https://ui.shadcn.com/docs/cli ; https://ui.shadcn.com/docs/components/base/sheet ; https://ui.shadcn.com/docs/components/base/command
- Radix Dialog accessibility: https://www.radix-ui.com/primitives/docs/components/dialog
- next-themes: https://github.com/pacocoursey/next-themes#readme
- Motion reduced motion: https://motion.dev/docs/react-accessibility
- Lucide tree-shaking: https://lucide.dev/guide/packages/lucide-react
- React Flow performance, SSR/SSG and accessibility: https://reactflow.dev/learn/advanced-use/performance ; https://reactflow.dev/learn/advanced-use/ssr-ssg-configuration ; https://reactflow.dev/learn/advanced-use/accessibility
- React Flow licensing: https://reactflow.dev/pro/pricing

Registry observations (metadata, not support documentation):
- https://registry.npmjs.org/next/latest
- https://registry.npmjs.org/react/latest
- https://registry.npmjs.org/react-dom/latest
- https://registry.npmjs.org/typescript/latest
- https://registry.npmjs.org/tailwindcss/latest
- https://registry.npmjs.org/next-themes/latest
- https://registry.npmjs.org/framer-motion/latest
- https://registry.npmjs.org/lucide-react/latest
- https://registry.npmjs.org/%40xyflow%2Freact/latest
- https://registry.npmjs.org/%40radix-ui%2Freact-dialog/latest

Detailed research and gaps: `../../.tmp/external-context/a01-docs/research.md` (temporary, read-only cache; do not copy it into public assets).

## Owner approval required

Owner accepted the candidate plans conditional on Cloudflare compatibility, selected pnpm and the shadcn Radix base, and accepted the contracts. Cloudflare Pages static export is officially supported for the described static page; exact generated shadcn dependencies and an integrated lockfile build remain A03 verification work. Do not claim the matrix has been build-verified before A03 evidence exists.
