#!/usr/bin/env node
/*
 * Dev tool: syncs each category page's "Collection Overview" list
 * (product name + price shown per style) against the real data on
 * each linked product page, so this list can never drift out of sync
 * with the actual product again.
 *
 * Usage: node scripts/sync-collection-overview.js [--check]
 *   --check   report mismatches without writing any files (CI-friendly)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CATEGORIES_DIR = path.join(ROOT, 'categories');
const PRODUCTS_DIR = path.join(ROOT, 'products');
const CHECK_ONLY = process.argv.includes('--check');

function getProductData(productFile) {
  const full = path.join(PRODUCTS_DIR, productFile);
  if (!fs.existsSync(full)) return null;
  const html = fs.readFileSync(full, 'utf8');

  const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const name = h1Match ? h1Match[1].trim() : null;

  const priceMatch = html.match(/id="live-hero-price"[^>]*>([^<]+)</);
  const priceText = priceMatch ? priceMatch[1].trim() : null;

  // Prefer JSON-LD offers for a clean low/high numeric pair when present.
  const ldMatch = html.match(/"lowPrice":\s*"([^"]+)"[\s\S]*?"highPrice":\s*"([^"]+)"/);
  const low = ldMatch ? ldMatch[1] : null;
  const high = ldMatch ? ldMatch[2] : null;

  return { name, priceText, low, high };
}

function formatPriceSpan(data) {
  if (data.low && data.high && data.low !== data.high) {
    return `<span>$${data.low}</span> - <span>$${data.high}</span>`;
  }
  // Flat price, non-numeric price ("Contact us..."), or "From $X" style —
  // just show the product page's own rendered hero price text as-is.
  return `<span>${data.priceText || (data.low ? '$' + data.low : 'N/A')}</span>`;
}

function processCategoryFile(file) {
  const full = path.join(CATEGORIES_DIR, file);
  let html = fs.readFileSync(full, 'utf8');
  const original = html;
  const issues = [];

  const liRegex = /<li class="flex items-center justify-between bg-white p-2\.5 rounded-lg border border-slate-200">\s*<a href="\.\.\/products\/([^"]+)" class="text-xs font-bold text-slate-800 hover:text-brand-red transition-colors">([^<]*)<\/a>\s*<span class="text-\[11px\] font-extrabold text-brand-red bg-red-50 px-2 py-0\.5 rounded-full">([\s\S]*?)<\/span>\s*<\/li>/g;

  let match;
  let styleCount = 0;
  while ((match = liRegex.exec(original)) !== null) {
    styleCount++;
    const [fullLi, productFile, listedName, listedPriceHtml] = match;
    const data = getProductData(productFile);
    if (!data) {
      issues.push(`${file}: linked product ${productFile} not found`);
      continue;
    }
    if (!data.name) {
      issues.push(`${file}: could not read H1 from ${productFile}`);
      continue;
    }
    const realName = data.name;
    const realPriceHtml = formatPriceSpan(data);

    if (listedName.trim() !== realName) {
      issues.push(`${file}: "${listedName.trim()}" -> "${realName}" (${productFile})`);
    }
    if (listedPriceHtml.trim() !== realPriceHtml.trim()) {
      issues.push(`${file}: price for "${realName}" "${listedPriceHtml.trim()}" -> "${realPriceHtml.trim()}"`);
    }

    const newLi = fullLi
      .replace(`>${listedName}</a>`, `>${realName}</a>`)
      .replace(listedPriceHtml, realPriceHtml);
    html = html.replace(fullLi, newLi);
  }

  // Sync the "(N Styles)" count heading to the actual number of list items found.
  const headingRe = /(Collection Overview \()(\d+)( Styles?\))/;
  const headingMatch = html.match(headingRe);
  if (headingMatch && parseInt(headingMatch[2], 10) !== styleCount) {
    issues.push(`${file}: style count ${headingMatch[2]} -> ${styleCount}`);
    html = html.replace(headingRe, `$1${styleCount}$3`);
  }

  if (html !== original && !CHECK_ONLY) {
    fs.writeFileSync(full, html);
  }

  return issues;
}

const files = fs.readdirSync(CATEGORIES_DIR).filter(f => f.endsWith('.html'));
let allIssues = [];
for (const f of files) {
  allIssues = allIssues.concat(processCategoryFile(f));
}

if (allIssues.length === 0) {
  console.log('All Collection Overview sections are in sync with their product pages.');
} else {
  console.log(`${CHECK_ONLY ? 'Found' : 'Fixed'} ${allIssues.length} mismatch(es):`);
  allIssues.forEach(i => console.log(' -', i));
  if (CHECK_ONLY) process.exitCode = 1;
}
