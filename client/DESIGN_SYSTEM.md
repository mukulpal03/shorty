# Shorty Client — Design System

Context for agents and contributors working on UI in `client/`. Read this before adding or redesigning surfaces.

## Aesthetic direction

Shorty is a URL shortener. The visual language is **URL-bar / path-segment / routing registry** — not generic SaaS cards.

**Signature motifs:**

- Monospace path segments (`/features`, `GET shorty.co/slug`)
- Floating pill navbar over a dot-grid canvas
- Terminal-style command bars (`$ shorty paste <url>`)
- Signal orange accent on warm off-white canvas
- IBM Plex Mono for data, routes, labels, CTAs; Geist for headings and body

Avoid default AI-SaaS patterns: centered hero + stat grid + identical 3-column feature cards + cream/serif/terracotta defaults.

For new marketing UI, follow `.agents/skills/frontend-design/SKILL.md` and extend this system — do not introduce a third visual language.

---

## Three-layer stack

Use the right tool for each job. Do **not** collapse everything into one layer.

| Layer | Purpose | Where |
|-------|---------|--------|
| **Tailwind** | Layout, spacing, responsive breakpoints, flex/grid | `className` on any component |
| **shadcn / Radix** | Accessible app primitives — forms, dialogs, toasts | `src/components/ui/*`, dashboard dialogs |
| **Shorty CSS** | Brand-specific marketing & shell patterns | `src/styles/shorty-ui.css`, `src/components/layout/navbar.css` |

### When to use what

| Task | Use |
|------|-----|
| Section padding, grid columns, `hidden md:flex` | Tailwind |
| Create/Edit/Delete URL dialogs, inputs, labels | shadcn `Dialog`, `Input`, `Label`, `Button` |
| Landing hero, features bento, pipeline steps, pricing, CTA | Shorty classes in `shorty-ui.css` |
| Navbar, nav links, mobile menu | `navbar.css` + `NavbarShell` |
| Dashboard link table, empty states | `shorty-registry`, `shorty-empty-state` |
| Clerk sign-in/sign-up pages | Clerk components + minimal Tailwind wrapper (no Shorty shell required) |

### What not to do

- Do not build new marketing sections from shadcn `Card` + `Badge` grids.
- Do not add large bespoke CSS files for one-off buttons — use `shorty-cta` / `shorty-ghost-btn` or shadcn `Button` in forms.
- Do not set `display` in custom CSS on elements that also use Tailwind visibility utilities (caused hamburger menu bug). Prefer media queries in CSS or Tailwind alone, not both fighting.
- Do not make the navbar `sticky` without explicit request — it is **floating in document flow** (`relative`).

---

## Scoping: the `shorty-app` wrapper

Marketing and dashboard pages wrap content in:

```tsx
<div className="shorty-app min-h-svh">
```

This activates Shorty tokens and canvas background. Import styles once per page entry:

```tsx
import "@/styles/shorty-ui.css"
```

Used in: `LandingPage.tsx`, `DashboardPage.tsx`.

Navbar CSS is imported by `NavbarShell.tsx` (`navbar.css`). Inside `.shorty-app`, navbar tokens sync from `--shorty-*`.

---

## Design tokens

Defined on `.shorty-app` in `src/styles/shorty-ui.css`:

| Token | Role |
|-------|------|
| `--shorty-mono` | IBM Plex Mono stack |
| `--shorty-signal` | Orange accent (links, eyebrows, active states) |
| `--shorty-signal-soft` | Tinted backgrounds |
| `--shorty-ink` | Primary text, dark CTAs |
| `--shorty-muted` | Secondary text |
| `--shorty-wire` | Borders, dividers |
| `--shorty-surface` | Card/panel fill |
| `--shorty-canvas` | Page background |
| `--shorty-shadow` | Panel elevation |

**In components today**, colors are often written as:

```tsx
className="text-[color:var(--shorty-muted)]"
```

**Preferred future style** (not yet in `@theme`): extend `index.css` so Tailwind exposes `text-shorty-muted`, etc., and align shadcn `--primary` / `--background` with these tokens.

### shadcn tokens (`src/index.css`)

Separate system: `--background`, `--foreground`, `--primary`, `--muted`, `--border`, etc. Still used by `Button`, `Dialog`, `Input` in dashboard forms. Visually close but not identical to Shorty tokens — dashboard action buttons sometimes override shadcn with Shorty colors via `className`.

---

## Typography

| Role | Font | Classes |
|------|------|---------|
| Headings | Geist (via `font-sans`) | `shorty-heading` |
| Body / descriptions | Geist | `shorty-lead`, default body |
| Routes, slugs, CTAs, labels | IBM Plex Mono | `shorty-mono`, `navbar-*`, component BEM |

**Eyebrow labels** (section prefixes): `shorty-eyebrow` — renders `// LABEL` in mono with orange `//`.

---

## Layout primitives

| Class | Purpose |
|-------|---------|
| `shorty-section` | Vertical section padding (`clamp`) |
| `shorty-container` | Max-width 72rem, horizontal padding |
| `shorty-panel` | Generic elevated surface (border + shadow) |
| `shorty-mesh-bg` | Dot grid + warm gradient (hero atmosphere) |
| `shorty-mesh-bg--landing-top` | Mesh behind navbar + hero only |
| `shorty-landing-top` | Wrapper for navbar + hero with shared mesh |

---

## Actions & chips

| Class | Use |
|-------|-----|
| `shorty-cta` | Primary pill CTA (ink bg, mono text) — links on landing |
| `shorty-ghost-btn` | Secondary outlined pill |
| `shorty-chip` | Small feature badges in hero |

Navbar equivalents: `navbar-cta`, `navbar-ghost` (same idea, scoped to navbar).

Dashboard primary actions still use shadcn `Button` with Shorty-colored overrides — acceptable for form triggers.

---

## Section patterns

### Section header

Component: `src/components/common/SectionHeader.tsx`

```tsx
<SectionHeader
  eyebrow="features"
  title="..."
  description="..."
/>
```

Uses `shorty-eyebrow`, `shorty-heading`, `shorty-lead`.

### Hero

`HeroSection.tsx` — split grid, eyebrow, chips, `shorty-cta` / `shorty-ghost-btn`, `UrlShortenerMockup`.

### Features (bento + route strips)

`FeaturesSection.tsx` + classes:

- `shorty-feature-grid` — responsive bento grid
- `shorty-feature-card` — card shell
- `shorty-feature-card--hero` — first item spans 2×2 on `lg`
- `shorty-feature-card__route` — `GET` + `domain/slug` bar
- `shorty-feature-card__body`, `__title`, `__desc`, `__icon`

### How it works (redirect pipeline)

`HowItWorksSection.tsx` + classes:

- `shorty-flow` / `shorty-flow__item` — 3-column pipeline with connecting line on `md+`
- `shorty-step-card` — step card
- `shorty-step-card__cmd` — `$ shorty <command>` bar
- `shorty-step-card__preview` — mono input/output/redirect preview strip

Step metadata (commands, previews) lives in the component — not in `constants/landing.ts`.

### Pricing

`PricingSection.tsx` — `shorty-plan-card`, `shorty-plan-card__badge`, path slug `/plan-name`, `shorty-cta` / `shorty-ghost-btn`.

### CTA

`CtaSection.tsx` — `shorty-terminal` window chrome + CTAs inside.

### URL mockup

`UrlShortenerMockup.tsx` — `shorty-terminal`, `shorty-url-field`, `shorty-url-field--output`.

---

## Navbar

**Files:** `NavbarShell.tsx`, `Navbar.tsx`, `DashboardNavbar.tsx`, `NavbarPathLink.tsx`, `navbar.css`

**Behavior:**

- Floating pill (`navbar-bar`), **not sticky** — scrolls with page
- Transparent background inside `.shorty-app` (shadow only)
- Logo: text only in navbar (`<Logo showIcon={false} />`)
- Nav links: `NavbarPathLink` → `navbar-path` with auto `/` prefix
- Mobile: hamburger visible only `≤767px` (CSS media query on `.navbar-menu-btn`, not Tailwind alone)
- Layout: logo left; `navbar-actions` with `ml-auto` for CTA + menu right

**Dashboard navbar** adds `navbar-status` (“live”) and path links for home/dashboard.

---

## Dashboard

**Files:** `DashboardPage.tsx`, `DashboardHeader.tsx`, `ShortUrlList.tsx`

| Pattern | Classes |
|---------|---------|
| Page shell | `shorty-app`, `shorty-container` |
| Section intro | `shorty-eyebrow`, `shorty-heading` |
| Link table | `shorty-registry` (custom `<table>`, not shadcn `Table` in production list) |
| Empty / error | `shorty-empty-state`, `shorty-empty-state__icon` |
| Row link text | `shorty-link-cell`, `shorty-muted-cell` |

**Dialogs** (`CreateUrlDialog`, `EditUrlDialog`, `DeleteUrlDialog`): shadcn `Dialog` + `Input` + `Button` — functionality lives here; styling still default shadcn. Safe to add `className` to `DialogContent` to match Shorty later.

---

## File map

```
src/
├── index.css                 # Tailwind + shadcn global tokens (Geist)
├── styles/
│   └── shorty-ui.css         # Shorty design system (marketing + dashboard shell)
├── components/
│   ├── layout/
│   │   ├── navbar.css
│   │   ├── NavbarShell.tsx   # Shared navbar chrome
│   │   ├── Navbar.tsx        # Landing nav
│   │   ├── DashboardNavbar.tsx
│   │   ├── NavbarPathLink.tsx
│   │   └── Footer.tsx
│   ├── landing/              # Marketing sections (Shorty CSS)
│   ├── dashboard/            # App UI (Shorty shell + shadcn forms)
│   ├── common/
│   │   ├── SectionHeader.tsx
│   │   ├── GridBackground.tsx
│   │   └── Logo.tsx          # showIcon prop; icon hidden in navbar
│   └── ui/                   # shadcn primitives — do not redesign for marketing
└── constants/
    └── landing.ts            # Copy + data (SITE, FEATURES, STEPS, PLANS, NAV_LINKS)
```

---

## Content & copy conventions

- Landing CTAs and nav: **lowercase mono** (`get started`, `log in`, `/features`)
- Section eyebrows: lowercase (`features`, `how it works`)
- `SITE.domain` from `constants/landing.ts` for URL previews (`localhost:3000` in dev)
- Slugs: `title.toLowerCase().replace(/\s+/g, "-")`

---

## Accessibility

- `prefers-reduced-motion`: transforms disabled on `shorty-cta`, feature cards, step cards
- Navbar mobile menu: `aria-expanded`, Escape to close, `aria-label` on menu button
- Focus rings: `shorty-cta` / `navbar-path` use `--shorty-signal` outline
- Decorative mesh: `aria-hidden` on `GridBackground`

---

## Adding new UI (checklist)

1. **Marketing section?** → Add under `components/landing/`, use `shorty-section` + `shorty-container`, reuse `SectionHeader`.
2. **New card pattern?** → Add BEM classes to `shorty-ui.css`; keep one clear metaphor (route bar, terminal, registry row).
3. **Form or modal?** → shadcn in `components/ui` or `components/dashboard`.
4. **Layout only?** → Tailwind utilities; avoid new CSS.
5. **Wrap page** in `shorty-app` if it should match landing/dashboard look.
6. **Do not** reintroduce removed sections (e.g. stats bar) unless explicitly requested.

---

## Known gaps / future work

- [ ] Map `--shorty-*` into Tailwind `@theme` in `index.css` for `text-shorty-muted` etc.
- [ ] Align shadcn CSS variables with Shorty brand tokens
- [ ] Style dashboard dialogs to match terminal/route aesthetic
- [ ] Remove unused shadcn components if confirmed dead (`navigation-menu`, `item`, `card` on landing)
- [ ] Consolidate duplicate IBM Plex Mono `@import` (both `shorty-ui.css` and `navbar.css`)

---

## Quick reference: class → purpose

| Class | Purpose |
|-------|---------|
| `shorty-app` | Page root, tokens + canvas |
| `shorty-eyebrow` | `// section` label |
| `shorty-heading` | Display heading |
| `shorty-lead` | Section description |
| `shorty-cta` | Primary marketing button/link |
| `shorty-ghost-btn` | Secondary marketing button/link |
| `shorty-feature-card*` | Features bento |
| `shorty-step-card*` | How-it-works pipeline |
| `shorty-plan-card*` | Pricing tiers |
| `shorty-terminal*` | Window chrome (mockup, CTA) |
| `shorty-url-field*` | URL input/output rows |
| `shorty-registry` | Dashboard links table |
| `navbar-bar` | Floating navbar pill |
| `navbar-path` | Nav link as `/segment` |
