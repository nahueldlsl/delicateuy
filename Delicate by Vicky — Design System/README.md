# Delicate by Viky — Design System

> Pastelería artesanal · Buenos Aires-style cottage bakery · Spanish (rioplatense, voseo) · Warm, handcrafted, indulgent

A complete, opinionated brand and UI system for **Delicate by Viky**, a small-batch home bakery selling cookies (estilo New York), alfajores, cinnamon rolls, and tortas. The system is sized for a real-world operation: **up to ~100 orders per month**, served by a single-baker storefront with retiro / delivery flow plus a lightweight admin panel.

---

## 1. Brand at a glance

**Who:** Viky, a baker working at home producing artisanal sweets. The name "delicate" is lowercase and felt — handwritten, intimate, feminine. "by Viky" gives it personal authorship: this isn't a brand, it's *her*.

**What we sell:**
| Familia | Ejemplos |
|---|---|
| **Cookies estilo New York** | rellenas con dulce de leche, Nutella, chocolate blanco, Oreo |
| **Alfajores** | de maicena, chocolatados con grana |
| **Roles de canela** | clásicos, glaseados, con Oreo, con dulce de leche |
| **Tortas** | chocolate-merengue, cumple, especiales por encargo |
| **Cajas temáticas** | Día de la Madre, San Valentín, Navidad, regalos |

**How customers experience it:** Instagram-first. They see a photo, they want it. The website's job is to take that desire and turn it into an order — fast, visual, no friction. **Photos are the protagonist;** the chrome around them is quiet, warm, and gets out of the way.

**Operating constraints:**
- Volume cap: ~100 pedidos/mes — informs admin design (single-day kanban, no enterprise complexity needed)
- Pickup vs delivery — every order picks one
- Lead time on most items (not instant) — UI must communicate fechas de retiro

---

## 2. Sources & inputs

This system was built from the following materials provided by the owner:

- 10 product photographs (Instagram-style, square ~1080px) from `uploads/` — copied into `assets/products/` with descriptive filenames.
  - `cookie-ny-dulce-leche.jpg` — hero shot, halved cookie revealing dulce de leche center
  - `torta-chocolate-merengue.jpg` — chocolate cake with merengue and sprinkles, against pink/dusty rose wall
  - `caja-navidad.jpg`, `caja-alfajores-corazon.jpg`, `caja-san-valentin.jpg`, `caja-dia-madre.jpg` — themed gift boxes
  - `cajas-roles-canela.jpg`, `roles-oreo-dulce-leche.jpg` — cinnamon rolls
  - `canasta-cookies.jpg`, `canasta-cookies-nutella.jpg` — wicker market-basket lifestyle shots
- Owner brief specifying: minimalist, very visual, fast checkout (cart + retiro/delivery), warm/appetizing/clean, paleta tierra + chocolate + crema + acentos lila/rosa, tipografía moderna y amigable (Nunito / Poppins).
- The actual brand sticker is photographed in `roles-oreo-dulce-leche.jpg` and `caja-dia-madre.jpg` — **lilac disc with multicolor pastel sprinkles + white "delicate" wordmark + "by Viky" subline**. Reproduced in `assets/logo-sticker.svg`.

> No Figma, no codebase, and no live website were provided. All visual direction is extracted from photography + the brief.

---

## 3. Index

```
/
├── README.md                  ← you are here
├── SKILL.md                   ← agent skill manifest
├── colors_and_type.css        ← all design tokens + base typography
├── assets/
│   ├── logo-sticker.svg       ← circular brand mark (full sticker)
│   ├── logo-monogram.svg      ← horizontal wordmark
│   ├── pattern-vichy.svg      ← lilac gingham (packaging tissue)
│   ├── pattern-sprinkles.svg  ← scattered sprinkle pattern
│   └── products/              ← 10 product photos, renamed semantically
├── preview/                   ← Design System tab cards
└── ui_kits/
    ├── storefront/            ← customer site (browse → cart → retiro/delivery)
    └── admin/                 ← Viky's order management panel
```

---

## 4. Content fundamentals

### Voice
**Cálida, cercana, casera.** Viky is talking to a friend who's about to taste her cookies. We're proud of the product but never pretentious — no chef-speak, no "experiencia gastronómica."

### Language & casing
- **Idioma:** Spanish (Argentina). Use **voseo** ("¿querés?", "elegí", "sumá al carrito") — never tuteo. Never English in body copy.
- **Casing:** *Sentence case* everywhere — buttons, headings, nav. Lowercase is part of the brand (the logo itself is lowercase). **Never** ALL CAPS for emphasis; reserved only for `t-micro` labels (e.g. "RETIRO" / "DELIVERY" tags) and single-word category chips.
- **Wordmark:** always lowercase `delicate`. Never "Delicate" mid-sentence as the brand; in running copy use "Delicate by Viky" capitalized normally.

### Tone words
warm · honest · feminine · handmade · indulgent · personal · *not* corporate · *not* trendy · *not* minimalist-cold

### Concrete copy examples
| Surface | Yes ✓ | No ✗ |
|---|---|---|
| Hero tagline | "Hechas hoy, para vos." | "Discover artisanal excellence" |
| Add to cart CTA | "Sumar al carrito" | "Agregar al carrito" (works, but flat) / "ADD TO CART" |
| Empty cart | "Tu cajita está vacía. Empezá a llenarla 🤍" | "Your cart is empty" |
| Out of stock | "Por hoy, no quedan." | "Sold out" |
| Order confirm | "¡Listo, Viky ya recibió tu pedido!" | "Order #4521 received" |
| Delivery date | "Te lo preparo para el viernes 8" | "Delivery: Aug 8" |
| Product blurb | "Cookie estilo NY rellena de dulce de leche que se desborda al partirla. Pesa 120g — alcanza para compartir (o no)." | "Premium cookie with caramel filling. 120g." |
| Admin button | "Marcar lista" | "Mark ready" / "Update status" |

### Pronouns
Speak as **"vos"** to the customer. Viky herself can appear in first person (`"te la preparo"`, `"horneo todos los miércoles"`) — this is part of the personal-baker positioning.

### Emoji
**Sparingly, never as iconography.** Allowed inline in friendly contexts: `🤍` `✨` `🎂` `🍪`. Banned in: navigation, buttons, admin UI, error states, prices. Rule of thumb: one emoji per screen, max.

### Hand-lettered chalkboard accent
The Nutella basket-sign photo (`canasta-cookies-nutella.jpg`) is part of the brand — short product names, in script, on a "chalkboard" can appear as decorative labels (e.g. on category cards or empty states). Use the `--font-script` (Caveat) for these.

---

## 5. Visual foundations

### Color philosophy
Earth-tones-first, lilac-as-jewel. The palette is **80% chocolate / dulce de leche / cream**, with **lilac and pink used like sprinkles** — small, punctuating, joyful. Never let lilac dominate a screen; it's an accent that points the eye to the next action.

| Role | Token | Hex | Notes |
|---|---|---|---|
| Page bg | `--cream-50` | `#FDFAF5` | the warm white of butter cream |
| Card bg | `#FFFFFF` | — | photos pop against this |
| Body text | `--choc-900` | `#2A1810` | warm near-black, never `#000` |
| Brand (sticker) | `--lila-400` | `#A988CC` | primary CTA / logo |
| Accent (CTA #2) | `--dulce-600` | `#C58453` | dulce de leche caramel |
| Heart accent | `--rosa-300` | `#F4B7C9` | for hearts, valentine, sale tags |
| Sprinkles | blue/yellow/pink/lila/white | — | only in decorative patterns |

**Forbidden:** pure black (`#000`), pure white as a *page* bg (use cream), neon anything, blue-purples (cool side of the spectrum), gradients spanning more than two adjacent palette steps.

### Typography
- **Display — Fraunces** (variable serif, optical-size 9–144). Used for hero copy, product names, prices. Set medium weight (500), tight tracking (`-0.015em`), tall optical size (96–144). Gives the warm bakery-window feel without being twee.
- **Body — Nunito** (rounded humanist sans). The rounded terminals are a deliberate match to the "delicate" lowercase wordmark and to round cookies/alfajores. Never substitute a geometric sans (Inter, Poppins-tight) — Nunito's softness is the point.
- **Script — Caveat.** Hand-lettered accent for chalkboard moments: section labels like "del horno de hoy", empty-state copy, decorative price tags on hero. Use 1–2× per screen, max.

> **Substitution flag:** the brand sticker uses what looks like *Pacifico* or a custom hand. Caveat is the closest free Google match; Pacifico is loaded as a fallback in the logo SVG. **If you have the original lettering, send it as `.otf`/`.ttf`** and we'll wire it in as `--font-script`.

### Imagery
**Photos are the design.** Rules:
- Always full-color, warm-toned. Never B&W, never desaturated, never duotone.
- Square crop (1:1) is canonical for product cards; hero can be 3:4 or 4:5.
- Subtle warmth: lift shadows slightly, avoid blue cast. The reference photos already do this — match their tone.
- **No filters, no overlays, no text on top of food.** Text goes *next to* the photo, in cream/white space.
- Lifestyle shots (canasta, packaging) work for category banners; tight macro shots (cookie cross-section) work for individual product heroes.
- **Backgrounds in photos:** the existing photos have varied bgs (white box, green gingham tablecloth, dusty pink wall, navy tile). This is fine — the warm light unifies them. Don't reshoot for consistency; embrace the homey variety.

### Backgrounds (UI)
- **Default:** flat `--cream-50`. Boring is good — the food is loud.
- **Section dividers:** swap to `--cream-100` or `--cream-200` for soft horizontal banding.
- **Lila accent panels:** at most one per page, used for promotional moments ("Pedidos para San Valentín"). Use `--lila-100` background with `--lila-500` text.
- **Patterns:** `pattern-vichy.svg` (lilac gingham) and `pattern-sprinkles.svg` are available but **rare** — use only on packaging mocks, gift cards, or 404 pages. Never under text.
- **No gradients in UI.** Gradients are reserved for the logo sticker (radial, lila-to-lila) and never appear in product UI surfaces.

### Animation
- **Easing:** `--ease-out` (`cubic-bezier(0.22, 0.61, 0.36, 1)`) for almost everything. No bounces (would feel cheap), no springs.
- **Duration scale:** 120ms (micro state), 220ms (hover/press), 360ms (panel/modal), 600ms (page transitions).
- **Hover:** image cards lift 2px and scale photo 1.03 inside a clipped frame (Ken Burns–lite). Buttons lighten background by ~6% (move toward `--brand-hover`).
- **Press:** scale to 0.97, no color shift on photo cards. On buttons, darken by ~8%.
- **Add-to-cart:** the cart icon in the header pulses scale 1 → 1.15 → 1 over 360ms, and a small lila dot animates from the product card to the cart icon (translate + fade).
- **Page enter:** sections fade in at 220ms with `translateY(8px)`.
- **No skeletons that pulse blue.** Use `--cream-200` shimmer at 1.5s ease-in-out.

### Borders, shadows, elevation
- Borders are **rare**. Use `--border-subtle` (`#EADBC5`) only where the alternative is ambiguous (form inputs, table rows). Cards usually have *no* border — they sit on cream and are defined by shadow only.
- Shadow scale is **warm-tinted** (chocolate-brown alpha, not gray). See `--shadow-xs` through `--shadow-xl`.
- Elevation pattern: cards `--shadow-sm` at rest, `--shadow-lg` on hover. Modals `--shadow-xl`. Sticky headers `--shadow-sm` only when scrolled.
- **No inner shadows in product UI.** The `--shadow-inset` token exists for buttons (subtle highlight) but never on cards.

### Corner radii
The bakery's visual world is **round** (cookies, alfajores, roles). Lean into that.
- Buttons: `--r-pill` (999px) — fully rounded by default. Square corners feel wrong here.
- Cards: `--r-lg` (20px) for product cards, `--r-xl` (28px) for hero / featured cards.
- Inputs: `--r-md` (14px) — slightly less round than buttons for legibility.
- Images inside cards: inherit card radius minus 4px (visual nesting).
- Modals: `--r-2xl` (36px) on top corners only when sheet-style; full `--r-2xl` for centered modals.

### Card anatomy (product card — the most important component)
```
┌──────────────────────────────┐
│                              │  ← 20px radius, no border
│        [SQUARE PHOTO]        │     bg: white
│                              │     shadow: --shadow-sm
├──────────────────────────────┤     padding: 16px around content
│ Cookie NY · dulce de leche   │     hover: lift + photo zoom
│ "del horno de hoy" (script)  │
│                              │
│ $3.500       [Sumar al 🛒]   │
└──────────────────────────────┘
```
- Photo on top, edge-to-edge inside the card (image radius matches card top corners).
- Product name: `--t-h4` Nunito 700.
- Optional script tagline in `--font-script`, color `--lila-500`, ~16px.
- Price: `--font-display`, weight 600, color `--fg1`. No "$" superscript tricks.
- CTA: pill button `--brand` background, `--on-brand` text. Or a quiet `+` icon button if the layout is dense.

### Layout rules
- **Container:** max-width 1200px, padded 24px (mobile 16px). Center on viewport.
- **Grid:** product grid is responsive — 1 col <420px, 2 col <720px, 3 col <1024px, 4 col ≥1024px. Gap: 16px mobile, 24px desktop.
- **Sticky elements:** only the header (sticky top, becomes opaque cream on scroll). The cart drawer is overlay, not sticky.
- **Spacing rhythm:** sections separated by `--s-16` (64px) on desktop, `--s-10` (40px) on mobile.

### Transparency & blur
Used **once**: the sticky header background is `rgba(253, 250, 245, 0.85)` with `backdrop-filter: blur(12px)` when scrolled. Nothing else uses transparency in UI. (The lilac sticker is opaque.)

### Form elements
- Inputs: cream background (`--cream-100`), no border, `--r-md`, internal padding `12px 16px`. On focus: 2px `--lila-300` ring offset by 2px. The cream-on-cream is intentional — the field looks like a bakery receipt slot.
- Labels: above input, `t-caption` weight 600.
- Helper text: below, `t-caption` color `--fg3`.
- Error: `--danger` text + 1px `--danger` border (the only context where colored borders appear).

### Iconography (see ICONOGRAPHY section below)
Lucide icons, 1.75px stroke. No emoji. No filled/duotone mixing.

---

## 6. Iconography

**System:** [Lucide](https://lucide.dev) via CDN — `lucide@latest` from unpkg. Selected for its rounded line caps, which match Nunito's terminals and the round-cookie/round-alfajor world.

**Settings:**
- `stroke-width="1.75"` (default Lucide is 2; we go slightly thinner for a softer feel)
- `stroke-linecap="round"`, `stroke-linejoin="round"` (Lucide defaults)
- Color: inherit `currentColor`. Default `--fg2`; active `--brand`; disabled `--fg4`.
- Sizes: 16, 20, 24, 32. Stick to these four.

**Common icons & their roles:**
| Concept | Lucide name |
|---|---|
| Cart | `shopping-bag` (a *bag* is more on-brand than a cart icon — think bakery paper bag) |
| Account | `user-round` |
| Search | `search` |
| Pickup | `store` |
| Delivery | `bike` (rappi/pedidosya feel) |
| Add | `plus` |
| Remove | `minus` |
| Heart / fav | `heart` |
| Date / order day | `calendar-days` |
| Phone (admin) | `phone` |
| Address | `map-pin` |
| Status checks | `check-circle-2`, `circle-dashed`, `circle-dot` |

**No emoji as icons.** Emoji is *content* (a heart in a tagline), never an *interactive affordance*.

**No custom SVG icons** beyond the brand assets (logo, vichy, sprinkles patterns). If you need an icon Lucide doesn't have, use the closest Lucide match and flag the substitution.

**Brand marks (not icons):**
- `assets/logo-sticker.svg` — full circular sticker, used in hero, footer, packaging mocks. Min size 80px (sprinkles get muddy below).
- `assets/logo-monogram.svg` — horizontal wordmark for narrow contexts (header on mobile, email signatures, invoice PDFs). Min size 120px wide.

> **Substitution flag:** the photographed sticker font is likely *Pacifico* or a custom hand. The SVG uses Pacifico → Caveat fallback chain. Send the original lettering file to upgrade.

---

## 7. UI Kits

| Kit | Path | What's in it |
|---|---|---|
| **Storefront** (customer) | `ui_kits/storefront/` | Home, product detail, cart drawer, checkout (retiro/delivery), order confirmation. Click-thru. |
| **Admin** (Viky) | `ui_kits/admin/` | Orders list (today / próximos), order detail with status flow (recibido → en preparación → listo → entregado). |

Each kit has its own `README.md` documenting components and screen flow.

---

## 8. Caveats / open questions

1. **No real logo file.** The logo SVG is a faithful reconstruction from the photographed sticker. Viky should send the original logo file (`.svg`, `.ai`, or `.png` with transparency) to replace `assets/logo-sticker.svg`.
2. **Logo lettering font is approximated.** Caveat (Google Fonts) is used as a stand-in. The original may be Pacifico or hand-lettered.
3. **No real product copy was provided** beyond the brief. The names, blurbs, prices, and lead-times in the UI kits are *plausible placeholders* (Spanish, voseo, on-brand). Replace with real copy before launch.
4. **Currency** is shown as `$` (Argentine pesos format, with thousand-dot separator: `$3.500`). Confirm market & locale.
5. **No Figma, no codebase** were provided — this system is the source of truth. If you have either, attach them via Import and I'll reconcile.
6. **Photos vary in background and crop** — perfectly fine for an honest, homemade brand. If a more uniform look is desired later, a single afternoon of reshoots on cream paper would unify the catalog.

---

*Built ground-up from photographs and brief. Iterate freely — this should feel like Viky's kitchen, not a SaaS product.*
