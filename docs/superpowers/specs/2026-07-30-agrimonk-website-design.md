# Agri Monk India Website — Design

## Overview

Build out the Agri Monk India marketing site on top of the existing Create React App
scaffold. Two pages: a founder/consulting-focused **Home** page and a **Courses**
listing page. Styling moves from CRA's default CSS to Tailwind CSS.

## Source of truth

**The two mockup screenshots in `assets/` are the sole source of truth** for
layout, section content, copy, and visual proportions:

- `assets/WhatsApp Image 2026-07-30 at 8.44.40 PM (1).jpeg` — the founder/consulting
  design → drives the **Home** page.
- `assets/WhatsApp Image 2026-07-30 at 8.44.40 PM.jpeg` — the course-grid design →
  drives the **Courses** page.

Any previously-referenced HTML/CSS snippet is **not** used as a reference for this
build — where anything in this spec differs from that earlier snippet, the image
wins. Exact color hex values aren't derivable from a screenshot, so the theme below
uses close-match hex values sampled from the images' green palette, adjusted for
accessible contrast.

## Goals

- Replace the CRA boilerplate `App.js` with a real two-page site matching the
  mockup images.
- Add an "Explore Courses" button next to "Book Consultation" (user request,
  not present in the original mockup) linking to the Courses page.
- Keep everything static (no backend, no CMS) — this is a content/marketing site.

## Non-goals

- No pages for About, Modern Agriculture, Resources, Contact as standalone
  routes — About/Services/Contact are same-page anchors on Home; Modern
  Agriculture and Resources are dropped from the nav entirely (not shown in the
  build, despite appearing in the mockup's nav) per user decision.
- No CMS-driven or fetched content; all copy/data is hardcoded in JS, transcribed
  from the mockup images.
- No real backend integration for "Book Consultation," "Contact Us," or newsletter
  signup — visual placeholders only for this round.

## Tech stack

- **Create React App** (existing, unchanged) + **craco** to enable Tailwind's
  PostCSS pipeline (CRA doesn't support Tailwind v3 config out of the box without
  ejecting).
- **Tailwind CSS v3** for all styling. No shadcn/ui or other component library.
- **react-router-dom** for the two routes (`/`, `/courses`).
- **Poppins** font via Google Fonts `<link>` in `public/index.html` — the mockup's
  headings show a bold, slightly rounded geometric sans consistent with Poppins.
- No animation library — scroll-reveal and hover effects via a small custom
  `useInView` hook (IntersectionObserver) plus Tailwind transition utilities.

## Theme (Tailwind config extension)

Sampled from the mockup images' green palette:

- `primary` (deep forest green — buttons, nav "Book Consultation", dark bands): `#1d5c2f`
- `primary-dark` (hover state): `#143f21`
- `accent` (mid green — headline highlight words like "Cool", "changing"): `#2e7d32`
- `founder-bg` (near-black green — the dark "Who We Work With" band and CTA
  background seen in the image): `#0f1f12`
- `page-bg` (off-white page background): `#f8faf7`
- `ink` (footer background, near-black): `#111111`

Font family: Poppins throughout — display headings at 700/800 weight, body copy
at 400, small uppercase eyebrow labels ("ABOUT AGRI MONK", "WHAT WE DO") at 600
with wide letter-spacing, matching the mockup's type hierarchy.

Breakpoints: nav collapses to a hamburger below `lg` (992px); multi-column grids
(stats, about cards, services, work-with cards, CTA icons) collapse to 2 then 1
column on mobile, matching the mockup's own mobile-first companion frame (image 3
in `assets/`, showing the stacked single-column mobile layout).

## Routing & shared layout

- `/` → `Home`
- `/courses` → `Courses`
- Both pages share a `Navbar` and `Footer` component, rendered via a top-level
  `Layout` wrapper in `App.js`.

### Navbar

- Logo: "AGRI MONK INDIA" wordmark + small tagline "We Make Agriculture Cool."
  underneath, matching the mockup's logo lockup.
- Links: Home, About, Services, Contact, Courses. (Modern Agriculture and
  Resources, though present in the mockup's nav, are dropped per user decision.)
  - **Home** → `Link to="/"`.
  - **Courses** → `Link to="/courses"`.
  - **About / Services / Contact** → point at `/#about`, `/#services`,
    `/#contact`. On Home, a `useEffect` watches `location.hash` and
    smooth-scrolls to the matching section id whenever it changes (including on
    initial load with a hash already present). This makes the links work both
    in-page on Home and when navigating from the Courses page.
- Buttons: "Book Consultation" (filled primary) — from the mockup — plus
  "Explore Courses" (outline style, `Link to="/courses"`) added alongside it per
  user request.
- Mobile: nav links collapse behind a hamburger toggle below `lg`.

### Footer

Multi-column layout matching the mockup: brand blurb + tagline, Quick Links
(Home/About/Services/Modern Agriculture/Resources/Contact — dummy for the two
dropped items), Our Services list, Contact Us (email, location, WhatsApp
placeholder link), on a near-black (`ink`) background with a light-green
"We make agriculture cool." sign-off line, matching the mockup's footer.

### Button component

Two variants: `primary` (filled `primary` green, white text, hover →
`primary-dark`) and `outline` (green border/text, transparent bg), matching the
mockup's two button styles. Both get a subtle hover transition (scale/darken).

## Home page (`/`)

Sections, top to bottom, transcribed directly from the founder mockup image, ids
used for anchor scrolling in parens:

1. **Hero** — eyebrow-free heading "We Make **Agriculture Cool.**", subtext
   ("New-age agriculture consulting for corporate professionals, entrepreneurs,
   engineers and anyone who wants to enter farming and build profitable
   agricultural ventures."), two buttons ("Book Consultation", "Explore
   Agriculture" — relabeled "Explore Courses" per user request, linking to
   `/courses`), a small social-proof row ("132K+ Community Across India" with
   avatar stack), and a hero photo of a person standing arms-crossed in a
   greenhouse, matching the mockup's hero composition.
2. **Stats strip** — 4 stat boxes directly below the hero, on a white card:
   "132K+ Followers", "2.2M+ Monthly Views", "Modern Farming Focus" (Hydroponics
   · Mushroom Farming · Agribusiness), "New Age Agriculture" (For professionals,
   entrepreneurs & beginners) — matches the mockup's stats row exactly.
3. **About** (`id="about"`) — eyebrow "ABOUT AGRI MONK", heading "Agriculture is
   changing. **So are we.**", 3 paragraphs of body copy describing Agri Monk as a
   new-age agriculture consulting company (paraphrased from the mockup's visible
   text), a highlighted pull-line ("Because agriculture today is not just
   farming. It is business. It is innovation. It is opportunity."), and a 2x2
   image grid captioned **Modern Techniques / Profitable Opportunities / Expert
   Guidance / Sustainable Future** — matching the mockup's card labels exactly
   (not the generic Hydroponics/Mushroom/etc. labels used in an earlier internal
   draft).
4. **Services** (`id="services"`) — eyebrow "WHAT WE DO", heading "Our
   Services", 6 service items in a row/grid: Agriculture Consulting, Farm Setup
   Assistance, Agribusiness Guidance, Agriculture Learning, Agri Brand
   Promotions, Startup Support — each with a small icon and one-line
   description, matching the mockup's 6-item services row exactly.
5. **Who We Work With** — dark (`founder-bg`) band, eyebrow "WHO WE WORK WITH"
   in light green, heading "Empowering People From Different Backgrounds", 4
   audience cards: Corporate Professionals, Engineers & IT Professionals,
   Entrepreneurs & Startups, Existing Farmers & Youngsters — each with a small
   icon, on the dark background, matching the mockup exactly. (Newly added to
   the build per user confirmation — not present in an earlier draft of this
   spec.)
6. **Founder** — eyebrow "FOUNDER", heading "Meet Monish Gowda", subheading
   "Agripreneur | Agriculture Consultant | Business Strategist", founder photo
   (suited, arms-crossed), bio paragraphs (background in agribusiness management
   from ICAR-NAARM, industry experience at DCM Shriram Ltd and ITC Limited,
   combining business strategy with agriculture), a pull-quote ("Make
   agriculture exciting, practical and profitable for the next generation."),
   and a credentials list with icons: PGDM – Agri Business (ICAR-NAARM), PPO
   Holder (DCM Shriram Ltd), FLAME Student (Gold Award), Best Student Award
   (NAARM), Entrepreneurship Award Recognition, Founder (FITMONK) — matching the
   mockup's fuller founder section exactly (not the shorter 2-paragraph version
   from an earlier draft).
7. **CTA** (`id="contact"`) — centered heading "Ready to Explore **Modern
   Agriculture?**", supporting copy, a 4-icon row (Expert Guidance, Practical
   Solutions, Profitable Opportunities, Long-term Support), and two buttons
   ("Get Consultation", "Contact Us") on the dark `founder-bg` background,
   matching the mockup's closing section exactly. Acts as the anchor target for
   the "Contact" nav link.
8. **Footer** (shared component).

All section entrances (About, Services, Who We Work With, Founder, CTA) use the
scroll-reveal `useInView` treatment: fade + slight slide-up when the section
enters the viewport, once, on first scroll into view. Stat numbers count up from
zero on reveal; eyebrow labels grow a short underline "stem" on reveal — the
signature motion touch agreed with the user, layered on top of the image's
static design.

## Courses page (`/courses`)

Full replica of the course-grid mockup image, top to bottom:

1. **Page header** — "Our Popular Courses" heading + supporting line ("Learn
   in-demand agricultural skills from basics to advanced level.").
2. **Course grid** — 5 cards: Mushroom Farming, Hydroponics Farming, Organic
   Farming, Terrace Gardening, Agribusiness Startup. Each card: image, small
   category icon badge, title, one-line description, "View Course →"
   placeholder link — matching the mockup's 5-card row.
3. **"Why Choose Agri Monk?" block** — heading + 4-point checklist (Founded by
   ICAR-NAARM Alumnus, 100,000+ Students & Growing, Practical Training &
   Real-World Exposure, Lifetime Access & Community Support, Helping Farmers
   Become Agripreneurs) plus a stats card (100K+ Happy Students, 250+ Expert
   Videos, 35+ Courses, 12+ States Reached) and a "Know Our Story" button —
   matching the mockup's "About Agri Monk" side-by-side block.
4. **Trust badges row** — 4 badges on a dark green strip: ICAR-NAARM Alumnus,
   Awarded by Govt. of India, Featured in Top Agri Media, Trusted by Farmers
   Across India — matching the mockup.
5. **Testimonials** — heading "What Our Learners Say", 3 cards: star rating,
   quote, avatar + name/role, matching the mockup's 3 testimonial cards.
6. **Blog preview** — heading "Agri Insights & Knowledge", 4 cards: image,
   category tag, date, title, "Read More →" placeholder link, matching the
   mockup's 4 blog cards.
7. **Newsletter signup** — heading "Stay Updated with Agri Monk", supporting
   line, email input (uncontrolled, no submit handler — visual placeholder),
   "Subscribe" button (no-op) — matching the mockup's newsletter band.
8. **Footer** (shared component).

Same scroll-reveal treatment applied to the grid, stats, testimonials, and blog
sections; stat numbers count up on reveal.

## Data

All content lives as local JS arrays/objects colocated with the page or in a
small `src/data/` folder (e.g. `courses.js`, `services.js`, `testimonials.js`,
`blogPosts.js`, `workWithCards.js`, `founderCredentials.js`) so each section maps
over an array rather than hardcoding repeated JSX blocks. Copy is transcribed
from the mockup images as closely as legible; where exact wording isn't legible
in the screenshot, copy is paraphrased to match the visible meaning and tone.

## Images

The mockup images don't provide usable source photo files (they're phone
screenshots of a rendered design), so all photos are sourced from Unsplash,
matching each slot's subject as shown in the mockup. URLs verified reachable
(HTTP 200) during design:

- Hero (person in greenhouse, arms crossed): `photo-1523741543316-beb7fc7023d8`
- About grid (Modern Techniques / Profitable Opportunities / Expert Guidance /
  Sustainable Future): `photo-1584589167171-541ce45f1eea`,
  `photo-1500651230702-0e2d8a49d4ad`, `photo-1464226184884-fa280b87c399`,
  `photo-1592419044706-39796d40f98c`
- Founder photo (suited, arms crossed): `photo-1500648767791-00dcc994a43e`
- Course thumbnails: mushroom `photo-1504674900247-0877df9cc836`, hydroponics
  `photo-1584589167171-541ce45f1eea`, organic farming
  `photo-1500651230702-0e2d8a49d4ad`, terrace garden
  `photo-1592419044706-39796d40f98c`, agribusiness `photo-1625246333195-78d9c38ad449`
- Blog images: vegetable farming `photo-1592841200221-a6898f307baa`,
  hydroponics-vs-soil `photo-1622383563227-04401ab4e5ea`, oyster mushroom
  `photo-1611591437281-460bfbe1220a`, organic soil
  `photo-1416879595882-3373a0480b5b`
- Testimonial avatars: `photo-1507003211169-0a1dd7228f2d`,
  `photo-1494790108377-be9c29b29330`, `photo-1500648767791-00dcc994a43e`

No local image assets need to be sourced or downloaded — all used directly as
remote `src` URLs.

## Animations (minimal, dependency-free)

- Custom `useInView` hook wrapping `IntersectionObserver`, returning a boolean
  once an element enters the viewport (fires once).
- Sections apply `opacity-0 translate-y-4` → `opacity-100 translate-y-0` via
  Tailwind `transition` classes toggled by the hook's boolean.
- Stat numbers animate counting up from 0 to their target value on reveal.
- Eyebrow labels grow a short underline "stem" from 0 to full width on reveal.
- Cards (services, work-with, courses, blog, testimonials) get a hover lift
  (`hover:-translate-y-2 transition-transform`).
- Buttons get a subtle hover scale/darken transition.
- Hero content fades in on mount (above the fold, no scroll trigger needed).

## Testing

- Keep CRA's existing smoke-test pattern (`App.test.js`): one test per page
  confirming it renders without crashing and a key heading is present (e.g. Home
  renders "We Make Agriculture Cool.", Courses renders "Our Popular Courses").
- No broader test suite — this is a static marketing site, not logic-heavy.

## Error handling

Minimal by design — no forms submit anywhere yet. "Book Consultation", "Get
Consultation", "Contact Us", "Know Our Story", "View Course", "Read More", and
"Subscribe" are all visual placeholders (`href="#"` or no-op handlers) for this
round, to be wired to real destinations in a future round once those decisions
are made.
