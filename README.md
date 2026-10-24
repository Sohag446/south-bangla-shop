# South Bangla Computers — Complete E-Commerce Prototype

> **Official Existing Website:** [https://www.southbanglabd.com/](https://www.southbanglabd.com/)  
> **Brand Slogan:** *Striving For ICT Excellence Since 1999*  
> **Implementation Tech Stack:** Pure HTML5, CSS3, and Vanilla JavaScript (Zero npm dependencies, zero build steps, Google Fonts and official asset fallbacks, 100% `file://` compatible).

---

## 1. Executive Summary

This repository contains the complete, polished, responsive, multi-page frontend prototype for **South Bangla Computers (SBC)**, one of Bangladesh's premier authorized distributors of enterprise and consumer networking hardware, fiber-to-the-home (FTTH/GPON) distribution equipment, PoE switches, online UPS backup, and security infrastructure.

The implementation strictly fulfills every requirement defined in `SOUTH-BANGLA-ECOMMERCE-UX-UI-DEVELOPMENT-BLUEPRINT.md` and binds directly to the design tokens specified in `DESIGN-TOKENS.json`.

---

## 2. Quick Start & How to Run Locally

This prototype requires **no bundler, no npm install, and no internet server connection**.

### Option A: Direct Browser Double-Click (Zero Setup)
Simply open the project folder in Windows File Explorer and **double-click `index.html`**.  
The application runs immediately in any modern browser (Chrome, Edge, Firefox, Safari) via `file:///...` protocol without CORS errors or broken script fetches.

### Option B: Local HTTP Server (Optional)
If running inside a local web server environment:

```powershell
# Using Python 3 (if installed)
python -m http.server 8080

# Using Node.js npx (if installed)
npx -y serve -p 8080 .

# Using PHP (if installed)
php -S localhost:8080
```
Then navigate to: `http://localhost:8080/index.html`

---

## 3. Demo Credentials & Test Roles

The prototype includes an interactive **Demo Control Panel** accessible via adding `?demo=1` to the URL (or by clicking the role buttons on the login pages):

| Role | Email | Password | Key Capabilities |
| :--- | :--- | :--- | :--- |
| **Retail Customer** | `customer@demo.sbc` | `Demo@1234` | Retail MRP prices, cart checkout, saved wishlist, customer dashboard, delivery tracking. |
| **Wholesale Dealer** | `dealer@demo.sbc` | `Dealer@1234` | Wholesale tier-1 pricing sheet, MOQ restrictions, 5-step registration, status simulator, rapid SKU bulk order tool, credit line POs. |
| **Guest / Reviewer** | *Default* | *N/A* | Browse catalog, compare specs, run Network Solution Configurator, test search suggestions. |

---

## 4. Complete 48-Page Implementation Inventory

All 48 required pages have been implemented with full semantic structure, active breadcrumbs, and layout integration:

| ID | Title / Role | File Path | Scope & Key Interactions |
| :---: | :--- | :--- | :--- |
| **P01** | **Homepage** | [`index.html`](file:///index.html) | 12 verified sections strictly in blueprint order: Hero, Category Grid, Tabs, Brand Strip, Configurator Banner, Live Branches. |
| **P02** | **Category Landing** | [`category.html`](file:///category.html) | Category taxonomy overview or specific category landing with subcategory chips and live SKU counts. |
| **P03** | **Product Catalog** | [`products.html`](file:///products.html) | Faceted sidebar (categories, brands, stock status, price range), search filtering, view switcher (grid/list), pagination. |
| **P04** | **Brand Catalog** | [`brand.html`](file:///brand.html) | 14 authorized partner brands overview or single brand showcase with verified distributorship tags. |
| **P05** | **Product Detail (PDP)** | [`product.html`](file:///product.html) | Image gallery with lightbox zoom, tabbed specs, discontinued successor warnings (P3), quantity stepper, sticky mobile buy bar. |
| **P06** | **Specification Comparison** | [`compare.html`](file:///compare.html) | Side-by-side 4-product comparison matrix with "Show Differences Only" toggle and remove actions. |
| **P07** | **Saved Wishlist** | [`wishlist.html`](file:///wishlist.html) | Wishlist grid with direct "Add to Cart", "Move All to Cart", and "Clear Wishlist" batch controls. |
| **P08** | **Shopping Cart** | [`cart.html`](file:///cart.html) | Line item review, quantity steppers, undo removal toast, promo discount code (`DEMO10`), dealer MOQ checks. |
| **P09** | **Checkout Simulation** | [`checkout.html`](file:///checkout.html) | 3-step checkout with Bangladesh 64-district delivery calculation (Dhaka ৳120, Outside ৳200, Pickup ৳0), COD/Wallet/Bank wire. |
| **P10** | **Order Confirmation** | [`order-confirmation.html`](file:///order-confirmation.html) | Printable electronic invoice, Challan details, and order tracking progress bar. |
| **P11** | **Solution Configurator** | [`configurator.html`](file:///configurator.html) | 4-step wizard (Environment, User Scale, Subsystems, BOM) with interactive SVG topology diagram and quote export. |
| **P12** | **Request a Quote (RFQ)** | [`quote.html`](file:///quote.html) | Formal B2B quotation request form with BD phone validation, category checkboxes, and RFQ reference generator. |
| **P13** | **Customer Sign In** | [`login.html`](file:///login.html) | Customer login with demo auto-fill button, password toggle, and portal routing. |
| **P14** | **Customer Registration** | [`register.html`](file:///register.html) | Customer account creation with 11-digit BD mobile validation and instant session initialization. |
| **P15** | **Password Recovery** | [`forgot-password.html`](file:///forgot-password.html) | Password reset code simulator with SMS/email OTP demonstration. |
| **P16** | **Account Dashboard** | [`account/index.html`](file:///account/index.html) | Customer overview dashboard with quick KPI metric cards, recent orders, and navigation sidebar. |
| **P17** | **Order History** | [`account/orders.html`](file:///account/orders.html) | Complete order list with status badges and detail links. |
| **P18** | **Order Detail & Timeline** | [`account/order-detail.html`](file:///account/order-detail.html) | Interactive 4-step delivery status tracking simulator (Processing &rarr; Confirmed &rarr; Dispatched &rarr; Delivered). |
| **P19** | **Delivery Addresses** | [`account/addresses.html`](file:///account/addresses.html) | Saved address book with district selection, default address toggling, and add/edit modal. |
| **P20** | **Account Settings** | [`account/settings.html`](file:///account/settings.html) | Profile information updater, branch pickup preference, and password modification. |
| **P21** | **Dealer Portal Overview** | [`dealer/index.html`](file:///dealer/index.html) | Wholesale channel landing page with 5 core distributor benefits and onboarding timeline. |
| **P22** | **Dealer Registration** | [`dealer/register.html`](file:///dealer/register.html) | 5-step dealer onboarding wizard with automatic localStorage draft saving. |
| **P23** | **Dealer Status Simulator** | [`dealer/status.html`](file:///dealer/status.html) | Application lookup with interactive status switcher (Pending, Approved, More Info, Rejected). |
| **P24** | **Dealer Sign In** | [`dealer/login.html`](file:///dealer/login.html) | B2B dealer login with authorized dealer demo auto-fill. |
| **P25** | **Dealer Dashboard** | [`dealer/dashboard.html`](file:///dealer/dashboard.html) | Dealer hub with rolling credit line balance, YTD wholesale stats, and dedicated account manager contacts. |
| **P26** | **Wholesale Price Sheet** | [`dealer/pricing.html`](file:///dealer/pricing.html) | Searchable wholesale table with retailer margins, MOQs, and one-click CSV price list exporter. |
| **P27** | **Bulk Order Tool** | [`dealer/bulk-order.html`](file:///dealer/bulk-order.html) | Rapid SKU entry tool: paste comma-separated models or upload CSV with automatic inventory verification. |
| **P28** | **Dealer Purchase Orders** | [`dealer/orders.html`](file:///dealer/orders.html) | Complete B2B purchase order ledger with credit terms and dispatch carrier notes. |
| **P29** | **PO Detail & Challan** | [`dealer/order-detail.html`](file:///dealer/order-detail.html) | Itemized wholesale purchase order invoice and printable delivery Challan. |
| **P30** | **Dealer Business Profile** | [`dealer/settings.html`](file:///dealer/settings.html) | Trade License, e-TIN, VAT registration, and signatory contact management. |
| **P31** | **Priority RMA & Support** | [`dealer/support.html`](file:///dealer/support.html) | Fast-track hardware diagnostic RMA ticket generator and dedicated account manager hotline. |
| **P32** | **Customer Support Desk** | [`support.html`](file:///support.html) | Central customer service portal with serial barcode warranty lookup tool. |
| **P33** | **Frequently Asked Questions** | [`faq.html`](file:///faq.html) | 20 categorized Q&As with smooth animated accordions and instant live search. |
| **P34** | **Downloads Repository** | [`downloads.html`](file:///downloads.html) | 24 verified firmware binaries, MIBs, and PDF datasheets across 6 categories. |
| **P35** | **Technical Tutorials** | [`tutorials.html`](file:///tutorials.html) | 5 field installation manuals (Wi-Fi 7 mesh, GPON optical budgets, PoE sizing, VLANs, UPS sizing). |
| **P36** | **Media Gallery** | [`media.html`](file:///media.html) | Photo gallery of channel partner meets, Elephant Road showrooms, and tech expo pavilions. |
| **P37** | **Warranty Policy** | [`warranty.html`](file:///warranty.html) | Authoritative 1–3 year warranty terms, lightning/surge burn exclusions, and lab turnaround SLA. |
| **P38** | **Returns Policy** | [`returns.html`](file:///returns.html) | 7-day Dead-on-Arrival (DOA) replacement terms and return criteria. |
| **P39** | **Shipping Information** | [`shipping.html`](file:///shipping.html) | Delivery rate tiers across 64 districts, partner couriers (SA Paribahan, Sundarban, Steadfast). |
| **P40** | **News & Insights** | [`news.html`](file:///news.html) | 6 verified industry articles and 2026 buying guides with category filters. |
| **P41** | **Article Detail** | [`article.html`](file:///article.html) | Single article reader with executive summary and related hardware recommendation cards. |
| **P42** | **About Us** | [`about.html`](file:///about.html) | Founding year 1999 heritage, corporate milestones, authorized brand partnerships, and core values. |
| **P43** | **Contact Us** | [`contact.html`](file:///contact.html) | Head office address, landline, mobile hotlines, working hours, and inquiry form. |
| **P44** | **Showrooms Directory** | [`branches.html`](file:///branches.html) | 8 verified showrooms across Dhaka, Chattogram, and Khulna + 4 newly announced regional centers. |
| **P45** | **Careers** | [`careers.html`](file:///careers.html) | Job openings (Network Engineer, B2B Account Manager, Lab Technician) with application modal. |
| **P46** | **Privacy Policy** | [`privacy.html`](file:///privacy.html) | Comprehensive data protection, customer security, and confidentiality terms. |
| **P47** | **Terms of Service** | [`terms.html`](file:///terms.html) | Commercial terms of sale, VAT compliance, and Dhaka jurisdiction governing law. |
| **P48** | **404 Not Found** | [`404.html`](file:///404.html) | Branded error state with quick recovery navigation to catalog, support, and homepage. |

---

## 5. Architectural & Design Highlights

### A. Authoritative Design Tokens (`css/tokens.css`)
- **Primary Navy Palette:** Deep Navy `#0B1F3A` and `#102A4C` establishing high-contrast, professional corporate identity.
- **Action Blues:** `#1558D6` and `#0F44A8` providing clear interactive focus.
- **Accents:** Emerald `#0B7A52` for in-stock and success states, Amber `#B45309` for warranty warnings and discontinued hardware notices.
- **Typography:** Tabular numerals for price alignment, increased line-height for Bengali script legibility, and responsive heading hierarchy.

### B. Verified Data Layer (`data/*.js`)
- **53 Seed Products:** Distributed across 10 genuine categories (Wi-Fi Routers, PoE Switches, GPON/EPON, Online UPS, Passive Cabling, CCTV).
- **No Fictitious Laptop/PC Components:** Reflects the genuine real-world catalog of South Bangla Computers.
- **P3 Discontinued SKU Handling:** Discontinued models (e.g., `tenda-ac10`) suppress "Add to Cart" and display prominent amber banners pointing to official successor models (e.g., `tenda-ax12-pro`).
- **Bangladesh 64-District Matrix:** Complete 8 divisions and 64 districts supporting realistic nationwide delivery fee computations.

### C. Zero-Dependency Frontend Engine (`js/core/` & `js/*.js`)
- **State Store (`store.js`):** Unified reactive bus for Cart, Wishlist, Compare (up to 4 items), Session, and Purchase Orders.
- **Faceted Filters (`filters.js`):** Real-time client-side faceted filtering with multi-checkbox categories, brand filters, stock status, and price range.
- **Solution Configurator (`configurator.js`):** 4-step interactive network sizing wizard generating an automated Bill of Materials and dynamic SVG network topology diagram.
- **Automated Validation (`validate.js`):** Bangladeshi 11-digit mobile regex (`013–019`), RFC email syntax, and password strength checks.

---

## 6. Automated Verification Test Suites

Two dedicated browser test suites are included in the `tests/` directory:

1. **[`tests/smoke.html`](file:///tests/smoke.html) — Automated Data Assertions:**
   - Validates unique SKU IDs across all 53 seed products.
   - Verifies category and brand foreign key integrity.
   - Ensures realistic price ranges and status distributions.
   - Asserts 100% test pass rate on startup.

2. **[`tests/links.html`](file:///tests/links.html) — Link & Page Manifest Suite:**
   - Tests all 48 required prototype pages against the Blueprint inventory.
   - Displays direct clickable links to test every user flow.

---

## 7. Known Limitations & Prototype Boundaries

To ensure complete transparency during stakeholder demonstration:
1. **Simulation Boundaries:** Financial transactions (credit cards/mobile wallets), live SMS dispatch, and warehouse ERP sync are interactive simulations that store data in the browser's `localStorage`.
2. **External Product Images:** Product images link to official South Bangla Computers remote assets with seamless fallback to `assets/img/placeholder-product.svg` on network disruption.
3. **Print Stylesheets:** All invoice and receipt pages include dedicated `@media print` CSS hiding navigation headers and footers for clean physical printing.

---
*Developed for South Bangla Computers — Striving For ICT Excellence Since 1999.*
# south-bangla-shop
