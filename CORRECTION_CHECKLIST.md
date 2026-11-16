# Correction checklist (Tom's team review, 16 Nov 2026)

Checked against the local site (102 HTML pages) on 2026-11-16, after commit 16eb954. Automated checks were run with a script that scans every page; items marked Manual need a person or the live store.

Legend: [x] done and checked, [ ] open, [~] done in part or needs a decision.

## A. Claims and shipping
- [x] No free shipping / free delivery text anywhere (postage page labels now "Flat $12.50").
- [x] "100% Australian Made" removed from lanyards; reworded on badge machines, imported machines, components. Kept elsewhere as Tom agreed.
- [x] Name badge categories say "1-2 Day Fast Dispatch" (Tom's figure; confirm with production).
- [x] Framed name badge trim shows "Rose Gold".
- [x] Smooth scroll CSS on all pages. (Manual: confirm the live store scrolls to top on page change.)

## B. Pricing display
- [x] Hero price is not repeated in the description paragraph (all product pages).
- [x] No price-only chips repeating the hero price.
- [x] No fixed prices in meta / og / twitter descriptions ("from $X" kept).
- [x] Range prices use "From" (button badges, fridge magnets); lanyard shows From $2.45 (30% top tier).
- [~] Tiered pages without a confirmed bulk price (kits, retractable lanyard, ID clip, card holder) show the base price. Needs Tom's tiers.
- [ ] Manual (live store): prices update correctly after a discount is applied; no standard price shown beside a discounted one.

## C. Content corrections
- [x] Generic "Backing Fasteners & Garment Safety" card removed from 17 category pages; shipping card widened.
- [x] Metal plaques: "Mounting Options" card (aluminium plaque with or without corner mounting holes; hardware not included).
- [x] Expert text reads "our expert team based in Adelaide" on 16 category pages (button badge and machine pages keep their own wording).
- [x] Acrylic domed name badge: full colour and laser engraved both described (Tom confirmed laser engraving is available).
- [ ] Laser engraving vs full colour wording on the other pages Tom reviewed (he asked for one of the two to be stated clearly). Owner: Fatima / Tom to say which pages.
- [x] Spelling pass done 16 Nov (dictionary scan of all pages): fixed "fastner", "lasering", truncated "fine detai...", "scanability", "Badge Store" on the acrylic dome category. Grammar and tone still need a human read (Fatima).
- [ ] Missing or wrong product images (domino, steel, others). Owner: Anish. Girish to supply the missing ones.

## D. SEO and technical hygiene (automated)
- [x] Title 60 characters or fewer, present and unique on every page.
- [x] Meta description present, 160 or fewer, unique on every page.
- [x] Exactly one H1 per page.
- [x] Canonical URL on every page.
- [x] Alt text on every image.
- [x] No image with an empty source; no local image file missing.
- [x] No broken internal links.

## E. Backend items (not in this repo; for the dev team)
- [ ] "Apply discount to all products" confirmation modal and behaviour.
- [ ] Add-ons (e.g. magnet) not shown or not priced for some customers.
- [ ] PayPal sandbox API credentials and test integration notes.
- [ ] Blocked-country error page with a contact email; block high-traffic unwanted regions.
- [ ] Customer accounts created through the API not syncing.
- [ ] Scroll to top on page change in the store itself.
