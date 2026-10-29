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
