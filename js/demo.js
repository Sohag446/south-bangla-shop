/**
 * Prototype Demo Control Panel
 * Blueprint §10.20
 */
window.SBC = window.SBC || {};

window.SBC.demo = (function () {
  const util = window.SBC.util;
  const store = window.SBC.store;
  const ui = window.SBC.ui;

  function openPanel() {
    const session = store.getSession();
    const currentRole = session ? session.type : "guest";
    const currentPriceMode = window.SBC.config.PRICE_MODE;

    const bodyHtml = `
      <div style="font-size:var(--fs-sm);display:flex;flex-direction:column;gap:18px;">
        <!-- Role Switcher -->
        <div>
          <label class="sbc-label">Active User Session Role:</label>
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;margin-top:6px;">
            <button class="sbc-btn sbc-btn--sm ${currentRole === 'guest' ? 'sbc-btn--primary' : 'sbc-btn--outline'}" onclick="window.SBC.demo.setRole('guest')">
              Guest
            </button>
            <button class="sbc-btn sbc-btn--sm ${currentRole === 'customer' ? 'sbc-btn--primary' : 'sbc-btn--outline'}" onclick="window.SBC.demo.setRole('customer')">
              Customer
            </button>
            <button class="sbc-btn sbc-btn--sm ${currentRole === 'dealer' ? 'sbc-btn--primary' : 'sbc-btn--outline'}" onclick="window.SBC.demo.setRole('dealer')">
              Dealer
            </button>
          </div>
          <div style="font-size:11px;color:var(--c-text-muted);margin-top:4px;">
            ${currentRole === 'dealer' ? 'Dealer mode active: viewing wholesale discounts and MOQ tools.' : currentRole === 'customer' ? 'Logged in as retail customer (Sohag Hossen).' : 'Browsing as unauthenticated guest.'}
          </div>
        </div>

        <!-- Pricing Mode -->
        <div>
          <label class="sbc-label">Commercial Pricing Mode:</label>
          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:8px;margin-top:6px;">
            <button class="sbc-btn sbc-btn--sm ${currentPriceMode === 'hybrid' ? 'sbc-btn--primary' : 'sbc-btn--outline'}" onclick="window.SBC.demo.setPriceMode('hybrid')">
              Hybrid
            </button>
            <button class="sbc-btn sbc-btn--sm ${currentPriceMode === 'retail' ? 'sbc-btn--primary' : 'sbc-btn--outline'}" onclick="window.SBC.demo.setPriceMode('retail')">
              Retail Only
            </button>
            <button class="sbc-btn sbc-btn--sm ${currentPriceMode === 'quote' ? 'sbc-btn--primary' : 'sbc-btn--outline'}" onclick="window.SBC.demo.setPriceMode('quote')">
              Quote Only
            </button>
          </div>
        </div>

        <!-- Simulated Actions -->
        <div style="border-top:1px solid var(--gray-200);padding-top:14px;">
          <label class="sbc-label">Simulation Shortcuts:</label>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:6px;">
            <a href="${util.U('dealer/status.html', { ref: 'DA-DEMO-202601' })}" class="sbc-btn sbc-btn--sm sbc-btn--soft">
              Dealer Status Simulator
            </a>
            <a href="${util.U('dealer/bulk-order.html')}" class="sbc-btn sbc-btn--sm sbc-btn--soft">
              Bulk Order Tool
            </a>
            <a href="${util.U('configurator.html')}" class="sbc-btn sbc-btn--sm sbc-btn--soft">
              Network Configurator
            </a>
            <a href="${util.U('tests/smoke.html')}" class="sbc-btn sbc-btn--sm sbc-btn--soft">
              Data Integrity Smoke Test
            </a>
          </div>
        </div>

        <!-- Reset Button -->
        <div style="border-top:1px solid var(--gray-200);padding-top:14px;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong>Reset Prototype</strong>
            <div style="font-size:11px;color:var(--c-text-muted);">Clear all carts, orders, and demo sessions</div>
          </div>
          <button class="sbc-btn sbc-btn--sm sbc-btn--outline" style="color:var(--red-700);border-color:var(--red-700);" onclick="window.SBC.demo.resetAll()">
            ${ui.icon("trash-2", "sm")} Reset
          </button>
        </div>
      </div>
    `;

    ui.modal({
      title: "Prototype Demonstration Controls (§10.20)",
      body: bodyHtml,
      footer: `<button class="sbc-btn sbc-btn--primary js-modal-close">Close</button>`
    });
  }

  function setRole(role) {
    if (role === "guest") {
      store.logout();
    } else if (role === "customer") {
      const u = (window.SBC_DATA && window.SBC_DATA.users && window.SBC_DATA.users.customer) || {};
      store.setSession(u);
    } else if (role === "dealer") {
      const d = (window.SBC_DATA && window.SBC_DATA.users && window.SBC_DATA.users.dealer) || {};
      store.setSession(d);
    }
    ui.toast(`Switched role to: ${role.toUpperCase()}`, "success");
    setTimeout(() => window.location.reload(), 300);
  }

  function setPriceMode(mode) {
    window.SBC.config.PRICE_MODE = mode;
    window.SBC.storage.set("priceMode", mode);
    ui.toast(`Pricing mode set to: ${mode}`, "info");
    setTimeout(() => window.location.reload(), 300);
  }

  function resetAll() {
    window.SBC.storage.clearAll();
    ui.toast("Demo data wiped. Restoring defaults...", "info");
    setTimeout(() => {
      window.location.href = util.U("index.html");
    }, 400);
  }

  return {
    openPanel,
    setRole,
    setPriceMode,
    resetAll
  };
})();
