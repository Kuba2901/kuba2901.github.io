# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Jakub Nenczak Portfolio
**Generated:** 2026-08-18 18:46:19
**Category:** Portfolio/Personal
**Design Dials:** Variance 7/10 (Balanced / Modern) | Motion 5/10 (Standard) | Density 4/10 (Standard)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#18181B` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#3F3F46` | `--color-secondary` |
| On Secondary | `#FFFFFF` | `--color-on-secondary` |
| Accent/CTA | `#2563EB` | `--color-accent` |
| On Accent/CTA | `#FFFFFF` | `--color-on-accent` |
| Background | `#FAFAFA` | `--color-background` |
| Foreground | `#09090B` | `--color-foreground` |
| Card | `#FFFFFF` | `--color-card` |
| Card Foreground | `#09090B` | `--color-card-foreground` |
| Muted | `#E8ECF0` | `--color-muted` |
| Muted Foreground | `#475569` | `--color-muted-foreground` |
| Border | `#E4E4E7` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| On Destructive | `#FFFFFF` | `--color-on-destructive` |
| Ring | `#18181B` | `--color-ring` |

**Color Notes:** Monochrome + blue accent

### Typography

- **Heading Font:** Caveat
- **Body Font:** Quicksand
- **Mood:** handwritten, personal, friendly, casual, warm, charming
- **Google Fonts:** [Caveat + Quicksand](https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

*Density: 4/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #2563EB;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #18181B;
  border: 2px solid #18181B;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FAFAFA;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #18181B;
  outline: none;
  box-shadow: 0 0 0 3px #18181B20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Brutalism

**Keywords:** Raw, unpolished, stark, high contrast, plain text, default fonts, visible borders, asymmetric, anti-design

**Best For:** Design portfolios, artistic projects, counter-culture brands, editorial/media sites, tech blogs

**Key Effects:** No smooth transitions (instant), sharp corners (0px), bold typography (700+), visible grid, large blocks

### Page Pattern

**Pattern Name:** Scroll-Triggered Storytelling

- **Conversion Strategy:** Keep the narrative understandable without scroll-driven effects. Use progress indicator. Mobile: simplify animations. Keep DOM reading order complete; disable parallax and scroll-scrub under reduced motion. Pause scroll animation when offscreen or hidden and render each chapter in its final readable state under reduced motion.
- **CTA Placement:** End of each chapter (mini) + Final climax CTA
- **Section Order:** Intro hook > Chapter 1 (problem) > Chapter 2 (journey) > Chapter 3 (solution) > Climax CTA

---

## Motion

**Stagger List** (Standard) — Trigger: load or scroll | Duration: 300-450ms | Easing: `back.out(1.4)`

```js
gsap.from('.grid-item', { opacity: 0, scale: 0.92, y: 16, duration: 0.4, stagger: { each: 0.06, from: 'start', grid: 'auto' }, ease: 'back.out(1.4)' });
```

**Framework notes:** grid: 'auto' lets GSAP infer rows/columns from a CSS grid layout for a natural wave stagger; Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Combine with from: 'center' for a bento-grid layout to draw the eye inward first
- ❌ Don't use back.out on dense data tables; the overshoot reads as sloppy on informational UI
- ⚡ Group DOM writes; avoid interleaving layout reads (getBoundingClientRect) between staggered tweens

---

## Anti-Patterns (Do NOT Use)

- ❌ Corporate templates
- ❌ Generic layouts

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile

---

## As-Built Overrides (authoritative for this site)

The generated palette above (`#FAFAFA` ground, `#2563EB` accent, Inter/JetBrains) is the
category default. The shipped site deliberately departs from it. Where the two disagree,
**this section wins** — it matches `style.css`.

### Concept — "Datasheet"

The portfolio is laid out as a technical specification sheet: a graph-paper ground, hairline
rules, `§` section numbers, `FIG.` plates, and spec tables in place of prose blocks. The
reasoning: the content is systems work (an HTTP server, a raycaster, thread contention), and
the near-universal "dark terminal developer portfolio" makes that content look generic. A warm
paper stock reads as engineering documentation instead, and differentiates on sight.

### Palette

Light (`Paper`) is the default; dark (`Carbon`) follows the system and a manual toggle
(`localStorage.theme`). Every pair below is ≥ 4.5:1, verified in-browser.

| Token | Paper | Carbon | Notes |
|---|---|---|---|
| `--paper` | `#F1EFE9` | `#0E0F11` | warm stock, not white |
| `--paper-raised` | `#FAF9F5` | `#16181C` | figures, chips, cards |
| `--paper-sunk` | `#E7E4DC` | `#08090A` | diagram fills |
| `--ink` | `#14161A` | `#EDEBE6` | 15.75:1 / 16.1:1 |
| `--ink-soft` | `#3C4048` | `#C3C1BB` | 9.05:1 / 10.65:1 |
| `--ink-mute` | `#5F636B` | `#8B8D91` | 5.24:1 / 5.77:1 — do not lighten |
| `--accent` | `#C2320A` | `#FF6A3D` | 4.86:1 / 6.74:1 — **text-safe** |
| `--accent-mark` | `#E5430E` | `#FF6A3D` | rules, dots, arrowheads — **non-text only** |

### Typography

| Role | Family | Why |
|---|---|---|
| Display | Space Grotesk 700 | geometric with enough quirk to carry a 10rem name |
| Prose | IBM Plex Sans 400/500/600 | genuinely readable at 17px for the About/case-study copy |
| Data & labels | IBM Plex Mono 400/500 | spec tables, `§` numbers, figure captions, chips |

Mono labels never go below 12px. Body is 17px / 1.6.

### Motion

Vanilla `IntersectionObserver` + CSS transitions — no GSAP. Reveal is 620ms
`cubic-bezier(0.16,1,0.3,1)`, staggered by direct children at 70ms and **capped at 420ms** so
late items in a long list never feel stalled. The hero name uses a 900ms masked line-rise.
`prefers-reduced-motion: reduce` renders every final state immediately and kills the pulse.

### Rules that bit during build — keep them

- Grid and flex items default to `min-width: auto`. The diagram's `min-width: 480px` leaked
  through `.figure` and widened the whole document on mobile. `.figure`, `.figure__canvas`,
  `.plate__body` and `.plate__meta` all carry explicit `min-width: 0`.
- SVG `viewBox` origins are `-2 -2` so 1px strokes on the outer boxes are not half-clipped.
- The mobile drawer sits at `z-index: 105`, **below** the masthead (110), or it covers its own
  close button.
- `style.css` / `site.js` are linked with `?v=N`. Bump N on deploy or returning visitors get a
  stale stylesheet.

### Diagrams

Figures are hand-authored inline SVG (not Mermaid), stroked with `currentColor` and the accent
token so they re-theme for free and cost no JavaScript. Each one carries a full `aria-label`
describing the topology in prose.
