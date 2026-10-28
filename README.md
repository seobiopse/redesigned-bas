# BadgeStore Australia - Static Site Redesign

This repository contains the mobile-optimised redesign of the [BadgeStore](https://www.badgestore.com.au/) catalog site. It is a plain multi-page HTML site (HTML, Tailwind via CDN, and a little vanilla JavaScript). There is no build step: every page is edited directly and published as it is.

## Repository structure

```
assets/        Shared static assets (style.css, app.js)
categories/    Category (collection) pages
products/      Product detail pages
references/    Brand and SEO instructions and reference material (not part of the site)
scripts/       Helper scripts
index.html     Homepage
*.html         Other site pages (contact, reviews, sitemap, policies, etc.)
```

## Editing pages

- Edit the HTML files directly. To add a product, copy a similar page in `products/`, update the content, then link it from its category page in `categories/`, the homepage if relevant, and `sitemap.html`.
- Keep one `<h1>` per page, with headings in order (H1, then H2, then H3).
- Keep visible FAQ text and the FAQ JSON-LD in the same page identical.
- Use relative links so the site works under the GitHub Pages sub-path.

## Local preview

Open any HTML file in a browser, or serve the folder with a simple static server:

```bash
npx -y http-server . -p 8080
```

Then open `http://localhost:8080`.

## Deployment (GitHub Pages)

Pushing to `main` runs `.github/workflows/static.yml`, which publishes the repository as it is. No build is needed.
