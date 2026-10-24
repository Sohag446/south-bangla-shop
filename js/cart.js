/**
 * Shopping Cart Manager
 * Blueprint §7 P08, §10.7
 */
window.SBC = window.SBC || {};

window.SBC.cart = (function () {
  const util = window.SBC.util;
  const store = window.SBC.store;
  const ui = window.SBC.ui;

  function init(containerEl) {
    if (!containerEl) return;

    let appliedPromo = null;

    function render() {
      const items = store.getCartDetails();
      const isDealer = store.isDealer();

      if (items.length === 0) {
        containerEl.innerHTML = `
          <div style="text-align:center;padding:80px 20px;background:#fff;border-radius:var(--r-lg);border:1px solid var(--gray-200);">
            <div style="color:var(--gray-300);margin-bottom:16px;">${ui.icon("shopping-cart", "xl")}</div>
            <h2 style="font-size:var(--fs-h3);margin-bottom:8px;">Your shopping cart is empty</h2>
            <p style="color:var(--c-text-muted);font-size:var(--fs-sm);max-width:440px;margin:0 auto 24px;">
              Looking for Wi-Fi 7 routers, PoE switches, or fiber optic tools? Explore our verified hardware catalog.
            </p>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
              <a href="${util.U('category.html', { c: 'routers-wifi' })}" class="sbc-btn sbc-btn--outline sbc-btn--sm">Routers & Wi-Fi</a>
              <a href="${util.U('category.html', { c: 'switches' })}" class="sbc-btn sbc-btn--outline sbc-btn--sm">Switches & PoE</a>
              <a href="${util.U('category.html', { c: 'fiber-pon' })}" class="sbc-btn sbc-btn--outline sbc-btn--sm">Fiber & PON</a>
              <a href="${util.U('products.html')}" class="sbc-btn sbc-btn--primary sbc-btn--sm">Browse All Products</a>
            </div>
          </div>
        `;
        return;
      }

      const rowsHtml = items.map(item => {
        const p = item.product;
        return `
          <tr style="border-bottom:1px solid var(--gray-200);">
            <td style="padding:16px;">
              <div style="display:flex;gap:14px;align-items:center;">
                <img src="${util.esc(util.imgUrl(p.images[0]))}" alt="${util.esc(p.name)}" style="width:64px;height:64px;object-fit:contain;background:var(--gray-50);padding:4px;border-radius:6px;" onerror="this.src='${util.getRoot()}assets/img/placeholder-product.svg';">
                <div>
                  <div style="font-size:11px;font-weight:700;color:var(--c-text-muted);text-transform:uppercase;">${util.esc(p.brand)}</div>
                  <h4 style="font-size:14px;font-weight:600;margin:2px 0 4px;color:var(--navy-900);">
                    <a href="${util.U('product.html', { id: p.id })}">${util.esc(p.name)}</a>
                  </h4>
                  <div style="font-size:12px;color:var(--c-text-muted);">Model: ${util.esc(p.model)}</div>
                  ${isDealer && p.price.moq ? `<div style="font-size:11px;color:var(--green-700);font-weight:600;">MOQ: ${p.price.moq} units</div>` : ''}
                </div>
              </div>
            </td>
            <td style="padding:16px;white-space:nowrap;">
              <div style="font-weight:600;font-size:14px;">${util.formatBDT(item.unitPrice)}</div>
              ${isDealer && p.price.compareAt ? `<div style="font-size:11px;color:var(--gray-500);text-decoration:line-through;">${util.formatBDT(p.price.retail)}</div>` : ''}
            </td>
            <td style="padding:16px;">
              <div class="sbc-stepper">
                <button class="js-qty-dec" data-id="${p.id}" aria-label="Decrease quantity">&minus;</button>
                <input type="number" class="js-qty-input" data-id="${p.id}" value="${item.qty}" min="1" max="999">
                <button class="js-qty-inc" data-id="${p.id}" aria-label="Increase quantity">&plus;</button>
              </div>
            </td>
            <td style="padding:16px;font-weight:700;font-size:15px;color:var(--navy-900);white-space:nowrap;">
              ${util.formatBDT(item.lineTotal)}
            </td>
            <td style="padding:16px;text-align:right;">
              <button class="sbc-btn sbc-btn--ghost sbc-btn--icon-only sbc-btn--sm js-cart-remove" data-id="${p.id}" data-name="${util.esc(p.name)}" data-qty="${item.qty}" title="Remove item" aria-label="Remove item">
                ${ui.icon("trash-2", "sm")}
              </button>
            </td>
          </tr>
        `;
      }).join("");

      const subtotal = store.getCartSubtotal();
      let discountAmount = 0;
      if (appliedPromo === "DEMO10") {
        discountAmount = Math.round(subtotal * 0.10);
      }
      const finalTotal = Math.max(0, subtotal - discountAmount);

      containerEl.innerHTML = `
        <div class="l-grid">
          <!-- Cart Items Table (8 Columns) -->
          <div style="grid-column: span 8;">
            <div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r-lg);overflow:hidden;margin-bottom:var(--sp-4);">
              <div class="sbc-table-container" style="border:none;">
                <table class="sbc-table">
                  <thead>
                    <tr>
                      <th style="padding:14px 16px;">Product</th>
                      <th style="padding:14px 16px;">Unit Price</th>
                      <th style="padding:14px 16px;">Quantity</th>
                      <th style="padding:14px 16px;">Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rowsHtml}
                  </tbody>
                </table>
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;">
              <a href="${util.U('products.html')}" class="sbc-btn sbc-btn--ghost sbc-btn--sm">
                &larr; Continue Shopping
              </a>
              <button class="sbc-btn sbc-btn--ghost sbc-btn--sm js-clear-cart" style="color:var(--red-700);">
                Clear Shopping Cart
              </button>
            </div>
          </div>

          <!-- Order Summary Sidebar (4 Columns) -->
          <div style="grid-column: span 4;">
            <div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r-lg);padding:var(--sp-6);position:sticky;top:90px;">
              <h3 style="font-size:var(--fs-h4);margin-bottom:var(--sp-4);color:var(--navy-900);">Order Summary</h3>

              <div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:14px;">
                <span style="color:var(--c-text-secondary);">Subtotal (${store.getCartCount()} items):</span>
                <span style="font-weight:600;">${util.formatBDT(subtotal)}</span>
              </div>

              ${discountAmount > 0 ? `
                <div style="display:flex;justify-content:space-between;margin-bottom:10px;font-size:14px;color:var(--green-700);">
                  <span>Promo Discount (DEMO10 - 10%):</span>
                  <span>-${util.formatBDT(discountAmount)}</span>
                </div>
              ` : ''}

              <div style="display:flex;justify-content:space-between;margin-bottom:14px;font-size:14px;">
                <span style="color:var(--c-text-secondary);">Estimated Delivery:</span>
                <span style="font-size:12px;color:var(--c-text-muted);">Calculated at Checkout</span>
              </div>

              <div style="border-top:2px solid var(--gray-200);padding-top:14px;margin-top:14px;display:flex;justify-content:space-between;align-items:baseline;margin-bottom:20px;">
                <strong style="font-size:16px;">Grand Total:</strong>
                <span style="font-size:22px;font-weight:800;color:var(--navy-900);">${util.formatBDT(finalTotal)}</span>
              </div>

              <!-- Promo Code Box -->
              <div style="margin-bottom:20px;">
                <div style="display:flex;gap:6px;">
                  <input type="text" id="js-promo-input" class="sbc-input" placeholder="Promo code (try DEMO10)" style="height:38px;font-size:13px;" value="${appliedPromo || ''}">
                  <button class="sbc-btn sbc-btn--sm sbc-btn--outline js-apply-promo" style="white-space:nowrap;">
                    Apply
                  </button>
                </div>
                ${appliedPromo ? `<div style="font-size:11px;color:var(--green-700);margin-top:4px;">&#10004; Demo coupon applied</div>` : ''}
              </div>

              <!-- Checkout CTA -->
              <a href="${util.U('checkout.html')}" class="sbc-btn sbc-btn--primary sbc-btn--full" style="height:48px;font-size:15px;margin-bottom:12px;">
                Proceed to Checkout &rarr;
              </a>

              <div style="text-align:center;font-size:11px;color:var(--c-text-muted);display:flex;align-items:center;justify-content:center;gap:6px;">
                ${ui.icon("check-circle", "sm")} Official Distributor Warranty Guarantee
              </div>
            </div>
          </div>
        </div>
      `;

      // Event handlers
      containerEl.querySelectorAll(".js-qty-inc").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const it = items.find(i => i.id === id);
          if (it) {
            store.updateCartQty(id, it.qty + 1);
            render();
          }
        });
      });

      containerEl.querySelectorAll(".js-qty-dec").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const it = items.find(i => i.id === id);
          if (it && it.qty > 1) {
            store.updateCartQty(id, it.qty - 1);
            render();
          }
        });
      });

      containerEl.querySelectorAll(".js-qty-input").forEach(inp => {
        inp.addEventListener("change", () => {
          const id = inp.dataset.id;
          const val = parseInt(inp.value, 10);
          if (val > 0) {
            store.updateCartQty(id, val);
            render();
          }
        });
      });

      containerEl.querySelectorAll(".js-cart-remove").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const name = btn.dataset.name;
          const prevQty = parseInt(btn.dataset.qty, 10);
          store.removeFromCart(id);
          render();

          // Undo Toast (§10.7, 5000ms duration)
          ui.toast(`Removed "${name}" from cart`, "info", 5000, "Undo", () => {
            store.addToCart(id, prevQty);
            render();
          });
        });
      });

      const clearBtn = containerEl.querySelector(".js-clear-cart");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          store.clearCart();
          render();
          ui.toast("Cart cleared", "info");
        });
      }

      const applyPromoBtn = containerEl.querySelector(".js-apply-promo");
      if (applyPromoBtn) {
        applyPromoBtn.addEventListener("click", () => {
          const code = containerEl.querySelector("#js-promo-input").value.trim().toUpperCase();
          if (code === "DEMO10") {
            appliedPromo = "DEMO10";
            ui.toast("Coupon DEMO10 applied: 10% discount!", "success");
            render();
          } else {
            ui.toast("Invalid code. Try demo code: DEMO10", "warning");
          }
        });
      }
    }

    render();
  }

  return { init };
})();
