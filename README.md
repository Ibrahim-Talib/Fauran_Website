# Fauran — waitlist site

A single-page marketing/waitlist site for **Fauran** (Ab Kam Hoga, Fauran), a bid-and-book
marketplace for verified home services in Lahore & Islamabad. Static, **no build step** — plain
HTML + CSS + vanilla JS. The only backend touch is one Firestore write, isolated in `waitlist.js`.

## Run locally

No install, no bundler. Serve the folder with anything static:

```bash
python -m http.server 8080          # then open http://localhost:8080
# or
npx serve .
# or just open index.html (the Firebase write needs a server + config to succeed)
```

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole page (8 sections) + inline UI JS (theme-free) |
| `styles.css` | Design system + all styles (see `DESIGN_SYSTEM.md`) |
| `waitlist.js` | **Single backend swap point.** Only file that imports Firebase (firestore/lite, lazy from CDN). Swap its body for Supabase later. |
| `firebase-config.example.js` | Config template. Copy to `firebase-config.js` (git-ignored) for local dev. |
| `firestore.rules` | Create-only rules for `waitlist_signups`; deny everything else. |
| `firebase.json` | Firebase Hosting + Firestore config. |
| `robots.txt`, `sitemap.xml` | SEO. |
| `DESIGN_SYSTEM.md`, `COPY_BRIEF.md` | Design tokens & PRD-grounded copy (not deployed). |
| `assets/fauran-logo.svg` | Logo (favicon + brand mark). |

## Firebase config (no secrets committed)

`waitlist.js` resolves config at runtime:

1. **`GET /__/firebase/init.json`** — auto-provided when hosted on Firebase Hosting. Preferred;
   nothing to commit. Reuses the **existing** Firebase project.
2. **`window.FIREBASE_CONFIG`** — fallback for local dev / other hosts. Copy
   `firebase-config.example.js` → `firebase-config.js`, fill real values, and add
   `<script src="firebase-config.js"></script>` in `<head>` before the `waitlist.js` module tag.

## Deploy

```bash
firebase login
firebase use <existing-fauran-project-id>     # REUSE the existing project
firebase deploy --only firestore:rules        # (see ⚠ below) then:
firebase deploy --only hosting
```

> ⚠ **Rules deploy replaces the project's whole Firestore ruleset.** Per the PRD the app uses
> Supabase for data and Firebase only for FCM push, so Firestore is not the app datastore and a
> deny-all-except-`waitlist_signups` ruleset is safe. Confirm that's still true before deploying
> rules to a shared project. Hosting-only deploys are always safe.

## Data written

Collection `waitlist_signups`, one doc per signup, shape kept in lockstep with `firestore.rules`:

```
{ phone: "+923XXXXXXXXX", city: "lahore"|"islamabad"|"other"|"",
  role: "hirer"|"pro"|"", source: "hero"|"main", createdAt: <serverTimestamp> }
```

Bot protection: honeypot field + minimum fill-time check (client), strict field validation (rules).
For production, also enable **Firebase App Check** (see pre-launch below).

## `[PLACEHOLDER]` register (grep before launch)

`grep -rn "\[PLACEHOLDER\]" .` — every one must be filled or removed before launch:

- **Footer** contact email · support phone · Instagram · Facebook links
- **Footer** company/registration line · Privacy URL · Terms URL
- **Firebase config** values (`firebase-config.example.js`, or via Hosting auto-init)
- **`assets/og.png`** — create a 1200×630 raster social-share image (referenced in `<head>`;
  currently a TODO, not a literal `[PLACEHOLDER]` string)
- **Production domain** — `fauran.pk` is a placeholder assumption used in `canonical`, OG/Twitter
  URLs, `sitemap.xml`, `robots.txt`. Confirm and replace everywhere if different.

## Pre-launch checklist

- [ ] Fill every `[PLACEHOLDER]` (grep above) and confirm the production domain.
- [ ] Create `assets/og.png` (1200×630) and confirm it loads.
- [ ] Provide Firebase config (Hosting auto-init or `firebase-config.js`).
- [ ] Test `firestore.rules` in the emulator (`firebase emulators:start` / rules unit tests) — a
      valid signup writes; reads/updates/deletes and malformed writes are denied.
- [ ] Enable **Firebase App Check** for Firestore (real bot defense beyond honeypot).
- [ ] Run Lighthouse (mobile) and confirm Perf / A11y / SEO.

## Product-truth note

All copy is grounded in `../fauran_prd.pdf` (post → bid → book, fixed-price bids, cash paid direct,
pro-side prepaid-wallet commission, CNIC + selfie verification, 4-digit completion code). The Flutter
prototype screenshots in `../fauran_photos/` show an **older, divergent** model (hourly rates +
platform-held escrow + generic task categories) and are intentionally not used. If the app model
becomes canonical, revisit `DESIGN_SYSTEM.md`, `COPY_BRIEF.md`, and all copy.
