# SEO Audit — 18 Category Pages + index.html (19 pages total)

Audited: 2026-10-21. Live redesign: https://seobiopse.github.io/redesigned-bas/ (categories at `/categories/<file>`, home at `/index.html`). Source-of-truth reference: https://www.badgestore.com.au/

## Verification results (run before/after edits)

- **JSON-LD validity**: all 19 files parse as valid JSON — **19/19 OK**, 1 `<script type="application/ld+json">` block per category page (Organization/LocalBusiness/MerchantReturnPolicy/ShippingRateSettings/CollectionPage/ItemList/FAQPage in one `@graph`), 1 block on `index.html` (Organization/WebSite). No parse errors found before or after this audit's edits.
- **FAQ `<details>` count preserved**: the 3 files edited in this pass (`custom-framed-name-badges.html`, `id-cards.html`, `lanyards-clips-accessories.html`) each still have exactly **6** `<details>` elements, matching their pre-edit count. FAQ structure/JSON-LD block was not touched.
- **Nav + footer preserved**: all 3 edited files still contain the primary navigation (`data-purpose="primary-navigation"`) and a `<footer>` — confirmed present, untouched.
- **Internal product links**: every `../products/*.html` href referenced from a category page's Featured Product cards / Collection Overview resolves to a real, existing file in `/products/`. No broken links found.
- **Sync script**: `node scripts/sync-collection-overview.js --check` reports "All Collection Overview sections are in sync with their product pages" — confirms Featured Card / Collection Overview name+price data matches each linked product page's own `<h1>`, as designed. (See Critical Finding #1 below — "in sync" here means consistent with the *product page's* H1, which is itself wrong on several products.)

## Fixes applied this pass (full list)

1. `categories/custom-framed-name-badges.html` — doubled word "Custom Custom" in `og:image:alt` / `twitter:image:alt` → "Custom"; wrong phone number `1300 862 367` → correct `1300 862 637` in meta description, og:description, twitter:description, and JSON-LD CollectionPage description (4 instances total; the phone number was already correct everywhere else on the page, e.g. header, footer, FAQ answer).
2. `categories/id-cards.html` — doubled word in product-card image alt: "Buy Custom Custom Printed Lanyard" → "Buy Custom Printed Lanyard".
3. `categories/lanyards-clips-accessories.html` — same doubled-word fix: "Buy Custom Custom Printed Lanyard" → "Buy Custom Printed Lanyard".

No hero-intro/Buyer's-Guide-intro rewrites were triggered by the conditional fix rule — see "Conditional fix rule outcome" below.

## Conditional fix rule outcome

Checked dimensions 1 (Body Content), 4 (Secondary Keywords), 5 (Semantic/Entity terms) on all 19 pages. Every category page's hero intro is already unique, substantive, and grounded in real child-product facts (today's earlier rewrite pass covered this), and a cluster-term grep against every page returned non-zero hits for every category (lowest was `desk-plates.html` at 4 occurrences of its cluster terms, still adequate for a single page). **No page was judged thin/generic enough to warrant a rewrite** — no Ahrefs `keywords-explorer-related-terms` calls were made, and no hero/Buyer's-Guide copy was rewritten under the conditional rule.

---

## CRITICAL cross-page finding #1 — Featured Product card name ≠ image alt/title on ~26 cards across 15 of 18 category pages

The visible `<h3><a>` product name shown on a Featured Product card frequently does **not** match that same card's `<img alt>` / `<img title>` text, even though the card's `href`, alt and title are all correct and point to the right product. Examples:

| Page | Visible card name (wrong) | Image alt/title says (correct) | Product file |
|---|---|---|---|
| `metal-plaques.html` | "Square Name Badge Laser Engraved" | "Polished Brass Honours Plaque" | `products/polished-brass-honours-plaque.html` |
| `lapel-pins.html` | "Bevelled Edge Reusable Premium Metal Name Badge" | "Soft Enamel Custom Pin" | `products/soft-enamel-custom-pin.html` |
| `lapel-pins.html` | "Oval Name Badge Laser Engraved" | "Hard Enamel Premium Pin" | `products/hard-enamel-premium-pin.html` |
| `lapel-pins.html` | "Oval Name Badge Full Colour" | "Die Struck Metallic Pin" | `products/die-struck-metallic-pin.html` |
| `id-cards.html` | "Snap Badge Full Colour or Engraved" | "Standard Employee Photo ID" | `products/standard-employee-photo-id.html` |
| `id-cards.html` | "Custom ID Card Using Your Own Artwork" | "Barcode RFID Access Card" | `products/barcode-rfid-access-card.html` |
| `desk-plates.html` (×3) | "Premium Aluminium Desk Name Plate...", "Tasmanian Blackwood Desk Name Plate...", "A-Frame Style Desk Name Plate" | "Aluminium Channel Desk Plate", "Mahogany Wedge Desk Plate", "Acrylic Stand Desk Plate" | 3 desk-plate products |
| `badge-machines.html` / `australian-made-badge-machines.html` / `imported-badge-machines.html` | "MULTI PRESS", "1800B Badge-A-Matic", "Round Name Badge Full Colour" | "25mm Badge Machine Starter Kit", "57mm Pro Badge Machine Kit", "Blank Pin Components (100 Pack)" | 3 machine/accessory products |
| `pet-tags.html` (×2) | "Pet Tag Anodised Aluminium Bone Shape", "...Round Shape" | "Solid Brass Bone Pet Tag", "Anodised Aluminium Round Pet Tag" | 2 pet-tag products |
| `acrylic-dome-name-badges.html`, `name-badges.html` | "Full Colour Or Engraved Acrylic Domed Rectangle Name Badge" | "Acrylic Domed Name Badge" | `products/acrylic-domed-name-badge.html` |
| `custom-framed-name-badges.html`, `name-badges.html`, `reusable-name-badges.html`, `snap-badges.html` | "Reusable Full Colour Printed Rectangle Name Badge" | "Reusable Printed Name Badge" | `products/reusable-printed-name-badge.html` |
| `hardwood-engraved-badges.html`, `name-badges.html` | "Walnut Rectangle Name Badge Laser Engraved" | "Walnut Hardwood Engraved Badge" | `products/walnut-hardwood-engraved-badge.html` |

**Root cause identified**: `scripts/sync-collection-overview.js` keeps the card's visible name in sync with the linked **product page's own `<h1>`** — and it reports "all in sync" because it is. The bug lives one level deeper: the **product pages' `<h1>` tags themselves still carry stale, generic/mismatched names** (several literally say "Square Name Badge Laser Engraved" or other name-badge boilerplate on non-name-badge products), while each product's own image `alt`/`title` on the category card (and, presumably, the product page's own meta/canonical data) were already corrected in today's product-data-accuracy pass. Confirmed directly: `products/polished-brass-honours-plaque.html` line 481 has `<h1>Square Name Badge Laser Engraved</h1>`; `products/soft-enamel-custom-pin.html` line 481 has `<h1>Bevelled Edge Reusable Premium Metal Name Badge</h1>`.

**This is out of scope to fix here** — product pages under `/products/` were not part of this audit's brief, and the category-page card text is explicitly protected ("kept in sync by the script, don't hand-edit them"). Recommended follow-up: fix the affected product pages' `<h1>` (and matching `<title>`/meta/JSON-LD) to the correct product name, then re-run `node scripts/sync-collection-overview.js` so every category page picks up the real name automatically. Until then, every category page listed above shows an internally inconsistent product name between the clickable text and the image on the exact same card — this also affects Internal Link Anchors (dimension 12) and Image Alt cross-checking (dimension 9) sitewide.

## CRITICAL cross-page finding #2 — Malformed `<title>` tags (2 pages)

- `categories/australian-made-badge-machines.html`: `<title>` = *"Choose BadgeStore for Australian-made Button Badge Machines. Enjoy local craftsmanship, fast shipping across Australia, and premium quality for all your custom badge needs."* — 172 characters, a full marketing sentence, not a title. Reads like meta-description copy accidentally placed in `<title>`.
- `categories/imported-badge-machines.html`: `<title>` = *"Looking for premium imported Button Badge Machines? BadgeStore Australia offers multi-press badge makers with free tools and components, start creating badges with ease today."* — 175 characters, same problem.

Both will be truncated heavily in Google SERPs and read as unprofessional / spammy-length titles. Every other category page has a normal, concise title (24–105 chars). Recommend rewriting both to the same pattern used elsewhere, e.g. `"Australian Made Badge Machines | BadgeStore"` / `"Imported Badge Machines | BadgeStore"`. Not fixed in this pass — title tag rewrites were outside the conditional-fix rule's scope (hero/Buyer's-Guide copy only) and are not covered by the "doubled word" fix class either, so flagged for separate approval.

## CRITICAL cross-page finding #3 — `index.html` leaks internal project name into title/social tags

`<title>`, `og:title`, and `twitter:title` on `index.html` all read **"Custom Name Badges Australia | Badge Store Redesign"** — "Badge Store Redesign" is this project's internal dev/staging label, not a real brand suffix, and it will show up in Google search results and social share cards for the live homepage. Recommend changing to `"Custom Name Badges Australia | BadgeStore"` to match the convention used on every category page. Not fixed in this pass (same reasoning as Finding #2 — outside this audit's edit scope).

## CRITICAL cross-page finding #4 — canonical / og:url point to the original live site, not this redesign

Every one of the 19 pages' `<link rel="canonical">` and `og:url` point to `https://www.badgestore.com.au/...` (the original production site this project is redesigning), not `https://seobiopse.github.io/redesigned-bas/...` (where this redesign actually lives). If this redesign is ever indexed or shared as-is, every page tells search engines and social platforms "the real version of this page is on badgestore.com.au" — which actively suppresses this redesign from ranking/sharing under its own URL. This is presumably intentional while the redesign is a working mock of the live site, but it's worth flagging explicitly before any real deployment, since it is the single highest-impact technical SEO issue found in this audit. Not fixed — changing every canonical/og:url is a domain decision for the user, not a copy fix.

---

## Per-page audit

Legend for repeated items (same on all 18 category pages, confirmed, not re-stated in full per page): breadcrumb Home → Category (correct, untouched); footer present and untouched; primary nav present and correct; FAQ = 6 `<details>`, JSON-LD `FAQPage.mainEntity` text spot-checked matches visible FAQ answers; JSON-LD `@graph` = Organization + LocalBusiness + MerchantReturnPolicy + ShippingRateSettings + CollectionPage + ItemList + FAQPage, valid JSON; heading order is H1 → H2 → H3 with no skipped levels; canonical/og:url point to badgestore.com.au (see Finding #4, not repeated per page).

### 1. categories/name-badges.html
- **Body Content**: Unique, substantive hero ("Five made-to-order name badge finishes come out of one Prospect, SA workshop...") grounded in real child products across all 5 flavours. Buyer's Guide intro generic boilerplate shared site-wide ("Everything your procurement, HR, or event team needs to know...") — acceptable, it's a transition sentence not the main copy.
- **Semantic HTML**: OK, H1→H2→H3, table used for material comparison.
- **Primary Keyword**: "Name Badges" in H1 ("Shop Custom Name Badges"), in first 100 words, and in H2 ("Custom Name Badges Buyer's Guide & Specifications"). Pass.
- **Secondary Keywords**: "name badge / custom badge / badge maker" cluster found 65×. Strong.
- **Entity terms**: cluster terms present throughout (reusable, business days, events).
- **Meta Tags**: Title "Buy Custom Name Badges Online | BadgeStore Australia" (52 chars) — good, unique.
- **Social Tags**: og/twitter title+description present, consistent with `<title>`/meta description.
- **Structured Data**: CollectionPage name matches H1 intent; FAQPage spot-checked OK.
- **Image Alt**: pattern "Buy Custom {Product} online from BadgeStore" on all 5 cards — descriptive, unique, not generic. Good (differs from suggested "{Product} photo in a white background" wording but functionally equivalent/better — includes brand + CTA).
- **Image Title**: present, pattern "{Product} | BadgeStore Australia" — doesn't include price as suggested, but consistent sitewide.
- **Internal Links**: all 5 Featured Card links resolve to real product files. See Critical Finding #1 — 3 of the 5 card names mismatch their own image alt text.
- **Anchors**: product names used as anchor text — descriptive, but see Finding #1 for 3 wrong names.
- **Fixes Applied**: none.

### 2. categories/acrylic-dome-name-badges.html
- **Body Content**: Unique hero re: polyurethane resin dome finish. Substantive.
- **Semantic HTML**: OK.
- **Primary Keyword**: "Acrylic Dome Name Badges" in H1, intro, H2. Pass.
- **Secondary Keywords**: name-badge cluster 9 hits. Good.
- **Entity terms**: present.
- **Meta Tags**: Title is 105 chars — "Acrylic Name Badges Australia, Melbourne, Perth, Sydney| Acrylic Domed Name Badges & Tags| BadgeStore" — long, has a missing space before the first `|`, and stacks two titles with city-stuffing (old-SEO style). Flag: should be trimmed/cleaned, e.g. "Acrylic Dome Name Badges | BadgeStore Australia".
- **Social Tags**: consistent with title/description.
- **Structured Data**: OK.
- **Image Alt/Title**: good pattern, 1 card: "Buy Custom Acrylic Domed Name Badge online from BadgeStore" / title has product name — but see Finding #1, card link text says "Full Colour Or Engraved Acrylic Domed Rectangle Name Badge" vs alt/title "Acrylic Domed Name Badge".
- **Internal Links**: resolves correctly.
- **Fixes Applied**: none (title-tag cleanup flagged but out of today's edit scope).

### 3. categories/australian-made-badge-machines.html
- **Body Content**: Unique, specific (1800B Badge-A-Matic, 57mm buttons). Good.
- **Semantic HTML**: OK.
- **Primary Keyword**: H1 is just **"Australian Made"** — misses "Badge Machines" entirely in the H1, a real primary-keyword placement miss (category name is "Australian Made Badge Machines"). First-100-words and body do mention "badge machine/badge maker" terms, so only the H1 is thin.
- **Secondary Keywords**: badge maker/press machine cluster 11 hits. Fine.
- **Meta Tags**: **Title tag broken** — see Critical Finding #2 (172-char sentence, not a title).
- **Social Tags**: og/twitter title mirrors the broken `<title>`.
- **Structured Data**: OK, valid JSON.
- **Image Alt/Title**: good pattern; card name mismatches alt/title (Finding #1: "MULTI PRESS" vs "25mm Badge Machine Starter Kit").
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none (title tag and H1 flagged, not fixed — outside conditional-fix scope).

### 4. categories/badge-machines.html
- **Body Content**: Good parent-category framing of the two real presses + accessories.
- **Semantic HTML**: OK.
- **Primary Keyword**: H1 "Shop Button Badge Machines" — contains category term. Pass.
- **Secondary Keywords**: 29 hits on badge maker/press machine cluster. Strong.
- **Meta Tags**: Title "Button Badge Making Machines & Parts | BadgeStore" (49 chars) — fine.
- **Social Tags**: consistent.
- **Structured Data**: OK.
- **Image Alt/Title**: good pattern; 3 cards, all 3 mismatch visible name vs alt/title per Finding #1 (MULTI PRESS / 1800B Badge-A-Matic / Round Name Badge Full Colour vs the real product names).
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none.

### 5. categories/imported-badge-machines.html
- **Body Content**: Unique, specific to the imported MULTI PRESS unit. Good.
- **Primary Keyword**: H1 is just **"Imported"** — same miss pattern as #3, doesn't contain "Badge Machines".
- **Secondary Keywords**: 16 hits. Fine.
- **Meta Tags**: **Title tag broken** — see Critical Finding #2 (175-char sentence).
- **Social Tags**: mirrors broken title.
- **Structured Data**: OK.
- **Image Alt/Title**: good pattern; 2 cards mismatch per Finding #1.
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none (flagged only).

### 6. categories/custom-framed-name-badges.html
- **Body Content**: Unique hero re: frame mounting. Good.
- **Semantic HTML**: OK.
- **Primary Keyword**: H1 "Custom Framed Name Badges" — pass.
- **Secondary Keywords**: 5 hits, adequate.
- **Meta Tags**: Title "Buy Online Custom Framed Name Badges Australia | BadgeStore" (59 chars) — fine. Meta description previously had a **wrong phone number (1300 862 367 instead of 1300 862 637)** — **fixed this pass**.
- **Social Tags**: og:image:alt/twitter:image:alt had **doubled word "Custom Custom"** — **fixed this pass**. Same wrong-phone-number issue in og/twitter description and JSON-LD CollectionPage description — **fixed this pass** (4 total corrections across meta description, og:description, twitter:description, JSON-LD description).
- **Structured Data**: valid JSON before and after edit; FAQ answer at line 193 already had the correct phone number (so the page was internally inconsistent before this fix).
- **Image Alt/Title**: good pattern; 1 card mismatches per Finding #1 ("Reusable Full Colour Printed Rectangle Name Badge" vs "Reusable Printed Name Badge").
- **Internal Links**: resolve correctly.
- **Fixes Applied**: doubled-word fix (og/twitter image:alt) + wrong phone number fix (4 instances: meta description, og:description, twitter:description, JSON-LD description).

### 7. categories/desk-plates.html
- **Body Content**: Unique, specific (acrylic/mahogany/aluminium). Good.
- **Semantic HTML**: OK.
- **Primary Keyword**: H1 "Shop Desk Name Plates" — pass.
- **Secondary Keywords**: cluster (acrylic name plate/engraved desk/custom name sign/laser engraving) only 4 hits — lowest of all pages checked, but still present and not zero; judged adequate, no rewrite triggered.
- **Meta Tags**: Title "Custom Desk Name Plates | BadgeStore Australia" (46 chars) — good.
- **Social Tags**: consistent.
- **Structured Data**: OK.
- **Image Alt/Title**: good pattern; all 3 cards mismatch visible name vs alt/title per Finding #1.
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none.

### 8. categories/engraved-name-badges.html
- **Body Content**: Unique, specific (2-ply engraving plastic). Good.
- **Primary Keyword**: H1 "Engraved Name Badges" — pass.
- **Secondary Keywords**: 5 hits, adequate.
- **Meta Tags**: Title 93 chars with a double-barreled structure: "Custom Engraved Name Badges Australia |Order Online Engraved Name Tags With Logo | BadgeStore" — missing space after first `|`, and arguably two titles concatenated. Flag for cleanup.
- **Social Tags**: consistent with (overlong) title.
- **Structured Data**: OK.
- **Image Alt/Title**: good pattern; 1 card, no mismatch found (name and alt/title agree: "Rectangle Name Badge Laser Engraved").
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none (title cleanup flagged only).

### 9. categories/full-colour-name-badges.html
- **Body Content**: Unique, specific (UV printing). Good.
- **Primary Keyword**: H1 "Full Colour Name Badges" — pass.
- **Secondary Keywords**: 5 hits.
- **Meta Tags**: Title "Order Online Full Colour Name Badges Australia | Full Colour Name Badges | BadgeStore" (85 chars) — repeats "Full Colour Name Badges" twice in the same title; flag for cleanup/shortening.
- **Social Tags**: consistent.
- **Structured Data**: OK.
- **Image Alt/Title**: good pattern, no mismatch (agrees: "Rectangle Name Badge Full Colour").
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none.

### 10. categories/hardwood-engraved-badges.html
- **Body Content**: Unique hero re: walnut veneer/wax coat — good, substantive despite thin meta tags.
- **Primary Keyword**: H1 "Hardwood Engraved Badges" — pass.
- **Secondary Keywords**: 5 hits.
- **Meta Tags**: **Thinnest on the site** — title "Hardwood Engraved Badges" (24 chars, no brand/location modifier) and description "Hardwood Engraved Badges - Eco Friendly badges" (46 chars) — both far shorter than every sibling page and read as unfinished/placeholder. Flag for enrichment (not fixed — title/meta copywriting is outside this pass's edit scope).
- **Social Tags**: mirrors the thin title/description.
- **Structured Data**: OK.
- **Image Alt/Title**: good pattern, 1 card mismatches per Finding #1 ("Walnut Rectangle Name Badge Laser Engraved" vs "Walnut Hardwood Engraved Badge").
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none (flagged only).

### 11. categories/id-cards.html
- **Body Content**: Unique, specific (card size, photo ID, barcode). Good.
- **Primary Keyword**: H1 "Shop Custom ID Cards & Accessories" — pass.
- **Secondary Keywords**: "staff id/photo id card/id card" cluster — 52 hits. Strong.
- **Meta Tags**: Title "Custom Staff ID Cards & Lanyards | BadgeStore" (45 chars) — good.
- **Social Tags**: consistent.
- **Structured Data**: OK.
- **Image Alt/Title**: 3 cards; had a **doubled-word alt** ("Buy Custom Custom Printed Lanyard") — **fixed this pass**. Other 2 cards mismatch visible name vs alt/title per Finding #1 (Snap Badge Full Colour or Engraved / Custom ID Card Using Your Own Artwork).
- **Internal Links**: resolve correctly.
- **Fixes Applied**: doubled-word alt-text fix on the Lanyard product card image.

### 12. categories/lanyards-clips-accessories.html
- **Body Content**: Unique, specific (metal clips, hook clips). Good.
- **Primary Keyword**: H1 "Lanyards, Clips & Accessories" — pass (sub-category of ID Cards, no separate "lanyard"-only H1 needed since category name already is "lanyard").
- **Secondary Keywords**: "lanyard id holder/neck lanyard/metal clip/hook clip" cluster — 8 hits, adequate.
- **Meta Tags**: Title "Lanyards, Clips and Accessories | BadgeStore" (44 chars) — good.
- **Social Tags**: consistent.
- **Structured Data**: OK.
- **Image Alt/Title**: same doubled-word alt bug as id-cards.html (shared Lanyard product) — **fixed this pass**.
- **Internal Links**: resolve correctly. Note: the Lanyard product card's image file is named `Metal-Name_badges__52519...jpg` — a filename mismatch worth a human visual check (flagged only, cannot verify image content from markup).
- **Fixes Applied**: doubled-word alt-text fix on the Lanyard product card image.

### 13. categories/lapel-pins.html
- **Body Content**: Unique hero re: jacket-worn alternative for events/award ceremonies. Reasonably substantive given the task brief's caution that this category has "zero real products" — in fact the page does show 3 real linked products with real prices (soft-enamel-custom-pin, hard-enamel-premium-pin, die-struck-metallic-pin), so the brief's "no real products" note appears outdated; worth confirming with the user which is current.
- **Primary Keyword**: H1 "Shop Custom Lapel Pins" — pass.
- **Secondary Keywords**: lapel pin/enamel pin cluster — 46 hits, strong (helped by repeated "pin" product names).
- **Meta Tags**: Title "Custom Branded Lapel Pins | BadgeStore Australia" (48 chars) — good.
- **Social Tags**: consistent.
- **Structured Data**: OK.
- **Image Alt/Title**: good pattern; all 3 cards mismatch visible name vs alt/title per Finding #1 — these are the most severe mismatches on the site (name-badge boilerplate names on pin products).
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none.

### 14. categories/metal-name-badges.html
- **Body Content**: Unique, specific (anodised aluminium, brushed finish). Good.
- **Primary Keyword**: H1 "Metal Name Badges" — pass.
- **Secondary Keywords**: 7 hits.
- **Meta Tags**: Title "Metal Name Badges Australia, Melbourne, Sydney | BadgeStore" (59 chars) — city-stuffing pattern, same old-SEO style as acrylic-dome page; works but dated.
- **Social Tags**: consistent.
- **Structured Data**: OK.
- **Image Alt/Title**: good pattern, no mismatch found (agrees: "Rectangle Name Badge Laser Engraved").
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none.

### 15. categories/metal-plaques.html
- **Body Content**: Unique, specific (stainless/brass/aluminium plaques). Good.
- **Primary Keyword**: H1 "Shop Engraved Metal Plaques" — pass.
- **Secondary Keywords**: "engraved metal/anodised aluminium/outdoor use" cluster — 28 hits, strong.
- **Meta Tags**: Title "Engraved Metal Plaques & Signage | BadgeStore" (45 chars) — good.
- **Social Tags**: consistent.
- **Structured Data**: OK.
- **Image Alt/Title**: **worst mismatch on the site** — the Polished Brass Honours Plaque card's visible link/H3 text literally reads "Square Name Badge Laser Engraved" (a name-badge product name) while its image alt/title correctly say "Polished Brass Honours Plaque" — see Finding #1. Other 2 cards also mismatch (Stainless Steel / Aluminium plaque naming).
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none (card text is protected/out-of-scope; root-cause product page needs the fix).

### 16. categories/pet-tags.html
- **Body Content**: Unique, specific (brass/aluminium, bone/round shapes). Good. One minor note: the "Materials & Craftsmanship" paragraph states tags ensure "durability of at least 3-5 years under regular commercial wear" — a specific duration claim similar in kind to the fabricated-year-count durability claims removed from the comparison table in an earlier pass (commit 67cf618); this one is in body prose, not the table, so it survived that pass. Flagged for the user to verify/remove if not sourced from a real spec.
- **Primary Keyword**: H1 "Shop Engraved Pet ID Tags" — pass.
- **Secondary Keywords**: "dog tag/cat tag/pet id/collar" cluster — 21 hits, strong.
- **Meta Tags**: Title "Engraved Pet ID Tags | BadgeStore Australia" (43 chars) — good.
- **Social Tags**: consistent.
- **Structured Data**: OK; comparison table durability column already uses qualitative terms ("Outstanding", "Very High"), not fabricated year-counts — good.
- **Image Alt/Title**: good pattern; both cards mismatch visible name vs alt/title per Finding #1.
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none (durability-claim wording flagged only, not a hero/Buyer's-Guide-intro edit so outside the conditional-fix rule's literal scope).

### 17. categories/reusable-name-badges.html
- **Body Content**: Unique, specific (slot-in badge mechanism for staff turnover). Good.
- **Primary Keyword**: H1 "Reusable Name Badges" — pass.
- **Secondary Keywords**: "reusable name badge" cluster — 45 hits (this page's whole premise), strong.
- **Meta Tags**: Title "Reusable Name Badges Australia | BadgeStore" (43 chars) — good.
- **Social Tags**: consistent.
- **Structured Data**: OK.
- **Image Alt/Title**: good pattern; 1 card mismatches per Finding #1.
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none.

### 18. categories/snap-badges.html
- **Body Content**: Unique hero re: snap-frame mechanism vs acrylic dome. Good.
- **Semantic HTML**: OK.
- **Primary Keyword**: H1 is **"Snap Badges - Look like acrylic domed but cheaper"** — contains "Snap Badges" so the literal keyword is present, but the phrasing is informal, conversational, and reads like an internal note rather than customer-facing copy (unprofessional tone, inconsistent with every other H1 on the site which is a clean noun phrase). Flag for rewrite, e.g. "Shop Snap Badges".
- **Secondary Keywords**: 5 hits.
- **Meta Tags**: Title "Buy Online Snap Badges Australia |Custom Snap Badges | BadgeStore" (65 chars) — missing space after first `|`, double-barreled like engraved-name-badges.html.
- **Social Tags**: consistent with (informal) title/H1 tone.
- **Structured Data**: OK — JSON-LD `CollectionPage.name` is "Shop Engraved..." style and does NOT itself carry the informal H1 wording, so structured data is clean even though the visible H1 is not.
- **Image Alt/Title**: good pattern; 1 card mismatches per Finding #1 ("Reusable Full Colour Printed Rectangle Name Badge" vs "Reusable Printed Name Badge").
- **Internal Links**: resolve correctly.
- **Fixes Applied**: none (H1/title tone flagged only — not a hero/Buyer's-Guide-intro paragraph, so outside the conditional-fix rule's literal scope).

### 19. index.html
- **Body Content**: Not touched by today's earlier category-specific passes, as expected. Hero/subcopy ("Precision manufacturing for every badge and sign...") is clean, no doubled words or missing-space-near-price typos found. Category tiles ("Name Badges & Desk Plates", "Desk Plates", "Metal Plaques", "ID Cards & Lanyards", "Lapel Pins", "Badge Machines", "Pet Tags") correctly cover the site's real categories.
- **Semantic HTML**: H1 → H2 → H3 order correct, no skipped levels. FAQ section present (4 `<details>`) but has no matching `FAQPage` JSON-LD (only Organization + WebSite exist) — a missed structured-data opportunity, not a bug (nothing to cross-check against since no schema claims to represent it).
- **Primary Keyword**: H1 is "Australia's Premier Destination for Custom Badges, ID Cards & Recognition Plaques" — broad brand positioning, does not contain "name badges" specifically even though `<title>` and meta description lead with "Custom Name Badges Australia." This is a defensible choice for a multi-category homepage but is a looser keyword match than every category page's H1.
- **Secondary Keywords**: homepage mentions name badges, desk plates, ID cards, lapel pins, badge machines, pet tags in the category tiles — good breadth.
- **Meta Tags**: **`<title>` = "Custom Name Badges Australia | Badge Store Redesign"** — leaks the internal project/dev label "Badge Store Redesign" into a production-facing tag. See Critical Finding #3.
- **Social Tags**: `og:title` and `twitter:title` both mirror the same "Badge Store Redesign" leak. `og:description`/`twitter:description` are clean and consistent with the meta description.
- **Structured Data**: Organization + WebSite blocks are valid JSON; no CollectionPage/FAQPage (appropriate for a homepage, not a defect).
- **Image Alt/Title on product tiles**: homepage uses a different card markup (no `<article>` wrapper, illustrative "mini badge" mockups rather than real CDN product photos for most tiles) — dimension not directly comparable to category-page Featured Cards; no generic/missing alt issues spotted on the images that are real photos (e.g. Pet Tags tile).
- **Internal Links**: canonical/og:url point to badgestore.com.au (Finding #4); category tile links were not re-verified individually in this pass (out of today's stated 19-page scope beyond the homepage's own content) but match the expected category filenames by name.
- **Fixes Applied**: none (title/social-tag leak flagged only — rewriting index.html's `<title>`/og/twitter tags was not in scope for this pass's edit rules).

---

## Cross-Page Duplicate/Quality Issues

1. **No duplicate `<title>` tags** across all 19 pages — confirmed programmatically, all unique.
2. **No duplicate meta descriptions** across all 19 pages — confirmed programmatically, all unique.
3. **No duplicate hero-intro paragraphs** across the 9 name-badge-flavour pages (or any other pair of pages) — confirmed programmatically, all unique wording.
4. **Doubled-word bugs found and fixed** (3 instances, see "Fixes applied" above): "Custom Custom" (×2, on `custom-framed-name-badges.html` og/twitter image:alt) and "Buy Custom Custom Printed Lanyard" (×2, on the shared Lanyard product card used by both `id-cards.html` and `lanyards-clips-accessories.html`). No other doubled-word or missing-space-near-price patterns found in a sitewide grep (checked "the the", "a a", "name name", "badge badge", "and and", price-adjacent-letter patterns, etc.).
5. **Wrong phone number found and fixed**: `custom-framed-name-badges.html` had `1300 862 637` transposed to `1300 862 367` in 4 places (meta description, og:description, twitter:description, JSON-LD CollectionPage description) while the rest of the page (header, footer, FAQ answer) correctly used `1300 862 637`. Fixed to match.
6. **Two badly-formed `<title>` tags** (Critical Finding #2): `australian-made-badge-machines.html` and `imported-badge-machines.html` have 170+ character marketing-sentence titles instead of real titles. Flagged, not fixed (outside this pass's edit scope).
7. **"Badge Store Redesign" leaking into index.html's title/og/twitter tags** (Critical Finding #3). Flagged, not fixed.
8. **Canonical/og:url sitewide point to the original production domain** (badgestore.com.au), not this redesign's own domain (Critical Finding #4). Flagged for the user's awareness before any real deployment.
9. **Product-card visible name vs. image alt/title mismatches on ~26 cards across 15 of 18 category pages** (Critical Finding #1) — the single most widespread content-accuracy issue found, rooted in stale `<h1>` tags on the linked product pages (out of this audit's scope, but explained in detail above with the exact root cause and fix path).
10. **Minor title-tag quality issues** (not duplicates, but dated/cluttered patterns) on several pages: missing space after a `|` separator (`engraved-name-badges.html`, `snap-badges.html`), city-name-stuffing (`acrylic-dome-name-badges.html`, `metal-name-badges.html`), repeated phrase within the same title (`full-colour-name-badges.html`), and one page with a title/description far thinner than all its siblings (`hardwood-engraved-badges.html`). None fixed this pass — flagged for a dedicated meta-tag cleanup pass.
11. **Informal/unprofessional H1 on one page**: `snap-badges.html` H1 = "Snap Badges - Look like acrylic domed but cheaper." Contains the primary keyword but reads as an internal note, not customer copy. Flagged, not fixed.
12. **Thin H1s missing the category's own full name**: `australian-made-badge-machines.html` (H1 = "Australian Made") and `imported-badge-machines.html` (H1 = "Imported") both omit "Badge Machines" from the H1 itself. Flagged, not fixed.
13. **Lapel Pins cluster-data discrepancy**: the task brief's cluster notes say lapel pins has "no real products in this category," but the live page shows 3 real linked products with real prices. Flagged for the user to reconcile — no edits made based on this uncertainty.

## Summary of edits made in this pass

- `categories/custom-framed-name-badges.html`: doubled-word fix + wrong-phone-number fix (4 instances).
- `categories/id-cards.html`: doubled-word alt-text fix (1 instance).
- `categories/lanyards-clips-accessories.html`: doubled-word alt-text fix (1 instance).
- No hero/Buyer's-Guide-intro rewrites were made (conditional fix rule did not trigger on any of the 19 pages).
- All other findings above are **flagged for follow-up only** and were intentionally left unedited, either because they fall on content this task explicitly protects (Featured Card/Collection Overview names, FAQ structure, nav, footer) or because they fall outside the specific edit permissions granted for this pass (title-tag rewrites, canonical/domain changes, index.html title/social tags, H1 rewrites unrelated to the conditional hero-copy rule).
