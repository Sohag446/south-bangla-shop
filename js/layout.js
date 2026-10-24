/**
 * Shared Layout Renderer (Header, Mega-Menu, Mobile Drawer, Footer, Compare Bar, SVG Sprite)
 * Blueprint §6, §13.3, §13.8
 */
window.SBC = window.SBC || {};

// Ensure late listeners for "SBC:ready" are executed immediately if initialization already happened
(function () {
  const _origAddEventListener = window.addEventListener;
  window.addEventListener = function (type, listener, options) {
    _origAddEventListener.call(window, type, listener, options);
    if (type === "SBC:ready" && window.SBC.isReady && typeof listener === "function") {
      setTimeout(listener, 0);
    }
  };
})();

window.SBC.layout = (function () {
  const util = window.SBC.util;
  const store = window.SBC.store;
  const ui = window.SBC.ui;

  /**
   * Inject Inline SVG Icon Sprite
   */
  function injectSvgSprite() {
    if (document.getElementById("sbc-svg-sprite")) return;
    const sprite = document.createElement("div");
    sprite.id = "sbc-svg-sprite";
    sprite.style.display = "none";
    sprite.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" style="display:none;">
        <defs>
          <symbol id="icon-shopping-cart" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></symbol>
          <symbol id="icon-heart" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></symbol>
          <symbol id="icon-shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></symbol>
          <symbol id="icon-shuffle" viewBox="0 0 24 24"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></symbol>
          <symbol id="icon-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></symbol>
          <symbol id="icon-user" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></symbol>
          <symbol id="icon-menu" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></symbol>
          <symbol id="icon-x" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></symbol>
          <symbol id="icon-wifi" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></symbol>
          <symbol id="icon-layers" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></symbol>
          <symbol id="icon-share-2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></symbol>
          <symbol id="icon-radio" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></symbol>
          <symbol id="icon-video" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></symbol>
          <symbol id="icon-zap" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></symbol>
          <symbol id="icon-server" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></symbol>
          <symbol id="icon-tool" viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></symbol>
          <symbol id="icon-headphones" viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></symbol>
          <symbol id="icon-monitor" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></symbol>
          <symbol id="icon-box" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></symbol>
          <symbol id="icon-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></symbol>
          <symbol id="icon-mail" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></symbol>
          <symbol id="icon-map-pin" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></symbol>
          <symbol id="icon-check" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></symbol>
          <symbol id="icon-check-circle" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></symbol>
          <symbol id="icon-alert-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></symbol>
          <symbol id="icon-alert-triangle" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></symbol>
          <symbol id="icon-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></symbol>
          <symbol id="icon-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></symbol>
          <symbol id="icon-file-text" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></symbol>
          <symbol id="icon-bell" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></symbol>
          <symbol id="icon-chevron-right" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></symbol>
          <symbol id="icon-chevron-down" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></symbol>
          <symbol id="icon-chevron-left" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></symbol>
          <symbol id="icon-chevron-up" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></symbol>
          <symbol id="icon-arrow-right" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></symbol>
          <symbol id="icon-sliders" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></symbol>
          <symbol id="icon-download" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></symbol>
          <symbol id="icon-plus" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></symbol>
          <symbol id="icon-minus" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/></symbol>
          <symbol id="icon-trash-2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></symbol>
          <symbol id="icon-printer" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></symbol>
          <symbol id="icon-facebook" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></symbol>
          <symbol id="icon-youtube" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></symbol>
          <symbol id="icon-linkedin" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></symbol>
          <symbol id="icon-activity" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></symbol>
          <symbol id="icon-cpu" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></symbol>
          <symbol id="icon-message-square" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></symbol>
          <symbol id="icon-clipboard-check" viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><polyline points="9 14 11 16 15 12"/></symbol>
          <symbol id="icon-truck" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></symbol>
          <symbol id="icon-calendar" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></symbol>
          <symbol id="icon-star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></symbol>
          <symbol id="icon-award" viewBox="0 0 24 24"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></symbol>
          <symbol id="icon-external-link" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></symbol>
        </defs>
      </svg>
    `;
    document.body.insertBefore(sprite, document.body.firstChild);
  }

  /**
   * Render Announcement Bar (H0)
   */
  function renderAnnouncement() {
    const isDealerSession = store.isDealer();
    if (!isDealerSession) return "";
    const session = store.getSession();
    return `
      <div class="sbc-dealer-bar">
        <div class="l-container u-flex-between">
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="sbc-badge sbc-badge--dealer" style="background:#0B7A52;color:#fff;">DEALER ACTIVE</span>
            <span>${util.esc(session.businessName || 'Delta Networking')} (${util.esc(session.tier || 'Tier 1')})</span>
          </div>
          <div style="display:flex;align-items:center;gap:16px;">
            <a href="${util.U('dealer/dashboard.html')}">Dealer Portal &rarr;</a>
            <a href="${util.U('dealer/bulk-order.html')}">Bulk Order Tool</a>
            <a href="#" class="js-logout" style="color:#fca5a5;">Logout</a>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Header (H1) - 3-Tier Design Matching Screenshot
   */
  function renderHeader() {
    const currentPage = document.body.dataset.page || "";
    const cartCount = store.getCartCount();
    const wishlistCount = store.getWishlistCount();
    const session = store.getSession();

    const accountUrl = session ? (session.type === "dealer" ? util.U('dealer/dashboard.html') : util.U('account/index.html')) : util.U('login.html');
    const accountUserText = session ? (session.name ? session.name.split(' ')[0] : 'My Account') : 'My Account';
    const accountSubText = session ? (session.type === "dealer" ? 'Dealer Portal' : 'Dashboard') : 'Login / Register';

    return `
      ${renderAnnouncement()}
      <header class="sbc-header">
        <!-- TIER 1: Top Bar (Navy #071526) -->
        <div class="sbc-topbar">
          <div class="l-container sbc-topbar__inner">
            <div class="sbc-topbar__left">
              <a href="tel:+8801711234567" class="sbc-topbar__link">
                ${ui.icon("phone", "xs")}
                <span>+880 1711 234567</span>
              </a>
              <a href="mailto:info@southbanglacomputer.com" class="sbc-topbar__link">
                ${ui.icon("mail", "xs")}
                <span>info@southbanglacomputer.com</span>
              </a>
              <span class="sbc-topbar__item">
                ${ui.icon("map-pin", "xs")}
                <span>Dhaka, Bangladesh</span>
              </span>
            </div>
            <div class="sbc-topbar__right">
              <a href="${util.U('branches.html')}" class="sbc-topbar__link">Track Order</a>
              <span class="sbc-topbar__divider">|</span>
              <a href="${util.U('support.html')}" class="sbc-topbar__link">Support</a>
              <span class="sbc-topbar__divider">|</span>
              <a href="${util.U('faq.html')}" class="sbc-topbar__link">FAQ</a>
              <span class="sbc-topbar__divider">|</span>
              <div class="sbc-topbar__lang" title="Select Language">
                <span>English</span>
                ${ui.icon("chevron-down", "xs")}
              </div>
            </div>
          </div>
        </div>

        <!-- TIER 2: Main Header Bar (White #FFFFFF) -->
        <div class="sbc-main-header">
          <div class="l-container sbc-main-header__inner">
            <!-- Brand Logo -->
            <a href="${util.U('index.html')}" class="sbc-main-header__logo" aria-label="South Bangla Computer">
              <img src="${util.getRoot()}assets/img/logo.png" alt="South Bangla Computer" onerror="this.src='${util.getRoot()}sbc-logo-24-style.png'">
            </a>

            <!-- Search Form -->
            <div class="sbc-main-header__search" id="sbc-desktop-search-wrap">
              <form action="${util.U('shop.html')}" method="GET" class="sbc-main-search-form" id="sbc-search-form">
                <input type="search" name="q" class="sbc-main-search-form__input" placeholder="Search products, brands and models..." autocomplete="off" id="sbc-global-search">
                <button type="submit" class="sbc-main-search-form__submit" aria-label="Search">
                  ${ui.icon("search", "sm")}
                </button>
              </form>
              <div id="sbc-search-suggestions" class="sbc-search-dropdown" style="display:none;"></div>
            </div>

            <!-- Action Badges (My Account, Wishlist, Cart) -->
            <div class="sbc-main-header__actions">
              <!-- Account -->
              <a href="${accountUrl}" class="sbc-header-action sbc-header-action--account" title="Customer / Dealer Account">
                <div class="sbc-header-action__icon sbc-header-action__icon--user">
                  ${ui.icon("user", "md")}
                </div>
                <div class="sbc-header-action__text">
                  <span class="sbc-header-action__title">${util.esc(accountUserText)}</span>
                  <span class="sbc-header-action__subtitle">${util.esc(accountSubText)}</span>
                </div>
              </a>

              <!-- Wishlist -->
              <a href="${util.U('wishlist.html')}" class="sbc-header-action sbc-header-action--wishlist" title="Saved Wishlist">
                <div class="sbc-header-action__icon">
                  ${ui.icon("heart", "md")}
                </div>
                <div class="sbc-header-action__text">
                  <span class="sbc-header-action__title">Wishlist <span class="sbc-header-action__count js-wishlist-badge">(${wishlistCount})</span></span>
                </div>
              </a>

              <!-- Cart -->
              <a href="${util.U('cart.html')}" class="sbc-header-action sbc-header-action--cart js-open-mini-cart" title="Shopping Cart">
                <div class="sbc-header-action__icon">
                  ${ui.icon("shopping-cart", "md")}
                </div>
                <div class="sbc-header-action__text">
                  <span class="sbc-header-action__title">Cart <span class="sbc-header-action__count js-cart-badge">(${cartCount})</span></span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- TIER 3: Primary Navigation Bar (Navy #071526) -->
        <nav class="sbc-navbar" aria-label="Main Navigation">
          <div class="l-container sbc-navbar__inner">
            <div class="sbc-navbar__menu">
              <!-- 1. Home -->
              <div class="sbc-nav-item">
                <a href="${util.U('index.html')}" class="sbc-nav-link ${currentPage === 'home' ? 'is-active' : ''}">Home</a>
              </div>

              <!-- 2. About Us -->
              <div class="sbc-nav-item">
                <a href="${util.U('about.html')}" class="sbc-nav-link ${currentPage === 'about' ? 'is-active' : ''}">About Us</a>
              </div>

              <!-- 3. Shop + Mega Menu -->
              <div class="sbc-nav-item sbc-nav-item--has-megamenu">
                <a href="${util.U('shop.html')}" class="sbc-nav-link ${currentPage === 'shop' || currentPage === 'products' ? 'is-active' : ''}" aria-haspopup="true" aria-expanded="false" id="nav-shop-btn">
                  Shop ${ui.icon("chevron-down", "xs")}
                </a>
                <div class="sbc-megamenu sbc-megamenu--shop" id="shop-megamenu" role="region" aria-labelledby="nav-shop-btn">
                  <div class="sbc-megamenu__header">
                    <div>
                      <div class="sbc-megamenu__header-title">Hardware Catalogue &amp; Equipment</div>
                      <div class="sbc-megamenu__header-sub">Authentic ICT devices, passive optical equipment &amp; enterprise power backup</div>
                    </div>
                    <a href="${util.U('shop.html')}#shop-catalog" style="color:var(--c-primary);font-weight:700;font-size:12px;text-decoration:none;">
                      All 500+ Catalog SKUs &rarr;
                    </a>
                  </div>
                  <div class="sbc-megamenu__inner">
                    <!-- Column 1: Hardware Categories -->
                    <div class="sbc-megamenu__col">
                      <div class="sbc-megamenu__heading">Networking Categories</div>
                      <ul class="sbc-megamenu__list">
                        <li><a href="${util.U('shop.html', { c: 'routers-wifi' })}#shop-catalog">${ui.icon("wifi", "sm")} Routers &amp; Wi-Fi</a></li>
                        <li><a href="${util.U('shop.html', { c: 'switches' })}#shop-catalog">${ui.icon("server", "sm")} Switches &amp; PoE</a></li>
                        <li><a href="${util.U('shop.html', { c: 'fiber-pon' })}#shop-catalog">${ui.icon("activity", "sm")} Fiber, PON &amp; ONU</a></li>
                        <li><a href="${util.U('shop.html', { c: 'wireless-outdoor' })}#shop-catalog">${ui.icon("radio", "sm")} Access Points &amp; Outdoor</a></li>
                        <li><a href="${util.U('shop.html', { c: 'security-cctv' })}#shop-catalog">${ui.icon("shield", "sm")} CCTV &amp; Surveillance</a></li>
                      </ul>
                    </div>

                    <!-- Column 2: Infrastructure & Power -->
                    <div class="sbc-megamenu__col">
                      <div class="sbc-megamenu__heading">Power &amp; Infrastructure</div>
                      <ul class="sbc-megamenu__list">
                        <li><a href="${util.U('shop.html', { c: 'power-backup' })}#shop-catalog">${ui.icon("zap", "sm")} Power &amp; Online UPS</a></li>
                        <li><a href="${util.U('shop.html', { c: 'cabling-racks' })}#shop-catalog">${ui.icon("layers", "sm")} Cabling &amp; Server Racks</a></li>
                        <li><a href="${util.U('shop.html', { c: 'fiber-tools' })}#shop-catalog">${ui.icon("tool", "sm")} Fiber Tools &amp; Splicers</a></li>
                        <li><a href="${util.U('shop.html', { c: 'peripherals-audio' })}#shop-catalog">${ui.icon("headphones", "sm")} Peripherals &amp; Audio</a></li>
                        <li><a href="${util.U('shop.html', { c: 'computer-accessories' })}#shop-catalog">${ui.icon("cpu", "sm")} Computer Accessories</a></li>
                      </ul>
                    </div>

                    <!-- Column 3: Featured Brands -->
                    <div class="sbc-megamenu__col">
                      <div class="sbc-megamenu__heading">Top Partner Brands</div>
                      <ul class="sbc-megamenu__list">
                        <li><a href="${util.U('shop.html', { b: 'meetion' })}#shop-catalog"><strong style="color:var(--c-primary);">Meetion</strong> &mdash; Gaming/Office</a></li>
                        <li><a href="${util.U('shop.html', { b: 'tenda' })}#shop-catalog"><strong>Tenda</strong> &mdash; Networking</a></li>
                        <li><a href="${util.U('shop.html', { b: 'cisco' })}#shop-catalog"><strong>Cisco</strong> &mdash; Enterprise</a></li>
                        <li><a href="${util.U('shop.html', { b: 'hsgq' })}#shop-catalog"><strong>HSGQ</strong> &mdash; FTTH &amp; PON</a></li>
                        <li><a href="${util.U('shop.html', { b: 'solitine' })}#shop-catalog"><strong>Solitine</strong> &mdash; Cabling</a></li>
                      </ul>
                      <a href="${util.U('brand.html')}" class="sbc-megamenu__viewall">
                        View All 14 Brands &rarr;
                      </a>
                    </div>

                    <!-- Column 4: Solutions & Commercial -->
                    <div class="sbc-megamenu__col sbc-megamenu__col--featured">
                      <div class="sbc-megamenu__heading" style="border:none;margin-bottom:8px;">Enterprise Solutions</div>
                      <div class="sbc-megamenu__cards">
                        <a href="${util.U('configurator.html')}" class="sbc-megamenu-card">
                          <div class="sbc-megamenu-card__icon">${ui.icon("sliders", "md")}</div>
                          <div class="sbc-megamenu-card__body">
                            <strong>Network Configurator</strong>
                            <span>Step-by-step equipment matching</span>
                          </div>
                        </a>
                        <a href="${util.U('quote.html')}" class="sbc-megamenu-card">
                          <div class="sbc-megamenu-card__icon">${ui.icon("file-text", "md")}</div>
                          <div class="sbc-megamenu-card__body">
                            <strong>Request a Quote</strong>
                            <span>Instant B2B pricing &amp; tender RFP</span>
                          </div>
                        </a>
                        <a href="${util.U('shop.html')}#shop-catalog" class="sbc-btn sbc-btn--primary sbc-btn--sm sbc-btn--full" style="text-align:center;margin-top:4px;">
                          Explore Shop Catalog &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 4. Brands + Mega Menu (Highlighting Meetion) -->
              <div class="sbc-nav-item sbc-nav-item--has-megamenu">
                <a href="${util.U('brand.html')}" class="sbc-nav-link ${currentPage === 'brand' || currentPage === 'brands' ? 'is-active' : ''}" aria-haspopup="true" aria-expanded="false" id="nav-brands-btn">
                  Brands ${ui.icon("chevron-down", "xs")}
                </a>
                <div class="sbc-megamenu sbc-megamenu--brands" id="brands-megamenu" role="region" aria-labelledby="nav-brands-btn">
                  <div class="sbc-megamenu__header">
                    <div>
                      <div class="sbc-megamenu__header-title">Official Authorized Brand Partnerships</div>
                      <div class="sbc-megamenu__header-sub">Direct importer partnerships with genuine manufacturer warranty &amp; technical RMA</div>
                    </div>
                    <a href="${util.U('brand.html')}" style="color:var(--c-primary);font-weight:700;font-size:12px;text-decoration:none;">
                      All 14 Brands &rarr;
                    </a>
                  </div>

                  <!-- Meetion Spotlight Feature Banner -->
                  <div class="sbc-megamenu-meetion-spotlight" style="background:linear-gradient(135deg, #071526 0%, #0f2b48 100%);border-radius:10px;padding:14px 18px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;border:1px solid rgba(0,112,186,0.4);box-shadow:0 4px 16px rgba(0,0,0,0.12);">
                    <div style="display:flex;align-items:center;gap:16px;">
                      <div style="background:#ffffff;padding:6px 12px;border-radius:8px;display:flex;align-items:center;justify-content:center;height:42px;min-width:110px;">
                        <img src="${util.getRoot()}assets/brand image/924112071.png" alt="Meetion" style="max-height:28px;max-width:96px;object-fit:contain;">
                      </div>
                      <div>
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
                          <span style="background:#0070ba;color:#ffffff;font-size:9.5px;font-weight:800;letter-spacing:1px;padding:2px 7px;border-radius:4px;text-transform:uppercase;">OFFICIAL BANGLADESH DISTRIBUTOR</span>
                          <span style="color:#38bdf8;font-size:11px;font-weight:700;">★ Featured Hero Brand</span>
                        </div>
                        <div style="color:#ffffff;font-size:12.5px;font-weight:600;">Meetion Pro Mechanical Keyboards, Ergonomic Wireless Mice, Headsets &amp; Accessories</div>
                      </div>
                    </div>
                    <a href="${util.U('shop.html', { b: 'meetion' })}#shop-catalog" class="sbc-btn sbc-btn--primary sbc-btn--sm" style="background:#0070ba;border-color:#0070ba;color:#fff;font-weight:700;white-space:nowrap;padding:7px 16px;">
                      Explore Meetion &rarr;
                    </a>
                  </div>

                  <!-- 5-Column Grid with All 14 Verified Partner Brands -->
                  <div class="sbc-brands-grid" style="display:grid;grid-template-columns:repeat(5, 1fr);gap:10px;">
                    <a href="${util.U('shop.html', { b: 'tenda' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/292026613.png" alt="Tenda" loading="lazy"></div>
                      <span class="sbc-brand-card__name">Tenda</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">Wi-Fi 7 / 6 Routers &amp; Mesh</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'cisco' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/1202929252.png" alt="Cisco" loading="lazy"></div>
                      <span class="sbc-brand-card__name">Cisco</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">Enterprise Switches &amp; Routers</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'solitine' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/1773848880.png" alt="Solitine" loading="lazy"></div>
                      <span class="sbc-brand-card__name">Solitine</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">Armored Fiber &amp; Patch Cords</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'hsgq' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/1261830325.png" alt="HSGQ" loading="lazy"></div>
                      <span class="sbc-brand-card__name">HSGQ</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">EPON / GPON OLTs &amp; ONUs</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'must' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/1525673256.png" alt="Must" loading="lazy"></div>
                      <span class="sbc-brand-card__name">Must</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">Online UPS &amp; Solar Inverters</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'tumtec' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/533885831.png" alt="Tumtec" loading="lazy"></div>
                      <span class="sbc-brand-card__name">Tumtec</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">Optical Fusion Splicers</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'ubiquiti' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/580336898.png" alt="Ubiquiti" loading="lazy"></div>
                      <span class="sbc-brand-card__name">Ubiquiti</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">UniFi Enterprise Wireless</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'marsriva' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/1619816335.png" alt="Marsriva" loading="lazy"></div>
                      <span class="sbc-brand-card__name">Marsriva</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">Smart Mini DC Router UPS</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'rosenberger' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/1461064408.png" alt="Rosenberger" loading="lazy"></div>
                      <span class="sbc-brand-card__name">Rosenberger</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">Structured Cabling Systems</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'ip-com' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/425038089.png" alt="IP-Com" loading="lazy"></div>
                      <span class="sbc-brand-card__name">IP-Com</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">Commercial PoE &amp; Long APs</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'ewin' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/256242652.png" alt="Ewin" loading="lazy"></div>
                      <span class="sbc-brand-card__name">Ewin</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">Network Peripherals &amp; Cards</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'hkc' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/1314348991.png" alt="HKC" loading="lazy"></div>
                      <span class="sbc-brand-card__name">HKC</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">High-Definition Monitors</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'phyhome' })}#shop-catalog" class="sbc-brand-card">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/331461559.png" alt="Phyhome" loading="lazy"></div>
                      <span class="sbc-brand-card__name">Phyhome</span>
                      <span style="font-size:10px;color:var(--c-text-muted);margin-top:2px;">FTTH Active Transceivers</span>
                    </a>
                    <a href="${util.U('shop.html', { b: 'meetion' })}#shop-catalog" class="sbc-brand-card" style="border-color:rgba(255,107,0,0.4);background:rgba(255,107,0,0.03);">
                      <div class="sbc-brand-card__logo"><img src="${util.getRoot()}assets/brand image/924112071.png" alt="Meetion" loading="lazy"></div>
                      <span class="sbc-brand-card__name" style="color:#ea580c;">Meetion</span>
                      <span style="font-size:10px;color:#c2410c;margin-top:2px;">Official BD Distributor</span>
                    </a>
                  </div>

                  <div class="sbc-megamenu__footer-bar">
                    <span>100% Genuine Authorized Hardware with Direct Manufacturer Warranty</span>
                    <a href="${util.U('brand.html')}">Browse All 14 Partner Brands &rarr;</a>
                  </div>
                </div>
              </div>

              <!-- 5. Solutions Dropdown -->
              <div class="sbc-nav-item sbc-nav-item--has-dropdown">
                <a href="${util.U('configurator.html')}" class="sbc-nav-link ${currentPage === 'configurator' || currentPage === 'quote' ? 'is-active' : ''}" aria-haspopup="true" aria-expanded="false" id="nav-solutions-btn">
                  Solutions ${ui.icon("chevron-down", "xs")}
                </a>
                <div class="sbc-dropdown-menu" id="solutions-dropdown" role="menu" aria-labelledby="nav-solutions-btn">
                  <a href="${util.U('configurator.html')}" class="sbc-dropdown-link" role="menuitem">Network Solution Configurator</a>
                  <a href="${util.U('quote.html')}" class="sbc-dropdown-link" role="menuitem">Commercial Tender &amp; RFP Quote</a>
                  <a href="${util.U('dealer/index.html')}" class="sbc-dropdown-link" role="menuitem">Dealer &amp; Reseller Program</a>
                  <a href="${util.U('dealer/login.html')}" class="sbc-dropdown-link" role="menuitem">Dealer Portal Login</a>
                  <div style="border-top:1px solid var(--gray-100);margin:4px 0;"></div>
                  <a href="${util.U('branches.html')}" class="sbc-dropdown-link" role="menuitem" style="color:var(--c-primary);font-weight:600;">12 Nationwide Service Centers</a>
                  <a href="${util.U('support.html')}" class="sbc-dropdown-link" role="menuitem">Customer Support &amp; RMA Helpdesk</a>
                  <a href="${util.U('warranty.html')}" class="sbc-dropdown-link" role="menuitem">Warranty Policy &amp; Terms</a>
                </div>
              </div>

              <!-- 6. Contact -->
              <div class="sbc-nav-item">
                <a href="${util.U('contact.html')}" class="sbc-nav-link ${currentPage === 'contact' ? 'is-active' : ''}">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        <!-- MOBILE HEADER (< 1024px) -->
        <div class="sbc-header__mobile">
          <div class="sbc-header__mobile-top">
            <button class="sbc-header__hamburger js-open-mobile-nav" aria-label="Open mobile menu" type="button">
              ${ui.icon("menu", "lg")}
            </button>

            <a href="${util.U('index.html')}" class="sbc-header__mobile-logo" aria-label="South Bangla Computer">
              <img src="${util.getRoot()}assets/img/logo.png" alt="South Bangla Computer" onerror="this.src='${util.getRoot()}sbc-logo-24-style.png'">
            </a>

            <div class="sbc-header__mobile-actions">
              <a href="${accountUrl}" class="sbc-header__mobile-action" title="Account" aria-label="Account">
                ${ui.icon("user", "sm")}
              </a>
              <a href="${util.U('wishlist.html')}" class="sbc-header__mobile-action" title="Wishlist" aria-label="Wishlist">
                ${ui.icon("heart", "sm")}
                <span class="sbc-header__mobile-badge js-wishlist-badge" style="${wishlistCount === 0 ? 'display:none;' : ''}">${wishlistCount}</span>
              </a>
              <a href="${util.U('cart.html')}" class="sbc-header__mobile-action js-open-mini-cart" title="Shopping Cart" aria-label="Cart">
                ${ui.icon("shopping-cart", "sm")}
                <span class="sbc-header__mobile-badge js-cart-badge">${cartCount}</span>
              </a>
            </div>
          </div>

          <div class="sbc-header__mobile-search">
            <form action="${util.U('shop.html')}" method="GET" class="sbc-main-search-form" id="sbc-mobile-search-form">
              <input type="search" name="q" class="sbc-main-search-form__input" placeholder="Search products, brands and models..." autocomplete="off" id="sbc-mobile-search">
              <button type="submit" class="sbc-main-search-form__submit" aria-label="Search">
                ${ui.icon("search", "sm")}
              </button>
            </form>
            <div id="sbc-mobile-search-suggestions" class="sbc-search-dropdown" style="display:none;"></div>
          </div>
        </div>
      </header>
    `;
  }

  /**
   * Render Footer (H12) - 5-Column Design Matching Screenshot
   */
  function renderFooter() {
    return `
      <footer class="sbc-footer-v2">
        <div class="l-container">
          <div class="sbc-footer-v2__grid">
            <!-- Col 1: Brand & Contacts -->
            <div class="sbc-footer-v2__col sbc-footer-v2__col--brand">
              <div class="sbc-footer-v2__logo-wrap">
                <img src="${util.getRoot()}assets/img/logo.png" alt="South Bangla Computer" class="sbc-footer-v2__logo" onerror="this.src='${util.getRoot()}sbc-logo-24-style.png'">
              </div>
              <p class="sbc-footer-v2__tagline">Networking | IT Equipment | Computer Accessories</p>
              <div class="sbc-footer-v2__contact-list">
                <a href="tel:+8801711234567" class="sbc-footer-v2__contact-item">
                  ${ui.icon("phone", "sm")}
                  <span>+880 1711 234567</span>
                </a>
                <a href="mailto:info@southbanglacomputer.com" class="sbc-footer-v2__contact-item">
                  ${ui.icon("mail", "sm")}
                  <span>info@southbanglacomputer.com</span>
                </a>
                <div class="sbc-footer-v2__contact-item">
                  ${ui.icon("map-pin", "sm")}
                  <span>Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

            <!-- Col 2: Quick Links -->
            <div class="sbc-footer-v2__col">
              <h4 class="sbc-footer-v2__title">Quick Links</h4>
              <ul class="sbc-footer-v2__list">
                <li><a href="${util.U('index.html')}">Home</a></li>
                <li><a href="${util.U('shop.html')}">Shop</a></li>
                <li><a href="${util.U('shop.html')}#shop-catalog">Brands</a></li>
                <li><a href="${util.U('configurator.html')}">Solutions</a></li>
                <li><a href="${util.U('about.html')}">About Us</a></li>
                <li><a href="${util.U('contact.html')}">Contact</a></li>
              </ul>
            </div>

            <!-- Col 3: Customer Service -->
            <div class="sbc-footer-v2__col">
              <h4 class="sbc-footer-v2__title">Customer Service</h4>
              <ul class="sbc-footer-v2__list">
                <li><a href="${util.U('support.html')}">Support</a></li>
                <li><a href="${util.U('faq.html')}">FAQ</a></li>
                <li><a href="${util.U('warranty.html')}">Warranty Claim</a></li>
                <li><a href="${util.U('returns.html')}">Return &amp; Refund</a></li>
                <li><a href="${util.U('shipping.html')}">Shipping Policy</a></li>
                <li><a href="${util.U('privacy.html')}">Privacy Policy</a></li>
              </ul>
            </div>

            <!-- Col 4: Top Brands -->
            <div class="sbc-footer-v2__col">
              <h4 class="sbc-footer-v2__title">Top Brands</h4>
              <ul class="sbc-footer-v2__list">
                <li><a href="${util.U('shop.html', { b: 'meetion' })}#shop-catalog" style="font-weight:700;color:var(--c-primary);">Meetion (Authorized)</a></li>
                <li><a href="${util.U('shop.html', { b: 'cisco' })}#shop-catalog">Cisco</a></li>
                <li><a href="${util.U('shop.html', { b: 'tenda' })}#shop-catalog">Tenda</a></li>
                <li><a href="${util.U('shop.html', { b: 'hsgq' })}#shop-catalog">HSGQ</a></li>
                <li><a href="${util.U('shop.html', { b: 'solitine' })}#shop-catalog">Solitine</a></li>
                <li><a href="${util.U('shop.html', { b: 'must' })}#shop-catalog">Must Power</a></li>
              </ul>
            </div>

            <!-- Col 5: Follow Us -->
            <div class="sbc-footer-v2__col sbc-footer-v2__col--social">
              <h4 class="sbc-footer-v2__title">Follow Us</h4>
              <div class="sbc-footer-v2__socials">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="sbc-footer-v2__social-btn" aria-label="Facebook">
                  ${ui.icon("facebook", "sm")}
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="sbc-footer-v2__social-btn" aria-label="YouTube">
                  ${ui.icon("youtube", "sm")}
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="sbc-footer-v2__social-btn" aria-label="LinkedIn">
                  ${ui.icon("linkedin", "sm")}
                </a>
              </div>
              <div class="sbc-footer-v2__motto">
                <span>Better Network</span>
                <span>Brighter Future</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Copyright Bar -->
        <div class="sbc-footer-v2__bottom">
          <div class="l-container sbc-footer-v2__bottom-inner">
            <p class="sbc-footer-v2__copy">
              &copy; 2025 South Bangla Computer. All rights reserved.
            </p>
            <div class="sbc-footer-v2__legal">
              <a href="${util.U('privacy.html')}">Privacy</a>
              <a href="${util.U('terms.html')}">Terms</a>
              <a href="${util.U('returns.html')}">Return &amp; Refund</a>
              <a href="${util.U('sitemap.html')}">Sitemap</a>
              <a href="${util.U('tests/smoke.html')}" style="opacity:0.3;font-size:10px;">Smoke Tests</a>
              <a href="#" class="js-open-disclosure" style="opacity:0.3;font-size:10px;">Demo</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  /**
   * Render Compare Sticky Bottom Bar
   */
  function renderCompareBar() {
    const compare = store.getCompare();
    const count = compare.length;
    const isVisible = count > 0;

    let existing = document.getElementById("sbc-compare-tray");
    if (!existing) {
      existing = document.createElement("aside");
      existing.id = "sbc-compare-tray";
      existing.className = "sbc-compare-bar";
      existing.setAttribute("aria-label", "Product Comparison Bar");
      document.body.appendChild(existing);
    }

    if (!isVisible) {
      existing.classList.remove("is-visible");
      return;
    }

    existing.classList.add("is-visible");
    existing.innerHTML = `
      <div style="display:flex;align-items:center;gap:16px;">
        <span style="font-weight:700;font-size:var(--fs-sm);">${count} Product${count > 1 ? 's' : ''} in Comparison</span>
        <span class="u-hide-mobile" style="font-size:var(--fs-xs);color:var(--gray-300);">Compare specifications side-by-side</span>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="sbc-btn sbc-btn--sm sbc-btn--ghost js-clear-compare" style="color:var(--gray-300);">
          Clear All
        </button>
        <a href="${util.U('compare.html')}" class="sbc-btn sbc-btn--sm sbc-btn--primary">
          Compare Now &rarr;
        </a>
      </div>
    `;
  }

  /**
   * Render Floating Demo Control Button (§10.20)
   */
  function renderDemoButton() {
    if (document.getElementById("sbc-demo-btn")) return;
    const btn = document.createElement("button");
    btn.id = "sbc-demo-btn";
    btn.className = "sbc-demo-btn";
    btn.innerHTML = `${ui.icon("sliders", "sm")} Demo Tools`;
    btn.setAttribute("aria-label", "Open prototype controls");
    btn.addEventListener("click", () => {
      if (window.SBC.demo && window.SBC.demo.openPanel) {
        window.SBC.demo.openPanel();
      }
    });
    document.body.appendChild(btn);
  }

  /**
   * Show Prototype Disclosure Modal (§10.20)
   */
  function showDisclosureModal() {
    ui.modal({
      title: "About This Prototype Demonstration",
      maxWidth: 580,
      body: `
        <div style="font-size:var(--fs-sm);line-height:1.6;color:var(--c-text);">
          <div style="background:var(--blue-50);border-left:4px solid var(--blue-600);padding:12px 16px;border-radius:4px;margin-bottom:16px;">
            <strong>Demonstration Notice:</strong> This website is an interactive frontend prototype created for South Bangla Computers.
          </div>
          <p>
            <strong>What is verified from southbanglabd.com (21 Oct 2026):</strong>
            Official company identity, head office address, 8 branch and warehouse locations, customer support telephone numbers, 14 authorized brands, and 53 networking/FTTH equipment model numbers.
          </p>
          <p>
            <strong>What is simulated in this prototype:</strong>
            Authentication, dealer application approval workflows, simulated credit/cart checkout, stock counts, and prices. No real bank, credit card, bKash, or personal data is transmitted.
          </p>
          <p>
            <strong>Interactive Features to Test:</strong>
            <ul>
              <li>Faceted product filters and live search</li>
              <li>Product comparison (up to 4 products)</li>
              <li>Network Solution Configurator stepper</li>
              <li>Customer and Dealer simulated login / registration</li>
              <li>Bulk order tool with CSV parser</li>
            </ul>
          </p>
        </div>
      `,
      footer: `
        <button class="sbc-btn sbc-btn--primary js-modal-close">Understood</button>
      `
    });
  }

  /**
   * Global Event Delegation for buttons
   */
  function setupDelegation() {
    document.addEventListener("click", function (e) {
      // Add to cart
      const addCartBtn = e.target.closest(".js-add-cart");
      if (addCartBtn) {
        e.preventDefault();
        const id = addCartBtn.dataset.id;
        const qty = addCartBtn.dataset.qty || 1;
        if (id) {
          store.addToCart(id, qty);
          const p = store.getProductById(id);
          ui.toast(`Added "${p ? p.name : id}" to cart`, "success");
        }
        return;
      }

      // Wishlist toggle
      const wishlistBtn = e.target.closest(".js-toggle-wishlist");
      if (wishlistBtn) {
        e.preventDefault();
        const id = wishlistBtn.dataset.id;
        if (id) {
          const added = store.toggleWishlist(id);
          wishlistBtn.classList.toggle("is-active", added);
          ui.toast(added ? "Added to wishlist" : "Removed from wishlist", "info");
        }
        return;
      }

      // Compare toggle
      const compareInput = e.target.closest(".js-toggle-compare");
      if (compareInput) {
        const id = compareInput.dataset.id;
        if (id) {
          if (compareInput.checked) {
            const res = store.addToCompare(id);
            if (!res.success) {
              compareInput.checked = false;
              ui.toast(res.reason, "warning");
            } else {
              ui.toast(`Added to comparison (${res.count}/4)`, "info");
            }
          } else {
            store.removeFromCompare(id);
            ui.toast("Removed from comparison", "info");
          }
        }
        return;
      }

      // Clear compare
      if (e.target.closest(".js-clear-compare")) {
        store.clearCompare();
        ui.toast("Comparison list cleared", "info");
        return;
      }

      // Copy address
      const copyBtn = e.target.closest(".js-copy-address");
      if (copyBtn) {
        const text = copyBtn.dataset.address;
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            ui.toast("Address copied to clipboard", "success");
          });
        }
        return;
      }

      // Open disclosure modal
      if (e.target.closest(".js-open-disclosure")) {
        e.preventDefault();
        showDisclosureModal();
        return;
      }

      // Logout
      if (e.target.closest(".js-logout")) {
        e.preventDefault();
        store.logout();
        ui.toast("Logged out successfully", "info");
        setTimeout(() => window.location.reload(), 400);
        return;
      }

      // Open mobile drawer
      if (e.target.closest(".js-open-mobile-nav")) {
        e.preventDefault();
        openMobileNav();
        return;
      }

      // Open mini-cart drawer
      if (e.target.closest(".js-open-mini-cart")) {
        // If already on cart page, allow regular navigation
        if (window.location.pathname.endsWith("cart.html")) return;
        e.preventDefault();
        openMiniCartDrawer();
        return;
      }
    });

    // Update badges on events
    window.addEventListener("sbc:cart", () => {
      const badges = document.querySelectorAll(".js-cart-badge");
      badges.forEach(b => b.textContent = store.getCartCount());
    });
    window.addEventListener("sbc:wishlist", () => {
      const badges = document.querySelectorAll(".js-wishlist-badge");
      badges.forEach(b => {
        const c = store.getWishlistCount();
        b.textContent = c;
        b.style.display = c > 0 ? "inline-flex" : "none";
      });
    });
    window.addEventListener("sbc:compare", () => {
      const badges = document.querySelectorAll(".js-compare-badge");
      badges.forEach(b => {
        const c = store.getCompareCount();
        b.textContent = c;
        b.style.display = c > 0 ? "inline-flex" : "none";
      });
      renderCompareBar();
    });

    // Desktop Mega Menu & Dropdown Hover + Keyboard Navigation
    const navItems = document.querySelectorAll(".sbc-nav-item--has-megamenu, .sbc-nav-item--has-dropdown");
    navItems.forEach(item => {
      const menu = item.querySelector(".sbc-megamenu, .sbc-dropdown-menu");
      const link = item.querySelector(".sbc-nav-link");
      if (!menu) return;
      let timer = null;

      const openMenu = () => {
        clearTimeout(timer);
        navItems.forEach(other => {
          if (other !== item) {
            other.classList.remove("is-open");
            const otherLink = other.querySelector(".sbc-nav-link");
            if (otherLink) otherLink.setAttribute("aria-expanded", "false");
          }
        });
        item.classList.add("is-open");
        if (link) link.setAttribute("aria-expanded", "true");
      };

      const closeMenu = () => {
        timer = setTimeout(() => {
          item.classList.remove("is-open");
          if (link) link.setAttribute("aria-expanded", "false");
        }, 150);
      };

      item.addEventListener("mouseenter", openMenu);
      item.addEventListener("mouseleave", closeMenu);

      // Keyboard & Click toggle on desktop
      if (link) {
        link.addEventListener("click", (e) => {
          if (window.innerWidth >= 1024) {
            const isOpen = item.classList.contains("is-open");
            if (!isOpen) {
              e.preventDefault();
              openMenu();
            }
          }
        });
      }
    });

    // Close menus on Escape or click outside
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navItems.forEach(item => {
          item.classList.remove("is-open");
          const link = item.querySelector(".sbc-nav-link");
          if (link) link.setAttribute("aria-expanded", "false");
        });
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".sbc-nav-item")) {
        navItems.forEach(item => {
          item.classList.remove("is-open");
          const link = item.querySelector(".sbc-nav-link");
          if (link) link.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  /**
   * Mobile Navigation Drawer
   */
  function openMobileNav() {
    const session = store.getSession();
    const accountUrl = session ? (session.type === "dealer" ? util.U('dealer/dashboard.html') : util.U('account/index.html')) : util.U('login.html');
    const accountLabel = session ? (session.name || 'My Account') : 'Sign In / Register';
    const cartCount = store.getCartCount();
    const wishlistCount = store.getWishlistCount();

    ui.drawer({
      position: "left",
      title: "Menu",
      content: `
        <div class="sbc-mobile-nav">
          <a href="${util.U('index.html')}" class="sbc-mobile-nav__item">Home</a>
          <a href="${util.U('about.html')}" class="sbc-mobile-nav__item">About Us</a>

          <!-- Shop Accordion -->
          <div class="sbc-accordion js-accordion">
            <button class="sbc-accordion__trigger js-accordion-trigger" type="button" aria-expanded="false">
              <span>Shop by Category</span>
              ${ui.icon("chevron-down", "sm")}
            </button>
            <div class="sbc-accordion__content">
              <a href="${util.U('shop.html')}#shop-catalog" class="sbc-accordion__link" style="color:var(--c-primary);font-weight:700;">All 500+ Catalog SKUs &rarr;</a>
              <a href="${util.U('shop.html', { c: 'routers-wifi' })}#shop-catalog" class="sbc-accordion__link">Routers &amp; Wi-Fi</a>
              <a href="${util.U('shop.html', { c: 'switches' })}#shop-catalog" class="sbc-accordion__link">Switches &amp; PoE</a>
              <a href="${util.U('shop.html', { c: 'fiber-pon' })}#shop-catalog" class="sbc-accordion__link">Fiber, PON &amp; ONU</a>
              <a href="${util.U('shop.html', { c: 'wireless-outdoor' })}#shop-catalog" class="sbc-accordion__link">Access Points &amp; Outdoor</a>
              <a href="${util.U('shop.html', { c: 'security-cctv' })}#shop-catalog" class="sbc-accordion__link">CCTV &amp; Security</a>
              <a href="${util.U('shop.html', { c: 'power-backup' })}#shop-catalog" class="sbc-accordion__link">Power &amp; Backup (UPS)</a>
              <a href="${util.U('shop.html', { c: 'cabling-racks' })}#shop-catalog" class="sbc-accordion__link">Cabling &amp; Server Racks</a>
              <a href="${util.U('shop.html', { c: 'fiber-tools' })}#shop-catalog" class="sbc-accordion__link">Fiber Tools &amp; Splicers</a>
              <a href="${util.U('shop.html', { c: 'peripherals-audio' })}#shop-catalog" class="sbc-accordion__link">Peripherals &amp; Audio</a>
              <a href="${util.U('shop.html', { c: 'computer-accessories' })}#shop-catalog" class="sbc-accordion__link">Computer Accessories</a>
            </div>
          </div>

          <!-- Brands Accordion (Highlighting Meetion First) -->
          <div class="sbc-accordion js-accordion">
            <button class="sbc-accordion__trigger js-accordion-trigger" type="button" aria-expanded="false">
              <span>Brands &amp; Partners (14)</span>
              ${ui.icon("chevron-down", "sm")}
            </button>
            <div class="sbc-accordion__content">
              <!-- Meetion Highlight in Mobile Drawer -->
              <a href="${util.U('shop.html', { b: 'meetion' })}#shop-catalog" style="display:flex;align-items:center;justify-content:space-between;background:linear-gradient(135deg, #071526, #0f2b48);border:1px solid #0070ba;border-radius:8px;padding:10px 12px;margin-bottom:10px;text-decoration:none;">
                <div style="display:flex;align-items:center;gap:10px;">
                  <div style="background:#fff;padding:4px 8px;border-radius:4px;height:28px;display:flex;align-items:center;">
                    <img src="${util.getRoot()}assets/brand image/924112071.png" alt="Meetion" style="max-height:20px;max-width:70px;">
                  </div>
                  <div>
                    <span style="display:block;color:#fff;font-size:12px;font-weight:700;">Meetion Bangladesh</span>
                    <span style="display:block;color:#38bdf8;font-size:10px;font-weight:600;">Official Distributor &bull; Gaming &amp; Office</span>
                  </div>
                </div>
                <span style="color:#0095ff;font-size:14px;font-weight:700;">&rarr;</span>
              </a>

              <div class="sbc-mobile-brands-grid">
                <a href="${util.U('shop.html', { b: 'cisco' })}#shop-catalog" class="sbc-brand-card" style="min-height:74px;padding:8px 4px;">
                  <div class="sbc-brand-card__logo" style="height:30px;"><img src="${util.getRoot()}assets/brand image/1202929252.png" alt="Cisco" style="max-height:26px;"></div>
                  <span class="sbc-brand-card__name" style="font-size:11px;">Cisco</span>
                </a>
                <a href="${util.U('shop.html', { b: 'tenda' })}#shop-catalog" class="sbc-brand-card" style="min-height:74px;padding:8px 4px;">
                  <div class="sbc-brand-card__logo" style="height:30px;"><img src="${util.getRoot()}assets/brand image/292026613.png" alt="Tenda" style="max-height:26px;"></div>
                  <span class="sbc-brand-card__name" style="font-size:11px;">Tenda</span>
                </a>
                <a href="${util.U('shop.html', { b: 'solitine' })}#shop-catalog" class="sbc-brand-card" style="min-height:74px;padding:8px 4px;">
                  <div class="sbc-brand-card__logo" style="height:30px;"><img src="${util.getRoot()}assets/brand image/1773848880.png" alt="Solitine" style="max-height:26px;"></div>
                  <span class="sbc-brand-card__name" style="font-size:11px;">Solitine</span>
                </a>
                <a href="${util.U('shop.html', { b: 'hsgq' })}#shop-catalog" class="sbc-brand-card" style="min-height:74px;padding:8px 4px;">
                  <div class="sbc-brand-card__logo" style="height:30px;"><img src="${util.getRoot()}assets/brand image/1261830325.png" alt="HSGQ" style="max-height:26px;"></div>
                  <span class="sbc-brand-card__name" style="font-size:11px;">HSGQ</span>
                </a>
                <a href="${util.U('shop.html', { b: 'must' })}#shop-catalog" class="sbc-brand-card" style="min-height:74px;padding:8px 4px;">
                  <div class="sbc-brand-card__logo" style="height:30px;"><img src="${util.getRoot()}assets/brand image/1525673256.png" alt="Must" style="max-height:26px;"></div>
                  <span class="sbc-brand-card__name" style="font-size:11px;">Must</span>
                </a>
                <a href="${util.U('shop.html', { b: 'tumtec' })}#shop-catalog" class="sbc-brand-card" style="min-height:74px;padding:8px 4px;">
                  <div class="sbc-brand-card__logo" style="height:30px;"><img src="${util.getRoot()}assets/brand image/533885831.png" alt="Tumtec" style="max-height:26px;"></div>
                  <span class="sbc-brand-card__name" style="font-size:11px;">Tumtec</span>
                </a>
                <a href="${util.U('shop.html', { b: 'ubiquiti' })}#shop-catalog" class="sbc-brand-card" style="min-height:74px;padding:8px 4px;">
                  <div class="sbc-brand-card__logo" style="height:30px;"><img src="${util.getRoot()}assets/brand image/580336898.png" alt="Ubiquiti" style="max-height:26px;"></div>
                  <span class="sbc-brand-card__name" style="font-size:11px;">Ubiquiti</span>
                </a>
                <a href="${util.U('shop.html', { b: 'marsriva' })}#shop-catalog" class="sbc-brand-card" style="min-height:74px;padding:8px 4px;">
                  <div class="sbc-brand-card__logo" style="height:30px;"><img src="${util.getRoot()}assets/brand image/1619816335.png" alt="Marsriva" style="max-height:26px;"></div>
                  <span class="sbc-brand-card__name" style="font-size:11px;">Marsriva</span>
                </a>
              </div>
              <a href="${util.U('brand.html')}" class="sbc-accordion__link" style="color:var(--c-primary);font-weight:700;margin-top:8px;">View All 14 Partner Brands &rarr;</a>
            </div>
          </div>

          <!-- Solutions Accordion -->
          <div class="sbc-accordion js-accordion">
            <button class="sbc-accordion__trigger js-accordion-trigger" type="button" aria-expanded="false">
              <span>Solutions &amp; Services</span>
              ${ui.icon("chevron-down", "sm")}
            </button>
            <div class="sbc-accordion__content">
              <a href="${util.U('configurator.html')}" class="sbc-accordion__link" style="color:var(--c-primary);font-weight:600;">Network Solution Configurator</a>
              <a href="${util.U('quote.html')}" class="sbc-accordion__link">Commercial Tender &amp; RFP Quote</a>
              <a href="${util.U('dealer/index.html')}" class="sbc-accordion__link">Dealer &amp; Reseller Program</a>
              <a href="${util.U('branches.html')}" class="sbc-accordion__link" style="color:var(--c-primary);font-weight:600;">12 Service Centers &amp; Branches &rarr;</a>
              <a href="${util.U('support.html')}" class="sbc-accordion__link">Customer Support &amp; RMA</a>
              <a href="${util.U('downloads.html')}" class="sbc-accordion__link">Firmware &amp; Drivers</a>
              <a href="${util.U('warranty.html')}" class="sbc-accordion__link">Warranty Policy &amp; Terms</a>
              <a href="${util.U('faq.html')}" class="sbc-accordion__link">Frequently Asked Questions</a>
            </div>
          </div>

          <a href="${util.U('contact.html')}" class="sbc-mobile-nav__item">Contact Us</a>

          <!-- Mobile Shopping Links -->
          <div style="border-top:1px solid var(--gray-200);margin-top:12px;padding-top:12px;display:flex;flex-direction:column;gap:4px;">
            <a href="${accountUrl}" class="sbc-mobile-nav__item" style="display:flex;align-items:center;gap:10px;">
              ${ui.icon("user", "sm")}
              <span>${util.esc(accountLabel)}</span>
            </a>
            <a href="${util.U('wishlist.html')}" class="sbc-mobile-nav__item" style="display:flex;align-items:center;justify-content:space-between;">
              <span style="display:flex;align-items:center;gap:10px;">${ui.icon("heart", "sm")} Wishlist</span>
              <span class="sbc-announcement__badge js-wishlist-badge" style="${wishlistCount === 0 ? 'display:none;' : ''}">${wishlistCount}</span>
            </a>
            <a href="${util.U('cart.html')}" class="sbc-mobile-nav__item" style="display:flex;align-items:center;justify-content:space-between;">
              <span style="display:flex;align-items:center;gap:10px;">${ui.icon("shopping-cart", "sm")} Shopping Cart</span>
              <span class="sbc-announcement__badge js-cart-badge">${cartCount}</span>
            </a>
          </div>

          <!-- Contact box -->
          <div style="background:var(--gray-50);border-radius:var(--r-md);padding:12px;margin-top:16px;">
            <div style="font-size:11px;color:var(--gray-500);text-transform:uppercase;font-weight:700;margin-bottom:4px;">Sales &amp; Support</div>
            <a href="tel:+8809639257121" style="font-size:14px;font-weight:700;color:var(--navy-900);text-decoration:none;">+88 09639 257 121</a>
            <div style="font-size:11px;color:var(--gray-500);margin-top:4px;">Sat &ndash; Thu: 10:00 AM &ndash; 8:00 PM</div>
          </div>
        </div>
      `
    });

    // Attach accordion click listeners inside drawer
    setTimeout(() => {
      const triggers = document.querySelectorAll(".js-accordion-trigger");
      triggers.forEach(trig => {
        trig.addEventListener("click", () => {
          const acc = trig.closest(".js-accordion");
          if (!acc) return;
          const isOpen = acc.classList.contains("is-open");
          acc.classList.toggle("is-open", !isOpen);
          trig.setAttribute("aria-expanded", !isOpen ? "true" : "false");
        });
      });
    }, 50);
  }

  /**
   * Mini-Cart Drawer
   */
  function openMiniCartDrawer() {
    const items = store.getCartDetails();
    let bodyHtml = "";

    if (items.length === 0) {
      bodyHtml = `
        <div style="text-align:center;padding:40px 20px;">
          <div style="color:var(--gray-300);margin-bottom:12px;">${ui.icon("shopping-cart", "xl")}</div>
          <h4 style="margin-bottom:8px;">Your cart is empty</h4>
          <p style="font-size:var(--fs-xs);color:var(--c-text-muted);margin-bottom:20px;">Explore our catalog to find networking solutions.</p>
          <a href="${util.U('shop.html')}" class="sbc-btn sbc-btn--primary sbc-btn--sm js-drawer-close">Shop Products</a>
        </div>
      `;
    } else {
      const listItems = items.map(item => `
        <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--gray-200);">
          <img src="${util.esc(util.imgUrl(item.product.images[0]))}" alt="${util.esc(item.product.name)}" style="width:60px;height:60px;object-fit:contain;background:var(--gray-50);border-radius:4px;padding:4px;">
          <div style="flex:1;min-width:0;">
            <h5 style="font-size:var(--fs-xs);font-weight:600;margin:0 0 4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${util.esc(item.product.name)}</h5>
            <div style="font-size:var(--fs-xs);color:var(--c-text-muted);">${item.qty} × ${util.formatBDT(item.unitPrice)}</div>
            <div style="font-size:var(--fs-sm);font-weight:700;color:var(--navy-900);margin-top:2px;">${util.formatBDT(item.lineTotal)}</div>
          </div>
          <button class="sbc-btn sbc-btn--ghost sbc-btn--icon-only sbc-btn--sm" onclick="window.SBC.store.removeFromCart('${item.id}');window.SBC.layout.openMiniCart();" aria-label="Remove item">
            ${ui.icon("trash-2", "sm")}
          </button>
        </div>
      `).join("");

      bodyHtml = `
        <div>
          ${listItems}
        </div>
      `;
    }

    const subtotal = store.getCartSubtotal();
    const footerHtml = items.length === 0 ? "" : `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <span style="font-weight:600;">Subtotal:</span>
        <span style="font-size:var(--fs-h3);font-weight:700;color:var(--navy-900);">${util.formatBDT(subtotal)}</span>
      </div>
      <div style="display:flex;gap:8px;">
        <a href="${util.U('cart.html')}" class="sbc-btn sbc-btn--outline sbc-btn--full">View Cart</a>
        <a href="${util.U('checkout.html')}" class="sbc-btn sbc-btn--primary sbc-btn--full">Checkout</a>
      </div>
    `;

    ui.drawer({
      position: "right",
      title: `Shopping Cart (${store.getCartCount()})`,
      content: bodyHtml,
      footer: footerHtml
    });
  }

  /**
   * Render Floating Utility Controls (WhatsApp, Cart, Scroll To Top)
   * Task 10
   */
  function renderFloatingDock() {
    if (document.getElementById("sbc-floating-dock")) return;
    const dock = document.createElement("div");
    dock.id = "sbc-floating-dock";
    dock.className = "sbc-floating-dock";
    dock.setAttribute("role", "region");
    dock.setAttribute("aria-label", "Floating Utility Shortcuts");

    const cartCount = store.getCartCount();
    const whatsappNum = "8801746175778"; // South Bangla Computers Official Support Mobile

    dock.innerHTML = `
      <!-- Scroll To Top Button -->
      <button type="button" class="sbc-floating-btn sbc-floating-btn--totop" id="sbc-totop-btn" aria-label="Scroll to top of page" title="Scroll to Top">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
      </button>

      <!-- WhatsApp Direct Chat Button -->
      <a href="https://wa.me/${whatsappNum}?text=Hello%20South%20Bangla%20Computers,%20I%20have%20an%20inquiry." target="_blank" rel="noopener noreferrer" class="sbc-floating-btn sbc-floating-btn--whatsapp" aria-label="Chat on WhatsApp (+880 1746 175 778)" title="Chat on WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.32C9.36 7.32 9.08 7.38 8.84 7.64C8.61 7.9 7.95 8.52 7.95 9.78C7.95 11.04 8.87 12.26 9 12.43C9.13 12.6 10.8 15.17 13.35 16.27C13.96 16.53 14.43 16.69 14.8 16.81C15.41 17 15.97 16.97 16.41 16.91C16.9 16.84 17.92 16.29 18.13 15.7C18.34 15.11 18.34 14.61 18.28 14.5C18.22 14.39 18.05 14.33 17.8 14.21C17.55 14.09 16.3 13.47 16.07 13.39C15.84 13.31 15.67 13.26 15.5 13.52C15.33 13.77 14.86 14.33 14.71 14.5C14.57 14.67 14.43 14.69 14.18 14.57C13.93 14.44 12.88 14.1 11.64 13C10.67 12.14 10.02 11.07 9.89 10.85C9.77 10.63 9.88 10.5 10 10.38C10.11 10.27 10.25 10.09 10.37 9.95C10.5 9.81 10.54 9.71 10.62 9.54C10.7 9.38 10.66 9.23 10.6 9.11C10.54 8.98 10.04 7.76 9.83 7.26C9.63 6.77 9.42 6.84 9.26 6.83C9.11 6.83 8.94 6.83 8.77 6.83"/></svg>
      </a>

      <!-- Floating Cart Shortcut Button -->
      <a href="${util.U('cart.html')}" class="sbc-floating-btn sbc-floating-btn--cart js-floating-cart-btn" aria-label="View Shopping Cart (${cartCount} items)" title="View Shopping Cart">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <span class="sbc-floating-badge js-cart-badge" style="display:${cartCount > 0 ? 'flex' : 'none'};">${cartCount}</span>
      </a>
    `;

    document.body.appendChild(dock);

    // Click handler for Cart shortcut: opens mini cart drawer or visits cart
    const cartBtn = dock.querySelector(".js-floating-cart-btn");
    if (cartBtn) {
      cartBtn.addEventListener("click", (e) => {
        // If not already on cart page, open quick mini cart drawer
        if (!window.location.pathname.endsWith("cart.html")) {
          e.preventDefault();
          openMiniCartDrawer();
        }
      });
    }

    // Scroll-to-top show/hide and smooth scroll
    const toTopBtn = document.getElementById("sbc-totop-btn");
    if (toTopBtn) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
          toTopBtn.classList.add("is-visible");
        } else {
          toTopBtn.classList.remove("is-visible");
        }
      }, { passive: true });

      toTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // Live cart sync
    window.addEventListener("sbc:cart", () => {
      const badge = dock.querySelector(".js-cart-badge");
      if (badge) {
        const count = store.getCartCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? "flex" : "none";
      }
    });
  }

  /**
   * Mount layout on DOMContentLoaded
   */
  function init() {
    injectSvgSprite();

    const headerEl = document.getElementById("sbc-header");
    if (headerEl) headerEl.innerHTML = renderHeader();

    const footerEl = document.getElementById("sbc-footer");
    if (footerEl) footerEl.innerHTML = renderFooter();

    renderCompareBar();
    renderDemoButton();
    renderFloatingDock();
    setupDelegation();

    // Mark ready & trigger ready event
    window.SBC.isReady = true;
    window.dispatchEvent(new Event("SBC:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return {
    init,
    openMiniCart: openMiniCartDrawer,
    openMobileNav,
    showDisclosureModal
  };
})();
