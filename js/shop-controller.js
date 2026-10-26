/**
 * South Bangla Computers — Glamora Luxury Shop Page Controller
 * Handles multifaceted filtering (Categories, Brands, Price, Swatches),
 * Live Search, Sorting, Pagination, and Cart/Wishlist integration.
 */
window.SBC = window.SBC || {};

window.SBC.shop = (function () {
  const util = window.SBC.util;
  const store = window.SBC.store;
  const ui = window.SBC.ui;

  const PAGE_SIZE = 12;

  let state = {
    selectedCategories: [],
    selectedBrands: [],
    selectedWarranties: [],
    minPrice: 0,
    maxPrice: 250000,
    searchQuery: "",
    sort: "popularity",
    currentPage: 1
  };

  function getAllProducts() {
    if (window.SBC_DATA && window.SBC_DATA.shopProducts && window.SBC_DATA.shopProducts.length) {
      return window.SBC_DATA.shopProducts;
    }
    return (window.SBC_DATA && window.SBC_DATA.products) || [];
  }

  function getCategories() {
    return (window.SBC_DATA && window.SBC_DATA.categories) || [
      { slug: "routers-wifi", name: "Routers & Wi-Fi" },
      { slug: "switches", name: "Switches & PoE" },
      { slug: "fiber-pon", name: "Fiber, PON & ONU" },
      { slug: "power-backup", name: "Power & Backup" },
      { slug: "wireless-outdoor", name: "Access Points & Outdoor" },
      { slug: "peripherals-audio", name: "Peripherals & Audio" },
      { slug: "cabling-racks", name: "Cabling & Racks" },
      { slug: "fiber-tools", name: "Fiber Tools" },
      { slug: "security-cctv", name: "CCTV & Security" },
      { slug: "computer-accessories", name: "Computer Accessories" }
    ];
  }

  function getBrands() {
    const prods = getAllProducts();
    const brandMap = {};
    prods.forEach(p => {
      if (p.brand) {
        brandMap[p.brand] = (brandMap[p.brand] || 0) + 1;
      }
    });
    // Sort brands: Meetion and Tenda highlighted at top as featured partners, then alphabetical
    const sorted = Object.keys(brandMap).sort((a, b) => {
      if (a.toLowerCase() === "meetion") return -1;
      if (b.toLowerCase() === "meetion") return 1;
      if (a.toLowerCase() === "tenda") return -1;
      if (b.toLowerCase() === "tenda") return 1;
      return a.localeCompare(b);
    });
    return sorted.map(b => ({
      name: b,
      count: brandMap[b],
      isFeatured: b.toLowerCase() === "meetion"
    }));
  }

  /**
   * Render Sidebar Filters (Brands, Warranty, Categories)
   */
  function renderSidebarFilters() {
    const brandListEl = document.getElementById("glam-brand-list");
    const warrantyListEl = document.getElementById("glam-warranty-list");
    const catListEl = document.getElementById("glam-cat-list");
    const prods = getAllProducts();
    const categories = getCategories();
    const brands = getBrands();

    // 1. Render Brands
    if (brandListEl) {
      brandListEl.innerHTML = brands.map(b => {
        const isChecked = state.selectedBrands.some(sb => sb.toLowerCase() === b.name.toLowerCase());
        const badge = b.isFeatured ? `<span style="margin-left:6px;font-size:9.5px;font-weight:800;color:#0070ba;background:#e0f2fe;padding:2px 6px;border-radius:4px;letter-spacing:0.5px;text-transform:uppercase;">★ Featured</span>` : "";
        return `
          <li ${b.isFeatured ? 'style="background:#f0f9ff;border-radius:6px;padding:2px 4px;margin-bottom:4px;"' : ''}>
            <label class="glam-checkbox-label" ${b.isFeatured ? 'style="font-weight:700;color:#0070ba;"' : ''}>
              <span class="glam-checkbox-name">
                <input type="checkbox" value="${util.esc(b.name)}" class="js-brand-checkbox" ${isChecked ? 'checked' : ''}>
                <span class="glam-checkbox-custom"></span>
                <span>${util.esc(b.name)}</span>
                ${badge}
              </span>
              <span class="glam-checkbox-count">${b.count}</span>
            </label>
          </li>
        `;
      }).join("");

      brandListEl.querySelectorAll(".js-brand-checkbox").forEach(input => {
        input.addEventListener("change", (e) => {
          const val = e.target.value;
          if (e.target.checked) {
            if (!state.selectedBrands.includes(val)) state.selectedBrands.push(val);
          } else {
            state.selectedBrands = state.selectedBrands.filter(s => s !== val);
          }
          state.currentPage = 1;
          renderListing();
        });
      });
    }

    // 2. Render Warranty (1 Year, 2 Years, 3 Years, Lifetime)
    if (warrantyListEl) {
      const warTiers = [
        { label: "1 Year", match: "1 year" },
        { label: "2 Years", match: "2 year" },
        { label: "3 Years", match: "3 year" },
        { label: "Lifetime", match: "lifetime" }
      ];
      const warCounts = {};
      prods.forEach(p => {
        const pWar = (p.warranty || "").toLowerCase();
        warTiers.forEach(t => {
          if (pWar.includes(t.match)) {
            warCounts[t.label] = (warCounts[t.label] || 0) + 1;
          }
        });
      });

      warrantyListEl.innerHTML = warTiers.map(t => {
        const isChecked = state.selectedWarranties.includes(t.label);
        const count = warCounts[t.label] || 0;
        return `
          <li>
            <label class="glam-checkbox-label">
              <span class="glam-checkbox-name">
                <input type="checkbox" value="${t.label}" class="js-warranty-checkbox" ${isChecked ? 'checked' : ''}>
                <span class="glam-checkbox-custom"></span>
                <span>${t.label}</span>
              </span>
              <span class="glam-checkbox-count">${count}</span>
            </label>
          </li>
        `;
      }).join("");

      warrantyListEl.querySelectorAll(".js-warranty-checkbox").forEach(input => {
        input.addEventListener("change", (e) => {
          const val = e.target.value;
          if (e.target.checked) {
            if (!state.selectedWarranties.includes(val)) state.selectedWarranties.push(val);
          } else {
            state.selectedWarranties = state.selectedWarranties.filter(w => w !== val);
          }
          state.currentPage = 1;
          renderListing();
        });
      });
    }

    // 3. Render Categories (with "All Categories" 1st showing all products)
    if (catListEl) {
      const counts = {};
      prods.forEach(p => {
        counts[p.category] = (counts[p.category] || 0) + 1;
      });

      const isAllChecked = state.selectedCategories.length === 0;
      let catHtml = `
        <li>
          <label class="glam-checkbox-label">
            <span class="glam-checkbox-name">
              <input type="checkbox" value="all" class="js-cat-all-checkbox" ${isAllChecked ? 'checked' : ''}>
              <span class="glam-checkbox-custom"></span>
              <span style="font-weight:700;">All Categories</span>
            </span>
            <span class="glam-checkbox-count">${prods.length}</span>
          </label>
        </li>
      `;

      catHtml += categories.map(c => {
        const isChecked = state.selectedCategories.some(sc => sc.toLowerCase() === c.slug.toLowerCase());
        const count = counts[c.slug] || 0;
        return `
          <li>
            <label class="glam-checkbox-label">
              <span class="glam-checkbox-name">
                <input type="checkbox" value="${util.esc(c.slug)}" class="js-cat-checkbox" ${isChecked ? 'checked' : ''}>
                <span class="glam-checkbox-custom"></span>
                <span>${util.esc(c.name)}</span>
              </span>
              <span class="glam-checkbox-count">${count}</span>
            </label>
          </li>
        `;
      }).join("");

      catListEl.innerHTML = catHtml;

      // "All Categories" toggle handler
      const allCb = catListEl.querySelector(".js-cat-all-checkbox");
      if (allCb) {
        allCb.addEventListener("change", (e) => {
          if (e.target.checked) {
            state.selectedCategories = [];
            catListEl.querySelectorAll(".js-cat-checkbox").forEach(cb => cb.checked = false);
            state.currentPage = 1;
            renderListing();
          } else {
            // If user tries to uncheck "All Categories" with none selected, keep it checked
            if (state.selectedCategories.length === 0) {
              e.target.checked = true;
            }
          }
        });
      }

      // Individual category checkboxes handler
      catListEl.querySelectorAll(".js-cat-checkbox").forEach(input => {
        input.addEventListener("change", (e) => {
          const val = e.target.value;
          if (e.target.checked) {
            if (!state.selectedCategories.includes(val)) state.selectedCategories.push(val);
          } else {
            state.selectedCategories = state.selectedCategories.filter(s => s !== val);
          }

          if (allCb) {
            allCb.checked = (state.selectedCategories.length === 0);
          }
          state.currentPage = 1;
          renderListing();
        });
      });
    }
  }

  /**
   * Render Horizontal Category Navigation Chips
   */
  function renderCategoryChips() {
    const chipsEl = document.getElementById("sbc-shop-cat-chips");
    if (!chipsEl) return;
    const categories = getCategories();
    const isAll = state.selectedCategories.length === 0;

    let html = `
      <button type="button" class="sbc-shop-chip ${isAll ? 'is-active' : ''}" data-cat="all">
        All Products
      </button>
    `;

    categories.forEach(cat => {
      const active = state.selectedCategories.includes(cat.slug);
      html += `
        <button type="button" class="sbc-shop-chip ${active ? 'is-active' : ''}" data-cat="${util.esc(cat.slug)}">
          ${util.esc(cat.name)}
        </button>
      `;
    });

    chipsEl.innerHTML = html;

    chipsEl.querySelectorAll(".sbc-shop-chip").forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.dataset.cat;
        if (cat === "all") {
          state.selectedCategories = [];
          try {
            const url = new URL(window.location);
            url.searchParams.delete("c");
            url.searchParams.delete("category");
            window.history.pushState({}, "", url.pathname + (url.search ? url.search : ""));
          } catch (e) {}
        } else {
          state.selectedCategories = [cat];
          try {
            const url = new URL(window.location);
            url.searchParams.set("c", cat);
            window.history.pushState({}, "", url.pathname + "?" + url.searchParams.toString());
          } catch (e) {}
        }
        state.currentPage = 1;
        renderSidebarFilters();
        renderCategoryChips();
        renderListing();
        updateMobileFilterBadge();
        scrollToCatalog();
      });
    });
  }

  /**
   * Update Mobile Filter Count Badge
   */
  function updateMobileFilterBadge() {
    const badgeEl = document.getElementById("sbc-mobile-filter-badge");
    if (!badgeEl) return;
    let count = state.selectedCategories.length + state.selectedBrands.length + state.selectedWarranties.length;
    if (state.minPrice > 0 || state.maxPrice < 250000) count++;
    if (count > 0) {
      badgeEl.textContent = count;
      badgeEl.style.display = "inline-block";
    } else {
      badgeEl.style.display = "none";
    }
  }

  /**
   * Filter and Sort Products
   */
  function getFilteredProducts() {
    const allProds = getAllProducts();

    return allProds.filter(p => {
      // Category filter (if empty or "all", display all)
      if (state.selectedCategories.length > 0) {
        const pCat = (p.category || "").toLowerCase();
        const matchesCat = state.selectedCategories.some(sc => sc.toLowerCase() === pCat);
        if (!matchesCat) return false;
      }
      // Brand filter (case-insensitive)
      if (state.selectedBrands.length > 0) {
        const pBrand = (p.brand || "").toLowerCase();
        const matchesBrand = state.selectedBrands.some(sb => sb.toLowerCase() === pBrand);
        if (!matchesBrand) return false;
      }
      // Warranty filter
      if (state.selectedWarranties.length > 0) {
        const pWarranty = (p.warranty || "").toLowerCase();
        const matchesWar = state.selectedWarranties.some(w => {
          const wLow = w.toLowerCase();
          if (wLow.includes("lifetime")) return pWarranty.includes("lifetime");
          if (wLow.includes("1")) return pWarranty.includes("1 year");
          if (wLow.includes("2")) return pWarranty.includes("2 year");
          if (wLow.includes("3")) return pWarranty.includes("3 year");
          return pWarranty.includes(wLow);
        });
        if (!matchesWar) return false;
      }
      // Price filter
      const price = (p.price && p.price.retail) ? p.price.retail : 0;
      if (price < state.minPrice || price > state.maxPrice) {
        return false;
      }
      // Search query
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase().trim();
        const matchesName = p.name && p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand && p.brand.toLowerCase().includes(q);
        const matchesModel = p.model && p.model.toLowerCase().includes(q);
        const matchesTags = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesModel && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }

  function sortProducts(products) {
    if (state.sort === "price-asc") {
      return products.sort((a, b) => (a.price.retail || 0) - (b.price.retail || 0));
    }
    if (state.sort === "price-desc") {
      return products.sort((a, b) => (b.price.retail || 0) - (a.price.retail || 0));
    }
    if (state.sort === "newest") {
      return products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    if (state.sort === "name-asc") {
      return products.sort((a, b) => a.name.localeCompare(b.name));
    }
    // Default / Popularity: Prioritize Meetion products first, then top selling, then alphabetical
    return products.sort((a, b) => {
      const isMeetionA = ((a.brand || "").toLowerCase() === "meetion") ? 1 : 0;
      const isMeetionB = ((b.brand || "").toLowerCase() === "meetion") ? 1 : 0;
      if (isMeetionA !== isMeetionB) return isMeetionB - isMeetionA;

      const topSaleDiff = (b.isTopSale ? 1 : 0) - (a.isTopSale ? 1 : 0);
      if (topSaleDiff !== 0) return topSaleDiff;
      return a.name.localeCompare(b.name);
    });
  }

  /**
   * Render Product Card in Glamora Style
   */
  function renderGlamCard(p) {
    const isWishlisted = store && store.isInWishlist ? store.isInWishlist(p.id) : false;
    const firstImg = (p.images && p.images[0]) || "";
    const resolvedImg = util.imgUrl(firstImg);

    // Color/Spec dots
    const dots = (p.colorDots || "green,blue,orange").split(",").map(c => {
      let bg = "#10b981";
      if (c === "blue") bg = "#2563eb";
      if (c === "purple") bg = "#8b5cf6";
      if (c === "teal") bg = "#005883";
      if (c === "orange") bg = "#f59e0b";
      return `<span class="glam-card__dot" style="background:${bg};"></span>`;
    }).join("");

    const priceFormatted = p.price && p.price.retail ? util.formatBDT(p.price.retail) : "৳ —";
    const isMeetion = (p.brand || "").toLowerCase() === "meetion";
    const addCartText = window.SBC && window.SBC.t ? window.SBC.t("card.addToCart", "Add to Cart") : "Add to Cart";
    const detailsText = window.SBC && window.SBC.t ? window.SBC.t("card.viewDetails", "Details") : "Details";

    return `
      <article class="glam-card ${isMeetion ? 'glam-card--meetion' : ''}" data-product-id="${util.esc(p.id)}" ${isMeetion ? 'style="border-color:rgba(230,0,18,0.25);"' : ''}>
        <div class="glam-card__media">
          ${isMeetion ? '<span class="sbc-meetion-highlight-pill" style="position:absolute;top:10px;left:10px;z-index:2;background:#e60012;color:#fff;font-size:10.5px;font-weight:800;padding:2px 8px;border-radius:4px;box-shadow:0 2px 6px rgba(230,0,18,0.35);">★ Meetion</span>' : ''}
          <a href="product.html?id=${encodeURIComponent(p.id)}" class="glam-card__img-link" title="${util.esc(p.name)}">
            <img src="${util.esc(resolvedImg)}" alt="${util.esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/img/placeholder-product.svg';">
          </a>
          <div class="glam-card__overlay">
            <button type="button" class="glam-card__action-btn js-add-cart-glam" data-id="${util.esc(p.id)}">
              ${addCartText}
            </button>
            <a href="product.html?id=${encodeURIComponent(p.id)}" class="glam-card__action-btn" style="text-decoration:none;">
              ${detailsText}
            </a>
          </div>
        </div>
        <div class="glam-card__info">
          <h3 class="glam-card__title" title="${util.esc(p.name)}">
            <a href="product.html?id=${encodeURIComponent(p.id)}" style="color:inherit;text-decoration:none;">
              ${util.esc(p.model || p.name)}
            </a>
          </h3>
          <span class="glam-card__price">${priceFormatted}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div class="glam-card__dots">${dots}</div>
          <span class="glam-card__brand-badge" ${isMeetion ? 'style="background:rgba(230,0,18,0.08);color:#e60012;font-weight:800;border:1px solid rgba(230,0,18,0.2);"' : ''}>${isMeetion ? '★ ' : ''}${util.esc(p.brand)}</span>
        </div>
        <button type="button" class="glam-card__mobile-btn js-add-cart-glam" data-id="${util.esc(p.id)}" aria-label="Add ${util.esc(p.name)} to cart">
          ${addCartText}
        </button>
      </article>
    `;
  }

  /**
   * Render Applied Filter Chips
   */
  function renderAppliedFilters(containerEl) {
    if (!containerEl) return;
    const chips = [];

    state.selectedCategories.forEach(catSlug => {
      const cat = getCategories().find(c => c.slug === catSlug);
      chips.push({
        label: cat ? cat.name : catSlug,
        onRemove: () => {
          state.selectedCategories = state.selectedCategories.filter(s => s !== catSlug);
          renderSidebarFilters();
          renderListing();
        }
      });
    });

    state.selectedBrands.forEach(b => {
      chips.push({
        label: b,
        onRemove: () => {
          state.selectedBrands = state.selectedBrands.filter(s => s !== b);
          renderSidebarFilters();
          renderListing();
        }
      });
    });

    if (state.minPrice > 0 || state.maxPrice < 250000) {
      chips.push({
        label: `৳ ${state.minPrice.toLocaleString()} - ৳ ${state.maxPrice.toLocaleString()}`,
        onRemove: () => {
          state.minPrice = 0;
          state.maxPrice = 250000;
          const minInp = document.getElementById("glam-price-min");
          const maxInp = document.getElementById("glam-price-max");
          if (minInp) minInp.value = "500";
          if (maxInp) maxInp.value = "250000";
          renderListing();
        }
      });
    }

    state.selectedWarranties.forEach(w => {
      chips.push({
        label: `Warranty: ${w}`,
        onRemove: () => {
          state.selectedWarranties = state.selectedWarranties.filter(s => s !== w);
          renderSidebarFilters();
          renderListing();
        }
      });
    });

    if (chips.length === 0) {
      containerEl.innerHTML = "";
      containerEl.style.display = "none";
      return;
    }

    containerEl.style.display = "flex";
    containerEl.innerHTML = chips.map((c, idx) => `
      <span class="glam-filter-pill">
        ${util.esc(c.label)}
        <button type="button" data-chip-idx="${idx}" aria-label="Remove filter">&times;</button>
      </span>
    `).join("");

    containerEl.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.chipIdx, 10);
        if (chips[idx]) chips[idx].onRemove();
      });
    });
  }

  /**
   * Render Pagination Controls
   */
  function renderPagination(totalItems, currentPage) {
    const paginEl = document.getElementById("glam-pagination");
    if (!paginEl) return;

    const totalPages = Math.ceil(totalItems / PAGE_SIZE) || 1;
    if (totalPages <= 1) {
      paginEl.innerHTML = "";
      return;
    }

    let html = `
      <button type="button" class="glam-page-btn js-page-prev" ${currentPage <= 1 ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
        &lt; Previous
      </button>
    `;

    // Number pills
    for (let i = 1; i <= Math.min(totalPages, 5); i++) {
      html += `
        <button type="button" class="glam-page-number ${i === currentPage ? 'is-active' : ''}" data-page="${i}">
          ${i}
        </button>
      `;
    }

    if (totalPages > 5) {
      html += `<span class="glam-page-dots">...</span>`;
      html += `
        <button type="button" class="glam-page-number ${totalPages === currentPage ? 'is-active' : ''}" data-page="${totalPages}">
          ${totalPages}
        </button>
      `;
    }

    html += `
      <button type="button" class="glam-page-btn js-page-next" ${currentPage >= totalPages ? 'disabled style="opacity:0.4;cursor:not-allowed;"' : ''}>
        Next &gt;
      </button>
    `;

    paginEl.innerHTML = html;

    // Attach click events
    paginEl.querySelectorAll(".glam-page-number").forEach(btn => {
      btn.addEventListener("click", () => {
        state.currentPage = parseInt(btn.dataset.page, 10);
        renderListing();
        window.scrollTo({ top: 400, behavior: "smooth" });
      });
    });

    const prevBtn = paginEl.querySelector(".js-page-prev");
    if (prevBtn && currentPage > 1) {
      prevBtn.addEventListener("click", () => {
        state.currentPage--;
        renderListing();
        window.scrollTo({ top: 400, behavior: "smooth" });
      });
    }

    const nextBtn = paginEl.querySelector(".js-page-next");
    if (nextBtn && currentPage < totalPages) {
      nextBtn.addEventListener("click", () => {
        state.currentPage++;
        renderListing();
        window.scrollTo({ top: 400, behavior: "smooth" });
      });
    }
  }

  /**
   * Main Listing Render
   */
  function renderListing() {
    const gridEl = document.getElementById("glam-products-grid");
    const countEl = document.getElementById("glam-products-count");
    const chipsEl = document.getElementById("glam-applied-filters");
    if (!gridEl) return;

    const allFiltered = getFilteredProducts();
    const totalCount = allFiltered.length;
    const sorted = sortProducts([...allFiltered]);

    // Pagination slice
    const totalPages = Math.ceil(totalCount / PAGE_SIZE) || 1;
    if (state.currentPage > totalPages) state.currentPage = 1;
    const startIdx = (state.currentPage - 1) * PAGE_SIZE;
    const pageItems = sorted.slice(startIdx, startIdx + PAGE_SIZE);

    // Update count string
    if (countEl) {
      let filterDesc = "All Products";
      if (state.selectedCategories.length === 1) {
        const catObj = getCategories().find(c => c.slug === state.selectedCategories[0]);
        filterDesc = catObj ? catObj.name : state.selectedCategories[0];
      } else if (state.selectedCategories.length > 1) {
        filterDesc = `${state.selectedCategories.length} Categories`;
      } else if (state.selectedBrands.length === 1) {
        filterDesc = state.selectedBrands[0];
      } else if (state.selectedBrands.length > 1) {
        filterDesc = `${state.selectedBrands.length} Brands`;
      }
      countEl.innerHTML = `Showing <strong>${pageItems.length}</strong> results from total <strong>${totalCount}</strong> for &ldquo;${util.esc(filterDesc)}&rdquo;`;
    }

    // Update applied filter pills
    renderAppliedFilters(chipsEl);

    // Render Cards
    if (pageItems.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 20px; border: 1px solid var(--glam-border);">
          <div style="font-size: 32px; margin-bottom: 12px; color: var(--glam-text-light);">🔍</div>
          <h3 style="font-size: 18px; font-weight: 800; margin: 0 0 8px;">No matching products found</h3>
          <p style="color: var(--glam-text-muted); font-size: 13px; max-width: 400px; margin: 0 auto 20px;">
            Try clearing filters or adjusting your price and brand selections.
          </p>
          <button type="button" class="glam-cart-pill js-reset-filters">Reset All Filters</button>
        </div>
      `;
      const resetBtn = gridEl.querySelector(".js-reset-filters");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          state.selectedCategories = [];
          state.selectedBrands = [];
          state.selectedWarranties = [];
          state.minPrice = 0;
          state.maxPrice = 250000;
          state.searchQuery = "";
          renderSidebarFilters();
          renderListing();
        });
      }
    } else {
      gridEl.innerHTML = pageItems.map(p => renderGlamCard(p)).join("");
    }

    // Render Pagination
    renderPagination(totalCount, state.currentPage);
    updateHeaderCartBadge();
    renderCategoryChips();
    updateMobileFilterBadge();
  }

  function updateHeaderCartBadge() {
    const badgeEl = document.getElementById("glam-cart-count");
    if (!badgeEl) return;
    const count = store && store.getCartCount ? store.getCartCount() : 0;
    badgeEl.textContent = `MY CART (${count})`;
  }

  /**
   * Setup Event Listeners
   */
  function setupEventListeners() {
    // Sort dropdown
    const sortSelect = document.getElementById("glam-sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        state.sort = e.target.value;
        state.currentPage = 1;
        renderListing();
      });
    }

    // Price input boxes
    const minPriceInput = document.getElementById("glam-price-min");
    const maxPriceInput = document.getElementById("glam-price-max");

    if (minPriceInput) {
      minPriceInput.addEventListener("change", (e) => {
        state.minPrice = parseInt(e.target.value, 10) || 0;
        state.currentPage = 1;
        renderListing();
      });
    }
    if (maxPriceInput) {
      maxPriceInput.addEventListener("change", (e) => {
        state.maxPrice = parseInt(e.target.value, 10) || 250000;
        state.currentPage = 1;
        renderListing();
      });
    }



    // Accordions
    document.querySelectorAll(".glam-sidebar-toggle").forEach(toggle => {
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", !expanded);
        const targetId = toggle.getAttribute("aria-controls");
        const content = document.getElementById(targetId);
        if (content) {
          content.style.display = expanded ? "none" : "block";
        }
      });
    });

    // Global Add to Cart Delegation
    document.addEventListener("click", (e) => {
      const addCartBtn = e.target.closest(".js-add-cart-glam");
      if (addCartBtn) {
        e.preventDefault();
        const id = addCartBtn.dataset.id;
        if (id && store && store.addToCart) {
          store.addToCart(id, 1);
          updateHeaderCartBadge();
          if (ui && ui.toast) {
            ui.toast("Product added to cart!", "success");
          }
        }
        return;
      }
    });

    // Header search icon toggle
    const searchBtn = document.getElementById("glam-search-btn");
    const searchModal = document.getElementById("glam-search-input-wrap");
    if (searchBtn && searchModal) {
      searchBtn.addEventListener("click", () => {
        searchModal.style.display = searchModal.style.display === "none" ? "block" : "none";
        const input = searchModal.querySelector("input");
        if (input) input.focus();
      });
    }

    const liveSearchInput = document.getElementById("glam-live-search");
    if (liveSearchInput) {
      liveSearchInput.addEventListener("input", util.debounce((e) => {
        state.searchQuery = e.target.value;
        state.currentPage = 1;
        renderListing();
      }, 200));
    }

    // Mobile Filter Drawer Toggle
    const openFilterBtn = document.getElementById("sbc-open-filter-btn");
    const closeFilterBtn = document.getElementById("sbc-close-filter-btn");
    const sidebarEl = document.getElementById("glam-sidebar");
    const backdropEl = document.getElementById("glam-sidebar-backdrop");
    const drawerClearBtn = document.getElementById("sbc-drawer-clear-btn");
    const drawerApplyBtn = document.getElementById("sbc-drawer-apply-btn");

    function openFilterDrawer() {
      if (sidebarEl) sidebarEl.classList.add("is-open");
      if (backdropEl) backdropEl.classList.add("is-open");
      document.body.classList.add("has-drawer-open");
    }

    function closeFilterDrawer() {
      if (sidebarEl) sidebarEl.classList.remove("is-open");
      if (backdropEl) backdropEl.classList.remove("is-open");
      document.body.classList.remove("has-drawer-open");
    }

    if (openFilterBtn) openFilterBtn.addEventListener("click", openFilterDrawer);
    if (closeFilterBtn) closeFilterBtn.addEventListener("click", closeFilterDrawer);
    if (backdropEl) backdropEl.addEventListener("click", closeFilterDrawer);

    if (drawerClearBtn) {
      drawerClearBtn.addEventListener("click", () => {
        state.selectedCategories = [];
        state.selectedBrands = [];
        state.selectedWarranties = [];
        state.minPrice = 0;
        state.maxPrice = 250000;
        state.searchQuery = "";
        state.currentPage = 1;
        const minInp = document.getElementById("glam-price-min");
        const maxInp = document.getElementById("glam-price-max");
        if (minInp) minInp.value = "500";
        if (maxInp) maxInp.value = "250000";
        renderSidebarFilters();
        renderCategoryChips();
        renderListing();
        updateMobileFilterBadge();
      });
    }

    if (drawerApplyBtn) {
      drawerApplyBtn.addEventListener("click", () => {
        closeFilterDrawer();
        renderListing();
        updateMobileFilterBadge();
        scrollToCatalog();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebarEl && sidebarEl.classList.contains("is-open")) {
        closeFilterDrawer();
      }
    });

    // Intercept category & brand links if already on shop page
    document.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.includes("shop.html?") || (href.startsWith("?") && (href.includes("c=") || href.includes("b=")))) {
        try {
          const urlObj = new URL(link.href, window.location.origin);
          if (urlObj.pathname.endsWith("shop.html") || urlObj.pathname === window.location.pathname) {
            e.preventDefault();
            window.history.pushState({}, "", link.href);
            parseUrlParams();
            renderSidebarFilters();
            renderListing();
            scrollToCatalog();
          }
        } catch (err) {}
      }
    });

    window.addEventListener("popstate", () => {
      parseUrlParams();
      renderSidebarFilters();
      renderListing();
      scrollToCatalog();
    });
  }

  function parseUrlParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category") || params.get("c");
      const brandParam = params.get("brand") || params.get("b");
      const searchParam = params.get("q") || params.get("search");

      if (catParam && catParam.toLowerCase() !== "all") {
        const categories = getCategories();
        const matchedCat = categories.find(c => c.slug.toLowerCase() === catParam.toLowerCase() || c.name.toLowerCase() === catParam.toLowerCase());
        state.selectedCategories = [matchedCat ? matchedCat.slug : catParam];
      } else {
        state.selectedCategories = [];
      }

      if (brandParam) {
        const allBrands = getBrands();
        const matchedBrand = allBrands.find(b => b.name.toLowerCase() === brandParam.toLowerCase() || b.name.toLowerCase().replace(/[^a-z0-9]/g, '') === brandParam.toLowerCase().replace(/[^a-z0-9]/g, ''));
        state.selectedBrands = [matchedBrand ? matchedBrand.name : brandParam];
      } else {
        state.selectedBrands = [];
      }

      if (searchParam) {
        state.searchQuery = searchParam;
        const liveSearchInput = document.getElementById("glam-live-search");
        if (liveSearchInput) liveSearchInput.value = searchParam;
      }
    } catch (e) {
      console.warn("Could not parse URL params", e);
    }
  }

  function scrollToCatalog() {
    const target = document.getElementById("shop-catalog") || document.getElementById("glam-products-grid");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function init() {
    parseUrlParams();
    setupEventListeners();
    renderSidebarFilters();
    renderListing();
    updateHeaderCartBadge();

    // Auto scroll directly to the catalog/category section if URL has c=, b= or #shop-catalog
    const params = new URLSearchParams(window.location.search);
    const hasCategoryOrBrand = params.has("category") || params.has("c") || params.has("brand") || params.has("b");
    const hasHash = window.location.hash && (window.location.hash.includes("shop-catalog") || window.location.hash.includes("glam-products-grid"));
    if (hasCategoryOrBrand || hasHash) {
      setTimeout(scrollToCatalog, 150);
    }
  }

  return {
    init,
    renderListing
  };
})();
