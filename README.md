# Arab Fingers · عرب فنجرز

A free, bilingual (English/Arabic) Arabic-alphabet learning site for children aged 1–6 and their parents: [www.arabfingers.site](https://www.arabfingers.site).

- **For kids:** a keyboard/touch letter game with recorded pronunciation, finger-tracing game, audio quiz, colouring canvas
- **For parents:** 53 pages of generated printable worksheet PDFs, 14 in-depth bilingual learning guides, a glossary, and four narrated interactive science lessons
- **By design:** no accounts, no backend, no profiling — everything runs in the browser or from the CDN

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| i18n | next-intl (`/en`, `/ar` locale-prefix routing) |
| Client state | Zustand (parent settings persisted to localStorage; play session state is memory-only) |
| Media | Howler.js over pre-recorded MP3s (ElevenLabs/Google/Gemini generation scripts) |
| 3D | three.js + React Three Fiber (lazy-loaded on `/play` only) |
| Tests | Vitest + happy-dom (unit, `tests/*.test.ts`) · Playwright (browser smoke, `tests/e2e/`) |
| Hosting | Cloudflare Workers via OpenNext |

## Getting started

```bash
npm install        # Node >= 22 (native TS stripping is used by build scripts)
npm run dev        # http://localhost:3000 → redirects into /en

npm run lint       # ESLint (next/core-web-vitals + next/typescript)
npm run typecheck  # tsc --noEmit
npm test           # vitest unit suite (tests/*.test.ts)
npm run knip       # unused files / exports / dependencies gate
npm run build && npm run test:e2e   # browser smoke over the production build (Playwright)
```

CI (`.github/workflows/ci.yml`) runs lint → typecheck → unit tests → knip on every push/PR, then a second job builds the site and runs the Playwright smoke suite (core routes × both locales, play-stage interaction, 404 flows, security headers).

## Content pipeline

Content lives as typed TypeScript modules under `lib/`, not a CMS:

- `lib/arabicMap.ts` — the 28 letters, aliases, keyboard-layout indexes
- `lib/letterGuide.ts` — per-letter teaching content (both languages)
- `lib/worksheets.ts` — worksheet pack data, shared by the app **and** the PDF generator

Generated assets are committed to `public/`:

```bash
npm run worksheets   # scripts/build-worksheets.mjs → PDFs + preview PNGs (headless Chrome)
npm run icons        # scripts/build-icons.mjs     → PNG icon sizes from public/icon.svg
```

Audio generation scripts (`scripts/generate-voiceovers-*.js`, `scripts/generate-sfx-eleven.js`) call external TTS APIs and need API keys; they only matter when regenerating narration, not for day-to-day development.

## Architecture in one paragraph

Every page is statically prerendered for both locales at build time (`generateStaticParams`); there is no server-side data layer. All interactivity lives in client components backed by committed MP3/PDF assets. `store/useAppStore.ts` holds parent settings (persisted, partialized) plus per-session play state; `lib/progress.ts` owns star progress in localStorage. `middleware.ts` enforces the canonical host + HSTS and sets security headers on every page response. `app/sitemap.ts` and `app/feed.xml` derive article dates from `lib/contentDates.ts`. Deployment target is Cloudflare Workers through `@opennextjs/cloudflare`.

## Deployment

```bash
npm run deploy    # build (next build + opennextjs-cloudflare) and deploy via wrangler
npm run preview   # local Workers preview of the production build
```

`wrangler.jsonc` defines static assets, the image-optimization binding, and the self-reference service binding used for caching. Deploys require Cloudflare credentials (`wrangler login` or `CLOUDFLARE_API_TOKEN`).

## Conventions worth knowing

- **Comments carry "why", with measurements.** Many decisions cite Search Console data, bundle sizes, or failure post-mortems. Read them before changing behaviour they describe.
- **Both languages everywhere users see copy.** Page-level copy sits inline as `copy = { en, ar }` objects; UI chrome uses `messages/{en,ar}.json` (key parity enforced by `tests/messages.test.ts`).
- **Pure logic stays in `lib/`** so it can be unit-tested without a DOM (`tests/`).
