# Agri Monk India Website — Visual Fidelity Fixes

## Overview

The initial implementation (see `2026-07-30-agrimonk-website-design.md`) built the
Home and Courses pages structurally matching the two mockup images, but a
side-by-side comparison against the live pages (`localhost:3001`) surfaced real
structural gaps beyond spacing/polish — missing sections, missing icons, and a
collapsed layout in the founder section. This spec records those gaps so they can
be fixed in a follow-up round.

## Source of truth

Same as the original design spec: the two mockup screenshots in `assets/` are the
sole source of truth —
`WhatsApp Image 2026-07-30 at 8.44.40 PM (1).jpeg` (founder design, Home) and
`WhatsApp Image 2026-07-30 at 8.44.40 PM.jpeg` (course-grid design, Courses).

## Confirmed gaps — Home page

1. **Founder section is 2 columns, should be 3.** The mockup lays the founder
   section out as photo | bio text | credentials list (credentials in their own
   right-hand column, each with a small icon). The current implementation
   (`src/pages/Home.js`, founder `RevealSection`) collapses this to 2 columns:
   photo | (bio text + quote + bulleted credentials all stacked in one column).
   Fix: rebuild as a 3-column grid at `lg` breakpoint; move `founderCredentials`
   into their own column with icons, matching the mockup's card-per-credential
   look (icon + label, not a bare bullet list).

2. **No icons anywhere on the page.** The mockup shows a small circular icon
   above every Services card, every "Who We Work With" card, and every item in
   the closing CTA's 4-item row. The current implementation renders all of these
   as plain text with no icon. Fix: add an icon library (`lucide-react`,
   confirmed compatible with React 19 via peer range `^19.0.0`, not yet
   installed) and add one icon per service, per audience card, and per CTA
   point, matching the mockup's icon style (simple line icons in a circular
   light-colored badge).

3. **Hero is missing the floating "132K+ Community Across India" card.** The
   mockup overlays a small white card with an avatar stack and "132K+ Community
   Across India" text on the bottom-right of the hero image. Not present at all
   in the current hero section (`src/pages/Home.js` hero `<section>`).

4. **Hero is missing the checkmark microcopy line.** Below the two hero buttons,
   the mockup has a small line: a green checkmark icon + "Helping you explore
   modern farming, agribusiness, hydroponics, mushroom farming & more." Not
   present in the current implementation.

5. **Stats card doesn't overlap the hero image.** In the mockup, the white stats
   card overlaps the bottom edge of the hero photo (negative margin / absolute
   positioning). In the current implementation the stats `RevealSection` sits as
   a fully separate block below the hero with a visible gap (`mt-16`).

6. **About section image captions are overlaid on the photo, not below it.** The
   mockup shows each of the 4 About cards with a dark gradient at the bottom of
   the image and the caption text (e.g. "Modern Techniques") in white, overlaid
   directly on the photo. The current implementation (`aboutCards` map in
   `Home.js`) puts the caption in a separate white bar below the image instead.

7. **Footer is missing the social icon row.** The mockup's footer has a row of
   small circular social icons (Instagram, YouTube, LinkedIn, etc.) beneath the
   brand blurb. `src/components/Footer.js` has no social icons at all.

## Confirmed gaps — Courses page

8. **The entire top hero section is missing.** The course-grid mockup opens with
   a full hero section before "Our Popular Courses": a dark top bar
   ("Empowering Farmers. Building Agripreneurs. Growing India." + social follow
   icons), a nav with different branding ("AGRI MONK — Learn · Implement ·
   Earn", different link set, a "Join Community" button), a hero heading
   ("India's Leading Platform for Modern Agriculture Learning & Agribusiness"),
   subtext, three buttons (Explore Courses / Our Services / Watch Intro), a
   hero image with floating badge cards (Practical Learning / Expert Guidance /
   Lifetime Support) and a "Chat with us on WhatsApp" floating badge, and a
   4-item feature-icon row (Practical & Result Oriented Courses / Expert
   Mentorship & Support / Start Your Own Agribusiness / Community of Agri
   Monks). None of this exists in the current `src/pages/Courses.js` — the page
   currently starts directly at the "Our Popular Courses" heading.

   **Open question for this fix round:** the current build intentionally reuses
   the shared founder-style `Navbar`/`Footer` on the Courses page instead of the
   course-grid mockup's separate branding/nav (this was an implicit choice made
   during the original build, not an explicit user decision). Confirm whether
   the Courses page should keep the shared Navbar/Footer (simpler, one
   consistent nav site-wide) or adopt the course-grid mockup's distinct hero/nav
   treatment when this section gets added.

9. **Course cards, trust badges, and blog cards are missing icon accents.** The
   mockup gives each course card a small colored circular icon badge (top-left
   of the card, overlapping the image), each trust badge an icon above the
   text, and category tags on blog cards a small leaf/icon accent. All are
   plain text/no-icon in the current implementation.

## Explicitly out of scope for this fix round

- Nav dropping "Modern Agriculture" and "Resources" — this was an explicit user
  decision in the original spec, not a bug. Not revisited here.
- Founder photo being a generic Unsplash headshot instead of a suited/sunglasses
  outdoor photo matching the mockup — this is a stock-photo limitation (we don't
  have the real photo), not a structural/code fix. Flagged for awareness only.
- Hero photo subject mismatch (vineyard vs. greenhouse person) — same category,
  a stock-photo swap, not structural. Can be bundled into this round cheaply
  (swap to a better-matching Unsplash URL) but is not the focus.

## Next steps

This spec records the gaps only. Do not implement yet — proceed to
`writing-plans` for an implementation plan once the user is ready to schedule
this round of fixes, and resolve the open question in gap #8 (Courses page
nav/hero treatment) before finalizing that part of the plan.
