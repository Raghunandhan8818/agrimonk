# Agri Monk India Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the CRA boilerplate with a two-page Agri Monk India marketing site (Home + Courses) styled with Tailwind CSS, matching the two mockup images in `assets/` as the sole source of truth.

**Architecture:** React Router splits the app into `/` (Home) and `/courses` (Courses), sharing a `Navbar` + `Footer` inside a `Layout` wrapper. Each page is composed of small, single-purpose section components reading from local data files in `src/data/`. A shared `useInView` hook drives scroll-reveal and count-up animations. Tailwind utility classes handle all styling; no CSS framework beyond Tailwind, no component library.

**Tech Stack:** Create React App (react-scripts 5.0.1, unchanged), Tailwind CSS v3.4.19, react-router-dom v6, Poppins font via Google Fonts link. No craco needed — react-scripts 5 auto-detects `tailwind.config.js` and switches its built-in PostCSS pipeline to use the `tailwindcss` plugin (verified in `node_modules/react-scripts/config/webpack.config.js`).

## Global Constraints

- Source of truth for all layout, copy, and visual proportions is the two mockup images in `assets/`: `WhatsApp Image 2026-07-30 at 8.44.40 PM (1).jpeg` (founder design → Home) and `WhatsApp Image 2026-07-30 at 8.44.40 PM.jpeg` (course-grid design → Courses). No other HTML/CSS reference is used.
- Nav links: Home, About, Services, Contact, Courses. "Modern Agriculture" and "Resources" are dropped entirely (not shown), per explicit user decision — despite appearing in the mockup's own nav.
- Theme colors (exact hex, from the approved spec): `primary` `#1d5c2f`, `primary-dark` `#143f21`, `accent` `#2e7d32`, `founder-bg` `#0f1f12`, `page-bg` `#f8faf7`, `ink` `#111111`.
- Font: Poppins throughout (weights 400/600/700/800), loaded via Google Fonts `<link>` in `public/index.html`.
- All CTAs ("Book Consultation", "Get Consultation", "Contact Us", "Know Our Story", "View Course", "Read More", "Subscribe") are non-functional placeholders (`href="#"` or no-op `onClick`) — no backend, no forms submit anywhere.
- All images are remote Unsplash URLs (verified reachable during design) — no local image assets to source or download.
- No animation library — scroll-reveal/count-up built on a custom `useInView` hook (`IntersectionObserver`) plus Tailwind transition utilities.
- Keep CRA's existing smoke-test pattern: one rendering test per page.

---

## Task 1: Install Tailwind and wire it into the CRA build

**Files:**
- Modify: `package.json`
- Create: `tailwind.config.js`
- Create: `postcss.config.js` (react-scripts reads plugin list from webpack config when `tailwind.config.js` exists, but an explicit `postcss.config.js` is not required — react-scripts injects the `tailwindcss` + `postcss-flexbugs-fixes` + `postcss-preset-env` plugin chain itself. Skip creating this file; see Step 2.)
- Modify: `src/index.css`
- Modify: `public/index.html`

**Interfaces:**
- Produces: Tailwind utility classes usable in any component under `src/`; theme tokens `primary`, `primary-dark`, `accent`, `founder-bg`, `page-bg`, `ink` available as Tailwind color classes (e.g. `bg-primary`, `text-accent`); `font-sans` resolves to Poppins.

- [ ] **Step 1: Install tailwindcss, autoprefixer, react-router-dom as direct dependencies**

Run:
```bash
npm install -D tailwindcss@3.4.19 autoprefixer@10.5.4
npm install react-router-dom@6
```

Expected: `package.json` `dependencies` gains `react-router-dom`; `devDependencies` gains `tailwindcss` and `autoprefixer`. (`tailwindcss`/`autoprefixer` already exist transitively via react-scripts, but must be direct deps so `npx tailwindcss init` and the build resolve a pinned version deliberately, not whatever react-scripts happens to bundle.)

- [ ] **Step 2: Generate tailwind.config.js and set content paths + theme**

Run: `npx tailwindcss init`

Then replace the generated file's contents:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1d5c2f',
        'primary-dark': '#143f21',
        accent: '#2e7d32',
        'founder-bg': '#0f1f12',
        'page-bg': '#f8faf7',
        ink: '#111111',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

The mere presence of this file at the project root is what flips `react-scripts`'s webpack config (`node_modules/react-scripts/config/webpack.config.js:72-74`) to use the Tailwind PostCSS plugin chain — no further build config changes needed.

- [ ] **Step 3: Add Tailwind directives to src/index.css**

Replace the full contents of `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 4: Add Poppins Google Font link to public/index.html**

In `public/index.html`, inside `<head>`, after the existing `<meta name="description" ...>` tag, add:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
```

Also update `<title>React App</title>` to `<title>Agri Monk India</title>`.

- [ ] **Step 5: Verify the build picks up Tailwind**

Run: `CI=true npm run build`

Expected: build succeeds (exit code 0) and `build/static/css/*.css` contains Tailwind's reset (search for `*, ::before, ::after{box-sizing:border-box` or similar in the built CSS file — confirms `@tailwind base` was processed, not left as a literal unprocessed `@tailwind` string).

Run: `grep -l "tailwind" build/static/css/*.css 2>/dev/null; grep -c "@tailwind" build/static/css/*.css`
Expected: the second grep returns `0` (directives were compiled away, not passed through literally).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tailwind.config.js src/index.css public/index.html
git commit -m "Add Tailwind CSS and react-router-dom to the build"
```

---

## Task 2: Build the useInView hook and shared Button component

**Files:**
- Create: `src/hooks/useInView.js`
- Create: `src/hooks/useInView.test.js`
- Create: `src/components/Button.js`
- Test: `src/hooks/useInView.test.js`

**Interfaces:**
- Produces: `useInView(options?)` → `{ ref, isInView }`. `ref` is a callback ref (or object ref) to attach to the DOM node being observed; `isInView` is `false` until the node intersects the viewport, then flips to `true` permanently (observer disconnects after first intersection — this is a reveal-once hook, not a toggle).
- Produces: `<Button as="link"|"a"|"button" to/href variant="primary"|"outline" className? onClick? children>` — renders a React Router `<Link>` when `as="link"`, a plain `<a>` when `as="a"`, a `<button>` otherwise. `variant="primary"` → filled `bg-primary text-white hover:bg-primary-dark`; `variant="outline"` → `border-2 border-primary text-primary bg-transparent`. Both get `transition-transform hover:-translate-y-0.5` for the hover-lift feel.

- [ ] **Step 1: Write the failing test for useInView**

Create `src/hooks/useInView.test.js`:

```js
import { renderHook, act } from '@testing-library/react';
import { useInView } from './useInView';

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe() {}
  disconnect() {
    this.disconnected = true;
  }
}
MockIntersectionObserver.instances = [];

beforeEach(() => {
  MockIntersectionObserver.instances = [];
  global.IntersectionObserver = MockIntersectionObserver;
});

test('isInView starts false and flips to true once the element intersects', () => {
  const { result } = renderHook(() => useInView());
  expect(result.current.isInView).toBe(false);

  act(() => {
    result.current.ref({}); // attach a fake node so the observer is created
  });

  const observer = MockIntersectionObserver.instances[0];
  act(() => {
    observer.callback([{ isIntersecting: true }]);
  });

  expect(result.current.isInView).toBe(true);
});

test('disconnects the observer after the element has come into view once', () => {
  const { result } = renderHook(() => useInView());

  act(() => {
    result.current.ref({});
  });

  const observer = MockIntersectionObserver.instances[0];
  act(() => {
    observer.callback([{ isIntersecting: true }]);
  });

  expect(observer.disconnected).toBe(true);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/hooks/useInView.test.js --watchAll=false`
Expected: FAIL — `Cannot find module './useInView'` (file doesn't exist yet).

- [ ] **Step 3: Implement useInView**

Create `src/hooks/useInView.js`:

```js
import { useCallback, useRef, useState } from 'react';

export function useInView(options) {
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef(null);

  const ref = useCallback(
    (node) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return;

      observerRef.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current.disconnect();
        }
      }, options);

      observerRef.current.observe(node);
    },
    [options]
  );

  return { ref, isInView };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test src/hooks/useInView.test.js --watchAll=false`
Expected: PASS (2 tests).

- [ ] **Step 5: Implement the Button component (no test — purely presentational, covered by page smoke tests in later tasks)**

Create `src/components/Button.js`:

```js
import { Link } from 'react-router-dom';

const VARIANT_CLASSES = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
};

export default function Button({
  as = 'a',
  to,
  href = '#',
  variant = 'primary',
  className = '',
  onClick,
  children,
}) {
  const classes = `inline-block px-6 py-3 rounded-xl font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${VARIANT_CLASSES[variant]} ${className}`;

  if (as === 'link') {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (as === 'button') {
    return (
      <button type="button" className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} className={classes} onClick={onClick}>
      {children}
    </a>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useInView.js src/hooks/useInView.test.js src/components/Button.js
git commit -m "Add useInView reveal hook and shared Button component"
```

---

## Task 3: Build a RevealSection wrapper for scroll animations

**Files:**
- Create: `src/components/RevealSection.js`

**Interfaces:**
- Consumes: `useInView` from `src/hooks/useInView.js` (`{ ref, isInView }`).
- Produces: `<RevealSection as="section"|"div" id? className?>{children}</RevealSection>` — wraps children in the given tag, attaches the `useInView` ref, and toggles `opacity-0 translate-y-4` → `opacity-100 translate-y-0` with a `transition-all duration-700` class, so every page section gets the fade+slide-up reveal by wrapping it in this component instead of hand-rolling the hook in every section file.

- [ ] **Step 1: Implement RevealSection**

Create `src/components/RevealSection.js`:

```js
import { useInView } from '../hooks/useInView';

export default function RevealSection({ as = 'section', id, className = '', children }) {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const Tag = as;

  return (
    <Tag
      ref={ref}
      id={id}
      className={`transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Manually verify in isolation**

This component has no standalone test (it's a thin composition of an already-tested hook + Tailwind classes); it's exercised by every page-level smoke test in Tasks 6 and 8. No separate verification step here beyond a visual check once a page uses it (Task 6, Step 5).

- [ ] **Step 3: Commit**

```bash
git add src/components/RevealSection.js
git commit -m "Add RevealSection scroll-reveal wrapper component"
```

---

## Task 4: Build the CountUp component for animated stat numbers

**Files:**
- Create: `src/components/CountUp.js`
- Create: `src/components/CountUp.test.js`

**Interfaces:**
- Consumes: `useInView` from `src/hooks/useInView.js`.
- Produces: `<CountUp end={132} suffix="K+" duration={1200} />` — renders a `<span>` whose text content animates from `0` to `end` (appending `suffix` after the number) once the span scrolls into view. Renders `0${suffix}` before reveal, `${end}${suffix}` at the end of the animation.

- [ ] **Step 1: Write the failing test**

Create `src/components/CountUp.test.js`:

```js
import { render, screen, act } from '@testing-library/react';
import CountUp from './CountUp';

class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe() {}
  disconnect() {}
}
MockIntersectionObserver.instances = [];

beforeEach(() => {
  MockIntersectionObserver.instances = [];
  global.IntersectionObserver = MockIntersectionObserver;
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

test('renders 0 with suffix before coming into view', () => {
  render(<CountUp end={132} suffix="K+" />);
  expect(screen.getByText('0K+')).toBeInTheDocument();
});

test('animates up to the end value with suffix once in view', () => {
  render(<CountUp end={132} suffix="K+" duration={200} />);

  const observer = MockIntersectionObserver.instances[0];
  act(() => {
    observer.callback([{ isIntersecting: true }]);
  });

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(screen.getByText('132K+')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/components/CountUp.test.js --watchAll=false`
Expected: FAIL — `Cannot find module './CountUp'`.

- [ ] **Step 3: Implement CountUp**

Create `src/components/CountUp.js`:

```js
import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

export default function CountUp({ end, suffix = '', duration = 1200 }) {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!isInView || startedRef.current) return;
    startedRef.current = true;

    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setValue(Math.round(progress * end));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx react-scripts test src/components/CountUp.test.js --watchAll=false`
Expected: PASS (2 tests). Note: `requestAnimationFrame` runs under jsdom's default polyfill (timer-based), so `jest.advanceTimersByTime` drives it forward — if this hangs, fall back to mocking `requestAnimationFrame` with `setTimeout` in the test's `beforeEach` (`global.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);`).

- [ ] **Step 5: Commit**

```bash
git add src/components/CountUp.js src/components/CountUp.test.js
git commit -m "Add CountUp animated stat number component"
```

---

## Task 5: Build Navbar and Footer with hash-scroll navigation

**Files:**
- Create: `src/components/Navbar.js`
- Create: `src/components/Footer.js`
- Create: `src/hooks/useScrollToHash.js`

**Interfaces:**
- Produces: `useScrollToHash()` — a hook with no return value; call it once in the `Home` page component. It reads `window.location.hash` on mount and whenever it changes, and if non-empty, calls `document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })`.
- Produces: `<Navbar />` — fixed-top nav with logo "AGRI MONK INDIA" + tagline "We Make Agriculture Cool.", links (Home → `/`, About → `/#about`, Services → `/#services`, Contact → `/#contact`, Courses → `/courses`), "Book Consultation" (`variant="primary"`, `as="a"`, placeholder `href="#"`) and "Explore Courses" (`variant="outline"`, `as="link"`, `to="/courses"`) buttons, hamburger toggle below `lg` breakpoint using local `useState` for open/closed.
- Produces: `<Footer />` — dark (`bg-ink`) footer with brand blurb, Quick Links (Home, About, Services, Contact — Modern Agriculture/Resources omitted per Global Constraints), Our Services list, Contact Us block.

- [ ] **Step 1: Implement useScrollToHash**

Create `src/hooks/useScrollToHash.js`:

```js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);
}
```

- [ ] **Step 2: Implement Navbar**

Create `src/components/Navbar.js`:

```js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Contact', to: '/#contact' },
  { label: 'Courses', to: '/courses' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="leading-tight">
          <span className="block text-2xl font-extrabold text-primary">
            AGRI MONK INDIA
          </span>
          <span className="block text-xs text-gray-500">
            We Make Agriculture Cool.
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-medium text-gray-800 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <Button as="link" to="/courses" variant="outline">
            Explore Courses
          </Button>
          <Button as="a" href="#" variant="primary">
            Book Consultation
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden text-2xl text-primary"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle navigation menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="lg:hidden flex flex-col gap-4 px-6 pb-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-medium text-gray-800 hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button as="link" to="/courses" variant="outline" onClick={() => setOpen(false)}>
            Explore Courses
          </Button>
          <Button as="a" href="#" variant="primary" onClick={() => setOpen(false)}>
            Book Consultation
          </Button>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 3: Implement Footer**

Create `src/components/Footer.js`:

```js
import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Contact', to: '/#contact' },
];

const OUR_SERVICES = [
  'Agriculture Consulting',
  'Farm Setup Assistance',
  'Agribusiness Guidance',
  'Agriculture Learning',
  'Agri Brand Promotions',
  'Startup Support',
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-3">AGRI MONK INDIA</h3>
          <p className="text-gray-400">
            Empowering farmers with knowledge and modern solutions for a better
            and sustainable future.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="text-gray-400 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Our Services</h4>
          <ul className="space-y-2">
            {OUR_SERVICES.map((service) => (
              <li key={service} className="text-gray-400">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <p className="text-gray-400">hello@agrimonk.in</p>
          <p className="text-gray-400">Bengaluru, Karnataka, India</p>
        </div>
      </div>

      <p className="text-center text-accent mt-12 font-medium">
        We make agriculture cool.
      </p>
    </footer>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.js src/components/Footer.js src/hooks/useScrollToHash.js
git commit -m "Add Navbar and Footer with hash-anchor navigation"
```

---

## Task 6: Build the Home page hero, stats, and about sections

**Files:**
- Create: `src/pages/Home.js`
- Create: `src/data/aboutCards.js`
- Test: `src/pages/Home.test.js`

**Interfaces:**
- Consumes: `Navbar`, `Footer`, `RevealSection`, `CountUp`, `Button`, `useScrollToHash`.
- Produces: `aboutCards` — array of `{ title, image }` for the About section's 2x2 grid, imported by `src/data/aboutCards.js` (used only in Task 6, but factored out since it's pure data).
- Produces: default-exported `Home` component, rendered at route `/` in Task 9.

- [ ] **Step 1: Write the failing smoke test for Home**

Create `src/pages/Home.test.js`:

```js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

beforeEach(() => {
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
});

test('renders the hero heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /we make agriculture cool/i })
  ).toBeInTheDocument();
});

test('renders the about section heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /agriculture is changing/i })
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/pages/Home.test.js --watchAll=false`
Expected: FAIL — `Cannot find module './Home'`.

- [ ] **Step 3: Create the about cards data file**

Create `src/data/aboutCards.js`:

```js
export const aboutCards = [
  {
    title: 'Modern Techniques',
    image:
      'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=1000&auto=format&fit=crop',
  },
  {
    title: 'Profitable Opportunities',
    image:
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1000&auto=format&fit=crop',
  },
  {
    title: 'Expert Guidance',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1000&auto=format&fit=crop',
  },
  {
    title: 'Sustainable Future',
    image:
      'https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=1000&auto=format&fit=crop',
  },
];
```

- [ ] **Step 4: Implement Home.js with Navbar, Hero, Stats, and About sections (Services/WorkWith/Founder/CTA/Footer added in Task 7)**

Create `src/pages/Home.js`:

```js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import RevealSection from '../components/RevealSection';
import CountUp from '../components/CountUp';
import { useScrollToHash } from '../hooks/useScrollToHash';
import { aboutCards } from '../data/aboutCards';

export default function Home() {
  useScrollToHash();

  return (
    <>
      <Navbar />

      <main className="bg-page-bg pt-28">
        <section className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
              We Make <span className="text-accent">Agriculture Cool.</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              New-age agriculture consulting for corporate professionals,
              entrepreneurs, engineers and anyone who wants to enter farming
              and build profitable agricultural ventures.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button as="a" href="#" variant="primary">
                Book Consultation
              </Button>
              <Button as="link" to="/courses" variant="outline">
                Explore Courses
              </Button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1200&auto=format&fit=crop"
              alt="Agri Monk consultant standing in a modern greenhouse"
              className="w-full rounded-3xl object-cover"
            />
          </div>
        </section>

        <RevealSection
          as="div"
          className="max-w-6xl mx-auto px-6 mt-16 bg-white rounded-3xl shadow-lg grid grid-cols-2 lg:grid-cols-4 gap-8 p-10"
        >
          <div>
            <h2 className="text-3xl font-bold text-primary mb-1">
              <CountUp end={132} suffix="K+" />
            </h2>
            <p className="text-gray-500">Followers</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-1">
              <CountUp end={2} suffix=".2M+" />
            </h2>
            <p className="text-gray-500">Monthly Views</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-1">Modern</h2>
            <p className="text-gray-500">
              Hydroponics &middot; Mushroom Farming &middot; Agribusiness
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-primary mb-1">New Age</h2>
            <p className="text-gray-500">
              For professionals, entrepreneurs &amp; beginners
            </p>
          </div>
        </RevealSection>

        <RevealSection id="about" className="max-w-6xl mx-auto px-6 py-28">
          <p className="text-accent font-semibold uppercase tracking-wide mb-2">
            About Agri Monk
          </p>
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-10">
            Agriculture is changing.{' '}
            <span className="text-accent">So are we.</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Agri Monk India is a new-age agriculture consulting company
                helping people enter modern agriculture in a smart, profitable
                and practical way.
              </p>
              <p>
                We help corporate professionals, engineers, entrepreneurs,
                first-generation farmers and agriculture enthusiasts
                understand and explore modern agricultural opportunities.
              </p>
              <p>
                Whether you want to start farming, invest in agriculture,
                build an agribusiness, or simply learn cool modern farming
                concepts, Agri Monk helps simplify the journey.
              </p>
              <p className="font-semibold text-primary">
                Because agriculture today is not just farming. It is
                business. It is innovation. It is opportunity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {aboutCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl overflow-hidden bg-white shadow"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-32 object-cover"
                  />
                  <p className="p-3 font-medium text-sm">{card.title}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </main>

      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx react-scripts test src/pages/Home.test.js --watchAll=false`
Expected: PASS (2 tests).

- [ ] **Step 6: Commit**

```bash
git add src/pages/Home.js src/pages/Home.test.js src/data/aboutCards.js
git commit -m "Add Home page hero, stats, and about sections"
```

---

## Task 7: Add Services, Who We Work With, Founder, and CTA sections to Home

**Files:**
- Modify: `src/pages/Home.js`
- Create: `src/data/services.js`
- Create: `src/data/workWithCards.js`
- Create: `src/data/founderCredentials.js`
- Modify: `src/pages/Home.test.js`

**Interfaces:**
- Produces: `services` — array of `{ title, description }`, 6 entries (Agriculture Consulting, Farm Setup Assistance, Agribusiness Guidance, Agriculture Learning, Agri Brand Promotions, Startup Support).
- Produces: `workWithCards` — array of `{ label }`, 4 entries (Corporate Professionals, Engineers & IT Professionals, Entrepreneurs & Startups, Existing Farmers & Youngsters).
- Produces: `founderCredentials` — array of strings, 6 entries (`'PGDM – Agri Business (ICAR-NAARM)'`, `'PPO Holder (DCM Shriram Ltd)'`, `'FLAME Student (Gold Award)'`, `'Best Student Award (NAARM)'`, `'Entrepreneurship Award Recognition'`, `'Founder (FITMONK)'`).

- [ ] **Step 1: Add failing assertions to Home.test.js for the new sections**

Add these two tests to `src/pages/Home.test.js` (append after the existing tests, same file):

```js
test('renders the services section heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /our services/i })
  ).toBeInTheDocument();
});

test('renders the founder section heading', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /meet monish gowda/i })
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/pages/Home.test.js --watchAll=false`
Expected: FAIL — no heading matching `/our services/i` or `/meet monish gowda/i` yet exists.

- [ ] **Step 3: Create the three new data files**

Create `src/data/services.js`:

```js
export const services = [
  {
    title: 'Agriculture Consulting',
    description: 'Personalized guidance for individuals looking to enter modern agriculture.',
  },
  {
    title: 'Farm Setup Assistance',
    description: 'Support for hydroponics, mushroom farming, terrace farming and more.',
  },
  {
    title: 'Agribusiness Guidance',
    description: 'Helping you explore agriculture as a profitable business opportunity.',
  },
  {
    title: 'Agriculture Learning',
    description: 'Simplified learning for beginners and future agripreneurs.',
  },
  {
    title: 'Agri Brand Promotions',
    description: 'Helping agriculture businesses grow digitally and reach the right audience.',
  },
  {
    title: 'Startup Support',
    description: 'Consultation for agriculture startups and innovative farming ideas.',
  },
];
```

Create `src/data/workWithCards.js`:

```js
export const workWithCards = [
  { label: 'Corporate Professionals' },
  { label: 'Engineers & IT Professionals' },
  { label: 'Entrepreneurs & Startups' },
  { label: 'Existing Farmers & Youngsters' },
];
```

Create `src/data/founderCredentials.js`:

```js
export const founderCredentials = [
  'PGDM – Agri Business (ICAR-NAARM)',
  'PPO Holder (DCM Shriram Ltd)',
  'FLAME Student (Gold Award)',
  'Best Student Award (NAARM)',
  'Entrepreneurship Award Recognition',
  'Founder (FITMONK)',
];
```

- [ ] **Step 4: Insert the Services, Who We Work With, Founder, and CTA sections into Home.js**

In `src/pages/Home.js`, add these imports at the top, alongside the existing `aboutCards` import:

```js
import { services } from '../data/services';
import { workWithCards } from '../data/workWithCards';
import { founderCredentials } from '../data/founderCredentials';
```

Then insert the following JSX inside `<main>`, immediately after the closing `</RevealSection>` of the About section (i.e. right before `</main>`):

```jsx
        <RevealSection id="services" className="max-w-6xl mx-auto px-6 py-20">
          <p className="text-accent font-semibold uppercase tracking-wide mb-2">
            What We Do
          </p>
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-10">
            Our Services
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl shadow p-8 transition-transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="bg-founder-bg text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-accent font-semibold uppercase tracking-wide mb-2">
              Who We Work With
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-10">
              Empowering People From Different Backgrounds
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {workWithCards.map((card) => (
                <div
                  key={card.label}
                  className="bg-white/10 rounded-2xl p-6 text-center font-medium transition-transform hover:-translate-y-2"
                >
                  {card.label}
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"
              alt="Monish Gowda, founder of Agri Monk India"
              className="w-full rounded-3xl object-cover"
            />

            <div>
              <p className="text-accent font-semibold uppercase tracking-wide mb-2">
                Founder
              </p>
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-2">
                Meet Monish Gowda
              </h2>
              <p className="text-gray-500 font-medium mb-6">
                Agripreneur | Agriculture Consultant | Business Strategist
              </p>

              <div className="space-y-4 text-gray-600 leading-relaxed mb-6">
                <p>
                  Monish founded Agri Monk India with a background in
                  agribusiness management from ICAR-NAARM, and industry
                  experience at DCM Shriram Ltd and ITC Limited.
                </p>
                <p>
                  He combines business strategy and agriculture to help
                  people confidently discover modern opportunities in
                  farming.
                </p>
              </div>

              <p className="italic font-semibold text-primary mb-6">
                &ldquo;Make agriculture exciting, practical and profitable
                for the next generation.&rdquo;
              </p>

              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
                {founderCredentials.map((credential) => (
                  <li key={credential}>&bull; {credential}</li>
                ))}
              </ul>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="contact" className="bg-founder-bg text-white py-24 text-center">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-6">
              Ready to Explore <span className="text-accent">Modern Agriculture?</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-10">
              Whether you want to start farming, learn modern agriculture, or
              build an agribusiness, Agri Monk helps you simplify the
              journey.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10 text-sm">
              <p>Expert Guidance</p>
              <p>Practical Solutions</p>
              <p>Profitable Opportunities</p>
              <p>Long-term Support</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button as="a" href="#" variant="primary">
                Get Consultation
              </Button>
              <Button as="a" href="#" variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-founder-bg">
                Contact Us
              </Button>
            </div>
          </div>
        </RevealSection>
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx react-scripts test src/pages/Home.test.js --watchAll=false`
Expected: PASS (4 tests).

- [ ] **Step 6: Commit**

```bash
git add src/pages/Home.js src/pages/Home.test.js src/data/services.js src/data/workWithCards.js src/data/founderCredentials.js
git commit -m "Add Services, Who We Work With, Founder, and CTA sections to Home"
```

---

## Task 8: Build the Courses page

**Files:**
- Create: `src/pages/Courses.js`
- Create: `src/data/courses.js`
- Create: `src/data/testimonials.js`
- Create: `src/data/blogPosts.js`
- Test: `src/pages/Courses.test.js`

**Interfaces:**
- Consumes: `Navbar`, `Footer`, `RevealSection`, `CountUp`, `Button`.
- Produces: `courses` — array of `{ title, description, image }`, 5 entries (Mushroom Farming, Hydroponics Farming, Organic Farming, Terrace Gardening, Agribusiness Startup).
- Produces: `testimonials` — array of `{ quote, name, role, avatar }`, 3 entries.
- Produces: `blogPosts` — array of `{ category, date, title, image }`, 4 entries.
- Produces: default-exported `Courses` component, rendered at route `/courses` in Task 9.

- [ ] **Step 1: Write the failing smoke test for Courses**

Create `src/pages/Courses.test.js`:

```js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Courses from './Courses';

beforeEach(() => {
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
});

test('renders the courses page heading', () => {
  render(
    <MemoryRouter>
      <Courses />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /our popular courses/i })
  ).toBeInTheDocument();
});

test('renders all five course titles', () => {
  render(
    <MemoryRouter>
      <Courses />
    </MemoryRouter>
  );
  expect(screen.getByText(/mushroom farming/i)).toBeInTheDocument();
  expect(screen.getByText(/hydroponics farming/i)).toBeInTheDocument();
  expect(screen.getByText(/organic farming/i)).toBeInTheDocument();
  expect(screen.getByText(/terrace gardening/i)).toBeInTheDocument();
  expect(screen.getByText(/agribusiness startup/i)).toBeInTheDocument();
});

test('renders the testimonials heading', () => {
  render(
    <MemoryRouter>
      <Courses />
    </MemoryRouter>
  );
  expect(
    screen.getByRole('heading', { name: /what our learners say/i })
  ).toBeInTheDocument();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx react-scripts test src/pages/Courses.test.js --watchAll=false`
Expected: FAIL — `Cannot find module './Courses'`.

- [ ] **Step 3: Create the three data files**

Create `src/data/courses.js`:

```js
export const courses = [
  {
    title: 'Mushroom Farming',
    description: 'Start your mushroom farm and earn high profits.',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop',
  },
  {
    title: 'Hydroponics Farming',
    description: 'Soil-less farming for higher yield and quality.',
    image:
      'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?q=80&w=1000&auto=format&fit=crop',
  },
  {
    title: 'Organic Farming',
    description: 'Chemical-free farming for healthy soil and better produce.',
    image:
      'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1000&auto=format&fit=crop',
  },
  {
    title: 'Terrace Gardening',
    description: 'Grow fresh vegetables on your terrace or balcony.',
    image:
      'https://images.unsplash.com/photo-1592419044706-39796d40f98c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    title: 'Agribusiness Startup',
    description: 'Build, launch, and scale your own agribusiness successfully.',
    image:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop',
  },
];
```

Create `src/data/testimonials.js`:

```js
export const testimonials = [
  {
    quote: 'Agri Monk’s mushroom course changed my life. I started earning from home!',
    name: 'Ramesh Kumar',
    role: 'Mushroom Farmer, Odisha',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: 'Very practical content and excellent support from the team.',
    name: 'Priya Sharma',
    role: 'Hydroponics Farmer, Pune',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  },
  {
    quote: 'The best platform for anyone who wants to start agribusiness.',
    name: 'Ankit Patel',
    role: 'Agri Entrepreneur, Gujarat',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
  },
];
```

Create `src/data/blogPosts.js`:

```js
export const blogPosts = [
  {
    category: 'Farming Tips',
    date: 'May 18, 2024',
    title: '10 Tips for Successful Vegetable Farming',
    image:
      'https://images.unsplash.com/photo-1592841200221-a6898f307baa?q=80&w=1000&auto=format&fit=crop',
  },
  {
    category: 'Hydroponics',
    date: 'May 15, 2024',
    title: 'Hydroponics vs Soil Farming – Which is Better?',
    image:
      'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?q=80&w=1000&auto=format&fit=crop',
  },
  {
    category: 'Mushroom',
    date: 'May 12, 2024',
    title: 'Complete Guide to Oyster Mushroom Farming',
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop',
  },
  {
    category: 'Organic',
    date: 'May 10, 2024',
    title: 'Benefits of Organic Farming for Soil Health',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1000&auto=format&fit=crop',
  },
];
```

- [ ] **Step 4: Implement Courses.js**

Create `src/pages/Courses.js`:

```js
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import RevealSection from '../components/RevealSection';
import CountUp from '../components/CountUp';
import { courses } from '../data/courses';
import { testimonials } from '../data/testimonials';
import { blogPosts } from '../data/blogPosts';

const TRUST_BADGES = [
  'ICAR-NAARM Alumnus',
  'Awarded by Govt. of India',
  'Featured in Top Agri Media',
  'Trusted by Farmers Across India',
];

const WHY_CHOOSE_POINTS = [
  'Founded by ICAR-NAARM Alumnus',
  '100,000+ Students & Growing',
  'Practical Training & Real-World Exposure',
  'Lifetime Access & Community Support',
  'Helping Farmers Become Agripreneurs',
];

export default function Courses() {
  return (
    <>
      <Navbar />

      <main className="bg-page-bg pt-28">
        <RevealSection className="max-w-6xl mx-auto px-6 text-center py-12">
          <h1 className="text-3xl lg:text-5xl font-extrabold mb-4">
            Our Popular Courses
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn in-demand agricultural skills from basics to advanced level.
          </p>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {courses.map((course) => (
              <div
                key={course.title}
                className="bg-white rounded-2xl shadow overflow-hidden transition-transform hover:-translate-y-2"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-36 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {course.description}
                  </p>
                  <a href="#" className="text-primary font-semibold text-sm">
                    View Course &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent font-semibold uppercase tracking-wide mb-2">
                About Agri Monk
              </p>
              <h2 className="text-3xl font-extrabold mb-6">
                Why Choose Agri Monk?
              </h2>
              <ul className="space-y-3 text-gray-600">
                {WHY_CHOOSE_POINTS.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="text-accent font-bold">&#10003;</span>
                    {point}
                  </li>
                ))}
              </ul>
              <Button as="a" href="#" variant="primary" className="mt-8">
                Know Our Story
              </Button>
            </div>

            <div className="bg-white rounded-2xl shadow p-8 grid grid-cols-2 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-primary">
                  <CountUp end={100} suffix="K+" />
                </h3>
                <p className="text-gray-500 text-sm">Happy Students</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary">
                  <CountUp end={250} suffix="+" />
                </h3>
                <p className="text-gray-500 text-sm">Expert Videos</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary">
                  <CountUp end={35} suffix="+" />
                </h3>
                <p className="text-gray-500 text-sm">Courses</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary">
                  <CountUp end={12} suffix="+" />
                </h3>
                <p className="text-gray-500 text-sm">States Reached</p>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection className="bg-founder-bg py-10">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center text-white text-sm font-medium">
            {TRUST_BADGES.map((badge) => (
              <p key={badge}>{badge}</p>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-extrabold text-center mb-10">
            What Our Learners Say
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl shadow p-6"
              >
                <p className="text-accent mb-3">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
                <p className="text-gray-600 italic mb-4">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-extrabold mb-10">
            Agri Insights &amp; Knowledge
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.title}
                className="bg-white rounded-2xl shadow overflow-hidden transition-transform hover:-translate-y-2"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-5">
                  <p className="text-accent text-xs font-semibold mb-1">
                    {post.category} &middot; {post.date}
                  </p>
                  <h3 className="font-bold mb-3">{post.title}</h3>
                  <a href="#" className="text-primary font-semibold text-sm">
                    Read More &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection className="bg-primary text-white py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl lg:text-3xl font-extrabold mb-3">
              Stay Updated with Agri Monk
            </h2>
            <p className="text-white/80 mb-6">
              Join our community and get the latest farming tips, courses,
              offers and agri news.
            </p>
            <form
              className="flex flex-wrap justify-center gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-5 py-3 rounded-xl text-gray-900 w-full sm:w-auto sm:min-w-[300px]"
              />
              <button
                type="submit"
                className="bg-white text-primary font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-transform hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
          </div>
        </RevealSection>
      </main>

      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx react-scripts test src/pages/Courses.test.js --watchAll=false`
Expected: PASS (3 tests).

- [ ] **Step 6: Commit**

```bash
git add src/pages/Courses.js src/pages/Courses.test.js src/data/courses.js src/data/testimonials.js src/data/blogPosts.js
git commit -m "Add Courses page"
```

---

## Task 9: Wire up routing in App.js and remove CRA boilerplate

**Files:**
- Modify: `src/App.js`
- Modify: `src/App.test.js`
- Delete: `src/App.css`
- Delete: `src/logo.svg`
- Delete: `src/reportWebVitals.js` (only if unused after this task — check Step 1 first)
- Modify: `src/index.js`

**Interfaces:**
- Consumes: `Home` (default export from `src/pages/Home.js`), `Courses` (default export from `src/pages/Courses.js`).
- Produces: default-exported `App` component that renders a `BrowserRouter` with routes `/` → `Home` and `/courses` → `Courses`.

- [ ] **Step 1: Check whether reportWebVitals is still referenced**

Run: `grep -rn "reportWebVitals" src/`
Expected: matches in `src/index.js` and `src/reportWebVitals.js` itself. Decision: keep `src/reportWebVitals.js` and its call in `src/index.js` as-is — it's CRA's standard perf-measurement hook, unrelated to this feature, no reason to remove it. Do not delete this file.

- [ ] **Step 2: Write the failing test for App routing**

Replace the full contents of `src/App.test.js`:

```js
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

beforeEach(() => {
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
});

test('renders the Home page at the root route', () => {
  window.history.pushState({}, '', '/');
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /we make agriculture cool/i })
  ).toBeInTheDocument();
});

test('renders the Courses page at /courses', () => {
  window.history.pushState({}, '', '/courses');
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /our popular courses/i })
  ).toBeInTheDocument();
});
```

Note: this test renders `<App />` directly (no wrapping `MemoryRouter`) because `App` itself will own the `BrowserRouter` — `BrowserRouter` reads from `window.history`, which is why the test pushes state before rendering. The unused `MemoryRouter` import above is removed in the next step's file — omit it entirely; only import `render, screen` from testing-library.

Correct the test file's imports (final version, replacing the draft above):

```js
import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
});

test('renders the Home page at the root route', () => {
  window.history.pushState({}, '', '/');
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /we make agriculture cool/i })
  ).toBeInTheDocument();
});

test('renders the Courses page at /courses', () => {
  window.history.pushState({}, '', '/courses');
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /our popular courses/i })
  ).toBeInTheDocument();
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx react-scripts test src/App.test.js --watchAll=false`
Expected: FAIL — old `App.test.js` assertion (`/learn react/i`) no longer matches the new `App.js` content (still the CRA boilerplate at this point), since we haven't changed `App.js` yet.

- [ ] **Step 4: Implement App.js with routing**

Replace the full contents of `src/App.js`:

```js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Courses from './pages/Courses';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </BrowserRouter>
  );
}
```

- [ ] **Step 5: Delete unused CRA boilerplate files**

Run:
```bash
rm src/App.css src/logo.svg
```

Expected: no remaining imports of these files anywhere. Verify with:
```bash
grep -rn "App.css\|logo.svg" src/
```
Expected: no output (both were only referenced from the old `src/App.js`, now rewritten).

- [ ] **Step 6: Run test to verify it passes**

Run: `npx react-scripts test src/App.test.js --watchAll=false`
Expected: PASS (2 tests).

- [ ] **Step 7: Run the full test suite**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: all test files pass (App, Home, Courses, useInView, CountUp).

- [ ] **Step 8: Commit**

```bash
git add src/App.js src/App.test.js
git rm src/App.css src/logo.svg
git commit -m "Wire up routing between Home and Courses pages"
```

---

## Task 10: Final build verification and manual browser check

**Files:** None (verification only).

- [ ] **Step 1: Run the full test suite one more time**

Run: `CI=true npx react-scripts test --watchAll=false`
Expected: all tests pass, 0 failures.

- [ ] **Step 2: Run a production build**

Run: `CI=true npm run build`
Expected: exit code 0, no warnings about missing modules or broken imports.

- [ ] **Step 3: Start the dev server and manually verify both pages in a browser**

Run: `npm start` (runs in foreground; open `http://localhost:3000` in a browser)

Manually check:
- Home (`/`) shows Hero, Stats, About, Services, Who We Work With, Founder, CTA, Footer in that order, styled with the green palette and Poppins font, matching the founder mockup image's overall structure.
- Clicking "Explore Courses" or the "Courses" nav link navigates to `/courses`.
- On `/courses`, all listed sections render, with 5 course cards, 3 testimonials, 4 blog posts, and a newsletter band.
- Clicking "About"/"Services"/"Contact" in the nav from the Courses page navigates back to `/` and smooth-scrolls to the right section.
- Resize the browser to a mobile width (~375px) and confirm the nav collapses to a hamburger, and grids stack to 1 column.
- Scroll down Home and Courses slowly and confirm sections fade/slide in, and stat numbers count up once each stat block scrolls into view.

Stop the dev server (Ctrl+C) once verified.

- [ ] **Step 4: No commit for this task** — verification only, no file changes.

---

## Self-Review Notes

- **Spec coverage:** every section in the spec's Home and Courses page breakdown has a corresponding task (Tasks 6–8); Navbar/Footer/Button/theme setup (Tasks 1–2, 5); animations (Tasks 2–4); routing (Task 9); manual verification against the spec's testing/error-handling sections (Task 10).
- **Placeholder scan:** no TBD/TODO; every code block is complete, runnable code — no "similar to Task N" shortcuts.
- **Type/naming consistency:** `useInView` returns `{ ref, isInView }` consistently across `RevealSection` (Task 3) and `CountUp` (Task 4); `Button` prop shape (`as`, `to`, `href`, `variant`, `className`, `onClick`) is identical everywhere it's used (Navbar, Home, Courses); data file export names (`aboutCards`, `services`, `workWithCards`, `founderCredentials`, `courses`, `testimonials`, `blogPosts`) match their import statements in the consuming page files exactly.
