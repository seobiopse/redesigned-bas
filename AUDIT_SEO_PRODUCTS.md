# SEO Audit Report — Product Pages

## Verification Results (run before audit findings below)

- **JSON-LD validity:** All 22 product pages' JSON-LD `<script type="application/ld+json">` blocks parse successfully with Node's `JSON.parse` — 0 parse errors.

- **FAQ `<details>` count:** All 22 pages have exactly 6 `<details>` elements (unchanged).

- **Nav/footer/edits:** Only 2 of the 22 files were modified — `aluminium-channel-desk-plate.html` and `mahogany-wedge-desk-plate.html` — each with exactly 2 one-sentence edits (the hero paragraph and the specs-intro sentence), per the Conditional Fix Rule (see their sections below). `git diff --stat products/` confirms only these 2 files changed, 4 lines total (2 insertions + 2 deletions each). No nav, breadcrumb, footer, FAQ `<details>` structure/count, JSON-LD block, price markup, or dev-tooltip markup (`group/devtip`, `group/faqp`) was touched in either file or anywhere else.

- **H1 count:** Exactly 1 `<h1>` per page, confirmed on all 22.

- **Structured data cross-checks:** For all 22 pages, `Product.name` matches the visible `<h1>` exactly, `Product.sku` is present and non-empty, and the visible FAQ `<summary>` question text matches `FAQPage.mainEntity[].name` exactly (spot-checked all 22 programmatically, not just 2–3).


---

## acrylic-domed-name-badge.html

**H1 / Product name:** Full Colour Or Engraved Acrylic Domed Rectangle Name Badge  |  **Cluster:** name_badges  |  **Price:** $17.50

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: name badge, custom badge (checked: name badge, custom badge, badge maker).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: reusable name badge, business days (checked: reusable name badge, business days, lasting impression, events, conferences, name changes).
- **6. Meta Tags:** ⚠️ Title (96 chars): "Full Colour Or Engraved Acrylic Domed Rectangle Name Badge | Buy Custom Name Badges | BadgeStore". Meta description (134 chars, unique, under 160): "Shop the Full Colour Or Engraved Acrylic Domed Rectangle Name Badge - $17.50. Clear acrylic dome over a full-colour or engraved badge.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($17.50/$17.50) match displayed hero price ("$17.50"). SKU present (BAS-REC-AD). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Full Colour Or Engraved Acrylic Domed Rectangle Name Badge online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## acrylic-stand-desk-plate.html

**H1 / Product name:** A-Frame Style Desk Name Plate  |  **Cluster:** desk_plates  |  **Price:** $25.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: desk name plate, nameplate (checked: desk name plate, nameplate).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: acrylic name plate (checked: acrylic name plate, engraved desk, custom name sign, laser engraving, desk signs, reception desk display).
- **6. Meta Tags:** ⚠️ Title (67 chars): "A-Frame Style Desk Name Plate | Buy Custom Name Badges | BadgeStore". Meta description (118 chars, unique, under 160): "Shop the A-Frame Style Desk Name Plate - $25.00. Freestanding A-frame, shows a different name or message on each side.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($25.00/$25.00) match displayed hero price ("$25.00"). SKU present (BAS-DP-AC). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the A-Frame Style Desk Name Plate online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## aluminium-channel-desk-plate.html

**H1 / Product name:** Premium Aluminium Desk Name Plate with changeable nameplate  |  **Cluster:** desk_plates  |  **Price:** $35.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: desk name plate, nameplate (checked: desk name plate, nameplate).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: desk signs, reception desk display (checked: acrylic name plate, engraved desk, custom name sign, laser engraving, desk signs, reception desk display).
- **6. Meta Tags:** ⚠️ Title (97 chars): "Premium Aluminium Desk Name Plate with changeable nameplate | Buy Custom Name Badges | BadgeStore". Meta description (147 chars, unique, under 160): "Shop the Premium Aluminium Desk Name Plate with changeable nameplate - $35.00. Anodised black aluminium stand with a slide-in changeable nameplate.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($35.00/$35.00) match displayed hero price ("$35.00"). SKU present (BAS-DP-AL). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Premium Aluminium Desk Name Plate with changeable nameplate online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** YES. Original hero paragraph and specs-intro sentence scored zero hits against the desk-plates cluster entity list ("acrylic name plate", "engraved desk", "custom name sign", "laser engraving") — that list assumes acrylic/engraved construction, which doesn't fit this aluminium slide-in/printed-insert product. Ran a fresh Ahrefs `keywords-explorer-related-terms` lookup (also_talk_about, country=au) — the product-specific query ("aluminium desk name plate") returned no usable AU data, so used the cluster-level query "desk name plate" instead, which returned real terms including "desk signs" and "reception desk display". Rewrote the hero paragraph and specs-intro sentence to naturally include both terms, without changing any price, material, or fact already on the page. JSON-LD `Product.description` left as-is (no fact changed). Verified post-edit: JSON-LD still parses, FAQ count still 6, only these 2 sentences changed (git diff).


---

## anodised-aluminium-door-plaque.html

**H1 / Product name:** Aluminium Plaque - Laser Engraved  |  **Cluster:** plaques  |  **Price:** $20.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: metal plaque (checked: engraved plaque, metal plaque).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: anodised aluminium, outdoor use (checked: anodised aluminium, outdoor use, custom laser engraved).
- **6. Meta Tags:** ⚠️ Title (71 chars): "Aluminium Plaque - Laser Engraved | Buy Custom Name Badges | BadgeStore". Meta description (83 chars, unique, under 160): "Shop the Aluminium Plaque - Laser Engraved - $20.00. Anodised aluminium, 1mm thick.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($20.00/$20.00) match displayed hero price ("$20.00"). SKU present (BAS-PL-AA). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Aluminium Plaque - Laser Engraved online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## anodised-aluminium-round-pet-tag.html

**H1 / Product name:** Pet Tag Anodised Aluminium Round Shape  |  **Cluster:** pet_tags  |  **Price:** $13.95

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: pet tag (checked: pet tag, dog tag).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: pet id, collar (checked: cat tag, pet id, dog name tag, collar).
- **6. Meta Tags:** ⚠️ Title (76 chars): "Pet Tag Anodised Aluminium Round Shape | Buy Custom Name Badges | BadgeStore". Meta description (111 chars, unique, under 160): "Shop the Pet Tag Anodised Aluminium Round Shape - $13.95. 30mm x 25mm, 1.2mm thick, one or two-sided engraving.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($13.95/$13.95) match displayed hero price ("$13.95"). SKU present (BAS-GEN). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Pet Tag Anodised Aluminium Round Shape online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## barcode-rfid-access-card.html

**H1 / Product name:** Custom ID Card Using Your Own Artwork  |  **Cluster:** id_cards  |  **Price:** $14.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: id card (checked: id card, photo id).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: staff id, card size (checked: staff id, photo id card, card size, id cards australia).
- **6. Meta Tags:** ⚠️ Title (75 chars): "Custom ID Card Using Your Own Artwork | Buy Custom Name Badges | BadgeStore". Meta description (107 chars, unique, under 160): "Shop the Custom ID Card Using Your Own Artwork - from $14.00. 86mm x 54mm, full colour, 1 or 2 sided print.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($14.00/$14.00) match displayed hero price ("From $14.00"). SKU present (BAS-ID-RF). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Custom ID Card Using Your Own Artwork online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## blank-pin-components-100pack.html

**H1 / Product name:** Round Name Badge Full Colour  |  **Cluster:** name_badges  |  **Price:** $9.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: name badge, custom badge (checked: name badge, custom badge, badge maker).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: reusable name badge, business days (checked: reusable name badge, business days, lasting impression, events, conferences, name changes).
- **6. Meta Tags:** ⚠️ Title (66 chars): "Round Name Badge Full Colour | Buy Custom Name Badges | BadgeStore". Meta description (86 chars, unique, under 160): "Shop the Round Name Badge Full Colour - $9.00. Plastic round badge, full colour print.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($9.00/$9.00) match displayed hero price ("$9.00"). SKU present (BAS-GEN). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Round Name Badge Full Colour online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## custom-printed-lanyard.html

**H1 / Product name:** Lanyard  |  **Cluster:** lanyards  |  **Price:** $2.45–$3.50

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: lanyard (checked: lanyard).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: neck lanyard (checked: lanyard id holder, neck lanyard, metal clip, hook clip).
- **6. Meta Tags:** ✅ Title (45 chars): "Lanyard | Buy Custom Name Badges | BadgeStore". Meta description (93 chars, unique, under 160): "Shop the Lanyard - $3.50. Blue lanyard with alligator clip, for use with ID cards and badges.".
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($2.45/$3.50) match displayed hero price ("$3.50"). SKU present (BAS-ID-LN). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Lanyard online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## die-struck-metallic-pin.html

**H1 / Product name:** Oval Name Badge Full Colour  |  **Cluster:** name_badges  |  **Price:** $9.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: name badge, custom badge (checked: name badge, custom badge, badge maker).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: reusable name badge, business days (checked: reusable name badge, business days, lasting impression, events, conferences, name changes).
- **6. Meta Tags:** ⚠️ Title (65 chars): "Oval Name Badge Full Colour | Buy Custom Name Badges | BadgeStore". Meta description (84 chars, unique, under 160): "Shop the Oval Name Badge Full Colour - $9.00. Plastic oval badge, full colour print.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($9.00/$9.00) match displayed hero price ("$9.00"). SKU present (BAS-GEN). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Oval Name Badge Full Colour online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## hard-enamel-premium-pin.html

**H1 / Product name:** Oval Name Badge Laser Engraved  |  **Cluster:** name_badges  |  **Price:** $9.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: name badge, custom badge (checked: name badge, custom badge, badge maker).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: reusable name badge, business days (checked: reusable name badge, business days, lasting impression, events, conferences, name changes).
- **6. Meta Tags:** ⚠️ Title (68 chars): "Oval Name Badge Laser Engraved | Buy Custom Name Badges | BadgeStore". Meta description (95 chars, unique, under 160): "Shop the Oval Name Badge Laser Engraved - $9.00. Dual-layer plastic oval badge, laser engraved.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($9.00/$9.00) match displayed hero price ("$9.00"). SKU present (BAS-GEN). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Oval Name Badge Laser Engraved online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## mahogany-wedge-desk-plate.html

**H1 / Product name:** Tasmanian Blackwood Desk Name Plate with printed 6mm Acrylic nameplate  |  **Cluster:** desk_plates  |  **Price:** Out of stock — no price published (Offer.availability = OutOfStock)

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: desk name plate, nameplate (checked: desk name plate, nameplate).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: acrylic name plate, desk signs (checked: acrylic name plate, engraved desk, custom name sign, laser engraving, desk signs, reception desk display).
- **6. Meta Tags:** ⚠️ Title (108 chars): "Tasmanian Blackwood Desk Name Plate with printed 6mm Acrylic nameplate | Buy Custom Name Badges | BadgeStore". Meta description (142 chars, unique, under 160): "Tasmanian Blackwood Desk Name Plate with printed 6mm Acrylic nameplate - currently out of stock. Call 1300 862 637 for pricing & availability.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers uses a plain Offer with availability=OutOfStock and no price (correct schema.org usage for an unpriced out-of-stock item — lowPrice/highPrice are not required here). SKU present (BAS-DP-MH). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Tasmanian Blackwood Desk Name Plate with printed 6mm Acrylic nameplate online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** YES. Same trigger as the aluminium desk plate (zero hits against the desk-plates entity list, since that list assumes acrylic/engraved construction and this is a timber/printed-insert product). Reused the same "desk name plate" Ahrefs also_talk_about lookup (country=au) and picked "desk signs" and "acrylic name plate" (both genuinely applicable — this product is literally compared to acrylic/aluminium stands in its own copy) to weave into the hero paragraph and specs-intro sentence. No price, material, or out-of-stock fact was changed. JSON-LD `Product.description` left as-is (no fact changed). Verified post-edit: JSON-LD still parses, FAQ count still 6, only these 2 sentences changed (git diff).


---

## polished-brass-honours-plaque.html

**H1 / Product name:** Square Name Badge Laser Engraved  |  **Cluster:** name_badges  |  **Price:** $9.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: name badge, custom badge (checked: name badge, custom badge, badge maker).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: reusable name badge, business days (checked: reusable name badge, business days, lasting impression, events, conferences, name changes).
- **6. Meta Tags:** ⚠️ Title (70 chars): "Square Name Badge Laser Engraved | Buy Custom Name Badges | BadgeStore". Meta description (99 chars, unique, under 160): "Shop the Square Name Badge Laser Engraved - $9.00. Dual-layer plastic square badge, laser engraved.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($9.00/$9.00) match displayed hero price ("$9.00"). SKU present (BAS-PL-PB). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Square Name Badge Laser Engraved online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## pro-badge-machine-57mm.html

**H1 / Product name:** 1800B Badge-A-Matic  |  **Cluster:** badge_machines  |  **Price:** $799.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: badge maker, badge machine (checked: badge maker, badge machine).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: press machine, button badge maker, button badge (checked: press machine, button badge maker, button badge).
- **6. Meta Tags:** ✅ Title (60 chars): "1800B Badge-A-Matic | Buy Button Badge Machines | BadgeStore". Meta description (91 chars, unique, under 160): "Shop the 1800B Badge-A-Matic - $799.00. Fixed-size button badge machine, makes 57mm badges.".
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($799.00/$799.00) match displayed hero price ("$799.00"). SKU present (BAS-GEN). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the 1800B Badge-A-Matic online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## rectangle-name-badge-full-colour.html

**H1 / Product name:** Rectangle Name Badge Full Colour  |  **Cluster:** name_badges  |  **Price:** $9.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: name badge, custom badge, badge maker (checked: name badge, custom badge, badge maker).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: reusable name badge, business days, lasting impression, events (checked: reusable name badge, business days, lasting impression, events, conferences, name changes).
- **6. Meta Tags:** ⚠️ Title (70 chars): "Rectangle Name Badge Full Colour | Buy Custom Name Badges | BadgeStore". Meta description (99 chars, unique, under 160): "Shop the Rectangle Name Badge Full Colour - $9.00 flat. Plastic rectangle badge, full colour print.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($9.00/$9.00) match displayed hero price ("$9.00"). SKU present (BAS-REC-FC). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Rectangle Name Badge Full Colour online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## rectangle-name-badge-laser-engraved.html

**H1 / Product name:** Rectangle Name Badge Laser Engraved  |  **Cluster:** name_badges  |  **Price:** $9.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: name badge, custom badge (checked: name badge, custom badge, badge maker).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: reusable name badge, business days (checked: reusable name badge, business days, lasting impression, events, conferences, name changes).
- **6. Meta Tags:** ⚠️ Title (73 chars): "Rectangle Name Badge Laser Engraved | Buy Custom Name Badges | BadgeStore". Meta description (94 chars, unique, under 160): "Shop the Rectangle Name Badge Laser Engraved - $9.00 flat. Dual-layer plastic, laser engraved.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($9.00/$9.00) match displayed hero price ("$9.00"). SKU present (BAS-REC-LE). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Rectangle Name Badge Laser Engraved online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## reusable-printed-name-badge.html

**H1 / Product name:** Reusable Full Colour Printed Rectangle Name Badge  |  **Cluster:** name_badges  |  **Price:** $12.50

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: name badge, custom badge (checked: name badge, custom badge, badge maker).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: reusable name badge, business days (checked: reusable name badge, business days, lasting impression, events, conferences, name changes).
- **6. Meta Tags:** ⚠️ Title (87 chars): "Reusable Full Colour Printed Rectangle Name Badge | Buy Custom Name Badges | BadgeStore". Meta description (123 chars, unique, under 160): "Shop the Reusable Full Colour Printed Rectangle Name Badge - $12.50. Slide-out insert, change the name without a new badge.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($12.50/$12.50) match displayed hero price ("$12.50"). SKU present (BAS-REC-RU). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Reusable Full Colour Printed Rectangle Name Badge online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## soft-enamel-custom-pin.html

**H1 / Product name:** Bevelled Edge Reusable Premium Metal Name Badge  |  **Cluster:** name_badges  |  **Price:** $18.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: name badge, custom badge (checked: name badge, custom badge, badge maker).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: reusable name badge, business days (checked: reusable name badge, business days, lasting impression, events, conferences, name changes).
- **6. Meta Tags:** ⚠️ Title (85 chars): "Bevelled Edge Reusable Premium Metal Name Badge | Buy Custom Name Badges | BadgeStore". Meta description (104 chars, unique, under 160): "Shop the Bevelled Edge Reusable Premium Metal Name Badge - $18.00. Metal badge, bevelled edge, reusable.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($18.00/$18.00) match displayed hero price ("$18.00"). SKU present (BAS-GEN). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Bevelled Edge Reusable Premium Metal Name Badge online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## solid-brass-bone-pet-tag.html

**H1 / Product name:** Pet Tag Anodised Aluminium Bone Shape  |  **Cluster:** pet_tags  |  **Price:** $13.95

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: pet tag (checked: pet tag, dog tag).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: pet id, collar (checked: cat tag, pet id, dog name tag, collar).
- **6. Meta Tags:** ⚠️ Title (75 chars): "Pet Tag Anodised Aluminium Bone Shape | Buy Custom Name Badges | BadgeStore". Meta description (110 chars, unique, under 160): "Shop the Pet Tag Anodised Aluminium Bone Shape - $13.95. 35mm x 21mm, 1.2mm thick, one or two-sided engraving.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($13.95/$13.95) match displayed hero price ("$13.95"). SKU present (BAS-GEN). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Pet Tag Anodised Aluminium Bone Shape online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## stainless-steel-outdoor-plaque.html

**H1 / Product name:** Stainless Steel Plaque - Laser Engraved  |  **Cluster:** plaques  |  **Price:** $60.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: metal plaque (checked: engraved plaque, metal plaque).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: anodised aluminium, outdoor use (checked: anodised aluminium, outdoor use, custom laser engraved).
- **6. Meta Tags:** ⚠️ Title (77 chars): "Stainless Steel Plaque - Laser Engraved | Buy Custom Name Badges | BadgeStore". Meta description (97 chars, unique, under 160): "Shop the Stainless Steel Plaque - Laser Engraved - $60.00. Solid stainless steel, laser engraved.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($60.00/$60.00) match displayed hero price ("$60.00"). SKU present (BAS-PL-SS). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Stainless Steel Plaque - Laser Engraved online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## standard-employee-photo-id.html

**H1 / Product name:** Snap Badge Full Colour or Engraved  |  **Cluster:** name_badges  |  **Price:** $13.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: name badge, custom badge (checked: name badge, custom badge, badge maker).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: reusable name badge, business days (checked: reusable name badge, business days, lasting impression, events, conferences, name changes).
- **6. Meta Tags:** ⚠️ Title (72 chars): "Snap Badge Full Colour or Engraved | Buy Custom Name Badges | BadgeStore". Meta description (93 chars, unique, under 160): "Shop the Snap Badge Full Colour or Engraved - $13.00. Clear acrylic dome snap-together badge.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($13.00/$13.00) match displayed hero price ("$13.00"). SKU present (BAS-ID-ST). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Snap Badge Full Colour or Engraved online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## starter-badge-machine-25mm.html

**H1 / Product name:** MULTI PRESS  |  **Cluster:** badge_machines  |  **Price:** $100.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: badge machine (checked: badge maker, badge machine).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: button badge (checked: press machine, button badge maker, button badge).
- **6. Meta Tags:** ✅ Title (52 chars): "MULTI PRESS | Buy Button Badge Machines | BadgeStore". Meta description (72 chars, unique, under 160): "Shop the MULTI PRESS - $100.00. Entry-level button badge making machine.".
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($100.00/$100.00) match displayed hero price ("$100.00"). SKU present (BAS-GEN). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the MULTI PRESS online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## walnut-hardwood-engraved-badge.html

**H1 / Product name:** Walnut Rectangle Name Badge Laser Engraved  |  **Cluster:** name_badges  |  **Price:** $9.00

- **1. Body Content:** ✅ Hero paragraph and specs-intro are unique to this product, grounded in its real price/material facts, and substantive (3+ sentences each). No sibling clone detected.
- **2. Semantic HTML:** ⚠️ Exactly 1 H1 (good), but document-order heading sequence opens with an H3 ("Courtney Henry", the live badge-preview name) and an H4 ("Estimate Delivery Windows") BEFORE the page's H1 appears in source order — a hierarchy violation shared by the template across all 22 pages. The preview-name H3 is also used purely for visual styling (badge mockup), not as a real content heading. Not fixed (shared widget/layout issue, outside the hero/specs-copy fix scope).
- **3. Primary Keyword Placement:** ✅ Product name present in first-100-words: True; in an H2/H3: True; in meta title: True.
- **4. Secondary Keyword Placement:** ✅ Cluster terms found: name badge, custom badge (checked: name badge, custom badge, badge maker).
- **5. Semantic/Entity Matching:** ✅ Researched terms found: reusable name badge, business days (checked: reusable name badge, business days, lasting impression, events, conferences, name changes).
- **6. Meta Tags:** ⚠️ Title (80 chars): "Walnut Rectangle Name Badge Laser Engraved | Buy Custom Name Badges | BadgeStore". Meta description (126 chars, unique, under 160): "Shop the Walnut Rectangle Name Badge Laser Engraved - $9.00. Genuine walnut hardwood, also in Cherry, Maple, Mahogany, Bamboo.". Title exceeds ~60 char guidance due to " | Buy Custom Name Badges | BadgeStore" suffix.
- **7. Social Tags:** ✅ og:title/description and twitter:title/description present, non-empty, consistent with meta tags. og:image/twitter:image point to real CDN URL (cdn11.bigcommerce.com).
- **8. Structured Data:** ✅ Product.name matches H1 exactly. Description accurate. offers.lowPrice/highPrice ($9.00/$9.00) match displayed hero price ("$9.00"). SKU present (BAS-REC-WD). FAQPage mainEntity (6 Qs) matches visible FAQ exactly.
- **9. Image Alt:** ⚠️ og:image:alt = "Configure and Buy the Walnut Rectangle Name Badge Laser Engraved online from BadgeStore Australia" — descriptive but follows site-wide pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern (not generic/empty, so acceptable, but inconsistent with spec guidance). twitter:image:alt is MISSING (empty) — site-wide gap across all 22 pages.
- **10. Image Title:** N/A No `<img>` tag exists anywhere on the page — the product preview is a CSS-rendered badge mockup, not an `<img>`. No `<meta>`/`<link>` title-equivalent exists either. Nothing to flag as 'missing' since there is no image element to carry a title.
- **11. Internal Links:** ✅ Breadcrumb and footer links spot-checked correct (out of scope, unchanged). FAQ answers reference sibling products by name only (plain text, not hyperlinks) — all sibling product names/prices mentioned were verified to match the real sibling page's current name and price.
- **12. Internal Link Anchors:** N/A No in-body `<a>` links exist in FAQ answers or hero/specs copy to apply anchor-text judgment to — sibling references are plain text, not links.

**Fixes Applied:** None — copy already adequate (has unique hero/specs copy, ≥1 secondary-cluster term, and ≥1 researched entity term; not a templated clone).


---

## Cross-Page Duplicate/Quality Issues


- **Duplicate meta titles:** None found. All 22 `<title>` tags are unique (programmatic exact-match check across all 22).
- **Duplicate meta descriptions:** None found. All 22 `<meta name="description">` tags are unique.
- **Duplicate/cloned hero paragraphs:** None found. Pairwise similarity-ratio check (difflib) across all 22 hero paragraphs found no pair above 0.5 similarity — every hero paragraph is substantively unique, grounded in that product's own price/material/comparison facts.
- **Templated specs-intro sentence structure (not a true clone, but worth noting):** Every specs-intro sentence follows the same shared pattern — "The {Product Name} (SKU: {sku}) is/combines/separates X rather than Y. {transition phrase}:" — generated by the same earlier content pass. Three sibling pairs scored 0.6–0.74 similarity (plaque pair, pet-tag pair, one plaque/badge cross-pair) due to this shared sentence skeleton, but the actual facts named in each (material, construction method, price comparison) are unique per product. Judged acceptable — flagged only as a structural note, not a content-quality defect, since the rule only required unique facts and keyword coverage, both of which are present.
- **Doubled words ("the the", "Custom Custom", etc.):** None found in any visible page text (checked all 22 with a regex doubled-word scan on BeautifulSoup-extracted body text; the only matches were "This This" artifacts from text-extraction joining two adjacent dev-tooltip sentences without a separating space in the extraction script, not an actual doubled word in the rendered page — verified by inspecting the raw HTML, which has a period and a `<span>` boundary between them).
- **Missing-space-near-price typos (e.g. "for$9.00"):** None found (regex-scanned all 22 for `[a-zA-Z]\$\d` with no hits).
- **Price cross-reference accuracy:** Every FAQ/body mention of a *sibling* product's name + price (e.g. "Stainless Steel Plaque - Laser Engraved at $60.00" on the aluminium plaque page, "1800B Badge-A-Matic at $799.00" on the starter badge machine page) was programmatically cross-checked against that sibling's own current JSON-LD price across all 22 files — all matched exactly, no stale cross-references found.
- **Filename/slug vs. actual product mismatch (informational, not fixed — out of scope per instructions not to touch nav/breadcrumbs/URLs):** Several file slugs are leftover from before today's "corrected product data" pass and no longer describe the product now on that page. These are pre-existing from earlier work today, not something this audit introduced, and are listed here only for awareness:
  - `die-struck-metallic-pin.html` → now "Oval Name Badge Full Colour"
  - `hard-enamel-premium-pin.html` → now "Oval Name Badge Laser Engraved"
  - `polished-brass-honours-plaque.html` → now "Square Name Badge Laser Engraved"
  - `soft-enamel-custom-pin.html` → now "Bevelled Edge Reusable Premium Metal Name Badge"
  - `blank-pin-components-100pack.html` → now "Round Name Badge Full Colour" (FAQ #1 explicitly clarifies BadgeStore doesn't sell blank pin components)
  - `standard-employee-photo-id.html` → now "Snap Badge Full Colour or Engraved"
  - `pro-badge-machine-57mm.html` → now "1800B Badge-A-Matic"
  - `starter-badge-machine-25mm.html` → now "MULTI PRESS"
  - `mahogany-wedge-desk-plate.html` → now "Tasmanian Blackwood Desk Name Plate with printed 6mm Acrylic nameplate"
  This affects nothing being audited here (H1, title, meta, JSON-LD all correctly reflect the real current product), it just means the URL slug no longer hints at the product it serves. Flagging for awareness only.
- **Site-wide heading-hierarchy issue (dimension 2, affects all 22 pages identically):** Document source order opens with an `<h3>` (the live badge-preview's dynamic name, e.g. "Courtney Henry") and an `<h4>` ("Estimate Delivery Windows") *before* the page's own `<h1>` appears. This is a shared-template/layout issue (the left info column renders before the right configurator column in source order) — not something introduced by today's content work, and outside the authorized fix scope (hero/specs copy only), so left unfixed but flagged for a future dev pass.
- **Site-wide `twitter:image:alt` gap (dimension 9, affects all 22 pages identically):** No page has a `twitter:image:alt` tag at all. `og:image:alt` is present and descriptive everywhere, following the consistent pattern "Configure and Buy the {Name} online from BadgeStore Australia" rather than the "{Name} photo in a white background" pattern suggested in the audit brief — descriptive and non-generic either way, so treated as a minor (⚠️) rather than failing finding.
- **Site-wide meta-title length (dimension 6, affects most pages):** Most titles run well past the ~60 char guidance (65–108 chars) because every title appends " | Buy Custom Name Badges | BadgeStore". Only `custom-printed-lanyard.html` (45), `starter-badge-machine-25mm.html` (52), and `pro-badge-machine-57mm.html` (60) are at/under the guidance. All titles are still unique and lead with the product name, so this is a soft (⚠️) finding, not a correctness defect.
