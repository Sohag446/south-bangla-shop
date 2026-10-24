/**
 * Live Search Suggestions
 * Blueprint §10.2, §13.2
 */
window.SBC = window.SBC || {};

window.SBC.search = (function () {
  const util = window.SBC.util;

  function bindSearchInstance(inputId, dropdownId) {
    const input = document.getElementById(inputId);
    const dropdown = document.getElementById(dropdownId);
    if (!input || !dropdown) return;

    let selectedIndex = -1;

    function search(query) {
      const q = query.trim().toLowerCase();
      if (q.length < 2) {
        dropdown.style.display = "none";
        return;
      }

      const prods = (window.SBC_DATA && window.SBC_DATA.products) || [];
      const cats = (window.SBC_DATA && window.SBC_DATA.categories) || [];
      const brands = (window.SBC_DATA && window.SBC_DATA.brands) || [];

      // Match products (by name, model, brand, tags)
      const matchedProducts = prods.filter(p => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
        );
      }).slice(0, 5);

      // Match categories
      const matchedCats = cats.filter(c => c.name.toLowerCase().includes(q)).slice(0, 2);

      // Match brands
      const matchedBrands = brands.filter(b => b.name.toLowerCase().includes(q)).slice(0, 2);

      if (matchedProducts.length === 0 && matchedCats.length === 0 && matchedBrands.length === 0) {
        dropdown.innerHTML = `
          <div style="padding:16px;text-align:center;color:var(--gray-500);font-size:var(--fs-sm);">
            No direct matches for "<strong>${util.esc(query)}</strong>".
            <div style="margin-top:6px;">
              <a href="${util.U('shop.html', { q: query })}" style="font-weight:600;color:var(--c-primary);">Search all products &rarr;</a>
            </div>
          </div>
        `;
        dropdown.style.display = "block";
        return;
      }

      let html = "";

      // Categories
      if (matchedCats.length > 0) {
        html += `<div style="font-size:10px;font-weight:700;color:var(--gray-500);text-transform:uppercase;margin:6px 8px 4px;">Categories</div>`;
        matchedCats.forEach(c => {
          html += `
            <a href="${util.U('category.html', { c: c.slug })}" class="sbc-search-item" style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:4px;color:var(--navy-900);font-size:var(--fs-sm);text-decoration:none;">
              ${window.SBC.ui.icon("layers", "sm")}
              <span>${util.esc(c.name)}</span>
            </a>
          `;
        });
      }

      // Brands
      if (matchedBrands.length > 0) {
        html += `<div style="font-size:10px;font-weight:700;color:var(--gray-500);text-transform:uppercase;margin:8px 8px 4px;">Brands</div>`;
        matchedBrands.forEach(b => {
          html += `
            <a href="${util.U('brand.html', { b: b.slug })}" class="sbc-search-item" style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:4px;color:var(--navy-900);font-size:var(--fs-sm);text-decoration:none;">
              ${window.SBC.ui.icon("box", "sm")}
              <span>${util.esc(b.name)}</span>
            </a>
          `;
        });
      }

      // Products
      if (matchedProducts.length > 0) {
        html += `<div style="font-size:10px;font-weight:700;color:var(--gray-500);text-transform:uppercase;margin:8px 8px 4px;">Products</div>`;
        matchedProducts.forEach(p => {
          const img = util.imgUrl(p.images[0]);
          html += `
            <a href="${util.U('product.html', { id: p.id })}" class="sbc-search-item" style="display:flex;align-items:center;gap:12px;padding:8px;border-radius:6px;text-decoration:none;border-bottom:1px solid var(--gray-100);">
              <img src="${util.esc(img)}" alt="" style="width:40px;height:40px;object-fit:contain;background:var(--gray-50);border-radius:4px;padding:2px;" onerror="this.src='${util.getRoot()}assets/img/placeholder-product.svg';">
              <div style="flex:1;min-width:0;">
                <div style="font-size:var(--fs-sm);font-weight:600;color:var(--navy-900);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${util.esc(p.name)}</div>
                <div style="font-size:var(--fs-xs);color:var(--c-text-muted);">${util.esc(p.model)} &bull; ${util.esc(p.brand)}</div>
              </div>
              <div style="font-size:var(--fs-xs);font-weight:700;color:var(--blue-600);">
                ${p.price.quoteOnly ? 'Quote' : util.formatBDT(p.price.retail)}
              </div>
            </a>
          `;
        });
      }

      html += `
        <div style="padding:8px;text-align:center;background:var(--gray-50);border-radius:4px;margin-top:6px;">
          <a href="${util.U('shop.html', { q: query })}" style="font-size:var(--fs-xs);font-weight:700;color:var(--c-primary);text-decoration:none;">
            View all results for &ldquo;${util.esc(query)}&rdquo; &rarr;
          </a>
        </div>
      `;

      dropdown.innerHTML = html;
      dropdown.style.display = "block";
    }

    input.addEventListener("input", util.debounce(function () {
      search(input.value);
    }, 150));

    // Keyboard navigation
    input.addEventListener("keydown", function (e) {
      const items = dropdown.querySelectorAll(".sbc-search-item");
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % items.length;
        items.forEach((it, i) => it.style.background = i === selectedIndex ? "var(--blue-50)" : "transparent");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        items.forEach((it, i) => it.style.background = i === selectedIndex ? "var(--blue-50)" : "transparent");
      } else if (e.key === "Enter" && selectedIndex >= 0 && items[selectedIndex]) {
        e.preventDefault();
        items[selectedIndex].click();
      } else if (e.key === "Escape") {
        dropdown.style.display = "none";
      }
    });

    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target) && e.target !== input) {
        dropdown.style.display = "none";
      }
    });
  }

  function init() {
    // Bind desktop search
    bindSearchInstance("sbc-global-search", "sbc-search-suggestions");
    // Bind mobile search
    bindSearchInstance("sbc-mobile-search", "sbc-mobile-search-suggestions");
  }

  window.addEventListener("SBC:ready", init);

  return { init };
})();
