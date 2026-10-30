# Dev Note: Button Badges, Discounts and Content Updates (30 Oct 2026)

Base URL: https://seobiopse.github.io/redesigned-bas/

## 1. New pages (Button Badges category, 7 products)

| Page | URL |
|---|---|
| Category | /categories/button-badges.html |
| 25mm Button Badges | /products/button-badge-25-mm.html |
| 35mm Button Badges | /products/button-badge-35-mm.html |
| 57mm Button Badges | /products/button-badge-57-mm.html |
| 85mm Large Button Badges | /products/button-badge-85-mm.html |
| 35mm Fridge Magnets | /products/fridge-badge-magnet-35-mm.html |
| 57mm Fridge Magnets | /products/fridge-badge-magnet-57-mm.html |
| 85mm Large Fridge Magnets | /products/fridge-badge-magnet-85-mm.html |

Linked from: homepage card, main nav (after Lapel Pins), footer, sitemap.

## 2. Discount rules shown on the site (please set up the same in the store backend)

Source: Aneesh's WhatsApp chat (29 Oct 2026) and badge-a-minit.com.au.

**Button badges and fridge magnets: unit price at each quantity level (same as Badge-A-Minit).**
Price applies to all units in the order. Quantity counted per product.

| Qty from | 25mm BB | 35mm BB | 57mm BB | 85mm BB | 35mm FM | 57mm FM | 85mm FM |
|---|---|---|---|---|---|---|---|
| 1 | 6.99 | 7.99 | 8.99 | 10.49 | 7.99 | 9.49 | 10.99 |
| 10 | 2.64 | 3.33 | 3.89 | 5.86 | 3.46 | 4.31 | 5.06 |
| 25 | 1.70 | 2.15 | 2.51 | 2.99 | 2.38 | 2.93 | 3.41 |
| 50 | 1.10 | 1.39 | 1.62 | 1.93 | 1.69 | 2.45 | 2.35 |
| 100 | 1.02 | 1.29 | 1.51 | 1.79 | 1.60 | 1.93 | 2.22 |
| 250 | 0.95 | 1.20 | 1.40 | 1.67 | 1.52 | 1.82 | 2.09 |
| 500 | 0.76 | 0.97 | 1.13 | 1.34 | 1.30 | 1.55 | 1.77 |
| 1000 | 0.66 | 0.83 | 0.97 | 1.15 | 1.18 | 1.39 | 1.58 |
| 2500 | 0.56 | 0.71 | 0.83 | 0.99 | 1.07 | 1.26 | 1.42 |
| 5000 | 0.49 | 0.61 | 0.72 | 0.85 | 0.98 | 1.14 | 1.28 |
| 10000 | 0.36 | 0.45 | 0.53 | 0.63 | 0.84 | 0.95 | 1.06 |

**Name badges only: percentage off the list price.**

| Quantity | Discount |
|---|---|
| 1-9 | none |
| 10-25 | 5% |
| 26-50 | 10% |
| 51-100 | 15% |
| 101-250 | 20% |
| 251-500 | 25% |
| 501-9,999 | 30% |
| 10,000+ | custom quote (assumed, not in the chat) |

Applied to 20 name badge pages and their 9 category pages: acrylic dome, snap, full colour, custom framed, reusable, hardwood engraved, metal and engraved name badges.
Examples: /products/acrylic-domed-name-badge.html, /products/rectangle-name-badge-full-colour.html, /categories/name-badges.html

**Not changed (as per Aneesh: same as the current BadgeStore site):** plaques, ID cards, desk name plates, pet tags, lanyards and clips, badge machines.

## 3. Display decisions
- Product hero price and category cards show "From $X" using the lowest tier price (button badges: lowest unit price; name badges: 30% off).
- "Flat rate" wording removed from name badge pages and replaced with the discount table, calculator and footnote ("discounts apply to eligible products only").
- Schema (AggregateOffer) updated with low/high price.

## 4. Other changes
- Homepage /index.html: bulk calculator removed. New "How Ordering Works" (4 steps) next to delivery times. Info icon explains the delivery logic.
- FAQs rewritten across the site: answer starts from the question wording and names BadgeStore (visible text and FAQ schema match).
- Headings: one H1 per page, no skipped levels; H1 added to /reviews.html.
- Top nav: "Button Badges" added after "Lapel Pins" on all pages. Sitemap nav trimmed. Duplicate notice bar removed on /privacy-policy.html, /terms-and-conditions.html and /gift-certificates.html.
- Category card button renamed "Configure" to "View Product".
- Node build files removed (build.js, data.js, templates). Pages are edited directly as HTML.

## 5. Follow-up for Dev
1. Create the tiers in section 2 as bulk pricing rules in the store. Checkout must charge the same unit prices shown on the pages.
2. Confirm how quantity is counted (per product, per size or per order).
3. Real product images for the 7 new products (placeholders in use). Add og:image.
4. Confirm attachment options (pin, magnet, keychain) per size. Pin/magnet/keychain is confirmed only for the 35mm badge; applied to all button badge sizes.
5. Confirm whether prices include GST (not stated on Badge-A-Minit; "inc. GST" removed from the new pages).
6. Confirm the 1:00 PM cutoff and delivery windows: Adelaide metro 1-2 days, East Coast metro 2-3 days, Regional/WA/NT 3-5 days.
7. Two product FAQs are still unanswered: single-item orders and accepted artwork file formats for button badges.
