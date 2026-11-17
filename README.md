# Syed Ahmad Geelani — Portfolio

Personal portfolio of a full-stack developer: three browser-based projects (Framecheck, SYNESTHESIA,
PARALLEL), about, technical capabilities, experience (including Veltr Studio), education and contact.
It is a static site with no backend and no paid services.

**Stack:** React 19, TypeScript (strict), Vite, Tailwind CSS v4, GSAP + ScrollTrigger for scroll-linked
motion, Motion for component interactions, Lucide icons, Geist and Geist Mono (self-hosted). Routing is a
small History API router in `src/lib/router.tsx`.

## Run

Requires Node.js 20.19 or newer.

```bash
npm install
npm run dev
```

| Script                 | What it does                                                                    |
| ---------------------- | ------------------------------------------------------------------------------- |
| `npm run dev`          | Dev server                                                                      |
| `npm run build`        | Type-check, build to `dist/`, then run `scripts/postbuild.mjs`                  |
| `npm run preview`      | Serve the production build locally                                              |
| `npm run typecheck`    | `tsc -b`                                                                        |
| `npm run lint`         | ESLint                                                                          |
| `npm run format:check` | Prettier check                                                                  |
| `npm run images`       | Rebuild the responsive WebP files in `public/img` from the PNGs in `assets-src` |

## Deploy to Netlify

The repository includes `netlify.toml` (build command, publish directory, cache headers and a
single-page-app fallback). Connect the repository to Netlify, or drag the `dist/` folder after
`npm run build`. No environment variables are required.

`scripts/postbuild.mjs` writes a static HTML entry for each case study (`/projects/<slug>/`) with its own
title and description, and fills in the canonical URL, Open Graph URLs, `sitemap.xml` and the sitemap line
of `robots.txt` **only when the real site URL is known**. Netlify provides it as `URL` during a build; for
another host set `SITE_URL=https://your-domain` before `npm run build`. Without it those tags are left out
rather than guessed.

## Structure

```
src/
  data/         Content: profile, projects and case studies, skills, experience, SEO text
  components/   Nav, Hero, About, Capabilities, Experience, Education, Contact, Footer, Button, icons
    projects/   The three showcases, the Framecheck compare slider, the PARALLEL branch diagram
  hooks/        useGsap (matchMedia-scoped GSAP), useReveal (IntersectionObserver reveals), useWhenViewed
  pages/        Home, HomeSections (lazy), CaseStudy
  lib/          GSAP setup, router, image helper, Motion features
  styles/       Design tokens and type scale
scripts/        images.mjs, brand.mjs (OG image, touch icon), postbuild.mjs
assets-src/     Source screenshots captured from the live projects
```

## Animation and performance

Native scrolling throughout (no smooth-scroll library). Motion is split by cost:

- **CSS only, no JavaScript on the critical path:** the nav and hero entrance (keyframes on opacity and
  transform) and every scroll reveal. One `IntersectionObserver` (`useReveal`) adds a class the first time an
  element nears the viewport, and a CSS transition does the rest. No scroll handlers, no measuring on scroll.
- **GSAP + ScrollTrigger, loaded with the below-the-fold chunk and only for work that is genuinely tied to
  scroll position:** the SYNESTHESIA stage (scale and parallax), the PARALLEL path drawing, the Experience
  timeline line and the Framecheck divider intro. Five ScrollTriggers on the home page, all `scrub: true`
  (no smoothing lag) and transform- or opacity-only. Everything runs inside `gsap.matchMedia()`, so it is
  reverted on unmount and skipped under `prefers-reduced-motion`.
- **Motion** handles hover and press feedback, the mobile menu, the segmented control, the world crossfade, the
  contact cards and the hero grid cursor. It is loaded through `LazyMotion`.
- They never animate the same property of the same element.

Other decisions that matter for smoothness: no `backdrop-filter` on the sticky nav, the Framecheck comparison
moves transforms instead of repainting a clip-path, images are armed and decoded about a screen before they
are needed (and secondary previews only after they have been in view for a moment), the ambient drift runs only
while the stage is on screen, and `will-change` is applied only to the SYNESTHESIA stage while it is near the
viewport.

## Content and assets

- Project descriptions come from each repository's README and dependency manifest, and the three live
  apps were opened to confirm behaviour. Case studies include the limits the READMEs state.
- All project imagery is captured from the live applications. The Framecheck slider uses the app's own
  bundled sample images, and the figures shown in its differences view (1.33%, 13,651 of 1,024,000 pixels)
  are the app's own output for that sample at its default threshold.
- The Veltr Studio preview is a screenshot of the live veltr.agency homepage.
- There is no portrait and no résumé download. Add a corrected résumé to `public/` and link it from the
  navigation when one is ready.
