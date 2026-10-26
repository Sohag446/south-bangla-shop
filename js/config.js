/**
 * South Bangla Computers Prototype Configuration
 * DESIGN-TOKENS.json §config
 */
window.SBC = window.SBC || {};

// Determine initial language: primary is Bangla ('bn'), secondary is English ('en')
let initialLang = "bn";
try {
  const saved = localStorage.getItem("sbc.lang") || localStorage.getItem("sbc_lang");
  if (saved === "bn" || saved === "en") {
    initialLang = saved;
  }
} catch (e) {}

window.SBC.config = {
  DEMO_MODE: true,
  DEMO_PRICING: true,
  PRICE_MODE: "hybrid", // "retail" | "quote" | "hybrid"
  PRICE_MODE_OPTIONS: ["retail", "quote", "hybrid"],
  CURRENCY: "BDT",
  CURRENCY_SYMBOL: "৳",
  LANG: initialLang,
  ASSET_BASE_LOCAL: "assets/img/products/",
  ASSET_BASE_REMOTE_DEMO: "https://www.southbanglabd.com/backend/products/image/",
  ASSET_BRAND_REMOTE: "https://www.southbanglabd.com/backend/brand/logo/",
  VERSION: "1.0.0"
};

// Set html lang attribute early
if (document.documentElement) {
  document.documentElement.lang = initialLang;
}

