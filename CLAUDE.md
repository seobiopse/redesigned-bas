# BadgeStore redesign (redesigned-bas)

Static HTML redesign of badgestore.com.au, published at https://seobiopse.github.io/redesigned-bas/ (GitHub Pages, branch main). Pages are edited directly as HTML (no build step).

## Standing decisions
- **Facts come from the live site only.** Sizes, materials, dimensions and durability claims must match badgestore.com.au (or the staging site badgestore.badge-a-minit.com.au for new products). No invented specs. See `SPEC_CROSSCHECK_REPORT.md`.
- **Product page layout reference:** `products/aluminium-channel-desk-plate.html` (preview card, step-by-step form, "Specifications & Bulk Guide", callout cards, FAQ). New products reuse this layout.
- **FAQ answer style:** the answer opens with the question's own wording as a full sentence, names the product and "at BadgeStore"; add "For Dev" hover tips (info icon) on price, minimum order and lead-time figures.
- **This is Tom's project: always use Ahrefs** (the Ahrefs MCP tools) for keyword research and any SEO data. Do not use Semrush or other tools here unless the user says so. Target market: Australia.
- **SEO rules for new pages:** title tag 60 characters or fewer and meta description 160 or fewer (all titles and descriptions unique), one H1, alt text on every image, canonical URL, Product/ItemList + BreadcrumbList + FAQPage schema. Reword source text (Badge-A-Minit) in our own words to avoid duplicate content across the two sites. Keyword research done with Ahrefs (AU, 9 Nov 2026): volumes are small and difficulty very low. Lapel: "enamel pins" 1,300, "lapel pins" 700, "custom pins" 400, "custom lapel pins" 300, "custom enamel pins" 200, "die struck/die cast lapel pins" 70 each, "hard/soft enamel pins" 50 each; style names like glitter/rainbow/ribbon/service are about 0. Kits: "badge making kit" 200, "badge making supplies" 70, "button badge components" 0. Chalkboard: "chalkboard name badges" 0; nearby "custom name badges" 450, "name badges australia" 400, "magnetic name badges" 350, "reusable name badges" 100, "staff name badges" 100. Titles were updated to use these terms (e.g. "Badge Making Supplies & Button Badge Kits", "Reusable Chalkboard Name Badges"). Re-check volumes before changing titles again.
- **Quote-only products** (lapel pins) show "Priced per job", no invented prices, a mailto quote form, and no price schema. Priced products use AggregateOffer with a list of Offers.
- **Category heading text:** "Australia's Leading Commercial Identification Supplier" (Tom, 5 Nov 2026) on all category pages.
- **Lapel pins:** 18 styles from badge-a-minit.com.au; generic `products/lapel-pin.html` is kept unlinked (removed from the category on request).
- **Button badge components:** 4 kits (25/35/57/85mm) with packs of 100/250/500/1000, prices from the staging site; category `categories/button-badge-components.html`; nav has a Button Badges dropdown.
- **Chalkboard name badges:** 3 products (blank, logo only, logo & text; 75x25mm) plus `categories/chalkboard-name-badges.html`, in the Name Badges nav dropdown. Layout reference: `products/rectangle-name-badge-full-colour.html` and `categories/name-badges.html`. Prices, six clip options with surcharges, 30-65% volume tiers and fonts come from the staging site (names use the staging wording, e.g. "Chalkboard Name Badge with Logo Only"); features and FAQ text from badge-a-minit.com.au. Hero/category "From" price is the lowest (2,500+) tier.
- **Site-wide SEO pass (9 Nov 2026):** every page has a unique keyword title (60 or fewer) and description (160 or fewer), full og:* and twitter:* sets (locale en_AU, image + alt, product price), robots and hreflang en-au. JSON-LD carries keyword and entity rich descriptions, `keywords`, `category`, `audience`, `material`, `additionalProperty`, `about`/`mentions` with Wikipedia `sameAs`, an ItemPage (products) or enriched CollectionPage (categories), a WebSite node and Organization `knowsAbout`/`areaServed`. The 7 info pages and sitemap now have schema. Keyword map and generator were scratch files (not in repo); to change a title or description edit the page directly and keep og/twitter/schema copies in sync. No `meta keywords` tag (search engines ignore it).

## Data sources
- Live site: https://www.badgestore.com.au (product pages, categories).
- Staging site (login-protected, open via Claude in Chrome): https://badgestore.badge-a-minit.com.au
- Badge-A-Minit public site: https://badge-a-minit.com.au (source of lapel pin and component kit text, button badge pricing).
- Old saved pages: `references/` folder.

## Open items
- Unverified claims (no live description): ID card clip, lanyard, retractable lanyard, MULTI PRESS badge size, 57mm button badge attachments.
- Express lapel pin minimum order (source says 1 in one place and 25 in another; pages use 25 and 33 working days).
- Chalkboard: staging category page says "from $2.60" for the blank badge but its product table says $2.63 (pages use $2.63); the staging volume tiers (30-65% off) differ from the 5-30% name badge scheme in `DEV_NOTE_Pricing_and_Content_Update.md`; blank badge dispatch differs between staging (in stock, next day) and Badge-A-Minit (3-5 days).
- Pages without the Name Badges/Button Badges nav dropdowns (contact-us, gift-certificates, postage-information, privacy-policy, reviews, sitemap, terms-and-conditions) do not show the new nav links.
- `sitemap.html` still has stale entries for other products (machine prices etc.).
- Product filenames that do not match their product (e.g. `solid-brass-bone-pet-tag.html`) kept to avoid breaking URLs.
- Pushing: the user pushes manually with GitHub Desktop. Commit locally; do not ask to push or try to push.

_Last updated: 2026-11-06._
