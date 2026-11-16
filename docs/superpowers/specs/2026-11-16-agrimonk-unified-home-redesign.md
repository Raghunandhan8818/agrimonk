# Agri Monk India Website — Unified Home Redesign

## Overview

Supersedes the Home/Courses scope of `2026-07-30-agrimonk-website-design.md` and
resolves the open question left in `2026-07-30-agrimonk-visual-fidelity-fixes.md`
(gap #8). Rebuilds the site around **one long unified Home page** that merges
the original founder-focused Home content with the course-platform mockup
(`assets/WhatsApp Image 2026-07-30 at 8.44.40 PM.jpeg`, re-shared in chat as the
"AGRI MONK — Learn · Implement · Earn" screenshot), plus new copy from
`assets/content.txt`. `/courses` remains a separate, leaner full-catalog page.
Reusable infrastructure from the original build (`Button`, `RevealSection`,
`CountUp`, `useInView`, Tailwind theme, Poppins font, CRA + react-router-dom)
is kept as-is.

## Source of truth

- **Visual/layout reference:** the course-platform mockup image (dark
  announcement bar, "AGRI MONK — Learn · Implement · Earn" nav, "Join
  Community" button, floating hero badges, card-grid sections with icon
  badges) — drives nav/footer branding, hero composition, card styling, and
  which net-new sections exist (feature-icon row, trust badges, newsletter
  band).
- **Copy/content reference:** `assets/content.txt` — drives all section
  headings, body copy, and the exact set of cards/items in each section. Where
  the image and the copy doc disagree (e.g. hero heading, nav CTA label), the
  copy doc wins for text, the image wins for visual treatment — see per-section
  notes below.
- Both documents live in `assets/` already; no new mockup files are added.

## Goals

- One long-scroll Home page (`/`) carrying the full marketing narrative:
  hero → stats → about → why-choose-us → popular-courses preview → services →
  who-we-work-with → modern-agriculture → founder → trust badges →
  testimonials → blog preview → newsletter → CTA → footer.
- Rebrand nav/footer site-wide to the "AGRI MONK — Learn · Implement · Earn"
  identity from the mockup (top announcement bar, new link set, "Join
  Community" CTA).
- Close every confirmed gap in the visual-fidelity-fixes spec (icons
  everywhere, 3-column founder, floating hero elements, overlapping stats
  card, overlaid about-image captions, footer social icons) as part of this
  same pass, since the sections are being rebuilt anyway.
- Add `lucide-react` for icon badges across all card sections.
- Clean, mobile-first responsive layout: every new grid collapses sanely
  (3 → 2 → 1 columns), nav collapses to a hamburger, announcement bar and
  floating hero badges degrade gracefully on narrow screens.
- Verify the result with Playwright screenshots (desktop + ~375px mobile) as
  a one-off check, not a permanent test suite.

## Non-goals

- No photoreal image generation in this session — see **Images** below.
- No new standalone routes beyond the existing `/` and `/courses`. Nav links
  that don't correspond to a real page (Blog, Shop, Gallery) point at
  same-page anchors or `#` placeholders — see **Navbar**.
- No backend/forms — every CTA stays a visual placeholder, same convention as
  the original spec.
- Courses page does **not** duplicate sections that now live on Home
  (testimonials, blog preview, newsletter) — see **Courses page**.
- No fabricated contact details (e.g. no invented phone number) — footer
  contact info stays limited to what `content.txt` actually provides (email,
  Instagram handle, location).

## Tech stack additions

- `lucide-react` — icon components for every badge/icon slot (confirmed
  React-19-compatible per the visual-fidelity-fixes spec research).
- No other new runtime dependencies. Playwright is invoked ad hoc via `npx
  playwright` for verification screenshots only — not added to
  `package.json`, not wired into CI.

## Theme

No changes to the existing Tailwind theme tokens (`primary #1d5c2f`,
`primary-dark #143f21`, `accent #2e7d32`, `founder-bg #0f1f12`, `page-bg
#f8faf7`, `ink #111111`). All icon badges use a single consistent treatment —
a circular `bg-primary/10 text-primary` (or `bg-white/10 text-white` on dark
`founder-bg` sections) badge — rather than introducing per-badge accent colors
from the mockup's multi-color icon chips. This keeps the palette small and
consistent instead of adding one-off colors for visual variety that YAGNI
doesn't justify.

## Navbar (rebrand)

- Logo lockup: "AGRI MONK" + small tagline "Learn · Implement · Earn"
  (replaces "AGRI MONK INDIA" / "We Make Agriculture Cool.").
- New top announcement bar (`bg-ink` or `bg-founder-bg`, thin strip above the
  nav): "Empowering Farmers. Building Agripreneurs. Growing India." on the
  left, a small "Follow Us:" + social icon row on the right. Hidden below
  `sm` to save vertical space on mobile (the nav below it still carries the
  brand).
- Link set: Home (`/`), About Us (`/#about`), Courses (`/courses`), Blog
  (`/#blog`), Services (`/#services`), Shop (`#`, placeholder — no shop
  exists), Gallery (`#`, placeholder), Contact Us (`/#contact`).
- Single CTA button: "Join Community" (`variant="primary"`, placeholder
  `href="#"`), replacing the old two-button "Explore Courses" / "Book
  Consultation" pair in the nav. ("Book Consultation" moves into the hero
  itself, per content.txt's hero CTAs.)
- Mobile: hamburger below `lg`, same pattern as the existing `Navbar.js`
  (local `useState` open/close), now listing the 8 links + the single CTA.

## Footer (rebrand)

- Brand block: "AGRI MONK" + "Learn · Implement · Earn" tagline + "We make
  agriculture cool." sign-off line (kept, it's the core brand tagline).
- Social icon row under the brand blurb (closes fidelity gap #7): Instagram
  linked to `@agrimonk.in` per content.txt; Facebook/YouTube/LinkedIn as
  visual-only placeholders (`href="#"`) to match the mockup's icon density —
  no fabricated handles for those.
- Quick Links column (per content.txt): Home, About, Services, Contact,
  Consultation (5 items — "Consultation" is new, points at `/#contact`
  alongside "Contact" since there's no separate consultation anchor).
- Our Services column (per content.txt's footer list — distinct from the
  Home page's 6-item Services section): Agriculture Consulting, Hydroponics
  Guidance, Mushroom Farming, Agribusiness Consulting, Modern Farming.
- New Support column (from the mockup, no equivalent in content.txt — kept as
  visual-only placeholders): FAQs, Privacy Policy, Terms & Conditions, Refund
  Policy, all `href="#"`.
- Contact Us column (per content.txt only — no phone number invented): Email
  `hello@agrimonk.in`, Instagram `@agrimonk.in`, Location "Bengaluru, India".

## Home page (`/`) — full section order

1. **Top bar + Navbar** — as above.

2. **Hero.** Heading stays "We Make **Agriculture Cool.**" (content.txt's
   main heading — the recurring brand tagline, kept over the mockup's
   "India's Leading Platform..." heading). Sub-heading, exact content.txt
   copy. Two buttons: "Book Consultation" (`primary`, placeholder `href="#"`)
   and "Explore Agriculture" (`outline`, `as="link" to="/courses"` — reuses
   the existing "Explore Courses" wiring, relabeled). Trust line below the
   buttons: a small green checkmark icon + content.txt's exact sentence
   ("Helping people explore modern farming, agribusiness, hydroponics,
   mushroom farming, protected cultivation, and profitable agriculture
   opportunities.") — replaces the shorter placeholder line from the
   fidelity-fixes spec (gap #4) with the real copy. Hero photo keeps its
   floating decorations from the mockup, layered on top (no text conflict,
   pure visual addition):
   - Floating badge cards over the image: "Practical Learning", "Expert
     Guidance", "Lifetime Support" (small white rounded cards with an icon).
   - Floating "132K+ Community Across India" card, bottom-right, with a
     3-avatar overlap stack (closes fidelity gap #3).
   - Floating "Chat with us on WhatsApp" badge, bottom-left, linking to a
     `wa.me` placeholder.

3. **Stats strip.** Same 4 stats as the current build (132K+ Followers, 2.2M+
   Monthly Views, "Modern" / Hydroponics·Mushroom·Agribusiness, "New Age" /
   For professionals, entrepreneurs & beginners), styled as a white card that
   **overlaps the hero's bottom edge** via negative top margin (closes
   fidelity gap #5), stacking to 2 then 1 column on mobile.

4. **About** (`id="about"`). Eyebrow "ABOUT AGRI MONK", heading "Agriculture
   is Changing. **So Are We.**", content.txt's "We help:" bullet list
   (Corporate professionals, Engineers, Business owners, First-generation
   farmers, Young entrepreneurs, Agriculture enthusiasts) rendered as a
   compact inline list ahead of the closing paragraphs, pull-line "Because
   agriculture today is not just farming. It is business. It is innovation.
   It is opportunity." 2×2 image grid (Modern Techniques / Profitable
   Opportunities / Expert Guidance / Sustainable Future) with captions
   **overlaid on the photo** via a bottom gradient (closes fidelity gap #6,
   previously a separate caption bar).

5. **Why People Choose Agri Monk** (new section). Eyebrow "WHY AGRI MONK",
   heading "Why People Choose Agri Monk", 6 icon cards from content.txt:
   Modern Approach, Beginner Friendly, Practical Guidance, Future-Focused,
   Profit-Oriented, New Age Agriculture — each with a one-line description
   and a lucide icon in the standard badge treatment. Grid: 3 cols desktop →
   2 → 1.

6. **Popular Courses preview.** Eyebrow "LEARN · IMPLEMENT · EARN", heading
   "Our Popular Courses", the same 5 course cards used on `/courses`
   (Mushroom Farming, Hydroponics Farming, Organic Farming, Terrace
   Gardening, Agribusiness Startup) with a small icon badge overlapping each
   card's image (closes fidelity gap #9 for this card style), each with
   "View Course →". A single "View All Courses" button (`as="link"
   to="/courses"`) centered below the grid.

7. **Services** (`id="services"`). Unchanged heading/content from the
   current build (Agriculture Consulting, Farm Setup Assistance, Agribusiness
   Guidance, Agriculture Learning, Agri Brand Promotions, Startup Support),
   now with an icon badge added to each card (closes fidelity gap #2 for this
   section).

8. **Who We Work With.** Dark `founder-bg` band, updated to content.txt's
   5-item list with one-line descriptions (richer than the current 4-item,
   label-only version): Corporate Professionals, Engineers & IT
   Professionals, Entrepreneurs, Existing Farmers, Students & Youngsters —
   each with an icon badge (closes fidelity gap #2 for this section).

9. **Explore Modern Agriculture** (new section). Eyebrow "MODERN
   AGRICULTURE", heading "Explore Modern Agriculture", 6 image cards from
   content.txt (Hydroponics Farming, Mushroom Farming, Protected Cultivation,
   Exotic Vegetables, Terrace & Urban Farming, Agribusiness Opportunities),
   each with a photo, overlaid caption (same treatment as the About grid),
   and the one-line description from content.txt below the card. Grid: 3 →
   2 → 1.

10. **Founder.** Rebuilt as a **3-column grid** at `lg` (closes fidelity gap
    #1): photo | bio column (subheading, 2 bio paragraphs, pull-quote) |
    credentials column — each of the 6 credentials (PGDM – Agri Business
    (ICAR-NAARM), PPO Holder (DCM Shriram Ltd), FLAME Student (Gold Award),
    Best Student Award (NAARM), Entrepreneurship Award Recognition, Founder
    (FITMONK)) as its own small card with an icon, not a bare bullet list.

11. **Trust badges strip.** Dark strip, 4 items from the mockup: ICAR-NAARM
    Alumnus, Awarded by Govt. of India, Featured in Top Agri Media, Trusted
    by Farmers Across India — each with an icon above the label.

12. **Testimonials.** Heading "What People Say" (content.txt's heading, not
    the mockup's "What Our Learners Say"), 3 cards using content.txt's exact
    quotes. content.txt doesn't attribute names/roles to these quotes, so
    they're paired with the same representative name/role/avatar pattern the
    current Courses page already uses (Ramesh Kumar – Mushroom Farmer,
    Odisha; Priya Sharma – Hydroponics Farmer, Pune; Ankit Patel – Agri
    Entrepreneur, Gujarat) — reusing existing avatar placeholders, new quote
    text.

13. **Blog preview** (`id="blog"` — anchor target for the nav's "Blog" link).
    Heading "Agri Insights & Knowledge", reuses the
    existing 4-item `blogPosts` data as-is (already matches the mockup).
    Lives on Home only now — removed from `/courses` (see below) to avoid
    duplicating the same 4 cards on two pages.

14. **Newsletter band.** "Stay Updated with Agri Monk" + email input +
    Subscribe button, same no-op placeholder pattern as the current build,
    moved from `/courses` to Home.

15. **CTA** (`id="contact"`). Unchanged from the current build: "Ready to
    Explore **Modern Agriculture?**", supporting copy, 4-icon row (Expert
    Guidance, Practical Solutions, Profitable Opportunities, Long-term
    Support — now with real icons instead of plain text), two buttons (Get
    Consultation, Contact Us).

16. **Footer** (shared component, rebrand above).

## Courses page (`/courses`) — revised, leaner scope

Keeps the shared (now rebranded) Navbar/Footer. To avoid duplicating content
that now lives on Home, this page keeps only what's specific to "browsing
courses":

1. Page header — "Our Popular Courses" + supporting line (unchanged).
2. Full course grid — same 5 cards as the Home preview, now with icon
   badges (closes fidelity gap #9).
3. "Why Choose Agri Monk?" block — checklist + stats card + "Know Our Story"
   button (unchanged from current build).
4. Trust badges strip (unchanged from current build).

**Removed from this page** (now Home-only, per Non-goals): testimonials, blog
preview, newsletter band. This is a scope simplification, not a mockup
deviation — the mockup's course-grid screenshot included these because it was
originally meant to be the whole site's landing flow; now that Home carries
them, repeating them on `/courses` is redundant.

## Icons (lucide-react)

One icon per card, consistent badge styling (`bg-primary/10 text-primary`
circle, or `bg-white/10 text-white` on dark sections). Suggested mapping
(adjustable at implementation time if a name doesn't exist in the installed
lucide version — not load-bearing on the exact icon, just "has an icon"):

- Why Agri Monk: Sparkles, Smile, Compass, Rocket, TrendingUp, Leaf
- Services: Users, Wrench, Briefcase, BookOpen, Megaphone, Rocket
- Who We Work With: Briefcase, Cpu, Lightbulb, Tractor, GraduationCap
- Founder credentials: GraduationCap, Award, Medal, Trophy, Star, Rocket
- CTA row: UserCheck, CheckCircle2, TrendingUp, LifeBuoy
- Trust badges: Award, Landmark, Newspaper, Users
- Hero floating badges: BookOpenCheck, UserCheck, LifeBuoy
- Course card badges: reuse a simple Leaf/Sprout icon per card

## Images

No photoreal generation tool is available in this session. Approach:

- Write `assets/image-prompts.md` with one detailed prompt per photo slot:
  hero, founder, about-grid (×4), modern-agriculture (×6), course thumbnails
  (×5), blog (×4), testimonial avatars (×3), hero community-avatar stack
  (×3). Each prompt specifies subject, setting, lighting, and composition
  matching that slot's role on the page.
- In code, every `<img>` for these slots points at a local path under
  `public/assets/images/<slot>.jpg` (e.g. `/assets/images/hero.jpg`,
  `/assets/images/founder.jpg`, `/assets/images/modern-hydroponics.jpg`).
- A lightweight neutral placeholder graphic (simple solid/gradient SVG or
  JPG, not a stock photo) is checked in at each of those exact paths now, so
  the build is complete and testable today. When real generated images are
  handed back, they drop into the same filenames with no code changes.

## Testing / Verification

- Keep the existing CRA smoke-test pattern (one rendering test per page,
  updated for new headings where section headings changed).
- One-off Playwright verification pass after implementation: launch `npm
  start`, screenshot `/` and `/courses` at a desktop width and a ~375px
  mobile width, and visually confirm section order, responsive stacking, and
  that the new hero/footer/nav render without overlap or overflow. Not added
  as a permanent dependency or CI step.

## Error handling

Unchanged from the original spec — every CTA, nav placeholder (Shop,
Gallery), and form stays a non-functional visual placeholder; no backend.
