# NovaLink Innovations — website

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide

```bash
npm install
npm run dev              # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/                       / about services projects/[slug] careers contact privacy terms
  world-dots.svg/          static dotted-world image for the map (built from dotted-map)
  api/contact, api/apply   server-validated form endpoints (delivery not wired yet)
  sitemap.ts robots.ts opengraph-image.tsx icon.png
components/
  layout/                  Navbar, MobileMenu, Footer
  sections/                Hero/HeroBackdrop, LogoMarquee, WhoWeAre, Metrics, GlobalPresence,
                           Services/ServiceRow, SelectedWork/ProjectFeature, ProcessTimeline, TechList,
                           Testimonials, CTASection, PageHero, ContactForm, ApplicationForm
  ui/                      Button (magnetic + sheen), EyebrowLabel, SectionHeader, AnimatedHeading,
                           RotatingWord, Reveal, Stagger, Parallax, DrawLine, ImageReveal,
                           MetricCounter, ScrollProgress, ArrowLink, Field, Logo
  visuals/                 HeroSystem (SVG, cursor probe), WorldMap(+Interactive), ProjectMedia,
                           InfrastructureArt
data/                      site, services, projects, process, testimonials, careers  ← all content
lib/                       seo (meta + JSON-LD), contact (shared validation), utils
public/brand/              official logo + light variant for navy backgrounds
```

Design tokens (colour, type scale, radius, shadow, motion, z-index) are at the top of
`app/globals.css`. Small blue text uses `blue-ink` (#0F5BE6) to pass WCAG AA; buttons,
graphics and large headings use the brand blue #176BFF.

## World map

Locations live in `data/site.ts → presence` (Melbourne is the main hub). Each entry has a
`label` side so labels never overlap; on phones the map crops to the UK → Australia region.

## Work page

The standalone Work index was removed. Projects are shown in full in the homepage
“Selected work” section; case studies stay at `/projects/<slug>`. `/projects` and `/work`
308-redirect to `/#work`.

## Adding assets

- **Project screenshots** → `public/work/<slug>/…`, then set `image` (and optional `gallery`)
  on the project in `data/projects.ts`. They're served as AVIF/WebP via next/image.
  Until then a labelled “Imagery coming soon” placeholder renders — never a fake screenshot.
- **Client logos** → `public/clients/…` (trimmed PNGs), listed in `data/site.ts → clients`.
  Optical sizing balances wide and compact marks; `scale` fine-tunes one logo. Logos also
  badge matching testimonials automatically.
- **Logo** → the supplied PNG is 221×48; an SVG version would be sharper on retina screens.

## Content to confirm before launch

- [ ] **Project mapping** (from the supplied mockups): Orange HRM screens → “HR Management System”;
      HRPro AI → “IOM HR System”; dark paid-ads/personal-brand site → “News Marketing Agency Website”.
      New case studies added from the imagery: DelaXchange, Active Care, Money Transfer App,
      Bravio, Active. Confirm names, clients and that each may be shown publicly.
- [ ] Problem/solution copy describes what each screen shows — add real results, years and stacks.
- [ ] Personal details in two screenshots were pixelated; `dela 7 .png` (shows a real name and
      email) was deliberately not published.
- [ ] Unused mockups from the archive: `arketein ehp833`, `black maraketi73`, `black marke093`,
      `marketiing e739`, `marketing 7383 ` (alt), `marketiong 33`, `maraketong` duplicates.
- [ ] Spelling of “Zendirib” (the live site says “Zendirib Morters”).
- [ ] Technology list (`data/site.ts`) — remove anything the team doesn’t actively ship with.
- [ ] Team section on About is omitted until real team details/photos are supplied.
- [ ] Privacy Policy and Terms text.
- [ ] Wire `app/api/contact` and `app/api/apply` to email/ATS server-side (env vars only).
- [ ] Set `NEXT_PUBLIC_SITE_URL` in production.

## SEO

Per-page titles/descriptions, canonical URLs, OpenGraph/Twitter, sitemap, robots, and JSON-LD
(Organization, Service, BreadcrumbList, CreativeWork). Old static-site URLs (`*.html`) 308-redirect
to their new routes in `next.config.ts`.

## Quality (production build, Lighthouse 12)

Home: mobile 99 / 100 / 100 / 100, desktop 100 / 100 / 100 / 100 (Perf / A11y / BP / SEO).
All inner pages: Performance 94–96 mobile, 100 desktop; Accessibility, Best Practices, SEO 100.
CLS 0. Reduced motion is respected throughout.
