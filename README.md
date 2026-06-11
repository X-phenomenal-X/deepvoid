# DeepVoid v3

Live data from humanity's deepest space missions.

## What's in v3
- **Live solar system orrery** (`/solar-system` + homepage) — all 8 planet positions computed
  in the browser from real Keplerian orbital elements (JPL approximation, valid 1800–2050).
  Play/pause time travel at 4 speeds.
- **Mobile navigation** — hamburger menu, full touch support.
- **Privacy Policy + About pages** — required for Google AdSense approval.
- **SEO pack** — sitemap.xml, robots.txt, JSON-LD article markup, OpenGraph metadata.
- **Page transitions**, branded 404, 4 SEO articles.
- Everything from v1/v2: Voyager odometers, Scale of the Void, starfield, launches, ISS, APOD, exoplanets.

## Run locally
```
npm install
npm run dev
```
Open http://localhost:3000

## Deploy (fresh repo — recommended)
1. On GitHub create a repo (or reuse the old one).
2. Upload **the contents of this folder** to the repo ROOT — you should see `package.json`
   directly on the repo's main page, not inside a subfolder.
3. In Vercel: import the repo (or if reusing the project, set **Settings → Build → Root
   Directory** to blank/`./` and **Framework Preset** to Next.js), then deploy.
4. Add environment variable `NASA_API_KEY` (free at https://api.nasa.gov).

## Update the live site later
Drag changed files into the repo root via GitHub → Add file → Upload files → Commit.
Vercel rebuilds automatically.

## Monetization checklist
- [ ] Newsletter: paste your Beehiiv/ConvertKit form action into `components/NewsletterSignup.js`
- [ ] AdSense: apply once you have ~15+ articles and steady traffic; paste ad unit code into
      `components/AdSlot.js`. Privacy page is already in place (a hard AdSense requirement).
- [ ] Amazon Associates: add product links inside articles in `content/posts/`.

## Publishing an article
Drop a `.md` file into `content/posts/` with this header:
```
---
title: "Your title"
description: "One-sentence summary (also used by Google)."
date: "2026-06-11"
---
```
It appears on /blog and in the sitemap automatically.

## Yearly maintenance (optional)
Update `epochKm`/`epochMs` in `lib/voyager.js` from NASA's Voyager mission status page
to re-anchor the odometers.
