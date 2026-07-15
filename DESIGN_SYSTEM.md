# Fauran — Design System

The single source of truth for the Fauran waitlist site. Every value here is expressed as a CSS
custom property in `styles.css` under `:root`. **No section may introduce an ad-hoc hex value or a
one-off shadow.** If a new token is needed, add it here first, then to `styles.css`.

> Design read: mobile-first consumer-marketplace waitlist landing for Pakistani users on mid-range
> Android and metered data. Language: **warm-trust + fresh-utility** — neomorphism (soft carved
> porcelain) fused with a *restrained* liquid-glass layer, resolved into a bespoke
> **sage-porcelain / forest-green** identity. Not generic glassmorphism, not an AI-purple template.

**Dials:** `DESIGN_VARIANCE 6` · `MOTION_INTENSITY 5` · `VISUAL_DENSITY 4`.
Motion is CSS-transform/opacity only (no GSAP, no scroll-hijack) — the performance budget for
mid-range Android is non-negotiable.

---

## 1. Color

One accent only: **Fauran green**. Everything else is a warm sage-porcelain neutral ramp plus a
single semantic rating gold. The page is theme-locked to a single **light** palette (dark mode and
the toggle were removed per product decision). No section inverts mid-page.

### Light theme (default)
| Token | Value | Role |
|---|---|---|
| `--bg` | `#e8ece3` | Page + neomorphic base (surface == bg so elements carve from it) |
| `--surface-2` | `#eef1ea` | Slightly lifted panels |
| `--ink` | `#16241b` | Headings (contrast on `--bg` ≈ 13:1) |
| `--body` | `#3f4c43` | Body copy (≈ 8:1) |
| `--muted` | `#5b6961` | Secondary/meta text (≥ 4.5:1) |
| `--line` | `#d3d9cd` | Hairline dividers |
| `--cta` | `#157a43` | Primary button fill — white text = **5.4:1** (AA body) |
| `--cta-hover` | `#11663a` | Primary button pressed/hover |
| `--accent` | `#268c4b` | Brand green for icons, marks, focus rings, borders (3.55:1 on `--bg`) |
| `--accent-ink` | `#146b3b` | Green **text** only — eyebrow, hero accent word, verified tag, step no. (5.5:1) |
| `--accent-500` | `#3aa961` | Logo green — decorative accents only |
| `--accent-soft` | `rgba(47,158,87,0.12)` | Tinted chip / icon wells |
| `--star` | `#e0a63c` | **Semantic** rating gold — used ONLY for review stars, identically everywhere |
| `--danger` | `#b4442f` | Inline form error text (≥ 4.5:1 on surfaces) |

### Theme lock
The site ships **light-only**. There is no dark palette and no theme toggle (`color-scheme: light`).
The page is locked to the light palette above; no section inverts mid-page.

Rules: no pure `#000`/`#fff` as surfaces. Contrast targets: AA (4.5:1) for body, ≥ 3:1 for large
display, verified for every pair (see the README verification note).

---

## 2. Typography

Zero web-font bytes by default — the metered-data constraint makes a **system stack** the correct,
CLS-free choice (the display face is an optional progressive upgrade, see below). Character comes
from scale, weight contrast, and tight tracking, not a downloaded typeface.

| Token | Stack | Use |
|---|---|---|
| `--font-display` | `"Bricolage Grotesque","Space Grotesk", system-ui, "Segoe UI", Roboto, sans-serif` | Headlines, hero |
| `--font-body` | `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | Everything else |
| `--font-mono` | `"Geist Mono", ui-monospace, "SF Mono", "Cascadia Code", Menlo, monospace` | Prices, completion code |

**Optional upgrade:** dropping `Bricolage-Grotesque.woff2` into `/assets/fonts/` and un-commenting
the `@font-face` block in `styles.css` upgrades display headings automatically. It uses
`size-adjust` tuned to the fallback so there is **no CLS** on swap. Ship default = system stack.

### Type scale (fluid, `clamp()`)
| Token | clamp | ~375px → ~1280px |
|---|---|---|
| `--fs-display` | `clamp(2.5rem, 7.5vw + 0.5rem, 4.75rem)` | 40 → 76px (hero H1, ≤ 2 lines) |
| `--fs-h2` | `clamp(1.75rem, 3.5vw + 0.75rem, 2.75rem)` | 28 → 44px |
| `--fs-h3` | `clamp(1.15rem, 1.2vw + 0.85rem, 1.4rem)` | 18 → 22px |
| `--fs-body` | `clamp(1rem, 0.4vw + 0.9rem, 1.0625rem)` | 16 → 17px |
| `--fs-sm` | `0.875rem` | 14px |
| `--fs-xs` | `0.75rem` | 12px (eyebrows, meta) |

Display tracking `-0.02em`, leading `1.05`. Body leading `1.6`, `max-width: 62ch`.

---

## 3. Spacing & layout

8px base scale: `--sp-1:4px --sp-2:8px --sp-3:12px --sp-4:16px --sp-5:24px --sp-6:32px --sp-7:48px
--sp-8:64px --sp-9:96px`.

- Section rhythm: `padding-block: clamp(3.5rem, 8vw, 6rem)` (VISUAL_DENSITY 4).
- Content container: `--maxw: 1120px`, `margin-inline:auto`, `padding-inline: clamp(1.25rem, 5vw, 2.5rem)`.
- Breakpoints: 375 (base) · 640 (`sm`) · 1024 (`lg`) · 1280 (`xl`). Design 375-first; every
  multi-column block collapses to a single column below 640.

## 4. Radius (shape lock)

One documented rule, applied everywhere: **buttons/chips = pill; surfaces/cards = 24px; inputs = 14px.**
`--r-pill:999px --r-lg:24px --r-md:16px --r-sm:14px`.

## 5. Neomorphism recipe

Soft-UI carved from the porcelain base. Because bg == surface, raised elements use a dark tint +
light tint dual shadow; pressed/inputs invert to inset.

```
--neo-dark: (light) #c6ccbf  ·  (dark) #0f130f     /* darker tint of base   */
--neo-light:(light) #fbfef5  ·  (dark) #23291f     /* lighter tint of base  */

--neo-raised:  6px 6px 14px var(--neo-dark), -6px -6px 14px var(--neo-light);
--neo-raised-sm: 4px 4px 9px var(--neo-dark), -4px -4px 9px var(--neo-light);
--neo-inset:  inset 4px 4px 9px var(--neo-dark), inset -4px -4px 9px var(--neo-light);
--neo-press:  inset 3px 3px 7px var(--neo-dark), inset -3px -3px 7px var(--neo-light);
```
Shadows are tinted to the surface hue (never pure black). Used sparingly on primary cards, the
phone frame, form inputs, and buttons — not on every element (perf + hierarchy).

## 6. Liquid-glass recipe (rationed)

Glass earns its blur in exactly **three** places: the top nav, the sticky mobile CTA bar, and the
Trust "verified" badge. Nowhere else. Approximation of Apple's material (not an official package):

```
--glass-bg:     (light) rgba(240,244,236,0.62) · (dark) rgba(26,32,27,0.55)
--glass-border: (light) rgba(255,255,255,0.55) · (dark) rgba(255,255,255,0.10)
--glass-blur:   blur(16px) saturate(160%);
--glass-inset:  inset 0 1px 0 rgba(255,255,255,0.45);   /* edge refraction */
```
`@media (prefers-reduced-transparency: reduce)` and no-`backdrop-filter` fallback → solid
`--surface-2` fill. Blur radius capped at 16px; never stacked on scrolling containers.

## 7. Motion

`--ease: cubic-bezier(0.16,1,0.3,1)` · `--dur: 0.5s` · spring-ish for interaction.
- Hero: staggered rise-in on load (opacity + translateY), `animation-delay` cascade.
- Scroll-reveal: `IntersectionObserver` adds `.in` → transform/opacity transition. **No**
  `scroll` listeners, no parallax, no scroll-hijack.
- Buttons: `:active { transform: translateY(1px) scale(0.99) }` + shadow → inset (physical press).
- Phone carousel: opacity crossfade, 3.2s auto-advance, pause on hover/focus/hidden tab.
- **All** motion collapses to static under `prefers-reduced-motion: reduce` (CSS + JS guarded).
- Animate only `transform`/`opacity`. `will-change` only on the phone stack + reveal targets.

## 8. Component inventory
Neo-card · Neo-button (primary CTA / ghost) · Neo-input + label-above + inline error · Chip ·
Glass-nav · Glass sticky-CTA · Glass verified-badge · Phone frame + screen carousel · Step node ·
Feature tile · FAQ accordion (`<details>`).

## 9. Product-truth note (READ BEFORE EDITING COPY)
All site copy is grounded in **`fauran_prd.pdf`** (the authoritative PRD): post → bid → book,
**fixed-price** bids, **cash paid directly** to the pro, a **pro-side prepaid wallet** (≈7.5%
commission debited at acceptance, non-withdrawable fee credit), **manual CNIC + selfie**
verification, **4-digit completion code**. The Flutter prototype screenshots in `../fauran_photos/`
depict an *older, divergent* model (hourly rates + platform-held escrow + generic task categories)
and contain test data — they are intentionally **not** used on the site. If the app model becomes
canonical instead, this whole document and all copy must be revisited.
