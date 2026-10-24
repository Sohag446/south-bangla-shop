/**
 * Card Renderers
 * Blueprint §9, §13.5
 * Pure functions returning HTML strings, safe with util.esc()
 */
window.SBC = window.SBC || {};

window.SBC.cards = (function () {
  const util = window.SBC.util;
  const store = window.SBC.store;
  const ui = window.SBC.ui;

  /**
   * Render a Product Card
   */
  function productCard(p, options = {}) {
    if (!p) return "";
    const isWishlisted = store.isInWishlist(p.id);
    const isCompared = store.isInCompare(p.id);
    const isDealer = store.isDealer();
    const isDiscontinued = p.status === "discontinued";
    const isOutOfStock = p.status === "out-of-stock";
    const isQuoteOnly = p.price && p.price.quoteOnly;

    // Badges logic (max 2 badges)
    const badges = [];
    if (p.isNew && !isDiscontinued) {
      badges.push(`<span class="sbc-badge sbc-badge--new">New</span>`);
    }
    if (p.price && p.price.compareAt && p.price.compareAt > p.price.retail && !isDiscontinued) {
      const discountPercent = Math.round(((p.price.compareAt - p.price.retail) / p.price.compareAt) * 100);
      badges.push(`<span class="sbc-badge sbc-badge--discount">-${discountPercent}%</span>`);
    } else if (p.status === "in-stock") {
      badges.push(`<span class="sbc-badge sbc-badge--in-stock">In stock</span>`);
    } else if (p.status === "low-stock") {
      badges.push(`<span class="sbc-badge sbc-badge--low-stock">Low stock</span>`);
    } else if (p.status === "preorder") {
      badges.push(`<span class="sbc-badge sbc-badge--preorder">Pre-order</span>`);
    } else if (isOutOfStock) {
      badges.push(`<span class="sbc-badge sbc-badge--out-of-stock">Out of stock</span>`);
    } else if (isDiscontinued) {
      badges.push(`<span class="sbc-badge sbc-badge--discontinued">Discontinued</span>`);
    }

    // Pricing display
    let priceHtml = "";
    if (isQuoteOnly) {
      priceHtml = `
        <div class="sbc-price-retail" style="font-size:var(--fs-body);color:var(--c-text-muted);">
          Price on Request
        </div>
      `;
    } else if (isDealer && p.price.dealer) {
      priceHtml = `
        <div class="sbc-price-retail">
          ${util.formatBDT(p.price.dealer)}
          <span class="sbc-price-retail--strike">${util.formatBDT(p.price.retail)}</span>
        </div>
        <div class="sbc-price-dealer">Dealer Price (MOQ: ${p.price.moq || 1})</div>
      `;
    } else if (p.price && p.price.retail) {
      priceHtml = `
        <div class="sbc-price-retail">
          ${util.formatBDT(p.price.retail)}
          ${p.price.compareAt ? `<span class="sbc-price-retail--strike">${util.formatBDT(p.price.compareAt)}</span>` : ""}
        </div>
        <span class="sbc-badge sbc-badge--demo" style="margin-top:4px;">Demo price</span>
      `;
    }

    // Action button
    let actionBtn = "";
    if (isDiscontinued) {
      actionBtn = `
        <a href="${util.U('product.html', { id: p.id })}" class="sbc-btn sbc-btn--outline sbc-btn--sm sbc-btn--full">
          View Alternatives
        </a>
      `;
    } else if (isQuoteOnly) {
      actionBtn = `
        <a href="${util.U('quote.html', { product: p.id })}" class="sbc-btn sbc-btn--primary sbc-btn--sm sbc-btn--full">
          ${ui.icon("file-text", "sm")} Request Quote
        </a>
      `;
    } else if (isOutOfStock) {
      actionBtn = `
        <button class="sbc-btn sbc-btn--outline sbc-btn--sm sbc-btn--full js-notify-stock" data-id="${util.esc(p.id)}">
          ${ui.icon("bell", "sm")} Notify Me
        </button>
      `;
    } else {
      actionBtn = `
        <button class="sbc-btn sbc-btn--primary sbc-btn--sm sbc-btn--full js-add-cart" data-id="${util.esc(p.id)}">
          ${ui.icon("shopping-cart", "sm")} Add to Cart
        </button>
      `;
    }

    const firstImage = (p.images && p.images[0]) || null;
    const resolvedImg = util.imgUrl(firstImage);

    return `
      <article class="sbc-card ${options.className || ''}" data-product-id="${util.esc(p.id)}">
        <div class="sbc-card__badges">
          ${badges.slice(0, 2).join("")}
        </div>

        <button class="sbc-card__wishlist js-toggle-wishlist ${isWishlisted ? 'is-active' : ''}" data-id="${util.esc(p.id)}" aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
          ${ui.icon("heart", "sm")}
        </button>

        <a href="${util.U('product.html', { id: p.id })}" class="sbc-card__media">
          <img src="${util.esc(resolvedImg)}" alt="${util.esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${util.getRoot()}assets/img/placeholder-product.svg';">
        </a>

        <div class="sbc-card__brand">
          <a href="${util.U('brand.html', { b: p.brand })}" style="color:inherit;">${util.esc(p.brand)}</a>
        </div>

        <h3 class="sbc-card__title">
          <a href="${util.U('product.html', { id: p.id })}">${util.esc(p.name)}</a>
        </h3>

        <div class="sbc-card__meta">
          <span>Model: ${util.esc(p.model)}</span>
        </div>

        <div class="sbc-card__pricing">
          ${priceHtml}
        </div>

        <div class="sbc-card__actions">
          ${actionBtn}
        </div>

        <label class="sbc-card__compare">
          <input type="checkbox" class="js-toggle-compare" data-id="${util.esc(p.id)}" ${isCompared ? 'checked' : ''}>
          <span>Compare</span>
        </label>
      </article>
    `;
  }

  /**
   * Render Category Tile (96px height)
   */
  function categoryTile(c, productCount = 0) {
    if (!c) return "";
    return `
      <a href="${util.U('category.html', { c: c.slug })}" class="sbc-category-tile">
        <div class="sbc-category-tile__icon">
          ${ui.icon(c.icon || "box", "lg")}
        </div>
        <div class="sbc-category-tile__info">
          <strong>${util.esc(c.name)}</strong>
          <span>${productCount} Products</span>
        </div>
      </a>
    `;
  }

  /**
   * Render Brand Logo Tile
   */
  function brandTile(b) {
    if (!b) return "";
    let logoHtml = `<span style="font-weight:700;font-size:var(--fs-sm);color:var(--navy-900);">${util.esc(b.name)}</span>`;
    if (b.logo) {
      const src = b.logo.startsWith("http") ? b.logo : util.getRoot() + b.logo;
      const remote = b.remoteLogo || '';
      logoHtml = `<img src="${util.esc(src)}" alt="${util.esc(b.name)}" loading="lazy" onerror="if('${util.esc(remote)}') { this.src='${util.esc(remote)}'; } else { this.style.display='none';this.nextElementSibling.style.display='inline'; }">
                  <span style="display:none;font-weight:700;font-size:var(--fs-sm);">${util.esc(b.name)}</span>`;
    }
    return `
      <a href="${util.U('brand.html', { b: b.slug })}" class="sbc-brand-tile" title="${util.esc(b.name)}">
        ${logoHtml}
      </a>
    `;
  }

  /**
   * Render News Card
   */
  function newsCard(n) {
    if (!n) return "";
    return `
      <article class="sbc-card" style="padding:0;overflow:hidden;">
        <a href="${util.U('article.html', { id: n.id })}" style="display:block;aspect-ratio:16/9;overflow:hidden;background:var(--gray-100);">
          <img src="${util.esc(n.image)}" alt="${util.esc(n.title)}" style="width:100%;height:100%;object-fit:cover;" loading="lazy" onerror="this.src='${util.getRoot()}assets/img/placeholder-product.svg';">
        </a>
        <div style="padding:var(--sp-4);display:flex;flex-direction:column;flex:1;">
          <div style="font-size:var(--fs-xs);color:var(--c-text-muted);margin-bottom:var(--sp-1);display:flex;align-items:center;gap:6px;">
            <span class="sbc-badge sbc-badge--new" style="font-size:10px;">${util.esc(n.category || 'News')}</span>
            <span>${util.esc(n.date)}</span>
          </div>
          <h3 style="font-size:var(--fs-sm);font-weight:var(--fw-bold);line-height:1.3;margin-bottom:var(--sp-2);">
            <a href="${util.U('article.html', { id: n.id })}" style="color:var(--navy-900);">${util.esc(n.title)}</a>
          </h3>
          <p style="font-size:var(--fs-xs);color:var(--c-text-secondary);line-height:1.5;margin-bottom:var(--sp-4);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
            ${util.esc(n.excerpt)}
          </p>
          <a href="${util.U('article.html', { id: n.id })}" class="sbc-btn sbc-btn--sm sbc-btn--outline" style="margin-top:auto;align-self:flex-start;">
            Read Guide &rarr;
          </a>
        </div>
      </article>
    `;
  }

  /**
   * Render Location Card
   */
  function branchCard(b) {
    if (!b) return "";
    const phoneLinks = (b.phones || []).map(p => `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        ${ui.icon("phone", "sm")}
        <a href="tel:${p.replace(/[\s\-]/g, '')}" style="color:inherit;">${util.esc(p)}</a>
      </div>
    `).join("");

    return `
      <div class="sbc-card" style="padding:var(--sp-5);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--sp-2);">
          <h3 style="font-size:var(--fs-sm);font-weight:var(--fw-bold);color:var(--navy-900);margin:0;">
            ${util.esc(b.name)}
          </h3>
          <span class="sbc-badge ${b.isPickup ? 'sbc-badge--in-stock' : 'sbc-badge--demo'}">
            ${b.isPickup ? 'Showroom Pickup' : util.esc(b.city)}
          </span>
        </div>
        <div style="font-size:var(--fs-xs);color:var(--c-text-secondary);margin-bottom:var(--sp-3);display:flex;align-items:flex-start;gap:6px;">
          ${ui.icon("map-pin", "sm")}
          <span>${util.esc(b.address)}</span>
        </div>
        <div style="font-size:var(--fs-xs);color:var(--c-text-muted);margin-bottom:var(--sp-4);">
          ${phoneLinks}
          ${b.hours ? `<div style="margin-top:6px;font-style:italic;">${util.esc(b.hours)}</div>` : ''}
        </div>
        <div style="margin-top:auto;display:flex;gap:var(--sp-2);">
          <button class="sbc-btn sbc-btn--sm sbc-btn--outline js-copy-address" data-address="${util.esc(b.address)}">
            ${ui.icon("copy", "sm")} Copy Address
          </button>
          ${b.phones && b.phones[0] ? `
            <a href="tel:${b.phones[0].replace(/[\s\-]/g, '')}" class="sbc-btn sbc-btn--sm sbc-btn--soft">
              ${ui.icon("phone", "sm")} Call
            </a>
          ` : ''}
        </div>
      </div>
    `;
  }

  return {
    productCard,
    categoryTile,
    brandTile,
    newsCard,
    branchCard
  };
})();
