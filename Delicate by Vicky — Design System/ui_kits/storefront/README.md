# Storefront UI kit — delicate by Viky

Customer-facing site. Single-page React prototype demonstrating the four core flows.

## Screens
1. **Home** — hero with photo + sticker, category filter chips, product grid, promo banner
2. **Product detail (PDP)** — large square photo, thumbs, qty stepper, lead-time / retiro / delivery meta
3. **Cart drawer** — slides in from right, lists items, qty controls, totals, CTA to checkout
4. **Checkout** — 3-step single-page form (retiro vs delivery toggle, day + slot, name + WhatsApp + optional address + tarjetita message), sticky summary
5. **Confirmation** — friendly thank-you, fake order number, recap, back-to-menu

## Components (inline in `index.html`)
`Header` · `Home` · `ProductCard` · `PDP` · `CartDrawer` · `Checkout` · `Confirm` · `Footer` · `Icon` (Lucide wrapper)

## Run
Open `index.html`. The CSS imports `../../colors_and_type.css`. Product photos load from `../../assets/products/`.

## Catalog
10 placeholder products mapped to the 10 reference photos. Names, blurbs and prices are *plausible Spanish (voseo) placeholders* — replace with Viky's real catalog.

## Notes for production
- Replace Lucide CDN with bundled icons.
- Replace `claude.complete` / static catalog with a real backend (Supabase, Sheets-as-DB, anything light — 100 orders/month doesn't need much).
- The "WhatsApp confirms order" pattern is intentional — no payment gateway in checkout. Viky sends a payment link per order. This matches how 90% of pequeñas pastelerías in BA actually operate.
