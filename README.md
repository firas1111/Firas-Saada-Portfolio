# Firas Saada — portfolio

Source of my personal site: one page that shows the supplier integrations I build for METIS, a corporate travel booking platform in production (Hertz, Carbookr, Transavia, BSP Auto), each with its booking flow step by step.

It's a static site: no server code, no analytics, no cookies.

## Stack

- **Nuxt 4** (`app/` directory), **Vue 3**, **TypeScript** in strict mode
- **Tailwind CSS 4**, with the design tokens as CSS variables in `app/assets/css/main.css` (dark only for now; a light theme only has to redefine them)
- **@nuxt/fonts**: Space Grotesk, Inter and JetBrains Mono are downloaded at build time and served by the site itself, never by Google
- **@nuxtjs/i18n**: UI labels in `i18n/locales/`, English for now
- Static generation with `nuxt generate`, deployed to Vercel

## Where the content comes from

The components hold no copy. The text lives in a typed content file, `shared/content/en.ts` (model in `shared/types/portfolio.ts`), and every entry says where it comes from:

```ts
{ text: 'Passed Hertz production certification', sources: ['hertz.12'] }
```

The ids point into `cv_master.json`, the fact base behind my CV. Every fact in it was checked against git history (blame and commit logs) before going in. The file also holds personal data, so it is **not** part of this repository.

`npm run check:sources` runs `scripts/check-sources.ts`. It loads the content and `cv_master.json`, and fails when:

- a source id doesn't exist, or an entry with text has no sources;
- the text claims something from the fact base's "do not claim" list. Technologies are matched as whole words, so "Java" doesn't match "JavaScript", and work done by colleagues is listed too;
- a Transavia entry says "from scratch", an Everbloo entry mentions CI/CD, Docker or deployment, or Transavia or BSP Auto is presented as live;
- a "live" status doesn't cite a fact that says so;
- C# / .NET is mentioned outside the entries about the AeroGraph side project or my studies;
- a skill isn't in the matching group of the fact base;
- the text contains a percentage, a volume metric, a phone number or an email address other than mine.

The script reads `cv_master.json` from `CV_MASTER_PATH`, or from `../Postul/Auto-Apply/cv_master.json` next to this project. When the file isn't there (on a CI or deploy host, for example), it prints a warning and skips.

Because every entry is sourced, the same data can later ground an "Ask my AI twin" chat (planned: a Nuxt server route calling the Claude API) and cite its answers.

## Project structure

```
app/
  app.vue, pages/index.vue   page shell and section order
  components/sections/       one component per section (hero, work, experience…)
  components/ui/             integration card, numbered flow, terminal, pills, icons
  components/layout/         nav with the mobile menu, footer, "Say hello" button
  composables/               content for the current locale, SEO and JSON-LD, nav highlight
  plugins/reveal.ts          v-reveal: fade-in on scroll, off under prefers-reduced-motion
shared/
  types/portfolio.ts         content model
  content/en.ts              content, with sources
i18n/locales/en.json         UI labels
modules/seo-files.ts         writes robots.txt and sitemap.xml at build time
scripts/check-sources.ts     source check
scripts/render-images.ts     renders og.png and the favicons with a headless Chrome or Edge
public/                      CV (PDF), social image, favicons
```

## Run it

Node 22.18 or newer. Nuxt 4.6 officially asks for 22.22+ or 24.15+, so Node 24 LTS is the safe choice.

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # type check, source check, static build
npm run generate   # static site in .output/public
npm run images     # re-render og.png and the favicons after changing the name or title
```

To preview the static build: `npx serve .output/public`.

### Environment variables

| Variable | What it does |
| --- | --- |
| `NUXT_PUBLIC_SITE_URL` | Absolute URL of the site, used for the canonical link, Open Graph, JSON-LD, the sitemap and robots.txt. On Vercel it defaults to the project's production domain. |
| `NUXT_PUBLIC_SOURCE_URL` | Optional link to this repository in the footer. |
| `CV_MASTER_PATH` | Where the source check finds `cv_master.json`. |

## Deploy

### Vercel (free Hobby plan)

1. Push the repository to GitHub.
2. On vercel.com, go to **Add New… → Project** and import the repository. Vercel detects Nuxt, and `vercel.json` sets the build command to `npm run generate`. On Vercel, Nitro writes the static site in Vercel's own output format, so there is no output directory to set.
3. In **Settings → General**, check that the Node.js version is 24.x.
4. Deploy. The site is served at `https://<project>.vercel.app`, and the sitemap, canonical and Open Graph URLs follow it automatically. For a custom domain later, add it in Vercel, set `NUXT_PUBLIC_SITE_URL` to it and redeploy.
5. Check `/robots.txt` and `/sitemap.xml`, run PageSpeed Insights on the URL, and paste the URL into LinkedIn's Post Inspector to check the social card.

### Cloudflare Pages (fallback)

1. Go to **Workers & Pages → Create → Pages → Connect to Git** and pick the repository.
2. Framework preset: **None**. Build command: `npm run generate`. Build output directory: `dist`.
3. Add the environment variable `NUXT_PUBLIC_SITE_URL=https://<project>.pages.dev`. The Node version comes from `.node-version`.
4. Save and deploy.
