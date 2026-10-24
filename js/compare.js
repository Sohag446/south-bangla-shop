/**
 * Product Specification Comparison Engine
 * Blueprint §7 P06, §10.6
 */
window.SBC = window.SBC || {};

window.SBC.compare = (function () {
  const util = window.SBC.util;
  const store = window.SBC.store;
  const ui = window.SBC.ui;

  function init(containerEl) {
    if (!containerEl) return;

    let diffOnly = false;

    // Check if query param ?ids=a,b exists
    const urlIds = util.getQueryParam("ids");
    if (urlIds) {
      const parts = urlIds.split(",").filter(Boolean);
      parts.forEach(id => store.addToCompare(id));
    }

    function render() {
      const compareIds = store.getCompare();
      const allProds = (window.SBC_DATA && window.SBC_DATA.products) || [];
      const comparedProds = compareIds.map(id => allProds.find(p => p.id === id)).filter(Boolean);

      if (comparedProds.length === 0) {
        containerEl.innerHTML = `
          <div style="text-align:center;padding:80px 20px;background:#fff;border-radius:var(--r-lg);border:1px solid var(--gray-200);">
            <div style="color:var(--gray-300);margin-bottom:16px;">${ui.icon("shuffle", "xl")}</div>
            <h2 style="font-size:var(--fs-h3);margin-bottom:8px;">No products selected for comparison</h2>
            <p style="color:var(--c-text-muted);font-size:var(--fs-sm);max-width:440px;margin:0 auto 24px;">
              Select 2 to 4 networking devices from our catalog to compare ports, standards, bandwidth, and warranty specifications side by side.
            </p>
            <a href="${util.U('products.html')}" class="sbc-btn sbc-btn--primary">Browse Catalogue</a>
          </div>
        `;
        return;
      }

      // Collect all spec groups and row keys across all compared products
      const specGroups = {};
      comparedProds.forEach(p => {
        if (p.specs && Array.isArray(p.specs)) {
          p.specs.forEach(g => {
            if (!specGroups[g.group]) specGroups[g.group] = new Set();
            g.rows.forEach(r => specGroups[g.group].add(r[0]));
          });
        }
      });

      // Headers (Product Cards)
      let headerCards = comparedProds.map(p => `
        <th style="min-width:240px;vertical-align:top;padding:16px;background:#fff;border-bottom:2px solid var(--gray-200);">
          <div style="position:relative;text-align:center;">
            <button class="sbc-btn sbc-btn--ghost sbc-btn--icon-only sbc-btn--sm js-remove-comp" data-id="${p.id}" style="position:absolute;top:-8px;right:-8px;" aria-label="Remove ${util.esc(p.name)}">
              ${ui.icon("x", "sm")}
            </button>
            <img src="${util.esc(util.imgUrl(p.images[0]))}" alt="${util.esc(p.name)}" style="width:120px;height:120px;object-fit:contain;margin:0 auto 12px;background:var(--gray-50);padding:8px;border-radius:6px;" onerror="this.src='${util.getRoot()}assets/img/placeholder-product.svg';">
            <div style="font-size:11px;font-weight:700;color:var(--c-text-muted);text-transform:uppercase;">${util.esc(p.brand)}</div>
            <h4 style="font-size:13px;font-weight:600;line-height:1.3;margin:4px 0 8px;min-height:34px;">
              <a href="${util.U('product.html', { id: p.id })}" style="color:var(--navy-900);">${util.esc(p.name)}</a>
            </h4>
            <div style="font-size:15px;font-weight:700;color:var(--blue-600);margin-bottom:12px;">
              ${p.price.quoteOnly ? 'Quote Only' : util.formatBDT(p.price.retail)}
            </div>
            <button class="sbc-btn sbc-btn--primary sbc-btn--sm sbc-btn--full js-add-cart" data-id="${p.id}">
              ${ui.icon("shopping-cart", "sm")} Add to Cart
            </button>
          </div>
        </th>
      `).join("");

      // Add Slot if less than 4 products
      if (comparedProds.length < 4) {
        headerCards += `
          <th style="min-width:200px;vertical-align:middle;text-align:center;padding:20px;background:var(--gray-50);border-bottom:2px solid var(--gray-200);border-left:1px dashed var(--gray-300);">
            <div style="color:var(--gray-400);margin-bottom:8px;">${ui.icon("plus", "lg")}</div>
            <div style="font-size:13px;font-weight:600;color:var(--gray-700);margin-bottom:12px;">Add Another Product</div>
            <button class="sbc-btn sbc-btn--outline sbc-btn--sm js-open-comp-search">Search Catalogue</button>
          </th>
        `;
      }

      // Build Spec Rows grouped
      let tbodyHtml = "";

      // Overview Rows
      tbodyHtml += `
        <tr style="background:var(--gray-100);font-weight:700;"><td colspan="${comparedProds.length + 2}" style="padding:10px 16px;">Core Specifications</td></tr>
        <tr>
          <td style="font-weight:600;background:var(--gray-50);width:200px;position:sticky;left:0;">Model</td>
          ${comparedProds.map(p => `<td>${util.esc(p.model)}</td>`).join("")}
          ${comparedProds.length < 4 ? "<td></td>" : ""}
        </tr>
        <tr>
          <td style="font-weight:600;background:var(--gray-50);position:sticky;left:0;">Category</td>
          ${comparedProds.map(p => `<td>${util.esc(p.category)}</td>`).join("")}
          ${comparedProds.length < 4 ? "<td></td>" : ""}
        </tr>
        <tr>
          <td style="font-weight:600;background:var(--gray-50);position:sticky;left:0;">Availability</td>
          ${comparedProds.map(p => `<td><span class="sbc-badge sbc-badge--${p.status}">${util.esc(p.status)}</span></td>`).join("")}
          ${comparedProds.length < 4 ? "<td></td>" : ""}
        </tr>
        <tr>
          <td style="font-weight:600;background:var(--gray-50);position:sticky;left:0;">Official Warranty</td>
          ${comparedProds.map(p => `<td>${util.esc(p.warranty || '1 Year')}</td>`).join("")}
          ${comparedProds.length < 4 ? "<td></td>" : ""}
        </tr>
      `;

      // Grouped dynamic specs
      for (const groupName in specGroups) {
        tbodyHtml += `
          <tr style="background:var(--gray-100);font-weight:700;"><td colspan="${comparedProds.length + 2}" style="padding:10px 16px;">${util.esc(groupName)}</td></tr>
        `;

        specGroups[groupName].forEach(rowKey => {
          const values = comparedProds.map(p => {
            const grp = (p.specs || []).find(g => g.group === groupName);
            if (!grp) return "—";
            const row = grp.rows.find(r => r[0] === rowKey);
            return row ? row[1] : "—";
          });

          // Differences check
          const isDifferent = new Set(values).size > 1;
          if (diffOnly && !isDifferent) return;

          tbodyHtml += `
            <tr style="${isDifferent ? 'background:#FEF3C7;' : ''}">
              <td style="font-weight:600;background:var(--gray-50);position:sticky;left:0;">
                ${util.esc(rowKey)}
                ${isDifferent ? `<span style="font-size:10px;color:var(--amber-800);display:block;">Differs</span>` : ""}
              </td>
              ${values.map(v => `<td style="font-size:13px;">${util.esc(v)}</td>`).join("")}
              ${comparedProds.length < 4 ? "<td></td>" : ""}
            </tr>
          `;
        });
      }

      containerEl.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:var(--sp-4);">
          <div>
            <h2 style="font-size:var(--fs-h3);margin:0;">Product Comparison</h2>
            <p style="font-size:var(--fs-xs);color:var(--c-text-muted);margin:0;">Comparing ${comparedProds.length} of 4 maximum models</p>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <label class="sbc-checkbox-label" style="font-size:13px;font-weight:600;">
              <input type="checkbox" id="js-diff-toggle" ${diffOnly ? 'checked' : ''}>
              <span>Show differences only</span>
            </label>
            <button class="sbc-btn sbc-btn--sm sbc-btn--outline js-copy-compare-link">
              ${ui.icon("copy", "sm")} Share Comparison
            </button>
            <button class="sbc-btn sbc-btn--sm sbc-btn--ghost js-clear-comp-all" style="color:var(--red-700);">
              Clear All
            </button>
          </div>
        </div>

        <div class="sbc-table-container">
          <table class="sbc-table">
            <thead>
              <tr>
                <th style="width:200px;background:var(--gray-50);position:sticky;left:0;vertical-align:bottom;padding:16px;">
                  <span style="font-size:12px;color:var(--gray-500);text-transform:uppercase;">Product / Feature</span>
                </th>
                ${headerCards}
              </tr>
            </thead>
            <tbody>
              ${tbodyHtml}
            </tbody>
          </table>
        </div>
      `;

      // Event handlers
      const diffToggle = document.getElementById("js-diff-toggle");
      if (diffToggle) {
        diffToggle.addEventListener("change", (e) => {
          diffOnly = e.target.checked;
          render();
        });
      }

      containerEl.querySelectorAll(".js-remove-comp").forEach(btn => {
        btn.addEventListener("click", () => {
          store.removeFromCompare(btn.dataset.id);
          render();
        });
      });

      const clearAllBtn = containerEl.querySelector(".js-clear-comp-all");
      if (clearAllBtn) {
        clearAllBtn.addEventListener("click", () => {
          store.clearCompare();
          render();
        });
      }

      const copyLinkBtn = containerEl.querySelector(".js-copy-compare-link");
      if (copyLinkBtn) {
        copyLinkBtn.addEventListener("click", () => {
          const shareUrl = window.location.origin + window.location.pathname + "?ids=" + compareIds.join(",");
          navigator.clipboard.writeText(shareUrl).then(() => {
            ui.toast("Comparison link copied to clipboard", "success");
          });
        });
      }

      const searchBtn = containerEl.querySelector(".js-open-comp-search");
      if (searchBtn) {
        searchBtn.addEventListener("click", openAddProductModal);
      }
    }

    function openAddProductModal() {
      const allProds = (window.SBC_DATA && window.SBC_DATA.products) || [];
      const compareIds = store.getCompare();
      const available = allProds.filter(p => !compareIds.includes(p.id));

      const listHtml = available.slice(0, 15).map(p => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px;border-bottom:1px solid var(--gray-200);">
          <div style="display:flex;align-items:center;gap:10px;">
            <img src="${util.esc(util.imgUrl(p.images[0]))}" alt="" style="width:40px;height:40px;object-fit:contain;background:var(--gray-50);padding:2px;border-radius:4px;" onerror="this.src='${util.getRoot()}assets/img/placeholder-product.svg';">
            <div>
              <div style="font-weight:600;font-size:13px;color:var(--navy-900);">${util.esc(p.name)}</div>
              <div style="font-size:11px;color:var(--c-text-muted);">${util.esc(p.category)} &bull; ${util.esc(p.brand)}</div>
            </div>
          </div>
          <button class="sbc-btn sbc-btn--sm sbc-btn--outline js-select-comp" data-id="${p.id}">
            Add
          </button>
        </div>
      `).join("");

      ui.modal({
        title: "Add Product to Comparison",
        maxWidth: 560,
        body: `
          <div style="max-height:400px;overflow-y:auto;">
            ${listHtml}
          </div>
        `,
        footer: `<button class="sbc-btn sbc-btn--ghost js-modal-close">Cancel</button>`
      });

      setTimeout(() => {
        document.querySelectorAll(".js-select-comp").forEach(btn => {
          btn.addEventListener("click", () => {
            const res = store.addToCompare(btn.dataset.id);
            ui.closeModal();
            if (!res.success) {
              ui.toast(res.reason, "warning");
            } else {
              render();
            }
          });
        });
      }, 50);
    }

    render();
  }

  return { init };
})();
