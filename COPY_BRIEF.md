# Fauran Waitlist — Copy Brief

Every claim below is grounded in `fauran_prd.pdf`. No invented product facts. Missing contact
details are the literal string `[PLACEHOLDER]` (grep-able).

**Brand:** Fauran · tagline **"Ab Kam Hoga, Fauran"** (Urdu — *fauran* = "at once / immediately").
**Voice:** direct, local, trustworthy, no hype verbs ("elevate/seamless/unleash" banned). One
register: plain confident marketing.

### 1 · Hero
- Eyebrow: `Lahore & Islamabad · Coming soon` (PRD launch scope).
- H1: **"Name your need. Pros bid. Ab kam hoga, fauran."** (≤ 2 lines; the bidding wedge.)
- Sub (≤ 20 words): "Post any home or repair job. Verified pros nearby bid their price and arrival
  time. You pick. You pay cash, direct."
- Primary CTA: **Join the waitlist** (single intent, reused everywhere). Field: phone number.
- Phone carousel: 4 PRD-accurate screens — Post a job → Incoming bids → Pro on the way → Confirm
  with code. Built as UI, not the divergent app screenshots.

### 2 · Problem (PRD §01 "The problem")
"Finding a trustworthy plumber, electrician, or AC technician is slow, informal, and opaque." Three
concise pains: no price transparency, no recourse if work is poor, pros undercut by middlemen.

### 3 · Solution — post → bid → book (PRD §01 solution, §06 hirer loop)
Four steps: **Post** what you need (location + photos) → **Compare bids** (price, arrival time,
rating, distance, verified badge) → **Negotiate & book** in chat, price locks on accept → **Confirm
& pay** with a 4-digit code, cash direct to the pro.

### 4 · Features (locked product decisions)
- Proximity matching — pros near you (PostGIS/ST_DWithin, phrased for users: "only pros in your
  area see your job").
- Real bidding, not fixed menus — "you name the need, pros compete on price" (the wedge).
- Ratings & two-way reviews build on-platform trust.
- Skilled trades: Plumber, Electrician, AC technician, Carpenter, Painter, Handyman (PRD categories).
- Chat unlocks after a bid; numbers hidden until you book.

### 5 · Trust (explicit, prominent) — PRD §02, §09, hirer loop
- **CNIC + selfie verification.** Every professional is manually reviewed before they can bid.
- **Cash, paid directly.** "Fauran never touches your cash. You pay the pro directly" (verbatim PRD).
- **Prepaid wallet (pro side).** Pros pre-fund a small commission wallet; the fee leaves *their*
  wallet at acceptance — so your cash price is the whole price, no platform cut added to you.
- Verified badge is the glass hero of this section.

### 6 · Waitlist form
- Primary field: **phone number** (`+92`, PK format), label above, `inputmode="tel"`.
- Optional: city select (Lahore / Islamabad / Other) + role (I want to hire / I want to work).
- Honeypot hidden field + client validation + time-to-submit check. Success/empty/error states.
- Microcopy: "No spam. One text when we launch in your city."

### 7 · FAQ (accordion, collapsed) — all PRD-grounded
1. What is Fauran? 2. How is this different from other home-services apps? (bidding wedge)
3. Is it free for customers? (yes; pros pay a small commission) 4. How do I pay? (cash, direct;
4-digit code to close) 5. Are the professionals verified? (CNIC + selfie) 6. When does it launch?
(Lahore & Islamabad first; waitlist for your city).

### 8 · Footer
Logo + tagline · nav anchors · `Contact: [PLACEHOLDER]` · social `[PLACEHOLDER]` ·
`Privacy [PLACEHOLDER]` · `Terms [PLACEHOLDER]` · company/registration `[PLACEHOLDER]` ·
`© 2026 Fauran`.

### Placeholder register (grep `[PLACEHOLDER]`)
contact email · support phone · Instagram · Facebook/X · WhatsApp · privacy URL · terms URL ·
company registration line · OG image raster (`assets/og.png`) · Firebase config values.
