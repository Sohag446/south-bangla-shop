# SOUTH BANGLA COMPUTERS — E-COMMERCE UX/UI & FRONTEND DEVELOPMENT BLUEPRINT

**Document version:** 1.0 · **Date:** 21 October 2026 · **Status:** Draft for client review and Antigravity implementation
**Deliverable type:** Static, interactive frontend prototype (HTML5 / CSS3 / Vanilla JS). No backend.

> **Prototype disclosure (must appear in the product, see §10.20):** Authentication, dealer approval, payments, inventory, pricing, and order placement in this prototype are **simulated**. No real transaction, account, or personal data is processed or transmitted.

---

## Table of contents

1. Project overview
2. Research findings and limitations
3. Existing website page inventory
4. Recommended sitemap
5. User personas and user journeys
6. Homepage wireframe specification
7. Page-by-page UX/UI specifications
8. Design system and design tokens
9. Component inventory
10. Interaction and behavior specifications
11. Customer and dealer flows
12. Demo product data requirements
13. Frontend architecture and file structure
14. Responsive requirements
15. Accessibility and SEO requirements
16. Implementation phases
17. QA and acceptance checklist
18. Assumptions and questions requiring client approval
19. Final Antigravity implementation instruction

---

## 1. Project overview

### 1.1 Business
South Bangla Computers (SBC) is a Dhaka-based ICT and networking distributor. Its current site states it has operated since 1999 and describes itself as an authorized/exclusive distributor of global brands, serving ISPs, enterprises, SOHO/home users, corporate clients and resellers nationwide. Head office: 323, Akram Serenity, Level 5 & 6, Elephant Road, Dhaka-1205.

### 1.2 Goal
Redesign the public website as a **premium, trustworthy, commerce-led product catalogue and ordering experience** serving two audiences:

1. **Retail / project customers** — browse, compare specifications, check availability, and order or request a quote.
2. **Dealers, resellers, ISPs and business buyers** — apply for an account, see dealer-specific pricing (once approved), place bulk orders, and track orders.

### 1.3 Critical finding that shapes this blueprint
The brief's example categories (laptops, desktops, processors, motherboards, graphics cards, RAM/storage) **do not match what the live website sells**. The live catalogue is overwhelmingly **networking, fiber/PON, CCTV, power backup (UPS, solar inverters, batteries), cabling, fiber tools, and PC peripherals/audio**. It shows **no prices, no cart, no login** and uses "Compare" plus a "Network Solution Configurator" that ends in a quotation request.

**Decision taken in this blueprint:** the prototype's category tree and demo data follow the **real catalogue**, not the brief's PC-component list. Laptops, GPUs, CPUs, motherboards and RAM are **out of scope** unless the client confirms SBC sells them (see §18, Q1). This keeps the demo credible in front of SBC's management.

### 1.4 Brand priorities
- **South Bangla** is the master brand; **Tenda** and **Mission** are strategic hero brands; all other brands remain discoverable.
- *Note:* "Mission" does **not** appear in the live brand menu (see §2.4). Treat it as a placeholder hero brand and confirm the correct name/logo with the client (§18, Q3). The prototype must work with a brand data file so renaming is a one-line change.
- Tone: premium, calm, trustworthy, light interface, restrained motion. English-first; layout and tokens must not preclude a future Bangla (বাংলা) version (§13.9).

### 1.5 Design principles
1. **Confident, not loud.** Navy/blue, white and light gray; one accent; no decorative gradients.
2. **Specification clarity.** Buyers of networking gear compare ports, standards, power budgets. Specs are first-class UI.
3. **Two doors, one house.** Retail and dealer journeys are visibly different but share tokens and components.
4. **Honest data.** Anything not verified is labeled demo. No fabricated testimonials, awards, counts or inventory claims.
5. **Quote-capable commerce.** Because the live business is distribution-led, every product supports *Add to cart* **and** *Request quote*; which is primary is a business decision (§18, Q4).

---

## 2. Research findings and limitations

### 2.1 Method and honesty statement
Research was performed on **21 October 2026** by fetching public pages of `https://www.southbanglabd.com/`. Only pages listed with **"Inspected"** in §3 were actually retrieved and read. Pages marked **"Navigation only"** were seen as links in menus but **not opened**; nothing is claimed about their content. `sitemap.xml` and `robots.txt` were **not** retrieved (the fetch tool only opens URLs already surfaced in results); sitemap completeness is therefore **unknown**. No visual rendering or screenshot inspection was possible: all observations come from page text/markup, not from seeing the page in a browser.

### 2.2 What was observed (verified)
| # | Finding | Source page |
|---|---|---|
| F1 | Primary nav: Home · Our Products (brand mega-menu, 14 brands) · News & Events · Resources · About Us · Contact. | Home |
| F2 | Brands in menu: Tenda, Cisco, HSGQ, Tumtec, Meetion, Must, Solitine, Ubiquiti, Rosenberger, Marsriva, IP-Com, Ewin, HKC, Phyhome. (14 listed; the homepage "Authorized Brands" strip shows 12, omitting HKC and Phyhome.) | Home |
| F3 | Utility bar: email, head-office address, Facebook, YouTube; a "Support" panel with Support (3 numbers), Sales (2 numbers), Marketing (1 number) teams, Email, Submit Query, Support Centers; a **"Network Plan"** link. | All pages |
| F4 | Homepage: hero slider (5 slides), Bangla notice about new support centers in Kushtia, Sylhet, Comilla, Rajshahi, 4 value props (Authorized Distributor, Complete Network Solutions, Expert Technical Support, Nationwide Delivery), brand strip, About block (mission/vision/goals), "Why Choose Us" counters (26+ years, 12+ brands, 500+ products, 1000+ clients) and percentage "skill bars", New Arrivals image gallery, one product-review video (YouTube), service promises (12-hour support, 1-hour warranty decision, warranty agreement, CSR), 3 latest news items (3 Aug 2026 buying guides: ONU, OLT, Media Converter), footer with 8 locations. | Home |
| F5 | Footer claim: "serving over 200 corporate clients and 400+ resellers nationwide". | All pages |
| F6 | Locations: Head Office; Support Center; Warehouse (Hazaribagh); showrooms at Multiplan (Elephant Rd), IDB Bhaban, Uttara, Chittagong, Khulna. | Footer |
| F7 | `/products` is one very long unpaginated grid of 150+ product cards (image, model, name, "NEW PRODUCT" badge on some); the fetched text was truncated mid-list, so the true total is higher and was not counted. Mixed brands, no visible filters, sort, price, or category on this view. | /products |
| F8 | Brand page `/tenda` has a **category tab list** (All, Router, Managed switch, Unmanaged switch, Gigabit Unmanaged switch, PoE Switch, Range Extender, Basestation & Data Connectivity, Nanostation, USB Adapter, Wireless Access Point, Tenda FTTx, Mesh WiFi, Wifi Camera, Injector, XPON Wi-Fi Router, Outdoor, NVR). Content is rendered per tab; the text extraction shows the same products repeated across tabs. | /tenda |
| F9 | Product detail (`/product/tenda-ax12-ax3000-dual-band-gigabit`): breadcrumb, 4-image gallery with zoom, promo banner, brand / category / model, **Availability** field (this item reads "Discontinued" while also carrying a "NEW PRODUCT" badge), key features, tabs (Specifications, Description, Documents), spec tables grouped (Hardware, Wireless, Software, Others), warranty row ("1 Year Official Warranty"), PDF datasheet view/download, **Compare** button. **No price, no add-to-cart.** | PDP |
| F10 | A persistent bottom bar "Compare Products 0 · Compare Now". | All pages |
| F11 | `/network-configurator`: multi-step tool (project type → users/devices → coverage area → special requirements → recommended products with editable quantities → summary + topology → **Request Quotation** → PDF proposal "no prices included"). A banner states it is a **demo version under development** (in Bangla). | /network-configurator |
| F12 | `/firmware`: six categories (Router, ONU, Outdoor, Security & Camera, Switch, Access Point) each linking to `/firmware-download/{1-6}`. | /firmware |
| F13 | Meta: `robots INDEX,FOLLOW`; canonical present; Google Tag Manager present; product pages carry Open Graph/Twitter tags and `og:type=product`. Product page titles are long. No structured data (JSON-LD) was visible in extracted text (cannot be confirmed). | Several |

### 2.3 Content and UX problems found (to be fixed, not copied)
| ID | Problem | Evidence | Redesign response |
|---|---|---|---|
| P1 | No search, filters, sort or pagination on a 150+ item catalogue | F7 | Faceted listing (§7 P05), search suggestions (§10.2) |
| P2 | No price or order path; the only conversion paths are phone, email, query form and configurator quote | F9, F11 | Price/quote model (§18 Q4), cart + quote cart |
| P3 | Availability shows "Discontinued" beside a "NEW PRODUCT" badge | F9 | Badge logic: *New* only if `isNew && status != discontinued`; discontinued items show a "Discontinued — see alternatives" panel |
| P4 | Brand-tab pages repeat the same items in several tabs | F8 | One product → one primary category + optional tags |
| P5 | Decorative statistics ("Network Infrastructure 92%") with no basis | F4 | Remove percentage bars; keep only claims the client confirms |
| P6 | Brand inconsistency: "12+ brands" vs 14 in menu | F2, F4 | Single brand data source; counts computed, not typed |
| P7 | Typos in data ("Recgarageable", "Utral-Fast", "Tenda Tenda TC3B24C", "Camera4MP Smart…") | F7, F8 | Data-quality rules for the future CMS (§18 Q12) |
| P8 | "Our Partners" and "Our Shop" both point to `/our-shop` | F1, F6 | One page: Branches & Partners |
| P9 | Contact info repeated in a heavy utility drawer on every page | F3 | One consolidated "Contact & Support" popover + page |
| P10 | Datasheets exist but are buried in a tab | F9 | Surface "Datasheet" next to the price/CTA block |
| P11 | Mixed Bangla/English content with no language toggle | F4 | English-first with Bangla-ready structure |
| P12 | Product images hotlinked from `/backend/products/image/*` with inconsistent formats (jpg/png/webp) and likely inconsistent backgrounds | F7 | Image rules (§8.9); local copies in production |

### 2.4 Unverified or contradictory items (flag for client)
- "Mission" brand: not in the live menu (§1.4).
- Business claims on the live site (26+ years, 500+ products, 1000+ clients, 200 corporate clients, 400+ resellers, 12-hour support, 1-hour warranty decision) are **the client's own published claims**. The prototype may reuse them **only with an on-page "as stated by SBC" provenance in the spec and client sign-off**; they must live in `data/site-claims.js` so they can be removed in one edit.
- Whether SBC sells online today, accepts COD, bank transfer, or mobile wallets: **unknown**.
- Whether dealer pricing exists as a tiered program: **unknown**.

### 2.5 Limitations of this research
1. Pages marked "Navigation only" in §3 were not opened.
2. Pagination, filters or account features that exist only after JavaScript runs may not appear in text extraction. The absence of a feature in this report means "not observed in the fetched text", not "proven not to exist".
3. No performance, accessibility or SEO audit tooling was run against the live site.
4. Contact numbers recorded in §3 are copied from the page and should be re-verified before launch.

---

## 3. Existing website page inventory

Legend — **Status:** *Inspected* = page fetched and read. *Nav only* = URL seen in navigation, **not opened**. **Action:** Preserve / Improve / Merge / Redesign / Redirect.

| # | URL (existing) | Title / purpose | Status | Existing functionality | Important content | Reusable components | Action → new page |
|---|---|---|---|---|---|---|---|
| 1 | `/` | Home — "Striving For ICT Excellence" | Inspected | Hero slider, notice ticker, brand strip, counters, latest items, news, footer | Brand logos, 5 slides, value props, services promises, locations | Announcement bar, brand strip, value-prop row, news card | **Redesign** → `index.html` |
| 2 | `/products` | All products | Inspected | Unpaginated product grid | 150+ products, NEW badge | Product card | **Redesign** → `products.html` (faceted) |
| 3 | `/{brand}` e.g. `/tenda` | Brand listing with category tabs | Inspected (Tenda only) | Category tabs, product grid | Brand logo, category tabs | Tab list, product card | **Redesign** → `brand.html?b=tenda` |
| 4 | `/cisco`, `/hsgq`, `/tumtec`, `/meetion`, `/must`, `/solitine`, `/ubiquiti`, `/rosenberger`, `/marsriva`, `/ip-com`, `/ewin`, `/hkc`, `/phyhome` | Other brand listings | Nav only | Assumed same template as `/tenda` (**unverified**) | — | — | **Redesign** → `brand.html?b=…` |
| 5 | `/product/{slug}` | Product detail | Inspected (AX12 Pro only) | Gallery+zoom, specs tabs, documents, compare | Specs, datasheet PDF, warranty, availability | Gallery, spec table, document row | **Redesign** → `product.html?id=…` |
| 6 | `/network-configurator` | Network Solution Configurator (demo) | Inspected | Stepper → recommended list → topology → quote → PDF | Project profile, equipment table | Stepper, qty control, summary table | **Preserve & improve** → `configurator.html` |
| 7 | `/firmware` | Firmware categories | Inspected | 6 category tiles | Router, ONU, Outdoor, Security & Camera, Switch, Access Point | Tile grid | **Merge** → `downloads.html` |
| 8 | `/firmware-download/{1..6}` | Firmware list per category | Nav only (links seen) | Unknown | — | — | **Merge** → `downloads.html?cat=` |
| 9 | `/news`, `/news/{slug}` | News & buying guides | Nav only (3 items seen on home) | Unknown | 3 Aug 2026 guides (ONU, OLT, Media Converter) | News card | **Improve** → `news.html`, `article.html` |
| 10 | `/photo-gallery`, `/video-gallery` | Galleries | Nav only | Unknown | — | — | **Merge** → `media.html` (tabs) |
| 11 | `/video-tutorials` | Setup video tutorials | Nav only | Unknown | — | Video card | **Improve** → `tutorials.html` |
| 12 | `/query-form` | Query form | Nav only | Unknown | — | Form | **Merge** → `contact.html` + quote form |
| 13 | `/about-us` | About | Nav only | Unknown | Mission/vision/goals text seen on home | — | **Redesign** → `about.html` |
| 14 | `/message-from-proprietor`, `/our-team`, `/about-awards`, `/brochure` | Company sub-pages | Nav only | Unknown | — | — | **Merge** → sections of `about.html`; brochure → download button |
| 15 | `/careers` | Careers | Nav only | Unknown | — | — | **Preserve** → `careers.html` (simple) |
| 16 | `/contact-us` | Contact | Nav only | Unknown | Numbers/emails seen in header drawer | Contact cards | **Redesign** → `contact.html` |
| 17 | `/our-branches` | Branches | Nav only | Unknown | 8 locations seen in footer | Location card | **Redesign** → `branches.html` |
| 18 | `/our-shop` (labelled "Our Partners" and "Our Shop") | Partners/shops | Nav only | Unknown | — | — | **Merge** → `branches.html#partners` |
| 19 | `/support-center` | Support centers | Nav only | Unknown | New centers: Kushtia, Sylhet, Comilla, Rajshahi (notice) | Location card | **Merge** → `support.html` |
| 20 | Facebook / YouTube | Social | External | — | — | — | Preserve links |
| — | `sitemap.xml`, `robots.txt` | — | **Not retrieved** | — | — | — | Verify in discovery (§18 Q13) |

**No page for**: customer login/register, cart, checkout, wishlist, dealer program, FAQ, warranty policy, return policy, shipping policy, privacy, terms were **observed**. They are **new** in this redesign; policy text must come from the client (§18 Q9).

---

## 4. Recommended sitemap

### 4.1 Information architecture (new)

```
HOME  (index.html)
├── SHOP
│   ├── All products ............ products.html
│   ├── Category landing ........ category.html?c={slug}
│   │     1 Routers & Wi-Fi        (routers-wifi)
│   │     2 Switches & PoE         (switches)
│   │     3 Fiber, PON & ONU       (fiber-pon)
│   │     4 Access Points & Outdoor(wireless-outdoor)
│   │     5 CCTV & Security        (security-cctv)
│   │     6 Power & Backup (UPS, inverters, batteries)  (power-backup)
│   │     7 Cabling & Racks        (cabling-racks)
│   │     8 Fiber Tools            (fiber-tools)
│   │     9 Peripherals & Audio    (peripherals-audio)
│   │    10 Computer Accessories   (computer-accessories)
│   ├── Brand listing ........... brand.html?b={slug}
│   ├── Search results .......... products.html?q={term}
│   ├── Product detail .......... product.html?id={id}
│   ├── Compare ................. compare.html
│   ├── Wishlist ................ wishlist.html
│   ├── Cart .................... cart.html
│   ├── Checkout ................ checkout.html
│   └── Order confirmation ...... order-confirmation.html?o={id}
├── SOLUTIONS
│   ├── Network Solution Configurator ... configurator.html
│   └── Request a quote ................. quote.html
├── CUSTOMER ACCOUNT
│   ├── Login ................... login.html
│   ├── Register ................ register.html
│   ├── Forgot password ......... forgot-password.html
│   └── account/
│        index.html (dashboard) · orders.html · order-detail.html?o= · addresses.html · settings.html
├── DEALERS
│   └── dealer/
│        index.html (program landing) · register.html · status.html · login.html
│        dashboard.html · pricing.html · bulk-order.html · orders.html · order-detail.html?o=
│        settings.html · support.html
├── SUPPORT & RESOURCES
│   ├── Support center .......... support.html
│   ├── FAQ ..................... faq.html
│   ├── Downloads & firmware .... downloads.html
│   ├── Setup tutorials ......... tutorials.html
│   ├── Warranty ................ warranty.html
│   ├── Returns & refunds ....... returns.html
│   └── Shipping & delivery ..... shipping.html
├── LEARN
│   ├── News & buying guides .... news.html
│   ├── Article ................. article.html?id=
│   └── Media gallery ........... media.html
├── COMPANY
│   ├── About ................... about.html   (story, proprietor message, team, awards, brochure)
│   ├── Contact ................. contact.html
│   ├── Branches & partners ..... branches.html
│   └── Careers ................. careers.html
└── LEGAL & SYSTEM
    ├── Privacy ................. privacy.html
    ├── Terms ................... terms.html
    └── Error / 404 ............. 404.html
```

**Total unique templates: 48** (some, like `category.html`, serve 10 categories). The list is exhaustive for the prototype: no other page may be linked.

### 4.2 Header navigation (desktop)
Primary: **Shop** (mega-menu: 10 categories + featured brands) · **Brands** · **Solutions** (Configurator, Request quote) · **Dealers** · **Support** (Support center, Downloads, Tutorials, Warranty, FAQ) · **Learn** · **About**.
Utility: Search · Compare (count) · Wishlist (count) · Account · Cart (count) · "Become a dealer".

### 4.3 Redirect / consolidation recommendations (for the eventual production site)
| Old | New | Reason |
|---|---|---|
| `/our-shop`, `/our-branches`, `/support-center` | `/branches/`, `/support/` | Remove duplicates (P8) |
| `/photo-gallery`, `/video-gallery` | `/media/` | Merge |
| `/message-from-proprietor`, `/our-team`, `/about-awards`, `/brochure` | `/about/#section` | Merge |
| `/firmware`, `/firmware-download/{n}` | `/downloads/?cat=` | Merge |
| `/query-form` | `/contact/` and `/quote/` | Split by intent |
| Old `/product/{slug}` | Keep same slugs under new templates | Preserve SEO equity |

---

## 5. User personas and user journeys

Personas are **hypotheses derived from the live site's own audience statement (ISPs, enterprises, schools, home users, resellers)** and must be validated by client interviews (§18 Q14). No quotes or statistics are attributed to them.

### 5.1 Personas
| ID | Persona | Type | Context | Goals | Pain points addressed |
|---|---|---|---|---|---|
| C1 | **Home / SOHO buyer** (e.g., needs a Wi-Fi 6 router or mesh kit) | Retail | Mobile-first, compares 2–3 models, price-sensitive | Know which model fits, see warranty, buy or find the nearest showroom | Too many near-identical models; no price/availability |
| C2 | **Small-business / office IT** | Retail/business | Needs switches, APs, cabling, UPS for a fit-out | Build a list, get a quote, download datasheets | No project tooling beyond configurator |
| C3 | **Installer / CCTV integrator** | Retail → dealer | Buys NVR + cameras + PoE switch bundles repeatedly | Fast reorder, compatibility info | No bulk path |
| D1 | **Reseller / shop owner** | Dealer | Orders many SKUs weekly | Dealer pricing, MOQ clarity, order history, quick bulk entry | Phone-and-WhatsApp ordering |
| D2 | **ISP procurement** | Dealer / enterprise | Buys OLTs, ONUs, SFP modules, fiber tools in volume | Spec accuracy, datasheets, quotation, technical contact | No volume/quotation flow |
| S1 | **SBC sales staff (internal)** | Internal | Presents the demo to prospects/management | Reliable, polished demo with simulated states | — |

### 5.2 Journey template
Every journey below lists: **Goal → Entry → Required info → Actions → System response → Validation/errors → Success → Next step.** Full flows for checkout and dealer are in §11.

### 5.3 Journey J1 — Customer purchase (C1)
| Step | Detail |
|---|---|
| Goal | Buy a Wi-Fi 6 router |
| Entry | Homepage "Routers & Wi-Fi" tile, or search "AX3000" |
| Required info | None until checkout |
| Actions | Home → Category (Routers) → apply filters (Wi-Fi 6, ≥ 1 Gbps ports) → open PDP → pick quantity → Add to cart → Cart → Checkout (guest) → Place order |
| System response | Toast "Added to cart", header count increments, mini-cart drawer opens; checkout validates inline; confirmation shows **demo order number** |
| Errors | Out of stock: Add disabled, "Notify me" replaces CTA; invalid phone/address: field-level message |
| Success | Order confirmation page with summary + "Simulated order" notice |
| Next | Track order (if account created), continue shopping, download datasheet |

### 5.4 Journey J2 — Project quote (C2)
Home → Configurator → project type "Office" → 25 devices → requirements (PoE, outdoor) → recommended list → adjust qty → summary + topology → "Request quotation" → contact form → confirmation with reference "QR-DEMO-…". Error: missing required contact field → inline. Success: downloadable proposal (simulated PDF = print-friendly page).

### 5.5 Journey J3 — Dealer application (D1)
Dealer landing → Register (5-step form) → upload documents (UI only) → review → submit → confirmation (ref **DA-DEMO-…**) → status page **Pending** → (simulated) **Approved** or **Rejected / More info needed** → Dealer login → Dealer dashboard. Detailed in §11.2.

### 5.6 Journey J4 — Dealer bulk order (D1, D2)
Dealer login → Bulk order → paste/enter SKU + qty rows or upload CSV (UI-simulated parse) → validations (MOQ, pack size, stock) → cart or "Submit order request" → confirmation → Dealer order history → order detail.

### 5.7 Journey J5 — Support lookup (C1, C2)
Header Support → Downloads → choose category (Router) → search model → download firmware/datasheet; or Warranty page → "Check warranty process" → contact options.

### 5.8 Journey J6 — Find a showroom
Header "Branches" → map-less card list (prototype) filtered by city → tap-to-call / copy address.

---

## 6. Homepage wireframe specification (`index.html`)

**Primary user:** C1/C2 first, D1 second. **Business purpose:** establish trust in under 5 seconds, route users to a category, a brand, the configurator, or the dealer program. **Main goal:** get the visitor to a product listing or a quote within two clicks.

### 6.1 Section order (top to bottom) — 12 sections, no more

| # | Section | Purpose | Content | Layout | Primary CTA | Notes |
|---|---|---|---|---|---|---|
| H0 | **Announcement bar** (40 px) | Surface one live message | Support-center expansion notice (Kushtia, Sylhet, Comilla, Rajshahi — taken from the live site; English text, Bangla-ready) | Single line, centered, dismissible (session) | "View support centers" → `support.html` | Rotates max 3 messages, pause on hover/focus, no auto-rotate if `prefers-reduced-motion` |
| H1 | **Header** (sticky, 72 px; 56 px mobile) | Navigation + search + commerce | Logo · Shop mega-menu · Brands · Solutions · Dealers · Support · Learn · About · search field (center, 40% width) · Compare · Wishlist · Account · Cart | 3 zones: logo / nav+search / utilities | Search · Cart | Becomes 2-row on tablet; hamburger below 1024 px |
| H2 | **Hero** (min 520 px desktop) | State the commercial promise | H1: "Networking, power and connectivity — supplied by Bangladesh's specialist distributor since 1999" (claim requires client sign-off, §2.4). Sub: "Authorized brands, datasheets on every product, nationwide delivery." Two CTAs. Right side: **one** product-cluster image of a hero brand (Tenda router + switch) on a light-gray panel | 12-col grid: 6 text / 6 image (stacked on mobile, image first at 16:10) | **Primary:** "Shop products" → `products.html`. **Secondary:** "Plan your network" → `configurator.html` | **Single static hero** (no carousel). Carousels hide content and hurt mobile performance. A 3-tile "campaign strip" under the hero replaces slides (H3) |
| H3 | **Campaign strip** | Promotions without slider | 3 equal tiles: (a) hero brand **Tenda** Wi-Fi 6/7 range, (b) **Power backup** (UPS & solar), (c) **Fiber & ONU** buying guide. Demo copy only; no discounts claimed | 3-col grid, 16:7 tiles; stack on mobile | Tile click → relevant listing | Tiles are plain links, not buttons |
| H4 | **Shop by category** | Fastest route into the catalogue | 10 category tiles (icon + name + product count computed from data) | 5×2 grid desktop; 2-col mobile; compact, 96 px tall, not cards with big images | Tile → `category.html?c=` | Count is computed; no hard-coded number |
| H5 | **Featured products** | Show real commercial range | 8 cards, tabs: *Best sellers* (demo flag) · *New arrivals* · *Recommended* | 4-col grid; horizontal scroll-snap on mobile | "View all" → `products.html?sort=new` | Tabs switch data client-side; "Best seller" is **demo data** |
| H6 | **Configurator promo** | Differentiator: SBC already has a quote tool | Short 3-step diagram: Describe project → Get equipment list → Request quote | Full-width band, navy background | "Build your network plan" → `configurator.html` | Preserves existing live capability |
| H7 | **Brands** | Brand discovery (master brand + hero brands) | Hero brands **South Bangla / Tenda / Mission** shown larger (row 1); remaining brands as logo grid (row 2) | Row 1: 3 tiles; row 2: 6-col logo grid, grayscale → color on hover | Logo → `brand.html?b=` | Logo files placeholder if not supplied; text wordmark fallback |
| H8 | **Why buy from SBC** | Trust | 4 items: Authorized distribution · Datasheets & firmware support · Warranty handling · Nationwide delivery. Each states only what the live site already claims | 4-col; icon + 2 lines | "Warranty information" → `warranty.html` | No counters, no percentage bars |
| H9 | **Dealer program band** | Second audience | "Reselling networking gear? Apply for a dealer account." Three benefits marked *Proposed*: dealer pricing, bulk ordering, order history | Split: copy left, illustration (CSS shapes) right | **Primary:** "Become a dealer" → `dealer/index.html`. **Secondary:** "Dealer login" | Benefits are **proposed**, not confirmed (§18 Q5) |
| H10 | **Buying guides & news** | SEO + education | 3 latest items (ONU, OLT, Media Converter guides from live site) | 3 cards: image, date, title, 2-line excerpt | "All guides" → `news.html` | Dates from data |
| H11 | **Showrooms & support strip** | Local trust | 3 key locations (Head Office, Uttara, Chittagong) + "View all 8 locations" + support hours (**12 hours/day** per live site, to confirm) | 3 cards + link | "Find a showroom" → `branches.html` | Phone numbers as `tel:` links |
| H12 | **Footer** | Navigation + legal | 5 columns: Shop · Solutions · Support · Company · Contact (address, phones, email, social). Bottom bar: © 2026, Privacy, Terms, **"Prototype — simulated data"** | 5-col → accordion mobile | — | Newsletter signup **omitted** (not on live site) |

### 6.2 Wireframe (desktop, 1280 container)

```
┌───────────────────────────────────────────────────────────────────────────┐
│ H0  Announcement bar (navy-900, white text)                          [×]  │
├───────────────────────────────────────────────────────────────────────────┤
│ H1  [LOGO]  Shop▾ Brands▾ Solutions▾ Dealers Support▾ Learn About         │
│              [ 🔍 Search products, models, brands…       ]  ⇄ ♡ 👤 🛒(0)  │
├───────────────────────────────────────────────────────────────────────────┤
│ H2  ┌─────────── 6 cols ───────────┐ ┌──────────── 6 cols ─────────────┐   │
│     │ Eyebrow: AUTHORIZED SINCE 1999│ │    [ product cluster image ]    │   │
│     │ H1 (2 lines)                  │ │      on #F3F5F8 panel           │   │
│     │ Sub (2 lines)                 │ │                                 │   │
│     │ [Shop products] [Plan network]│ │                                 │   │
│     └───────────────────────────────┘ └─────────────────────────────────┘   │
├───────────────────────────────────────────────────────────────────────────┤
│ H3  [ Tenda Wi-Fi 6/7 ]  [ Power & Backup ]  [ Fiber & ONU guide ]        │
├───────────────────────────────────────────────────────────────────────────┤
│ H4  Shop by category                                                       │
│     [Routers][Switches][Fiber/PON][AP/Outdoor][CCTV]                      │
│     [Power ][Cabling ][Fiber tools][Peripherals][PC acc.]                 │
├───────────────────────────────────────────────────────────────────────────┤
│ H5  Featured   [Best sellers | New arrivals | Recommended]   View all →   │
│     [card][card][card][card]  [card][card][card][card]                    │
├───────────────────────────────────────────────────────────────────────────┤
│ H6  ███ Plan your network — 3 steps ───────────── [Build your network plan]│
├───────────────────────────────────────────────────────────────────────────┤
│ H7  Hero brands: [South Bangla] [Tenda] [Mission]   Other brands: logos…  │
├───────────────────────────────────────────────────────────────────────────┤
│ H8  Why SBC:  [Authorized] [Datasheets] [Warranty] [Delivery]             │
├───────────────────────────────────────────────────────────────────────────┤
│ H9  Dealer band: copy ……………………………………… [Become a dealer] [Dealer login]  │
├───────────────────────────────────────────────────────────────────────────┤
│ H10 Guides: [card][card][card]                                            │
├───────────────────────────────────────────────────────────────────────────┤
│ H11 Showrooms: [HQ][Uttara][Chittagong]  View all locations →             │
├───────────────────────────────────────────────────────────────────────────┤
│ H12 Footer                                                                │
└───────────────────────────────────────────────────────────────────────────┘
```

### 6.3 Homepage behavior, states, acceptance
- **Hero image:** `loading="eager"`, `fetchpriority="high"`, explicit `width/height`; all later images `loading="lazy"`.
- **Search (H1):** see §10.2.
- **Loading:** H5 shows 8 skeleton cards for 400 ms simulated delay on first paint only.
- **Empty/error:** if `SBC_DATA` fails to load, H5 shows the error state "Products couldn't be loaded. Reload." with a button; rest of page remains usable.
- **Acceptance:** (1) 12 sections in the order above; (2) no carousel anywhere on the page; (3) every link resolves to a page in §4; (4) Lighthouse accessibility ≥ 95 locally; (5) no layout shift when images load (CLS < 0.1); (6) no unverified statistic displayed; (7) works at 360, 768, 1024, 1280, 1536 px.

---

## 7. Page-by-page UX/UI specifications

### 7.0 Global rules that apply to **every** page (not repeated below)

| Topic | Rule |
|---|---|
| Header/nav | Same sticky header (H1). Current section highlighted with `aria-current="page"`. On scroll down: header stays; announcement bar scrolls away. Mobile: hamburger opens full-height drawer (focus trapped, Esc closes). |
| Footer | H12 on all pages. |
| Breadcrumb | All pages except Home: `Home › Section › Page`, using `<nav aria-label="Breadcrumb"><ol>`. |
| Prototype banner | Thin 28 px strip under footer text: "Prototype with simulated data" + link "About this demo" opening the disclosure modal (§10.20). |
| Loading | Skeletons for lists/cards/tables; spinner only inside buttons. |
| Empty | Icon + one-line explanation + one clear action. |
| Error | Inline `role="alert"` message + "Try again". Never a blank page. |
| Success | Toast (`role="status"`) for minor actions; full-page success only for submissions. |
| Accessibility | Skip link first in DOM; one `<h1>` per page; visible focus ring (§8.8); form errors linked with `aria-describedby`. |
| Titles | `<title>` = `Page name | South Bangla Computers`; unique `<meta name="description">` (≤155 chars) per page. |
| Dependencies | All pages depend on: `tokens.css`, `base.css`, `components.css`, `layout.js` (header/footer), `store.js`, `data/*.js`. |

Fields per page below are abbreviated: **U**=Primary user · **P**=Purpose/goal · **S**=Section order · **L**=Layout · **C**=CTAs · **I**=Interactions · **R**=Responsive · **St**=States · **A**=Accessibility · **D**=Dependencies · **AC**=Acceptance criteria.

---

### 7.1 Shop

#### P01 — Home · `index.html`
See §6.

#### P02 — Category landing · `category.html?c={slug}`
- **U:** C1, C2. **P:** orient the buyer within one category and route to filtered listings.
- **S:** (1) Breadcrumb · (2) Title + 1-line description + product count · (3) **Sub-category chips** (e.g., Switches → Unmanaged, Managed, PoE, 2.5G/10G) · (4) **Buying guide strip** (one linked article, if any) · (5) **Top brands in category** · (6) **Popular products** (8 cards) · (7) **Spec shortcuts** ("Wi-Fi 6", "PoE+", "24-port") as filter links · (8) Link to full listing.
- **L:** Full-width title band (#F3F5F8); content in 12-col grid; chips wrap.
- **C:** Primary "View all {category}" → `products.html?c={slug}`. Secondary: chips.
- **I:** Chips and spec shortcuts link to `products.html` with pre-set filter query.
- **R:** Chips become horizontal scroll row (no wrap) below 768 px; product grid 4→3→2 cols.
- **St:** Unknown slug → redirect to `404.html`. Category with 0 products → empty state with "Browse all products".
- **A:** Chip group is a `<ul>` of links, not tabs.
- **D:** `data/categories.js`, `data/products.js`.
- **AC:** All 10 slugs render; counts equal filtered data length; invalid slug shows 404.

#### P03 — Product listing & search results · `products.html` (query: `c`, `b`, `q`, `sort`, `page`, filters)
- **U:** All. **P:** find the right product fast across 150+ items (live site has no filters — this is the highest-value redesign).
- **S:** (1) Breadcrumb · (2) Title ("All products", "Results for “q”", or category/brand name) + result count · (3) Toolbar: **Filter button (mobile)** · **Sort select** · **View toggle (grid/list)** · (4) **Active filter chips** + "Clear all" · (5) Layout: **left filter sidebar (desktop)** + results grid · (6) Pagination.
- **Filters (data-driven):** Category · Brand · Availability (In stock / Pre-order / Out of stock / Discontinued hidden by default) · Price range (shown only if price mode on) · Rating **not included** (no review data) · **Attribute facets by category** — Routers: Wi-Fi standard (Wi-Fi 5/6/7), speed class, LAN ports; Switches: ports (5/8/16/24/48), PoE (yes/no), managed (unmanaged/smart/managed), speed (100M/1G/2.5G/10G); Fiber: PON type (GPON/EPON/XPON), device (ONU/OLT/SFP module); Power: type (Online UPS/Line-interactive/Inverter/Battery), capacity; CCTV: type (NVR/Camera), resolution (MP). Attributes come from `product.attrs`.
- **L:** Desktop: 280 px sidebar + fluid grid (3 cols at 1280, 4 at ≥1536). Tablet: sidebar becomes slide-in drawer.
- **Pagination decision:** **numbered pagination, 24 per page**, URL-addressable (`?page=2`), because 150+ items and shareable links matter; "Load more" is not used (breaks back-button position and footer access).
- **C:** Card: "Add to cart" (primary), "Compare" checkbox, wishlist heart. If `quoteOnly`: "Request quote".
- **I:** Changing any filter updates the URL (`history.replaceState`) and results without page reload; filter counts update; scroll resets to top of results only on page change; sort options: Relevance, Newest, Price low→high, Price high→low, Name A–Z.
- **R:** <768 px: sidebar hidden; Filter button opens bottom sheet with "Show N results" button; list view default on mobile for spec readability.
- **St:** Loading: 12 skeleton cards. Empty: "No products match your filters" + "Clear filters" + top 4 suggestions. Error: retry. Zero search results: show spell-tolerant suggestions ("Did you mean…") using simple contains-match on model/brand.
- **A:** Sidebar is `<aside aria-label="Filters">`; each facet is `<fieldset><legend>`; results region `aria-live="polite"` announces "24 products found".
- **D:** `store.js` (compare, wishlist, cart), `filters.js`.
- **AC:** Every facet combination yields consistent counts; URL reload reproduces state; pagination works; filters keyboard-operable; 150+ items render in ≤ 100 ms after filter change (local data).

#### P04 — Brand listing · `brand.html?b={slug}`
- **U:** Brand-loyal buyers, dealers. **P:** replicate the live site's brand-first browsing (a strength) but with proper filters.
- **S:** Breadcrumb · **Brand header** (logo, 2-line description *demo*, authorized-distributor badge **only if client confirms per-brand**, datasheet/firmware links) · **Category tabs derived from the brand's products** (replaces live tab list; behaves as links, not JS-only tabs) · listing region identical to P03 (reuses component) with brand pre-set.
- **C:** "Shop {brand}" implicit; secondary "Firmware & downloads" → `downloads.html?brand=`.
- **St/AC:** Unknown brand → 404. Hero brands (South Bangla, Tenda, Mission) get a richer header (banner image slot). Mission page shows the placeholder-brand notice **in the spec only**, not on screen.
- **D:** P03 components.

#### P05 — Product detail · `product.html?id={id}`
- **U:** All. **P:** give enough information to buy or quote with confidence.
- **S:** (1) Breadcrumb (Home › Category › Brand › Model) · (2) **Top block** two columns: **Gallery** (left) / **Buy box** (right) · (3) **Sticky in-page tabs**: Overview · Specifications · Documents · Warranty & support · (4) Overview: key features list + description · (5) Specifications: grouped tables (Hardware, Wireless, Software, Others — taken from the live PDP structure) · (6) Documents: datasheet(s), firmware link · (7) Warranty & support block · (8) **Frequently bought together / compatible accessories** (demo) · (9) **Similar products** (same category, ±) · (10) Recently viewed (localStorage).
- **Buy box content (in order):** Brand link · H1 (full product name) · Model + SKU · Availability badge · **Price block** (§8.6) · Key features (4 bullets) · Quantity stepper · **Add to cart** (primary) · **Request quote** (secondary) · Wishlist · Compare · Datasheet link · "Check showroom availability" link · Warranty line ("1 Year Official Warranty" format, e.g.) · Delivery note (generic: "Nationwide delivery — terms on Shipping page").
- **Gallery:** main image + thumbnails (up to 6), click opens lightbox with zoom (arrow keys, Esc); touch swipe on mobile; each image has meaningful `alt`.
- **Availability states:** *In stock* (green), *Low stock* (amber, ≤ 5, demo), *Pre-order* (blue), *Out of stock* (gray, Add disabled, "Notify me" simulated), *Discontinued* (gray; panel "This model has been discontinued. See alternatives" with 3 similar items; no Add/Quote). **"New" badge is suppressed when discontinued** (fixes P3).
- **R:** Mobile: gallery above buy box; buy box CTA becomes a **sticky bottom bar** (price + Add to cart) after the user scrolls past the buy box.
- **St:** Unknown id → 404. Image error → local placeholder. Missing datasheet → row hidden.
- **A:** Tabs are real in-page anchors with `role="tablist"` only if content is swapped; otherwise use anchor-jump nav (recommended: anchor nav). Quantity stepper buttons have `aria-label`. Lightbox traps focus.
- **D:** `store.js`, specs schema (§12).
- **AC:** Spec tables render from `attrs`/`specs`; discontinued rule works; compare/wishlist toggles persist; sticky bar shows only < 768 px.

#### P06 — Compare · `compare.html`
- **U:** C1, C2, D2. **P:** side-by-side spec comparison (a live-site feature to preserve and improve).
- **S:** Breadcrumb · Title · "Compare up to 4 products" · **Toolbar**: "Show differences only" toggle, "Clear all" · **Comparison table** (sticky first column and sticky header row with product cards) · "Add another product" search · CTAs per product.
- **Rules:** Max **4** products; compare only same top-level category (if user adds a different category: modal "You can compare products within one category at a time. Replace current comparison?" → Replace / Cancel). Compare tray (bottom bar) mirrors the live site's "Compare Products N · Compare Now" and appears when N ≥ 1 on listing/PDP pages.
- **I:** Remove column (×); highlight rows where values differ; copy comparison link (query `?ids=a,b,c`).
- **R:** Mobile: horizontal scroll with sticky label column; max 2 visible at once.
- **St:** Empty: "Select 2–4 products to compare" + button to products. One product: allowed but shows hint to add another.
- **A:** Real `<table>` with `<th scope="row/col">`; differences also indicated by icon + text, **not color alone**.
- **AC:** Persist in localStorage; max-4 and category rules enforced; differences-only correct.

#### P07 — Wishlist · `wishlist.html`
- **S:** Title + count · grid of product cards with remove, "Move to cart", availability · empty state.
- **I:** Heart toggles everywhere; works for guests (localStorage); on login (demo) merge notice appears.
- **AC:** Count in header matches; removing updates instantly; out-of-stock items show badge and disabled "Move to cart".

#### P08 — Cart · `cart.html`
- **U:** All. **P:** review and adjust order before checkout.
- **S:** Title "Shopping cart (N items)" · **Line items table/list** (image, name, model, unit price, qty stepper, line total, remove, save for later→wishlist) · **Order summary card** (subtotal, delivery "calculated at checkout", total) · **Promo code** field (demo codes `DEMO10`; clearly labelled demo) · Trust notes (secure checkout *simulated*, warranty, support) · "Continue shopping" · **Checkout** (primary).
- **Dealer variant:** If dealer session active, unit prices show dealer price with strike-through retail, MOQ/pack warnings inline.
- **I:** Qty change recalculates instantly; min 1, max = stock or 99; typing 0 prompts remove confirmation; remove shows Undo toast (5 s).
- **R:** Summary moves below the list; sticky bottom bar with total + Checkout on mobile.
- **St:** Empty cart → "Your cart is empty" + 3 suggested categories. Price/stock changed (simulated) → inline notice on affected line.
- **A:** Qty controls labelled; live total announced via `aria-live="polite"`.
- **AC:** Totals correct to 2 decimals; BDT format `৳ 12,500`; persisted across pages and reload; Undo works.

#### P09 — Checkout · `checkout.html`
- **U:** All; guest allowed for retail, login required for dealer pricing.
- **S (single page, 3 collapsible steps):** (1) **Contact** (email *or* phone required, full name) with "Have an account? Log in" · (2) **Delivery** (name, phone, division/district/area, address, landmark, **delivery method**: Home delivery / Showroom pickup [select showroom]) · (3) **Payment** (*proposed* options, §11.1: Cash on delivery · Bank transfer · Mobile wallet · Card) · Right column: **Order summary** (sticky) · Terms checkbox · **Place order (simulated)**.
- **Validation:** BD mobile `01XXXXXXXXX` (11 digits, starts 013–019); email format; required fields; district list from static data; errors shown on blur and on submit, focus moves to first error; summary at top (`role="alert"`) listing errors.
- **St:** Processing 1.2 s simulated spinner on button; simulated failure path via demo control ("Simulate payment failure") returns inline error and keeps data. Cart empty → redirect to `cart.html`.
- **Delivery charge:** demo rule: Dhaka ৳ 120, outside ৳ 200, showroom pickup ৳ 0 (**demo values; business decision, §18 Q8**).
- **A:** Radio groups as `<fieldset>`; payment details panels toggle with `aria-expanded`.
- **AC:** Cannot submit invalid; successful submit creates `orders` record in localStorage and routes to P10; guest orders offered an "Create account" prompt after confirmation.

#### P10 — Order confirmation · `order-confirmation.html?o={id}`
- **S:** Success icon + "Order placed (simulated)" · Order number (`SBC-DEMO-000123`) · Summary (items, totals, address, payment method) · "What happens next" (3 steps, generic) · Actions: "Track order" (if account), "Continue shopping", "Print".
- **St:** Unknown order → friendly not-found. Refresh safe (reads localStorage).
- **AC:** Shows the exact data entered; includes the simulation disclaimer above the fold.

---

### 7.2 Solutions

#### P11 — Network Solution Configurator · `configurator.html`
- **U:** C2, C3, D2. **P:** preserve and polish the live tool (live version is marked demo).
- **S:** Stepper (4 steps): **1 Project** (type: Home / Office / School / Hotel / Factory / ISP / CCTV project; users/devices count; coverage area sq ft optional; requirements checkboxes: PoE, outdoor, fiber uplink, UPS, CCTV) → **2 Recommendations** (editable list with qty steppers, "Swap" opens alternatives drawer) → **3 Summary** (equipment table + simple topology diagram built with inline SVG: Internet → Router → Switch → APs/Cameras) → **4 Quote request** (contact form; optional) with "Add all to cart" and "Download proposal".
- **Rules (demo):** recommendation engine = static rules in `data/configurator-rules.js` mapping project type + device count to SKUs. **Prices are never shown in the proposal**, mirroring the live tool.
- **I:** Back/Next preserve state; progress saved in sessionStorage; "Download proposal" opens print-styled page (simulated PDF).
- **St:** No recommendation possible → "Contact an engineer" with phone/quote link.
- **AC:** All four steps functional; adding to cart from step 3 works; proposal print stylesheet hides nav.

#### P12 — Request a quote · `quote.html`
- **P:** one form for project/bulk quote when not using the configurator or cart.
- **S:** Intro · Form (name, company, phone, email, customer type [Retail/Business/ISP/Dealer], products of interest (multi-line + "add from my cart"), delivery district, message) · side card: sales numbers.
- **Validation:** required: name, phone, one of (email), message ≥ 10 chars. **Success:** page state with reference `QR-DEMO-…`, "We'll respond within 1 business day" **→ replace with confirmed SLA (§18 Q11)**.

---

### 7.3 Customer account

#### P13 — Login · `login.html` · P14 — Register · `register.html` · P15 — Forgot password · `forgot-password.html`
- **Login S:** Title · email/phone + password (show/hide) · "Remember me" · Login · "Forgot password?" · divider · "Create account" · "Dealer? Use dealer login" (→ `dealer/login.html`). Demo credentials card: `customer@demo.sbc / Demo@1234` (clearly labelled).
- **Register S:** full name, email, mobile, password (strength meter + rules), confirm, terms checkbox. Success: toast + redirect to `account/index.html`.
- **Forgot S:** email → success message that is identical whether or not email exists (security pattern) + "Simulated: no email is sent".
- **Validation:** same rules as §10.9. Lockout simulated after 5 failed attempts (30 s countdown) to show the state.
- **AC:** session stored in localStorage `sbc.session`; header Account menu changes (name, Orders, Logout).

#### P16 — Customer dashboard · `account/index.html`
- **S:** Greeting · quick cards (Orders, Addresses, Wishlist count, Quote requests) · **Recent orders** (3) · Recommended products. Sidebar nav on desktop (Dashboard, Orders, Addresses, Settings, Logout). Auth guard → redirect to `login.html?next=`.

#### P17 — Order history · `account/orders.html` · P18 — Order detail & tracking · `account/order-detail.html?o=`
- **History S:** filter by status (All / Processing / Shipped / Delivered / Cancelled), date range, table (order #, date, total, status, "View"). Mobile: cards.
- **Detail S:** status timeline (Placed → Confirmed → Packed → Shipped → Delivered; **simulated**, advances via "Demo: advance status" control), items, address, payment, totals, "Reorder" (adds to cart), "Download invoice" (print view), "Need help?" link.
- **St:** No orders: empty state with CTA. Cancelled shows reason.

#### P19 — Addresses · `account/addresses.html` · P20 — Account settings · `account/settings.html`
- **Addresses:** list of cards, default badge, add/edit modal (same fields as checkout), delete confirmation.
- **Settings:** Profile (name, phone, email), Change password, Notification preferences (checkbox demo), **Delete account (simulated)**.

---

### 7.4 Dealer program (separate layout accent: navy top bar "Dealer portal")

#### P21 — Dealer landing · `dealer/index.html`
- **U:** D1, D2. **P:** explain the program, set expectations, drive applications.
- **S:** (1) Hero: "SBC Dealer Program" + 2 CTAs ("Apply now", "Dealer login") · (2) **Benefits** (all labelled *Proposed — pending client approval*): dealer pricing, bulk ordering, order history & reorder, dedicated support contact · (3) **Who can apply** (reseller, system integrator, ISP, corporate buyer) · (4) **How it works** (4 steps: Apply → Submit documents → Review → Start ordering) · (5) **Documents you'll need** (list: trade license, TIN, NID of proprietor, business address proof — *proposed*) · (6) **Brands available** (logo strip) · (7) FAQ (6 items) · (8) Contact dealer desk (sales numbers).
- **Rules:** no claim about number of dealers beyond "as stated by SBC: 400+ resellers" **only if client approves**.
- **AC:** All benefit items visibly tagged "Proposed"; both CTAs present above the fold on desktop.

#### P22 — Dealer registration · `dealer/register.html`
- **S:** 5-step form with progress bar and **autosave to localStorage** (draft banner on return): **1 Account** (contact name, email, mobile, password) · **2 Business** (business name, type, trade license no., TIN/BIN, years in business, address, district, website optional) · **3 Contact persons** (owner, purchasing, technical — at least owner) · **4 Documents** (UI-only upload: trade license, TIN certificate, NID, shop photo; PDF/JPG/PNG, ≤ 5 MB each; list shows filename, size, remove) · **5 Review & submit** (read-only summary with Edit links, terms checkbox).
- **Validation:** per step; cannot advance until valid; file type/size errors inline; Trade license 4–20 alphanumerics (demo rule); TIN 12 digits (demo rule); mobile as §10.9.
- **I:** Back keeps data; leaving with unsaved edits prompts `beforeunload` only if dirty.
- **Success:** `dealer/status.html?ref=DA-DEMO-xxxx` with "Application submitted (simulated)".
- **AC:** Files are **not** stored; only metadata (name/size). Draft cleared on submit.

#### P23 — Application status · `dealer/status.html?ref=`
- **States (demo-controlled):** **Submitted → Under review → Approved** · **Needs more information** (lists requested items, "Update application") · **Rejected** (generic reason, reapply CTA after 30 days — *proposed*).
- **S:** Timeline · current-status card · what happens next · contact dealer desk · **Demo control panel** (outlined box, "Simulate: Approved / Rejected / More info") visible only when `DEMO_MODE=true`.
- **AC:** Approving sets `sbc.dealerStatus = "approved"` and unlocks dealer login credentials card; rejection and more-info states render distinct UI.

#### P24 — Dealer login · `dealer/login.html`
- **S:** business email + password · forgot password (reuses P15 style) · "Not a dealer? Apply" · state messages: *Pending* (cannot log in: "Your application is under review"), *Rejected*, *Approved* (success). Demo credentials: `dealer@demo.sbc / Dealer@1234`.

#### P25 — Dealer dashboard · `dealer/dashboard.html`
- **S:** Welcome + account manager card (demo name/phone) · KPI cards (Open orders, Orders this month, Credit/limit **not shown** — business decision) · Quick actions (Bulk order, Reorder last, Price list) · Recent orders table · Announcements (demo) · Support contact.
- **AC:** Auth guard requires approved dealer session; layout uses dealer sidebar.

#### P26 — Dealer pricing · `dealer/pricing.html`
- **S:** Search + category filter · table: SKU, product, **Retail price (demo)**, **Dealer price (demo)**, MOQ, Pack size, Availability, qty input + "Add". "Download price list (CSV, simulated)".
- **Rules (demo only; real values are a business decision — §18 Q5/Q6):** dealer price = retail × 0.88 rounded; tier example: 10+ units 2% extra (shown as *Proposed*).
- **AC:** Prices visible **only** to approved dealer sessions; guests/customers never see dealer values.

#### P27 — Bulk order · `dealer/bulk-order.html`
- **S:** Three input methods in tabs: **Quick add rows** (SKU/model autocomplete + qty, add up to 50 rows) · **Paste list** (textarea: `MODEL, QTY` per line → "Parse") · **CSV upload (UI-simulated)** (reads file client-side with `FileReader`, parses same format) · **Validation table** (row status: OK / Unknown SKU / Below MOQ / Not pack multiple / Out of stock / Discontinued) · Totals card · "Add valid rows to cart" · "Submit order request".
- **Rules (demo):** MOQ per SKU from data; pack-size multiples; errors never silently corrected — user must fix or remove.
- **AC:** Parser handles whitespace, tab/comma, duplicate models (sums, warns); max 200 rows.

#### P28 — Dealer orders · `dealer/orders.html` · P29 — Dealer order detail · `dealer/order-detail.html?o=`
- Like P17/P18 plus: PO number column, export CSV (simulated), "Reorder", dealer price shown on lines, invoice view, delivery status, "Contact account manager".

#### P30 — Business settings · `dealer/settings.html` · P31 — Dealer support · `dealer/support.html`
- **Settings tabs:** Business profile (read-only after approval; "Request change" form), Contacts (add/remove), Delivery addresses, Users (demo only, add sub-user), Password.
- **Support:** dealer desk contacts (from sales numbers), ticket form (subject, order #, message → success ref `DT-DEMO-…`), FAQ links.

---

### 7.5 Support, learn, company, legal

#### P32 — Support center · `support.html`
- **S:** Title · three support paths (Call, Email, Visit) with team numbers from live site (Support ×3, Sales ×2, Marketing ×1) · **Support centers list** (Head Office support center + the four new centers named in the live notice: Kushtia, Sylhet, Comilla, Rajshahi — **addresses unknown, show "Details coming soon"**) · quick links (Downloads, Warranty, FAQ, Tutorials) · query form (reuses P12 fields, "type: Support").

#### P33 — FAQ · `faq.html`
- Accordion grouped (Ordering · Delivery · Warranty · Dealer · Account). Search within FAQ. **Answers are placeholders**: each must carry the tag "Draft — confirm with SBC".

#### P34 — Downloads & firmware · `downloads.html?cat=&brand=&q=`
- **S:** Category tiles (Router, ONU, Outdoor, Security & Camera, Switch, Access Point — **existing live structure**) · search by model · result table (model, brand, file type, version, size, date, Download) · empty state.
- **Data:** demo entries only; no real firmware links. Download button triggers a simulated toast "Demo — no file attached".

#### P35 — Tutorials · `tutorials.html` · P36 — Media gallery · `media.html`
- **Tutorials:** grid of video cards (title, product, duration); clicking opens modal with **lazy-loaded YouTube embed via `youtube-nocookie.com`** (only after click). Demo uses the one YouTube video URL seen on the live site; others are placeholders.
- **Media:** tabs Photos / Videos; masonry-less uniform grid; lightbox.

#### P37 — Warranty · `warranty.html` · P38 — Returns & refunds · `returns.html` · P39 — Shipping & delivery · `shipping.html`
- Structured long-form template: summary box ("At a glance"), numbered sections, last-updated date, contact box. **All policy terms are placeholders** except facts on the live site (e.g., "1 Year Official Warranty" appears on one product; "1-hour warranty decision" is a stated service promise). Each page has a visible **"Draft policy — pending SBC confirmation"** tag.

#### P40 — News · `news.html` · P41 — Article · `article.html?id=`
- **News S:** title · category chips (Buying guide, News, Product) · featured article · grid with pagination (9/page). **Article S:** breadcrumb, title, date, author "SBC Editorial", hero image, body (headings H2/H3), table of contents (auto, sticky on desktop), related products (3), related articles (3), share (copy link). Seed with the three guide titles seen on live site (ONU, OLT, Media Converter, dated 3 Aug 2026); body text is **placeholder lorem-free summary written for demo**.

#### P42 — About · `about.html`
- **S:** Intro (founded 1999 per live site) · Mission / Vision / Goals (text from live homepage, lightly edited) · **Proprietor message** (placeholder; real text from client) · Team (placeholder cards, no fake names — use roles only) · Awards (**empty state "Content coming soon" unless client supplies**) · Brochure download (button, simulated) · CSR (one paragraph as stated on live site) · CTA to contact.

#### P43 — Contact · `contact.html` · P44 — Branches & partners · `branches.html` · P45 — Careers · `careers.html`
- **Contact S:** contact cards (Support, Sales, Marketing numbers; email; head-office address) · form · hours (**to confirm**).
- **Branches S:** filter by city (Dhaka, Chattogram, Khulna) · cards for the 8 locations seen in the live footer (name, address, phones with `tel:` links, "Copy address") · "Partners" section placeholder (the live `/our-shop` content was **not** inspected).
- **Careers S:** short intro · "No open positions" empty state with email CTA (live page not inspected).

#### P46 — Privacy · `privacy.html` · P47 — Terms · `terms.html` · P48 — Error / 404 · `404.html`
- Policy template as P37–39 (placeholder, flagged). **404:** friendly message, search box, links to categories, home.

### 7.6 Spec completeness check
All 48 templates in §4 have a specification: P01–P48 (P48 is the 404 system page). Where the 17-field list in the brief is abbreviated above, the **global rules in §7.0** supply the missing fields (header, footer, titles, states, accessibility, dependencies); page-specific differences are explicit.

---

## 8. Design system and design tokens

All values are **CSS custom properties** declared once in `css/tokens.css`. No component may hard-code a color, size or shadow.

### 8.1 Color palette
| Token | HEX | Use |
|---|---|---|
| `--navy-900` | `#0B1F3A` | Announcement bar, footer, dark bands, headings on light |
| `--navy-800` | `#102A4C` | Dealer portal top bar, hover on navy surfaces |
| `--blue-600` | `#1558D6` | Primary actions, links, focus ring |
| `--blue-700` | `#1048B0` | Primary hover / pressed |
| `--blue-50` | `#EAF1FD` | Selected/active backgrounds, info panels |
| `--green-700` | `#0B7A52` | In stock, success (also echoes the logo's green; **sample the exact green from the supplied logo file** and update this token if different) |
| `--green-50` | `#E6F4EE` | Success background |
| `--amber-800` | `#92400E` | Low stock / warning text |
| `--amber-50` | `#FEF3C7` | Warning background |
| `--red-700` | `#C62828` | Errors, destructive, out-of-stock text |
| `--red-50` | `#FDECEC` | Error background |
| `--gray-900` | `#111827` | Body text |
| `--gray-700` | `#3A4452` | Secondary text |
| `--gray-500` | `#6B7685` | Tertiary text, placeholders (≥ 4.5:1 on white) |
| `--gray-300` | `#CBD2DC` | Input borders |
| `--gray-200` | `#E3E7ED` | Dividers, card borders |
| `--gray-100` | `#F3F5F8` | Section background, image panels |
| `--gray-50` | `#F7F8FA` | Page background alt |
| `--white` | `#FFFFFF` | Surfaces |

**Contrast rules:** body text ≥ 4.5:1, large text/UI ≥ 3:1. Approximate computed ratios on white: blue-600 ≈ 6.2:1, green-700 ≈ 5.3:1, red-700 ≈ 5.6:1, gray-500 ≈ 4.6:1. QA must re-verify with a contrast checker (§17). Status is never conveyed by color alone (always icon + text).
**One accent rule:** blue is the only accent for actions. Green/amber/red are reserved for status.

### 8.2 Typography
- **Font stack:** `"Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial, sans-serif`. Bangla-ready fallback appended later: `"Noto Sans Bengali", "Hind Siliguri"` (§13.9). Self-host Inter (woff2, weights 400/500/600/700; `font-display: swap`); the prototype may use system fonts if the file is unavailable.
- **Scale (rem, 16 px base):**
| Token | Size / line-height | Weight | Use |
|---|---|---|---|
| `--fs-display` | 3rem / 1.1 (2.25rem mobile) | 700 | Hero H1 only |
| `--fs-h1` | 2.25rem / 1.2 (1.75rem mobile) | 700 | Page titles |
| `--fs-h2` | 1.75rem / 1.25 (1.375rem mobile) | 600 | Section titles |
| `--fs-h3` | 1.25rem / 1.3 | 600 | Card/group titles |
| `--fs-h4` | 1.0625rem / 1.4 | 600 | Sub-headings |
| `--fs-body` | 1rem / 1.6 | 400 | Body |
| `--fs-sm` | 0.875rem / 1.5 | 400/500 | Meta, table cells, labels |
| `--fs-xs` | 0.75rem / 1.4 | 500 | Badges, captions (never below 12 px) |
- Numerals in prices and spec tables use `font-variant-numeric: tabular-nums`.
- Max line length for prose: 72ch.

### 8.3 Spacing, containers, breakpoints, grid
- **Spacing scale (4-pt):** `--sp-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 20 · `-6` 24 · `-8` 32 · `-10` 40 · `-12` 48 · `-16` 64 · `-20` 80. Section vertical padding: 64 px desktop / 40 px mobile.
- **Containers:** `--container` 1280 px max, gutters 24 px (16 px < 768). Reading container for prose/legal: 760 px.
- **Breakpoints (min-width, mobile-first):** `sm` 480 · `md` 768 · `lg` 1024 · `xl` 1280 · `2xl` 1536. Design targets: 360, 768, 1024, 1280, 1536.
- **Grid:** 12 columns, gap 24 px (16 px on mobile). Product grids: 2 cols (<768) → 3 (≥768) → 3 or 4 (≥1024 depending on sidebar) → 4 (≥1536).
- **Radius:** `--r-sm` 4 px (badges), `--r-md` 6 px (inputs/buttons), `--r-lg` 8 px (cards, modals). **No radius above 8 px** except pills for chips (999 px). Avoids "bubbly" look.

### 8.4 Buttons
| Variant | Style | Use |
|---|---|---|
| Primary | blue-600 bg, white text, 44 px height (36 px "sm") | One per view region |
| Secondary | white bg, 1 px blue-600 border, blue-600 text | Alternative action |
| Tertiary / text | no bg, blue-600 text, underline on hover | Low-emphasis |
| Danger | red-700 bg | Destructive confirmations only |
| On-dark | white bg, navy text | On navy bands |
| Icon-only | 40 × 40, `aria-label` required | Wishlist, close |

**States:** hover (blue-700), active (translateY(1px), blue-700), focus-visible (§8.8), disabled (gray-200 bg, gray-500 text, `cursor:not-allowed`, `aria-disabled`), loading (spinner replaces label, width locked, `aria-busy`). Minimum touch target 44 × 44 px.

### 8.5 Forms
- Label above input (always visible; placeholders are hints only). Required fields marked "(required)" in text, not just an asterisk.
- Input: 44 px tall, 1 px gray-300 border, radius 6, focus: 2 px blue-600 ring. Error: red-700 border + icon + message below (`id` linked via `aria-describedby`, `aria-invalid="true"`). Success state shown only for password strength and availability checks.
- Select: native `<select>` styled; no custom dropdown libraries. Checkbox/radio: native input restyled with `accent-color`, 20 px, label click area ≥ 44 px.
- Messages are written in plain language: "Enter an 11-digit mobile number starting with 01", not "Invalid input".
- Group long forms with `<fieldset><legend>`.

### 8.6 Price, discount, badges, stock
**Price block (retail):**
```
৳ 12,500            ← --fs-h2, 700, gray-900
৳ 14,000  −11%      ← strikethrough gray-500 + green badge (only when a discount exists)
Inclusive of VAT*   ← *wording is a business decision (§18 Q7)
```
- Currency: `৳` + Western digits with thousands separators in Bangladesh grouping (lakh: `৳ 1,25,000`). Implement `formatBDT(n)` with a small manual lakh-grouping function (last 3 digits, then groups of 2); do not rely on `Intl` locale support.
- **Demo watermark:** while `DEMO_PRICING=true`, a small "Demo price" tag (gray outline badge) sits next to every price.
- **Quote-only product:** replaces price with "Price on request" + "Request quote" button.
- **Dealer price block (approved dealers only):** dealer price large, retail price struck-through, "MOQ n" and "Pack of n" chips.
- **Discount rule:** show % only if ≥ 5% and the original price is real; no fake "was" prices.

**Badges** (12 px, 600, radius 4, icon + text): `New` (blue-50/blue-700, suppressed for discontinued), `Best seller` (demo), `Discount −n%` (green), `Low stock` (amber), `Out of stock` (gray-200/gray-700), `Discontinued` (gray-200/gray-700), `Pre-order` (blue-50/blue-700), `Dealer price` (navy-900/white). **Max 2 badges on a card.**

**Stock indicator:** dot + text: ● In stock (green) · ● Low stock — only N left (amber; threshold ≤ 5, demo) · ● Out of stock (gray) · ● Pre-order — ships in N days (blue). Inventory numbers are demo and never claimed as live.

### 8.7 Navigation patterns and overlays
- **Header:** described in §6 H1. **Mega-menu:** opens on hover-intent (120 ms) and on click/Enter; two columns (10 categories left, featured brands/links right); Esc closes; arrow keys move between items; `aria-expanded`, `aria-controls`.
- **Mobile drawer:** slides from left (240 ms), focus-trapped, overlay 40% navy; accordion for Shop/Support groups.
- **Breadcrumbs, pagination (numbered, with prev/next, current `aria-current`), tabs/anchor nav, stepper** (dealer registration, configurator, checkout) — each a shared component.
- **Modal:** centered, max 560 px, focus trap, Esc/overlay-click close (except destructive confirmations), returns focus to trigger. **Drawer:** right-side (mini-cart, filters on tablet), 420 px.
- **Toast:** bottom-center (mobile) / bottom-right (desktop), max 3 stacked, 4 s auto-dismiss (6 s with an Undo action), pause on hover/focus, `role="status"`; errors use `role="alert"` and persist until dismissed.
- **Loading skeletons:** gray-100 → gray-200 shimmer 1.2 s; disabled under `prefers-reduced-motion` (static gray).
- **Empty / error states:** 48 px line icon (SVG), H3, one-sentence explanation, single CTA.

### 8.8 Interaction states and accessibility tokens
- **Focus-visible:** `outline: 3px solid var(--blue-600); outline-offset: 2px;` on all interactive elements; on dark surfaces use `#FFFFFF` outline. **Never** `outline: none` without replacement.
- **Hover:** subtle (color shift, 150 ms). Cards: border gray-200 → gray-300 and `--shadow-md`; **no scale/lift transforms >2 px**.
- **Active/pressed:** 1 px translate.
- **Disabled:** reduced contrast but still legible; not removed from DOM; explanation via `aria-describedby` where the reason matters (e.g., "Out of stock").
- **Keyboard:** all functionality reachable by Tab/Shift-Tab; custom widgets follow ARIA Authoring Practices (combobox, dialog, disclosure, tabs).
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables transitions >0 ms, skeleton shimmer, auto-rotation.
- **Shadows:** `--shadow-sm: 0 1px 2px rgba(11,31,58,.08)`; `--shadow-md: 0 4px 12px rgba(11,31,58,.10)`; `--shadow-lg: 0 12px 32px rgba(11,31,58,.16)` (modals only).

### 8.9 Product image rules
- **Primary image:** 1:1 canvas, white or transparent background, product centered with 8% padding; listing cards display it at 1:1 with `object-fit: contain`. Use a white card background for white-background originals and `--gray-100` only for transparent PNG/WebP files; never mix the two in one grid.
- **Gallery images:** minimum 800 × 800 px; max 6; first image is the front view; at least one **ports/back-panel** image for switches/routers (valuable for networking buyers).
- **Formats:** WebP with JPEG/PNG fallback in production; prototype accepts jpg/png/webp.
- **Sourcing strategy (prototype):** (1) **Preferred:** images supplied by SBC or by the brands' own press/asset kits (whether each brand offers one, and its licensing terms, must be confirmed). (2) **Allowed for the demo only:** hotlinking SBC's **own** product image URLs seen on its live site (pattern `https://www.southbanglabd.com/backend/products/image/<file>`), with client permission, never for production. (3) **Always:** local SVG placeholder (`assets/img/placeholder-product.svg`) via `onerror` fallback. (4) No third-party stock imagery of competing branded products.
- **Alt text:** `"{Brand} {Model} {type}"`, e.g., "Tenda AX12 Pro AX3000 Wi-Fi 6 router"; gallery images 2+ add the view ("rear ports"). Decorative images: `alt=""`.
- **Dimensions:** always set `width`/`height` attributes to prevent layout shift. `loading="lazy"` for everything below the fold; `decoding="async"`.

### 8.10 When to reuse a shared component vs. a unique layout
| Reuse shared component | Use a unique layout |
|---|---|
| Product card, filters, pagination, breadcrumbs, form fields, modals, toasts, tables, accordions | Home hero & campaign strip (editorial), PDP buy box, configurator stepper, dealer dashboard, compare table, checkout summary |
| Rule: if ≥ 3 pages need it → component in `components.css`/`components.js`. If one page only → page CSS file (`css/pages/<page>.css`). |  |

---

## 9. Component inventory

| ID | Component | Variants | States | Used on | Defined in |
|---|---|---|---|---|---|
| C01 | Announcement bar | single/rotating | dismissed | All | `layout.js` |
| C02 | Header | desktop / tablet / mobile; guest / customer / dealer | sticky, scrolled | All | `layout.js` |
| C03 | Mega-menu | — | closed/open | Header | `layout.js` |
| C04 | Search combobox | header / mobile overlay / page | idle, loading, results, empty | Header, P03 | `search.js` |
| C05 | Mobile drawer | — | closed/open | Header | `layout.js` |
| C06 | Footer | — | accordion mobile | All | `layout.js` |
| C07 | Breadcrumb | — | — | All but Home | `layout.js` |
| C08 | Button | primary/secondary/text/danger/on-dark/icon | §8.4 | All | `components.css` |
| C09 | Form field | text/email/tel/password/textarea/select/checkbox/radio/file | default, focus, error, disabled | Forms | `components.css`, `forms.js` |
| C10 | Stepper (form) | horizontal/vertical | current/complete/error | P11, P22, P09 | `components.css` |
| C11 | Product card | grid / list / compact / quote-only / dealer | default, hover, out-of-stock, discontinued, skeleton | P01–P07 | `cards.js` |
| C12 | Price block | retail / dealer / quote | discount, demo tag | C11, P05, cart | `format.js` |
| C13 | Badge | §8.6 | — | Cards, PDP | `components.css` |
| C14 | Stock indicator | 4 states | — | Cards, PDP | `cards.js` |
| C15 | Quantity stepper | default/compact | min/max, disabled | PDP, cart, bulk | `components.js` |
| C16 | Gallery + lightbox | — | loading, error, zoom | P05 | `gallery.js` |
| C17 | Spec table | grouped | — | P05, P06 | `components.css` |
| C18 | Filter sidebar / sheet | desktop sidebar, mobile sheet | open/closed, active count | P03, P04 | `filters.js` |
| C19 | Filter chips | removable | — | P03 | `filters.js` |
| C20 | Pagination | numbered | current, disabled | P03, P40 | `components.js` |
| C21 | Compare tray | bottom bar | 0–4 items, hidden when 0 | Listing/PDP | `compare.js` |
| C22 | Compare table | diff toggle | — | P06 | `compare.js` |
| C23 | Mini-cart drawer | — | empty/filled | Header | `cart.js` |
| C24 | Cart line | — | out-of-stock, price changed | P08 | `cart.js` |
| C25 | Order summary | cart / checkout / confirmation | — | P08–P10 | `cart.js` |
| C26 | Status timeline | order / dealer application | per state | P18, P23, P29 | `components.js` |
| C27 | Modal | confirm / form / info / lightbox | — | Many | `components.js` |
| C28 | Toast | success/info/error/undo | — | Many | `components.js` |
| C29 | Skeleton | card/table/text | — | Lists | `components.css` |
| C30 | Empty state | per context | — | Many | `components.js` |
| C31 | Error state | inline / page | — | Many | `components.js` |
| C32 | Accordion | single/multi | — | FAQ, footer | `components.js` |
| C33 | Tabs / anchor nav | — | — | P05, P34 | `components.js` |
| C34 | Data table | sortable / responsive-to-cards | — | Dealer, orders | `components.css` |
| C35 | File upload (UI) | single/multi | idle, invalid, ready | P22 | `forms.js` |
| C36 | Demo control panel | — | visible when `DEMO_MODE` | P23, P18, P09 | `demo.js` |
| C37 | Prototype disclosure modal | — | first visit | All | `layout.js` |
| C38 | Category tile | — | — | P01, P02 | `cards.js` |
| C39 | Brand tile/logo | hero / standard | text fallback | P01, P04 | `cards.js` |
| C40 | News card | — | — | P01, P40 | `cards.js` |
| C41 | Location card | — | — | P01, P44 | `cards.js` |
| C42 | KPI card | — | — | P25 | `components.css` |
| C43 | Video card/modal | — | click-to-load | P35 | `components.js` |

**Undefined-component audit rule:** every UI element named in §6–§7 must map to a C-ID above; QA §17 checks this.

---

## 10. Interaction and behavior specifications

### 10.1 Navigation
Multi-page navigation uses plain `<a href>` links (no router). Pages share header/footer rendered by `layout.js` (§13.3). Active section highlighting by matching `location.pathname`. Query-string state is the source of truth for listing pages (§10.4).

### 10.2 Search with suggestions (local demo data)
- **Trigger:** typing ≥ 2 characters; debounce 150 ms.
- **Matching:** case-insensitive; tokens split on spaces; each token must match `name`, `model`, `brand`, `category`, or `tags` via `includes`; score: exact model match 100, model prefix 80, name/word-start 50, other 20.
- **Suggestions panel (`role="listbox"`):** up to 5 **Products** (thumb 40 px, name, price/availability), 2 **Categories**, 2 **Brands**, plus footer row "See all results for “q” →". Matched text bolded.
- **Keyboard:** ↓/↑ move highlight (`aria-activedescendant`), Enter opens highlighted item or full results, Esc closes, Tab leaves. **Combobox pattern** (`role="combobox"`, `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`).
- **Empty query focus:** shows "Popular searches" (demo: "Wi-Fi 6 router", "PoE switch", "ONU", "UPS 3KVA") and 3 recent searches (localStorage, clearable).
- **No results:** "No matches for “q”." + "Try a model number, brand, or category" + category links.
- **Submit:** Enter without selection → `products.html?q=…`.
- **Mobile:** tapping the search icon opens a full-screen overlay with the same combobox.

### 10.3 Category navigation
Mega-menu lists the 10 categories with product counts; hovering a category previews its sub-categories (desktop) – click goes to `category.html?c=`. On touch: first tap opens, second navigates (no hover reliance).

### 10.4 Filters and sorting
- State model: `{c, b, q, sort, page, view, f: {facet: [values]}, price: [min,max], avail: []}` serialized to the query string.
- Apply immediately on desktop; on mobile apply on "Show N results".
- Facet counts show how many results remain per option; options with 0 are disabled (not hidden).
- Default sort: Relevance when `q` present, otherwise Newest. Discontinued products are hidden unless "Include discontinued" is ticked.
- Sort is stable; ties break by name.

### 10.5 Product detail navigation
Cards and search suggestions link to `product.html?id=`. "Back to results" preserves the previous listing URL via `document.referrer` if same origin, else falls back to the category page. Anchor nav tabs update `location.hash`; sticky nav highlights the active section using `IntersectionObserver`.

### 10.6 Image gallery
Thumbnails change main image (keyboard: arrow keys within the thumbnail list); click main image → lightbox; lightbox: Esc, ←/→, pinch/zoom on touch, caption shows `i / n`; preload next image; image failure shows placeholder.

### 10.7 Quantity selection
`[–] [ n ] [+]`; integer 1…`min(stock, 99)` (dealer: respects MOQ and pack multiple, step = pack size); typing is sanitized on blur; at max shows tooltip "Maximum available quantity"; Enter in the field does not submit the page form.

### 10.8 Add to cart and cart count
- API (in `store.js`): `cart.add(id, qty)`, `cart.update(id, qty)`, `cart.remove(id)`, `cart.clear()`, `cart.items()`, `cart.totals()`.
- On add: button shows loading 300 ms → toast "Added to cart · View cart"; header count animates once (no animation if reduced-motion); mini-cart drawer opens only on desktop add from PDP.
- Cart persisted in `localStorage['sbc.cart']` as `[{id, qty}]` (prices are **recomputed from data each render**, never stored).
- Cart line removal: Undo toast 5 s.
- Maximum 50 distinct lines (retail) / 200 (dealer).
- Cross-tab sync via the `storage` event.

### 10.9 Form validation rules (shared `validate.js`)
| Field | Rule | Message |
|---|---|---|
| Required | non-empty after trim | "{Label} is required." |
| Email | RFC-lite `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/` | "Enter a valid email address." |
| BD mobile | strip spaces/dashes/`+88`; `/^01[3-9]\d{8}$/` | "Enter an 11-digit mobile number starting with 01." |
| Password | ≥ 8 chars, 1 uppercase, 1 lowercase, 1 number | "Use at least 8 characters with upper, lower case and a number." |
| Confirm password | equals password | "Passwords don't match." |
| Name | 2–80 chars | "Enter your full name." |
| Address | ≥ 10 chars | "Enter a complete delivery address." |
| File | type ∈ {pdf,jpg,jpeg,png}; ≤ 5 MB | "Upload a PDF, JPG or PNG under 5 MB." |
Timing: validate on blur, re-validate on input once an error is shown, validate all on submit; focus first invalid field; error summary at the top of long forms.

### 10.10 Wishlist
`wishlist.toggle(id)`; heart `aria-pressed`; persisted `localStorage['sbc.wishlist']`; header count; toast "Saved to wishlist" / "Removed". Works for guests. Max 100.

### 10.11 Product comparison
`compare.toggle(id)`; stored `sbc.compare` (max 4, same top-level category); tray shows thumbnails + "Compare (n)" + "Clear"; attempting a 5th: toast "You can compare up to 4 products."; mixed category prompt per P06.

### 10.12 Customer login/registration demo states
- Accounts stored in `localStorage['sbc.users']` (passwords are stored as plain text in this prototype because there is no server; the disclosure modal must warn users **never to enter a real password**). Seed user: `customer@demo.sbc / Demo@1234`.
- Session: `sbc.session = {type:'customer'|'dealer', id, name}`.
- States: logged-out, logged-in, wrong credentials ("Email or password is incorrect."), locked (after 5 failures, 30 s), registration duplicate email ("An account with this email already exists. Log in?").
- Logout clears the session only; cart and wishlist persist.

### 10.13 Dealer registration with validation
As P22. Draft autosave key `sbc.dealerDraft`; on submit: assign reference `DA-DEMO-<4 digits>`, store application `{ref, data, files:[{name,size}], status:'submitted', createdAt}` in `sbc.dealerApps`, clear draft, route to status page.

### 10.14 Dealer application status simulation
- Default flow with `DEMO_MODE=true`: status auto-advances Submitted → Under review after 3 s on the status page; **Approved / Needs info / Rejected are chosen manually** with the demo control panel (so presenters control the story).
- Approved: creates dealer user `{email, password: chosen at registration}` and shows "You can now log in". Pending/rejected block login with the specified messages.
- All transitions are logged in `application.history` and shown in the timeline.

### 10.15 Dealer dashboard demo
Seed three demo dealer orders (statuses: Processing, Shipped, Delivered) generated on first dealer login. KPI values are computed from those. No real credit data.

### 10.16 Checkout form validation
As P09 and §10.9. **Place order (simulated):** disable button, 1.2 s spinner, create order `{id:'SBC-DEMO-######', items snapshot, totals, address, payment, status:'Processing', createdAt}`; clear cart; navigate. Sequence number increments from `sbc.orderSeq`.

### 10.17 Order confirmation simulation
Reads order by `?o=`; shows disclaimer "This is a simulated order. No payment was taken and no goods will be shipped." If missing: not-found state with link to home.

### 10.18 Responsive mobile menu
Hamburger (44 px) toggles drawer; body scroll locked; focus moves to drawer heading; Esc/overlay closes and returns focus; submenus are accordions; account/cart/wishlist remain visible in the header bar at < 480 px as icons.

### 10.19 Toast notifications
Single `toast.show({type, message, action?})`; queue max 3; accessible live region exists in DOM from load (`<div id="toast-region" role="status" aria-live="polite">`).

### 10.20 Simulation disclosure and demo controls
- **First visit modal (C37):** "This is a design prototype. Accounts, dealer approval, prices, stock, payments and orders are simulated. Do not enter real personal or payment information." Buttons: "I understand" (stores `sbc.disclosed=1`), "Reset demo data".
- **Persistent cues:** footer strip (§7.0), "Demo price" tags (§8.6), simulation notes on forms involving credentials/payments/documents.
- **Demo control panel (C36)** appears (bottom-left floating "Demo tools" button) when `DEMO_MODE=true`: Reset all data · Toggle price mode (Retail / Quote-only) · Simulate dealer status · Advance order status · Simulate payment failure · Simulate slow network (adds 1.5 s latency) · Simulate data error.
- `DEMO_MODE` defaults `true`; `config.js` exposes it.

### 10.21 Loading, empty and error states (consolidated)
| Context | Loading | Empty | Error |
|---|---|---|---|
| Listing | 12 skeleton cards | "No products match your filters" + Clear | "Couldn't load products" + Retry |
| Search suggestions | 3 skeleton rows after 300 ms (only if slow) | No matches message | silent close + inline notice in results page |
| Cart | skeleton lines | Empty cart | n/a |
| Orders | skeleton rows | "No orders yet" | Retry |
| Downloads | skeleton rows | "No files for this selection" | Retry |
| Dealer pricing | skeleton table | "No products match" | "Prices unavailable — contact your account manager" |
| Forms | Button spinner | — | Field errors + summary; submit failure keeps data |
| Images | gray-100 block | — | placeholder SVG |

### 10.22 LocalStorage keys (single namespace `sbc.`)
`sbc.cart` · `sbc.wishlist` · `sbc.compare` · `sbc.recent` (viewed) · `sbc.recentSearches` · `sbc.users` · `sbc.session` · `sbc.orders` · `sbc.orderSeq` · `sbc.addresses` · `sbc.dealerDraft` · `sbc.dealerApps` · `sbc.dealerOrders` · `sbc.quotes` · `sbc.configurator` (sessionStorage) · `sbc.disclosed` · `sbc.priceMode` · `sbc.demo` (flags) · `sbc.version` (schema version; mismatch → migrate or reset with notice).
**Safety:** wrap all storage access in try/catch (Safari private mode, quota); fall back to in-memory store and show a one-time toast "Saved data is unavailable in this browser mode."

---

## 11. Customer and dealer flows

### 11.1 Customer purchase flow (full)

```
Home ─▶ Category ─▶ Listing (filter/sort) ─▶ PDP ─▶ Add to cart ─▶ Cart ─▶ Checkout ─▶ Confirmation
  │                         │                                   ▲            │
  └── Search ───────────────┘            Quote path: PDP ▶ Request quote ▶ quote.html ▶ Quote confirmation
```

**Guest checkout (decision):** Allowed. Required: name, phone, delivery address; email optional but recommended (for confirmation copy — simulated). After confirmation, offer "Create account to track this order" (pre-filled name/phone/email). If the visitor logs in at checkout, addresses prefill from saved addresses.

**Delivery methods:** Home delivery · Showroom pickup (choose one of the 8 locations; the 5 showrooms from the live footer are valid pickup points; head office, support center and warehouse are **not** offered for pickup unless confirmed — §18 Q8).

**Payment options (all *proposed*, not confirmed):**
| Option | Prototype behavior | Business status |
|---|---|---|
| Cash on delivery | Selectable; note "Pay when you receive" | Proposed |
| Bank transfer | Shows placeholder account-details panel labelled "Demo" | Proposed |
| Mobile wallet (e.g., bKash/Nagad) | Selectable; shows "You'll be redirected to complete payment (simulated)" | Proposed — provider list to be confirmed |
| Card | Shown as a disabled "Coming soon" option so the demo never implies card entry | Proposed |
The prototype never renders card-number inputs.

| Step | User goal | Required info | System response | Validation/errors | Success | Next |
|---|---|---|---|---|---|---|
| Browse | Find product | — | Filtered results | Empty state | Product visible | Open PDP |
| PDP | Evaluate | — | Specs, stock, price | Discontinued/out-of-stock states | Add to cart | Cart |
| Cart | Confirm lines | qty | Totals update | Stock/MOQ warnings | Proceed | Checkout |
| Checkout | Provide delivery & payment | §P09 | Inline validation, summary | Field errors; simulated payment failure | Order created | Confirmation |
| Confirmation | Know what's next | — | Order summary | Missing order → not-found | Order # shown | Track/continue |

### 11.2 Dealer journey (full)

```
Dealer landing ─▶ Register (5 steps) ─▶ Submit ─▶ Status: Submitted/Under review
      │                                                    │
      │                  ┌─────────────────────────────────┼───────────────────────┐
      │                  ▼                                 ▼                       ▼
      │            Approved                         Needs more info           Rejected
      │                  │                                 │                       │
      │                  ▼                                 ▼ (update)              ▼ (reapply)
      └─▶ Dealer login ─▶ Dashboard ─▶ Pricing ─▶ Bulk order ─▶ Cart ─▶ Submit order request ─▶ Dealer orders ─▶ Order detail
```

| Stage | User goal | Entry | Required info | Actions | System response | Validation/errors | Success | Next |
|---|---|---|---|---|---|---|---|---|
| Learn | Understand eligibility | Home dealer band / header | — | Read; FAQ | Static | — | Clicks Apply | Register |
| Apply | Open a dealer account | `dealer/register.html` | Account, business, contacts, documents | 5 steps with autosave | Per-step validation | Missing/invalid fields; file type/size | Ref `DA-DEMO-…` | Status |
| Wait | Know status | `dealer/status.html?ref=` | ref | View timeline | Status card | Unknown ref → not found | — | Approved/other |
| Approved | Start buying | status / login | credentials | Log in | Dealer session | Wrong password; locked | Dashboard | Pricing/bulk |
| Needs info | Fix application | status page | requested items | Update & resubmit | Status → Under review | Same as register | Resubmitted toast | Wait |
| Rejected | Understand outcome | status page | — | Read; reapply | Generic reason | — | — | Reapply (new application) |
| Order | Buy in volume | bulk-order | SKU + qty | Add rows/paste/CSV | Row validation | MOQ/pack/stock/unknown SKU | Valid rows | Cart/submit |
| Submit order request | Place order | cart (dealer mode) | PO number (optional), delivery | Submit | Order created (simulated) | Same as checkout minus payment: **"Payment terms per dealer agreement (business decision)"** | Order # `DO-DEMO-…` | Orders list |
| Track | See history | `dealer/orders.html` | — | Filter, open detail, reorder | Table | — | — | — |

**Dealer visibility rules:** Dealer prices, MOQ and price list are visible **only** while `session.type === 'dealer'` and `status === 'approved'`. A logged-in retail customer, guest, or pending/rejected applicant sees retail pricing only. Direct URL access to `dealer/*` pages (except landing, register, status, login) redirects to `dealer/login.html`.

### 11.3 Flow gaps checked
- Customer flow includes guest checkout, validation, failure and confirmation ✔
- Dealer flow includes all four application outcomes ✔
- Quote path exists for both retail and configurator ✔
- Password recovery exists for customer; dealer login links to the same recovery with a dealer note ✔

---

## 12. Demo product data requirements

### 12.1 Principles
- **Verified from the live website (21 Oct 2026):** product **names/model numbers**, brand, and the **category membership implied by the live listing**; the full spec set for **Tenda AX12 Pro** (§12.4). Everything else — **prices, stock, discounts, ratings, extra specs, warranty periods (except AX12 Pro "1 Year Official Warranty"), "best seller" flags** — is **demo data** and must be labelled so in the data file via `"demo": true` fields and on screen via the "Demo price" tag.
- Prices in **BDT**, integers, **no real market claims**. Demo prices are plausible but intentionally rounded and must not be treated as SBC's price list.
- Do **not** copy product descriptions verbatim from the live site; write short original summaries for the demo.

### 12.2 Category taxonomy (data: `categories.js`)
| slug | Name | Sub-categories (chips) |
|---|---|---|
| `routers-wifi` | Routers & Wi-Fi | Wi-Fi 7, Wi-Fi 6, Wi-Fi 5, Mesh systems, Range extenders, USB adapters |
| `switches` | Switches & PoE | Unmanaged, Smart/Cloud managed, Managed L3, PoE, 2.5G/10G, PoE injectors |
| `fiber-pon` | Fiber, PON & ONU | ONU/ONT, OLT, SFP/QSFP modules, Splitters |
| `wireless-outdoor` | Access Points & Outdoor | Indoor APs, In-wall APs, Outdoor CPE/PtP, AP controllers |
| `security-cctv` | CCTV & Security | NVR, IP cameras, Wi-Fi cameras |
| `power-backup` | Power & Backup | Online UPS, Line-interactive UPS, Hybrid solar inverters, LiFePO4 batteries, Power stations, Lead-acid batteries |
| `cabling-racks` | Cabling & Racks | Cat6 cable, Patch cords, Patch panels, Keystone/Face plates, Racks |
| `fiber-tools` | Fiber Tools | Cleavers, Fusion splicers, Strippers, Power meters |
| `peripherals-audio` | Peripherals & Audio | Keyboards, Mice, Combos, Headsets, Speakers, Microphones, Gaming accessories |
| `computer-accessories` | Computer Accessories | Monitors, Power supplies |

### 12.3 Seed catalogue (53 SKUs) — names verified from the live listing
`id` = slug-style id used in URLs. **Image file** = file name under SBC's `/backend/products/image/` path (use only per §8.9). Prices are filled by the developer using the **demo price bands** in §12.5.

| id | Brand | Model | Product name (as listed) | Category | Image file |
|---|---|---|---|---|---|
| tenda-ax12-pro | Tenda | AX12 Pro | Tenda AX12 Pro AX3000 Dual-Band Gigabit Wi-Fi 6 Router | routers-wifi | 962631605.jpg |
| tenda-be12-pro | Tenda | BE12 Pro | Tenda BE12 Pro BE7200 Dual Band Gigabit Wi-Fi 7 Router | routers-wifi | 1363865235.jpg |
| tenda-tx2l-pro | Tenda | TX2L Pro | Tenda TX2L Pro AX1500 Dual-Band Gigabit Wi-Fi 6 Router | routers-wifi | 618068149.webp |
| tenda-ac10 | Tenda | AC10 | Tenda AC10 AC1200 1200Mbps Dual Band 4 Antenna Gigabit WiFi Router | routers-wifi | 1385946309.jpg |
| tenda-mx3-2pack | Tenda | MX3 2-Pack | Tenda Nova MX3 AX1500 Wi-Fi 6 Whole Home Mesh System (2-Pack) | routers-wifi | 1415854910.jpg |
| tenda-mx12-3pack | Tenda | MX12 3-Pack | Tenda Nova MX12 AX3000 Wi-Fi 6 Whole Home Mesh System (3-Pack) | routers-wifi | 139367006.jpg |
| tenda-a18 | Tenda | A18 V4.0 | Tenda A18 V4.0 AC1200 Dual-Band Wi-Fi Range Extender | routers-wifi | 1079547444.png |
| tenda-u2 | Tenda | U2 | Tenda U2 AX300 Wi-Fi 6 High Gain Wireless USB Adapter | routers-wifi | 540283080.png |
| tenda-teg2210p | Tenda | TEG2210P-8-120W | Tenda TEG2210P-8-120W 8-Port Gigabit Cloud Managed PoE Switch | switches | 1470565362.jpg |
| tenda-teg2226f | Tenda | TEG2226F | Tenda TEG2226F 24-Port Gigabit Cloud Managed Ethernet Switch with 2 SFP | switches | 289699330.jpg |
| tenda-teg1024d | Tenda | TEG1024D | Tenda TEG1024D v9.0 24-Port Gigabit Ethernet Switch | switches | 394619675.jpg |
| tenda-sg108 | Tenda | SG108 | Tenda SG108 8-Port Gigabit Desktop Switch | switches | 701101933.jpg |
| ipcom-g1128p | IP-COM | G1128P-24-250W | IP-COM G1128P-24-250W 24-Port Gigabit PoE Switch with 2 SFP Uplink 230W | switches | 1468199935.jpg |
| solitine-sol3012x | Solitine | SOL-3012X | Solitine SOL-3012X 12-Port 10G SPF+ Managed Switch | switches | 528237660.jpg |
| cisco-c9200l-24p | Cisco | C9200L-24P-4X-E | Cisco C9200L-24P-4X-E Catalyst 9200 Series Switch | switches | 1615688001.jpg |
| cisco-c8200 | Cisco | C8200-1N-4T | Cisco Catalyst C8200-1N-4T Enterprise Edge Router | routers-wifi | 237440044.jpg |
| hsgq-g04r | HSGQ | HSGQ-G04R | HSGQ 4*Port Integrated Gpon Black FTTB | fiber-pon | 1297470378.jpg |
| hsgq-g08r | HSGQ | HSGQ-G08R | HSGQ 8*Port Pon GPON OLT Integrated Ftth Access | fiber-pon | 986410889.jpg |
| hsgq-x200dw | HSGQ | HSGQ-X200DW | HSGQ-X200DW 1200M WiFi XPON ONU | fiber-pon | 1513048010.jpg |
| hsgq-x421dw | HSGQ | HSGQ-X421DW | HSGQ-X421DW 4GE+2POTS+WiFi XPON ONU | fiber-pon | 260653183.jpg |
| tenda-hg10c | Tenda | HG10C | Tenda HG10C AC1200 Wi-Fi 5 XPON ONT | fiber-pon | 1329568244.jpg |
| solitine-10g-sr | Solitine | 10G SR SFP+ | Solitine 10G SR SFP+ Module – 850nm, 300m, LC Duplex, MMF | fiber-pon | 1725068842.jpg |
| hsgq-5912 | HSGQ | HSGQ-5912 | HSGQ 12*Port L3 Managed Switch | switches | 453448830.jpg |
| hsgq-sg2024p | HSGQ | HSGQ-SG2024P | HSGQ 24*Port Black PoE Switch for IP Camera | switches | 1193082980.jpg |
| tenda-w15 | Tenda | W15 | Tenda W15 AX3000 Dual-Band Gigabit Wi-Fi 6 In-Wall AP | wireless-outdoor | 1321232892.jpg |
| tenda-oap1200 | Tenda | OAP1200 | Tenda OAP1200 802.11AC Indoor/Outdoor Wi-Fi Access Point | wireless-outdoor | 1668762128.jpg |
| tenda-o9 | Tenda | O9 1-pack | Tenda O9 1-pack 5GHz 11ac 23dBi Gigabit Outdoor CPE | wireless-outdoor | 1230543292.jpg |
| ipcom-iuap-ac-m | IP-COM | iUAP-AC-M | IP-COM iUAP-AC-M 802.11AC Indoor/Outdoor Wi-Fi Access Point | wireless-outdoor | 1045431164.jpg |
| cisco-c9115axi | Cisco | C9115AXI-EWC | Cisco C9115AXI-EWC Access Point | wireless-outdoor | 1834271858.jpg |
| tenda-tn3108-8p | Tenda | TN3108-8P | Tenda TN3108-8P 8-Channel PoE UHD Network Video Recorder | security-cctv | 924485203.jpg |
| tenda-tc3b24c | Tenda | TC3B24C | Tenda TC3B24C 4MP Smart Full-Color Bullet Camera | security-cctv | 1524481572.jpg |
| tenda-ch7-wca | Tenda | CH7-WCA | Tenda CH7-WCA 4MP Outdoor Wi-Fi Pan Tilt Camera | security-cctv | 31711144.jpg |
| must-eh55-h1ksl | Must | EH55-H1KSL | Must EH55-H1KSL (EH55-H1KS) Online UPS 1KVA/1KW – High Frequency Long-Run Online UPS | power-backup | 1657485858.jpg |
| must-ew2110-800 | Must | EW2110-800 | Must EW2110-800 800VA/480W Line Interactive UPS | power-backup | 1966551378.jpg |
| marsriva-mr-us3k | Marsriva | MR-US3K | Marsriva MR-US3K long run online UPS | power-backup | 1492913860.jpg |
| must-ph91-5k | Must | PH91-5KL1EU-HM | Must PH91-5KL1EU-HM 5kW Hybrid Solar Inverter | power-backup | 799614444.jpg |
| must-lp16-48100 | Must | LP16-48100 | Must LP16-48100 LiFePO4 Battery | power-backup | 343403392.jpg |
| must-hbp18-1006 | Must | HBP18-1006 | Must HBP18-1006 Portable Solar Power Station | power-backup | 696184355.jpg |
| solitine-sol604 | Solitine | SOL-604 | Solitine SOL-604 Premium Mini DC UPS | power-backup | 2011178636.png |
| solitine-sol6156-or | Solitine | SOL6156-OR-U | SOLITINE SOL6156-OR-U U/UTP Cat-6 Solid Copper PVC LAN Cable (Orange) | cabling-racks | 764580136.png |
| solitine-patch-24 | Solitine | SOL-P2401-10 | Solitine 24-Port 1U Patch Panel Cat6 Fully Loaded | cabling-racks | 1029207040.jpg |
| solitine-rack-9u | Solitine | SOL-266-9U | Solitine SOL-266-9U Wall Mount Network Rack | cabling-racks | 758055020.jpg |
| tumtec-fst18s | Tumtec | FST-18S | Tumtec Dust-proof Optical Fusion Splicer FST-18S | fiber-tools | 935229729.jpg |
| tumtec-a9plus | Tumtec | A9+ | Tumtec A9+ High Precision Fiber Cleaver One-Step Automatic Fiber Cutting Tool | fiber-tools | 1288293163.jpg |
| solitine-power-meter | Solitine | R45 Tester | Solitine Optical Power Meter with VFL & R45 Tester | fiber-tools | 350586369.jpg |
| meetion-mk008-pro | Meetion | MT-MK008 Pro | Meetion MT-MK008 Pro 80% RGB Hot-swap Mechanical Keyboard | peripherals-audio | 36742764.png |
| meetion-btm012 | Meetion | BTM012 | Meetion BTM012 Dual-Mode Ergonomic Wireless Mouse | peripherals-audio | 1202424832.jpg |
| meetion-g3330 | Meetion | MT-G3330 | Meetion MT-G3330 Hades RGB Gaming Mouse – 7+1 Buttons, 10000 DPI, Professional Esports Mouse | peripherals-audio | 1589070421.jpg |
| meetion-ikey-c210 | Meetion | iKey C210 | Meetion iKey C210 Wireless Ultra-thin Keyboard & Mouse Combo | peripherals-audio | 1694178577.png |
| meetion-hp022 | Meetion | MT-HP022 | Meetion MT-HP022 Noise-Cancelling RGB Wired Gaming Headset | peripherals-audio | 836755513.png |
| solitine-se108-bar | Solitine | Enter SE108 Soundbar | SOLITINE ENTER BAR SE108 Sound Bar – 32W RMS with Subwoofer | peripherals-audio | 98013276.jpg |
| hkc-mb21v19f | HKC | MB21V19F | HKC MB21V19F 21.45-inch Business Series Monitor | computer-accessories | 1290613650.png |
| solitine-psu-450 | Solitine | STN-RP450BZ | Solitine STN-RP450BZ 450W 80 Plus Bronze Desktop Power Supply (Black) | computer-accessories | 1090225660.jpg |

*(Name text copied from the live listing; known source typos such as "SPF+" in the SOL-3012X title are preserved as listed but should be corrected to "SFP+" in production data — §18 Q12.)*

### 12.4 Verified spec record for the PDP prototype (Tenda AX12 Pro)
Use this as the **reference specification structure** for all products (group → rows):
- **Hardware:** Standard & Protocol: IEEE 802.3, 802.3u, 802.3ab · CPU: Dual-Core 1.2 GHz · RAM: 256 MB · Interface: 1× Gigabit WAN, 3× Gigabit LAN · Antenna: 4× external (5 GHz 7 dBi, 2.4 GHz 5 dBi) · Button: 1× WPS/Reset · Power: AC 100–240 V → DC 12 V 1 A · LED: 1× system · Dimensions: 226 × 144 × 168 mm.
- **Wireless:** Standards: 802.11ax/ac/n/a (5 GHz), 802.11ax/n/b/g (2.4 GHz) · Data rate: 5 GHz 2402 Mbps (HE160), 2.4 GHz 574 Mbps · Frequency: 2.4 + 5 GHz · Features: MU-MIMO, Beamforming, OFDMA, 160 MHz, Wi-Fi+, EasyMesh · Security: WPA3-SAE/WPA2-PSK, WPS, MAC filter.
- **Software:** Connection types: PPPoE, Dynamic IP, Static IP · Protocol: IPv4 & IPv6 · Modes: Router, AP, Universal Repeater, WISP · Parental control · DHCP · Virtual server (port forwarding, DMZ, UPnP) · DDNS · VPN pass-through · Special: EasyMesh, Guest/IoT network, IPTV, bandwidth control · Firewall: SPI, flood defense.
- **Others:** Temperature 0–40 °C operating · Humidity 10–90% RH · Certification: CE, FCC, RoHS · Package: router, adapter, Ethernet cable, quick guide.
- **Warranty:** 1 Year Official Warranty. **Documents:** datasheet PDF. **Availability on the live site: "Discontinued"** → use this item to demonstrate the discontinued state (§P05).

### 12.5 Data schema (JavaScript objects in `data/products.js`)
```js
window.SBC_DATA = window.SBC_DATA || {};
window.SBC_DATA.products = [{
  id: "tenda-ax12-pro",            // unique, URL-safe
  sku: "SBC-TND-AX12P",            // demo SKU
  brand: "tenda",                  // brand slug
  model: "AX12 Pro",
  name: "Tenda AX12 Pro AX3000 Dual-Band Gigabit Wi-Fi 6 Router",
  category: "routers-wifi",
  subcategory: "wifi-6",
  tags: ["wifi 6","ax3000","mesh"],
  attrs: {                         // facet fields (see §7 P03)
    wifiStandard: "Wi-Fi 6", speedClass: "AX3000", lanPorts: 3, poe: false
  },
  summary: "Original 1–2 sentence demo summary.",
  features: ["Dual-band Wi-Fi 6 up to 2976 Mbps","EasyMesh","1× WAN + 3× LAN Gigabit"],
  specs: [ { group:"Hardware", rows:[["CPU","Dual-Core 1.2 GHz"]] } ],
  images: ["962631605.jpg"],       // resolved via asset config
  documents: [{ type:"datasheet", label:"AX12_Pro_Datasheet.pdf", url:"#", demo:true }],
  warranty: "1 Year Official Warranty",
  status: "discontinued",          // in-stock | low-stock | preorder | out-of-stock | discontinued
  stock: 0,                        // demo
  isNew: false,                    // suppressed when discontinued
  price: { retail: 6900, compareAt: null, dealer: 6070, moq: 5, pack: 1, quoteOnly: false, demo: true },
  flags: { bestSeller: false, recommended: true },
  alternatives: ["tenda-tx2l-pro","tenda-be12-pro"]
}];
```
**Demo price bands (BDT, for plausibility only):** USB adapters/small accessories 700–2,500 · routers 2,500–14,000 · unmanaged switches 1,500–12,000 · PoE/managed switches 9,000–60,000 · Cisco enterprise 90,000–600,000 (set `quoteOnly: true` for Cisco and OLT/splicers) · ONU 1,800–6,500 · OLT 18,000–90,000 · UPS 4,500–120,000 · hybrid inverters 85,000–400,000 · batteries 25,000–180,000 · cabling items 150–25,000 · fiber tools 4,500–95,000 · peripherals 600–6,500 · monitor/PSU 3,000–16,000. **Required mix:** ≥ 6 products `quoteOnly`; ≥ 3 `out-of-stock`; ≥ 3 `low-stock`; ≥ 2 `preorder`; ≥ 1 `discontinued` (AX12 Pro); ≥ 8 with `compareAt` (discounts); ≥ 10 `isNew`.

### 12.6 Other data files
| File | Content |
|---|---|
| `data/categories.js` | §12.2 |
| `data/brands.js` | 14 brands from the live menu + placeholder `mission` (flagged `placeholder:true`); fields: slug, name, hero(bool), logo (path or null), description (demo) |
| `data/branches.js` | The 8 locations from the live footer with address and phone strings as seen |
| `data/news.js` | 6 items: the 3 live guides (ONU, OLT, Media Converter; 3 Aug 2026) + 3 demo drafts |
| `data/faq.js` | 20 draft Q&As, tagged `draft:true` |
| `data/downloads.js` | 24 demo entries across the 6 live firmware categories; `url:null` |
| `data/districts.js` | Bangladesh divisions → districts (64) for checkout |
| `data/configurator-rules.js` | Rule table (project type × size → SKUs) |
| `data/site-claims.js` | Company claims from the live site (§2.4), each with `approved:false` |
| `data/users.js` | Seed customer + seed dealer (demo credentials) |
| `config.js` | `DEMO_MODE`, `DEMO_PRICING`, `PRICE_MODE`, `ASSET_BASE`, `CURRENCY` |

---

## 13. Frontend architecture and file structure

### 13.1 Approach (decision and reasons)
- **Multi-page static site**, one HTML file per template (§4), vanilla JS, no framework, no bundler, no npm dependency.
- **Must run by double-clicking `index.html` (file://) and via any static server.**
- **Shared header/footer are rendered by JavaScript from string templates (`layout.js`), not loaded with `fetch()`.** Browsers (notably Chrome) block `fetch()` and ES-module imports of local files under `file://`, so partial-HTML includes and `<script type="module">` would break when the prototype is opened directly. **If the team prefers `fetch()` includes or ES modules, they must be tested through a local server** (`python3 -m http.server 8080` or `npx serve`, then open `http://localhost:8080`). The recommended architecture below avoids that requirement.
- **Data are `.js` files that assign to `window.SBC_DATA`**, not `.json` files (same `file://` reason).
- **Trade-off to accept:** JS-rendered header/footer are not ideal for SEO. That is acceptable for a prototype; the production build (WordPress/WooCommerce or other) renders them server-side (§15.6).

### 13.2 Directory structure
```
south-bangla-prototype/
├── index.html
├── products.html  category.html  brand.html  product.html  compare.html  wishlist.html
├── cart.html  checkout.html  order-confirmation.html
├── configurator.html  quote.html
├── login.html  register.html  forgot-password.html
├── support.html  faq.html  downloads.html  tutorials.html  media.html
├── warranty.html  returns.html  shipping.html
├── news.html  article.html
├── about.html  contact.html  branches.html  careers.html
├── privacy.html  terms.html  404.html
├── account/
│   ├── index.html  orders.html  order-detail.html  addresses.html  settings.html
├── dealer/
│   ├── index.html  register.html  status.html  login.html  dashboard.html
│   ├── pricing.html  bulk-order.html  orders.html  order-detail.html  settings.html  support.html
├── css/
│   ├── tokens.css        (§8 custom properties)
│   ├── base.css          (reset, typography, a11y helpers)
│   ├── layout.css        (container, grid, utilities)
│   ├── components.css    (buttons, forms, cards, badges, tables, modals, toasts…)
│   ├── print.css
│   └── pages/            (home.css, product.css, checkout.css, dealer.css, configurator.css …)
├── js/
│   ├── config.js         (flags)
│   ├── i18n/en.js        (string dictionary, §13.9)
│   ├── core/
│   │   ├── util.js       (esc, qs, debounce, formatBDT, url helpers)
│   │   ├── storage.js    (safe localStorage wrapper)
│   │   ├── store.js      (cart, wishlist, compare, session, orders APIs)
│   │   ├── validate.js   (§10.9)
│   │   └── ui.js         (modal, toast, drawer, accordion, skeleton helpers)
│   ├── layout.js         (header, footer, mega-menu, drawer, disclosure modal)
│   ├── search.js
│   ├── cards.js          (product/category/brand/news/location card renderers)
│   ├── filters.js        (listing engine)
│   ├── gallery.js
│   ├── compare.js
│   ├── cart.js           (cart UI, mini-cart, summary)
│   ├── checkout.js
│   ├── account.js
│   ├── dealer.js
│   ├── configurator.js
│   ├── demo.js           (demo control panel)
│   └── pages/            (home.js, product.js, listing.js, … one per page, small)
├── data/
│   ├── products.js  categories.js  brands.js  branches.js  news.js  faq.js
│   ├── downloads.js  districts.js  configurator-rules.js  site-claims.js  users.js
├── assets/
│   ├── img/              (logo.svg, placeholder-product.svg, hero/, brands/, icons/)
│   ├── fonts/            (Inter woff2 — optional)
│   └── docs/             (placeholder brochure PDF — optional)
├── tests/smoke.html      (data-integrity self-test, §13.12)
├── tests/links.html      (optional link lister; works only over http, §13.12)
└── README.md             (how to run, demo credentials, disclosure, data sources)
```

### 13.3 Shared header/footer strategy
Every page has exactly this skeleton:
```html
<!doctype html>
<html lang="en">
<head> … <link rel="stylesheet" href="css/tokens.css"> … (relative paths)</head>
<body data-root="" data-page="home">   <!-- sub-folders use data-root="../" -->
  <a class="sbc-skip" href="#main">Skip to main content</a>
  <div id="sbc-header"></div>
  <main id="main" tabindex="-1"> … page content … </main>
  <div id="sbc-footer"></div>
  <div id="sbc-toast" role="status" aria-live="polite"></div>
  <script defer src="js/config.js"></script> … (fixed order, §13.7) …
</body></html>
```
`layout.js` reads `body.dataset.root` to prefix links and assets, renders header/footer into the placeholders on `DOMContentLoaded`, injects an inline SVG icon sprite, and sets `aria-current`. A `<noscript>` block in each page supplies a minimal text navigation (Home, Products, Contact).

### 13.4 Page navigation approach
Plain relative `<a href>`; helper `U('product.html',{id:'x'})` builds root-aware URLs. Query strings carry state. No hash routing, no `history.pushState` page swaps except for filter state (`replaceState`). Back/forward must always behave natively.

### 13.5 Component reuse in vanilla JS
- Components are **pure functions returning HTML strings** (`productCard(p, opts)`), inserted via a single `render(el, html)` helper. **All dynamic text passes through `esc()`** (XSS-safe, including the search term echoed on screen).
- Behavior is attached with **event delegation** on stable containers (`data-action="add-to-cart" data-id="…"`).
- State lives in `store.js`; UI re-renders on custom events (`sbc:cart`, `sbc:wishlist`, `sbc:compare`, `sbc:session`) and the `storage` event for cross-tab sync.
- No custom elements/Shadow DOM (keeps CSS tokens and WordPress migration simple).

### 13.6 CSS architecture and naming
- **Layers by file** (order of `<link>`): tokens → base → layout → components → page.
- **Naming:** BEM-lite with prefix `sbc-`: `.sbc-card`, `.sbc-card__title`, `.sbc-card--compact`; state classes `.is-open`, `.is-active`, `.is-loading`, `.has-error`; JS hooks `.js-…` (never styled); layout helpers `.l-container`, `.l-grid`; utilities `.u-sr-only`, `.u-hide-mobile`.
- **Rules:** mobile-first media queries (`min-width`); no `!important` except `.u-sr-only`/`[hidden]`; no ID selectors for styling; no inline styles except dynamic values (progress widths) via CSS variables; logical properties where cheap (`margin-inline`) for future RTL-unrelated bidi safety.
- Max specificity: one class + one pseudo-class.

### 13.7 JavaScript organization and load order
Classic scripts (IIFE modules attaching to a single global `SBC`), loaded with `defer` in this order on every page:
`config.js → i18n/en.js → core/util.js → core/storage.js → data/*.js (only those needed) → core/store.js → core/validate.js → core/ui.js → layout.js → search.js → cards.js → [page-specific modules] → pages/<page>.js`.
Each module exposes a small API and must not reach into another module's internals. `pages/<page>.js` waits for `SBC.ready` (fires after layout render).

### 13.8 Asset management
- Logo: use the **supplied SBC logo (blue/green wifi-arcs mark with "SOUTH BANGLA computers" wordmark)**; place as `assets/img/logo.svg` (or PNG if SVG unavailable). Provide a one-color white version for dark backgrounds (client to supply, §18 Q2); until then use CSS `filter: brightness(0) invert(1)` on the footer logo.
- Icons: a single inline SVG sprite (24 px grid, 1.75 stroke) injected by `layout.js` (cross-file `<use>` references can fail on `file://`).
- Images: `config.ASSET_BASE` switches between local `assets/img/products/` and the remote demo base (§8.9); `imgUrl(file)` handles fallback. Every `<img>` has `onerror` handler to placeholder, explicit dimensions, and `alt`.
- Fonts: optional self-hosted Inter; system fallback must look acceptable.

### 13.9 Bangla-readiness (not built in v1, but must not be blocked)
- All UI strings come from `t('key')` reading `i18n/en.js` (v1 ships only English). Adding `i18n/bn.js` + a language switch later requires no template edits.
- `<html lang>` set from `config.LANG`. Layout must tolerate +30% string expansion and Bengali line-height ≥ 1.6; never use fixed-height text boxes or `text-transform: uppercase` as meaning-bearing.
- Font stack already includes Noto Sans Bengali fallback (§8.2). Currency stays `৳` with Western digits by default; digit-localization is a future setting.
- Content already in Bangla on the live site (the support-center notice) is rendered as supplied data (`lang="bn"` attribute on that element) to prove the font stack works.

### 13.10 Error handling
- `window.addEventListener('error'/'unhandledrejection')` → console + (in demo mode) a discreet toast "Something went wrong. Reload the page." Never a blank screen.
- `SBC.requireData(['products','categories'])` guards each page: on failure render the page-level error state (§10.21).
- Storage: all access via `storage.js` with try/catch and in-memory fallback.
- Defensive parsing of URL params (unknown ids/slugs → 404 state, not exceptions).

### 13.11 Performance budget (prototype)
| Item | Budget |
|---|---|
| JS per page (own code, uncompressed) | ≤ 120 KB (data files excluded) |
| `products.js` | ≤ 250 KB uncompressed |
| CSS total | ≤ 80 KB |
| LCP image | Preloaded, ≤ 150 KB |
| CLS | < 0.1 |
| Third-party scripts | **None** (no analytics, no fonts CDN, no libraries); YouTube only after click via `youtube-nocookie.com` |
Techniques: `defer`, passive scroll listeners, `IntersectionObserver` for lazy work, debounced input, DOM batch updates (`DocumentFragment`/single `innerHTML`), no layout thrash in scroll handlers, images `loading="lazy"` below the fold.

### 13.12 Testing strategy
1. **Smoke page** `tests/smoke.html`: loads all data and asserts: unique product ids; every product has existing category + brand; every `alternatives` id exists; every category has ≥ 1 product; required status mix (§12.5) met; no price below 0; no `isNew` on discontinued; prints PASS/FAIL list. No tools needed.
2. **Link integrity:** QA opens every page and clicks every header/footer link (manual) — plus an optional tiny script (`tests/links.html`) that lists all `href`s in a loaded page set via `fetch` **only when served over http**.
3. **Manual matrix:** Chrome, Firefox, Edge (current), Safari (current), Android Chrome, iOS Safari; widths 360/768/1024/1280/1536; keyboard-only run-through of J1–J4; screen-reader spot check (NVDA + VoiceOver) on PDP, checkout, dealer register.
4. **Automated accessibility pass (optional):** axe DevTools extension or Lighthouse on each template.
5. **State tests:** use demo controls to force error/empty/slow states.
6. **Regression:** reset demo data before each test run.

### 13.13 Notes for the later WordPress/WooCommerce rebuild
Keep these mappings stable now so migration is mechanical: product `id`/`slug` → WooCommerce product slug; `category` → `product_cat`; `brand` → a `product_brand` taxonomy; `attrs` → product attributes (filterable); `specs` groups → a repeatable ACF field group; `documents` → product downloads/ACF files; `status` → stock status (+ custom "discontinued"); dealer prices/MOQ → role-based pricing plugin or custom meta; dealer application → custom post type with status workflow. Product slugs on the live site (e.g., `/product/tenda-ax12-ax3000-dual-band-gigabit`) should be preserved for SEO.

---

## 14. Responsive requirements

| Area | < 480 (360 target) | 480–767 | 768–1023 | 1024–1279 | ≥ 1280 / 1536 |
|---|---|---|---|---|---|
| Container | 16 px gutter | 16 | 24 | 24 | 1280 max |
| Header | Logo, search icon, account, cart, hamburger; announcement bar single line, truncates with ellipsis | same | Two rows: logo+utilities / search; nav in hamburger | Single row, nav inline (condensed) | Full header (§6) |
| Product grid | 2 cols (compact card), list view default in listings | 2 | 3 | 3 (with sidebar) | 4 |
| Listing filters | Bottom sheet | Bottom sheet | Slide-in drawer | Sidebar 260 px | Sidebar 280 px |
| PDP | Stacked; sticky bottom buy bar | Stacked | 2 cols (gallery 55/45) | 2 cols | 2 cols; sticky buy box |
| Cart | List cards; sticky total bar | same | 2 cols (summary right) | 2 cols | 2 cols |
| Checkout | Single column; summary collapsible at top | same | 2 cols | 2 cols | 2 cols; sticky summary |
| Tables | Convert to stacked cards (data table, orders, spec tables keep 2-col label/value) | same | Horizontal scroll inside container | Normal | Normal |
| Compare | Horizontal scroll, sticky label col, 2 visible | 2–3 | 3–4 | 4 | 4 |
| Mega-menu | Accordion in drawer | same | Accordion | Hover/click panel | Hover/click panel |
| Hero | Stacked, image first, H1 36 px | same | Stacked | 2 cols | 2 cols |
| Footer | Accordion | Accordion | 3 cols | 5 cols | 5 cols |

**Global rules:** (1) **No horizontal page scroll at any width** ≥ 320 px (inner scroll containers excepted: compare table, wide data tables, chip rows). (2) Touch targets ≥ 44 × 44 px; spacing ≥ 8 px between targets. (3) Fluid media: `max-width:100%; height:auto`. (4) Text can be zoomed to 200% without loss of content/function (WCAG 1.4.4); reflow at 320 CSS px (1.4.10). (5) Orientation: both supported; no forced rotation. (6) Hover-only interactions are never the only path. (7) iOS safe-area: `padding-bottom: env(safe-area-inset-bottom)` for sticky bars. (8) **Print stylesheet** (`print.css`) for: order confirmation, order/invoice view, configurator proposal, compare table, policy pages — hide header/footer/toasts, black on white, URLs appended for links in policy pages.

---

## 15. Accessibility and SEO requirements

### 15.1 Accessibility target
**WCAG 2.2 Level AA** for all templates.

### 15.2 Checklist (prototype-level, mandatory)
| Area | Requirement |
|---|---|
| Semantics | Landmarks: `<header>`, `<nav aria-label>`, `<main id="main">`, `<aside>`, `<footer>`; lists for nav/cards; `<button>` for actions, `<a>` for navigation (never `div onclick`). |
| Headings | One `<h1>` per page; no skipped levels; card titles are `<h3>` inside sections with `<h2>`. |
| Skip link | First focusable element; visible on focus. |
| Keyboard | Everything operable; logical tab order; no keyboard traps except intentional modal/drawer traps with Esc exit; focus returns to trigger. |
| Focus visible | §8.8 on every interactive element. |
| Forms | Visible `<label for>`; required indicated in text; errors: `aria-invalid`, `aria-describedby`, summary `role="alert"`; autocomplete attributes (`name`, `email`, `tel`, `street-address`, `new-password`/`current-password`); input types (`tel`, `email`). |
| Images | Meaningful `alt` (§8.9); decorative `alt=""`; SVG icons `aria-hidden="true"` with adjacent text, or `role="img"` + label if standalone. |
| Color/contrast | §8.1; non-text UI ≥ 3:1; status not by color alone. |
| Motion | Respect `prefers-reduced-motion`; no auto-playing media; carousels avoided. |
| Dynamic updates | Live regions for cart count, result count, toasts. |
| Tables | `<th scope>`, `<caption>` (visually hidden OK). |
| Dialogs | `role="dialog" aria-modal="true" aria-labelledby`; focus trap; Esc. |
| Language | `lang="en"`; Bangla fragments `lang="bn"`. |
| Time limits | None. Toasts persist ≥ 4 s and pause on focus. |
| Target size | ≥ 24 × 24 CSS px (WCAG 2.2 minimum) — design target 44. |
| Authentication | No cognitive-test CAPTCHAs; allow paste in password fields (WCAG 3.3.8). |
| Drag | No drag-only interactions (qty/steppers use buttons). |

### 15.3 SEO and metadata (prototype)
- Unique `<title>` and `<meta name="description">` per template (static for most; for `product.html`, `category.html`, `brand.html`, `article.html` JS sets `document.title`, description and canonical on load — acknowledged as prototype-only).
- `<link rel="canonical">`: relative/placeholder in the prototype (`https://www.example.com/...` must **not** be shipped; use `href` of the current page).
- Open Graph/Twitter tags on `index.html`, `product.html` (title, description, image).
- `robots`: prototype pages carry `<meta name="robots" content="noindex">` so a hosted demo is not indexed.
- Heading hierarchy and descriptive link text ("View Tenda routers", not "click here").

### 15.4 Product structured data (considerations)
- **Prototype:** `product.html` may inject a sample `application/ld+json` `Product` block (name, image, sku, brand, description) for demonstration. **Do not emit `offers` with price while `DEMO_PRICING=true`** — demo prices must not be published as real offers.
- **Production:** `Product` + `Offer` (`priceCurrency: "BDT"`, `availability` mapped to schema.org URLs; omit `offers` for quote-only products), `BreadcrumbList`, `Organization` (name, logo, sameAs: Facebook/YouTube), `LocalBusiness`/`Store` entries per showroom, `FAQPage` where genuine Q&A exist, `Article` for guides. Validate with Google's Rich Results Test.

### 15.5 Images, performance, quality (prototype)
Responsive images: `srcset`/`sizes` where multiple widths exist (hero, news); otherwise single optimized file. Lazy-load below the fold; set dimensions; WebP preferred; ≤ 150 KB for gallery images in production. No unnecessary JS: no jQuery/libraries; pages without interactivity (policy pages) load only layout JS.

### 15.6 Prototype-level vs production-level requirements
| Concern | Prototype | Production |
|---|---|---|
| Header/footer rendering | JS templates | Server-rendered |
| Auth | localStorage demo | Server sessions, hashed passwords, MFA option for dealers |
| Payments | Simulated | PCI-compliant gateway (hosted pages/redirect), webhooks |
| Pricing/stock | Static demo data | ERP/inventory sync; dealer price lists |
| Dealer approval | Manual demo switch | Admin workflow, document storage, audit log, email notifications |
| Files | Metadata only | Virus-scanned, private object storage |
| Search | Client-side contains-match | Indexed search (typo tolerance, synonyms, analytics) |
| SEO | noindex, JS-set titles | Server-side metadata, XML sitemap, redirects, schema |
| Security | n/a (no real data) | HTTPS/HSTS, CSP, CSRF, rate limiting, input sanitization, privacy compliance |
| Analytics | None | Consent-based analytics |
| Email/SMS | None | Transactional email/SMS provider |

---

## 16. Implementation phases

Order is mandatory: each phase must pass its completion criteria before the next starts. **Visual quality and complete journeys take priority over breadth.**

| Phase | Name | Pages | Components | Dependencies | Completion criteria | Main risks |
|---|---|---|---|---|---|---|
| **1** | Core storefront & homepage | P01 Home, P48 404 | C01–C09, C11–C14, C27–C31, C37–C39; tokens, base, layout, config, util, storage, store (read-only), data files (products, categories, brands), search (C04) | None | Home matches §6 at all breakpoints; header/footer on all pages; search suggestions work; smoke test passes; disclosure modal works | Design polish takes longer than planned; logo/brand assets missing → use text wordmarks |
| **2** | Product browsing & detail | P02, P03, P04, P05, P06, P07 | C15–C22, C33, C32; filters engine; gallery/lightbox; compare tray; wishlist | Phase 1 | Filtering/sorting/pagination consistent with URL; PDP states all render (incl. discontinued AX12 Pro); compare max-4 and category rule; wishlist persists | Facet logic complexity; mismatch between demo `attrs` and facets → define attrs per category first |
| **3** | Cart, checkout, quote, configurator | P08, P09, P10, P11, P12 | C23–C25, C10, C35 (for quote attachments optional), C26 (basic) | Phase 2 | J1 and J2 complete end-to-end; validation per §10.9; simulated failure path; totals correct; configurator 4 steps | Delivery/payment rules are business decisions → keep as config; configurator rules need product knowledge → keep a short rule table, flag as demo |
| **4** | Customer account | P13–P20 | C26, C34, address modal, auth guard | Phase 3 | Register/login/logout; orders created in Phase 3 appear in history; status timeline; address CRUD; password recovery demo | Perceived "real" auth → keep disclosure visible |
| **5** | Dealer registration & dashboard | P21–P31 | C35, C10, C42, dealer layout variant, bulk-order parser | Phase 4 | J3 and J4 complete with all four application outcomes; dealer pricing hidden from non-dealers; bulk parser validations; CSV demo | Pricing/MOQ ambiguity (§18) → configurable demo values; dealer UX scope creep |
| **6** | Supporting pages & content | P32–P47 | C32, C40, C41, C43, policy template | Phase 1 | All 48 templates exist and link correctly; placeholder policy pages carry "Draft" tags; downloads page filters work; news seeded | Content availability (policy text, team photos) → placeholders + clear tags |
| **7** | Responsive QA & polish | All | — | Phases 1–6 | §17 checklist 100% pass; Lighthouse A11y ≥ 95, Best Practices ≥ 95, Perf ≥ 90 on Home, Listing, PDP (local server); zero console errors; cross-browser matrix done | Last-minute layout regressions → freeze features before Phase 7 |

---

## 17. QA and acceptance checklist

### 17.1 Global
- [ ] All 48 templates in §4 exist and render without console errors.
- [ ] Every internal link in header/footer/body resolves to an existing template (no 404s except the intentional 404 test).
- [ ] Disclosure modal appears on first visit and is dismissible; "Reset demo data" works.
- [ ] "Prototype — simulated data" strip is on every page.
- [ ] No fake testimonials, awards, team names, or unverified statistics anywhere; all claims trace to `site-claims.js` with `approved` flag.
- [ ] All prices show the "Demo price" tag while `DEMO_PRICING=true`.
- [ ] All proposed business rules (payments, dealer benefits, delivery fees, MOQ) are visibly tagged *Proposed* or *Demo* where a user could mistake them for fact.

### 17.2 Functional (Given/When/Then examples)
| ID | Scenario | Expected |
|---|---|---|
| F-01 | Type "ax12" in header search | Suggestions list includes Tenda AX12 Pro (model match first); Enter opens full results |
| F-02 | Apply filters Switch → PoE=yes → 24 ports | Only matching items, URL updated, chips shown, count correct; reload restores state |
| F-03 | Add a product from PDP with qty 3 | Cart count = 3; cart page shows line total = 3 × unit; reload preserves |
| F-04 | Add out-of-stock product | Add disabled; "Notify me" shows simulated toast |
| F-05 | Open discontinued AX12 Pro | No Add/Quote; alternatives panel; no "New" badge |
| F-06 | Compare 5th product | Toast "up to 4"; mixed category prompt works |
| F-07 | Guest checkout with invalid phone | Field error, focus on first invalid field, no order created |
| F-08 | Complete checkout | Order `SBC-DEMO-…` created, cart cleared, confirmation shows data, order visible in account (if logged in) |
| F-09 | Dealer registration step 4 upload `.exe` | Rejected with file-type message |
| F-10 | Dealer approval simulation → Approved | Dealer login works; dashboard accessible |
| F-11 | Logged-in retail customer opens `dealer/pricing.html` | Redirected to dealer login; no dealer prices exposed anywhere |
| F-12 | Bulk order paste with unknown model and below-MOQ row | Row-level errors shown; valid rows addable |
| F-13 | Simulate payment failure | Inline error, entered data preserved |
| F-14 | Configurator: Office, 25 devices, PoE | Recommended list produced; add all to cart works; proposal has no prices |
| F-15 | Localstorage blocked (private mode) | One-time toast; app still usable in-memory |

### 17.3 Accessibility
- [ ] Keyboard-only completion of J1, J3, J4.
- [ ] Focus visible everywhere; modals trap and restore focus.
- [ ] Screen reader announces: search results count, cart updates, form errors, toasts.
- [ ] Contrast verified for all token pairs (§8.1) with a checker; results recorded.
- [ ] Zoom 200% and 320 px reflow OK.
- [ ] `prefers-reduced-motion` honored.

### 17.4 Responsive
- [ ] 360, 768, 1024, 1280, 1536 verified for Home, Listing, PDP, Cart, Checkout, Dealer register, Dealer bulk order.
- [ ] No horizontal page scroll; tap targets ≥ 44 px; sticky bars respect safe areas.

### 17.5 Performance
- [ ] Lighthouse (local server, mobile): Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 90 on Home, Listing, PDP.
- [ ] CLS < 0.1; no third-party requests (except click-to-load YouTube).

### 17.6 Content & data integrity
- [ ] Smoke test passes (§13.12).
- [ ] Every component used on a page appears in §9 (undefined-component audit).
- [ ] Product names match §12.3 and typos policy applied.

### 17.7 Definition of Done
A phase is done when: all its pages exist, linked from nav where applicable; acceptance criteria met; no console errors; checklist items relevant to the phase pass; README updated.

---

## 18. Assumptions and questions requiring client approval

### 18.1 Working assumptions used in the prototype
| ID | Assumption | Consequence if wrong |
|---|---|---|
| A1 | Catalogue = networking, fiber/PON, CCTV, power, cabling, fiber tools, peripherals (as on the live site) | Category tree/demo data change |
| A2 | Retail prices may be shown (as *demo*) and carts exist | If SBC is quote-only: set `PRICE_MODE='quote'` — UI already supports it |
| A3 | Dealer pricing is a discount on retail with MOQ/pack rules | Pricing table/logic changes |
| A4 | Dealers need a separate approval and login | If dealers are handled offline only, reduce Phase 5 |
| A5 | English-first; Bangla later | Add `bn.js` and switch |
| A6 | Existing logo and the blue/green mark are retained | Palette adjustment |
| A7 | Prototype is for internal pitch, not public traffic | Add `noindex` (already) |

### 18.2 Questions for the client (decision owner → default used)
| ID | Question | Owner | Default used in prototype |
|---|---|---|---|
| Q1 | Does SBC sell laptops, desktops, CPUs, motherboards, RAM/SSD, GPUs? The live catalogue shows none. | Management | **No**; excluded |
| Q2 | Provide logo files (SVG, white version), brand colors (exact blue/green), brand guidelines, and photography | Marketing | Navy/blue tokens in §8.1; placeholder logo handling |
| Q3 | Confirm the "Mission" brand name, logo and relationship (it is absent from the live brand menu) | Management | Placeholder brand tile flagged `placeholder:true` |
| Q4 | Retail model: public prices + cart, **or** quote-only, **or** hybrid (prices for some categories)? | Management/Sales | Hybrid demo with toggle |
| Q5 | Dealer program: eligibility, pricing structure (flat discount vs tiers vs price lists), benefits | Sales | Demo discount (~12%) + example tier, tagged *Proposed* |
| Q6 | MOQ and pack-size rules per product/category; credit terms and credit limits | Sales/Finance | Demo MOQ values; no credit shown |
| Q7 | Price display: VAT inclusive/exclusive wording; currency formatting preference | Finance | "Inclusive of VAT*" placeholder |
| Q8 | Delivery: charges by area, couriers, which locations allow pickup, COD limits, delivery times | Operations | Demo ৳120/৳200/pickup ৳0; 5 showrooms for pickup |
| Q9 | Policy text: warranty, returns/refunds, shipping, privacy, terms (legal review) | Legal/Ops | Draft placeholders, tagged |
| Q10 | Dealer documents required and approval SLA; who reviews applications | Sales Ops | Proposed list (trade license, TIN, NID, shop photo) |
| Q11 | Support hours, response SLA for quotes ("within 1 business day"?), the "1-hour warranty decision" promise wording | Support | Live-site wording with *to confirm* |
| Q12 | Data quality: who maintains product data; correct known typos (SFP+, "Recgarageable", duplicated brand words) | Product/IT | Preserved in demo; flagged |
| Q13 | Provide/confirm sitemap.xml, analytics, existing URL structure to preserve; any other live pages not inspected | IT | Assumed template reuse for non-inspected pages |
| Q14 | Access to 3–5 customers/dealers for interviews to validate personas | Management | Personas are hypotheses |
| Q15 | Are company claims (26+ years, 500+ products, 200+ corporate clients, 400+ resellers, 12 h support) approved for public use and verifiable? | Management | Not displayed as statistics except 1999 founding; others in `site-claims.js` unapproved |
| Q16 | Is online payment desired at launch? Which providers (bKash, Nagad, SSLCommerz, bank)? | Finance | COD/bank/wallet *proposed*; card "coming soon" |

---

## 19. Final Antigravity implementation instruction

> **Read this section first and obey it literally. The sections above are the specification.**

### 19.1 Mission
Build the static, interactive frontend prototype described in this document for South Bangla Computers: **HTML5, CSS3, Vanilla JavaScript only**. No React/Vue/Angular, no jQuery, no CSS framework, no build tools, no backend, no CDN dependencies.

### 19.2 Non-negotiable rules
1. **Deliver 48 pages** exactly as listed in §4/§13.2. Do not add, rename, or omit pages.
2. Must run by opening `index.html` directly (file://) **and** through a local server. Use the architecture in §13 (JS-rendered header/footer, `.js` data files, classic scripts). **Do not use `fetch()` for local files or ES modules** in the site itself (the optional `tests/links.html` tool is the only exception and works only over http).
3. Implement the **design tokens** (§8) in `css/tokens.css` and use them everywhere; no raw hex values in component CSS.
4. Implement every section of the homepage in §6 in order (12 sections). **No hero carousel.**
5. Use the **seed catalogue** (§12.3) and schema (§12.5). Products not verified are demo data and must carry `demo:true`. Use the AX12 Pro record (§12.4) as the discontinued-state example.
6. Implement all behaviors in §10 and flows in §11, including all error/empty/loading states.
7. **Simulation honesty:** show the disclosure modal, footer strip, "Demo price" tags, and demo control panel (§10.20). **Never** present anything as a real transaction; never render card-number fields; never store real credentials guidance.
8. **Do not invent content:** no testimonials, awards, team names/photos, statistics, partner logos, or policy text beyond the placeholders defined here. Use clearly tagged placeholders.
9. **Accessibility is a requirement, not polish** (§15): semantic HTML, keyboard support, visible focus, labels, live regions, contrast.
10. **No third-party scripts or fonts** (YouTube only after click via `youtube-nocookie.com`). Images: follow §8.9 with local placeholder fallback.
11. Use **only** the file/CSS/JS naming conventions in §13.5–§13.7.
12. Do not exceed the performance budgets in §13.11.

### 19.3 Order of work
Follow §16 strictly: Phase 1 → 7. After each phase: (a) open the smoke test, (b) run the relevant §17 checks, (c) fix defects, (d) update `README.md`, (e) only then continue.

### 19.4 Visual quality bar
The result must look like a premium, calm, trustworthy product designed by a professional team: strong hierarchy, consistent 4-pt spacing, restrained blue/navy palette, 8 px max radius (§8.3), subtle shadows (§8.8), **no** gradients, glassmorphism, oversized empty sections, bouncing/parallax motion, or emoji as icons. Prefer clean photography/product images on neutral backgrounds. When in doubt, choose less decoration.

### 19.5 When the spec is ambiguous
Prefer (1) the explicit rule in this document, (2) the live-site behavior documented in §2.2, (3) the simplest accessible solution. **Do not ask the user mid-build for details already decided here.** Record any deviation in `README.md` under "Deviations".

### 19.6 Required deliverables
- Complete project folder per §13.2 and a `README.md` with: how to run (file:// and local server), demo credentials (customer, dealer), how to use demo controls, data sources and what is verified vs demo, known limitations, deviations from the spec.
- `tests/smoke.html` implemented per §13.12.
- A final report listing: pages built (48/48), checklist results (§17), Lighthouse scores for Home/Listing/PDP, browsers tested, open questions (§18).

### 19.7 Definition of success
The prototype can be demonstrated to SBC's management end-to-end: **(J1)** browse → filter → compare → cart → checkout → confirmation; **(J2)** configurator → quote; **(J3)** dealer application → simulated approval → login; **(J4)** dealer pricing → bulk order → order history — on desktop and a 360 px phone, with no console errors and without a single claim that is not either verified (live-site) or labelled demo/proposed.

---

## Appendix A — Document audit log (performed 21 October 2026)

The brief required an audit for missing pages, contradictions, undefined components, unrealistic functionality and journey gaps. Checks were run with a script over this file plus a manual read.

| Check | Method | Result |
|---|---|---|
| Section cross-references (`§x.y`) resolve | Script | 44 distinct references, **0 unresolved** |
| Sitemap (§4.1) vs directory tree (§13.2) | Script | **48 / 48 pages match**; only extra file is `tests/` tooling |
| Every template has a spec (P01–P48) | Script | **All 48 IDs present** |
| Every phase covers pages | Manual | P01–P48 allocated across Phases 1–6 with none unassigned |
| Questions referenced vs defined (Q1–Q16) | Script | **All defined** |
| Components referenced vs defined (C01–C43) | Script | **None undefined** |
| Customer journey gaps | Manual | Guest checkout, failure path, confirmation, tracking covered |
| Dealer journey gaps | Manual | All four application outcomes, dealer-only price visibility, bulk order covered |
| Unrealistic functionality | Manual | Real auth/payment/approval/inventory are explicitly simulated (§10.20, §15.6) |

**Defects found by the audit and fixed in this version**
1. Brand count was stated as 13 in one place and 14 in another → corrected to 14 (matches the live menu).
2. Template count was 47 against 48 listed pages → corrected to 48 and `404.html` given its own ID (P48).
3. A seed-catalogue count mismatch → heading now reflects the actual row count (53).
4. Ambiguous wording in the image-background rule, password storage note and card-payment row → rewritten.
5. `Intl` lakh-grouping reliance removed in favor of a manual formatter.
6. The `fetch()` prohibition conflicted with the optional link-check tool → exception documented.
7. The `/products` observation now states that the fetched text was truncated.

**Known residual risks (not defects, but the reader should know)**
- Every page marked "Nav only" in §3 (13 of the 14 brand pages, news, galleries, tutorials, about, contact, branches, support and others) was **not opened**; their content and any hidden functionality are unknown. The blueprint treats them as template-equivalent where stated.
- `sitemap.xml` and `robots.txt` were not retrieved.
- Contrast ratios in §8.1 are hand-calculated approximations and must be confirmed with a checker.
- Demo prices, MOQs, delivery charges, and dealer discounts are invented for demonstration and carry no business meaning.
- Dealer program benefits and payment methods are proposals until the client confirms (§18).
