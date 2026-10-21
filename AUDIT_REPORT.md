# Content & Factual Audit — 21 Product Pages vs. badgestore.com.au

**Scope:** 21 local HTML product pages in `/products/` (≈980–998 lines each), audited against the live site at https://www.badgestore.com.au/.
**Method:** Full pairwise line-diffs across all 21 files (grouped by product family), plus live fetches of the real site's homepage, category pages, and several specific product pages.

---

## (a) Overview / Summary Verdict

**Uniqueness: very low. This is a single template with ~1–2% of content swapped per page.**

- Within every product family (pins, desk plates, plaques, pet tags, badge machines, name badges), pairwise diffs show **only 13–16 changed line-groups out of ~980–998 total lines** — i.e. **~98.5% of each file is byte-for-byte identical** to its siblings. The only fields that vary are: `<title>`, meta description/OG/Twitter tags, JSON‑LD `name`/`image`/`description`/`sku`/price range/one FAQ Q&A pair, the breadcrumb span, the `<h1>`, the hero price, and one description paragraph.
- Every other section — nav, header, footer, trust/guarantee copy, the full "Technical Specifications" `<dl>` table, the "Bulk Guide" pricing tiers, the configurator form labels, FAQ structure (minus one swapped Q&A), and all script blocks — is **verbatim-identical** across unrelated products (e.g. a pet tag and an honours plaque share the exact same markup and much of the same copy).
- **Template bleed-through bug:** every single page — including the pet tag, the honours plaque, the lanyard, and even the **badge-making machines** (equipment, not a wearable item) — shows the configurator field labeled **"1. Employee Personalisation"**. This is copy-pasted from the name-badge template and makes no sense for a pet tag or a machine you buy to press badges yourself. This alone is strong evidence of mechanical find-and-replace generation rather than genuine product-specific writing.
- **Specs tables are not differentiated between materially different products.** Hard Enamel vs. Soft Enamel pins — which use genuinely different manufacturing processes — share an identical "Technical Specifications" table (dimensions, coating, magnet type) word for word; only the marketing description sentence differs.
- **Verdict:** this is thin/doorway-page content by conventional SEO standards — near-duplicate pages differentiated mainly by swapped nouns, numbers, and a single FAQ pair. Search engines are likely to treat these as near-duplicates and may filter most of the set out of the index in favor of one canonical version.

**Factual accuracy vs. the live site: largely unverifiable or contradicted.** The live badgestore.com.au site uses a completely different URL structure, different product names, different prices, and — critically — **several entire product categories referenced in the local files (lapel/enamel pins, badge machines, metal plaques, pet tags in brass/aluminium, standalone lanyards) could not be found anywhere on the live site's navigation or category pages.** Where equivalent real products exist (name badges, desk plates, ID cards, the one stainless-steel pet tag), prices, materials, and specs differ from the local pages.

---

## (b) Duplicated-Content Findings

| Finding | Files Affected | Detail |
|---|---|---|
| Near-identical pin pages | `hard-enamel-premium-pin.html`, `soft-enamel-custom-pin.html`, `die-struck-metallic-pin.html`, `blank-pin-components-100pack.html` | 955–957 of 981 lines identical pairwise (diff: only title/meta/JSON-LD id/price/one FAQ/h1/price/description paragraph change — 13 hunks, ~50 lines) |
| Near-identical desk plate pages | `acrylic-stand-desk-plate.html`, `aluminium-channel-desk-plate.html`, `mahogany-wedge-desk-plate.html` | Same pattern, 957/982 lines identical |
| Near-identical plaque pages | `anodised-aluminium-door-plaque.html`, `polished-brass-honours-plaque.html`, `stainless-steel-outdoor-plaque.html` | Same pattern, 957/982 lines identical |
| Near-identical pet tag pages | `anodised-aluminium-round-pet-tag.html`, `solid-brass-bone-pet-tag.html` | 957/981 lines identical |
| Near-identical badge-machine pages | `pro-badge-machine-57mm.html`, `starter-badge-machine-25mm.html` | 956/981 lines identical |
| Near-identical name-badge pages | `acrylic-domed-name-badge.html`, `reusable-printed-name-badge.html`, `walnut-hardwood-engraved-badge.html`, `rectangle-name-badge-full-colour.html`, `rectangle-name-badge-laser-engraved.html` | 962–968/990–998 lines identical |
| Template bleed-through: wrong UI label | **All 21 files** | Configurator step 1 is hard-coded as `1. Employee Personalisation` even on the pet tag, lanyard, plaque, and badge-machine pages, where there is no "employee" concept |
| Spec tables not differentiated for materially different processes | `hard-enamel-premium-pin.html` vs `soft-enamel-custom-pin.html` | Identical "Technical Specifications" table despite hard/soft enamel being different manufacturing techniques with typically different tolerances/finishes |
| All footer/nav links are placeholders | Sampled: `acrylic-domed-name-badge.html` (representative of shared footer) | 14 instances of `href="#"` for Reviews, Postage & Delivery, Terms, Privacy, Sitemap, category links, cart icon — none are live links |
| No testimonial/review content despite a "Reviews & Customer Ratings" nav link | All files (shared footer) | Link exists; no actual review/rating content or count found anywhere in the sampled file |

---

## (c) Factual Claims Checked

| Claim (local file) | Local Value | Live Site / Source | Verdict |
|---|---|---|---|
| Canonical URL pattern `badgestore.com.au/products/<slug>.html` | Present in all 21 files (canonical tag + OG/Twitter + JSON-LD `@id`/`url`) | `https://www.badgestore.com.au/products/hard-enamel-premium-pin.html` → **HTTP 404** | **Contradicted / fabricated.** The real site uses category-style URLs (e.g. `/full-colour-name-badges/`, `/desk-name-plates/`, `/laser-engraved-name-badges/`), not `/products/<slug>.html`. Every canonical/OG/JSON-LD URL in all 21 files points to a non-existent page on the real domain. |
| Phone number 1300 862 637 | All 21 files, header + footer | Confirmed on live homepage (live site itself has an internal typo "1300 862 367" elsewhere) | **Confirmed** (matches real number) |
| Address: 56 Prospect Rd, Prospect SA | `acrylic-domed-name-badge.html` footer/JSON-LD | Not shown on fetched live pages (no address visible in homepage fetch) | **Unverifiable** from pages checked (plausible — Prospect is an Adelaide suburb, consistent with "Contact Our Adelaide Team" footer link) |
| "Supplying Australian Badges Since 2006" | Header badge, all files | Not found/stated on live pages checked | **Unverifiable** |
| ABN 24 662 539 406 | `acrylic-domed-name-badge.html` footer | Not checked against ABN registry (out of scope) | **Unverifiable** |
| Rectangle Name Badge Full Colour price $9.00–$15.00 (hero), JSON-LD low $7.50 | Local | Live `/full-colour-name-badges/`: flat **$9.00** per badge, no range shown, "bulk discounts available" but unlisted | **Contradicted/unverifiable** — live site shows single $9 price, not a $7.50–$15 range |
| Acrylic Stand Desk Plate $15–$25 | Local | Live `/desk-name-plates/`: no "Acrylic Stand" product exists; closest analog "Tasmanian Blackwood w/ 6mm acrylic nameplate" has **no price shown** | **Unverifiable / product may not exist as named** |
| Aluminium Channel Desk Plate $18–$29 | Local | Live: "Premium Aluminium Desk Name Plate" = **$35.00** flat; "Replacement Desk Name Plate" = **$15.00** | **Contradicted** — real aluminium product is priced higher and differently structured (no range) |
| Mahogany Wedge Desk Plate $24–$39 | Local | Live site has no mahogany product at all (only "Tasmanian Blackwood", no price) | **Unverifiable — product appears fabricated/renamed**, not found on live site |
| Anodised Aluminium Round Pet Tag $6–$9; Solid Brass Bone Pet Tag $8–$12 | Local | Live site's only pet tag: **Stainless Steel Pet Tag 25mm Round**, **$17.95** flat, 1.2mm thickness | **Contradicted** — different material (aluminium/brass vs. stainless steel), different price, different page structure; no aluminium or brass pet tag found on live site |
| Lapel pins (hard enamel, soft enamel, die-struck, blank pin components) — 4 full product pages | Local | No pin/lapel-pin/enamel-pin category or product found anywhere in live homepage navigation or the Metal Name Badges category page (which explicitly does **not** use the terms "lapel pin," "enamel pin," "hard enamel," or "soft enamel") | **Unverifiable — category likely does not exist on the live site** (not found in available navigation) |
| Badge machines (25mm starter kit $199–$299, 57mm pro kit $249–$399) | Local | No badge-machine / button-machine product found in live navigation (a footer link labeled "Button Machines & Components" exists in the local template but is a dead `#` link, not evidence of a real live product) | **Unverifiable — category likely does not exist on the live site** |
| Barcode/RFID Access Card $6–$9 | Local | Closest live analog: **Custom ID Card Using Your Own Artwork**, $14.00 flat, 86mm x 54mm, no RFID/barcode chip feature mentioned, only an "optional barcode" printed graphic | **Contradicted** — real product has no RFID functionality; price differs substantially |
| Plaques (anodised aluminium door $55–$95, polished brass honours $95–$145, stainless steel outdoor $80–$120) | Local | No plaque category found in live navigation; footer link "Metal Plaques & Honours Boards" in local template is a dead `#` link | **Unverifiable — category likely does not exist on the live site** |
| Custom Printed Lanyard $2.50–$4.50 | Local | Live site: lanyards only appear as an attachment *feature* of the ID card product ("slot for lanyard or clip"); no standalone lanyard product found | **Unverifiable — standalone product likely does not exist on the live site** |
| **Internal inconsistency (every file):** JSON-LD `aggregateOffer.lowPrice` vs. displayed hero price `id="live-hero-price"` | **All 21 files** show a lower `lowPrice` in the schema.org JSON-LD than the price actually displayed to the user (e.g. hard enamel pin: JSON low **$1.90** vs. displayed **$2.50**; door plaque: JSON low **$49.00** vs. displayed **$55.00**; one exception, `pro-badge-machine-57mm.html`, runs the *opposite* direction: JSON low **$299** vs. displayed **$249**) | N/A — purely internal | **Suspicious/likely bug**, not a placeholder but a systematic mismatch between the price Google would show in rich snippets and the price customers actually see on-page. Worth fixing regardless of live-site comparison — it's a real SEO risk (price mismatch between structured data and visible content can trigger Google Merchant/Rich Results warnings). |
| Footer nav links (Reviews & Customer Ratings, Postage & Delivery Tracking, Terms & Conditions, Privacy Policy, category links, cart icon) | All files | N/A | **Broken/placeholder** — all resolve to `href="#"`, i.e. non-functional anchors, not live pages |
| No Lorem Ipsum found | — | — | Checked; no literal "lorem ipsum" remnants found in sampled files |
| No fabricated star ratings or "X,000+ customers" counts found | — | — | Checked across sampled files; none present — review/rating section exists in the template but is empty, not populated with fake numbers |

---

## (d) Top Recommendations

1. **Fix the canonical/OG/JSON-LD URLs.** All 21 pages claim a canonical URL under `/products/<slug>.html` on the real `badgestore.com.au` domain that returns a 404. If this site is meant to go live under its own domain, these should point to itself; if it's meant to represent badgestore.com.au's real pages, the URLs are wrong and will mislead both users and search engines (duplicate-content/canonical-404 signal).
2. **Verify which product lines are genuine before publishing.** Pins (hard/soft enamel, die-struck), badge machines, metal plaques, and non-stainless-steel pet tags could not be located anywhere on the live site's discoverable navigation. Confirm with the site owner whether these are: (a) real SKUs sold elsewhere on the site that simply weren't reachable from the homepage, or (b) invented/placeholder product lines — before treating this content as a "clone" of real pages.
3. **Reconcile prices.** Every verifiable overlap (name badges, desk plates, pet tag, ID card) showed different prices and/or pricing structure (flat price vs. range) between local files and the live site. Re-pull actual current pricing before publishing.
4. **Fix the JSON-LD/displayed-price mismatch on every page** — the schema.org `lowPrice` should equal (or bracket) the price shown in the hero, not undercut it by $0.50–$6.
5. **De-templatize the content**, especially the "Employee Personalisation" label bleeding into pet tags, plaques, lanyards, and machines, and differentiate the Technical Specifications tables between products that use genuinely different materials/processes (e.g. hard vs. soft enamel). As written, this content is highly vulnerable to being treated as duplicate/thin content by search engines.
6. **Replace all placeholder `href="#"` links** (reviews, terms, privacy, delivery tracking, category nav, cart) with real destinations before launch — currently every secondary link on every page is dead.
7. **Populate or remove the "Reviews & Customer Ratings" section/link** — it exists in the nav but no actual testimonial or rating content was found on the sampled pages.
