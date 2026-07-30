# Agri Monk India Website — Design

## Overview

Build out the Agri Monk India marketing site on top of the existing Create React App
scaffold. Two pages: a founder/consulting-focused **Home** page and a **Courses**
listing page, both drawn from reference mockups in `assets/` and a hand-written
reference HTML/CSS file provided by the user. Styling moves from CRA's default CSS
to Tailwind CSS.

## Goals

- Replace the CRA boilerplate `App.js` with a real two-page site.
- Match the "founder" mockup (`assets/WhatsApp Image ... (1).jpeg`) for Home and the
  "course grid" mockup (`assets/WhatsApp Image ... .jpeg`) for the Courses page.
- Reuse the structure/copy from the user's pasted reference HTML as the source of
  truth for Home, adapted into React + Tailwind.
- Keep everything static (no backend, no CMS) — this is a content/marketing site.

## Non-goals

- No real backend integration for "Book Consultation" or newsletter signup (visual
  placeholders only for this round).
- No pages for About, Modern Agriculture, Resources, Contact as standalone routes —
  those are either same-page anchors (About, Services, Contact) or dropped from nav
  entirely (Modern Agriculture, Resources are not included, per user decision to
  drop rather than keep as dummy).
- No CMS-driven or fetched content; all copy/data is hardcoded in JS.

## Tech stack

- **Create React App** (existing, unchanged) + **craco** to enable Tailwind's
  PostCSS pipeline (CRA doesn't support Tailwind v3 config out of the box without
  ejecting or using an overlay like craco).
- **Tailwind CSS v3** for all styling. No shadcn/ui or other component library —
  the site is a small set of heavily custom-designed marketing sections, not an
  app UI, so utility classes plus small custom components are enough.
- **react-router-dom** for the two routes (`/`, `/courses`).
- **Poppins** font via Google Fonts `<link>` in `public/index.html`, matching the
  reference HTML.
- No new animation library — scroll-reveal and hover effects are implemented with
  a small custom `useInView` hook (IntersectionObserver) plus Tailwind transition
  utilities.

## Theme (Tailwind config extension)

Colors taken directly from the user's reference HTML:

- `primary` (dark green): `#1d5c2f`
- `primary-dark` (hover): `#133d20`
- `accent` (mid green): `#2e7d32`
- `accent-light` (light green): `#7cb342`
- `founder-bg` (near-black green): `#0f1f12`
- `page-bg`: `#f8faf7`
- Footer background: `#111`

Font family: Poppins (default sans, replacing CRA's system font stack).

Breakpoints follow the reference CSS: nav collapses to a hamburger below `lg`
(992px), grids collapse to 1–2 columns below `lg`/`sm` as in the reference
`@media` blocks.

## Routing & shared layout

- `/` → `Home`
- `/courses` → `Courses`
- Both pages share a `Navbar` and `Footer` component, rendered via a top-level
  `Layout` wrapper in `App.js`.

### Navbar

- Logo: "AGRI MONK INDIA" (green wordmark, matches reference).
- Links: Home, About, Services, Courses, Contact.
  - **Home** → `Link to="/"`.
  - **Courses** → `Link to="/courses"`.
  - **About / Services / Contact** → point at `/#about`, `/#services`, `/#contact`.
    On the Home page, a `useEffect` watches `location.hash` and smooth-scrolls to
    the matching section id whenever it changes (including on initial load with a
    hash already in the URL). This makes the links work both when already on Home
    (in-page scroll) and when navigating from the Courses page (route change to
    `/`, then scroll once mounted).
- Buttons: "Explore Courses" (outline style, `Link to="/courses"`) and
  "Book Consultation" (filled primary style, `href="#"` placeholder), matching the
  hero's two-button pattern and the user's request to add an Explore Courses
  button next to Book Consultation.
- Mobile: nav links collapse behind a hamburger toggle below `lg`, per reference
  CSS (`.nav-links { display:none }` at `max-width:992px`).

### Footer

Three-column grid: brand blurb, quick links (Home/About/Services/Courses), contact
info (email, location). Dark background (`#111`), matches reference footer.

### Button component

Two variants: `primary` (filled `primary` green, white text, hover → `primary-dark`)
and `outline` (green border/text, transparent bg). Both get a subtle hover
transition (scale/translate-y) as the "minimal animation" polish layer.

## Home page (`/`)

Sections, top to bottom, ids used for anchor scrolling in parens:

1. **Hero** — heading "We Make **Agriculture Cool.**", subtext, two buttons
   (Book Consultation / Explore Courses → `/courses`), hero image
   (`photo-1523741543316-beb7fc7023d8`, verified reachable). Fades in on load.
2. **Stats strip** — 4 stat boxes (132K+ community, 2.2M+ monthly reach, "Modern"
   hydroponics/mushroom/agribusiness, "New Age" agriculture) — white card
   overlapping hero bottom, per reference CSS `.stats`.
3. **About** (`id="about"`) — section title "ABOUT AGRI MONK", heading
   "Agriculture is changing. **So are we.**", 3 paragraphs of copy (from reference
   HTML) + a 2x2 image card grid (Hydroponics / Mushroom Farming / Modern Farming /
   Agribusiness), each card image from the verified Unsplash set.
4. **Services** (`id="services"`) — section title "OUR SERVICES", heading
   "How We Help You **Grow**", **6** service boxes (expanded from the reference
   HTML's 3, per user decision): Agriculture Consulting, Farm Setup Assistance,
   Agribusiness Guidance, Agriculture Learning, Agri Brand Promotions, Startup
   Support. Grid collapses to 1 column on mobile. Cards lift slightly on hover.
5. **Founder** — dark section (`founder-bg`), founder photo + "Meet Monish Gowda"
   bio copy (2 paragraphs, from reference HTML) + "Learn More" button (placeholder
   link).
6. **CTA** (`id="contact"`) — centered heading "Ready To Explore Modern
   Agriculture?", supporting copy, "Get Consultation" button (placeholder). Acts as
   the anchor target for the "Contact" nav link since there's no separate contact
   form/section in this round.
7. **Footer** (shared component).

All section entrances (About, Services, Founder, CTA) use the scroll-reveal
`useInView` treatment: fade + slight slide-up when the section enters the
viewport, once, on first scroll into view.

## Courses page (`/courses`)

Full replica of the course-grid mockup, top to bottom:

1. **Page header** — "Our Popular Courses" heading + short supporting line
   ("Learn in-demand agricultural skills from basics to advanced level.").
2. **Course grid** — 5 cards: Mushroom Farming, Hydroponics Farming, Organic
   Farming, Terrace Gardening, Agribusiness Startup. Each card: image (from the
   verified Unsplash set), category icon/badge, title, one-line description,
   "View Course →" placeholder link. Cards hover-lift.
3. **Stats strip** — reused stat-box pattern: 100K+ Happy Students, 250+ Expert
   Videos, 35+ Courses, 12+ States Reached.
4. **Trust badges row** — 4 badges: ICAR-NAARM Alumnus, Awarded by Govt. of India,
   Featured in Top Agri Media, Trusted by Farmers Across India (icon + label,
   simple flex row, dark-green background strip per mockup).
5. **Testimonials** — 3 cards: star rating, quote, avatar + name/role. Avatars from
   the verified Unsplash portrait set.
6. **Blog preview** — 4 cards: image, category tag, date, title, "Read More →"
   placeholder link. Images from the verified Unsplash set (with the oyster
   mushroom blog image swapped to a working alternate ID after the original
   404'd).
7. **Newsletter signup** — heading, email input (uncontrolled, no submit handler
   yet — visual placeholder), "Subscribe" button (no-op).
8. **Footer** (shared component).

Same scroll-reveal treatment applied to the grid, stats, testimonials, and blog
sections.

## Data

All content lives as local JS arrays/objects colocated with the page or in a small
`src/data/` folder (e.g. `courses.js`, `services.js`, `testimonials.js`,
`blogPosts.js`) so each section maps over an array rather than hardcoding repeated
JSX blocks. This keeps adding a 6th course or a 4th testimonial a one-line data
change rather than a JSX edit.

## Images

All images are remote Unsplash URLs, verified reachable (HTTP 200) during design:

- Hero: `photo-1523741543316-beb7fc7023d8`
- About cards (Hydroponics / Mushroom Farming / Modern Farming / Agribusiness):
  the 4 URLs already present in the reference HTML's `.about-cards` block
  (`photo-1464226184884-fa280b87c399`, `photo-1518977676601-b53f82aba655`,
  `photo-1501004318641-b39e6451bec6`, `photo-1461354464878-ad92f492a5a0`) — used
  as-is, not re-verified separately since they ship already wired into the
  reference markup.
- Founder photo: `photo-1500648767791-00dcc994a43e`
- Course thumbnails: mushroom `photo-1504674900247-0877df9cc836`, hydroponics
  `photo-1584589167171-541ce45f1eea`, organic farming
  `photo-1500651230702-0e2d8a49d4ad`, terrace garden
  `photo-1592419044706-39796d40f98c`, agribusiness `photo-1625246333195-78d9c38ad449`
- Blog images: vegetable farming `photo-1592841200221-a6898f307baa`,
  hydroponics-vs-soil `photo-1622383563227-04401ab4e5ea`, oyster mushroom
  `photo-1611591437281-460bfbe1220a` (replacement after original 404'd), organic
  soil `photo-1416879595882-3373a0480b5b`
- Testimonial avatars: `photo-1507003211169-0a1dd7228f2d`,
  `photo-1494790108377-be9c29b29330`, `photo-1500648767791-00dcc994a43e`

No local image assets need to be sourced or downloaded — all used directly as
remote `src` URLs.

## Animations (minimal, dependency-free)

- Custom `useInView` hook wrapping `IntersectionObserver`, returning a boolean
  once an element enters the viewport (fires once, not on every scroll).
- Sections apply `opacity-0 translate-y-4` → `opacity-100 translate-y-0` via
  Tailwind `transition` classes toggled by the hook's boolean.
- Cards (services, courses, blog, testimonials) get a hover lift
  (`hover:-translate-y-2 transition-transform`) matching the reference CSS's
  `.service-box:hover { transform: translateY(-8px) }`.
- Buttons get a subtle hover scale/darken transition.
- Hero content fades in on mount (no scroll trigger needed, it's above the fold).

## Testing

- Keep CRA's existing smoke-test pattern (`App.test.js`): one test per page
  confirming it renders without crashing and a key heading is present (e.g. Home
  renders "We Make Agriculture Cool.", Courses renders "Our Popular Courses").
- No broader test suite — this is a static marketing site, not logic-heavy, so
  exhaustive testing isn't warranted.

## Error handling

Minimal by design — no forms submit anywhere yet. "Book Consultation",
"Get Consultation", "Learn More", "View Course", "Read More", and "Subscribe" are
all visual placeholders (`href="#"` or no-op handlers) for this round, to be wired
to real destinations (WhatsApp, contact form, backend) in a future round once
those decisions are made.
