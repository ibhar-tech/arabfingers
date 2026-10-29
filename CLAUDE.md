# Arab Fingers — notes for Claude

## Git workflow
- Commit and push finished work directly to `main`. Do not open pull requests.
- `main` deploys straight to production (Cloudflare Workers Builds), so before every push run and pass:
  `npm run lint`, `npm run typecheck`, `npm test`, `npm run knip`, and `npm run build` when the change touches routes, config or dependencies.
- After pushing, check that the Workers Build and the `e2e` job pass on that commit. If either fails, fix it straight away.
- Never deploy with Wrangler from a local folder without committing and pushing first; production must always match `main`.

## Conventions
- Arabic copy uses Latin digits ("الـ28"), following `main` since Oct 2026.
- Counts and lists that appear in copy (worksheet pages, letters, packs) come from the data modules in `lib/`, never hard-coded numbers.
- SEO decisions and their Search Console evidence live in `docs/SEO-GROWTH-PLAN-2026-10.md`.

## Working notes
- Current status and open items: `docs/SEO-GROWTH-PLAN-2026-10.md` §7 (progress log). Update it when you ship something.
- Worksheet PDFs: `node scripts/build-worksheets.mjs --only <pack-id>[,<pack-id>]` rebuilds just those packs plus the complete workbook; a full run rewrites every PDF, so avoid it unless the shared layout changed. Chrome needs **Noto Naskh Arabic** installed as a system font (TTF, not WOFF — Chrome ignores WOFF), or the Arabic falls back to another face; check with `pdffonts` that NotoNaskhArabic is embedded. After a rebuild, look at the pages (`pdftoppm -png`) before committing.
- New pack checklist: data in `lib/worksheets.ts` (bump the bundle's `pages`), builder + `SETS` entry in the script, landing copy in `lib/worksheetPages.ts`, date in `lib/contentDates.ts`; sitemap, llms.txt and the hub pick it up from the data.
- Grade pages (`lib/gradePages.ts`) share `/printables/[slug]` with packs; slugs must not collide (tested).
- `middleware.ts` stays as is (edge); do not rename to `proxy.ts` while OpenNext marks Node proxies experimental on Workers.
- Live checks after a deploy: `curl -sI https://www.arabfingers.site/en` → `x-nextjs-cache: HIT`; GitHub check runs at `https://api.github.com/repos/ibhar-tech/arabfingers/commits/<sha>/check-runs`. A Workers Builds failure that says "internal error" during "Initializing build environment" is Cloudflare's — retry, don't change code.
