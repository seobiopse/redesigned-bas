# Materials / Size / Dimension Cross-Check: Redesigned Site vs Live badgestore.com.au

**Date:** 5 Nov 2026
**Method:** Fetched every live product page and the live category pages from www.badgestore.com.au, extracted the description text, and compared it with the matching local `products/*.html` and `categories/*.html` pages (spec tables, hero copy and FAQs). Button badges and fridge magnets do not exist on badgestore.com.au; their stated source is badge-a-minit.com.au, so they were checked against that site.
**Scope:** materials, sizes, dimensions, thickness, finish/construction claims. Prices are noted only where relevant.

## Status update (5 Nov 2026): fixes applied

Everything marked 🔴 or 🟠 below has been corrected on the redesigned pages, using only facts from the live site:

- **18 category pages:** the "Materials & Craftsmanship" box was rewritten per category. "3-5 years", polyurethane, impact-resistant acrylic, brass, CZ120, cell-cast acrylic, veneer and "75 x 25mm" were removed. The fake sidebar facets (invented counts, "Adhesive Backing", "Wooden Mount Plate", die sets) and the invented comparison tables (hourly output, "Marine Grade 316", brass rows) were also corrected. The same text was fixed in `sitemap.html`, `index.html` and `categories/name-badges.html` cards.
- **Product pages:** pet tag sizes, timber claims (5-ply), Snap Badge wording, acrylic dome sizes, desk plate sizes and colours, plaque thickness and outdoor claims, framed/snap/metal/bevelled sizes, 1800B material, card holder wording, 25mm button badge (pin back only). Published sizes were added to the spec tables of the plastic badge pages.

**Still open (cannot be verified from the live site; confirm with the shop owner):**
- ID Card Clip ("nickel-plated metal, swivel clip"), Lanyard ("blue"), Retractable Lanyard ("belt clip reel").
- MULTI PRESS badge size and power requirements; lapel pin sizes/shapes.
- 57mm button badge attachment options (25mm and 35mm checked against badge-a-minit.com.au; 57mm not confirmed).
- Stainless pet tag comparison wording ("more corrosion- and scratch-resistant than anodised aluminium").
- Several product filenames still don't match their products (e.g. `solid-brass-bone-pet-tag.html`). URLs were left unchanged to avoid breaking links.

---

**Legend:** 🔴 contradicts the live site or states something the live site never says (reputation risk) · 🟠 live data exists but we omit it or say "not published" · 🟡 cannot be verified from the live site.

---

## A. Category pages: the "Materials & Craftsmanship" box (systemic)

The sentence "Available shapes and dimensions include: …" and the "Substrates feature Impact-Resistant Hard Acrylic Base, 2-Ply Laser-Markable Polymer Plate, Sustainable Walnut Hardwood Veneer…" are template text. They are not drawn from the live site. They are also repeated on categories where they make no sense (lanyards, ID cards, pet tags, machines).

| Category page | Local says | Live site says | |
|---|---|---|---|
| `name-badges.html` | 75x25 (standard corporate size), 75x25, 75x30, 75x25 (3mm thick); acrylic base, 2-ply polymer, walnut veneer | Plastic/timber/metal badges in 64x20, 70x23, 80x30 (rectangles), plus oval, round and square sizes. No thickness stated. No "veneer" or "impact-resistant acrylic". | 🔴 |
| `full-colour-name-badges.html` | "UV-printed directly onto impact-resistant acrylic"; 75x25 | "Printed directly on the badge… digital UV Printing… 1440dpi". Product pages say plastic. Sizes 64x20 / 70x23 / 80x30 (plus other shapes). | 🔴 |
| `engraved-name-badges.html` | 75x25 | Dual-layer plastic; 64x20 / 70x23 / 80x30 (plus oval, round, square) | 🔴 |
| `hardwood-engraved-badges.html` | 75x25 (3mm thick) | 64x20 / 70x23 / 80x30. Made from 5-ply laminated timber. No thickness stated. | 🔴 |
| `metal-name-badges.html` | 75x25 | Aluminium, **76x25** (Premium Metal); Bevelled **68x20**; Bevelled Reusable **68x25** | 🔴 |
| `acrylic-dome-name-badges.html` | "thick layer of premium **polyurethane resin**… 3D dome"; 75x25 | "clear **acrylic** doming", crystal clear, high gloss. Sizes: rectangle 64x20 / 70x23 / 80x30, square 40/50/65, oval 45x25 / 55x30 / 80x40, round 33/50/65mm. | 🔴 |
| `snap-badges.html`, `reusable-name-badges.html`, `custom-framed-name-badges.html` | 75x30 | Snap: 75x25 badge area, 80x30 with frame. Framed: 75x25. Reusable: no size stated on the live page. | 🔴 |
| `metal-plaques.html` | "marine-grade stainless, **high-polished brass**, anodised aluminium"; sizes A4 / 300x200 / 200x100; "CZ120 Brass Plate"; JSON-LD says "brass" | Stainless steel (type 304 #4, 1mm) and anodised aluminium (1mm, 16+ micron coating). **No brass.** Aluminium: custom sizes up to 250x500. Stainless: "several popular sizes". | 🔴 |
| `desk-plates.html` | "10mm thick cell-cast acrylic, diamond-polished edges"; sizes 200x50 / 210x60x50 / 180x45x15 | Not on the live site. Live products: A-Frame (195x50 or 135x50), Premium Aluminium (stand 250x50, insert 250x46), Tasmanian Blackwood with 6mm acrylic (artwork 200x50). | 🔴 |
| `badge-machines.html`, `australian-made…`, `imported…` | "25mm / 32mm / 57mm Die Set", "solid steel build", "kit includes 25mm die cutter and 100 sets", "assembled in Australia" | Live shows only 2 machines: MULTI PRESS (no description) and 1800B (57mm only, sand-cast frame, 6kg). No die-set products on the live listings. | 🔴 |
| `id-cards.html` | CR80 85.6x54, "CR80 standard thickness" | 86x54mm. No thickness stated. | 🟠 |
| `lapel-pins.html` | 20 / 25 / 30mm custom shapes | Live says "enamel and metal alloys". No sizes stated. | 🟡 |
| `pet-tags.html` | Heart 32x28, star 32x32, cat face 30x28 | See section B. These three are wrong. | 🔴 |
| `lanyards-clips-accessories.html`, `id-cards.html`, `pet-tags.html`, others | "durability of at least **3-5 years**" | Not stated anywhere on the live site. Only the aluminium plaque has a live durability figure (UV rating up to 7 years outdoors). | 🔴 |

---

## B. Product pages: confirmed wrong (live contradicts local)

| Product (local file) | Local | Live | |
|---|---|---|---|
| Pet Tag Cat Face (`pet-tag-…-cat-face-shape`) | 30mm x 28mm | **23mm x 23mm** | 🔴 |
| Pet Tag Heart (`pet-tag-…-heart-shape`) | 32mm x 28mm | **26mm x 26mm** | 🔴 |
| Pet Tag Star (`pet-tag-…-star-shape`) | 32mm x 32mm | **37mm x 37mm** | 🔴 |
| Bamboo / Cherry / Maple / Mahogany / Walnut Name Badge (5 pages) | "solid X hardwood", "Genuine X Hardwood", "genuine hardwood instead of plastic" | "made from X **5 ply timber**" (laminate). Bamboo page also says "solid bamboo", and calls it hardwood "though technically a grass". | 🔴 |
| Premium Aluminium Desk Name Plate | "Aluminium, fully anodised **black**"; "matte uniform finish" | Available in anodised **black, silver or gold** | 🔴 |
| Aluminium Plaque | "Outdoor/weatherproof rating not specified"; "not for heavy outdoor exposure"; "lighter option than solid steel" | "Suitable for internal and external use", UV rating up to 7 years outdoors, 16+ micron anodic coating | 🔴 |
| Stainless Steel Plaque | "Solid stainless steel… far more weight and rigidity than our **1mm** aluminium… thin sheet vs solid" | Stainless is **also 1mm** (type 304 #4). The "solid vs thin sheet" comparison is misleading. | 🔴 |
| Snap Badge | "Acrylic Dome Snap Badge", "snap-together acrylic dome", "acrylic dome finish" | A frame with a **clear lens** that gives the *appearance* of being domed. Live explicitly says it is "less expensive" than the real acrylic dome. | 🔴 |
| Premium Metal Rectangle Name Badge | Material "Metal", no size | **Aluminium, 76x25mm**, colour list | 🟠 |

## C. Product pages: live data exists but we omit it or say "not published"

| Product | Local | Live |
|---|---|---|
| Acrylic Domed Name Badge | "dimensions not published by manufacturer… on request" (spec table and 2 FAQs) | Sizes published for rectangle, square, oval and round (see section A) |
| Premium Aluminium Desk Plate | "insert size isn't published" (FAQ) | Stand 250x50, insert 250x46 |
| Replacement Desk Name Plate | Material "not specified" | Insert 250x46 |
| A-Frame Desk Name Plate | No dimensions; page calls it "this **acrylic** name plate" (file `acrylic-stand-desk-plate`) | 195x50 stand / 135x50 insert. **No material stated** on live, so "acrylic" is invented. |
| Bevelled Edge Premium Metal Name Badge | Size absent; "fixed, one-time engraved" | 68x20mm, gold only. Live says "we can print your design". |
| Bevelled Edge Reusable Premium Metal Name Badge | Size absent | 68x25mm, gold only, pin clip only |
| Full Colour Framed Rectangle | No size; frames "black or black with gold rim" | 75x25 standard; frame options also include silver trim |
| Snap Badge | No size | 75x25 badge area, 80x30 with frame |
| Rectangle / Oval / Round / Square Full Colour and Engraved (8 pages) | No size information | Rectangle 64x20 / 70x23 / 80x30; oval 45x25 / 55x30 / 80x40; round 33 / 50 / 65mm diameter; square 40 / 50 / 65 (+75 full colour). Live square engraved page says "diameter" (a live typo). |
| Stainless Steel Plaque / Aluminium Plaque | Dimensions "not specified" | Aluminium: any custom size up to 250x500, optional corner holes. Stainless: several popular sizes. |
| 1800B Badge-A-Matic | Material "not specified" | Sand-cast machine frame, 6kg, comes with 100 components and circle cutter |
| Card Holder for ID Card | "Rigid clear plastic, top-slot" | "Clear card holder pouch", portrait or landscape. "Rigid" and "top-slot" are not live claims. |
| Reusable Printed Name Badge | "Plastic housing with slide-out paper insert" | Badge body printed with company name/logo; paper name inserted in a slot. "Plastic housing" is not stated. |

## D. Product pages: cannot be verified (live page has no description)

| Product | Local claim |
|---|---|
| ID Card Clip | "Nickel-plated metal", "swivel clip with card pin" |
| Lanyard | "Colour: Blue", alligator clip |
| Retractable Lanyard | "Belt clip reel", "extends to reach scanners" (live: only "with alligator clip") |
| Tasmanian Blackwood Desk Plate | "Rear-side engraving at extra cost". Not on the live page. (Other specs match: 6mm acrylic, 200x50 artwork.) |
| Stainless Steel Pet Tag 25mm | Matches live (25mm, 1.2mm). Local copy "more corrosion- and scratch-resistant than anodised aluminium" is a comparison the live site does not make. |

## E. Matches live (no action)

- Pet tags: Round 30x25, Cat 35x25, Bone 35x21 (all 1.2mm anodised aluminium); Stainless 25mm round.
- Custom ID Card: 86x54mm.
- Laser engraved plastic: dual-layer plastic. Hardwood badge sizes 64x20 / 70x23 / 80x30.
- Tasmanian Blackwood: 6mm acrylic, 200x50 artwork.
- 1800B: 57mm only. Aluminium plaque: 1mm. Stainless: stainless steel.

## F. Button badges and fridge magnets (source: badge-a-minit.com.au, not badgestore.com.au)

| Item | Local | Source site | |
|---|---|---|---|
| All button badges | "Metal shell with protective plastic cover" | 25mm and 57mm: "tinplate metal shell + Mylar film". 35mm: "Metal front & plastic back". Close, but wording differs. | 🟡 |
| Attachments, all sizes | "pin, magnet or keychain" | 25mm: **pin back only**. 35mm and 85mm: pin / magnet / keychain. 57mm: not confirmed. (`DEV_NOTE` already flags this as an open item.) | 🔴 25mm |
| Fridge magnets | "printed face with strong magnetic backing" | "Metal construction", "for metal surfaces, not fabric" | 🟡 |

These products are not sold on badgestore.com.au at all, so there is no live BadgeStore page to verify them against.

## G. Other things noticed (not spec errors)

- Several files have filenames that do not match the product on them (e.g. `blank-pin-components-100pack.html` is the Round Name Badge Full Colour; `hard-enamel-premium-pin.html` is the Oval Engraved; `standard-employee-photo-id.html` is the Snap Badge; `mahogany-wedge-desk-plate.html` is the Tasmanian Blackwood plate).
- Hero prices show "From $6.30" against the live $9.00. This is the intentional 30% bulk-discount display per `DEV_NOTE`, not a spec issue.

---

## Recommended fix order

1. **Remove or replace the template "Materials & Craftsmanship" box on every category page.** Use only product-sourced facts, and drop "3-5 years", "polyurethane resin", "impact-resistant acrylic", "CZ120 brass", "cell-cast acrylic" and "veneer".
2. Correct the three pet tag sizes (cat face, heart, star) on the product pages and `pet-tags.html`.
3. Fix the timber claims: "5-ply timber", not "solid hardwood / genuine hardwood".
4. Fix the Snap Badge wording (clear lens in a frame, appears domed, not an acrylic dome).
5. Fix the desk plate (black / silver / gold) and the plaque outdoor and thickness claims.
6. Add the published sizes where we currently say "not published" or give none.
7. Decide how to handle the unverifiable lines in section D: confirm with the shop owner or remove.
