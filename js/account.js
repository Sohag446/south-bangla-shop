/**
 * Customer Account Engine
 * Blueprint §7 P16–P20
 */
window.SBC = window.SBC || {};

window.SBC.account = (function () {
  const util = window.SBC.util;
  const store = window.SBC.store;
  const ui = window.SBC.ui;

  function initDashboard(containerEl) {
    if (!containerEl) return;
    const session = store.getSession();
    const orders = store.getOrders();
    const wishlist = store.getWishlist();

    const name = session ? session.name : "Customer";
    const recentOrders = orders.slice(0, 3);

    containerEl.innerHTML = `
      <div style="margin-bottom:var(--sp-6);">
        <h2 style="font-size:var(--fs-h2);margin-bottom:4px;color:var(--navy-900);">Hello, ${util.esc(name)}</h2>
        <p style="color:var(--c-text-muted);font-size:var(--fs-sm);margin:0;">Manage your orders, saved delivery addresses, and personal wishlist.</p>
      </div>

      <!-- Quick KPI Cards -->
      <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:var(--sp-4);margin-bottom:var(--sp-8);">
        <div class="sbc-card" style="padding:16px;">
          <div style="color:var(--blue-600);margin-bottom:8px;">${ui.icon("shopping-cart", "md")}</div>
          <div style="font-size:24px;font-weight:800;color:var(--navy-900);">${orders.length}</div>
          <div style="font-size:12px;color:var(--c-text-muted);">Total Orders</div>
        </div>
        <div class="sbc-card" style="padding:16px;">
          <div style="color:var(--green-700);margin-bottom:8px;">${ui.icon("heart", "md")}</div>
          <div style="font-size:24px;font-weight:800;color:var(--navy-900);">${wishlist.length}</div>
          <div style="font-size:12px;color:var(--c-text-muted);">Wishlist Items</div>
        </div>
        <div class="sbc-card" style="padding:16px;">
          <div style="color:var(--amber-800);margin-bottom:8px;">${ui.icon("map-pin", "md")}</div>
          <div style="font-size:24px;font-weight:800;color:var(--navy-900);">1</div>
          <div style="font-size:12px;color:var(--c-text-muted);">Saved Address</div>
        </div>
        <div class="sbc-card" style="padding:16px;">
          <div style="color:var(--c-primary);margin-bottom:8px;">${ui.icon("file-text", "md")}</div>
          <div style="font-size:24px;font-weight:800;color:var(--navy-900);">0</div>
          <div style="font-size:12px;color:var(--c-text-muted);">Active Quotes</div>
        </div>
      </div>

      <!-- Recent Orders Section -->
      <div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r-lg);padding:var(--sp-6);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 style="font-size:var(--fs-h4);margin:0;color:var(--navy-900);">Recent Orders</h3>
          <a href="${util.U('account/orders.html')}" style="font-size:13px;font-weight:600;">View All Orders &rarr;</a>
        </div>

        ${recentOrders.length === 0 ? `
          <div style="text-align:center;padding:32px 16px;color:var(--c-text-muted);font-size:14px;">
            No orders placed yet. Explore our products and place a simulated test order!
          </div>
        ` : `
          <div class="sbc-table-container">
            <table class="sbc-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${recentOrders.map(o => `
                  <tr>
                    <td><strong>${util.esc(o.id)}</strong></td>
                    <td>${new Date(o.date).toLocaleDateString()}</td>
                    <td>${o.items ? o.items.length : 0} items</td>
                    <td><strong>${util.formatBDT(o.total)}</strong></td>
                    <td><span class="sbc-badge sbc-badge--in-stock">${util.esc(o.status)}</span></td>
                    <td>
                      <a href="${util.U('account/order-detail.html', { o: o.id })}" class="sbc-btn sbc-btn--sm sbc-btn--outline">
                        Track &rarr;
                      </a>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
  }

  function initOrderDetail(containerEl) {
    if (!containerEl) return;
    const orderId = util.getQueryParam("o");
    const order = store.getOrderById(orderId) || (store.getOrders()[0] || null);

    if (!order) {
      containerEl.innerHTML = `
        <div style="text-align:center;padding:60px 20px;">
          <h3>Order not found</h3>
          <p style="color:var(--c-text-muted);">Please check the order number or return to order history.</p>
          <a href="${util.U('account/orders.html')}" class="sbc-btn sbc-btn--primary sbc-btn--sm">View Orders</a>
        </div>
      `;
      return;
    }

    const steps = ["Placed", "Confirmed", "Packed", "Shipped", "Delivered"];
    const currentIdx = steps.indexOf(order.status) !== -1 ? steps.indexOf(order.status) : 0;

    containerEl.innerHTML = `
      <div style="max-width:880px;margin:0 auto;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
          <div>
            <h2 style="font-size:var(--fs-h3);margin:0;color:var(--navy-900);">Order ${util.esc(order.id)}</h2>
            <div style="font-size:12px;color:var(--c-text-muted);">Placed on ${new Date(order.date).toLocaleString()}</div>
          </div>
          <button class="sbc-btn sbc-btn--sm sbc-btn--outline js-advance-status">
            ${ui.icon("sliders", "sm")} Advance Status (Demo)
          </button>
        </div>

        <!-- Tracking Timeline -->
        <div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r-lg);padding:var(--sp-6);margin-bottom:24px;">
          <h4 style="margin:0 0 20px;font-size:14px;color:var(--navy-900);">Shipment Progress</h4>
          <div style="display:flex;justify-content:space-between;position:relative;">
            ${steps.map((st, i) => `
              <div style="display:flex;flex-direction:column;align-items:center;z-index:2;flex:1;">
                <div style="width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${i <= currentIdx ? 'var(--green-700)' : 'var(--gray-200)'};color:#fff;font-weight:700;font-size:12px;">
                  ${i <= currentIdx ? '&#10004;' : i + 1}
                </div>
                <span style="font-size:12px;font-weight:${i === currentIdx ? '700' : '400'};color:${i <= currentIdx ? 'var(--navy-900)' : 'var(--gray-500)'};margin-top:6px;">${st}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Order Items & Totals -->
        <div class="l-grid">
          <div style="grid-column: span 8;">
            <div class="sbc-table-container">
              <table class="sbc-table">
                <thead><tr><th>Item</th><th>Price</th><th>Qty</th><th>Total</th></tr></thead>
                <tbody>
                  ${(order.items || []).map(it => `
                    <tr>
                      <td><strong>${util.esc(it.product.name)}</strong></td>
                      <td>${util.formatBDT(it.unitPrice)}</td>
                      <td>${it.qty}</td>
                      <td><strong>${util.formatBDT(it.lineTotal)}</strong></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
          <div style="grid-column: span 4;">
            <div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r-lg);padding:16px;">
              <h4 style="margin:0 0 12px;font-size:14px;">Order Summary</h4>
              <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;">
                <span>Subtotal:</span><strong>${util.formatBDT(order.subtotal)}</strong>
              </div>
              <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;">
                <span>Delivery:</span><strong>${util.formatBDT(order.deliveryFee)}</strong>
              </div>
              <div style="border-top:1px solid var(--gray-200);padding-top:8px;display:flex;justify-content:space-between;font-size:16px;font-weight:800;color:var(--navy-900);">
                <span>Total:</span><span>${util.formatBDT(order.total)}</span>
              </div>
              <div style="margin-top:16px;border-top:1px solid var(--gray-200);padding-top:12px;font-size:12px;">
                <strong>Payment Method:</strong> ${util.esc(order.paymentMethod || 'Cash on Delivery')}<br>
                <strong>Delivery Address:</strong><br>
                ${util.esc(order.delivery ? order.delivery.address : 'Standard Delivery')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    const advanceBtn = containerEl.querySelector(".js-advance-status");
    if (advanceBtn) {
      advanceBtn.addEventListener("click", () => {
        const nextIdx = (currentIdx + 1) % steps.length;
        order.status = steps[nextIdx];
        const allOrders = store.getOrders();
        const oIndex = allOrders.findIndex(o => o.id === order.id);
        if (oIndex !== -1) {
          allOrders[oIndex].status = order.status;
          window.SBC.storage.set("orders", allOrders);
        }
        ui.toast(`Order status advanced to: ${order.status}`, "info");
        initOrderDetail(containerEl);
      });
    }
  }

  return {
    initDashboard,
    initOrderDetail
  };
})();
