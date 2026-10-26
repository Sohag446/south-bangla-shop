/**
 * South Bangla Computers — English Dictionary & Localization Engine
 * Secondary Language System
 */
window.SBC = window.SBC || {};
window.SBC.i18n = window.SBC.i18n || {};

// Register Bengali dictionary if already loaded, or auto-fetch it dynamically
if (window.SBC_I18N_BN) {
  window.SBC.i18n.bn = window.SBC_I18N_BN;
} else if (typeof document !== "undefined") {
  const isSubdir = window.location.pathname.includes("/account/") || window.location.pathname.includes("/dealer/");
  const script = document.createElement("script");
  script.src = (isSubdir ? "../" : "") + "js/i18n/bn.js";
  script.onload = function () {
    if (window.SBC_I18N_BN) {
      window.SBC.i18n.bn = window.SBC_I18N_BN;
      if (window.SBC && window.SBC.i18n && typeof window.SBC.i18n.translatePage === "function") {
        window.SBC.i18n.translatePage();
      }
    }
  };
  document.head.appendChild(script);
}

window.SBC.i18n.en = {
  // Site Info & Topbar
  "site.title": "South Bangla Computers",
  "site.tagline": "Striving For ICT Excellence Since 1999",
  "topbar.phone": "+88 09639 257 121",
  "topbar.email": "info@southbanglabd.com",
  "topbar.location": "Elephant Road, Dhaka",
  "topbar.trackOrder": "Track Order",
  "topbar.support": "Support",
  "topbar.faq": "FAQ",
  "topbar.language": "Language",
  "topbar.currentLang": "English",

  // Announcement & Dealer
  "announcement.dealerActive": "DEALER ACTIVE",
  "announcement.dealerPortal": "Dealer Portal →",
  "announcement.bulkOrder": "Bulk Order Tool",
  "announcement.logout": "Logout",
  "announcement.officialDistributor": "Official Authorized Distributor Bangladesh — Mechanical Keyboards, Mice & Networking Hardware",

  // Header & Search
  "header.searchPlaceholder": "Search products, brands and models...",
  "header.myAccount": "My Account",
  "header.loginRegister": "Login / Register",
  "header.dashboard": "Dashboard",
  "header.dealerPortal": "Dealer Portal",
  "header.wishlist": "Wishlist",
  "header.cart": "Cart",

  // Primary Navigation
  "nav.home": "Home",
  "nav.about": "About Us",
  "nav.shop": "Shop",
  "nav.brands": "Brands",
  "nav.solutions": "Solutions",
  "nav.dealers": "Dealers",
  "nav.support": "Support",
  "nav.learn": "Learn",
  "nav.contact": "Contact",
  "nav.becomeDealer": "Become a dealer",
  "nav.allSkus": "All 500+ Catalog SKUs →",
  "nav.hardwareCatalog": "Hardware Catalogue & Equipment",
  "nav.hardwareCatalogSub": "Authentic ICT devices, passive optical equipment & enterprise power backup",
  "nav.categories": "Categories",
  "nav.quickLinks": "Quick Links",

  // Categories
  "cat.all": "All Categories",
  "cat.routersWifi": "Routers & Wi-Fi",
  "cat.switches": "Switches & PoE",
  "cat.fiberPon": "Fiber, PON & ONU",
  "cat.wirelessOutdoor": "Access Points & Outdoor",
  "cat.securityCctv": "CCTV & Security",
  "cat.powerBackup": "Power & Backup (UPS)",
  "cat.cablingRacks": "Cabling & Server Racks",
  "cat.fiberTools": "Fiber Tools & Splicers",
  "cat.peripheralsAudio": "Peripherals & Audio",
  "cat.computerAccessories": "Computer Accessories",

  // Common Product Card Terms
  "common.new": "New",
  "common.addToCart": "Add to Cart",
  "common.requestQuote": "Request Quote",
  "common.viewDetails": "View Details",
  "common.compare": "Compare",
  "common.wishlist": "Wishlist",
  "common.inStock": "In Stock",
  "common.lowStock": "Low Stock",
  "common.outOfStock": "Out of Stock",
  "common.discontinued": "Discontinued",
  "common.preorder": "Pre-order",
  "common.demoPrice": "Demo price",
  "common.dealerPrice": "Dealer price",
  "common.priceOnRequest": "Price on Request",
  "common.viewAlternatives": "View Alternatives",
  "common.notifyMe": "Notify Me",
  "common.allProducts": "All Products",
  "common.warranty": "Warranty",
  "common.model": "Model",
  "common.productsCount": "Products",
  "common.filter": "Filter",
  "common.sortBy": "Sort by:",
  "common.bdt": "৳",

  // Meetion Brand Focus (Highlighted Partner)
  "meetion.tag": "Featured Partner Brand",
  "meetion.title": "Meetion Gaming & Office Gear",
  "meetion.subtitle": "Official Authorized Bangladesh Distributor — Pro Mechanical RGB Keyboards, Silent Wireless Mice, Surround Gaming Headsets & Ergonomic Office Combos.",
  "meetion.badge": "Official Bangladesh Distributor",
  "meetion.viewAll": "View All Meetion Products",
  "meetion.guarantee": "100% Genuine • Official Direct Replacement Warranty",
  "meetion.explore": "Explore Meetion Catalog",
  "meetion.flagship": "Flagship Mechanical Keyboard",
  "meetion.rechargeable": "Rechargeable Dual-Mode Mouse",
  "meetion.noiseCancelling": "Noise-Cancelling RGB Headset",

  // Mega Menu Meetion Promotional Ads
  "ad.meetionBadge": "OFFICIAL DISTRIBUTOR",
  "ad.meetionTitle": "Meetion Gaming & Ergonomic Gear",
  "ad.meetionDesc": "Mechanical Keyboards, Wireless Silent Mice & Noise-Cancelling Headsets with 1-Year Official Warranty.",
  "ad.meetionCta": "Shop Meetion Gear →",
  "ad.brandsMeetionTitle": "Meetion Official Bangladesh Flagship Partner",
  "ad.brandsMeetionText": "South Bangla Computers is the exclusive authorized distributor for Meetion in Bangladesh. Complete lineup of hot-swap keyboards, wireless mice, RGB headsets with 1-year direct replacement warranty.",

  // Homepage Specific
  "home.heroTag": "ICT Infrastructure Distribution",
  "home.heroTitle": "Leading Importer & Distributor of Enterprise Networking & Official Meetion Gear in Bangladesh",
  "home.heroSub": "Authorized direct national distribution for Tenda, Cisco, Meetion, Solitine, and Must since 1999 across all 64 districts.",
  "home.heroCtaShop": "Browse Hardware Catalog",
  "home.heroCtaDealer": "Become an Authorized Reseller",
  "home.catHeading": "Product Categories",
  "home.catSub": "Explore our certified hardware catalogue by category",
  "home.popularHeading": "Popular & Top Selling Hardware",
  "home.popularSub": "Customer favorites in Meetion gaming peripherals and enterprise networking gear",
  "home.tabBestSeller": "Best Sellers",
  "home.tabNew": "New Arrivals",
  "home.tabRecommended": "Recommended",
  "home.brandsHeading": "Authorized Brand Partners",
  "home.brandsSub": "Direct importer & official warranty distributor for global ICT brands",
  "home.whyHeading": "Why Choose South Bangla Computers?",
  "home.why1Title": "100% Genuine Guarantee",
  "home.why1Desc": "Direct factory-sourced genuine imports with official hologram verification.",
  "home.why2Title": "12 National Service Centers",
  "home.why2Desc": "Fast warranty resolution and RMA support across Dhaka, Chittagong and nationwide.",
  "home.why3Title": "Official Distributor Warranty",
  "home.why3Desc": "Hassle-free direct replacement warranty on Meetion and partner equipment.",
  "home.why4Title": "Fast Nationwide Delivery",
  "home.why4Desc": "Secure courier and transport dispatch within 24–72 hours across 64 districts.",
  "home.branchesHeading": "Our Showrooms & Service Centers",
  "home.branchesSub": "Visit our official Elephant Road headquarters and nationwide regional points",
  "home.newsHeading": "Latest ICT Insights & Technical Guides",
  "home.newsSub": "Read in-depth reviews and networking best practice guides from certified engineers",

  // Mini-Cart & Drawer
  "cart.title": "Shopping Cart",
  "cart.emptyTitle": "Your cart is currently empty",
  "cart.emptySub": "Explore our catalog to find official networking and peripheral solutions.",
  "cart.shopNow": "Shop Products",
  "cart.subtotal": "Subtotal:",
  "cart.viewCart": "View Cart",
  "cart.checkout": "Checkout",

  // Mobile Menu
  "mobile.menu": "Menu",
  "mobile.language": "ভাষা পরিবর্তন / Switch Language",
  "mobile.shopCat": "Shop by Category",
  "mobile.brandsPartners": "Brands & Partners (14)",
  "mobile.viewAllBrands": "View All 14 Partner Brands →",
  "mobile.solutions": "Solutions & Services",
  "mobile.salesSupport": "Sales & Support",
  "mobile.hours": "Sat – Thu: 10:00 AM – 8:00 PM",
  "mobile.signInRegister": "Sign In / Register",

  // Footer
  "footer.aboutTitle": "South Bangla Computers",
  "footer.aboutDesc": "Authorized national distributor of networking hardware, fiber optical infrastructure, and Meetion ergonomic peripherals across Bangladesh since 1999.",
  "footer.quickLinks": "Quick Links",
  "footer.customerService": "Customer Service",
  "footer.headOffice": "Head Office",
  "footer.officeAddress": "Subastu Suraiya Trade Center (Level-3), 66 Elephant Road, Dhaka-1205",
  "footer.copyright": "© 2026 South Bangla Computers. All Rights Reserved.",
  "footer.simulatedNotice": "Prototype with simulated data for demonstration purposes.",

  // Homepage Extended & Section Specific Keys
  "home.heroSubtitleTag": "NETWORKING & IT EQUIPMENT DISTRIBUTOR",
  "home.heroScript1": "Better Network",
  "home.heroScript2": "Brighter Future",
  "home.heroTitle1": "South Bangla Computers",
  "home.heroTitleAccent": "Your Trusted IT Partner",
  "home.heroDescText": "We provide high-quality networking solutions, computer accessories and IT equipment for businesses, institutions and individuals across Bangladesh.",
  "home.heroShopNow": "Shop Now →",
  "home.heroSolutions": "Explore Solutions →",
  "home.trustedBrandsTitle": "Trusted Brands",

  // Meetion Section (3rd Section)
  "home.meetionTag": "OFFICIAL DISTRIBUTOR FOCUS • MEETION BANGLADESH",
  "home.meetionHeading": "Meetion Gaming & Office Peripherals",
  "home.meetionWarrantyBadge": "OFFICIAL WARRANTY",
  "home.meetionSub": "South Bangla Computers is the official authorized partner of Meetion in Bangladesh. Genuine optical switches, ergonomic gaming gear, and nationwide warranty coverage.",
  "home.meetionViewAll": "View All Meetion Products",

  // Popular Products (4th Section)
  "home.popularTag": "BEST SELLING PRODUCTS",
  "home.popularHeading": "Popular Products",
  "home.viewAllProducts": "View All Products",

  // Shop By Category (5th Section)
  "home.catTag": "SHOP BY CATEGORY",
  "home.catHeading": "Explore Our Product Categories",
  "home.viewAllCategories": "View All Categories",
  "cat.wifiTitle": "Wi-Fi Routers",
  "cat.wifiDesc": "Home & Business Routers",
  "cat.switchesTitle": "Network Switches",
  "cat.switchesDesc": "Managed & Unmanaged Switches",
  "cat.fiberTitle": "Fiber Optic",
  "cat.fiberDesc": "Fiber Cable & Accessories",
  "cat.upsTitle": "UPS & Power",
  "cat.upsDesc": "Backup Power Solutions",

  // Enterprise Solution Section
  "home.planPill": "FREE TURNKEY ARCHITECTURE & SIZING ADVICE",
  "home.planTitle": "Build Your Custom",
  "home.planTitleAccent": "Enterprise Network Plan",
  "home.planDesc": "From high-density corporate Wi-Fi 7 to carrier-grade FTTH distribution and PoE security backbones, our certified Cisco & Tenda engineers design turnkey solutions with verified equipment lists and tender-ready BOMs.",
  "home.planCta": "Start Custom Configurator →",
  "home.planQuote": "Request Enterprise BOM / RFP",

  // Mega Menu Meetion Ads
  "ad.meetionBadge": "OFFICIAL DISTRIBUTOR",
  "ad.meetionTitle": "Meetion Gaming & Ergonomic Gear",
  "ad.meetionDesc": "Mechanical Keyboards, Wireless Silent Mice & Noise-Cancelling Headsets with 1-Year Official Warranty.",
  "ad.meetionCta": "Shop Meetion Gear →",
  "ad.brandsMeetionTitle": "Meetion Official Bangladesh Partner",
  "ad.brandsMeetionText": "South Bangla Computers is the exclusive authorized distributor for Meetion in Bangladesh. Full lineup of mechanical keyboards, mice & audio accessories.",

  // 4-Step Architecture Flow
  "flow.step1Num": "01",
  "flow.step1Title": "Define Scale & Needs",
  "flow.step1Desc": "Select your deployment tier — SMB office, corporate campus, ISP substation, or surveillance topology.",
  "flow.step1Tag": "User Capacity & Bandwidth",
  "flow.step2Num": "02",
  "flow.step2Title": "Automated Sizing",
  "flow.step2Desc": "Automated matching of core routers, PoE+ switch ports, and Wi-Fi 7 access points.",
  "flow.step2Tag": "Zero Port Bottlenecks",
  "flow.step3Num": "03",
  "flow.step3Title": "Topology & Pricing",
  "flow.step3Desc": "Review dynamic SVG architecture diagram with transparent distributor bill of materials.",
  "flow.step3Tag": "Tender-Ready Quotation",
  "flow.step4Num": "04",
  "flow.step4Title": "Nationwide Delivery",
  "flow.step4Desc": "Direct dispatch from Multiplan Center central warehouse with official distributor warranty.",
  "flow.step4Tag": "All 64 Districts Supported",

  // Partner Brands Section
  "brands.tag": "OFFICIAL BRAND PARTNERS",
  "brands.heading": "Trusted Brands. Genuine Hardware.",
  "brands.sub": "Direct supplier and technology partner for leading networking and IT hardware brands in Bangladesh.",
  "brands.officialPartner": "Official Brand Partner",
  "brands.enterprisePartner": "Enterprise Hardware Partner",

  // Trust Strip Pillars
  "trust.genuineTitle": "100% Genuine Products",
  "trust.genuineDesc": "Get original hardware with verified warranty and technical support.",
  "trust.supportTitle": "Expert Technical Support",
  "trust.supportDesc": "Our team is always ready to help you with the right solution.",
  "trust.deliveryTitle": "Nationwide Delivery",
  "trust.deliveryDesc": "Fast, safe and reliable delivery across Bangladesh.",

  // Dealer Banner
  "dealer.badge": "B2B DEALER NETWORK",
  "dealer.title": "Grow Together with SBC",
  "dealer.desc": "Become our dealer and get exclusive benefits, best pricing and dedicated support for your business.",
  "dealer.joinBtn": "Join Dealer Program",

  // Technical Guides Section
  "guides.tag": "TECHNICAL GUIDES",
  "guides.title": "Learn & Grow",
  "guides.viewAll": "View All Guides",

  // Homepage Conclusion CTA
  "conclusion.tag": "BANGLADESH'S TRUSTED COMPUTER & NETWORKING DISTRIBUTOR",
  "conclusion.title": "Need Bulk Hardware Procurement or Technical Assistance?",
  "conclusion.desc": "South Bangla Computers delivers 100% genuine ICT hardware, volume wholesale tiers for computer retailers and ISPs, and authorized manufacturer warranties across all 64 districts.",
  "conclusion.exploreBtn": "Explore All Products →",
  "conclusion.quoteBtn": "Request Commercial Quote",

  // Footer Elements
  "footer.tagline": "Networking | IT Equipment | Computer Accessories",
  "footer.elephantRoad": "323, Akram Serenity, Elephant Road, Dhaka-1205",
  "footer.quickLinks": "Quick Links",
  "footer.home": "Home",
  "footer.shopCatalog": "Shop Catalog",
  "footer.partnerBrands": "Partner Brands",
  "footer.solutions": "Solutions",
  "footer.aboutUs": "About Us",
  "footer.contactUs": "Contact Us",
  "footer.customerService": "Customer Service",
  "footer.techSupport": "Technical Support",
  "footer.faq": "FAQ",
  "footer.warrantyPolicy": "Warranty Policy",
  "footer.returnRefund": "Return & Refund",
  "footer.deliveryLogistics": "Delivery & Logistics",
  "footer.privacyPolicy": "Privacy Policy",
  "footer.connectWithUs": "Connect With Us",
  "footer.motto1": "Better Network",
  "footer.motto2": "Brighter Future",
  "footer.copyright": "© 2026 South Bangla Computers. All rights reserved.",
  "footer.privacy": "Privacy",
  "footer.terms": "Terms",
  "footer.returns": "Return & Refund",
  "footer.sitemap": "Sitemap",

  // Cards & Common
  "card.addToCart": "Add to Cart",
  "card.viewDetails": "Details"
};

/**
 * Translation lookup
 */
window.SBC.t = function (key, fallback) {
  const currentLang = (window.SBC && window.SBC.config && window.SBC.config.LANG) || "bn";
  const dict = (window.SBC && window.SBC.i18n && window.SBC.i18n[currentLang]) ||
               (window.SBC && window.SBC.i18n && window.SBC.i18n.bn) ||
               (window.SBC && window.SBC.i18n && window.SBC.i18n.en) || {};
  return dict[key] !== undefined ? dict[key] : (fallback !== undefined ? fallback : key);
};

/**
 * Switch global language with automatic page reload
 */
window.SBC.setLanguage = function (lang) {
  if (lang !== "bn" && lang !== "en") return;
  
  if (!window.SBC.config) window.SBC.config = {};
  window.SBC.config.LANG = lang;

  try {
    localStorage.setItem("sbc.lang", lang);
    localStorage.setItem("sbc_lang", lang);
  } catch (e) {}

  if (document.documentElement) {
    document.documentElement.lang = lang;
  }

  // Automatic clean reload as requested: re-runs all templates, layout & header smoothly
  window.location.reload();
};

/**
 * Comprehensive Site-Wide English to Bengali Dictionary
 * Translates headings, filters, buttons, metrics, and labels across all site pages
 */
window.SBC.i18n.EN_TO_BN_PHRASES = {
  // Navigation & Topbar
  "Home": "হোম",
  "About Us": "আমাদের সম্পর্কে",
  "Shop": "শপ",
  "Shop Catalog": "শপ ক্যাটালগ",
  "Brands": "ব্র্যান্ডসমূহ",
  "Partner Brands": "পার্টনার ব্র্যান্ডসমূহ",
  "Solutions": "সলিউশনসমূহ",
  "Dealers": "ডিলার নেটওয়ার্ক",
  "Support": "সাপোর্ট",
  "Learn": "শিখুন ও জানুন",
  "Contact": "যোগাযোগ",
  "Contact Us": "যোগাযোগ করুন",
  "Track Order": "অর্ডার ট্র্যাক",
  "FAQ": "সাধারণ জিজ্ঞাসা",
  "Language": "ভাষা",
  "English": "English",
  "Bangla": "বাংলা",
  "My Account": "আমার অ্যাকাউন্ট",
  "Login / Register": "লগইন / রেজিস্টার",
  "Dashboard": "ড্যাশবোর্ড",
  "Dealer Portal": "ডিলার পোর্টাল",
  "Wishlist": "উইশলিস্ট",
  "Cart": "কার্ট",
  "Become a dealer": "ডিলার হতে আবেদন করুন",
  "All 500+ Catalog SKUs →": "সকল ৫০০+ ক্যাটালগ পণ্য দেখুন →",
  "Hardware Catalogue & Equipment": "হার্ডওয়্যার ক্যাটালগ ও যন্ত্রপাতি",
  "Authentic ICT devices, passive optical equipment & enterprise power backup": "আসল আইসিটি ডিভাইস, প্যাসিভ অপটিক্যাল সরঞ্জাম ও এন্টারপ্রাইজ পাওয়ার ব্যাকআপ",
  "Categories": "ক্যাটাগরি",
  "Quick Links": "প্রয়োজনীয় লিংক",

  // Categories
  "All Categories": "সকল ক্যাটাগরি",
  "Routers & Wi-Fi": "রাউটার ও ওয়াই-ফাই",
  "Switches & PoE": "নেটওয়ার্ক সুইচ ও পিওই",
  "Fiber, PON & ONU": "ফাইবার, পন ও ওএনইউ",
  "Access Points & Outdoor": "এক্সেস পয়েন্ট ও আউটডোর",
  "CCTV & Security": "সিসিটিভি ও সিকিউরিটি",
  "Power & Backup (UPS)": "পাওয়ার ও ব্যাকআপ (ইউপিএস)",
  "Cabling & Server Racks": "ক্যাব্লিং ও সার্ভার র্যাক",
  "Fiber Tools & Splicers": "ফাইবার টুলস ও স্প্লাইসার",
  "Peripherals & Audio": "পেরিফেরালস ও অডিও",
  "Computer Accessories": "কম্পিউটার এক্সেসরিজ",

  // Meetion Brand Spotlight & Ads
  "FEATURED PARTNER BRAND": "প্রধান পার্টনার ব্র্যান্ড",
  "Meetion Gaming & Office Gear": "মিশন (Meetion) গেমিং ও অফিস গিয়ার",
  "Explore authentic RGB mechanical keyboards, silent wireless mice, 7.1 surround gaming headsets, and ergonomic office peripherals with official warranty.": "বাংলাদেশে অফিশিয়াল অথোরাইজড ডিস্ট্রিবিউটর — প্রফেশনাল মেকানিকাল আরজিবি কীবোর্ড, ওয়্যারলেস মাউস, গেমিং হেডসেট ও অফিস কম্বো।",
  "View Meetion Catalog": "মিশন ক্যাটালগ দেখুন",
  "100% Genuine with Official Warranty": "১০০% আসল পণ্য ও অফিসিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি",
  "MEETION OFFICIAL PARTNER": "মিশন অফিশিয়াল পার্টনার",
  "OFFICIAL MEETION BANGLADESH DISTRIBUTOR": "অফিশিয়াল মিশন বাংলাদেশ ডিস্ট্রিবিউটর",
  "Pro Gaming & Office Gear": "প্রো গেমিং ও অফিস গিয়ার",
  "Explore Meetion Products →": "মিশন পণ্যসমূহ দেখুন →",
  "Explore Official Meetion Gear": "মিশন অফিসিয়াল পণ্যসমূহ দেখুন",
  "Mechanical keyboards, dual-mode mice, 7.1 surround headsets & ergonomic office sets with replacement warranty.": "মেকানিক্যাল কীবোর্ড, ডুয়েল-মোড মাউস, ৭.১ হেডসেট ও কম্বো উইথ রিপ্লেসমেন্ট ওয়ারেন্টি।",
  "View All Meetion Products →": "মিশনের সকল পণ্য দেখুন →",

  // Shop & Filter Sidebar
  "Filter Products": "পণ্য ফিল্টার করুন",
  "Warranty": "ওয়ারেন্টি",
  "Price Range": "মূল্য সীমা",
  "Stock Availability": "স্টক প্রাপ্যতা",
  "In Stock Only": "শুধুমাত্র স্টকে থাকা পণ্য",
  "Reset Filters": "ফিল্টার রিসেট",
  "Reset All Filters": "সকল ফিল্টার রিসেট করুন",
  "Clear All": "সব মুছুন",
  "Apply Filters": "ফিল্টার প্রয়োগ করুন",
  "Default Sorting": "ডিফল্ট সাজান",
  "Sort by": "সাজান:",
  "Price: Low to High": "মূল্য: কম থেকে বেশি",
  "Price: High to Low": "মূল্য: বেশি থেকে কম",
  "Latest Arrivals": "নতুন সংযোজন",
  "Popularity": "জনপ্রিয়তা",
  "Grid View": "গ্রিড ভিউ",
  "List View": "লিস্ট ভিউ",
  "Showing all products": "সকল পণ্য প্রদর্শিত হচ্ছে",
  "Search in catalog...": "ক্যাটালগে খুঁজুন...",
  "Search products, brands and models...": "পণ্য, ব্র্যান্ড ও মডেল খুঁজুন...",

  // Product Card & Common Actions
  "Add to Cart": "কার্টে যোগ করুন",
  "Request Quote": "কোটেশন পাঠান",
  "View Details": "বিস্তারিত দেখুন",
  "Compare": "তুলনা করুন",
  "In Stock": "স্টকে আছে",
  "Low Stock": "সীমিত স্টক",
  "Out of Stock": "স্টক শেষ",
  "Pre-order": "প্রি-অর্ডার",
  "Official Warranty": "অফিসিয়াল ওয়ারেন্টি",
  "Replacement Warranty": "রিপ্লেসমেন্ট ওয়ারেন্টি",
  "1 Year Warranty": "১ বছর ওয়ারেন্টি",
  "2 Years Warranty": "২ বছর ওয়ারেন্টি",
  "3 Years Warranty": "৩ বছর ওয়ারেন্টি",
  "Lifetime": "লাইফটাইম",
  "Price on Request": "মূল্য অনুরোধে",
  "Demo price": "ডেমো মূল্য",
  "Dealer price": "ডিলার মূল্য",
  "Details": "বিস্তারিত",

  // About Us Page
  "Established": "প্রতিষ্ঠিত",
  "Global Brands": "গ্লোবাল ব্র্যান্ড",
  "Showrooms & Hubs": "শোরুম ও হাব",
  "Districts Served": "জেলায় সক্রিয়",
  "26+ Years of Industry Trust": "২৬+ বছরের ব্যবসায়িক আস্থা",
  "Direct Distributor Partnerships": "সরাসরি ডিস্ট্রিবিউটর পার্টনারশিপ",
  "Dhaka, Chattogram & Khulna": "ঢাকা, চট্টগ্রাম ও খুলনা",
  "Nationwide Delivery & Logistics": "সারাদেশে ডেলিভারি ও লজিস্টিকস",
  "COMPANY OVERVIEW": "প্রতিষ্ঠান পরিচিতি",
  "Connecting Communities, Enterprises & Technology Since 1999": "১৯৯৯ সাল থেকে নির্ভরযোগ্য প্রযুক্তি ও আইসিটি সংযোগ",
  "Our Mission": "আমাদের মিশন",
  "Our Vision": "আমাদের ভিশন",
  "Core Values": "মূল মূল্যবোধ",
  "Why Choose Us": "কেন সাউথ বাংলা কম্পিউটার্স?",
  "Authorized Brands": "অনুমোদিত ব্র্যান্ডসমূহ",
  "Management Team": "ব্যবস্থাপনা পরিষদ",

  // Contact Page
  "Corporate Head Office": "কর্পোরেট প্রধান কার্যালয়",
  "Sales & Enterprise Hotline": "সেলস ও হটলাইন",
  "RMA & Support Lab": "আরএমএ ও সাপোর্ট ল্যাব",
  "Business Hours": "কার্যসময়",
  "Business Working Hours": "অফিসের কার্যসময়",
  "Get in Touch with South Bangla Computers": "সাউথ বাংলা কম্পিউটার্স-এর সাথে যোগাযোগ করুন",
  "Send Inquiry ↓": "বার্তা পাঠান ↓",
  "Send Inquiry Message →": "বার্তা পাঠান →",
  "NATIONWIDE OFFICE & SERVICE NETWORK": "সারাদেশে অফিস ও সার্ভিস নেটওয়ার্ক",
  "Locate on Map": "ম্যাপে দেখুন",
  "Locate on Map ↓": "ম্যাপে দেখুন ↓",
  "Call Sales Desk →": "সেলস ডেস্কে কল করুন →",
  "Email Support Lab →": "সাপোর্ট ল্যাবে ইমেইল করুন →",
  "Locate Showrooms & Labs": "শোরুম ও ল্যাব দেখুন",
  "Send Us an Inquiry": "আমাদের বার্তা পাঠান",
  "Send Us a Message": "আমাদের মেসেজ পাঠান",
  "Your Name": "আপনার নাম",
  "Your Email": "আপনার ইমেইল",
  "Phone Number": "মোবাইল নম্বর",
  "Subject": "বিষয়",
  "Message": "বার্তা",
  "Send Message": "বার্তা পাঠান",
  "Nationwide Showrooms": "সারাদেশের শোরুমসমূহ",

  // Cart & Checkout
  "Shopping Cart": "শপিং কার্ট",
  "Your Shopping Cart": "আপনার শপিং কার্ট",
  "Your cart is empty": "আপনার কার্ট বর্তমানে খালি",
  "Your Cart is Empty": "আপনার কার্ট বর্তমানে খালি",
  "Your shopping cart is empty": "আপনার কার্ট বর্তমানে খালি",
  "Explore Products →": "পণ্য দেখুন →",
  "Order Summary": "অর্ডারের সারসংক্ষেপ",
  "Product": "পণ্য",
  "Unit Price": "একক মূল্য",
  "Quantity": "পরিমাণ",
  "Total": "মোট",
  "Subtotal": "সাবটোটাল",
  "Shipping": "ডেলিভারি চার্জ",
  "Proceed to Checkout": "চেকআউটে এগিয়ে যান",
  "Place Order": "অর্ডার নিশ্চিত করুন",
  "Continue Shopping": "কেনাকাটা চালিয়ে যান",
  "Apply Coupon": "কুপন কোড দিন",
  "Billing Details": "বিলিংয়ের তথ্য",
  "Delivery Address": "ডেলিভারি ঠিকানা",
  "District": "জেলা",
  "City": "শহর",
  "Payment Method": "পেমেন্ট মাধ্যম",
  "Cash on Delivery": "ক্যাশ অন ডেলিভারি",
  "bKash / Nagad / Rocket": "বিকাশ / নগদ / রকেট",
  "Bank Transfer": "ব্যাংক ট্রান্সফার",
  "Order Notes": "অর্ডার নোট (ঐচ্ছিক)",

  // Warranty, Support & Policy Pages
  "Warranty Policy": "ওয়ারেন্টি পলিসি",
  "Return & Refund Policy": "রিটার্ন ও রিফান্ড পলিসি",
  "Return & Refund": "রিটার্ন ও রিফান্ড",
  "Delivery & Logistics": "ডেলিভারি ও লজিস্টিকস",
  "Privacy Policy": "প্রাইভেসি পলিসি",
  "Terms & Conditions": "শর্তাবলী ও নিয়মাবলী",
  "Terms": "শর্তাবলী",
  "Customer Service": "কাস্টমার সার্ভিস",
  "Technical Support": "টেকনিক্যাল সাপোর্ট",
  "How to Claim Warranty": "কীভাবে ওয়ারেন্টি দাবি করবেন",
  "Authorized Service Centers": "অনুমোদিত সার্ভিস সেন্টারসমূহ",
  "RMA Tracking": "আরএমএ ট্র্যাকিং",
  "Frequently Asked Questions": "সাধারণ জিজ্ঞাসা (FAQ)",
  "Connect With Us": "আমাদের সাথে যুক্ত থাকুন",
  "Better Network": "উন্নত নেটওয়ার্ক",
  "Brighter Future": "উজ্জ্বল ভবিষ্যৎ",
  "Sitemap": "সাইটম্যাপ",
  "© 2026 South Bangla Computers. All rights reserved.": "© ২০২৬ সাউথ বাংলা কম্পিউটার্স। সর্বস্বত্ব সংরক্ষিত।",

  // Auth, Forms & Dealer
  "Login": "লগইন",
  "Register": "রেজিস্টার",
  "Sign In": "সাইন ইন",
  "Sign Up": "সাইন আপ",
  "Sign In to Your Account": "আপনার অ্যাকাউন্টে সাইন ইন করুন",
  "Create New Account": "নতুন অ্যাকাউন্ট তৈরি করুন",
  "Email Address": "ইমেইল অ্যাড্রেস",
  "Password": "পাসওয়ার্ড",
  "Confirm Password": "পাসওয়ার্ড নিশ্চিত করুন",
  "Forgot Password?": "পাসওয়ার্ড ভুলে গেছেন?",
  "Forgot Your Password?": "পাসওয়ার্ড ভুলে গেছেন?",
  "Reset Password": "পাসওয়ার্ড রিসেট করুন",
  "Remember Me": "আমাকে মনে রাখুন",
  "Don't have an account?": "অ্যাকাউন্ট নেই?",
  "Already have an account?": "ইতিমধ্যে অ্যাকাউন্ট আছে?",
  "Create Account": "অ্যাকাউন্ট তৈরি করুন",
  "Enter your email to receive a password reset link": "পাসওয়ার্ড রিসেট লিংক পেতে আপনার ইমেইল প্রদান করুন",
  "Send Password Reset Link": "পাসওয়ার্ড রিসেট লিংক পাঠান",
  "Send Reset Link": "রিসেট লিংক পাঠান",
  "Back to Login": "লগইনে ফিরে যান",
  "Dealer Registration": "ডিলার রেজিস্ট্রেশন",
  "Company Name": "প্রতিষ্ঠানের নাম",
  "Trade License Number": "ট্রেড লাইসেন্স নম্বর",
  "Business Type": "ব্যবসার ধরন",
  "Join Dealer Program": "ডিলার প্রোগ্রামে যোগ দিন",
  "B2B DEALER NETWORK": "বিটুবি ডিলার নেটওয়ার্ক",
  "Grow Together with SBC": "এসবিসি (SBC)-এর সাথে একসাথে এগিয়ে চলুন",
  "Become our dealer and get exclusive benefits, best pricing and dedicated support for your business.": "আমাদের অনুমোদিত ডিলার হয়ে আপনার ব্যবসার জন্য পান বিশেষ ছাড়, সেরা পাইকারি মূল্য ও সার্বক্ষণিক বিক্রয়োত্তর সেবা।",
  "TECHNICAL GUIDES": "টেকনিক্যাল গাইড ও রিসোর্স",
  "Learn & Grow": "শিখুন ও সমৃদ্ধ হন",
  "View All Guides": "সব গাইড দেখুন",
  "Explore All Products": "সকল পণ্য দেখুন",
  "Explore All Products →": "সকল পণ্য দেখুন →",
  "Request Commercial Quote": "বাণিজ্যিক কোটেশন চান",
  "Official Brand Partner": "অফিসিয়াল ব্র্যান্ড পার্টনার",
  "Enterprise Hardware Partner": "এন্টারপ্রাইজ হার্ডওয়্যার পার্টনার",
  "100% Genuine Products": "১০০% অরিজিনাল পণ্য",
  "Get original hardware with verified warranty and technical support.": "যাচাইকৃত ওয়ারেন্টি এবং টেকনিক্যাল সাপোর্ট সহ আসল হার্ডওয়্যার।",
  "Expert Technical Support": "অভিজ্ঞ টেকনিক্যাল সাপোর্ট",
  "Our team is always ready to help you with the right solution.": "সঠিক নেটওয়ার্ক সলিউশন বেছে নিতে আমাদের অভিজ্ঞ টিম সবসময় প্রস্তুত।",
  "Nationwide Delivery": "সারাদেশে নিরাপদ ডেলিভারি",
  "Fast, safe and reliable delivery across Bangladesh.": "বাংলাদেশজুড়ে দ্রুত, নিরাপদ ও নির্ভরযোগ্য হোম ও অফিস ডেলিভারি।",

  // Brand Directory Page
  "Official Partner": "অফিসিয়াল পার্টনার",
  "Brands & Distributorships": "ব্র্যান্ড ও ডিস্ট্রিবিউটরশিপ",
  "Official Partner Brands & Distributorships": "অফিসিয়াল পার্টনার ব্র্যান্ড ও ডিস্ট্রিবিউটরশিপ",
  "Dealer Distributorship Program": "ডিলার ডিস্ট্রিবিউটরশিপ প্রোগ্রাম",
  "All Brands (14)": "সকল ব্র্যান্ড (১৪)",
  "Gaming & Peripherals": "গেমিং ও পেরিফেরালস",
  "Networking & Wi-Fi": "নেটওয়ার্কিং ও ওয়াই-ফাই",
  "Fiber & FTTH Access": "ফাইবার ও এফটিটিএইচ এক্সেস",
  "Power & Cabling": "পাওয়ার ও ক্যাবলিং",
  "Search brands by name...": "ব্র্যান্ডের নাম দিয়ে খুঁজুন...",
  "View Brand Products →": "ব্র্যান্ডের পণ্যসমূহ দেখুন →",
  "View Brand Products": "ব্র্যান্ডের পণ্যসমূহ দেখুন",
  "Official Distributorship": "অফিসিয়াল ডিস্ট্রিবিউটরশিপ",
  "Direct Import Partner": "সরাসরি আমদানি পার্টনার",
  "Authorised Distributor": "অনুমোদিত ডিস্ট্রিবিউটর",
  "Official Distributor": "অফিসিয়াল ডিস্ট্রিবিউটর",
  "South Bangla Computers distributes leading global technology brands including Tenda, Cisco, Solitine, Must, HSGQ, Tumtec, and Meetion — supplying genuine equipment, official warranties, and dedicated technical support across Bangladesh.": "সাউথ বাংলা কম্পিউটার্স টেন্ডা, সিসকো, সলিটিন, মাস্ট, এইচএসজিকিউ, টামটেক এবং মিশন-এর মতো শীর্ষস্থানীয় গ্লোবাল টেক ব্র্যান্ডের আসল সরঞ্জাম, অফিসিয়াল ওয়ারেন্টি এবং নির্ভরযোগ্য টেকনিক্যাল সাপোর্ট সরবরাহ করে।",

  // Product Details (PDP)
  "Genuine Hardware": "আসল হার্ডওয়্যার",
  "Genuine Authorized": "১০০% আসল ও অনুমোদিত",
  "Fast Hub Dispatch": "দ্রুত হাব ডিসপ্যাচ",
  "SKU": "এসকেইউ",
  "SKU:": "এসকেইউ:",
  "Colors": "কালার / ভ্যারিয়েন্ট",
  "Add To Cart": "কার্টে যোগ করুন",
  "Buy Now": "এখনই কিনুন",
  "Save": "সাশ্রয়",
  "Description": "পণ্যের বিবরণ",
  "What's Included?": "বক্সে যা থাকছে",
  "Features": "মূল বৈশিষ্ট্যসমূহ",
  "Technical Specifications": "প্রযুক্তিগত স্পেসিফিকেশন",
  "Customer Reviews": "গ্রাহকদের রিভিউ",
  "Related Hardware": "সম্পর্কিত হার্ডওয়্যার",
  "Related Products": "সম্পর্কিত পণ্যসমূহ",
  "Specifications": "স্পেসিফিকেশন",

  // Warranty & Service Policy Page
  "RMA Service Policy": "আরএমএ সার্ভিস পলিসি",
  "Official Distributorship & RMA Service Policy": "অফিসিয়াল ডিস্ট্রিবিউটরশিপ ও আরএমএ সার্ভিস পলিসি",
  "Check Serial Warranty →": "সিরিয়াল ওয়ারেন্টি যাচাই করুন →",
  "Check Serial Warranty": "সিরিয়াল ওয়ারেন্টি যাচাই করুন",
  "Find Drop-off Centers": "ড্রপ-অফ সেন্টার খুঁজুন",
  "Official Distributorship Policy": "অফিসিয়াল ডিস্ট্রিবিউটরশিপ পলিসি",
  "South Bangla Computers Warranty & Service Policy": "সাউথ বাংলা কম্পিউটার্স ওয়ারেন্টি ও সার্ভিস পলিসি",
  "1. Standard Warranty Coverage": "১. স্ট্যান্ডার্ড ওয়ারেন্টি কভারেজ",
  "2. Warranty Exclusions & Void Conditions": "২. যেসব ক্ষেত্রে ওয়ারেন্টি বাতিল হবে",
  "3. Warranty Claim & RMA Process": "৩. ওয়ারেন্টি দাবি ও আরএমএ প্রক্রিয়া",
  "4. RMA Turnaround Time": "৪. আরএমএ সেবা নিষ্পত্তির সময়সীমা",
  "5. Authorized Regional Service Hubs": "৫. অনুমোদিত বিভাগীয় সার্ভিস হাব",

  // Shipping & Logistics Page
  "Delivery & Shipping Logistics": "ডেলিভারি ও শিপিং লজিস্টিকস",
  "Nationwide Safe & Insured ICT Hardware Dispatch": "সারাদেশে নিরাপদ ও দ্রুত আইসিটি হার্ডওয়্যার ডেলিভারি",
  "Inside Dhaka City": "ঢাকা সিটির ভেতরে",
  "Outside Dhaka (64 Districts)": "ঢাকার বাইরে (৬৪ জেলা)",
  "Express Same-Day Delivery": "এক্সপ্রেস সেম-ডে ডেলিভারি",
  "1. Delivery Coverage": "১. ডেলিভারি এলাকা",
  "2. Delivery Timelines & Charges": "২. ডেলিভারির সময়সীমা ও চার্জ",
  "3. Order Verification & Courier Partners": "৩. অর্ডার ভেরিফিকেশন ও কুরিয়ার পার্টনার",
  "Track Consignment": "পার্সেল ট্র্যাক করুন",

  // Returns Page
  "Return & Refund Policy": "রিটার্ন ও রিফান্ড পলিসি",
  "Transparent Replacement & Refund Guidelines": "স্বচ্ছ রিপ্লেসমেন্ট ও রিফান্ড নির্দেশিকা",
  "1. Eligibility for Returns": "১. রিটার্ন করার যোগ্যতা",
  "2. 7-Day Replacement Policy": "২. ৭ দিনের রিপ্লেসমেন্ট পলিসি",
  "3. Non-Returnable Conditions": "৩. যেসব পণ্য রিটার্নযোগ্য নয়",
  "4. Refund Methods & Timelines": "৪. রিফান্ড পদ্ধতি ও সময়সীমা",

  // Support Page
  "Customer Support & Technical Helpdesk": "কাস্টমার সাপোর্ট ও টেকনিক্যাল হেল্পডেস্ক",
  "Diagnostic Laboratories, Firmware Downloads & RMA": "ডায়াগনস্টিক ল্যাব, ফার্মওয়্যার ডাউনলোড ও আরএমএ",
  "Lookup Serial Warranty": "সিরিয়াল নম্বর দিয়ে ওয়ারেন্টি খুঁজুন",
  "Submit Support Ticket": "সাপোর্ট টিকিট পাঠান",
  "Technical Hotlines": "টেকনিক্যাল হটলাইন",
  "Download Center": "ডাউনলোড সেন্টার",

  // FAQ Page
  "Frequently Asked Questions": "সাধারণ জিজ্ঞাসা (FAQ)",
  "Answers to common queries regarding authentic IT hardware, warranty & delivery": "আসল আইটি হার্ডওয়্যার, ওয়ারেন্টি ও ডেলিভারি সংক্রান্ত সচরাচর জিজ্ঞাসা",
  "General Questions": "সাধারণ প্রশ্নোত্তর",
  "Orders & Delivery": "অর্ডার ও ডেলিভারি",
  "Warranty & Support": "ওয়ারেন্টি ও সাপোর্ট",
  "Dealer & Bulk Inquiries": "ডিলার ও পাইকারি অর্ডার",

  // Downloads Page
  "Downloads & Resources": "ডাউনলোড ও রিসোর্স",
  "Official datasheets, manuals, firmware & brochures": "অফিসিয়াল ডেটাশিট, ম্যানুয়াল, ফার্মওয়্যার ও ব্রোশার",
  "Product Datasheets": "প্রডাক্ট ডেটাশিট",
  "Firmware Updates": "ফার্মওয়্যার আপডেট",
  "Catalog & Price Lists": "ক্যাটালগ ও মূল্যতালিকা",
  "Download": "ডাউনলোড",

  // News & Articles
  "Industry News & Technical Guides": "প্রযুক্তি সংবাদ ও টেকনিক্যাল গাইড",
  "Expert networking guides, product launches & IT insights": "নেটওয়ার্কিং গাইড, নতুন পণ্য উন্মোচন ও প্রযুক্তি বিশ্লেষণ",
  "Read Article →": "নিবন্ধটি পড়ুন →",
  "Read More →": "আরও পড়ুন →",
  "Read More": "আরও পড়ুন",
  "Published On": "প্রকাশের তারিখ",

  // Branches
  "Showrooms & Service Centers": "শোরুম ও সার্ভিস সেন্টারসমূহ",
  "Visit our authorized corporate showrooms, labs & regional warehouses": "আমাদের শোরুম, ডায়াগনস্টিক ল্যাব ও ওয়্যারহাউস পরিদর্শন করুন",
  "Head Office": "প্রধান কার্যালয়",
  "Elephant Road Branch": "এলিফ্যান্ট রোড শাখা",
  "Multiplan Center": "মাল্টিপ্ল্যান সেন্টার শাখা",
  "Chattogram Hub": "চট্টগ্রাম হাব",
  "Khulna Hub": "খুলনা হাব",
  "Call Branch": "শাখায় কল করুন",
  "Get Directions": "দিকনির্দেশনা পান",

  // Careers
  "Careers at South Bangla Computers": "সাউথ বাংলা কম্পিউটার্সে ক্যারিয়ার",
  "Join our dynamic team driving ICT distribution across Bangladesh": "বাংলাদেশের আইসিটি অবকাঠামো গড়ার অগ্রযাত্রায় আমাদের দলে যোগ দিন",
  "Open Positions": "বর্তমান পদসমূহ",
  "Why Work With Us": "কেন আমাদের সাথে কাজ করবেন",
  "Apply Now": "আবেদন করুন",

  // Quote
  "Commercial Procurement & Bulk RFQ": "বাণিজ্যিক ক্রয় ও বাল্ক আরএফকিউ",
  "Request an official wholesale quotation for corporate or institutional hardware": "কর্পোরেট বা প্রাতিষ্ঠানিক হার্ডওয়্যারের জন্য অফিসিয়াল পাইকারি কোটেশন চান",
  "Organization Information": "প্রতিষ্ঠানের তথ্য",
  "Select Product Category": "পণ্যের ক্যাটাগরি নির্বাচন করুন",
  "Expected Quantity": "প্রত্যাশিত পরিমাণ",
  "Submit RFQ": "কোটেশন অনুরোধ পাঠান",

  // Configurator
  "Network Solution Configurator": "নেটওয়ার্ক সলিউশন কনফিগারেটর",
  "Interactive planning tool for ISPs, enterprise campuses and office networks": "আইএসপি, ক্যাম্পাস ও অফিস নেটওয়ার্কের জন্য ইন্টারেক্টিভ হার্ডওয়্যার প্ল্যানার",
  "Select Environment": "পরিবেশ নির্বাচন করুন",
  "Calculate Hardware": "হার্ডওয়্যার হিসাব করুন",
  "Download BOM (PDF)": "বিওএম ডাউনলোড (PDF)",

  // Compare & Wishlist
  "Compare Products": "পণ্য তুলনা করুন",
  "Side-by-side technical specification comparison": "পাশাপাশি প্রযুক্তিগত স্পেসিফিকেশন তুলনা",
  "No products selected for comparison": "তুলনা করার জন্য কোনো পণ্য নির্বাচন করা হয়নি",
  "My Wishlist": "আমার উইশলিস্ট",
  "Your saved hardware products for later review": "পরে দেখার জন্য সংরক্ষিত পণ্যসমূহ",
  "Your wishlist is empty": "আপনার উইশলিস্ট বর্তমানে খালি",
  "Move to Cart": "কার্টে নিন",

  // Checkout & Order Confirmation
  "Checkout": "চেকআউট",
  "Billing & Delivery Address": "বিলিং ও ডেলিভারি ঠিকানা",
  "Order Review": "অর্ডার পর্যালোচনা",
  "Place Order Now": "এখনই অর্ডার নিশ্চিত করুন",
  "Order Received Successfully": "অর্ডার সফলভাবে গ্রহণ করা হয়েছে",
  "Thank you for your purchase from South Bangla Computers": "সাউথ বাংলা কম্পিউটার্স থেকে কেনাকাটা করার জন্য ধন্যবাদ",
  "Order ID": "অর্ডার আইডি",
  "Delivery Status": "ডেলিভারি স্ট্যাটাস",

  // Dealer Portal
  "Dealer Wholesale Portal": "ডিলার পাইকারি পোর্টাল",
  "Bulk Hardware Order Tool": "বাল্ক হার্ডওয়্যার অর্ডার টুল",
  "Dealer Tier Pricing": "ডিলার টায়ার মূল্যতালিকা",
  "Credit & Payment Terms": "ক্রেডিট ও পেমেন্ট শর্তাবলী",
  "RMA Dealer Support": "আরএমএ ডিলার সাপোর্ট",

  // Downloads Repository
  "Downloads Repository": "ডাউনলোড রিপোজিটরি",
  "Firmware, Drivers & Datasheets Repository": "ফার্মওয়্যার, ড্রাইভার ও ডেটাশীট সংগ্রহশালা",
  "Verified official software builds, firmware binaries, and technical PDF brochures for authorized hardware": "অনুমোদিত হার্ডওয়্যারের জন্য অফিসিয়াল সফটওয়্যার, ফার্মওয়্যার ও টেকনিক্যাল পিডিএফ ব্রোশিওর",
  "Total Downloads:": "মোট ডাউনলোড:",
  "Total Downloads": "মোট ডাউনলোড",
  "Search by model or firmware title...": "মডেল বা ফার্মওয়্যার নাম দিয়ে অনুসন্ধান...",
  "File Name & Title": "ফাইলের নাম ও শিরোনাম",
  "Applicable Model": "মডেল নম্বর",
  "Brand": "ব্র্যান্ড",
  "Version / Build": "ভার্সন / বিল্ড",
  "Size": "সাইজ",
  "Type": "টাইপ",
  "Action": "অ্যাকশন",
  "Download": "ডাউনলোড",
  "Released:": "প্রকাশের তারিখ:",
  "No downloads matched your filter criteria.": "আপনার ফিল্টারের সাথে কোনো ফাইল মেলেনি।",
  "Reset Filters": "ফিল্টার রিসেট করুন",

  // Branches & Showrooms
  "Showrooms & Hubs": "শোরুম ও হাবসমূহ",
  "Nationwide Physical": "সারাদেশে বিস্তৃত",
  "Presence & Service Hubs": "শোরুম ও সার্ভিস হাবসমূহ",
  "Visit our showrooms and RMA laboratories across Dhaka, Chattogram, and Khulna for live hardware testing, counter collection, wholesale dealer orders, and 1-hour warranty assessment.": "লাইভ পণ্য পরীক্ষা, কাউন্টার ডেলিভারি, পাইকারি ডিলার ক্রয় ও দ্রুত ওয়ারেন্টি মূল্যায়নের জন্য ঢাকা, চট্টগ্রাম ও খুলনায় আমাদের শোরুম এবং আরএমএ ল্যাবে আসুন।",
  "View Google Map": "গুগল ম্যাপে দেখুন",
  "View Google Map →": "গুগল ম্যাপে দেখুন →",
  "Contact Support Desk": "সাপোর্ট ডেস্কে যোগাযোগ",
  "All Locations (12)": "সকল লোকেশন (১২)",
  "Dhaka (5)": "ঢাকা (৫)",
  "Chattogram (2)": "চট্টগ্রাম (২)",
  "Khulna (1)": "খুলনা (১)",
  "New Regional Hubs (4)": "নতুন রিজিওনাল হাব (৪)",
  "Showroom Pickup": "শোরুম পিকআপ",
  "Copy Address": "ঠিকানা কপি করুন",
  "Call": "কল করুন",

  // FAQ Section
  "Frequently Asked Questions": "সাধারণ জিজ্ঞাসা (FAQ)",
  "Find fast answers to questions regarding ordering, nationwide courier transit, official warranty repairs, and trade dealership.": "অর্ডার, দ্রুত ডেলিভারি, ওয়ারেন্টি মেরামত এবং ডিলারশিপ সংক্রান্ত যেকোনো প্রশ্নের উত্তর জানুন।",
  "Search keywords (e.g. warranty, delivery, credit, ONU)...": "অনুসন্ধান করুন (যেমন: ওয়ারেন্টি, ডেলিভারি, ওএনইউ)...",
  "All Topics (20)": "সকল প্রশ্ন (২০)",
  "General": "সাধারণ",
  "Ordering & Delivery": "অর্ডার ও ডেলিভারি",
  "Warranty & Service": "ওয়ারেন্টি ও সার্ভিস",
  "Dealer Network": "ডিলার নেটওয়ার্ক",
  "Technical & Networking": "প্রযুক্তি ও নেটওয়ার্কিং",

  // Careers & Opportunities
  "Join Our Team": "আমাদের টিমে যোগ দিন",
  "Build the Future of Bangladesh's ICT Infrastructure": "বাংলাদেশের আইসিটি অবকাঠামোর ভবিষ্যৎ গড়ে তুলুন",
  "Join a dynamic organization serving telecom operators, ISPs, and computer retailers since 1999.": "১৯৯৯ সাল থেকে টেলিকম অপারেটর, আইএসপি এবং কম্পিউটার রিটেইলারদের সেবায় নিয়োজিত একটি ডায়নামিক টিমে যোগ দিন।",
  "Company": "প্রতিষ্ঠান",
  "Careers": "ক্যারিয়ার",
  "Join the South Bangla Computers Team": "সাউথ বাংলা কম্পিউটার্স টিমে যোগ দিন",
  "Careers & Opportunities": "ক্যারিয়ার ও সুযোগ",
  "Career Opportunities": "ক্যারিয়ারের সুযোগ",
  "Build Bangladesh's ICT Infrastructure": "বাংলাদেশের আইসিটি অবকাঠামো গড়ার অংশ হোন",
  "Open Positions & Technical Roles": "উন্মুক্ত পদ ও টেকনিক্যাল পজিশন",
  "Explore current engineering, enterprise sales, and RMA diagnostic roles across our Dhaka headquarters and nationwide branch hubs.": "আমাদের ঢাকা প্রধান কার্যালয় এবং বিভিন্ন ব্রাঞ্চ হাবে নেটওয়ার্ক ইঞ্জিনিয়ারিং, কর্পোরেট সেলস ও আরএমএ টেকনিশিয়ান পদের সুযোগগুলো দেখুন।",
  "Senior Network Solutions Engineer": "সিনিয়র নেটওয়ার্ক সলিউশনস ইঞ্জিনিয়ার",
  "B2B Wholesale Account Manager": "বিটুবি হোলসেল অ্যাকাউন্ট ম্যানেজার",
  "Hardware Diagnostic RMA Technician": "হার্ডওয়্যার ডায়াগনস্টিক আরএমএ টেকনিশিয়ান",
  "ENGINEERING": "ইঞ্জিনিয়ারিং",
  "CHANNEL SALES": "চ্যানেল সেলস",
  "TECHNICAL LAB": "টেকনিক্যাল ল্যাব",
  "Location: Head Office, Dhaka • Full-Time": "লোকেশন: প্রধান কার্যালয়, ঢাকা • ফুল-টাইম",
  "Location: Dhaka / Chattogram • Full-Time": "লোকেশন: ঢাকা / চট্টগ্রাম • ফুল-টাইম",
  "Location: Elephant Road Lab, Dhaka • Full-Time": "লোকেশন: এলিফ্যান্ট রোড ল্যাব, ঢাকা • ফুল-টাইম",
  "Design and deploy GPON/EPON OLT systems, enterprise Wi-Fi 7 mesh architectures, and Layer-3 managed routing for corporate and ISP clients. CCNA/MikroTik certified preferred.": "কর্পোরেট ও আইএসপি ক্লায়েন্টদের জন্য জিপন/ইপন ওএলটি, ওয়াই-ফাই ৭ মেশ এবং লেয়ার-৩ ম্যানেজড রাউটিং ডিজাইন ও ডিপ্লয়মেন্ট।",
  "Manage wholesale relationships with IT retailers, regional fiber operators, and corporate buyers. Drive quarterly sales targets for Tenda, TG-NET, and Netis products.": "আইটি রিটেইলার, ফাইবার অপারেটর ও কর্পোরেট ক্রেতাদের সাথে পাইকারি পার্টনারশিপ এবং সেলস পরিচালনা।",
  "Perform bench testing, firmware recovery, optical power measurement, and warranty triage on returned switches, routers, and power equipment.": "রিটার্ন আসা সুইচ, রাউটার ও পাওয়ার যন্ত্রপাতির বেঞ্চ টেস্টিং, ফার্মওয়্যার রিকভারি ও ওয়ারেন্টি পরীক্ষা সম্পন্ন করা।",
  "Apply for Position": "আবেদন করুন",
  "Apply for Position →": "আবেদন করুন →",
  "Don't See a Matching Role?": "আপনার পছন্দের পদটি খুঁজে পাননি?",
  "Send your resume and cover letter directly to our human resources desk. We continuously recruit talented networking professionals.": "আমাদের এইচআর টিমের কাছে সরাসরি আপনার সিভি ও কভার লেটার পাঠান। আমরা প্রতিভাবান পেশাদারদের সবসময় স্বাগত জানাই।",
  "Send CV to career@southbanglabd.com": "career@southbanglabd.com-এ সিভি পাঠান",
  "Full Name:": "পুরো নাম:",
  "Contact Mobile:": "মোবাইল নম্বর:",
  "Email Address:": "ইমেইল অ্যাড্রেস:",
  "Resume / CV (PDF Simulation):": "জীবনবৃত্তান্ত / সিভি (PDF):",
  "Submit Application": "আবেদন জমা দিন",
  "Submit Application →": "আবেদন জমা দিন →",

  // Media & Events
  "Photo & Event Gallery": "ফটো ও ইভেন্ট গ্যালারি",
  "Media & Events": "মিডিয়া ও ইভেন্ট",
  "Company Highlights": "কোম্পানি হাইলাইটস",
  "Moments from our partner conventions, technical workshops, branch inaugurations, and national ICT expos.": "আমাদের ডিলার কনভেনশন, টেকনিক্যাল ওয়ার্কশপ, ব্রাঞ্চ উদ্বোধন এবং জাতীয় আইসিটি এক্সপোর স্মৃতিসমূহ।",
  "All Photos (6)": "সকল ছবি (৬)",
  "Dealer Conventions": "ডিলার কনভেনশন",
  "Showrooms": "শোরুমসমূহ",
  "ICT Expos & Launches": "আইসিটি মেলা ও লঞ্চ",
  "Annual Channel Partner Meet 2026": "বার্ষিক চ্যানেল পার্টনার মিট ২০২৬",
  "Computer City Center Central Showroom": "কম্পিউটার সিটি সেন্টার সেন্ট্রাল শোরুম",
  "Tenda Wi-Fi 7 National Product Launch": "টেন্ডা ওয়াই-ফাই ৭ জাতীয় প্রোডাক্ট লঞ্চ",
  "Agrabad Commercial Showroom Launch": "আগ্রাবাদ বাণিজ্যিক শোরুম উদ্বোধন",
  "ISPAB Bangladesh Tech Expo Pavilion": "আইএসপিএবি বাংলাদেশ টেক এক্সপো প্যাভিলিয়ন",
  "Fiber Splicing & Optical Field Training": "ফাইবার স্প্লাইসিং ও অপটিক্যাল ফিল্ড ট্রেনিং",
  "View High-Res Photo": "ছবি বড় করে দেখুন",

  // Tutorials & Guides
  "Setup Guides & Tutorials": "সেটআপ গাইড ও টিউটোরিয়াল",
  "Tutorials & Setup Guides": "টিউটোরিয়াল ও সেটআপ গাইড",
  "Technical Knowledge Base": "টেকনিক্যাল নলেজ বেস",
  "Hardware Deployment & Configuration Guides": "হার্ডওয়্যার ডিপ্লয়মেন্ট ও কনফিগারেশন গাইড",
  "Practical field installation manuals and step-by-step setup walkthroughs written by our senior network engineering staff.": "আমাদের অভিজ্ঞ নেটওয়ার্ক ইঞ্জিনিয়ারদের তৈরি ফিল্ড ইনস্টলেশন ম্যানুয়াল ও ধাপে ধাপে সেটআপ গাইড।",
  "ROUTERS & WI-FI 7": "রাউটার ও ওয়াই-ফাই ৭",
  "How to Deploy Whole-Home Wi-Fi 7 Mesh Using Tenda BE12 Pro": "টেন্ডা BE12 Pro দিয়ে কীভাবে পুরো বাড়িতে ওয়াই-ফাই ৭ মেশ তৈরি করবেন",
  "Learn how to link multiple BE12 Pro nodes via 6 GHz dedicated wireless backhaul and 2.5G Ethernet cables for seamless roaming across multi-story buildings.": "৬ গিগাহার্টজ ব্যাকহল ও ২.৫জি ইথারনেট ক্যাবল দিয়ে একাধিক নোড যুক্ত করার কৌশল।",
  "FIBER & GPON": "ফাইবার ও জিপন",
  "GPON Optical Power Budget & dBm Loss Optimization": "জিপন অপটিক্যাল পাওয়ার বাজেট ও ডিবিএম লস অপ্টিমাইজেশন",
  "Calculating optical attenuation ratios from OLT Class C+ SFP transceivers through 1:8, 1:16, and 1:32 optical splitters down to customer ONUs without packet loss.": "প্যাকেট লস ছাড়া অপটিক্যাল স্প্লিটার ও ওএনইউ-এর মধ্যে অপটিক্যাল পাওয়ার অনুপাত হিসাব করা।",
  "POE & ENTERPRISE SWITCHES": "পিওই ও এন্টারপ্রাইজ সুইচ",
  "VLAN Segmentation & 802.1Q Trunking on Managed Switches": "ম্যানেজড সুইচে ভি-ল্যান সেগমেন্টেশন ও ৮০২.১কিউ ট্রাঙ্কিং",
  "Configuring isolated broadcast domains, voice VLAN priorities, and inter-VLAN routing for commercial office spaces and high-density campuses.": "অফিস ও ক্যাম্পাসের জন্য আইসোলেটেড ব্রডকাস্ট ডোমেইন ও ইন্টার-ভিল্যান রাউটিং কনফিগারেশন।",
  "Read Guide": "গাইড পড়ুন",
  "Read Guide →": "গাইড পড়ুন →",
  "5 Min Read • 4 Steps": "৫ মিনিট পড়া • ৪ ধাপ",
  "8 Min Read • 6 Steps": "৮ মিনিট পড়া • ৬ ধাপ",
  "7 Min Read • 5 Steps": "৭ মিনিট পড়া • ৫ ধাপ",

  // News & Insights
  "News & Insights": "সংবাদ ও অন্তর্দৃষ্টি",
  "News, Buying Guides & Channel Updates": "খবর, কেনার নির্দেশিকা ও চ্যানেল আপডেট",
  "Industry Insights & Updates": "আইটি খাতের বিশ্লেষণ ও তথ্য",
  "Technical analysis, product launch announcements, and buying recommendations from South Bangla Computers.": "সাউথ বাংলা কম্পিউটার্সের টেকনিক্যাল বিশ্লেষণ, পণ্য উন্মোচন এবং কেনার সঠিক পরামর্শ।",
  "All Articles (6)": "সকল আর্টিকেল (৬)",
  "Buying Guides": "কেনার নির্দেশিকা",
  "Company News": "কোম্পানি সংবাদ",
  "Technical Analysis": "প্রযুক্তিগত বিশ্লেষণ",

  // Solution Configurator Page
  "Enterprise Network": "এন্টারপ্রাইজ নেটওয়ার্ক",
  "Solution Configurator": "সলিউশন কনফিগারেটর",
  "Design your custom network topology in 3 simple steps. Select deployment scenario, concurrent users, and bandwidth tier to generate verified equipment lists from Cisco, Tenda, and HSGQ with instant tender-ready BOM export.": "৩টি সহজ ধাপে আপনার কাস্টম নেটওয়ার্ক টপোলজি তৈরি করুন। ব্যবহারকারীর সংখ্যা ও ব্যান্ডউইথ অনুযায়ী যন্ত্রপাতি তালিকা এবং টেন্ডার-উপযোগী বিওএম ডাউনলোড করুন।",
  "Start Network Plan": "নেটওয়ার্ক প্ল্যান শুরু করুন",
  "Start Network Plan ↓": "নেটওয়ার্ক প্ল্যান শুরু করুন ↓",
  "Submit Corporate Tender / RFP": "কর্পোরেট টেন্ডার / আরএফপি জমা দিন",

  // RFQ Quote Page
  "Corporate Tender &": "কর্পোরেট টেন্ডার ও",
  "Commercial Quotations (RFQ)": "বাণিজ্যিক কোটেশন (RFQ)",
  "Submit your enterprise network bill of materials, tender specifications, or bulk dealer procurement requirements for authorized distributor pricing and official manufacturer warranties.": "অনুমোদিত ডিস্ট্রিবিউটর মূল্য ও অফিসিয়াল ওয়ারেন্টির জন্য আপনার প্রাতিষ্ঠানিক প্রকিউরমেন্ট চাহিদা ও স্পেসিফিকেশন পাঠান।",
  "Fill RFQ Form": "কোটেশন ফর্ম পূরণ করুন",
  "Fill RFQ Form ↓": "কোটেশন ফর্ম পূরণ করুন ↓",
  "Use Network Configurator": "নেটওয়ার্ক কনফিগারেটর ব্যবহার করুন",
  "Organization / Company Name:": "প্রতিষ্ঠান / কোম্পানির নাম:",
  "Contact Person & Designation:": "যোগাযোগকারী ব্যক্তি ও পদবী:",
  "Mobile Number (BD 11-digit):": "মোবাইল নম্বর (১১ ডিজিট):",
  "Official Email Address:": "অফিসিয়াল ইমেইল অ্যাড্রেস:",
  "Project District / Location:": "প্রকল্পের জেলা / এলাকা:",
  "Estimated Procurement Timeline:": "আনুমানিক ক্রয়ের সময়সীমা:",
  "Hardware Categories Needed:": "প্রয়োজনীয় হার্ডওয়্যার ক্যাটাগরি:",
  "Wi-Fi Routers & Access Points": "ওয়াই-ফাই রাউটার ও এক্সেস পয়েন্ট",
  "Managed & PoE Switches": "ম্যানেজড ও পিওই সুইচ",
  "Fiber OLT, ONU & Splitters": "ফাইবার ওএলটি, ওএনইউ ও স্প্লিটার",
  "Server Racks & Structured Cabling": "সার্ভার র্যাক ও স্ট্রাকচার্ড ক্যাব্লিং",
  "Peripherals, Keyboards & Mice": "মাউস, কীবোর্ড ও পেরিফেরালস",
  "Online UPS & Power Backup": "অনলাইন ইউপিএস ও পাওয়ার ব্যাকআপ",
  "Detailed Equipment Requirements / BoM:": "বিস্তারিত চাহিদাপত্র / বিওএম:",
  "Attach BoM / Tender Spec (PDF Simulation):": "বিওএম বা টেন্ডার ডকুমেন্ট যুক্ত করুন (PDF):",
  "Immediate (Within 7 Days)": "জরুরি (৭ দিনের মধ্যে)",
  "15 to 30 Days": "১৫ থেকে ৩০ দিনের মধ্যে",
  "Quarterly Budget Planning": "ত্রৈমাসিক বাজেট পরিকল্পনা",

  // Compare Page
  "Hardware Specification Comparison": "হার্ডওয়্যার স্পেসিফিকেশন তুলনা",
  "Specification Comparison": "স্পেসিফিকেশন তুলনা",
  "Inspect differences across port layouts, wireless throughput standards, PoE power budgets, and warranties.": "বিভিন্ন পণ্যের পোর্ট, ওয়্যারলেস স্পিড, পিওই বাজেট এবং ওয়ারেন্টির পার্থক্যগুলো পাশাপাশি দেখুন।",
  "+ Add More Products": "+ আরও পণ্য যোগ করুন",
  "Add More Products": "আরও পণ্য যোগ করুন",

  // Order Confirmation & Invoicing
  "Order Placed Successfully!": "অর্ডার সফলভাবে গ্রহণ করা হয়েছে!",
  "Thank you for ordering with South Bangla Computers. A simulation confirmation SMS has been prepared.": "সাউথ বাংলা কম্পিউটার্স থেকে অর্ডার করার জন্য ধন্যবাদ। আপনার অর্ডারটি প্রক্রিয়াকরণ শুরু হয়েছে।",
  "Order Reference:": "অর্ডার রেফারেন্স:",
  "Customer & Delivery:": "গ্রাহক ও ডেলিভারির তথ্য:",
  "Order Details:": "অর্ডারের বিবরণ:",
  "Payment:": "পেমেন্ট পদ্ধতি:",
  "Delivery:": "ডেলিভারি:",
  "Courier Delivery": "কুরিয়ার ডেলিভারি",
  "Cash on Delivery": "ক্যাশ অন ডেলিভারি",
  "Item & Description": "পণ্য ও বিবরণ",
  "Qty": "পরিমাণ",
  "Unit Price": "একক মূল্য",
  "Amount": "মোট",
  "Subtotal:": "সাবটোটাল:",
  "Total Paid/Due:": "সর্বমোট প্রদেয়:",
  "Print Invoice": "চালান প্রিন্ট করুন",
  "Track in My Account": "অ্যাকাউন্টে ট্র্যাক করুন",
  "Continue Shopping": "আরও কেনাকাটা করুন",
  "Continue Shopping →": "আরও কেনাকাটা করুন →",
  "No Order Found": "কোনো অর্ডার পাওয়া যায়নি",
  "We couldn't locate this order in your local demo history.": "আপনার ডেমো হিস্ট্রিতে এই অর্ডারটি খুঁজে পাওয়া যায়নি।",
  "Browse Products": "পণ্য তালিকা দেখুন",

  // Legal & Privacy Pages
  "Terms & Conditions of Sale": "বিক্রয় নীতিমালা ও শর্তাবলী",
  "Terms of Service": "ব্যবহারের শর্তাবলী",
  "1. General Agreement": "১. সাধারণ চুক্তি ও সম্মতি",
  "2. Pricing, Invoicing & VAT": "২. মূল্যতালিকা, চালান ও ভ্যাট",
  "3. Order Acceptance & Inventory Allocation": "৩. অর্ডার গ্রহণ ও স্টক ব্যবস্থাপনা",
  "4. Governing Jurisdiction": "৪. আইনি এখতিয়ার ও বিচারব্যবস্থা",
  "Privacy Policy": "প্রাইভেসি পলিসি",
  "1. Information We Collect": "১. সংগৃহীত তথ্যের বিবরণ",
  "2. Use of Collected Data": "২. সংগৃহীত তথ্যের ব্যবহার",
  "3. Data Security & Storage": "৩. তথ্যের নিরাপত্তা ও সংরক্ষণ",
  "4. Cookie Policy": "৪. কুকি ও ব্রাউজিং ডেটা নীতি",
  "5. Contact Our Data Compliance Team": "৫. প্রাইভেসি ও কমপ্লায়েন্স যোগাযোগ",
  "Last Updated:": "সর্বশেষ আপডেট:"
};

/**
 * Auto-translate DOM elements matching data-i18n or known text patterns across all pages
 */
window.SBC.i18n.translatePage = function () {
  const currentLang = (window.SBC && window.SBC.config && window.SBC.config.LANG) || "bn";
  const phrases = window.SBC.i18n.EN_TO_BN_PHRASES || {};

  function matchPhrase(rawText) {
    if (!rawText) return null;
    const clean = rawText.trim();
    if (!clean) return null;
    const norm = clean.replace(/\s+/g, ' ');
    if (phrases[clean]) return phrases[clean];
    if (phrases[norm]) return phrases[norm];
    
    // Check with/without trailing colon
    if (norm.endsWith(':') && phrases[norm.slice(0, -1).trim()]) {
      return phrases[norm.slice(0, -1).trim()] + ':';
    }
    // Check with/without trailing arrows (→, &rarr;, etc.)
    const strippedArrow = norm.replace(/\s*(?:→|&rarr;|↓|&darr;)\s*$/i, '').trim();
    if (strippedArrow && phrases[strippedArrow]) {
      const arrow = norm.includes('→') ? ' →' : (norm.includes('↓') ? ' ↓' : '');
      return phrases[strippedArrow] + arrow;
    }
    return null;
  }

  // 1. Elements with explicit data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (key) {
      el.textContent = window.SBC.t(key, el.textContent);
    }
  });

  // 2. Elements with data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) {
      el.placeholder = window.SBC.t(key, el.placeholder);
    }
  });

  // 3. Site-Wide Dynamic Phrase Translator (translates text on any page without breaking layout)
  if (currentLang === "bn") {
    // A. Leaf elements containing text
    const selectors = "h1, h2, h3, h4, h5, h6, p, span, a, button, label, th, td, li, dt, dd, strong, b, em, small, figcaption, .about-metric-value, .about-metric-label, .about-metric-desc";
    document.querySelectorAll(selectors).forEach(el => {
      // Skip if element has data-i18n (already handled) or is a script/style
      if (el.hasAttribute("data-i18n") || el.closest("script, style")) return;

      // Pure leaf element (no element children)
      if (el.children.length === 0) {
        const tr = matchPhrase(el.textContent);
        if (tr) {
          if (!el.dataset.sbcOrigEn) el.dataset.sbcOrigEn = el.textContent;
          el.textContent = tr;
        }
      } else {
        // Element with mixed children (like an icon svg + text)
        Array.from(el.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            const raw = node.nodeValue;
            const tr = matchPhrase(raw);
            if (tr) {
              if (!node._sbcOrigVal) node._sbcOrigVal = raw;
              node.nodeValue = raw.replace(raw.trim(), tr);
            }
          }
        });
      }
    });

    // B. Input / Textarea Placeholders
    document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(el => {
      if (el.hasAttribute("data-i18n-placeholder")) return;
      const tr = matchPhrase(el.placeholder);
      if (tr) {
        if (!el.dataset.sbcOrigPl) el.dataset.sbcOrigPl = el.placeholder;
        el.placeholder = tr;
      }
    });
  } else if (currentLang === "en") {
    // English mode: restore original English text if previously translated
    document.querySelectorAll("[data-sbc-orig-en]").forEach(el => {
      el.textContent = el.dataset.sbcOrigEn;
      delete el.dataset.sbcOrigEn;
    });
    document.querySelectorAll("[data-sbc-orig-pl]").forEach(el => {
      el.placeholder = el.dataset.sbcOrigPl;
      delete el.dataset.sbcOrigPl;
    });
  }

  // 4. Update language toggle buttons active state
  document.querySelectorAll("[data-lang]").forEach(btn => {
    const bLang = btn.getAttribute("data-lang");
    if (bLang === currentLang) {
      btn.classList.add("is-active");
    } else {
      btn.classList.remove("is-active");
    }
  });

  // 5. Update topbar language labels
  document.querySelectorAll(".js-current-lang-text").forEach(el => {
    el.textContent = currentLang === "bn" ? "বাংলা" : "English";
  });
  document.querySelectorAll(".js-current-lang-flag").forEach(el => {
    el.textContent = currentLang === "bn" ? "🇧🇩" : "🇬🇧";
  });
};

// Automatically execute translatePage on DOMContentLoaded or immediately if ready
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      if (window.SBC && window.SBC.i18n && typeof window.SBC.i18n.translatePage === "function") {
        window.SBC.i18n.translatePage();
      }
    });
  } else {
    setTimeout(function () {
      if (window.SBC && window.SBC.i18n && typeof window.SBC.i18n.translatePage === "function") {
        window.SBC.i18n.translatePage();
      }
    }, 20);
  }
}

