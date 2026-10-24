/**
 * Dealer Portal Engine (Registration, Status Simulator, Bulk Order Tool)
 * Blueprint §7 P21–P31, §11.2
 */
window.SBC = window.SBC || {};

window.SBC.dealer = (function () {
  const util = window.SBC.util;
  const store = window.SBC.store;
  const validate = window.SBC.validate;
  const ui = window.SBC.ui;
  const storage = window.SBC.storage;

  /* ==================== 1. DEALER REGISTRATION ==================== */
  function initRegister(formContainerEl) {
    if (!formContainerEl) return;

    let step = 1;
    let draft = storage.get("dealerDraft", {
      name: "", email: "", phone: "", password: "",
      businessName: "", businessType: "Reseller / Retail Shop", tradeLicense: "", tin: "", address: "", district: "Dhaka",
      ownerName: "", ownerPhone: "",
      uploadedDocs: ["Trade_License_2026.pdf", "TIN_Certificate.pdf"]
    });

    function saveDraft() {
      storage.set("dealerDraft", draft);
    }

    function render() {
      let stepHtml = "";

      if (step === 1) {
        stepHtml = `
          <h3 style="font-size:var(--fs-h4);color:var(--navy-900);margin-bottom:16px;">Step 1: Account & Primary Contact</h3>
          <div class="sbc-form-group">
            <label class="sbc-label sbc-label--required">Full Name:</label>
            <input type="text" id="dr-name" class="sbc-input" value="${util.esc(draft.name)}" placeholder="e.g. Kamrul Hasan">
          </div>
          <div class="sbc-form-group">
            <label class="sbc-label sbc-label--required">Business Email:</label>
            <input type="email" id="dr-email" class="sbc-input" value="${util.esc(draft.email)}" placeholder="e.g. kamrul@deltanet.com">
          </div>
          <div class="sbc-form-group">
            <label class="sbc-label sbc-label--required">Mobile Number (BD 11-digit):</label>
            <input type="tel" id="dr-phone" class="sbc-input" value="${util.esc(draft.phone)}" placeholder="01XXXXXXXXX">
          </div>
          <div class="sbc-form-group">
            <label class="sbc-label sbc-label--required">Password:</label>
            <input type="password" id="dr-password" class="sbc-input" value="${util.esc(draft.password)}" placeholder="At least 8 characters">
          </div>
          <div style="display:flex;justify-content:flex-end;margin-top:24px;">
            <button class="sbc-btn sbc-btn--primary js-reg-next">Next: Business Profile &rarr;</button>
          </div>
        `;
      } else if (step === 2) {
        stepHtml = `
          <h3 style="font-size:var(--fs-h4);color:var(--navy-900);margin-bottom:16px;">Step 2: Business Credentials</h3>
          <div class="sbc-form-group">
            <label class="sbc-label sbc-label--required">Company / Shop Name:</label>
            <input type="text" id="dr-bname" class="sbc-input" value="${util.esc(draft.businessName)}" placeholder="e.g. Delta Networking Solutions">
          </div>
          <div class="sbc-form-group">
            <label class="sbc-label sbc-label--required">Business Entity Type:</label>
            <select id="dr-btype" class="sbc-select">
              <option value="Reseller / Retail Shop" ${draft.businessType === 'Reseller / Retail Shop' ? 'selected' : ''}>Reseller / Computer Hardware Shop</option>
              <option value="ISP / FTTH Operator" ${draft.businessType === 'ISP / FTTH Operator' ? 'selected' : ''}>ISP / FTTH Broadband Operator</option>
              <option value="System Integrator / CCTV" ${draft.businessType === 'System Integrator / CCTV' ? 'selected' : ''}>System Integrator / Security Installer</option>
              <option value="Corporate Contractor" ${draft.businessType === 'Corporate Contractor' ? 'selected' : ''}>Corporate IT Infrastructure Contractor</option>
            </select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div class="sbc-form-group">
              <label class="sbc-label sbc-label--required">Trade License No:</label>
              <input type="text" id="dr-license" class="sbc-input" value="${util.esc(draft.tradeLicense)}" placeholder="e.g. TRAD/DNCC/10293">
            </div>
            <div class="sbc-form-group">
              <label class="sbc-label sbc-label--required">TIN Number (10–12 digits):</label>
              <input type="text" id="dr-tin" class="sbc-input" value="${util.esc(draft.tin)}" placeholder="e.g. 518294029182">
            </div>
          </div>
          <div class="sbc-form-group">
            <label class="sbc-label sbc-label--required">Office / Store Address:</label>
            <input type="text" id="dr-address" class="sbc-input" value="${util.esc(draft.address)}" placeholder="Shop #, Road #, Area">
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:24px;">
            <button class="sbc-btn sbc-btn--outline js-reg-back">&larr; Back</button>
            <button class="sbc-btn sbc-btn--primary js-reg-next">Next: Contact Persons &rarr;</button>
          </div>
        `;
      } else if (step === 3) {
        stepHtml = `
          <h3 style="font-size:var(--fs-h4);color:var(--navy-900);margin-bottom:16px;">Step 3: Key Personnel</h3>
          <div class="sbc-form-group">
            <label class="sbc-label sbc-label--required">Proprietor / Managing Director Name:</label>
            <input type="text" id="dr-owner" class="sbc-input" value="${util.esc(draft.ownerName || draft.name)}" placeholder="Full legal name">
          </div>
          <div class="sbc-form-group">
            <label class="sbc-label sbc-label--required">Proprietor Direct Mobile:</label>
            <input type="tel" id="dr-owner-phone" class="sbc-input" value="${util.esc(draft.ownerPhone || draft.phone)}" placeholder="01XXXXXXXXX">
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:24px;">
            <button class="sbc-btn sbc-btn--outline js-reg-back">&larr; Back</button>
            <button class="sbc-btn sbc-btn--primary js-reg-next">Next: Document Upload &rarr;</button>
          </div>
        `;
      } else if (step === 4) {
        stepHtml = `
          <h3 style="font-size:var(--fs-h4);color:var(--navy-900);margin-bottom:16px;">Step 4: Supporting Verification Documents</h3>
          <p style="font-size:var(--fs-xs);color:var(--c-text-muted);margin-bottom:16px;">
            Please attach digital copies of your Trade License, TIN Certificate, and NID (PDF/JPG/PNG, max 5 MB). In this prototype, mock uploads are simulated.
          </p>
          <div style="border:2px dashed var(--gray-300);border-radius:var(--r-md);padding:24px;text-align:center;background:var(--gray-50);margin-bottom:16px;">
            <div style="color:var(--blue-600);margin-bottom:8px;">${ui.icon("file-text", "lg")}</div>
            <div style="font-size:13px;font-weight:600;margin-bottom:4px;">Drag and drop documents here or browse files</div>
            <div style="font-size:11px;color:var(--c-text-muted);">Simulated file attachments:</div>
            <div style="display:flex;justify-content:center;gap:8px;margin-top:12px;flex-wrap:wrap;">
              ${(draft.uploadedDocs || []).map(f => `
                <span class="sbc-badge sbc-badge--in-stock" style="padding:4px 8px;font-size:11px;">
                  ${ui.icon("check", "sm")} ${util.esc(f)}
                </span>
              `).join("")}
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:24px;">
            <button class="sbc-btn sbc-btn--outline js-reg-back">&larr; Back</button>
            <button class="sbc-btn sbc-btn--primary js-reg-next">Next: Review & Submit &rarr;</button>
          </div>
        `;
      } else if (step === 5) {
        stepHtml = `
          <h3 style="font-size:var(--fs-h4);color:var(--navy-900);margin-bottom:16px;">Step 5: Review & Submit Application</h3>
          <div style="background:var(--gray-50);border:1px solid var(--gray-200);border-radius:var(--r-md);padding:16px;margin-bottom:20px;font-size:13px;line-height:1.7;">
            <div><strong>Company:</strong> ${util.esc(draft.businessName)} (${util.esc(draft.businessType)})</div>
            <div><strong>Contact:</strong> ${util.esc(draft.name)} &bull; ${util.esc(draft.phone)} &bull; ${util.esc(draft.email)}</div>
            <div><strong>Trade License:</strong> ${util.esc(draft.tradeLicense)} | <strong>TIN:</strong> ${util.esc(draft.tin)}</div>
            <div><strong>Address:</strong> ${util.esc(draft.address)}, ${util.esc(draft.district)}</div>
            <div><strong>Attached Files:</strong> ${draft.uploadedDocs.join(", ")}</div>
          </div>
          <label class="sbc-checkbox-label" style="font-size:13px;margin-bottom:24px;">
            <input type="checkbox" id="dr-agree" checked>
            <span>I confirm that the business documents submitted are accurate and agree to SBC's wholesale dealer credit terms.</span>
          </label>
          <div style="display:flex;justify-content:space-between;margin-top:24px;">
            <button class="sbc-btn sbc-btn--outline js-reg-back">&larr; Back</button>
            <button class="sbc-btn sbc-btn--primary js-reg-submit" style="height:44px;">
              Submit Application (Simulated) &rarr;
            </button>
          </div>
        `;
      }

      formContainerEl.innerHTML = `
        <div style="max-width:680px;margin:0 auto;background:#fff;border:1px solid var(--gray-200);border-radius:var(--r-lg);padding:var(--sp-8);">
          <!-- Step indicator bar -->
          <div style="display:flex;justify-content:space-between;margin-bottom:24px;border-bottom:1px solid var(--gray-200);padding-bottom:12px;font-size:12px;color:var(--c-text-muted);">
            <span>Step ${step} of 5</span>
            <span style="font-weight:700;color:var(--blue-600);">${Math.round((step / 5) * 100)}% Complete</span>
          </div>

          ${stepHtml}
        </div>
      `;

      // Event handlers
      const nextBtn = formContainerEl.querySelector(".js-reg-next");
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          if (step === 1) {
            draft.name = formContainerEl.querySelector("#dr-name").value.trim();
            draft.email = formContainerEl.querySelector("#dr-email").value.trim();
            draft.phone = formContainerEl.querySelector("#dr-phone").value.trim();
            draft.password = formContainerEl.querySelector("#dr-password").value;

            if (!draft.name || !validate.isBDPhone(draft.phone)) {
              ui.toast("Please enter your name and valid BD mobile number", "error");
              return;
            }
          } else if (step === 2) {
            draft.businessName = formContainerEl.querySelector("#dr-bname").value.trim();
            draft.businessType = formContainerEl.querySelector("#dr-btype").value;
            draft.tradeLicense = formContainerEl.querySelector("#dr-license").value.trim();
            draft.tin = formContainerEl.querySelector("#dr-tin").value.trim();
            draft.address = formContainerEl.querySelector("#dr-address").value.trim();

            if (!draft.businessName || !draft.tradeLicense) {
              ui.toast("Please complete all required business fields", "error");
              return;
            }
          } else if (step === 3) {
            draft.ownerName = formContainerEl.querySelector("#dr-owner").value.trim();
            draft.ownerPhone = formContainerEl.querySelector("#dr-owner-phone").value.trim();
          }
          saveDraft();
          step++;
          render();
        });
      }

      const backBtn = formContainerEl.querySelector(".js-reg-back");
      if (backBtn) {
        backBtn.addEventListener("click", () => {
          step--;
          render();
        });
      }

      const submitBtn = formContainerEl.querySelector(".js-reg-submit");
      if (submitBtn) {
        submitBtn.addEventListener("click", () => {
          const agree = formContainerEl.querySelector("#dr-agree").checked;
          if (!agree) {
            ui.toast("Please accept the terms to proceed.", "warning");
            return;
          }
          storage.remove("dealerDraft");
          const ref = "DA-DEMO-" + Math.floor(100000 + Math.random() * 900000);
          storage.set("dealerAppStatus", "submitted");
          window.location.href = util.U("dealer/status.html", { ref });
        });
      }
    }

    render();
  }

  /* ==================== 2. APPLICATION STATUS SIMULATION ==================== */
  function initStatus(containerEl) {
    if (!containerEl) return;
    const ref = util.getQueryParam("ref") || "DA-DEMO-592810";
    let status = storage.get("dealerAppStatus", "submitted"); // submitted | approved | more_info | rejected

    function render() {
      let statusCard = "";
      if (status === "submitted") {
        statusCard = `
          <div style="background:#fff;border:2px solid var(--blue-600);border-radius:var(--r-lg);padding:var(--sp-6);margin-bottom:24px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
              <div style="color:var(--blue-600);">${ui.icon("info", "lg")}</div>
              <div>
                <h3 style="margin:0;font-size:18px;color:var(--navy-900);">Application Under Review</h3>
                <span class="sbc-badge sbc-badge--preorder">Status: PENDING REVIEW</span>
              </div>
            </div>
            <p style="font-size:14px;color:var(--c-text-secondary);line-height:1.6;">
              Your application has been received and assigned to the SBC Enterprise Verification Desk. Our team verifies trade licenses within 1–2 business days.
            </p>
          </div>
        `;
      } else if (status === "approved") {
        statusCard = `
          <div style="background:#ECFDF5;border:2px solid var(--green-700);border-radius:var(--r-lg);padding:var(--sp-6);margin-bottom:24px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
              <div style="color:var(--green-700);">${ui.icon("check-circle", "lg")}</div>
              <div>
                <h3 style="margin:0;font-size:18px;color:#065F46;">Application Approved!</h3>
                <span class="sbc-badge sbc-badge--in-stock">Status: APPROVED DEALER</span>
              </div>
            </div>
            <p style="font-size:14px;color:#065F46;line-height:1.6;margin-bottom:16px;">
              Congratulations! Your dealership has been verified. You can now log in to the Dealer Portal to access wholesale tiers and bulk order tools.
            </p>
            <div style="display:flex;gap:12px;">
              <button class="sbc-btn sbc-btn--primary js-quick-dealer-login">
                Log In As Dealer Now &rarr;
              </button>
            </div>
          </div>
        `;
      } else if (status === "more_info") {
        statusCard = `
          <div style="background:#FEF3C7;border:2px solid var(--amber-800);border-radius:var(--r-lg);padding:var(--sp-6);margin-bottom:24px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
              <div style="color:var(--amber-800);">${ui.icon("alert-triangle", "lg")}</div>
              <div>
                <h3 style="margin:0;font-size:18px;color:#92400E;">Additional Information Required</h3>
                <span class="sbc-badge sbc-badge--low-stock">Status: ACTION NEEDED</span>
              </div>
            </div>
            <p style="font-size:14px;color:#92400E;line-height:1.6;margin-bottom:16px;">
              Our verification team was unable to verify your Trade License issuance date. Please upload an updated copy or call the dealer desk.
            </p>
            <button class="sbc-btn sbc-btn--outline js-reupload-btn">Upload Updated Document</button>
          </div>
        `;
      } else if (status === "rejected") {
        statusCard = `
          <div style="background:#FEF2F2;border:2px solid var(--red-700);border-radius:var(--r-lg);padding:var(--sp-6);margin-bottom:24px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
              <div style="color:var(--red-700);">${ui.icon("alert-circle", "lg")}</div>
              <div>
                <h3 style="margin:0;font-size:18px;color:#991B1B;">Application Not Approved</h3>
                <span class="sbc-badge sbc-badge--out-of-stock">Status: DECLINED</span>
              </div>
            </div>
            <p style="font-size:14px;color:#991B1B;line-height:1.6;">
              We could not verify commercial eligibility at this time. You may reapply after 30 days or contact our corporate sales desk for assistance.
            </p>
          </div>
        `;
      }

      containerEl.innerHTML = `
        <div style="max-width:720px;margin:0 auto;">
          <div style="background:var(--gray-100);border-radius:var(--r-md);padding:12px 16px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
            <span>Application Reference: <strong>${util.esc(ref)}</strong></span>
            <span style="font-size:12px;color:var(--c-text-muted);">Submitted: 21 Oct 2026</span>
          </div>

          ${statusCard}

          <!-- Prototype Simulation Controls Box (§10.20) -->
          <div style="background:#fff;border:1px dashed var(--blue-600);border-radius:var(--r-lg);padding:20px;margin-top:32px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
              ${ui.icon("sliders", "sm")}
              <strong style="font-size:13px;color:var(--navy-900);">Demo State Simulator (Reviewer Controls):</strong>
            </div>
            <p style="font-size:12px;color:var(--c-text-muted);margin-bottom:12px;">
              Click below to simulate how the applicant screen behaves under each potential verification outcome:
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:8px;">
              <button class="sbc-btn sbc-btn--sm sbc-btn--outline js-sim-status" data-st="submitted">Simulate: Pending</button>
              <button class="sbc-btn sbc-btn--sm sbc-btn--primary js-sim-status" data-st="approved">Simulate: Approved</button>
              <button class="sbc-btn sbc-btn--sm sbc-btn--outline js-sim-status" data-st="more_info">Simulate: Need More Info</button>
              <button class="sbc-btn sbc-btn--sm sbc-btn--ghost js-sim-status" data-st="rejected" style="color:var(--red-700);">Simulate: Rejected</button>
            </div>
          </div>
        </div>
      `;

      containerEl.querySelectorAll(".js-sim-status").forEach(btn => {
        btn.addEventListener("click", () => {
          status = btn.dataset.st;
          storage.set("dealerAppStatus", status);
          render();
        });
      });

      const loginBtn = containerEl.querySelector(".js-quick-dealer-login");
      if (loginBtn) {
        loginBtn.addEventListener("click", () => {
          const dealerUser = (window.SBC_DATA && window.SBC_DATA.users && window.SBC_DATA.users.dealer) || {};
          store.setSession(dealerUser);
          window.location.href = util.U("dealer/dashboard.html");
        });
      }
    }

    render();
  }

  /* ==================== 3. BULK ORDER TOOL ==================== */
  function initBulkOrder(containerEl) {
    if (!containerEl) return;

    let parsedRows = [];

    function parseInput(text) {
      const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
      const allProds = (window.SBC_DATA && window.SBC_DATA.products) || [];
      const rows = [];

      lines.forEach(line => {
        // Formats: "AX12 Pro, 10" or "tenda-ax12-pro 10" or "BE12 Pro, 5"
        const parts = line.split(/[,\t]+/).map(p => p.trim());
        const modelQuery = parts[0] ? parts[0].toLowerCase() : "";
        const qty = parts[1] ? parseInt(parts[1], 10) : 1;

        const matched = allProds.find(p => (
          p.model.toLowerCase() === modelQuery ||
          p.id.toLowerCase() === modelQuery ||
          p.name.toLowerCase().includes(modelQuery)
        ));

        if (!matched) {
          rows.push({ query: parts[0], qty, status: "Unknown SKU", valid: false });
        } else if (matched.status === "discontinued") {
          rows.push({ query: parts[0], product: matched, qty, status: "Discontinued", valid: false });
        } else if (matched.status === "out-of-stock") {
          rows.push({ query: parts[0], product: matched, qty, status: "Out of Stock", valid: false });
        } else if (matched.price.moq && qty < matched.price.moq) {
          rows.push({ query: parts[0], product: matched, qty, status: `Below MOQ (${matched.price.moq})`, valid: false });
        } else {
          rows.push({ query: parts[0], product: matched, qty, status: "OK", valid: true });
        }
      });

      parsedRows = rows;
      renderTable();
    }

    function renderTable() {
      const tableDiv = document.getElementById("js-bulk-results");
      if (!tableDiv) return;

      if (parsedRows.length === 0) {
        tableDiv.innerHTML = "";
        return;
      }

      const validCount = parsedRows.filter(r => r.valid).length;
      let totalValue = 0;
      parsedRows.filter(r => r.valid).forEach(r => {
        totalValue += (r.product.price.dealer || r.product.price.retail || 0) * r.qty;
      });

      tableDiv.innerHTML = `
        <div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r-lg);padding:20px;margin-top:24px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h4 style="margin:0;font-size:16px;">Verification Results (${parsedRows.length} Items Parsed)</h4>
            <span class="sbc-badge ${validCount === parsedRows.length ? 'sbc-badge--in-stock' : 'sbc-badge--low-stock'}">
              ${validCount} Valid &bull; ${parsedRows.length - validCount} Errors
            </span>
          </div>

          <div class="sbc-table-container">
            <table class="sbc-table">
              <thead>
                <tr>
                  <th>Entered Model</th>
                  <th>Matched Product</th>
                  <th>Quantity</th>
                  <th>Wholesale Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${parsedRows.map(r => `
                  <tr>
                    <td><code>${util.esc(r.query)}</code></td>
                    <td>${r.product ? `<strong>${util.esc(r.product.name)}</strong>` : '<span style="color:var(--red-700);">No match found</span>'}</td>
                    <td><strong>${r.qty}</strong></td>
                    <td>${r.product ? util.formatBDT((r.product.price.dealer || r.product.price.retail) * r.qty) : '—'}</td>
                    <td>
                      <span class="sbc-badge ${r.valid ? 'sbc-badge--in-stock' : 'sbc-badge--out-of-stock'}">
                        ${util.esc(r.status)}
                      </span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <div style="margin-top:20px;display:flex;justify-content:space-between;align-items:center;">
            <div>
              <span style="font-size:13px;color:var(--c-text-muted);">Valid Items Subtotal:</span>
              <strong style="font-size:18px;color:var(--navy-900);margin-left:8px;">${util.formatBDT(totalValue)}</strong>
            </div>
            <button class="sbc-btn sbc-btn--primary js-add-bulk-to-cart" ${validCount === 0 ? 'disabled' : ''}>
              ${ui.icon("shopping-cart", "sm")} Add ${validCount} Valid Items to Cart
            </button>
          </div>
        </div>
      `;

      const addBtn = tableDiv.querySelector(".js-add-bulk-to-cart");
      if (addBtn) {
        addBtn.addEventListener("click", () => {
          parsedRows.filter(r => r.valid).forEach(r => {
            store.addToCart(r.product.id, r.qty);
          });
          ui.toast(`Added ${validCount} items to shopping cart!`, "success");
          window.location.href = util.U("cart.html");
        });
      }
    }

    containerEl.innerHTML = `
      <div style="max-width:880px;margin:0 auto;">
        <div style="background:#fff;border:1px solid var(--gray-200);border-radius:var(--r-lg);padding:var(--sp-8);">
          <h2 style="font-size:var(--fs-h3);margin-bottom:8px;color:var(--navy-900);">Rapid Bulk Order Tool</h2>
          <p style="font-size:var(--fs-sm);color:var(--c-text-muted);margin-bottom:20px;">
            Paste a list of model numbers and quantities (e.g. <code>MODEL, QTY</code> per line) or upload a CSV file to order in volume.
          </p>

          <div class="sbc-form-group">
            <label class="sbc-label">Paste Order Lines (Model, Quantity):</label>
            <textarea id="js-bulk-text" class="sbc-textarea" style="min-height:140px;font-family:var(--font-mono);font-size:13px;" placeholder="BE12 Pro, 5&#10;TEG2210P, 8&#10;HSGQ-X200DW, 20&#10;SOL6156-OR-U, 10"></textarea>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div>
              <input type="file" id="js-csv-file" accept=".csv,.txt" style="display:none;">
              <button class="sbc-btn sbc-btn--outline sbc-btn--sm" onclick="document.getElementById('js-csv-file').click()">
                ${ui.icon("download", "sm")} Upload CSV File
              </button>
            </div>
            <button class="sbc-btn sbc-btn--primary js-parse-bulk">
              Verify & Parse Rows &rarr;
            </button>
          </div>
        </div>

        <div id="js-bulk-results"></div>
      </div>
    `;

    const parseBtn = containerEl.querySelector(".js-parse-bulk");
    if (parseBtn) {
      parseBtn.addEventListener("click", () => {
        const text = containerEl.querySelector("#js-bulk-text").value;
        parseInput(text);
      });
    }

    const csvFileInput = containerEl.querySelector("#js-csv-file");
    if (csvFileInput) {
      csvFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            containerEl.querySelector("#js-bulk-text").value = evt.target.result;
            parseInput(evt.target.result);
          };
          reader.readAsText(file);
        }
      });
    }
  }

  return {
    initRegister,
    initStatus,
    initBulkOrder
  };
})();
