const fs = require('fs');
const path = require('path');
const ProductCatalog = require('./assets/data.js');

const categoryTemplatePath = path.join(__dirname, 'templates', 'category-template.html');
const productTemplatePath = path.join(__dirname, 'templates', 'product-template.html');
const indexTemplatePath = path.join(__dirname, 'templates', 'index-template.html');

const categoryTemplate = fs.readFileSync(categoryTemplatePath, 'utf8');
const productTemplate = fs.readFileSync(productTemplatePath, 'utf8');
const indexTemplate = fs.readFileSync(indexTemplatePath, 'utf8');

console.log('Starting compilation of static pages...');

// Helper to compile breadcrumbs
function compileBreadcrumbs(list, rootPath = '../') {
    return list.map((item, idx) => {
        if (idx === list.length - 1) {
            return `<span class="text-slate-800 font-semibold">${item}</span>`;
        }
        if (item === 'Home') {
            return `<a class="hover:text-brand-red transition-colors" href="${rootPath}index.html">Home</a><span>/</span>`;
        }
        // Map category name to filename
        const categorySlug = Object.keys(ProductCatalog.categories).find(
            key => ProductCatalog.categories[key].name === item
        );
        const targetUrl = categorySlug ? `${rootPath}categories/${categorySlug}.html` : '#';
        return `<a class="hover:text-brand-red transition-colors" href="${targetUrl}">${item}</a><span>/</span>`;
    }).join('\n');
}

// Unified Schema Generator incorporating shared business entities, return policy, shipping settings, and Q&As
function compileUnifiedSchema(pageType, pageData) {
    const organization = {
        "@type": "Organization",
        "@id": "https://www.badgestore.com.au/#organization",
        "name": "BadgeStore",
        "legalName": "BadgeStore Australia",
        "url": "https://www.badgestore.com.au/",
        "logo": "https://cdn11.bigcommerce.com/s-5ghsl7hcw4/content/img/badgestore logo new-01.svg",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+61-1300-862-637",
            "contactType": "customer service",
            "email": "admin@badgestore.com.au",
            "areaServed": "AU",
            "availableLanguage": "en"
        }
    };

    const localBusiness = {
        "@type": "LocalBusiness",
        "@id": "https://www.badgestore.com.au/#localbusiness",
        "name": "BadgeStore Office",
        "image": "https://cdn11.bigcommerce.com/s-5ghsl7hcw4/images/stencil/original/carousel/18/banner-3.jpg",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "56 Prospect Rd",
            "addressLocality": "Prospect",
            "addressRegion": "SA",
            "postalCode": "5082",
            "addressCountry": "AU"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -34.8912,
            "longitude": 138.5991
        },
        "telephone": "1300862637"
    };

    const returnPolicy = {
        "@type": "MerchantReturnPolicy",
        "@id": "https://www.badgestore.com.au/#returnpolicy",
        "name": "BadgeStore Returns Policy",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnPeriod",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "refundType": "https://schema.org/RefundFull"
    };

    const shippingPolicy = {
        "@type": "ShippingRateSettings",
        "@id": "https://www.badgestore.com.au/#shippingpolicy",
        "name": "Standard Shipping Flat Rate",
        "freeShippingThreshold": {
            "@type": "MonetaryAmount",
            "value": 100,
            "currency": "AUD"
        },
        "shippingRate": {
            "@type": "MonetaryAmount",
            "value": 12.50,
            "currency": "AUD"
        }
    };

    const graph = [organization, localBusiness, returnPolicy, shippingPolicy];

    if (pageType === 'category') {
        const cat = pageData;
        graph.push({
            "@type": "CollectionPage",
            "@id": `https://www.badgestore.com.au/categories/${cat.slug}.html#collection`,
            "name": cat.heading,
            "description": cat.metaDesc,
            "url": `https://www.badgestore.com.au/categories/${cat.slug}.html`
        });
        graph.push({
            "@type": "ItemList",
            "itemListElement": cat.products.map((pRef, idx) => ({
                "@type": "ListItem",
                "position": idx + 1,
                "url": `https://www.badgestore.com.au/products/${pRef.id}.html`,
                "name": pRef.name
            }))
        });
        if (cat.faqs && cat.faqs.length > 0) {
            graph.push({
                "@type": "FAQPage",
                "@id": `https://www.badgestore.com.au/categories/${cat.slug}.html#faq`,
                "mainEntity": cat.faqs.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.a
                    }
                }))
            });
        }
    } else if (pageType === 'product') {
        const prod = pageData;
        graph.push({
            "@type": "Product",
            "@id": `https://www.badgestore.com.au/products/${prod.id}.html#product`,
            "name": prod.name,
            "image": prod.image,
            "description": prod.description,
            "sku": prod.sku,
            "brand": {
                "@type": "Brand",
                "name": "BadgeStore"
            },
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "AUD",
                "lowPrice": prod.priceBrackets[prod.priceBrackets.length - 1].price.toFixed(2),
                "highPrice": prod.basePrice.toFixed(2),
                "offerCount": prod.priceBrackets.length,
                "url": `https://www.badgestore.com.au/products/${prod.id}.html`,
                "priceValidUntil": "2027-12-31"
            }
        });
        if (prod.faqs && prod.faqs.length > 0) {
            graph.push({
                "@type": "FAQPage",
                "@id": `https://www.badgestore.com.au/products/${prod.id}.html#faq`,
                "mainEntity": prod.faqs.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f.a
                    }
                }))
            });
        }
    }

    return {
        "@context": "https://schema.org",
        "@graph": graph
    };
}

// Programmatic Semantic Guide Builder to scale category page content length to 1000+ words
function compileCategorySemanticGuide(cat) {
    const categoryName = cat.name;
    const count = cat.products.length;

    // 1. Calculate starting price
    let minPrice = Infinity;
    cat.products.forEach(pRef => {
        const prod = ProductCatalog.products[pRef.id];
        if (prod && prod.basePrice < minPrice) {
            minPrice = prod.basePrice;
        }
    });
    const startingPrice = minPrice !== Infinity ? `$${minPrice.toFixed(2)}` : 'wholesale rates';

    // 2. Gather unique shapes/dimensions
    const shapesSet = new Set();
    const materialsSet = new Set();
    let durability = '3-5 years';

    cat.products.forEach(pRef => {
        const prod = ProductCatalog.products[pRef.id];
        if (prod) {
            prod.specs.forEach(spec => {
                if (spec[0].toLowerCase().includes('dimension') || spec[0].toLowerCase().includes('shape') || spec[0].toLowerCase().includes('size')) {
                    shapesSet.add(spec[1]);
                }
                if (spec[0].toLowerCase().includes('material') || spec[0].toLowerCase().includes('substrate') || spec[0].toLowerCase().includes('composition') || spec[0].toLowerCase().includes('base')) {
                    materialsSet.add(spec[1]);
                }
            });
            if (prod.specs.some(s => s[1].toLowerCase().includes('5+ years') || s[1].toLowerCase().includes('durability'))) {
                durability = '5+ years';
            }
        }
    });

    const shapes = shapesSet.size > 0 ? Array.from(shapesSet).join(', ') : 'custom shapes and dimensions';
    const materials = materialsSet.size > 0 ? Array.from(materialsSet).join(', ') : 'commercial-grade substrates';

    // 3. Compile product variant card chips
    let productListChipsHtml = '';
    cat.products.forEach(pRef => {
        const prod = ProductCatalog.products[pRef.id];
        if (prod) {
            productListChipsHtml += `
            <li class="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200">
                <a href="../products/${prod.id}.html" class="text-xs font-bold text-slate-800 hover:text-brand-red transition-colors">${prod.name}</a>
                <span class="text-[11px] font-extrabold text-brand-red bg-red-50 px-2 py-0.5 rounded-full">${prod.priceRange}</span>
            </li>`;
        }
    });

    return `
    <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Custom ${categoryName} Buyer's Guide &amp; Specifications
        </h2>
        <p class="text-sm text-slate-600 mt-2">
            Everything your procurement, HR, or event team needs to know regarding materials, fasteners, and delivery times across Australia.
        </p>
    </div>

    <!-- 4-Grid Breakdown of Specifications -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <!-- 1. Materials & Craftsmanship -->
        <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div class="flex items-center gap-3 mb-3">
                <span class="w-7 h-7 rounded-lg bg-brand-red text-white flex items-center justify-center text-xs font-bold">1</span>
                <h3 class="text-lg font-bold text-slate-900">Materials &amp; Craftsmanship</h3>
            </div>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                At BadgeStore Australia, our <strong>${categoryName}</strong> collection starts from <strong>${startingPrice}</strong>. Available shapes and dimensions include: <strong>${shapes}</strong>.
            </p>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5">
                Substrates feature <strong>${materials}</strong>. High-definition digital prints, laser markable polymers, and optional polyurethane domed lenses ensure durability of at least <strong>${durability}</strong> under regular commercial wear.
            </p>
        </div>

        <!-- 2. Collection Overview & Styles -->
        <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div class="flex items-center gap-3 mb-3">
                <span class="w-7 h-7 rounded-lg bg-brand-red text-white flex items-center justify-center text-xs font-bold">2</span>
                <h3 class="text-lg font-bold text-slate-900">Collection Overview (${count} Styles)</h3>
            </div>
            <ul class="text-xs sm:text-sm text-slate-600 space-y-2 mt-2">
                ${productListChipsHtml}
            </ul>
        </div>

        <!-- 3. Backing Fasteners & Garment Safety -->
        <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div class="flex items-center gap-3 mb-3">
                <span class="w-7 h-7 rounded-lg bg-brand-red text-white flex items-center justify-center text-xs font-bold">3</span>
                <h3 class="text-lg font-bold text-slate-900">Backing Fasteners &amp; Garment Safety</h3>
            </div>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For wearable items, fastener longevity and fabric preservation are paramount. Our most popular attachment utilizes <strong>dual neodymium magnetic backplates</strong> that hold firm through thick suits and lab coats without puncturing expensive fabrics.
            </p>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                Where magnetic fields are restricted (e.g. pacemakers or medical wards), we supply standard safety lock brooch pins, rotatable crocodile clips, or lanyard attachments for strict workplace safety compliance.
            </p>
        </div>

        <!-- 4. Production & Australia-Wide Shipping -->
        <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div class="flex items-center gap-3 mb-3">
                <span class="w-7 h-7 rounded-lg bg-brand-red text-white flex items-center justify-center text-xs font-bold">4</span>
                <h3 class="text-lg font-bold text-slate-900">Production &amp; Australia-Wide Shipping</h3>
            </div>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Orders are manufactured and inspected in our facility in Prospect, South Australia. Parcels are safely packaged and sent via Australia Post or Express Courier networks.
            </p>
            <div class="mt-3 bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1">
                <div class="flex justify-between"><span class="font-medium text-slate-700">Adelaide Metro:</span> <span class="text-slate-900 font-semibold">1-2 business days</span></div>
                <div class="flex justify-between"><span class="font-medium text-slate-700">East Coast Metro (Melb/Syd/Bris):</span> <span class="text-slate-900 font-semibold">2-3 business days express</span></div>
                <div class="flex justify-between"><span class="font-medium text-slate-700">Regional &amp; WA/NT:</span> <span class="text-slate-900 font-semibold">3-5 business days express</span></div>
            </div>
        </div>
    </div>
    `;
}

// Programmatic Semantic Guide Builder to scale product page content length to 1000+ words
function compileProductSemanticGuide(prod) {
    const productName = prod.name;
    const productSku = prod.sku || 'BAS-' + prod.id.substring(0, 6).toUpperCase();
    const productDescription = prod.description;

    let specsBullets = '';
    prod.specs.forEach(spec => {
        specsBullets += `
            <li class="mb-1">
                <strong class="text-slate-800">${spec[0]}:</strong> ${spec[1]}
            </li>`;
    });

    let priceTableRows = '';
    prod.priceBrackets.forEach(bracket => {
        const qtyLabel = bracket.max === 9999 ? `${bracket.min}+ units` : `${bracket.min} - ${bracket.max} units`;
        const unitPrice = bracket.price.toFixed(2);
        const discountPct = prod.basePrice > 0 ? Math.round((1 - bracket.price / prod.basePrice) * 100) : 0;
        const discountLabel = discountPct > 0 ? `${discountPct}% Off` : 'Base Rate';
        priceTableRows += `
            <tr class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td class="py-2 px-3 text-left font-medium text-slate-700">${qtyLabel}</td>
                <td class="py-2 px-3 text-right font-bold text-slate-900">$${unitPrice}</td>
                <td class="py-2 px-3 text-right font-bold text-brand-red">${discountLabel}</td>
            </tr>`;
    });

    return `
    <div class="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm mt-8">
        <div class="mb-6 pb-4 border-b border-slate-100">
            <span class="inline-block bg-red-50 text-brand-red text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">Product Overview</span>
            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900">${productName} Specifications &amp; Bulk Guide</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Card 1: Specs -->
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 class="text-base font-bold text-slate-900 mb-3">Technical Specifications</h4>
                <p class="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                    The <strong>${productName}</strong> (SKU: <code class="text-slate-800 bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-xs">${productSku}</code>) features commercial-grade construction:
                </p>
                <ul class="text-xs sm:text-sm text-slate-600 list-disc pl-5 mb-3 space-y-1">
                    ${specsBullets}
                </ul>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong>Overview:</strong> ${productDescription}
                </p>
            </div>
            
            <!-- Card 2: Bulk Pricing -->
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 class="text-base font-bold text-slate-900 mb-3">Wholesale Quantity Discounts</h4>
                <p class="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
                    Automated volume discounts apply as quantity increases:
                </p>
                <div class="mb-3 border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <table class="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr class="bg-brand-slate text-white font-bold">
                                <th class="py-2 px-3 text-left">Quantity</th>
                                <th class="py-2 px-3 text-right">Unit Price</th>
                                <th class="py-2 px-3 text-right">Discount</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                            ${priceTableRows}
                        </tbody>
                    </table>
                </div>
                <p class="text-[11px] text-slate-500">
                    * Select your quantity in the configurator above to see your exact order savings.
                </p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Card 3: Attachments -->
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 class="text-base font-bold text-slate-900 mb-2">Attachment &amp; Fastener Options</h4>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Our magnet fasteners use dual neodymium discs that clamp securely through heavy suit jackets without puncturing fabric. Traditional safety pins, crocodile clips, and breakaway lanyards are also available.
                </p>
            </div>
            
            <!-- Card 4: Orders & Delivery -->
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h4 class="text-base font-bold text-slate-900 mb-2">Ordering &amp; Express Dispatch</h4>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We support official Purchase Orders (PO) for schools, councils, and corporate accounts. Manufactured at our Prospect, SA facility and shipped nationwide via Australia Post.
                </p>
            </div>
        </div>
    </div>
    `;
}

// Helper to convert absolute links to local relative ones
function cleanCategoryHtml(html, rootPath) {
    if (!html) return '';
    // Replace absolute links to badgestore.com.au with relative links
    let cleaned = html.replace(/https:\/\/www\.badgestore\.com\.au\/([a-zA-Z0-9\-]+)\/?/g, (match, slug) => {
        if (ProductCatalog.categories[slug]) {
            return `${rootPath}categories/${slug}.html`;
        }
        if (ProductCatalog.products[slug]) {
            return `${rootPath}products/${slug}.html`;
        }
        // Default fallbacks
        if (slug === 'categories') return `${rootPath}index.html`;
        return `${rootPath}categories/${slug}.html`;
    });
    // Replace home links
    cleaned = cleaned.replace(/https:\/\/www\.badgestore\.com\.au\/?/g, `${rootPath}index.html`);
    return cleaned;
}

// Redesign sub-page descriptions into responsive premium elements using scraped HTML data
function redesignCategoryDesc(cat, rootPath) {
    if (!cat.categoryDescHtml) {
        // Fallback default redesign for parent categories that don't have scraped raw sublistings
        const firstProdRef = cat.products[0];
        const firstProd = firstProdRef ? ProductCatalog.products[firstProdRef.id] : null;
        const imageUrl = firstProd ? firstProd.image : '';

        return `
        <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm my-12">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                ${imageUrl ? `
                <div class="lg:col-span-4 flex justify-center">
                    <div class="w-full max-w-[280px] aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 p-4 flex items-center justify-center">
                        <img src="${imageUrl}" alt="${cat.name}" class="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300">
                    </div>
                </div>
                ` : ''}
                <div class="${imageUrl ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-[#D72328] border border-red-100">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>Wholesale &amp; Bulk Pricing Active</span>
                    </div>
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Premium ${cat.name} Collection</h2>
                    <p class="text-slate-600 leading-relaxed">${cat.desc}</p>
                    
                    <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h3 class="text-sm font-bold text-slate-900">Need Custom Assistance for ${cat.name}?</h3>
                            <p class="text-xs text-slate-500">Contact our expert Adelaide care team for custom quotes &amp; proofs.</p>
                        </div>
                        <div class="flex flex-wrap gap-3">
                            <a href="tel:1300862637" class="inline-flex items-center gap-2 bg-[#1E293B] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-sm">
                                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                Call 1300 862 637
                            </a>
                            <a href="mailto:admin@badgestore.com.au" class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors border border-slate-200">
                                <svg class="w-4 h-4 text-[#D72328]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                Email admin@badgestore.com.au
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    const rawHtml = cat.categoryDescHtml;

    // 1. Extract main showcase image
    const allImgUrls = [];
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(rawHtml)) !== null) {
        const src = imgMatch[1];
        if (!src.includes('clip-pin') && !src.includes('magnet-clip') && !src.includes('clip-bulldog') && !src.includes('clip-swivel') && (src.includes('narrow') || src.includes('prod') || src.includes('badge'))) {
            allImgUrls.push(src);
        }
    }

    // Fallback showcase image
    let mainImage = allImgUrls[0] || '';
    if (!mainImage) {
        const firstProdRef = cat.products[0];
        const firstProd = firstProdRef ? ProductCatalog.products[firstProdRef.id] : null;
        mainImage = firstProd ? firstProd.image : '';
    }

    // 2. Extract swatches
    const swatches = [];
    const swatchRegex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']+)["'][^>]*>/gi;
    let swatchMatch;
    while ((swatchMatch = swatchRegex.exec(rawHtml)) !== null) {
        const src = swatchMatch[1];
        const alt = swatchMatch[2];
        const isExcluded = ['clip-pin', 'magnet-clip', 'clip-bulldog', 'clip-swivel', 'narrow', 'banner', 'logo'].some(keyword => src.includes(keyword));
        if (!isExcluded && src.includes('/uploaded_images/')) {
            swatches.push({ src, name: alt });
        }
    }

    // 3. Extract clips
    const clips = [];
    const tableMatch = rawHtml.match(/<table[\s\S]*?<\/table>/i);
    if (tableMatch) {
        const tableHtml = tableMatch[0];
        const tdImgMatches = tableHtml.match(/src=["']([^"']+)["']/gi) || [];
        const imgUrls = tdImgMatches.map(m => m.match(/src=["']([^"']+)["']/i)[1]);

        const tdRegex = /<td[\s\S]*?>([\s\S]*?)<\/td>/gi;
        let tdMatch;
        const tdTexts = [];
        while ((tdMatch = tdRegex.exec(tableHtml)) !== null) {
            const text = tdMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
            if (text && !text.includes('.jpg') && !text.includes('.png')) {
                tdTexts.push(text);
            }
        }

        const clipNames = ["Standard Safety Pin", "Magnetic Fastener Backing", "Bulldog Pocket Clip", "Swivel Clip Attachment"];
        for (let i = 0; i < imgUrls.length; i++) {
            clips.push({
                img: imgUrls[i],
                name: clipNames[i] || "Attachment Option",
                desc: tdTexts[i] || "Secure fastener backing choice."
            });
        }
    }

    // 4. Extract headings and paragraphs from cleaned content to avoid clip styles and other raw inline layouts
    let textOnly = rawHtml;
    textOnly = textOnly.replace(/<table[\s\S]*?<\/table>/gi, '');
    textOnly = textOnly.replace(/<img[^>]*>/gi, '');
    textOnly = textOnly.replace(/<(h[1-6]|p)[^>]*>\s*<\/\1>/gi, '');
    textOnly = textOnly.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');

    const elements = [];
    const elementRegex = /<(h[1-6]|p)[\s\S]*?>([\s\S]*?)<\/\1>/gi;
    let elMatch;
    while ((elMatch = elementRegex.exec(textOnly)) !== null) {
        const tag = elMatch[1].toLowerCase();
        const text = elMatch[2].replace(/<[^>]*>/g, '').trim();
        if (text &&
            !text.includes('BULK DISCOUNTS') &&
            !text.includes('Prices can be viewed') &&
            !text.includes('To learn more') &&
            !text.includes('Available Colours') &&
            !text.includes('Clip Styles') &&
            !text.includes('Choose Below') &&
            !text.includes('admin@badgestore') &&
            !text.includes('1300 862')) {
            elements.push({ tag, text });
        }
    }

    let lastHeadingHtml = '';
    if (elements.length > 0 && elements[elements.length - 1].tag.startsWith('h')) {
        const lastEl = elements.pop();
        lastHeadingHtml = `<h3 class="text-xl font-bold text-slate-900 mb-3">${lastEl.text}</h3>`;
    }

    let editorialHtml = '';
    elements.forEach(el => {
        if (el.tag.startsWith('h')) {
            editorialHtml += `<h3 class="text-lg font-bold text-slate-900 mt-6 mb-2">${el.text}</h3>`;
        } else if (el.tag === 'p') {
            editorialHtml += `<p class="text-slate-600 text-sm leading-relaxed mb-4">${cleanCategoryHtml(el.text, rootPath)}</p>`;
        }
    });

    // 5. Generate final HTML
    let swatchesHtml = '';
    if (swatches.length > 0) {
        swatchesHtml = `
        <div class="mt-8 pt-8 border-t border-slate-100">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Available Color &amp; Material Options</h3>
            <div class="flex flex-wrap gap-3">
                ${swatches.map(s => `
                <div class="group relative flex flex-col items-center p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#D72328] hover:shadow-sm transition-all duration-200 cursor-pointer">
                    <img src="${s.src}" alt="${s.name}" loading="lazy" class="w-12 h-12 object-contain rounded-lg">
                    <span class="mt-1 text-[11px] font-semibold text-slate-600 group-hover:text-slate-900">${s.name}</span>
                </div>
                `).join('')}
            </div>
        </div>
        `;
    }

    let clipsHtml = '';
    if (clips.length > 0) {
        clipsHtml = `
        <div class="mt-8 pt-8 border-t border-slate-100">
            <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Fastener &amp; Attachment Options</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                ${clips.map(c => `
                <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col items-center text-center">
                    <div class="w-14 h-14 rounded-lg bg-white p-2 border border-slate-100 flex items-center justify-center mb-3">
                        <img src="${c.img}" alt="${c.name}" loading="lazy" class="max-h-full max-w-full object-contain">
                    </div>
                    <h4 class="text-xs font-bold text-slate-900 mb-1">${c.name}</h4>
                    <p class="text-[11px] text-slate-500 leading-snug">${c.desc}</p>
                </div>
                `).join('')}
            </div>
        </div>
        `;
    }

    const introText = (elements.length > 0 && elements[0].tag === 'p') ? elements[0].text : `${cat.name} are designed and custom-manufactured in Australia to professional standards.`;

    return `
    <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm my-10 space-y-6">
        <!-- Hero Showcase Block -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            ${mainImage ? `
            <div class="lg:col-span-4 flex justify-center">
                <div class="w-full max-w-[260px] aspect-square rounded-xl bg-slate-50 border border-slate-100 p-4 flex items-center justify-center">
                    <img src="${mainImage}" alt="${cat.name}" class="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300">
                </div>
            </div>
            ` : ''}
            <div class="${mainImage ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-3">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-[#D72328] border border-red-100">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Wholesale Bulk Pricing Active</span>
                </div>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Premium ${cat.name} Collection</h2>
                <p class="text-slate-600 text-sm leading-relaxed">${cleanCategoryHtml(introText, rootPath)}</p>
            </div>
        </div>
        
        <!-- Swatches Section -->
        ${swatchesHtml}
        
        <!-- Backing Clips Section -->
        ${clipsHtml}
        
        <!-- Editorial Text -->
        ${editorialHtml ? `
        <div class="mt-6 pt-6 border-t border-slate-100">
            ${editorialHtml}
        </div>
        ` : ''}
        
        <!-- Contact Banner -->
        <div class="mt-8 p-6 rounded-xl bg-[#1E293B] text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
                <h3 class="text-base font-bold">Have Questions About ${cat.name}?</h3>
                <p class="text-xs text-slate-300 mt-1 max-w-xl">Get in touch with our expert Adelaide team today. We provide rapid turnarounds, custom design proofs, and Express Post shipping Australia-wide.</p>
            </div>
            <div class="flex flex-wrap gap-3 shrink-0">
                <a href="tel:1300862637" class="inline-flex items-center gap-2 bg-[#D72328] hover:bg-[#b81d22] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow-sm">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    Call 1300 862 637
                </a>
                <a href="mailto:admin@badgestore.com.au" class="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors border border-slate-700">
                    <svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    Email Support
                </a>
            </div>
        </div>

        <!-- Trailing Heading -->
        ${lastHeadingHtml ? `
        <div class="pt-4 border-t border-slate-100">
            ${lastHeadingHtml}
        </div>
        ` : ''}
    </div>
    `;
}

// Helper to compile header navigation
function compileNavigation(rootPath, activeSlug = '') {
    let html = `<nav class="border-t border-slate-100 flex items-center space-x-1 sm:space-x-4 overflow-x-auto py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap scrollbar-none" data-purpose="primary-navigation">`;

    // Filter only top-level categories (those without a parent)
    const topLevelCats = Object.keys(ProductCatalog.categories).filter(catKey => {
        return !ProductCatalog.categories[catKey].parent;
    });

    topLevelCats.forEach(catKey => {
        const cat = ProductCatalog.categories[catKey];
        const isActive = activeSlug === cat.slug;
        const linkClass = isActive
            ? 'text-brand-red font-bold px-3 py-1.5 rounded-md bg-red-50/80 flex items-center gap-1.5'
            : 'text-slate-600 hover:text-brand-red px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors';

        html += `<a class="${linkClass}" href="${rootPath}categories/${cat.slug}.html">${cat.name}</a>`;
    });

    html += `</nav>`;
    return html;
}

// Helper to compile mobile drawer navigation
function compileMobileNavigation(rootPath) {
    let html = `
    <ul class="mobile-drawer-list">`;

    // Filter only top-level categories (those without a parent)
    const topLevelCats = Object.keys(ProductCatalog.categories).filter(catKey => {
        return !ProductCatalog.categories[catKey].parent;
    });

    topLevelCats.forEach(catKey => {
        const cat = ProductCatalog.categories[catKey];
        html += `
        <li class="mobile-nav-item">
            <a href="${rootPath}categories/${cat.slug}.html" class="mobile-nav-link" title="Explore custom ${cat.name} range" aria-label="Browse the ${cat.name} collection">${cat.name}</a>
        </li>`;
    });

    html += `
        <li><a href="${rootPath}index.html#designer" class="btn btn-primary" title="Launch custom BadgeStore Interactive Designer tool" aria-label="Launch interactive designer tool" style="margin-top: 10px; color: #FFFFFF;">Launch Configurator</a></li>
    </ul>`;
    return html;
}

// Helper to compile category grid for homepage
function compileCategoryGrid() {
    let gridHtml = '';
    Object.keys(ProductCatalog.categories).forEach(catKey => {
        const cat = ProductCatalog.categories[catKey];
        if (cat.parent) return; // Skip sub-categories on homepage grid
        const firstProdRef = cat.products[0];
        const firstProd = firstProdRef ? ProductCatalog.products[firstProdRef.id] : null;
        const imageUrl = firstProd ? firstProd.image : '';
        gridHtml += `
        <div class="category-card">
            <div class="cat-image-holder" style="height: 180px; padding: 24px; background-color: var(--color-bg-surface); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--color-border); overflow: hidden;">
                <img src="${imageUrl}" alt="Browse custom range of ${cat.name} online" title="${cat.name} - BadgeStore Australia" class="category-grid-img" loading="lazy" style="max-width: 100%; max-height: 100%; object-fit: contain; transition: var(--transition-smooth);">
            </div>
            <div class="cat-body" style="padding: 24px; display: flex; flex-direction: column; gap: 12px; flex: 1;">
                <h3 style="font-size: 1.2rem;">${cat.name}</h3>
                <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.5;">${cat.desc}</p>
                <a href="categories/${cat.slug}.html" class="cat-link" title="Shop custom ${cat.name} collection" aria-label="Browse the entire ${cat.name} category" style="font-family: var(--font-heading); font-size: 0.9rem; font-weight: 700; color: var(--color-primary); margin-top: auto; display: inline-flex; align-items: center;">Shop ${cat.name} &rarr;</a>
            </div>
        </div>
        `;
    });
    return gridHtml;
}

// Helper to compile gallery thumbnails for product pages
function compileGalleryThumbnails(prod) {
    let galleryThumbnailsHtml = '';
    if (prod.gallery && prod.gallery.length > 0) {
        galleryThumbnailsHtml += `<div class="gallery-thumbnails-row" style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 30px;">`;
        prod.gallery.forEach((imgUrl, idx) => {
            let label = `Angle ${idx + 1}`;
            if (imgUrl.includes('magnet')) label = 'Magnet Back';
            else if (imgUrl.includes('pin')) label = 'Safety Pin';
            else if (imgUrl.includes('bulldog') || imgUrl.includes('clip-swivel') || imgUrl.includes('clip-pin') || imgUrl.includes('crocodile') || imgUrl.includes('attachment')) label = 'Attachment Clip';

            galleryThumbnailsHtml += `
            <button class="gallery-thumb-btn ${idx === 0 ? 'active' : ''}" data-large-url="${imgUrl}" type="button" aria-label="View product photo ${idx + 1}" style="width: 60px; height: 60px; border-radius: var(--border-radius-sm); border: 2px solid ${idx === 0 ? 'var(--color-primary)' : 'var(--color-border)'}; padding: 4px; background: #FFF; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: var(--transition-smooth); cursor: pointer;">
                <img src="${imgUrl}" alt="${label}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
            </button>`;
        });
        galleryThumbnailsHtml += `</div>`;
    }
    return galleryThumbnailsHtml;
}

// Helper to compile comparison table for category page and dev notes
function compileComparisonTableHtml(cat) {
    if (!cat.comparisonGuide) return '';
    let comparisonTableHtml = `
        <h3 class="text-xl font-bold text-slate-900 mb-4 text-center">${cat.comparisonGuide.title}</h3>
        <div class="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
            <table class="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                    <tr class="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
    `;
    cat.comparisonGuide.headers.forEach(h => {
        comparisonTableHtml += `<th class="py-3.5 px-4">${h}</th>`;
    });
    comparisonTableHtml += `
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-slate-600">
    `;
    cat.comparisonGuide.rows.forEach(row => {
        comparisonTableHtml += `<tr class="hover:bg-slate-50 transition-colors">`;
        row.forEach((cell, cIdx) => {
            const fontWeight = cIdx === 0 ? 'font-bold text-slate-900' : '';
            comparisonTableHtml += `<td class="py-3.5 px-4 ${fontWeight}">${cell}</td>`;
        });
        comparisonTableHtml += `</tr>`;
    });
    comparisonTableHtml += `
                </tbody>
            </table>
        </div>
    `;
    return comparisonTableHtml;
}

// 1. GENERATE CATEGORY PAGES
Object.keys(ProductCatalog.categories).forEach(catKey => {
    const cat = ProductCatalog.categories[catKey];
    console.log(`Compiling category page: ${cat.slug}.html`);

    let html = categoryTemplate;

    // Head / Meta
    html = html.replace(/{{metaTitle}}/g, cat.metaTitle);
    html = html.replace(/{{metaDesc}}/g, cat.metaDesc);

    // Navigation Menus
    html = html.replace(/{{navMenu}}/g, compileNavigation('../', cat.slug));
    html = html.replace(/{{mobileNavMenu}}/g, compileMobileNavigation('../'));

    // Breadcrumbs
    html = html.replace(/{{breadcrumbs}}/g, compileBreadcrumbs(cat.breadcrumbs));

    // Heading
    html = html.replace(/{{categoryHeading}}/g, cat.heading);

    // Results tally
    html = html.replace(/{{resultsTally}}/g, `Showing <span class="text-brand-red font-bold">${cat.products.length}</span> premium badge styles`);

    // Sidebar Filters
    let sidebarFiltersHtml = '';
    cat.filterGroups.forEach((group, gIdx) => {
        const dotColor = gIdx % 2 === 0 ? 'bg-brand-red' : 'bg-brand-slate';
        sidebarFiltersHtml += `
        <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div class="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full ${dotColor}"></span>
                    ${group.title}
                </h2>
                <span class="text-xs text-brand-red hover:underline cursor-pointer font-semibold">Reset</span>
            </div>
            <div class="space-y-3">
        `;
        group.options.forEach((opt, oIdx) => {
            const count = Math.floor(Math.random() * 8) + 4;
            sidebarFiltersHtml += `
                <label class="flex items-center text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer select-none">
                    <input type="checkbox" ${oIdx === 0 ? 'checked' : ''} class="rounded border-slate-300 text-brand-red focus:ring-brand-red/30 h-4 w-4">
                    <span class="ml-2.5">${opt}</span>
                    <span class="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">${count}</span>
                </label>
            `;
        });
        sidebarFiltersHtml += `
            </div>
        </div>
        `;
    });
    html = html.replace(/{{sidebarFilters}}/g, sidebarFiltersHtml);

    // Product Grid
    let productGridHtml = '';
    cat.products.forEach(prodRef => {
        const prod = ProductCatalog.products[prodRef.id];
        if (!prod) return;

        productGridHtml += `
        <article class="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-card-hover transition-all duration-200 flex flex-col overflow-hidden group">
            <div class="relative bg-slate-50 p-6 flex items-center justify-center min-h-[220px] border-b border-slate-100 overflow-hidden">
                <img src="${prod.image}" alt="Buy Custom ${prod.name} online from BadgeStore" title="${prod.name} | BadgeStore Australia" class="max-h-40 max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300" loading="lazy">
            </div>
            <div class="p-5 flex flex-col flex-1">
                <h3 class="font-bold text-slate-900 group-hover:text-brand-red transition-colors text-base leading-snug">
                    <a href="../products/${prod.id}.html">${prod.name}</a>
                </h3>
                <p class="text-xs text-slate-500 mt-1.5 line-clamp-2">
                    ${prod.description}
                </p>
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                        <span class="text-[11px] text-slate-400 uppercase font-semibold block">From</span>
                        <span class="text-lg font-extrabold text-slate-900">${prod.priceRange}</span>
                    </div>
                    <a href="../products/${prod.id}.html" class="bg-slate-900 hover:bg-brand-red text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors">
                        Configure
                    </a>
                </div>
            </div>
        </article>
        `;
    });
    html = html.replace(/{{productGrid}}/g, productGridHtml);

    // Get showcase image for OG tags
    const firstProdRef = cat.products[0];
    const firstProd = firstProdRef ? ProductCatalog.products[firstProdRef.id] : null;
    const showcaseImg = firstProd ? firstProd.image : 'https://cdn11.bigcommerce.com/s-5ghsl7hcw4/images/stencil/original/carousel/18/banner-3.jpg';

    // Populate SEO / Canonical / OG / Twitter Card Placeholders
    html = html.replace(/{{canonicalUrl}}/g, `https://www.badgestore.com.au/categories/${cat.slug}.html`);
    html = html.replace(/{{ogType}}/g, 'website');
    html = html.replace(/{{ogImage}}/g, showcaseImg);
    html = html.replace(/{{ogImageAlt}}/g, `Premium Custom ${cat.name} range by BadgeStore Australia`);

    // SEO Rich Article + Semantic B2B specifications guide (scaling word count past 1000 words)
    let seoArticleHtml = redesignCategoryDesc(cat, '../');
    seoArticleHtml += compileCategorySemanticGuide(cat);
    html = html.replace(/{{seoArticle}}/g, seoArticleHtml);

    // Comparison Table
    let comparisonTableHtml = compileComparisonTableHtml(cat);
    html = html.replace(/{{comparisonTable}}/g, comparisonTableHtml);

    // FAQs list
    let faqListHtml = '';
    cat.faqs.forEach((faq, fIdx) => {
        faqListHtml += `
        <details class="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm open:border-brand-red/40 transition-colors" ${fIdx === 0 ? 'open' : ''}>
            <summary class="flex justify-between items-center font-bold text-slate-800 cursor-pointer list-none text-sm sm:text-base">
                <span>${faq.q}</span>
                <span class="ml-4 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 group-open:rotate-180 group-open:bg-red-50 group-open:text-brand-red transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                </span>
            </summary>
            <p class="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed border-t border-slate-100 pt-3">
                ${faq.a}
            </p>
        </details>
        `;
    });
    html = html.replace(/{{faqList}}/g, faqListHtml);

    // Dynamic Unified Schema Graph (Organization + LocalBusiness + FAQPage + CollectionPage + ItemList)
    const unifiedSchema = compileUnifiedSchema('category', cat);
    html = html.replace(/{{schemaGraph}}/g, JSON.stringify(unifiedSchema, null, 2));

    // Save final html
    const categoryDir = path.join(__dirname, 'categories');
    if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
    }
    fs.writeFileSync(path.join(categoryDir, `${cat.slug}.html`), html, 'utf8');
});

// 2. GENERATE PRODUCT PAGES
Object.keys(ProductCatalog.products).forEach(prodKey => {
    const prod = ProductCatalog.products[prodKey];
    const cat = ProductCatalog.categories[prod.categorySlug];
    console.log(`Compiling product page: ${prod.id}.html`);

    let html = productTemplate;

    // Head / Meta
    const metaTitle = prod.metaTitle || `${prod.name} | Buy Custom ${cat ? cat.name : 'Badges'} | BadgeStore Australia`;
    const metaDesc = prod.metaDesc || prod.description || `Buy ${prod.name} online in Australia from BadgeStore. High quality custom printing with fast dispatch nationwide.`;
    html = html.replace(/{{metaTitle}}/g, metaTitle);
    html = html.replace(/{{metaDesc}}/g, metaDesc);
    html = html.replace(/{{canonicalUrl}}/g, `https://www.badgestore.com.au/products/${prod.id}.html`);
    html = html.replace(/{{ogType}}/g, 'product');
    html = html.replace(/{{ogImage}}/g, prod.image);
    html = html.replace(/{{ogImageAlt}}/g, `Configure and Buy Custom ${prod.name} online from BadgeStore Australia`);

    // Navigation Menus
    html = html.replace(/{{navMenu}}/g, compileNavigation('../'));
    html = html.replace(/{{mobileNavMenu}}/g, compileMobileNavigation('../'));

    // Dynamic IDs
    html = html.replace(/{{productId}}/g, prod.id);
    html = html.replace(/{{basePrice}}/g, prod.basePrice.toFixed(2));

    // Breadcrumbs
    const breadcrumbsList = ["Home", cat.name, prod.name];
    html = html.replace(/{{breadcrumbs}}/g, compileBreadcrumbs(breadcrumbsList));

    // Gallery Thumbnails
    html = html.replace(/{{galleryThumbnails}}/g, compileGalleryThumbnails(prod));

    // Details
    html = html.replace(/{{productName}}/g, prod.name);
    html = html.replace(/{{priceRange}}/g, prod.priceRange);
    html = html.replace(/{{description}}/g, prod.description);

    // Specs table
    let specsTableHtml = '';
    prod.specs.forEach(spec => {
        specsTableHtml += `
        <tr class="hover:bg-slate-50 transition-colors">
            <th class="py-3 px-4 font-bold text-slate-900 w-1/3 border-b border-slate-100">${spec[0]}</th>
            <td class="py-3 px-4 text-slate-600 border-b border-slate-100">${spec[1]}</td>
        </tr>
        `;
    });
    html = html.replace(/{{specsTable}}/g, specsTableHtml);

    // FAQs
    let productFaqsHtml = '';
    prod.faqs.forEach((faq, fIdx) => {
        productFaqsHtml += `
        <details class="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm open:border-brand-red/40 transition-colors" ${fIdx === 0 ? 'open' : ''}>
            <summary class="flex justify-between items-center font-bold text-slate-800 cursor-pointer list-none text-sm sm:text-base">
                <span>${faq.q}</span>
                <span class="ml-4 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 group-open:rotate-180 group-open:bg-red-50 group-open:text-brand-red transition-all">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                </span>
            </summary>
            <p class="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed border-t border-slate-100 pt-3">
                ${faq.a}
            </p>
        </details>
        `;
    });
    html = html.replace(/{{productFaqs}}/g, productFaqsHtml);

    // Configurator Forms & Canvas Preview Shapes
    let formControlsHtml = '';
    let previewerMarkupHtml = '';

    if (prod.configuratorType === 'badge') {
        formControlsHtml = `
        <!-- Step 1: Employee Personalisation -->
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <label class="block text-sm font-bold text-slate-900">1. Employee Personalisation</label>
                <a class="text-xs font-semibold text-brand-red hover:underline flex items-center space-x-1" href="#bulk-order-section">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                    <span>Upload Excel / CSV Roster</span>
                </a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1" for="employee-name">Name (Line 1):</label>
                    <input class="w-full text-sm rounded-lg border-slate-300 focus:ring-brand-red focus:border-brand-red" id="employee-name" placeholder="e.g. Courtney Henry" type="text" value="Courtney Henry" maxlength="28"/>
                </div>
                <div>
                    <label class="block text-xs font-medium text-slate-600 mb-1" for="employee-title">Job Title / Role (Line 2):</label>
                    <input class="w-full text-sm rounded-lg border-slate-300 focus:ring-brand-red focus:border-brand-red" id="employee-title" placeholder="e.g. Sales Associate" type="text" value="Sales Associate" maxlength="35"/>
                </div>
            </div>
        </div>

        <!-- Step 2: Select Font Typography -->
        <div class="space-y-2">
            <label class="block text-sm font-bold text-slate-900" for="font-select">2. Select Font Typography</label>
            <select class="w-full text-sm rounded-lg border-slate-300 focus:ring-brand-red focus:border-brand-red bg-white" id="font-select">
                <option selected value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans (Modern Clean Sans-Serif)</option>
                <option value="Georgia, serif">Georgia / Traditional Corporate Serif</option>
                <option value="monospace">Courier Tech Slab / Monospace</option>
            </select>
        </div>

        <!-- Step 3: Fastener Attachment Style -->
        <div class="space-y-3">
            <div class="flex items-center justify-between">
                <label class="block text-sm font-bold text-slate-900">3. Badge Fastener Style</label>
                <span class="text-xs text-slate-500 font-medium">Selected: Garment Safe</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="relative flex flex-col p-3.5 bg-red-50/50 border-2 border-brand-red rounded-xl cursor-pointer hover:bg-red-50 transition">
                    <input checked class="sr-only" name="fastener" type="radio" value="magnetic"/>
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-slate-900">Magnetic Attachment</span>
                        <span class="w-4 h-4 rounded-full bg-brand-red text-white flex items-center justify-center text-[10px]">✓</span>
                    </div>
                    <span class="text-[11px] text-brand-red font-semibold mt-1">Highly recommended</span>
                    <span class="text-[10px] text-slate-500 mt-1">Garment safe. Dual neodymium strength.</span>
                </label>
                <label class="relative flex flex-col p-3.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-slate-400 transition">
                    <input class="sr-only" name="fastener" type="radio" value="pin"/>
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-slate-800">Traditional Safety Pin</span>
                        <span class="w-4 h-4 rounded-full border border-slate-300"></span>
                    </div>
                    <span class="text-[11px] text-slate-500 font-medium mt-1">Low cost alternative</span>
                    <span class="text-[10px] text-slate-400 mt-1">Sturdy locking pin bar.</span>
                </label>
                <label class="relative flex flex-col p-3.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-slate-400 transition">
                    <input class="sr-only" name="fastener" type="radio" value="clip"/>
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-slate-800">Crocodile Swivel Clip</span>
                        <span class="w-4 h-4 rounded-full border border-slate-300"></span>
                    </div>
                    <span class="text-[11px] text-slate-500 font-medium mt-1">Combo pin &amp; clip</span>
                    <span class="text-[10px] text-slate-400 mt-1">Best for pockets &amp; lapels.</span>
                </label>
            </div>
        </div>

        <!-- Step 4: Business Logo Upload (Optional) -->
        <div class="space-y-2">
            <label class="block text-sm font-bold text-slate-900">4. Business Logo <span class="text-xs font-normal text-slate-500">(Optional - or email later)</span></label>
            <div class="border-2 border-dashed border-slate-300 hover:border-brand-red rounded-xl p-4 text-center cursor-pointer transition bg-slate-50/50">
                <svg class="mx-auto h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                <div class="mt-2 flex text-xs text-slate-600 justify-center">
                    <label class="relative cursor-pointer font-semibold text-brand-red hover:underline focus-within:outline-none" for="logo-upload">
                        <span>Upload Logo (AI, SVG, PDF, PNG)</span>
                        <input class="sr-only" id="logo-upload" accept=".svg,.ai,.pdf,.png,.jpg" type="file"/>
                    </label>
                    <span class="pl-1">or drag &amp; drop here</span>
                </div>
                <p class="text-[11px] text-slate-500 mt-1">We will send a free full-colour digital proof before production.</p>
            </div>
        </div>

        <!-- Step 5: Quantity & Dynamic Wholesale Pricing Summary -->
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
            <div class="flex items-center justify-between">
                <label class="text-sm font-bold text-slate-900" for="quantity-counter">Order Details &amp; Quantity:</label>
                <div class="flex items-center space-x-2">
                    <button class="w-8 h-8 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700" id="btn-qty-minus" type="button">−</button>
                    <input class="w-16 py-1 text-center font-bold text-sm rounded-lg border-slate-300 focus:ring-brand-red focus:border-brand-red" id="quantity-counter" max="10000" min="1" type="number" value="1"/>
                    <button class="w-8 h-8 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 flex items-center justify-center font-bold text-slate-700" id="btn-qty-plus" type="button">+</button>
                </div>
            </div>
            <div class="border-t border-slate-200 pt-3 space-y-1.5 text-xs text-slate-600">
                <div class="flex justify-between"><span>Unit Price (Base):</span> <span class="font-medium text-slate-900" id="summary-unit-price">$${prod.basePrice.toFixed(2)}</span></div>
                <div class="flex justify-between text-emerald-700 font-medium"><span>Bulk Volume Savings:</span> <span id="summary-savings">-$0.00</span></div>
                <div class="flex justify-between items-baseline pt-2 border-t border-slate-200">
                    <span class="text-sm font-bold text-slate-900">Subtotal Cost:</span>
                    <span class="text-2xl font-extrabold text-slate-900" id="summary-subtotal">$${prod.basePrice.toFixed(2)}</span>
                </div>
            </div>
            <div class="pt-2 space-y-2">
                <button class="w-full py-3.5 px-6 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-base shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2" id="btn-add-cart" type="button">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                    <span>Add Custom Badges To Cart</span>
                </button>
                <button class="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition" type="button">Request Official Corporate Quote / PO Invoice</button>
            </div>
        </div>
        `;

        previewerMarkupHtml = `
        <div class="w-full flex flex-col items-center justify-center relative">
            <div class="absolute top-0 left-0 flex gap-2">
                <span class="bg-blue-50 text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-blue-200">${prod.name.includes('Dome') ? '3D Crystal Polyurethane Dome' : 'Full Colour UV Print'}</span>
                <span class="bg-slate-100 text-slate-600 text-[11px] font-medium px-2.5 py-1 rounded-full border border-slate-200">Standard 75mm x 25mm</span>
            </div>
            <div class="py-12 sm:py-16 w-full flex items-center justify-center">
                <div class="badge-3d-edge badge-beveled-rim relative w-80 sm:w-96 h-32 bg-white border border-slate-100 rounded-xl flex items-center px-6 py-4 transition-all duration-200 hover:scale-[1.01]" id="live-badge-preview" style="background-image: radial-gradient(circle at 50% 0%, #ffffff 0%, #f9fafb 100%);">
                    <div class="badge-gloss-overlay absolute inset-0 rounded-xl"></div>
                    <div class="flex items-center space-x-4 w-full z-10">
                        <div class="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
                        </div>
                        <div class="flex-1 overflow-hidden">
                            <h3 class="text-lg sm:text-xl font-bold tracking-tight text-slate-900 uppercase truncate" id="preview-name">COURTNEY HENRY</h3>
                            <p class="text-xs sm:text-sm font-medium text-slate-600 truncate mt-0.5" id="preview-role">Sales Associate</p>
                            <p class="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-1">BadgeStore Corporate Edition</p>
                        </div>
                    </div>
                    <div class="absolute bottom-2 right-3 z-10 flex items-center space-x-1 text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path clip-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" fill-rule="evenodd"></path></svg>
                        <span id="preview-fastener-text">Magnetic Fastener Attached</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    } else if (prod.configuratorType === 'desk-plate') {
        formControlsHtml = `
        <div class="form-section-group">
            <h4 class="form-section-title">1. Plate Text Details</h4>
            <div class="config-row">
                <div class="input-group">
                    <label for="employee-name">Name (Line 1):</label>
                    <input type="text" id="employee-name" placeholder="Courtney Henry" value="COURTNEY HENRY" maxlength="28">
                </div>
                <div class="input-group">
                    <label for="employee-title">Job Title (Line 2):</label>
                    <input type="text" id="employee-title" placeholder="Managing Director" value="Managing Director" maxlength="35">
                </div>
            </div>
        </div>

        <div class="form-section-group">
            <h4 class="form-section-title">2. Select Font</h4>
            <div class="input-group">
                <select id="font-select">
                    <option value="'Plus Jakarta Sans', sans-serif">Plus Jakarta Sans</option>
                    <option value="Georgia, serif">Georgia Serif</option>
                </select>
            </div>
        </div>

        <div class="form-section-group">
            <h4 class="form-section-title">3. Track / Base Style</h4>
            <div class="toggle-option-grid">
                <label class="toggle-option">
                    <input type="radio" name="base-style" value="silver-track" checked>
                    <div class="toggle-card">
                        <strong>Silver Track Base</strong>
                        <span>Anodised metal channel</span>
                    </div>
                </label>
                <label class="toggle-option">
                    <input type="radio" name="base-style" value="timber-wedge">
                    <div class="toggle-card">
                        <strong>Timber Wedge Block</strong>
                        <span>Solid hardwood base</span>
                    </div>
                </label>
            </div>
        </div>
        `;

        previewerMarkupHtml = `
        <div id="live-badge" class="desk-plate-preview skin-mahogany-wood" style="width:340px; height:100px; border-radius:4px; display:flex; justify-content:center; align-items:center; color:#FFF; font-weight:bold; position:relative; box-shadow:0 8px 16px rgba(0,0,0,0.15); border: 2px solid #5a200a;">
            <div class="desk-plate-shine" style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%);"></div>
            <div style="text-align:center; padding:10px;">
                <div id="preview-name" style="font-size:1.3rem; letter-spacing:1px; text-transform:uppercase;">COURTNEY HENRY</div>
                <div id="preview-title" style="font-size:0.75rem; opacity:0.8; font-weight:normal; margin-top:2px;">Managing Director</div>
            </div>
        </div>
        `;
    } else if (prod.configuratorType === 'plaque') {
        formControlsHtml = `
        <div class="form-section-group">
            <h4 class="form-section-title">1. Plaque Inscription Text</h4>
            <div class="input-group">
                <label for="employee-name">Main Heading Text:</label>
                <input type="text" id="employee-name" placeholder="IN COMMEMORATION" value="IN COMMEMORATION" maxlength="30">
            </div>
            <div class="input-group" style="margin-top:12px;">
                <label for="employee-title">Description Inscription:</label>
                <textarea id="employee-title" rows="3" style="padding:10px; border:1px solid var(--color-border); border-radius:var(--border-radius-sm); font-size:0.9rem; font-family:inherit; outline:none; resize:none;">Engraved Text Details Here</textarea>
            </div>
        </div>

        <div class="form-section-group">
            <h4 class="form-section-title">2. Plaque Dimensions</h4>
            <div class="input-group">
                <select id="plaque-size">
                    <option value="A4">A4 Dimensions (297x210mm)</option>
                    <option value="A5">A5 Dimensions (210x148mm)</option>
                </select>
            </div>
        </div>

        <div class="form-section-group">
            <h4 class="form-section-title">3. Corner Mounting Screws</h4>
            <label class="filter-check-wrap">
                <input type="checkbox" checked id="toggle-border">
                <span>Add corner pre-drilled screw holes</span>
            </label>
        </div>
        `;

        previewerMarkupHtml = `
        <div id="live-badge" class="plaque-preview skin-silver-metal" style="width:280px; height:200px; border-radius:4px; display:flex; flex-direction:column; justify-content:space-between; padding:20px; box-shadow:0 8px 16px rgba(0,0,0,0.1); border: 2.5px double #475569;">
            <div style="display:flex; justify-content:space-between; width:100%;" id="plaque-screw-row-top">
                <span class="plaque-screw" style="width:8px; height:8px; border-radius:50%; background:#888; border:1px solid #444; display:block;"></span>
                <span class="plaque-screw" style="width:8px; height:8px; border-radius:50%; background:#888; border:1px solid #444; display:block;"></span>
            </div>
            <div style="text-align:center;">
                <h4 id="preview-name" style="font-size:1.1rem; margin-bottom:6px; font-weight:800; text-transform:uppercase;">IN COMMEMORATION</h4>
                <p id="preview-title" style="font-size:0.75rem; color:#444; white-space:pre-wrap;">Engraved Text Details Here</p>
            </div>
            <div style="display:flex; justify-content:space-between; width:100%;" id="plaque-screw-row-bottom">
                <span class="plaque-screw" style="width:8px; height:8px; border-radius:50%; background:#888; border:1px solid #444; display:block;"></span>
                <span class="plaque-screw" style="width:8px; height:8px; border-radius:50%; background:#888; border:1px solid #444; display:block;"></span>
            </div>
        </div>
        `;
    } else if (prod.configuratorType === 'id-card') {
        formControlsHtml = `
        <div class="form-section-group">
            <h4 class="form-section-title">1. ID Card Profile</h4>
            <div class="input-group">
                <label for="employee-name">Staff Name:</label>
                <input type="text" id="employee-name" placeholder="STAFF MEMBER" value="STAFF MEMBER" maxlength="28">
            </div>
            <div class="input-group" style="margin-top:12px;">
                <label for="employee-title">Department / Code:</label>
                <input type="text" id="employee-title" placeholder="DEPARTMENT" value="DEPARTMENT" maxlength="30">
            </div>
        </div>

        <div class="form-section-group">
            <h4 class="form-section-title">2. Employee Face Photo</h4>
            <div class="input-group">
                <label for="photo-upload">Upload Photo (PNG/JPG):</label>
                <input type="file" id="photo-upload" accept=".png,.jpg,.jpeg">
            </div>
        </div>

        <div class="form-section-group">
            <h4 class="form-section-title">3. Safety Breakaway Lanyard</h4>
            <label class="filter-check-wrap">
                <input type="checkbox" checked id="toggle-border">
                <span>Include safety breakaway lanyards</span>
            </label>
        </div>
        `;

        previewerMarkupHtml = `
        <div id="live-badge" class="id-card-preview skin-white-domed" style="width:200px; height:300px; border-radius:8px; border:2px solid #231F20; padding:15px; display:flex; flex-direction:column; align-items:center; justify-content:space-between; position:relative; box-shadow:0 8px 16px rgba(0,0,0,0.08);">
            <div style="width:100%; border-bottom:3px solid var(--color-primary); padding-bottom:5px; text-align:center; font-weight:800; font-size:0.8rem; letter-spacing:1px; color:var(--color-secondary);">BADGESTORE</div>
            <div style="width:80px; height:95px; background:#e2e8f0; border:1px solid #cbd5e1; border-radius:4px; display:flex; justify-content:center; align-items:center; font-size:0.6rem; color:#888; overflow:hidden;" id="photo-preview-box">PHOTO</div>
            <div style="text-align:center; margin-top:5px;">
                <div id="preview-name" style="font-size:0.95rem; font-weight:800; text-transform:uppercase; color:var(--color-secondary);">STAFF MEMBER</div>
                <div id="preview-title" style="font-size:0.7rem; color:var(--color-text-muted); margin-top:2px;">DEPARTMENT</div>
            </div>
            <div style="width:100%; text-align:center; font-size:0.6rem; color:#aaa; border-top:1px solid #eee; padding-top:5px;">BARCODE ID: 1000101</div>
        </div>
        `;
    } else if (prod.configuratorType === 'lapel-pin') {
        formControlsHtml = `
        <div class="form-section-group">
            <h4 class="form-section-title">1. Pin Text Markings</h4>
            <div class="input-group">
                <label for="employee-name">Pin Text Label:</label>
                <input type="text" id="employee-name" placeholder="CUSTOM PIN" value="CUSTOM PIN" maxlength="15">
            </div>
            <div class="input-group" style="margin-top:12px;">
                <label for="employee-title">Subtext / Vibe:</label>
                <input type="text" id="employee-title" placeholder="LOGO HERE" value="LOGO HERE" maxlength="15">
            </div>
        </div>

        <div class="form-section-group">
            <h4 class="form-section-title">2. Pin Base Dimension</h4>
            <div class="input-group">
                <select id="pin-size-select">
                    <option value="25mm">25mm Circular Diameter</option>
                    <option value="20mm">20mm Circular Diameter</option>
                    <option value="30mm">30mm Circular Diameter</option>
                </select>
            </div>
        </div>

        <div class="form-section-group">
            <h4 class="form-section-title">3. Design Vector File</h4>
            <div class="input-group">
                <label for="logo-upload">Upload Graphic Outlines (AI/SVG/PDF):</label>
                <input type="file" id="logo-upload" accept=".ai,.svg,.pdf,.png">
            </div>
        </div>
        `;

        previewerMarkupHtml = `
        <div id="live-badge" class="lapel-pin-preview skin-gold-metal" style="width:140px; height:140px; border-radius:50%; border:3px solid #854d0e; display:flex; justify-content:center; align-items:center; text-align:center; font-weight:800; font-size:0.65rem; color:#451a03; box-shadow:0 8px 16px rgba(0,0,0,0.1); position:relative;">
            <div style="position:absolute; inset:5px; border:1px dashed #854d0e; border-radius:50%;"></div>
            <div style="padding:10px; z-index:2;">
                <span id="preview-name">CUSTOM PIN</span><br>
                <span id="preview-title" style="font-size:0.55rem; font-weight:normal; opacity:0.8;">LOGO HERE</span>
            </div>
        </div>
        `;
    } else if (prod.configuratorType === 'badge-machine') {
        formControlsHtml = `
        <div class="form-section-group">
            <h4 class="form-section-title">1. Machine Specifications</h4>
            <div class="input-group">
                <label for="badge-machine-size">Circular Die Size:</label>
                <select id="badge-machine-size">
                    <option value="25mm" ${prod.id.includes('25mm') ? 'selected' : ''}>25mm circular die set</option>
                    <option value="57mm" ${prod.id.includes('57mm') ? 'selected' : ''}>57mm circular die set</option>
                </select>
            </div>
        </div>

        <div class="form-section-group">
            <h4 class="form-section-title">2. Bundle Kit Choices</h4>
            <div class="toggle-option-grid" style="grid-template-columns:1fr;">
                <label class="toggle-option">
                    <input type="radio" name="fastener" value="starter-kit" checked>
                    <div class="toggle-card">
                        <strong>Press Machine Kit bundle</strong>
                        <span>Includes die cutter & 100 component packages</span>
                    </div>
                </label>
            </div>
        </div>
        `;

        const pressLabel = prod.id.includes('25mm') ? '25MM PRESS' : '57MM PRESS';

        previewerMarkupHtml = `
        <div id="live-badge" class="badge-machine-preview" style="width:200px; height:200px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f1f5f9; border:1px solid var(--color-border); border-radius:var(--border-radius-md);">
            <svg viewBox="0 0 100 100" width="100" height="100" style="color:var(--color-primary);">
                <path fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" d="M30 90 L70 90 M50 90 L50 40 M50 40 L20 60 M50 30 L50 10 M35 15 L65 15" />
                <circle cx="50" cy="50" r="15" fill="currentColor" opacity="0.2"/>
            </svg>
            <strong style="font-size:0.8rem; margin-top:8px; color:var(--color-secondary);" id="preview-name">${pressLabel}</strong>
            <span style="font-size:0.65rem; color:var(--color-text-muted);" id="preview-title">Starter Kit Pack</span>
        </div>
        `;
    } else if (prod.configuratorType === 'pet-tag') {
        formControlsHtml = `
        <div class="form-section-group">
            <h4 class="form-section-title">1. Pet Collar Text</h4>
            <div class="input-group">
                <label for="employee-name">Pet Name (Front):</label>
                <input type="text" id="employee-name" placeholder="FIDO" value="FIDO" maxlength="12">
            </div>
            <div class="input-group" style="margin-top:12px;">
                <label for="employee-title">Contact Phone (Back):</label>
                <input type="text" id="employee-title" placeholder="Call: 0412 345 678" value="Call: 0412 345 678" maxlength="20">
            </div>
        </div>

        <div class="form-section-group">
            <h4 class="form-section-title">2. Tag Shape Outlines</h4>
            <div class="input-group">
                <select id="pet-tag-shape">
                    <option value="bone">Bone Cutout Profile</option>
                    <option value="round">Classic Circle Profile</option>
                </select>
            </div>
        </div>
        `;

        previewerMarkupHtml = `
        <div id="live-badge" class="pet-tag-preview skin-gold-metal" style="width:240px; height:130px; border-radius:65px; display:flex; flex-direction:column; justify-content:center; align-items:center; border:2px solid #854d0e; color:#451a03; box-shadow:0 8px 16px rgba(0,0,0,0.1); position:relative; padding:20px;">
            <span style="position:absolute; top:8px; left:50%; transform:translateX(-50%); width:10px; height:10px; border-radius:50%; background:#222; border:1px solid #854d0e;"></span>
            <div id="preview-name" style="font-size:1.4rem; font-weight:900; text-transform:uppercase;">FIDO</div>
            <div id="preview-title" style="font-size:0.75rem; font-weight:normal; margin-top:2px;">Call: 0412 345 678</div>
        </div>
        `;
    }

    // Dynamic checks/sliders inside order section
    formControlsHtml += `
    <!-- Quantity and pricing calculator box -->
    <div class="form-section-group pricing-calculator-group">
        <h4 class="form-section-title">Order Details &amp; Quantity</h4>
        <div class="qty-pricing-row">
            <div class="input-group" style="max-width: 120px;">
                <label for="badge-quantity">Quantity:</label>
                <input type="number" id="badge-quantity" value="1" min="1" max="500">
            </div>
            
            <div class="live-calc-results">
                <div class="calc-row">
                    <span>Unit Price:</span>
                    <strong id="calc-unit-price">$${prod.basePrice.toFixed(2)}</strong>
                </div>
                <div class="calc-row">
                    <span>Total Savings:</span>
                    <strong class="text-green" id="calc-savings">$0.00</strong>
                </div>
                <div class="calc-row total-row">
                    <span>Subtotal Cost:</span>
                    <strong id="calc-total-cost">$${prod.basePrice.toFixed(2)}</strong>
                </div>
            </div>
        </div>
    </div>

    <div class="form-submit-row">
        <button class="btn btn-primary btn-large btn-full" id="add-custom-badge-btn" type="button">Add Custom Badges To Cart</button>
    </div>
    `;

    html = html.replace(/{{formControls}}/g, formControlsHtml);
    html = html.replace(/{{previewerMarkup}}/g, previewerMarkupHtml);
    html = html.replace(/{{productSemanticGuide}}/g, compileProductSemanticGuide(prod));

    // Dynamic Unified Schema Graph (Organization + LocalBusiness + FAQPage + Product)
    const unifiedSchema = compileUnifiedSchema('product', prod);
    html = html.replace(/{{schemaGraph}}/g, JSON.stringify(unifiedSchema, null, 2));

    // Save final html
    const productDir = path.join(__dirname, 'products');
    if (!fs.existsSync(productDir)) {
        fs.mkdirSync(productDir, { recursive: true });
    }
    fs.writeFileSync(path.join(productDir, `${prod.id}.html`), html, 'utf8');
});

// 3. GENERATE HOMEPAGE
console.log('Compiling homepage: index.html');
let indexHtml = indexTemplate;
indexHtml = indexHtml.replace(/{{metaTitle}}/g, 'Custom Name Badges Australia | Badge Store Redesign');
indexHtml = indexHtml.replace(/{{metaDesc}}/g, 'Buy Custom Name Badges Online in Australia. Premium engraved, domed, wood, and metal name badges. Fast turnaround, no minimum orders, and damage-free magnetic attachments.');
indexHtml = indexHtml.replace(/{{canonicalUrl}}/g, 'https://www.badgestore.com.au/index.html');
indexHtml = indexHtml.replace(/{{ogType}}/g, 'website');
indexHtml = indexHtml.replace(/{{ogImage}}/g, 'https://cdn11.bigcommerce.com/s-5ghsl7hcw4/images/stencil/original/carousel/18/banner-3.jpg');
indexHtml = indexHtml.replace(/{{ogImageAlt}}/g, 'BadgeStore Australia - Premium Custom Name Badges');
indexHtml = indexHtml.replace(/{{navMenu}}/g, compileNavigation(''));
indexHtml = indexHtml.replace(/{{mobileNavMenu}}/g, compileMobileNavigation(''));
indexHtml = indexHtml.replace(/{{categoryGrid}}/g, compileCategoryGrid());
fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml, 'utf8');

// 4. GENERATE DEV NOTES DASHBOARD
console.log('Compiling Developer Handoff Notes...');
let devNotesHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Dev Notes — BadgeStore Australia pSEO Category Pages</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --dark:#0d1117;--panel:#161b22;--border:#30363d;
  --gold:#ED1C24; /* Red */
  --navy:#231F20; /* Charcoal */
  --text:#f0f6fc;--muted:#8b949e;--sub:#c9d1d9;
  --amber:#f0a500;
}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--dark);color:var(--text);font-size:13px;line-height:1.6;min-height:100vh}
a{color:var(--gold)}

/* HEADER */
.hdr{background:var(--navy);border-bottom:3px solid var(--gold);padding:16px 28px;position:sticky;top:0;z-index:300}
.hdr-in{max-width:1400px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.hdr-logo{background:var(--gold);color:#fff;font-size:10px;font-weight:800;padding:6px 10px;border-radius:4px;letter-spacing:.5px;line-height:1.3;text-align:center;flex-shrink:0}
.hdr-title{font-size:15px;font-weight:700;color:#fff}
.hdr-sub{font-size:11px;color:rgba(255,255,255,.45);margin-top:2px}
.hdr-links{display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.hdr-link{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:5px;padding:6px 12px;font-size:11px;color:rgba(255,255,255,.75);text-decoration:none;transition:all .15s;white-space:nowrap}
.hdr-link:hover{background:rgba(255,255,255,.14);color:#fff}

/* CATEGORY TABS */
.tab-bar{background:rgba(0,0,0,.4);border-bottom:1px solid var(--border);position:sticky;top:72px;z-index:200;overflow-x:auto;scrollbar-width:none}
.tab-bar::-webkit-scrollbar{display:none}
.tab-bar-in{max-width:1400px;margin:0 auto;display:flex;padding:0 20px}
.cat-tab{background:none;border:none;border-bottom:3px solid transparent;color:rgba(255,255,255,.4);font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:400;padding:12px 16px;cursor:pointer;white-space:nowrap;transition:all .15s}
.cat-tab:hover{color:rgba(255,255,255,.75)}
.cat-tab.on{color:#fff;font-weight:600}

/* MAIN */
.main{max-width:1400px;margin:0 auto;padding:28px 20px 60px}

/* CAT PAGE */
.cat-page{display:none}
.cat-page.on{display:block}

/* PAGE URL BAR */
.page-url-bar{display:flex;align-items:center;gap:12px;background:var(--panel);border:1px solid var(--border);border-radius:8px;padding:12px 16px;margin-bottom:24px;flex-wrap:wrap}
.purl-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);flex-shrink:0;font-family:'JetBrains Mono',monospace}
.purl-link{font-size:13px;font-weight:600;text-decoration:none;font-family:'JetBrains Mono',monospace}
.purl-link:hover{text-decoration:underline}
.purl-note{font-size:11px;color:var(--muted);margin-left:auto}

/* SECTION BLOCK */
.sec-block{background:var(--panel);border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:20px}
.sec-header{display:flex;align-items:center;gap:10px;padding:13px 18px;background:#1a1f2e;border-bottom:1px solid var(--border)}
.sec-icon{width:28px;height:28px;background:var(--navy);color:#fff;font-size:13px;font-weight:700;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sec-label{font-size:14px;font-weight:700;color:var(--text)}
.sec-body{display:grid;grid-template-columns:340px 1fr;gap:0}
.shot-col{border-right:1px solid var(--border);padding:16px}
.shot-label{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.4px;color:var(--muted);margin-bottom:10px;font-family:'JetBrains Mono',monospace}
.shot-img{width:100%;border-radius:6px;border:1px solid var(--border);display:block}
.content-col{padding:16px 20px;display:flex;flex-direction:column;gap:12px;overflow-y:auto;max-height:600px}

/* COPY FRAME */
.cf-wrap{display:flex;flex-direction:column;gap:4px}
.cf-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:var(--muted);font-family:'JetBrains Mono',monospace}
.cf-box{background:#0d1117;border:1px solid var(--border);border-radius:5px;padding:10px 12px;font-size:12.5px;color:var(--sub);line-height:1.7;white-space:pre-wrap;word-break:break-word;font-family:'JetBrains Mono',monospace}
.cf-copy{align-self:flex-start;background:var(--navy);color:rgba(255,255,255,.7);border:1px solid var(--border);border-radius:4px;padding:4px 12px;font-family:'Plus Jakarta Sans',sans-serif;font-size:11px;font-weight:500;cursor:pointer;transition:all .15s;margin-top:2px}
.cf-copy:hover{background:var(--gold);color:#fff;border-color:var(--gold)}
.cf-copy.copied{background:#1a4a1a;color:#69db7c;border-color:#69db7c}

/* CARD DIVIDER */
.card-divider{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--amber);padding:6px 0 2px;border-top:1px solid var(--border);margin-top:4px;font-family:'JetBrains Mono',monospace}
.card-divider:first-child{border-top:none;margin-top:0}

/* FOOTER */
footer{background:var(--navy);border-top:2px solid var(--gold);padding:28px;text-align:center}
footer a{color:var(--gold);text-decoration:none}
footer a:hover{text-decoration:underline}
.ft-credit{font-size:11px;color:rgba(255,255,255,.35);margin-top:8px;font-family:'JetBrains Mono',monospace}

@media(max-width:900px){
  .sec-body{grid-template-columns:1fr}
  .shot-col{border-right:none;border-bottom:1px solid var(--border)}
  .content-col{max-height:none}
}
</style>
</head>
<body>

<header class="hdr">
  <div class="hdr-in">
    <div style="display:flex;align-items:center;gap:14px">
      <div class="hdr-logo">DEV<br>NOTES</div>
      <div>
        <div class="hdr-title">BadgeStore Australia — pSEO Category Pages · Dev Notes</div>
        <div class="hdr-sub">Content reference for all primary category pages · screenshots + copy frames for every changing element</div>
      </div>
    </div>
    <div class="hdr-links">
      <a href="https://github.com/seobiopse/bas-website-revamped" target="_blank" class="hdr-link">⎇ GitHub Repo ↗</a>
      <a href="https://seobiopse.github.io/bas-website-revamped/" target="_blank" class="hdr-link">🌐 Live Site ↗</a>
      <select class="hdr-link" onchange="if(this.value) switchCat(this.value)" style="background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.15); color:rgba(255,255,255,.75); padding:6px 24px 6px 12px; font-size:11px; font-family:'Plus Jakarta Sans',sans-serif; border-radius:5px; cursor:pointer; outline:none; -webkit-appearance:none; appearance:none; background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www%2eW3%2eorg/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22></polyline></svg>'); background-repeat:no-repeat; background-position:right 8px center;">
        <option value="">📋 Quick Navigation...</option>
        ${Object.keys(ProductCatalog.categories).map(catKey => {
    const cat = ProductCatalog.categories[catKey];
    return `<option value="${cat.slug}">${cat.name}</option>`;
}).join('')}
      </select>
    </div>
  </div>
</header>

<div class="tab-bar">
  <div class="tab-bar-in">
    ${Object.keys(ProductCatalog.categories).map((catKey, idx) => {
    const cat = ProductCatalog.categories[catKey];
    return `<button class="cat-tab ${idx === 0 ? 'on' : ''}" data-cat="${cat.slug}" onclick="switchCat('${cat.slug}')">${cat.name}</button>`;
}).join('\n')}
  </div>
</div>

<main class="main">
`;

// Dynamic page content generation
Object.keys(ProductCatalog.categories).forEach(catKey => {
    const cat = ProductCatalog.categories[catKey];

    // Build JSON-LD unified schema
    const schemaJson = JSON.stringify(compileUnifiedSchema('category', cat), null, 2);

    // Build programmatic B2B semantic guide
    const guideHtml = compileCategorySemanticGuide(cat);

    // Build SEO redesigned description elements
    const seoArticleHtml = redesignCategoryDesc(cat, '../');

    const comparisonTableHtml = compileComparisonTableHtml(cat);

    // Construct tab panel
    devNotesHtml += `
<div class="cat-page" id="page-${cat.slug}">
  <div class="page-url-bar">
    <span class="purl-label">Live page URL</span>
    <a href="https://seobiopse.github.io/bas-website-revamped/categories/${cat.slug}.html" target="_blank" class="purl-link" style="color: var(--gold);">https://seobiopse.github.io/bas-website-revamped/categories/${cat.slug}.html ↗</a>
    <span class="purl-note">Click to open live page in new tab — verify each section matches content below</span>
  </div>

  <!-- SECTION 1: Meta Tags -->
  <div class="sec-block">
    <div class="sec-header">
      <span class="sec-icon">①</span>
      <span class="sec-label">Metadata &amp; Header Elements</span>
    </div>
    <div class="sec-body">
      <div class="shot-col">
        <div class="shot-label">HTML Head Tags Mockup</div>
        <div class="mock-head-illustration" style="background: #231f20; border: 1px solid #30363d; border-radius: 6px; padding: 12px; font-family: monospace; font-size: 11px; color: #a5d6ff;">
          <div style="color: #8b949e;">&lt;head&gt;</div>
          <div style="padding-left: 12px; color: #ff7b72;">&lt;title&gt;<span style="color: #c9d1d9;">${cat.metaTitle}</span>&lt;/title&gt;</div>
          <div style="padding-left: 12px; color: #ff7b72;">&lt;meta <span style="color: #79c0ff;">name</span>="<span style="color: #a5d6ff;">description</span>" <span style="color: #79c0ff;">content</span>="..."&gt;</div>
          <div style="padding-left: 12px; color: #ff7b72;">&lt;link <span style="color: #79c0ff;">rel</span>="<span style="color: #a5d6ff;">canonical</span>" <span style="color: #79c0ff;">href</span>="..."&gt;</div>
          <div style="color: #8b949e;">&lt;/head&gt;</div>
        </div>
      </div>
      <div class="content-col">
        <div class="cf-wrap">
          <div class="cf-label">Meta Title Tag</div>
          <div class="cf-box" id="title-${cat.slug}">${cat.metaTitle}</div>
          <button class="cf-copy" onclick="copyFrame('title-${cat.slug}', this)">Copy</button>
        </div>
        <div class="cf-wrap">
          <div class="cf-label">Meta Description</div>
          <div class="cf-box" id="desc-${cat.slug}">${cat.metaDesc}</div>
          <button class="cf-copy" onclick="copyFrame('desc-${cat.slug}', this)">Copy</button>
        </div>
        <div class="cf-wrap">
          <div class="cf-label">Canonical URL</div>
          <div class="cf-box" id="canon-${cat.slug}">https://www.badgestore.com.au/categories/${cat.slug}.html</div>
          <button class="cf-copy" onclick="copyFrame('canon-${cat.slug}', this)">Copy</button>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 2: Hero Section -->
  <div class="sec-block">
    <div class="sec-header">
      <span class="sec-icon">②</span>
      <span class="sec-label">Hero Section Elements</span>
    </div>
    <div class="sec-body">
      <div class="shot-col">
        <div class="shot-label">Hero Component Mockup</div>
        <div class="mock-hero" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; color: #231f20;">
          <div style="font-weight: 800; font-size: 14px; color: #ED1C24; margin-bottom: 6px;">${cat.heading}</div>
          <div style="font-size: 10px; color: #374151; line-height: 1.4; margin-bottom: 8px;">${cat.desc}</div>
          <button style="background: #ED1C24; color: #FFF; font-size: 9px; padding: 4px 8px; border: none; border-radius: 4px; font-weight: bold; cursor: default;">DIY Badges</button>
        </div>
      </div>
      <div class="content-col">
        <div class="cf-wrap">
          <div class="cf-label">H1 Heading</div>
          <div class="cf-box" id="h1-${cat.slug}">${cat.heading}</div>
          <button class="cf-copy" onclick="copyFrame('h1-${cat.slug}', this)">Copy</button>
        </div>
        <div class="cf-wrap">
          <div class="cf-label">Hero Intro Text</div>
          <div class="cf-box" id="intro-${cat.slug}">${cat.desc}</div>
          <button class="cf-copy" onclick="copyFrame('intro-${cat.slug}', this)">Copy</button>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 3: SEO Description Redesigned Elements -->
  <div class="sec-block">
    <div class="sec-header">
      <span class="sec-icon">③</span>
      <span class="sec-label">SEO Description Redesigned Components</span>
    </div>
    <div class="sec-body">
      <div class="shot-col">
        <div class="shot-label">SEO Component Layout Mockup</div>
        <div style="font-size: 11px; color: #8b949e; line-height: 1.4;">
          This contains the responsive, high-aesthetic layout featuring hero showcase block, swatches grid, and backing clip cards.
        </div>
      </div>
      <div class="content-col">
        <div class="cf-wrap">
          <div class="cf-label">SEO Description HTML Block</div>
          <div class="cf-box" id="seo-desc-${cat.slug}" style="font-size: 11px; max-height: 250px; overflow-y: auto; white-space: pre-wrap;">${seoArticleHtml.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
          <button class="cf-copy" onclick="copyFrame('seo-desc-${cat.slug}', this)">Copy</button>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 4: Structured Metadata Schema (JSON-LD) -->
  <div class="sec-block">
    <div class="sec-header">
      <span class="sec-icon">④</span>
      <span class="sec-label">JSON-LD Unified Schema Graph</span>
    </div>
    <div class="sec-body">
      <div class="shot-col">
        <div class="shot-label">JSON-LD Placement</div>
        <div style="font-size: 11px; color: #8b949e; line-height: 1.4;">
          This structured graph integrates LocalBusiness, Organization, MerchantReturnPolicy, CollectionPage, ItemList, and FAQPage schemas into a unified, search-engine ready JSON payload.
        </div>
      </div>
      <div class="content-col">
        <div class="cf-wrap">
          <div class="cf-label">Schema Graph Code Block</div>
          <div class="cf-box" id="schema-${cat.slug}" style="font-size: 11px; max-height: 250px; overflow-y: auto;">${schemaJson}</div>
          <button class="cf-copy" onclick="copyFrame('schema-${cat.slug}', this)">Copy</button>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 5: Programmatic B2B Guide -->
  <div class="sec-block">
    <div class="sec-header">
      <span class="sec-icon">⑤</span>
      <span class="sec-label">Programmatic B2B Semantic Guide</span>
    </div>
    <div class="sec-body">
      <div class="shot-col">
        <div class="shot-label">Programmatic Layout</div>
        <div style="font-size: 11px; color: #8b949e; line-height: 1.4;">
          Calculates category starting prices, lists variant USPs dynamically, and details materials, compliance, and South Australian dispatch logistics to scale SEO value.
        </div>
      </div>
      <div class="content-col">
        <div class="cf-wrap">
          <div class="cf-label">Semantic Guide HTML Block</div>
          <div class="cf-box" id="guide-${cat.slug}" style="font-size: 11px; max-height: 250px; overflow-y: auto; white-space: pre-wrap;">${guideHtml}</div>
          <button class="cf-copy" onclick="copyFrame('guide-${cat.slug}', this)">Copy</button>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 6: AEO/GEO Comparison Table -->
  <div class="sec-block">
    <div class="sec-header">
      <span class="sec-icon">⑥</span>
      <span class="sec-label">AEO/GEO Comparison Table</span>
    </div>
    <div class="sec-body">
      <div class="shot-col">
        <div class="shot-label">Table Component Layout Mockup</div>
        <div style="font-size: 11px; color: #8b949e; line-height: 1.4;">
          This comparison table maps key variant specs, material types, and benefits in a clean tabular grid.
        </div>
      </div>
      <div class="content-col">
        <div class="cf-wrap">
          <div class="cf-label">Comparison Table HTML Block</div>
          <div class="cf-box" id="comp-table-${cat.slug}" style="font-size: 11px; max-height: 250px; overflow-y: auto; white-space: pre-wrap;">${comparisonTableHtml.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
          <button class="cf-copy" onclick="copyFrame('comp-table-${cat.slug}', this)">Copy</button>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION 7: FAQs -->
  <div class="sec-block">
    <div class="sec-header">
      <span class="sec-icon">⑦</span>
      <span class="sec-label">Frequently Asked Questions (FAQ list)</span>
    </div>
    <div class="sec-body">
      <div class="shot-col">
        <div class="shot-label">FAQ Accordion Mockup</div>
        <div class="mock-faq" style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px; color: #231f20; font-size: 11px;">
          ${cat.faqs.slice(0, 2).map((faq, fIdx) => `
            <div style="border-bottom: 1px solid #f3f4f6; padding: 6px 0; font-weight: bold; color: #231f20;">Q: ${faq.q}</div>
            <div style="padding: 6px 0; color: #6b7280; font-size: 10px; line-height: 1.3;">A: &nbsp;${faq.a.substring(0, 80)}...</div>
          `).join('')}
        </div>
      </div>
      <div class="content-col">
        ${cat.faqs.map((faq, fIdx) => `
          <div class="card-divider">FAQ ${fIdx + 1}</div>
          <div class="cf-wrap">
            <div class="cf-label">Question</div>
            <div class="cf-box" id="faq-q-${fIdx}-${cat.slug}">${faq.q}</div>
            <button class="cf-copy" onclick="copyFrame('faq-q-${fIdx}-${cat.slug}', this)">Copy</button>
          </div>
          <div class="cf-wrap">
            <div class="cf-label">Answer</div>
            <div class="cf-box" id="faq-a-${fIdx}-${cat.slug}">${faq.a}</div>
            <button class="cf-copy" onclick="copyFrame('faq-a-${fIdx}-${cat.slug}', this)">Copy</button>
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</div>
`;
});

devNotesHtml += `
</main>

<footer>
  <div style="font-size:13px;color:rgba(255,255,255,.6)">BadgeStore Australia pSEO Dev Notes · <a href="https://github.com/seobiopse/bas-website-revamped" target="_blank">GitHub Repo</a> · <a href="https://seobiopse.github.io/bas-website-revamped/" target="_blank">Live Site</a></div>
  <div class="ft-credit">Girish Kumar G &nbsp;|&nbsp; Programmatic SEO Manager &nbsp;|&nbsp; Father of SEO</div>
</footer>

<script>
function switchCat(key) {
  document.querySelectorAll('.cat-page').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('on'));
  const page = document.getElementById('page-' + key);
  if (page) page.classList.add('on');
  document.querySelectorAll('.cat-tab').forEach(t => {
    if (t.getAttribute('data-cat') === key) t.classList.add('on');
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copyFrame(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  const text = el.innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  });
}

// Init first tab
const firstTabKey = "${ProductCatalog.categories[Object.keys(ProductCatalog.categories)[0]].slug}";
switchCat(firstTabKey);
</script>

</body>
</html>
`;

// Dev notes generation disabled for production build.
console.log('Compilation completed successfully!');

console.log('Compilation completed successfully!');
