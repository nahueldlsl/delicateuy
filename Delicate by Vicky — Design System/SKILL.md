---
name: delicate-by-viky-design
description: Use this skill to generate well-branded interfaces and assets for Delicate by Viky — a small-batch artisanal bakery in Buenos Aires (cookies estilo NY, alfajores, roles de canela, tortas) — either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Spanish (rioplatense, voseo). Warm, handcrafted, photo-first.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files. The README is the source of truth for voice, palette, typography, layout rules, and component anatomy.

## What's here
- `README.md` — full system documentation (brand, voice, visual foundations, iconography, caveats)
- `colors_and_type.css` — drop-in CSS with all design tokens, semantic vars, and base typography
- `assets/` — logo (sticker + monogram), brand patterns (vichy, sprinkles), 10 product photographs
- `preview/` — single-purpose preview cards for each token group (colors, type, spacing, components, brand)
- `ui_kits/storefront/` — customer site recreation (home, PDP, cart, checkout, confirmation)
- `ui_kits/admin/` — Viky's internal orders panel (list, detail with status flow)

## How to use

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy the assets you need out of `assets/` and link `colors_and_type.css`. Compose with the components in `ui_kits/` as reference.

If working on production code, read the rules in `README.md` to become an expert in designing with this brand — then apply the tokens and patterns to your stack of choice.

## Non-negotiables for Delicate by Viky designs
- **Spanish (Argentina), voseo.** Never English in body copy. Never tuteo.
- **Sentence case.** Never ALL CAPS except for `t-micro` labels.
- **Lowercase wordmark** — always `delicate`, never `Delicate`.
- **Photos are the protagonist.** Chrome is quiet, warm, gets out of the way. No filters, no overlays on food.
- **Round corners.** The world is cookies and alfajores — buttons are pills, cards are 20px radius.
- **Lilac as a jewel, not a wash.** 80% earth tones, 20% lila/rosa accents.
- **No emoji as iconography.** Lucide icons only.
- **No pure black, no pure-white pages.** Use `--choc-900` and `--cream-50`.

## If invoked without further guidance
Ask the user what they want to build (product card / promo banner / new page / slide / packaging mock / email), ask 2–3 focused questions about audience and intent, then output an HTML artifact or production-quality code that follows the system to the letter.
