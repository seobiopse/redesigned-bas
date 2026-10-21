# On-Page SEO Audit — Summary (2026-10-21)

Full audit of all 41 pages (22 products + 18 categories + home) across 12 dimensions: Body Content, Semantic HTML, Primary/Secondary Keyword Placement, Semantic/Entity Terms, Meta Tags, Social Tags, Structured Data, Image Alt, Image Title, Internal Links, Internal Link Anchors.

Detailed per-page checklists:
- [AUDIT_SEO_PRODUCTS.md](AUDIT_SEO_PRODUCTS.md) — 22 product pages
- [AUDIT_SEO_CATEGORIES.md](AUDIT_SEO_CATEGORIES.md) — 18 category pages + index.html

## Verification (both audits)
- JSON-LD: 41/41 files parse clean, before and after edits.
- FAQ `<details>` count unchanged (6) on every edited file.
- `node scripts/sync-collection-overview.js --check` still clean after edits.
- Nav/footer/breadcrumb/dev-tooltip markup untouched everywhere.
- Only 5 files edited (see diff below) — all other findings are flagged, not fixed, per audit-first scope.

## Fixes already applied (small, low-risk, in scope)
1. `categories/custom-framed-name-badges.html` — fixed doubled "Custom Custom" in image alt, and wrong phone number (637→637, was 367 in 4 places vs the correct 637 used elsewhere on the same page).
2. `categories/id-cards.html`, `categories/lanyards-clips-accessories.html` — fixed doubled "Custom Custom Printed Lanyard" in a shared product-card image alt.
3. `products/aluminium-channel-desk-plate.html`, `products/mahogany-wedge-desk-plate.html` — only 2 of 22 products whose copy scored zero on cluster/entity terms (both are non-standard desk-plate constructions the cluster list didn't anticipate). Fresh Ahrefs lookup → wove in "desk signs" / "reception desk display" / "acrylic name plate" naturally into the hero + specs-intro sentences only. No price/material/SKU changed.

## Critical findings — NOT yet fixed (recommend a follow-up pass)
1. **~26 Featured Product cards across 15/18 category pages show a product name that doesn't match that card's own image/price** — traced to stale `<h1>` tags on the linked product pages themselves (outside today's product-content scope, since those H1s are the source of truth the sync script trusts). Fix the H1s, then re-run `node scripts/sync-collection-overview.js`.
2. `australian-made-badge-machines.html` / `imported-badge-machines.html` — `<title>` tags are 170+ character marketing sentences, not real titles.
3. `index.html` — title/og:title/twitter:title all read "...| Badge Store Redesign", an internal dev label leaking into production-facing tags.
4. **All 41 pages** — canonical/og:url point to `badgestore.com.au` (the real live site) instead of this redesign's own GitHub Pages URL. Highest-impact technical SEO issue if this redesign is ever deployed/indexed as-is.
5. Thin H1s ("Australian Made", "Imported"), one informal H1 ("Snap Badges - Look like acrylic domed but cheaper"), a heading-order quirk (a styling-only H3/H4 appears before the page's own H1 on all 22 product pages — shared template issue), `twitter:image:alt` missing site-wide on products (og:image:alt present but different pattern than brief's suggested phrasing), most product meta titles 65–108 chars due to a shared suffix (soft ⚠️, still unique), a possible stray "3-5 years" durability claim in `pet-tags.html` body prose (outside the already-cleaned table), one unusually thin title+description pair (`hardwood-engraved-badges.html`).
6. **No `<img>` tags exist on product pages** (CSS-rendered preview) — Image Title dimension is N/A there, not a defect.
7. Several product file slugs no longer match the product now served (e.g. `die-struck-metallic-pin.html`, `pro-badge-machine-57mm.html`) — predates this audit, doesn't affect on-page SEO elements, noted for awareness only.

See the two linked files for the full per-page, per-dimension checklist.
