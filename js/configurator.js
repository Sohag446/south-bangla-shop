/**
 * Network Solution Configurator Engine
 * Blueprint §7 P11, §10.11
 */
window.SBC = window.SBC || {};

window.SBC.configurator = (function () {
  const util = window.SBC.util;
  const store = window.SBC.store;
  const ui = window.SBC.ui;

  function init(containerEl) {
    if (!containerEl) return;

    let currentStep = 1;
    let projectProfile = {
      projectType: "office",
      deviceCount: 30,
      area: "3,500 sq ft",
      needPoE: true,
      needOutdoor: false,
      needUPS: true,
      needCCTV: true
    };
    let recommendations = [];

    function generateTopologySvg() {
      return `
        <svg viewBox="0 0 700 240" width="100%" height="auto" style="background:#0B1F3A;border-radius:8px;padding:16px;">
          <!-- Internet Cloud -->
          <circle cx="70" cy="120" r="36" fill="#1558D6" opacity="0.3" />
          <text x="70" y="115" fill="#fff" font-size="12" font-weight="700" text-anchor="middle">INTERNET</text>
          <text x="70" y="132" fill="#93c5fd" font-size="10" text-anchor="middle">ISP Fiber</text>

          <!-- Line to Core Gateway -->
          <line x1="106" y1="120" x2="190" y2="120" stroke="#1558D6" stroke-width="3" stroke-dasharray="4,4" />

          <!-- Core Router -->
          <rect x="190" y="90" width="100" height="60" rx="6" fill="#102A4C" stroke="#1558D6" stroke-width="2" />
          <text x="240" y="118" fill="#fff" font-size="11" font-weight="700" text-anchor="middle">CORE GATEWAY</text>
          <text x="240" y="134" fill="#94A3B8" font-size="9" text-anchor="middle">Gigabit / Wi-Fi 7</text>

          <!-- Line to Switch -->
          <line x1="290" y1="120" x2="370" y2="120" stroke="#0B7A52" stroke-width="3" />

          <!-- PoE Distribution Switch -->
          <rect x="370" y="90" width="110" height="60" rx="6" fill="#102A4C" stroke="#0B7A52" stroke-width="2" />
          <text x="425" y="118" fill="#fff" font-size="11" font-weight="700" text-anchor="middle">PoE DISTRIBUTION</text>
          <text x="425" y="134" fill="#6EE7B7" font-size="9" text-anchor="middle">Managed Switch</text>

          <!-- Branch Lines -->
          <path d="M 480 120 L 550 50" stroke="#0B7A52" stroke-width="2" fill="none" />
          <path d="M 480 120 L 550 120" stroke="#0B7A52" stroke-width="2" fill="none" />
          <path d="M 480 120 L 550 190" stroke="#0B7A52" stroke-width="2" fill="none" />

          <!-- Endpoints -->
          <!-- APs -->
          <rect x="550" y="30" width="110" height="40" rx="4" fill="#1E293B" stroke="#60A5FA" stroke-width="1.5" />
          <text x="605" y="55" fill="#E2E8F0" font-size="10" font-weight="600" text-anchor="middle">Wireless APs</text>

          <!-- IP Cameras -->
          <rect x="550" y="100" width="110" height="40" rx="4" fill="#1E293B" stroke="#34D399" stroke-width="1.5" />
          <text x="605" y="125" fill="#E2E8F0" font-size="10" font-weight="600" text-anchor="middle">CCTV Cameras</text>

          <!-- Workstations / Servers -->
          <rect x="550" y="170" width="110" height="40" rx="4" fill="#1E293B" stroke="#FBBF24" stroke-width="1.5" />
          <text x="605" y="195" fill="#E2E8F0" font-size="10" font-weight="600" text-anchor="middle">Clients / Servers</text>
        </svg>
      `;
    }

    function render() {
      const allProds = (window.SBC_DATA && window.SBC_DATA.products) || [];

      // Stepper Header
      let html = `
        <div style="display:flex;align-items:center;justify-content:center;margin-bottom:var(--sp-8);max-width:680px;margin-left:auto;margin-right:auto;">
          <div style="display:flex;align-items:center;width:100%;justify-content:space-between;position:relative;">
            <div style="display:flex;flex-direction:column;align-items:center;z-index:2;">
              <div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;background:${currentStep >= 1 ? 'var(--blue-600)' : 'var(--gray-200)'};color:${currentStep >= 1 ? '#fff' : 'var(--gray-700)'};">1</div>
              <span style="font-size:12px;font-weight:600;margin-top:6px;">Project</span>
            </div>
            <div style="flex:1;height:3px;background:${currentStep >= 2 ? 'var(--blue-600)' : 'var(--gray-200)'};margin:0 8px;transform:translateY(-12px);"></div>
            <div style="display:flex;flex-direction:column;align-items:center;z-index:2;">
              <div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;background:${currentStep >= 2 ? 'var(--blue-600)' : 'var(--gray-200)'};color:${currentStep >= 2 ? '#fff' : 'var(--gray-700)'};">2</div>
              <span style="font-size:12px;font-weight:600;margin-top:6px;">Equipment</span>
            </div>
            <div style="flex:1;height:3px;background:${currentStep >= 3 ? 'var(--blue-600)' : 'var(--gray-200)'};margin:0 8px;transform:translateY(-12px);"></div>
            <div style="display:flex;flex-direction:column;align-items:center;z-index:2;">
              <div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;background:${currentStep >= 3 ? 'var(--blue-600)' : 'var(--gray-200)'};color:${currentStep >= 3 ? '#fff' : 'var(--gray-700)'};">3</div>
              <span style="font-size:12px;font-weight:600;margin-top:6px;">Summary</span>
            </div>
            <div style="flex:1;height:3px;background:${currentStep >= 4 ? 'var(--blue-600)' : 'var(--gray-200)'};margin:0 8px;transform:translateY(-12px);"></div>
            <div style="display:flex;flex-direction:column;align-items:center;z-index:2;">
              <div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;background:${currentStep >= 4 ? 'var(--blue-600)' : 'var(--gray-200)'};color:${currentStep >= 4 ? '#fff' : 'var(--gray-700)'};">4</div>
              <span style="font-size:12px;font-weight:600;margin-top:6px;">Proposal</span>
            </div>
          </div>
        </div>
      `;

      if (currentStep === 1) {
        html += `
          <div class="sbc-config-card" style="max-width:760px;">
            <h2 style="font-size:var(--fs-h3);color:var(--navy-900);margin-bottom:8px;">Step 1: Define Your Infrastructure Requirements</h2>
            <p style="color:var(--c-text-muted);font-size:var(--fs-sm);margin-bottom:24px;">
              Select your deployment scenario to receive an automated bill of materials tailored to your bandwidth and device scale.
            </p>

            <div class="sbc-form-group">
              <label class="sbc-label">Project Type:</label>
              <select id="config-type" class="sbc-select">
                <option value="home" ${projectProfile.projectType === 'home' ? 'selected' : ''}>Residential / Smart Home</option>
                <option value="office" ${projectProfile.projectType === 'office' ? 'selected' : ''}>Small / Medium Office (SMB)</option>
                <option value="enterprise" ${projectProfile.projectType === 'enterprise' ? 'selected' : ''}>Enterprise Corporate Campus</option>
                <option value="hotel" ${projectProfile.projectType === 'hotel' ? 'selected' : ''}>Hotel / Hospitality Resort</option>
                <option value="isp" ${projectProfile.projectType === 'isp' ? 'selected' : ''}>ISP Substation / FTTH Distribution</option>
                <option value="cctv" ${projectProfile.projectType === 'cctv' ? 'selected' : ''}>Campus CCTV Security Surveillance</option>
              </select>
            </div>

            <div class="sbc-form-group">
              <label class="sbc-label">Estimated Users / Connected Devices:</label>
              <input type="number" id="config-devices" class="sbc-input" value="${projectProfile.deviceCount}" min="1" max="5000">
            </div>

            <div class="sbc-form-group">
              <label class="sbc-label">Coverage Area (Optional):</label>
              <input type="text" id="config-area" class="sbc-input" value="${util.esc(projectProfile.area)}" placeholder="e.g. 5,000 sq ft / 3 Floors">
            </div>

            <div style="border-top:1px solid var(--gray-200);padding-top:16px;margin-top:16px;">
              <label class="sbc-label" style="margin-bottom:12px;">Special Hardware Modules Needed:</label>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <label class="sbc-checkbox-label">
                  <input type="checkbox" id="config-poe" ${projectProfile.needPoE ? 'checked' : ''}>
                  <span>PoE Power for APs & VoIP</span>
                </label>
                <label class="sbc-checkbox-label">
                  <input type="checkbox" id="config-cctv" ${projectProfile.needCCTV ? 'checked' : ''}>
                  <span>CCTV Surveillance Package</span>
                </label>
                <label class="sbc-checkbox-label">
                  <input type="checkbox" id="config-ups" ${projectProfile.needUPS ? 'checked' : ''}>
                  <span>Online UPS / Power Backup</span>
                </label>
                <label class="sbc-checkbox-label">
                  <input type="checkbox" id="config-outdoor" ${projectProfile.needOutdoor ? 'checked' : ''}>
                  <span>Long-Range Outdoor PtP Links</span>
                </label>
              </div>
            </div>

            <div style="margin-top:32px;display:flex;justify-content:flex-end;">
              <button class="sbc-btn sbc-btn--primary js-step1-next">
                Generate Recommendations &rarr;
              </button>
            </div>
          </div>
        `;
      } else if (currentStep === 2) {
        html += `
          <div class="sbc-config-card" style="max-width:880px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
              <div>
                <h2 style="font-size:var(--fs-h3);color:var(--navy-900);margin:0 0 4px;">Step 2: Recommended Equipment List</h2>
                <p style="color:var(--c-text-muted);font-size:var(--fs-sm);margin:0;">Adjust quantities or replace items based on your installation layout.</p>
              </div>
              <span class="sbc-badge sbc-badge--in-stock">${recommendations.length} Components</span>
            </div>

            <div class="sbc-table-container">
              <table class="sbc-table">
                <thead>
                  <tr>
                    <th>Item & Role</th>
                    <th>Model</th>
                    <th style="width:120px;">Qty</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${recommendations.map((rec, idx) => {
                    const p = allProds.find(item => item.id === rec.id);
                    if (!p) return "";
                    return `
                      <tr>
                        <td>
                          <div style="font-weight:700;color:var(--navy-900);">${util.esc(p.name)}</div>
                          <div style="font-size:12px;color:var(--blue-600);">${util.esc(rec.role)}</div>
                        </td>
                        <td style="font-size:13px;font-weight:600;">${util.esc(p.model)}</td>
                        <td>
                          <input type="number" class="sbc-input js-rec-qty" data-idx="${idx}" value="${rec.qty}" min="1" max="999" style="height:36px;width:70px;text-align:center;">
                        </td>
                        <td>
                          <span class="sbc-badge sbc-badge--in-stock">Available</span>
                        </td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>

            <div style="margin-top:28px;display:flex;justify-content:space-between;">
              <button class="sbc-btn sbc-btn--outline js-step-back">&larr; Back</button>
              <button class="sbc-btn sbc-btn--primary js-step2-next">Review Topology & Summary &rarr;</button>
            </div>
          </div>
        `;
      } else if (currentStep === 3) {
        html += `
          <div class="sbc-config-card" style="max-width:880px;">
            <h2 style="font-size:var(--fs-h3);color:var(--navy-900);margin-bottom:8px;">Step 3: Network Topology & Solution Summary</h2>
            <p style="color:var(--c-text-muted);font-size:var(--fs-sm);margin-bottom:20px;">
              Architectural diagram mapping connectivity between core gateways, switches, and client endpoints.
            </p>

            <div style="margin-bottom:24px;">
              ${generateTopologySvg()}
            </div>

            <h3 style="font-size:var(--fs-h4);margin-bottom:12px;">Bill of Materials</h3>
            <div class="sbc-table-container" style="margin-bottom:24px;">
              <table class="sbc-table">
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Model</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  ${recommendations.map(rec => {
                    const p = allProds.find(item => item.id === rec.id);
                    if (!p) return "";
                    return `
                      <tr>
                        <td><strong>${util.esc(p.name)}</strong><br><small style="color:var(--c-text-muted);">${util.esc(rec.role)}</small></td>
                        <td>${util.esc(p.model)}</td>
                        <td><strong>${rec.qty} Units</strong></td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;">
              <button class="sbc-btn sbc-btn--outline js-step-back">&larr; Back</button>
              <div style="display:flex;gap:10px;">
                <button class="sbc-btn sbc-btn--soft js-add-all-cart">
                  ${ui.icon("shopping-cart", "sm")} Add All to Cart
                </button>
                <button class="sbc-btn sbc-btn--primary js-step3-next">
                  Generate Formal Proposal &rarr;
                </button>
              </div>
            </div>
          </div>
        `;
      } else if (currentStep === 4) {
        html += `
          <div class="sbc-config-card sbc-proposal-sheet" style="max-width:760px;">
            <div style="border-bottom:2px solid var(--navy-900);padding-bottom:16px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:flex-end;">
              <div>
                <h1 style="font-size:22px;color:var(--navy-900);margin:0 0 4px;">SOUTH BANGLA COMPUTER</h1>
                <div style="font-size:12px;color:var(--c-text-muted);">Network Solution Technical Proposal (Demo Edition)</div>
              </div>
              <div style="text-align:right;font-size:11px;color:var(--gray-500);">
                Ref: PROP-SBC-${Date.now().toString().slice(-6)}<br>
                Date: 21 October 2026
              </div>
            </div>

            <div style="background:var(--gray-50);padding:14px;border-radius:6px;margin-bottom:20px;font-size:13px;">
              <strong>Project Profile:</strong> ${util.esc(projectProfile.projectType.toUpperCase())} &bull; ${projectProfile.deviceCount} Devices &bull; ${util.esc(projectProfile.area)}
            </div>

            <div class="sbc-table-container" style="margin-bottom:24px;">
              <table class="sbc-table">
                <thead>
                  <tr>
                    <th>Item Description</th>
                    <th>Model</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  ${recommendations.map(rec => {
                    const p = allProds.find(item => item.id === rec.id);
                    if (!p) return "";
                    return `
                      <tr>
                        <td><strong>${util.esc(p.name)}</strong></td>
                        <td>${util.esc(p.model)}</td>
                        <td>${rec.qty}</td>
                      </tr>
                    `;
                  }).join("")}
                </tbody>
              </table>
            </div>

            <div style="font-size:11px;color:var(--c-text-muted);font-style:italic;margin-bottom:24px;">
              * Note: Commercial quotation pricing is prepared based on dealer/project volume allocation. Click below to submit contact details to our enterprise desk.
            </div>

            <div class="no-print" style="display:flex;justify-content:space-between;align-items:center;">
              <button class="sbc-btn sbc-btn--outline js-step-back">&larr; Back</button>
              <div style="display:flex;gap:10px;">
                <button class="sbc-btn sbc-btn--outline" onclick="window.print()">
                  ${ui.icon("printer", "sm")} Print / Save PDF
                </button>
                <a href="${util.U('quote.html')}" class="sbc-btn sbc-btn--primary">
                  Request Commercial Pricing &rarr;
                </a>
              </div>
            </div>
          </div>
        `;
      }

      containerEl.innerHTML = html;

      // Event Handlers for Steps
      if (currentStep === 1) {
        const nextBtn = containerEl.querySelector(".js-step1-next");
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            projectProfile.projectType = containerEl.querySelector("#config-type").value;
            projectProfile.deviceCount = parseInt(containerEl.querySelector("#config-devices").value, 10) || 25;
            projectProfile.area = containerEl.querySelector("#config-area").value;
            projectProfile.needPoE = containerEl.querySelector("#config-poe").checked;
            projectProfile.needCCTV = containerEl.querySelector("#config-cctv").checked;
            projectProfile.needUPS = containerEl.querySelector("#config-ups").checked;
            projectProfile.needOutdoor = containerEl.querySelector("#config-outdoor").checked;

            recommendations = window.SBC_DATA.configuratorRules.getRecommendations(projectProfile);
            currentStep = 2;
            render();
          });
        }
      } else if (currentStep === 2) {
        containerEl.querySelectorAll(".js-rec-qty").forEach(inp => {
          inp.addEventListener("change", (e) => {
            const idx = parseInt(e.target.dataset.idx, 10);
            const val = parseInt(e.target.value, 10);
            if (recommendations[idx] && val > 0) {
              recommendations[idx].qty = val;
            }
          });
        });

        const nextBtn = containerEl.querySelector(".js-step2-next");
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            currentStep = 3;
            render();
          });
        }
        const backBtn = containerEl.querySelector(".js-step-back");
        if (backBtn) {
          backBtn.addEventListener("click", () => {
            currentStep = 1;
            render();
          });
        }
      } else if (currentStep === 3) {
        const backBtn = containerEl.querySelector(".js-step-back");
        if (backBtn) {
          backBtn.addEventListener("click", () => {
            currentStep = 2;
            render();
          });
        }
        const nextBtn = containerEl.querySelector(".js-step3-next");
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            currentStep = 4;
            render();
          });
        }
        const addAllBtn = containerEl.querySelector(".js-add-all-cart");
        if (addAllBtn) {
          addAllBtn.addEventListener("click", () => {
            recommendations.forEach(rec => {
              store.addToCart(rec.id, rec.qty);
            });
            ui.toast(`Added ${recommendations.length} project components to cart`, "success");
          });
        }
      } else if (currentStep === 4) {
        const backBtn = containerEl.querySelector(".js-step-back");
        if (backBtn) {
          backBtn.addEventListener("click", () => {
            currentStep = 3;
            render();
          });
        }
      }
    }

    render();
  }

  return { init };
})();
