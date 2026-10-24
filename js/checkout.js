/**
 * Checkout Flow & Form Validation
 * Blueprint §7 P09, §11.1
 */
window.SBC = window.SBC || {};

window.SBC.checkout = (function () {
  const util = window.SBC.util;
  const store = window.SBC.store;
  const validate = window.SBC.validate;
  const ui = window.SBC.ui;

  function init(formEl, summaryEl) {
    if (!formEl) return;

    const items = store.getCartDetails();
    if (items.length === 0) {
      window.location.href = util.U("cart.html");
      return;
    }

    const session = store.getSession();
    const divisionsData = (window.SBC_DATA && window.SBC_DATA.divisions) || {};

    let selectedMethod = "home"; // "home" | "pickup"
    let deliveryFee = 120; // Dhaka default ৳120, outside ৳200, pickup ৳0
    let selectedPayment = "cod"; // "cod" | "wallet" | "bank"

    function renderSummary() {
      if (!summaryEl) return;
      const subtotal = store.getCartSubtotal();
      const total = subtotal + deliveryFee;

      summaryEl.innerHTML = `
        <div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r-lg);padding:var(--sp-6);position:sticky;top:90px;">
          <h3 style="font-size:var(--fs-h4);margin-bottom:var(--sp-4);color:var(--navy-900);">Order Summary</h3>

          <div style="max-height:240px;overflow-y:auto;margin-bottom:16px;border-bottom:1px solid var(--gray-200);padding-bottom:12px;">
            ${items.map(it => `
              <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:10px;font-size:13px;">
                <div style="flex:1;min-width:0;">
                  <div style="font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${util.esc(it.product.name)}</div>
                  <div style="color:var(--c-text-muted);font-size:11px;">Qty: ${it.qty} &bull; ${util.formatBDT(it.unitPrice)} each</div>
                </div>
                <div style="font-weight:700;">${util.formatBDT(it.lineTotal)}</div>
              </div>
            `).join("")}
          </div>

          <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;">
            <span style="color:var(--c-text-secondary);">Items Subtotal:</span>
            <span style="font-weight:600;">${util.formatBDT(subtotal)}</span>
          </div>

          <div style="display:flex;justify-content:space-between;margin-bottom:12px;font-size:14px;">
            <span style="color:var(--c-text-secondary);">Delivery Fee:</span>
            <span style="font-weight:600;" id="js-summary-delivery">${deliveryFee === 0 ? 'FREE (Pickup)' : util.formatBDT(deliveryFee)}</span>
          </div>

          <div style="border-top:2px solid var(--gray-200);padding-top:14px;margin-top:14px;display:flex;justify-content:space-between;align-items:baseline;margin-bottom:20px;">
            <strong style="font-size:16px;">Total Payable:</strong>
            <span style="font-size:22px;font-weight:800;color:var(--navy-900);" id="js-summary-total">${util.formatBDT(total)}</span>
          </div>

          <div style="background:var(--amber-50);border:1px solid var(--amber-800);border-radius:var(--r-md);padding:10px 12px;font-size:11px;color:var(--amber-800);line-height:1.4;margin-bottom:16px;">
            <strong>Simulated Order:</strong> No real payment is charged. Order will be recorded to your local browser session.
          </div>

          <button type="submit" form="sbc-checkout-form" class="sbc-btn sbc-btn--primary sbc-btn--full" style="height:48px;font-size:15px;" id="js-submit-order-btn">
            Place Order (Simulated) &rarr;
          </button>
        </div>
      `;
    }

    function populateDistricts(divName) {
      const distSelect = formEl.querySelector("#js-district-select");
      if (!distSelect) return;
      const list = divisionsData[divName] || [];
      distSelect.innerHTML = `<option value="">Select District</option>` + list.map(d => `<option value="${d}">${d}</option>`).join("");
    }

    // Set initial values
    renderSummary();

    // Division change listener
    const divSelect = formEl.querySelector("#js-division-select");
    if (divSelect) {
      divSelect.innerHTML = `<option value="">Select Division</option>` + Object.keys(divisionsData).map(div => `<option value="${div}">${div}</option>`).join("");
      divSelect.addEventListener("change", (e) => {
        populateDistricts(e.target.value);
        if (selectedMethod === "home") {
          deliveryFee = e.target.value === "Dhaka" ? 120 : 200;
          renderSummary();
        }
      });
    }

    // Delivery method radio
    formEl.querySelectorAll('input[name="deliveryMethod"]').forEach(r => {
      r.addEventListener("change", (e) => {
        selectedMethod = e.target.value;
        const pickupPanel = formEl.querySelector("#js-pickup-panel");
        const addressPanel = formEl.querySelector("#js-address-panel");
        if (selectedMethod === "pickup") {
          deliveryFee = 0;
          if (pickupPanel) pickupPanel.style.display = "block";
          if (addressPanel) addressPanel.style.display = "none";
        } else {
          const currentDiv = formEl.querySelector("#js-division-select").value;
          deliveryFee = currentDiv === "Dhaka" ? 120 : 200;
          if (pickupPanel) pickupPanel.style.display = "none";
          if (addressPanel) addressPanel.style.display = "block";
        }
        renderSummary();
      });
    });

    // Form submission
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();

      let valid = true;

      const nameInput = formEl.querySelector("#checkout-name");
      const phoneInput = formEl.querySelector("#checkout-phone");
      const emailInput = formEl.querySelector("#checkout-email");
      const addressInput = formEl.querySelector("#checkout-address");
      const termsCheckbox = formEl.querySelector("#checkout-terms");

      if (!validate.isRequired(nameInput.value)) {
        validate.setError(nameInput, "Please enter your full name.");
        valid = false;
      } else {
        validate.clearError(nameInput);
      }

      if (!validate.isBDPhone(phoneInput.value)) {
        validate.setError(phoneInput, "Please enter a valid 11-digit Bangladeshi mobile number (01XXXXXXXXX).");
        valid = false;
      } else {
        validate.clearError(phoneInput);
      }

      if (emailInput.value && !validate.isEmail(emailInput.value)) {
        validate.setError(emailInput, "Please enter a valid email address.");
        valid = false;
      } else {
        validate.clearError(emailInput);
      }

      if (selectedMethod === "home") {
        if (!validate.isRequired(addressInput.value)) {
          validate.setError(addressInput, "Please enter your street address.");
          valid = false;
        } else {
          validate.clearError(addressInput);
        }
      }

      if (!termsCheckbox.checked) {
        ui.toast("Please accept the terms and conditions.", "warning");
        valid = false;
      }

      if (!valid) {
        ui.toast("Please fix the highlighted errors before submitting.", "error");
        return;
      }

      // Simulate 1.2s checkout spinner (§10.9)
      const submitBtn = document.getElementById("js-submit-order-btn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Processing Order...`;
      }

      setTimeout(() => {
        const orderPayload = {
          deliveryFee,
          customer: {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim()
          },
          delivery: {
            method: selectedMethod,
            division: divSelect ? divSelect.value : "Dhaka",
            district: formEl.querySelector("#js-district-select") ? formEl.querySelector("#js-district-select").value : "Dhaka",
            address: selectedMethod === "home" ? addressInput.value.trim() : formEl.querySelector("#checkout-showroom").value
          },
          paymentMethod: formEl.querySelector('input[name="paymentMode"]:checked') ? formEl.querySelector('input[name="paymentMode"]:checked').value : "Cash on Delivery"
        };

        const newOrder = store.createOrder(orderPayload);
        window.location.href = util.U("order-confirmation.html", { o: newOrder.id });
      }, 1200);
    });
  }

  return { init };
})();
