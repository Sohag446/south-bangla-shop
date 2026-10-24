/**
 * Faceted Filter and Listing Engine
 * Blueprint §7 P03, §10.3
 */
window.SBC = window.SBC || {};

window.SBC.filters = (function () {
  const util = window.SBC.util;
  const cards = window.SBC.cards;

  const PAGE_SIZE = 24;

  function initListing(containerEl, sidebarEl, paginationEl, toolbarEl) {
    if (!containerEl) return;

    let currentFilters = {
      q: util.getQueryParam("q") || "",
      c: util.getQueryParam("c") || "",
      b: util.getQueryParam("b") || "",
      status: util.getQueryParam("status") || "",
      sort: util.getQueryParam("sort") || "relevance",
      page: parseInt(util.getQueryParam("page"), 10) || 1,
      minPrice: util.getQueryParam("minPrice") || "",
      maxPrice: util.getQueryParam("maxPrice") || "",
      view: util.getQueryParam("view") || "grid"
    };

    function applyFilters() {
      const allProds = (window.SBC_DATA && window.SBC_DATA.products) || [];

      let filtered = allProds.filter(p => {
        // Query search
        if (currentFilters.q) {
          const q = currentFilters.q.toLowerCase();
          const match = (
            p.name.toLowerCase().includes(q) ||
            p.model.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
          );
          if (!match) return false;
        }

        // Category filter
        if (currentFilters.c && p.category !== currentFilters.c) {
          return false;
        }

        // Brand filter
        if (currentFilters.b && p.brand !== currentFilters.b) {
          return false;
        }

        // Status filter
        if (currentFilters.status && p.status !== currentFilters.status) {
          return false;
        }

        // Price range
        if (p.price && p.price.retail) {
          if (currentFilters.minPrice && p.price.retail < parseInt(currentFilters.minPrice, 10)) return false;
          if (currentFilters.maxPrice && p.price.retail > parseInt(currentFilters.maxPrice, 10)) return false;
        }

        return true;
      });

      // Sorting
      if (currentFilters.sort === "newest") {
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      } else if (currentFilters.sort === "price-asc") {
        filtered.sort((a, b) => (a.price.retail || 0) - (b.price.retail || 0));
      } else if (currentFilters.sort === "price-desc") {
        filtered.sort((a, b) => (b.price.retail || 0) - (a.price.retail || 0));
      } else if (currentFilters.sort === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      }

      // Update URL query string
      util.setQueryParams(currentFilters);

      // Render Toolbar
      if (toolbarEl) {
        toolbarEl.innerHTML = `
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:var(--sp-4);">
            <div style="font-size:var(--fs-sm);color:var(--c-text-muted);">
              Showing <strong>${filtered.length}</strong> product${filtered.length !== 1 ? 's' : ''}
              ${currentFilters.q ? ` for &ldquo;<strong>${util.esc(currentFilters.q)}</strong>&rdquo;` : ''}
            </div>
            <div style="display:flex;align-items:center;gap:12px;">
              <label style="font-size:var(--fs-xs);font-weight:600;display:flex;align-items:center;gap:6px;">
                Sort by:
                <select class="sbc-select js-sort-select" style="height:36px;width:auto;padding:0 8px;">
                  <option value="relevance" ${currentFilters.sort === 'relevance' ? 'selected' : ''}>Relevance</option>
                  <option value="newest" ${currentFilters.sort === 'newest' ? 'selected' : ''}>Newest Arrivals</option>
                  <option value="price-asc" ${currentFilters.sort === 'price-asc' ? 'selected' : ''}>Price: Low &rarr; High</option>
                  <option value="price-desc" ${currentFilters.sort === 'price-desc' ? 'selected' : ''}>Price: High &rarr; Low</option>
                  <option value="name-asc" ${currentFilters.sort === 'name-asc' ? 'selected' : ''}>Name: A to Z</option>
                </select>
              </label>
              <div style="display:flex;border:1px solid var(--gray-300);border-radius:var(--r-md);overflow:hidden;">
                <button class="sbc-btn sbc-btn--sm ${currentFilters.view === 'grid' ? 'sbc-btn--primary' : 'sbc-btn--ghost'} js-view-btn" data-view="grid" aria-label="Grid view">
                  ${window.SBC.ui.icon("layers", "sm")}
                </button>
                <button class="sbc-btn sbc-btn--sm ${currentFilters.view === 'list' ? 'sbc-btn--primary' : 'sbc-btn--ghost'} js-view-btn" data-view="list" aria-label="List view">
                  ${window.SBC.ui.icon("file-text", "sm")}
                </button>
              </div>
            </div>
          </div>
        `;

        const sortSelect = toolbarEl.querySelector(".js-sort-select");
        if (sortSelect) {
          sortSelect.addEventListener("change", (e) => {
            currentFilters.sort = e.target.value;
            currentFilters.page = 1;
            applyFilters();
          });
        }

        toolbarEl.querySelectorAll(".js-view-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            currentFilters.view = btn.dataset.view;
            applyFilters();
          });
        });
      }

      // Render Active Filter Chips
      renderActiveChips();

      // Pagination calculation
      const totalPages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
      const currentPage = Math.min(Math.max(currentFilters.page, 1), totalPages);
      const startIdx = (currentPage - 1) * PAGE_SIZE;
      const pagedProducts = filtered.slice(startIdx, startIdx + PAGE_SIZE);

      // Render Products
      if (filtered.length === 0) {
        containerEl.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:60px 20px;background:#fff;border-radius:var(--r-lg);border:1px solid var(--gray-200);">
            <div style="color:var(--gray-300);margin-bottom:14px;">${window.SBC.ui.icon("search", "xl")}</div>
            <h3 style="margin-bottom:8px;">No products match your filters</h3>
            <p style="color:var(--c-text-muted);font-size:var(--fs-sm);max-width:400px;margin:0 auto 20px;">
              Try clearing selected categories, brands, or price ranges to see more equipment.
            </p>
            <button class="sbc-btn sbc-btn--primary sbc-btn--sm js-clear-all-filters">Clear All Filters</button>
          </div>
        `;
      } else {
        containerEl.className = currentFilters.view === "list" ? "l-products-list" : "l-products-grid l-products-grid--3col";
        containerEl.innerHTML = pagedProducts.map(p => cards.productCard(p)).join("");
      }

      // Render Pagination
      renderPagination(totalPages, currentPage);
    }

    function renderActiveChips() {
      const chipsEl = document.getElementById("sbc-active-filter-chips");
      if (!chipsEl) return;

      const activeChips = [];
      if (currentFilters.q) activeChips.push({ label: `Search: "${currentFilters.q}"`, key: "q" });
      if (currentFilters.c) {
        const cat = (window.SBC_DATA.categories || []).find(c => c.slug === currentFilters.c);
        activeChips.push({ label: `Category: ${cat ? cat.name : currentFilters.c}`, key: "c" });
      }
      if (currentFilters.b) {
        const brand = (window.SBC_DATA.brands || []).find(b => b.slug === currentFilters.b);
        activeChips.push({ label: `Brand: ${brand ? brand.name : currentFilters.b}`, key: "b" });
      }
      if (currentFilters.status) {
        activeChips.push({ label: `Status: ${currentFilters.status}`, key: "status" });
      }
      if (currentFilters.minPrice || currentFilters.maxPrice) {
        activeChips.push({ label: `Price: ${currentFilters.minPrice || 0} - ${currentFilters.maxPrice || 'Max'}`, key: "price" });
      }

      if (activeChips.length === 0) {
        chipsEl.style.display = "none";
        chipsEl.innerHTML = "";
        return;
      }

      chipsEl.style.display = "flex";
      chipsEl.style.flexWrap = "wrap";
      chipsEl.style.gap = "8px";
      chipsEl.style.marginBottom = "16px";
      chipsEl.innerHTML = `
        ${activeChips.map(chip => `
          <span class="sbc-chip is-active" style="padding:4px 10px;height:28px;">
            ${util.esc(chip.label)}
            <button class="js-remove-filter" data-key="${chip.key}" style="margin-left:6px;cursor:pointer;" aria-label="Remove filter">&times;</button>
          </span>
        `).join("")}
        <button class="sbc-btn sbc-btn--sm sbc-btn--ghost js-clear-all-filters" style="font-size:12px;height:28px;padding:0 8px;">
          Clear All
        </button>
      `;

      chipsEl.querySelectorAll(".js-remove-filter").forEach(btn => {
        btn.addEventListener("click", () => {
          const k = btn.dataset.key;
          if (k === "price") {
            currentFilters.minPrice = "";
            currentFilters.maxPrice = "";
          } else {
            currentFilters[k] = "";
          }
          currentFilters.page = 1;
          applyFilters();
          renderSidebar();
        });
      });

      const clearAllBtn = chipsEl.querySelector(".js-clear-all-filters");
      if (clearAllBtn) {
        clearAllBtn.addEventListener("click", () => {
          clearAll();
        });
      }
    }

    function clearAll() {
      currentFilters.q = "";
      currentFilters.c = "";
      currentFilters.b = "";
      currentFilters.status = "";
      currentFilters.minPrice = "";
      currentFilters.maxPrice = "";
      currentFilters.page = 1;
      applyFilters();
      renderSidebar();
    }

    function renderPagination(totalPages, currentPage) {
      if (!paginationEl) return;
      if (totalPages <= 1) {
        paginationEl.innerHTML = "";
        return;
      }

      let pagesHtml = "";
      for (let i = 1; i <= totalPages; i++) {
        pagesHtml += `
          <button class="sbc-btn sbc-btn--sm ${i === currentPage ? 'sbc-btn--primary' : 'sbc-btn--outline'} js-page-btn" data-page="${i}" style="min-width:36px;">
            ${i}
          </button>
        `;
      }

      paginationEl.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:var(--sp-8);">
          <button class="sbc-btn sbc-btn--sm sbc-btn--outline js-page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>
            &larr; Prev
          </button>
          ${pagesHtml}
          <button class="sbc-btn sbc-btn--sm sbc-btn--outline js-page-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>
            Next &rarr;
          </button>
        </div>
      `;

      paginationEl.querySelectorAll(".js-page-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const p = parseInt(btn.dataset.page, 10);
          if (p >= 1 && p <= totalPages) {
            currentFilters.page = p;
            applyFilters();
            window.scrollTo({ top: containerEl.offsetTop - 80, behavior: "smooth" });
          }
        });
      });
    }

    function renderSidebar() {
      if (!sidebarEl) return;
      const cats = (window.SBC_DATA && window.SBC_DATA.categories) || [];
      const brands = (window.SBC_DATA && window.SBC_DATA.brands) || [];
      const allProds = (window.SBC_DATA && window.SBC_DATA.products) || [];

      // Compute counts per category and brand
      const catCounts = {};
      cats.forEach(c => catCounts[c.slug] = allProds.filter(p => p.category === c.slug).length);

      const brandCounts = {};
      brands.forEach(b => brandCounts[b.slug] = allProds.filter(p => p.brand === b.slug).length);

      sidebarEl.innerHTML = `
        <aside style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r-lg);padding:var(--sp-5);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--sp-4);">
            <h3 style="font-size:var(--fs-sm);font-weight:700;color:var(--navy-900);margin:0;">Filters</h3>
            <button class="sbc-btn sbc-btn--ghost sbc-btn--sm js-clear-sidebar" style="font-size:11px;padding:0;">Clear</button>
          </div>

          <!-- Category Facet -->
          <fieldset style="border:none;padding:0;margin:0 0 var(--sp-5);">
            <legend style="font-size:var(--fs-xs);font-weight:700;color:var(--navy-900);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:var(--sp-2);">
              Categories
            </legend>
            <div style="display:flex;flex-direction:column;gap:6px;max-height:220px;overflow-y:auto;padding-right:4px;">
              ${cats.map(c => `
                <label class="sbc-checkbox-label" style="font-size:13px;display:flex;justify-content:space-between;">
                  <span style="display:flex;align-items:center;gap:6px;">
                    <input type="radio" name="facet-cat" value="${c.slug}" ${currentFilters.c === c.slug ? 'checked' : ''} class="js-facet-cat">
                    <span>${util.esc(c.name)}</span>
                  </span>
                  <span style="color:var(--c-text-muted);font-size:11px;">(${catCounts[c.slug] || 0})</span>
                </label>
              `).join("")}
            </div>
          </fieldset>

          <!-- Brand Facet -->
          <fieldset style="border:none;padding:0;margin:0 0 var(--sp-5);border-top:1px solid var(--gray-100);padding-top:var(--sp-4);">
            <legend style="font-size:var(--fs-xs);font-weight:700;color:var(--navy-900);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:var(--sp-2);">
              Brands
            </legend>
            <div style="display:flex;flex-direction:column;gap:6px;max-height:200px;overflow-y:auto;padding-right:4px;">
              ${brands.map(b => `
                <label class="sbc-checkbox-label" style="font-size:13px;display:flex;justify-content:space-between;">
                  <span style="display:flex;align-items:center;gap:6px;">
                    <input type="radio" name="facet-brand" value="${b.slug}" ${currentFilters.b === b.slug ? 'checked' : ''} class="js-facet-brand">
                    <span>${util.esc(b.name)}</span>
                  </span>
                  <span style="color:var(--c-text-muted);font-size:11px;">(${brandCounts[b.slug] || 0})</span>
                </label>
              `).join("")}
            </div>
          </fieldset>

          <!-- Availability Facet -->
          <fieldset style="border:none;padding:0;margin:0 0 var(--sp-5);border-top:1px solid var(--gray-100);padding-top:var(--sp-4);">
            <legend style="font-size:var(--fs-xs);font-weight:700;color:var(--navy-900);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:var(--sp-2);">
              Availability
            </legend>
            <div style="display:flex;flex-direction:column;gap:6px;">
              <label class="sbc-checkbox-label" style="font-size:13px;">
                <input type="radio" name="facet-status" value="in-stock" ${currentFilters.status === 'in-stock' ? 'checked' : ''} class="js-facet-status">
                <span>In Stock</span>
              </label>
              <label class="sbc-checkbox-label" style="font-size:13px;">
                <input type="radio" name="facet-status" value="low-stock" ${currentFilters.status === 'low-stock' ? 'checked' : ''} class="js-facet-status">
                <span>Low Stock (&le; 5 units)</span>
              </label>
              <label class="sbc-checkbox-label" style="font-size:13px;">
                <input type="radio" name="facet-status" value="preorder" ${currentFilters.status === 'preorder' ? 'checked' : ''} class="js-facet-status">
                <span>Pre-Order</span>
              </label>
              <label class="sbc-checkbox-label" style="font-size:13px;">
                <input type="radio" name="facet-status" value="out-of-stock" ${currentFilters.status === 'out-of-stock' ? 'checked' : ''} class="js-facet-status">
                <span>Out of Stock</span>
              </label>
            </div>
          </fieldset>

          <!-- Price Range Facet -->
          <div style="border-top:1px solid var(--gray-100);padding-top:var(--sp-4);">
            <label class="sbc-label" style="text-transform:uppercase;letter-spacing:0.5px;">Price Range (BDT)</label>
            <div style="display:flex;gap:8px;align-items:center;margin-top:6px;">
              <input type="number" class="sbc-input js-min-price" placeholder="Min" style="height:36px;font-size:12px;" value="${currentFilters.minPrice}">
              <span style="color:var(--gray-500);">-</span>
              <input type="number" class="sbc-input js-max-price" placeholder="Max" style="height:36px;font-size:12px;" value="${currentFilters.maxPrice}">
            </div>
            <button class="sbc-btn sbc-btn--sm sbc-btn--primary sbc-btn--full js-apply-price" style="margin-top:8px;">
              Apply Price
            </button>
          </div>
        </aside>
      `;

      // Sidebar events
      sidebarEl.querySelectorAll(".js-facet-cat").forEach(r => {
        r.addEventListener("change", (e) => {
          currentFilters.c = e.target.value;
          currentFilters.page = 1;
          applyFilters();
        });
      });

      sidebarEl.querySelectorAll(".js-facet-brand").forEach(r => {
        r.addEventListener("change", (e) => {
          currentFilters.b = e.target.value;
          currentFilters.page = 1;
          applyFilters();
        });
      });

      sidebarEl.querySelectorAll(".js-facet-status").forEach(r => {
        r.addEventListener("change", (e) => {
          currentFilters.status = e.target.value;
          currentFilters.page = 1;
          applyFilters();
        });
      });

      const applyPriceBtn = sidebarEl.querySelector(".js-apply-price");
      if (applyPriceBtn) {
        applyPriceBtn.addEventListener("click", () => {
          currentFilters.minPrice = sidebarEl.querySelector(".js-min-price").value;
          currentFilters.maxPrice = sidebarEl.querySelector(".js-max-price").value;
          currentFilters.page = 1;
          applyFilters();
        });
      }

      const clearSidebarBtn = sidebarEl.querySelector(".js-clear-sidebar");
      if (clearSidebarBtn) {
        clearSidebarBtn.addEventListener("click", clearAll);
      }
    }

    renderSidebar();
    applyFilters();
  }

  return { initListing };
})();
