/**
 * South Bangla Computers — Single Product Page Controller (Dwella-Inspired)
 * Renders interactive 5-thumbnail gallery, color swatches, purchase actions,
 * collapsible specifications, and a 3-product related section.
 */
window.SBC = window.SBC || {};

window.SBC.pdp = (function () {
  const util = window.SBC.util;
  const store = window.SBC.store;
  const ui = window.SBC.ui;

  let currentProduct = null;
  let currentQty = 1;

  function getAllProducts() {
    if (window.SBC_DATA && window.SBC_DATA.shopProducts && window.SBC_DATA.shopProducts.length) {
      return window.SBC_DATA.shopProducts;
    }
    return (window.SBC_DATA && window.SBC_DATA.products) || [];
  }

  function getProductFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || params.get("sku") || params.get("p");
    const all = getAllProducts();

    if (id) {
      const match = all.find(p => p.id === id || p.sku === id || (p.model && p.model.toLowerCase() === id.toLowerCase()));
      if (match) return match;
    }
    // Default to the first product (Meetion) if not found or none specified
    return all[0];
  }

  /**
   * Ensure gallery uses strictly the actual product's genuine images
   */
  function buildGalleryImages(p) {
    const images = (p.images && p.images.length) ? [...p.images] : [];
    const mainImg = images[0] || "assets/img/placeholder-product.svg";

    const gallery = [];

    if (images.length > 1) {
      // If product has multiple genuine images in catalog
      images.forEach((img, idx) => {
        gallery.push({
          url: util.imgUrl(img),
          label: idx === 0 ? "Main Perspective" : `Perspective View ${idx + 1}`,
          zoom: 1
        });
      });
    } else {
      // If 1 image exists, provide dedicated perspectives of the SAME product
      // Strictly NEVER show unrelated routers or switches on a mouse or other product!
      gallery.push({
        url: util.imgUrl(mainImg),
        label: "Primary Hardware View",
        zoom: 1
      });
      gallery.push({
        url: util.imgUrl(mainImg),
        label: "Precision Close-Up",
        zoom: 1.15
      });
      gallery.push({
        url: util.imgUrl(mainImg),
        label: "Detailed Architecture View",
        zoom: 1.25
      });
      gallery.push({
        url: util.imgUrl(mainImg),
        label: "Finish & Texture Perspective",
        zoom: 1.08
      });
    }

    return gallery;
  }

  /**
   * Render Gallery
   */
  function renderGallery(gallery) {
    const thumbsContainer = document.getElementById("pdp-gallery-thumbs");
    const mainImgEl = document.getElementById("pdp-main-img");
    if (!thumbsContainer || !mainImgEl) return;

    thumbsContainer.innerHTML = gallery.map((item, idx) => `
      <button type="button" class="pdp-gallery__thumb ${idx === 0 ? 'is-active' : ''}" data-index="${idx}" aria-label="${util.esc(item.label)}">
        <img src="${util.esc(item.url)}" alt="${util.esc(item.label)}" loading="lazy" style="${item.zoom && item.zoom > 1 ? 'transform: scale(' + (item.zoom * 0.95) + ');' : ''}" onerror="this.onerror=null;this.src='assets/img/placeholder-product.svg';">
      </button>
    `).join("");

    mainImgEl.src = gallery[0].url;
    mainImgEl.alt = gallery[0].label;
    mainImgEl.style.transform = "scale(1)";

    thumbsContainer.querySelectorAll(".pdp-gallery__thumb").forEach(btn => {
      btn.addEventListener("click", () => {
        thumbsContainer.querySelectorAll(".pdp-gallery__thumb").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const idx = parseInt(btn.dataset.index, 10);
        const selected = gallery[idx];
        if (selected) {
          mainImgEl.style.opacity = "0.2";
          setTimeout(() => {
            mainImgEl.src = selected.url;
            mainImgEl.alt = selected.label;
            const targetZoom = selected.zoom || 1;
            mainImgEl.style.transform = `scale(${targetZoom})`;
            mainImgEl.style.opacity = "1";
          }, 150);
        }
      });
    });
  }

  /**
   * Render Product Details
   */
  function renderDetails(p) {
    // Title & Brand
    const titleEl = document.getElementById("pdp-title");
    const brandPillEl = document.getElementById("pdp-brand-pill");
    const skuEl = document.getElementById("pdp-sku");
    const crumbTitleEl = document.getElementById("pdp-crumb-title");

    if (titleEl) titleEl.textContent = p.name;
    if (crumbTitleEl) crumbTitleEl.textContent = p.model || p.name;
    if (brandPillEl) brandPillEl.textContent = p.brand || "Official Brand";
    if (skuEl) skuEl.textContent = `SKU: ${p.sku || p.id}`;

    // Verified Warranty Pill
    const warrantyTextEl = document.getElementById("pdp-warranty-text");
    if (warrantyTextEl) {
      warrantyTextEl.textContent = p.warranty || "Official Warranty";
    }

    // Price
    const priceEl = document.getElementById("pdp-price");
    const compareEl = document.getElementById("pdp-compare-price");
    const savingsEl = document.getElementById("pdp-savings");

    const priceVal = (p.price && p.price.retail) ? p.price.retail : 1250;
    if (priceEl) priceEl.textContent = util.formatBDT(priceVal);

    if (p.price && p.price.compareAt && p.price.compareAt > priceVal) {
      if (compareEl) {
        compareEl.textContent = util.formatBDT(p.price.compareAt);
        compareEl.style.display = "inline";
      }
      if (savingsEl) {
        const diff = p.price.compareAt - priceVal;
        savingsEl.textContent = `SAVE ${util.formatBDT(diff)}`;
        savingsEl.style.display = "inline-block";
      }
    } else {
      if (compareEl) compareEl.style.display = "none";
      if (savingsEl) savingsEl.style.display = "none";
    }

    // Swatches (Colors / Finishes)
    const swatchesWrap = document.getElementById("pdp-swatches-list");
    if (swatchesWrap) {
      const swatches = [
        { name: "Matte Slate", hex: "#5a6472" },
        { name: "SBC Cyan Teal", hex: "#005883" },
        { name: "Pearl White", hex: "#e2e8f0" },
        { name: "Obsidian Black", hex: "#1e293b" }
      ];

      swatchesWrap.innerHTML = swatches.map((s, idx) => `
        <div class="pdp-swatch-box ${idx === 0 ? 'is-active' : ''}" style="background:${s.hex};" title="${util.esc(s.name)}" data-name="${util.esc(s.name)}"></div>
      `).join("");

      const swatchLabel = document.getElementById("pdp-swatches-label");
      swatchesWrap.querySelectorAll(".pdp-swatch-box").forEach(box => {
        box.addEventListener("click", () => {
          swatchesWrap.querySelectorAll(".pdp-swatch-box").forEach(b => b.classList.remove("is-active"));
          box.classList.add("is-active");
          if (swatchLabel) {
            swatchLabel.textContent = `Finish / Color: ${box.dataset.name}`;
          }
        });
      });
    }

    // Description text
    const descEl = document.getElementById("pdp-description-text");
    if (descEl) {
      const warrantyNotice = p.warranty || "1 Year Official South Bangla Computers Warranty";
      const summaryText = p.summary || p.description || `${p.name} is engineered for enterprise performance, mission-critical network stability, and long-term operating durability.`;
      
      descEl.innerHTML = `
        <p class="pdp-desc-text">
          ${util.esc(summaryText)}
        </p>
        <p class="pdp-desc-text">
          Manufactured using industrial-grade components and precision quality control, this unit delivers uninterrupted signal fidelity, ultra-low packet latency, and enhanced thermal dissipation under heavy bandwidth workloads.
        </p>
        <p class="pdp-desc-text">
          Backed by genuine manufacturer channel authorization, each unit carries nationwide service and claim verification through all South Bangla Computers official support centers.
        </p>
      `;
    }

    // What's Included
    const incList = document.getElementById("pdp-included-list");
    if (incList) {
      incList.innerHTML = `
        <li class="pdp-included-item">1× ${util.esc(p.name)}</li>
        <li class="pdp-included-item">1× Heavy-Duty AC Power Adapter / Cable</li>
        <li class="pdp-included-item">1× High-Speed Cat6 Connecting Patch Cord</li>
        <li class="pdp-included-item">1× Quick Setup User Manual &amp; Safety Guide</li>
        <li class="pdp-included-item">1× Official South Bangla Computers Warranty Card (${util.esc(p.warranty || '1 Year')})</li>
      `;
    }

    // Features Accordion Content
    const featEl = document.getElementById("pdp-features-content");
    if (featEl) {
      const featArray = (p.features && p.features.length) ? p.features : [
        "Certified genuine hardware distribution with official warranty tracking",
        "High-efficiency power management architecture with surge suppression",
        "Multi-layer security encryption and proactive anomaly mitigation",
        "Plug-and-play installation profile optimized for Bangladesh network topologies"
      ];
      featEl.innerHTML = `
        <ul class="pdp-features-bullets">
          ${featArray.map(f => `<li>${util.esc(f)}</li>`).join("")}
        </ul>
      `;
    }

    // Specs Accordion Content
    const specsEl = document.getElementById("pdp-specs-content");
    if (specsEl) {
      specsEl.innerHTML = `
        <table style="width:100%; border-collapse: collapse; font-size: 13px;">
          <tbody>
            <tr style="border-bottom: 1px solid var(--pdp-border-subtle);"><td style="padding: 8px 0; font-weight: 700; width: 40%;">Model</td><td style="color: var(--pdp-text-muted);">${util.esc(p.model || p.name)}</td></tr>
            <tr style="border-bottom: 1px solid var(--pdp-border-subtle);"><td style="padding: 8px 0; font-weight: 700;">Brand</td><td style="color: var(--pdp-text-muted);">${util.esc(p.brand)}</td></tr>
            <tr style="border-bottom: 1px solid var(--pdp-border-subtle);"><td style="padding: 8px 0; font-weight: 700;">Category</td><td style="color: var(--pdp-text-muted);">${util.esc(p.categoryName || p.category)}</td></tr>
            <tr style="border-bottom: 1px solid var(--pdp-border-subtle);"><td style="padding: 8px 0; font-weight: 700;">Warranty</td><td style="color: var(--pdp-text-muted);">${util.esc(p.warranty || '1 Year Official')}</td></tr>
            <tr style="border-bottom: 1px solid var(--pdp-border-subtle);"><td style="padding: 8px 0; font-weight: 700;">Stock Status</td><td style="color: #15803d; font-weight: 600;">In Stock (South Bangla Hub)</td></tr>
          </tbody>
        </table>
      `;
    }
  }

  /**
   * Render Exactly 3 Related Products (User's requirement)
   */
  function renderRelatedProducts(p) {
    const gridEl = document.getElementById("pdp-related-grid");
    if (!gridEl) return;

    const all = getAllProducts();
    // Prioritize products from same category or brand, excluding current product
    let related = all.filter(item => item.id !== p.id && item.category === p.category);
    if (related.length < 3) {
      const fromSameBrand = all.filter(item => item.id !== p.id && item.brand === p.brand && !related.includes(item));
      related = related.concat(fromSameBrand);
    }
    if (related.length < 3) {
      const others = all.filter(item => item.id !== p.id && !related.includes(item));
      related = related.concat(others);
    }

    // Take exactly 3 products
    const finalThree = related.slice(0, 3);

    gridEl.innerHTML = finalThree.map(prod => {
      const firstImg = (prod.images && prod.images[0]) || "";
      const resolvedImg = util.imgUrl(firstImg);
      const priceFormatted = (prod.price && prod.price.retail) ? util.formatBDT(prod.price.retail) : "৳ —";

      // Color dots
      const dots = (prod.colorDots || "green,blue").split(",").map(c => {
        let bg = "#10b981";
        if (c === "blue") bg = "#2563eb";
        if (c === "purple") bg = "#8b5cf6";
        if (c === "teal") bg = "#005883";
        if (c === "orange") bg = "#f59e0b";
        return `<span class="glam-card__dot" style="background:${bg};"></span>`;
      }).join("");

      return `
        <article class="glam-card" data-product-id="${util.esc(prod.id)}">
          <div class="glam-card__media">
            <a href="product.html?id=${encodeURIComponent(prod.id)}" class="glam-card__img-link" title="${util.esc(prod.name)}">
              <img src="${util.esc(resolvedImg)}" alt="${util.esc(prod.name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/img/placeholder-product.svg';">
            </a>
            <div class="glam-card__overlay">
              <button type="button" class="glam-card__action-btn js-add-cart-related" data-id="${util.esc(prod.id)}">
                Add to Cart
              </button>
              <a href="product.html?id=${encodeURIComponent(prod.id)}" class="glam-card__action-btn" style="text-decoration:none;">
                Details
              </a>
            </div>
          </div>
          <div class="glam-card__info">
            <h3 class="glam-card__title" title="${util.esc(prod.name)}">
              <a href="product.html?id=${encodeURIComponent(prod.id)}" style="color:inherit;text-decoration:none;">
                ${util.esc(prod.model || prod.name)}
              </a>
            </h3>
            <span class="glam-card__price">${priceFormatted}</span>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div class="glam-card__dots">${dots}</div>
            <span class="glam-card__brand-badge">${util.esc(prod.brand)}</span>
          </div>
        </article>
      `;
    }).join("");

    // Wire up Add to Cart buttons for related products
    gridEl.querySelectorAll(".js-add-cart-related").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = btn.dataset.id;
        if (id && store && store.addToCart) {
          store.addToCart(id, 1);
          updateHeaderCartBadge();
          if (ui && ui.toast) {
            ui.toast("Product added to cart!", "success");
          }
        }
      });
    });
  }

  function updateHeaderCartBadge() {
    const badgeEl = document.getElementById("glam-cart-count");
    if (!badgeEl) return;
    const count = store && store.getCartCount ? store.getCartCount() : 0;
    badgeEl.textContent = `MY CART (${count})`;
  }

  /**
   * Setup Events (Stepper, Accordions, Cart, Wishlist, Buy Now)
   */
  function setupEvents() {
    // Stepper
    const qtyInput = document.getElementById("pdp-qty-input");
    const minusBtn = document.getElementById("pdp-qty-minus");
    const plusBtn = document.getElementById("pdp-qty-plus");

    if (minusBtn && qtyInput) {
      minusBtn.addEventListener("click", () => {
        if (currentQty > 1) {
          currentQty--;
          qtyInput.value = currentQty;
        }
      });
    }

    if (plusBtn && qtyInput) {
      plusBtn.addEventListener("click", () => {
        currentQty++;
        qtyInput.value = currentQty;
      });
    }

    // Add to Cart Button
    const addCartBtn = document.getElementById("pdp-btn-add-cart");
    if (addCartBtn) {
      addCartBtn.addEventListener("click", () => {
        if (!currentProduct) return;
        if (store && store.addToCart) {
          store.addToCart(currentProduct.id, currentQty);
          updateHeaderCartBadge();
          if (ui && ui.toast) {
            ui.toast(`Added ${currentQty} × ${currentProduct.model || currentProduct.name} to cart!`, "success", {
              actionText: "View Cart",
              onAction: () => { window.location.href = "cart.html"; }
            });
          }
        }
      });
    }

    // Buy Now Button
    const buyNowBtn = document.getElementById("pdp-btn-buy-now");
    if (buyNowBtn) {
      buyNowBtn.addEventListener("click", () => {
        if (!currentProduct) return;
        if (store && store.addToCart) {
          store.addToCart(currentProduct.id, currentQty);
          updateHeaderCartBadge();
          window.location.href = "checkout.html";
        }
      });
    }

    // Find Nearest Dealer Button
    const findDealerBtn = document.getElementById("pdp-btn-find-dealer");
    if (findDealerBtn) {
      findDealerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!currentProduct) {
          window.location.href = util.U("dealers.html");
          return;
        }
        const identifier = currentProduct.slug || currentProduct.id || currentProduct.sku;
        window.location.href = util.U("dealers.html", { product: identifier });
      });
    }

    // Wishlist Button
    const wishlistBtn = document.getElementById("pdp-btn-wishlist");
    if (wishlistBtn) {
      if (store && store.isInWishlist && currentProduct) {
        if (store.isInWishlist(currentProduct.id)) {
          wishlistBtn.classList.add("is-active");
        }
      }
      wishlistBtn.addEventListener("click", () => {
        if (!currentProduct || !store) return;
        store.toggleWishlist(currentProduct.id);
        const inWish = store.isInWishlist(currentProduct.id);
        wishlistBtn.classList.toggle("is-active", inWish);
        if (ui && ui.toast) {
          ui.toast(inWish ? "Added to your wishlist!" : "Removed from wishlist", "info");
        }
      });
    }

    // Accordions Toggle
    document.querySelectorAll(".pdp-accordion-toggle").forEach(toggle => {
      toggle.addEventListener("click", () => {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", !isExpanded);
        const targetId = toggle.getAttribute("aria-controls");
        const contentEl = document.getElementById(targetId);
        if (contentEl) {
          contentEl.classList.toggle("is-open", !isExpanded);
        }
      });
    });

    // Quick search bar toggle in header
    const searchBtn = document.getElementById("glam-search-btn");
    const searchModal = document.getElementById("glam-search-input-wrap");
    if (searchBtn && searchModal) {
      searchBtn.addEventListener("click", () => {
        searchModal.style.display = searchModal.style.display === "none" ? "block" : "none";
        const input = searchModal.querySelector("input");
        if (input) input.focus();
      });
    }
  }

  function init() {
    currentProduct = getProductFromUrl();
    if (!currentProduct) return;

    document.title = `${currentProduct.name} | South Bangla Computers`;

    const gallery = buildGalleryImages(currentProduct);
    renderGallery(gallery);
    renderDetails(currentProduct);
    renderRelatedProducts(currentProduct);
    setupEvents();
    updateHeaderCartBadge();
  }

  return {
    init
  };
})();
