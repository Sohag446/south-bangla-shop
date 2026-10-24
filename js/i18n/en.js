/**
 * English String Dictionary
 * Blueprint §13.9
 */
window.SBC = window.SBC || {};
window.SBC.i18n = window.SBC.i18n || {};

window.SBC.i18n.en = {
  // Common
  "site.title": "South Bangla Computers",
  "site.tagline": "Striving For ICT Excellence Since 1999",
  "common.addToCart": "Add to cart",
  "common.requestQuote": "Request quote",
  "common.viewDetails": "View details",
  "common.compare": "Compare",
  "common.wishlist": "Wishlist",
  "common.inStock": "In stock",
  "common.lowStock": "Low stock",
  "common.outOfStock": "Out of stock",
  "common.discontinued": "Discontinued",
  "common.preorder": "Pre-order",
  "common.demoPrice": "Demo price",
  "common.dealerPrice": "Dealer price",
  "common.allProducts": "All Products",
  "common.searchPlaceholder": "Search networking gear, models, brands...",
  
  // Header & Nav
  "nav.shop": "Shop",
  "nav.brands": "Brands",
  "nav.solutions": "Solutions",
  "nav.dealers": "Dealers",
  "nav.support": "Support",
  "nav.learn": "Learn",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.becomeDealer": "Become a dealer",
  "nav.account": "Account",
  "nav.cart": "Cart",
  
  // Footer
  "footer.quickLinks": "Quick Links",
  "footer.contactInfo": "Head Office",
  "footer.copyright": "© 2026 South Bangla Computers. All Rights Reserved.",
  "footer.simulatedNotice": "Prototype with simulated data for demonstration purposes."
};

window.SBC.t = function(key, fallback) {
  const dict = window.SBC.i18n[window.SBC.config.LANG] || window.SBC.i18n.en;
  return dict[key] || fallback || key;
};
