/**
 * South Bangla Computers — Nearest Dealer Finder Engine
 *
 * Provides:
 * - Product-aware retailer discovery
 * - Native browser Geolocation with Haversine distance sorting
 * - Privacy-respecting local processing (no remote coordinate tracking)
 * - Cascading Bangladesh division & district filters
 * - Honest inventory status & verified showroom distinctions
 */

window.SBC = window.SBC || {};

window.SBC.dealerFinder = (function () {
  const util = window.SBC.util || {};
  const ui = window.SBC.ui || {};

  // Internal state
  let selectedProduct = null;
  let userCoords = null; // { latitude, longitude, accuracy }
  let geoStatus = "idle"; // 'idle' | 'detecting' | 'granted' | 'denied' | 'unsupported'
  let geoErrorMessage = "";
  let currentDivision = "all";
  let currentDistrict = "all";
  let currentSearchQuery = "";

  /**
   * Calculate Haversine distance in kilometers between two GPS coordinates
   */
  function haversineDistanceKm(lat1, lon1, lat2, lon2) {
    if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return null;
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Format distance cleanly (meters if < 1km, else kilometers)
   */
  function formatDistance(distKm) {
    if (distKm == null || isNaN(distKm)) return "";
    if (distKm < 1) {
      const meters = Math.round(distKm * 1000);
      return `${meters} m away`;
    }
    return `${distKm.toFixed(1)} km away`;
  }

  /**
   * Retrieve all catalog products
   */
  function getAllProducts() {
    const D = window.SBC_DATA || {};
    if (D.shopProducts && D.shopProducts.length) return D.shopProducts;
    return D.products || [];
  }

  /**
   * Retrieve product from URL parameter
   */
  function getProductFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const identifier = params.get("product") || params.get("id") || params.get("sku") || params.get("p");
    if (!identifier) return null;

    const all = getAllProducts();
    const cleanId = String(identifier).trim().toLowerCase();

    return all.find(p => {
      const pId = p.id ? String(p.id).toLowerCase() : "";
      const pSku = p.sku ? String(p.sku).toLowerCase() : "";
      const pSlug = p.slug ? String(p.slug).toLowerCase() : "";
      const pModel = p.model ? String(p.model).toLowerCase() : "";
      return pId === cleanId || pSku === cleanId || pSlug === cleanId || pModel === cleanId;
    }) || null;
  }

  /**
   * Retrieve all dealer records
   */
  function getAllDealers() {
    const D = window.SBC_DATA || {};
    return (D.dealers || []).filter(d => d.active !== false);
  }

  /**
   * Request Geolocation from browser
   */
  function detectLocation() {
    if (!("geolocation" in navigator)) {
      geoStatus = "unsupported";
      geoErrorMessage = "Browser geolocation is not supported on this device.";
      renderGeoStatus();
      renderDealers();
      return;
    }

    geoStatus = "detecting";
    geoErrorMessage = "";
    renderGeoStatus();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        userCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        geoStatus = "granted";
        renderGeoStatus();
        renderDealers();
      },
      (error) => {
        geoStatus = "denied";
        if (error.code === error.PERMISSION_DENIED) {
          geoErrorMessage = "Location permission was denied. You can select your division and district manually below.";
        } else if (error.code === error.TIMEOUT) {
          geoErrorMessage = "Location detection timed out. Please choose your area manually or retry.";
        } else {
          geoErrorMessage = "Location is temporarily unavailable. Please choose your area manually.";
        }
        renderGeoStatus();
        renderDealers();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  }

  /**
   * Filter and sort dealers
   */
  function getFilteredAndSortedDealers() {
    const dealers = getAllDealers();
    const query = currentSearchQuery.trim().toLowerCase();

    return dealers
      .map(dealer => {
        let dist = null;
        if (userCoords && dealer.latitude != null && dealer.longitude != null) {
          dist = haversineDistanceKm(
            userCoords.latitude,
            userCoords.longitude,
            dealer.latitude,
            dealer.longitude
          );
        }

        // Product inventory match evaluation
        let inventoryStatus = "unknown";
        if (selectedProduct) {
          if (dealer.productAvailability && dealer.productAvailability[selectedProduct.id]) {
            inventoryStatus = dealer.productAvailability[selectedProduct.id]; // e.g. 'in_stock'
          } else if (dealer.authorizedBrands && dealer.authorizedBrands.includes(selectedProduct.brand)) {
            inventoryStatus = "authorized_brand_outlet";
          } else {
            inventoryStatus = "confirmation_required";
          }
        }

        return {
          ...dealer,
          distanceKm: dist,
          distanceFormatted: dist != null ? formatDistance(dist) : null,
          inventoryStatus
        };
      })
      .filter(dealer => {
        // Division filter
        if (currentDivision !== "all" && dealer.division !== currentDivision) {
          return false;
        }

        // District filter
        if (currentDistrict !== "all" && dealer.district !== currentDistrict) {
          return false;
        }

        // Search Query filter (matches name, address, locality, district)
        if (query) {
          const haystack = [
            dealer.name,
            dealer.address,
            dealer.locality,
            dealer.district,
            dealer.division
          ].filter(Boolean).join(" ").toLowerCase();

          if (!haystack.includes(query)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        // If GPS is active and both have distance, sort by actual distance
        if (a.distanceKm != null && b.distanceKm != null) {
          return a.distanceKm - b.distanceKm;
        }
        if (a.distanceKm != null) return -1;
        if (b.distanceKm != null) return 1;

        // If product has confirmed stock, prioritize it
        if (a.inventoryStatus === "in_stock" && b.inventoryStatus !== "in_stock") return -1;
        if (b.inventoryStatus === "in_stock" && a.inventoryStatus !== "in_stock") return 1;

        // Verified outlets before test fixtures
        if (!a.isTestFixture && b.isTestFixture) return -1;
        if (a.isTestFixture && !b.isTestFixture) return 1;

        return a.name.localeCompare(b.name);
      });
  }

  /**
   * Render Selected Product Banner / Card
   */
  function renderSelectedProduct() {
    const cardEl = document.getElementById("df-selected-product");
    const headingEl = document.getElementById("df-page-heading");
    const subtitleEl = document.getElementById("df-page-subtitle");
    const crumbEl = document.getElementById("df-crumb-product");

    if (!cardEl) return;

    if (!selectedProduct) {
      cardEl.style.display = "none";
      if (headingEl) {
        headingEl.innerHTML = `
          <span class="sbc-page-banner__title-line1">Find Your Nearest</span>
          <span class="sbc-page-banner__title-line2">Authorized Dealer</span>
        `;
      }
      if (subtitleEl) {
        subtitleEl.textContent = "Discover participating retailers and authorized South Bangla Computers showrooms across Bangladesh.";
      }
      if (crumbEl) crumbEl.textContent = "Dealer Network";
      return;
    }

    cardEl.style.display = "flex";

    const brandName = selectedProduct.brand || "Meetion";
    if (headingEl) {
      headingEl.innerHTML = `
        <span class="sbc-page-banner__title-line1">Find Your Nearest</span>
        <span class="sbc-page-banner__title-line2">${util.esc(brandName)} Dealer</span>
      `;
    }
    if (subtitleEl) {
      subtitleEl.textContent = `Find participating retailers near your location and discover where to purchase your selected ${brandName} product.`;
    }
    if (crumbEl) {
      crumbEl.textContent = selectedProduct.model || selectedProduct.name;
    }

    const firstImg = (selectedProduct.images && selectedProduct.images[0]) || "";
    const resolvedImg = util.imgUrl(firstImg);
    const priceFormatted = (selectedProduct.price && selectedProduct.price.retail)
      ? util.formatBDT(selectedProduct.price.retail)
      : "৳ —";

    cardEl.innerHTML = `
      <div class="df-product-details-wrap">
        <img src="${util.esc(resolvedImg)}" alt="${util.esc(selectedProduct.name)}" class="df-product-thumb" onerror="this.onerror=null;this.src='assets/img/placeholder-product.svg';">
        <div>
          <div class="df-product-badge-row">
            <span class="df-product-pill">${util.esc(selectedProduct.brand)}</span>
            <span class="df-product-sku">SKU: ${util.esc(selectedProduct.sku || selectedProduct.id)}</span>
          </div>
          <h2 class="df-product-title">${util.esc(selectedProduct.name)}</h2>
          <div class="df-product-meta-row">
            <span class="df-product-price">${priceFormatted}</span>
            <span class="df-product-stock-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              In Stock (Central Hub)
            </span>
          </div>
        </div>
      </div>
      <div class="df-product-card-actions">
        <a href="${util.U('product.html', { id: selectedProduct.id })}" class="df-btn df-btn--outline df-btn--sm">
          <span>View Details</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </a>
        <button type="button" class="df-btn df-btn--outline df-btn--sm" id="df-clear-product-btn" title="View all outlets without product filter">
          Browse All Outlets
        </button>
      </div>
    `;

    const clearBtn = document.getElementById("df-clear-product-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        selectedProduct = null;
        renderSelectedProduct();
        renderDealers();
      });
    }
  }

  /**
   * Render Geolocation Status Banner
   */
  function renderGeoStatus() {
    const boxEl = document.getElementById("df-geo-status-box");
    if (!boxEl) return;

    if (geoStatus === "detecting") {
      boxEl.className = "df-geo-status-box df-geo-status-box--detecting";
      boxEl.innerHTML = `
        <div class="df-geo-status-content">
          <div class="df-geo-status-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </div>
          <div>
            <div class="df-geo-status-title">Detecting your location…</div>
            <p class="df-geo-status-desc">Calculating distances to find closest authorized outlets to your position.</p>
          </div>
        </div>
      `;
    } else if (geoStatus === "granted" && userCoords) {
      boxEl.className = "df-geo-status-box df-geo-status-box--granted";
      boxEl.innerHTML = `
        <div class="df-geo-status-content">
          <div class="df-geo-status-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div>
            <div class="df-geo-status-title">Nearest Dealers Detected via Location</div>
            <p class="df-geo-status-desc">Dealers are sorted from closest to farthest from your device.</p>
          </div>
        </div>
        <div class="df-geo-status-actions">
          <button type="button" class="df-btn df-btn--outline df-btn--sm" id="df-retry-geo-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
            <span>Re-detect Location</span>
          </button>
          <button type="button" class="df-btn df-btn--outline df-btn--sm" id="df-clear-geo-btn">
            Clear Location
          </button>
        </div>
      `;

      const retryBtn = document.getElementById("df-retry-geo-btn");
      if (retryBtn) retryBtn.addEventListener("click", detectLocation);

      const clearBtn = document.getElementById("df-clear-geo-btn");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          userCoords = null;
          geoStatus = "idle";
          renderGeoStatus();
          renderDealers();
        });
      }
    } else if (geoStatus === "denied" || geoStatus === "unsupported") {
      boxEl.className = "df-geo-status-box df-geo-status-box--denied";
      boxEl.innerHTML = `
        <div class="df-geo-status-content">
          <div class="df-geo-status-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <div>
            <div class="df-geo-status-title">Location Services Unavailable</div>
            <p class="df-geo-status-desc">${util.esc(geoErrorMessage)}</p>
          </div>
        </div>
        <div class="df-geo-status-actions">
          <button type="button" class="df-btn df-btn--primary df-btn--sm" id="df-choose-area-btn">
            Choose Your Area &darr;
          </button>
          <button type="button" class="df-btn df-btn--outline df-btn--sm" id="df-retry-geo-btn">
            Retry Detection
          </button>
        </div>
      `;

      const chooseBtn = document.getElementById("df-choose-area-btn");
      if (chooseBtn) {
        chooseBtn.addEventListener("click", () => {
          const divSelect = document.getElementById("df-filter-division");
          if (divSelect) {
            divSelect.focus();
            divSelect.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
      }

      const retryBtn = document.getElementById("df-retry-geo-btn");
      if (retryBtn) retryBtn.addEventListener("click", detectLocation);
    } else {
      // Idle state
      boxEl.className = "df-geo-status-box df-geo-status-box--detecting";
      boxEl.innerHTML = `
        <div class="df-geo-status-content">
          <div class="df-geo-status-icon-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </div>
          <div>
            <div class="df-geo-status-title">Auto-Detect Closest Retailers</div>
            <p class="df-geo-status-desc">Allow location permission to sort participating outlets from nearest to farthest.</p>
          </div>
        </div>
        <div class="df-geo-status-actions">
          <button type="button" class="df-btn df-btn--primary df-btn--sm" id="df-start-geo-btn">
            Find Nearby Dealers
          </button>
        </div>
      `;

      const startBtn = document.getElementById("df-start-geo-btn");
      if (startBtn) startBtn.addEventListener("click", detectLocation);
    }
  }

  /**
   * Populate Division and District Dropdowns
   */
  function initFilterDropdowns() {
    const divSelect = document.getElementById("df-filter-division");
    const distSelect = document.getElementById("df-filter-district");
    const searchInput = document.getElementById("df-search-input");
    const resetBtn = document.getElementById("df-filter-reset");

    if (!divSelect || !distSelect) return;

    const divisionsData = (window.SBC_DATA && window.SBC_DATA.divisions) || {};
    const divisionsList = Object.keys(divisionsData);

    // Populate Division Select
    divSelect.innerHTML = `
      <option value="all">All Divisions (Nationwide)</option>
      ${divisionsList.map(div => `<option value="${util.esc(div)}">${util.esc(div)}</option>`).join("")}
    `;

    function updateDistrictOptions() {
      const selectedDiv = divSelect.value;
      if (selectedDiv === "all" || !divisionsData[selectedDiv]) {
        distSelect.innerHTML = `<option value="all">All Districts</option>`;
        distSelect.disabled = true;
      } else {
        const districts = divisionsData[selectedDiv] || [];
        distSelect.innerHTML = `
          <option value="all">All Districts in ${util.esc(selectedDiv)}</option>
          ${districts.map(dst => `<option value="${util.esc(dst)}">${util.esc(dst)}</option>`).join("")}
        `;
        distSelect.disabled = false;
      }
    }

    divSelect.addEventListener("change", () => {
      currentDivision = divSelect.value;
      currentDistrict = "all";
      updateDistrictOptions();
      renderDealers();
    });

    distSelect.addEventListener("change", () => {
      currentDistrict = distSelect.value;
      renderDealers();
    });

    if (searchInput) {
      searchInput.addEventListener("input", util.debounce(() => {
        currentSearchQuery = searchInput.value;
        renderDealers();
      }, 150));
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        currentDivision = "all";
        currentDistrict = "all";
        currentSearchQuery = "";
        divSelect.value = "all";
        updateDistrictOptions();
        distSelect.value = "all";
        if (searchInput) searchInput.value = "";
        renderDealers();
      });
    }

    updateDistrictOptions();
  }

  /**
   * Render Dealer Cards Grid
   */
  function renderDealers() {
    const gridEl = document.getElementById("df-dealer-grid");
    const countEl = document.getElementById("df-results-count");
    if (!gridEl) return;

    const filtered = getFilteredAndSortedDealers();

    // Results count
    if (countEl) {
      const locationText = currentDistrict !== "all"
        ? `in ${currentDistrict}`
        : currentDivision !== "all"
          ? `in ${currentDivision}`
          : "Nationwide";

      const sortText = userCoords ? "sorted by closest distance" : "official South Bangla network";
      countEl.textContent = `Showing ${filtered.length} verified ${filtered.length === 1 ? 'outlet' : 'outlets'} ${locationText} (${sortText})`;
    }

    // Empty state
    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div class="df-empty-state" style="grid-column: 1 / -1;">
          <div class="df-empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          </div>
          <h3 class="df-empty-title">No Participating Dealer Found</h3>
          <p class="df-empty-desc">
            No verified dealer has been listed for this product in your selected area yet. Try another nearby area or contact the retailer information shown when available.
          </p>
          <div class="df-empty-actions">
            <button type="button" class="df-btn df-btn--primary" id="df-empty-reset-btn">
              Show All Nationwide Showrooms
            </button>
            <a href="tel:+8801746175778" class="df-btn df-btn--outline">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Call Central Desk: +88 01746 175778</span>
            </a>
          </div>
        </div>
      `;

      const emptyResetBtn = document.getElementById("df-empty-reset-btn");
      if (emptyResetBtn) {
        emptyResetBtn.addEventListener("click", () => {
          const resetBtn = document.getElementById("df-filter-reset");
          if (resetBtn) resetBtn.click();
        });
      }
      return;
    }

    // Render Dealer Cards
    gridEl.innerHTML = filtered.map((dealer, index) => {
      const isNearest = userCoords && index === 0 && dealer.distanceKm != null;
      const cardClass = isNearest
        ? "df-dealer-card df-dealer-card--nearest"
        : dealer.isTestFixture
          ? "df-dealer-card df-dealer-card--test-fixture"
          : "df-dealer-card";

      // Product stock / availability badge
      let stockBadgeHtml = "";
      if (dealer.inventoryStatus === "in_stock") {
        stockBadgeHtml = `
          <span class="df-stock-badge df-stock-badge--confirmed">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Confirmed In Stock</span>
          </span>
        `;
      } else if (dealer.inventoryStatus === "authorized_brand_outlet") {
        const bName = selectedProduct ? selectedProduct.brand : "Meetion";
        stockBadgeHtml = `
          <span class="df-stock-badge df-stock-badge--verified-showroom">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Authorized ${util.esc(bName)} Outlet</span>
          </span>
        `;
      } else {
        stockBadgeHtml = `
          <span class="df-stock-badge df-stock-badge--check">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>Stock Confirmation Required</span>
          </span>
        `;
      }

      // Distance badge (strictly only when genuine distance is calculable)
      const distanceBadgeHtml = dealer.distanceFormatted
        ? `<span class="df-distance-badge">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
             <span>${dealer.distanceFormatted}</span>
           </span>`
        : "";

      // Test fixture pill
      const fixturePillHtml = dealer.isTestFixture
        ? `<span class="df-fixture-pill">TEST FIXTURE &bull; NOT VERIFIED LIVE</span>`
        : "";

      // Nearest recommendation pill
      const nearestPillHtml = isNearest
        ? `<span class="df-nearest-pill">
             <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></polygon></svg>
             <span>Recommended Nearest Outlet</span>
           </span>`
        : "";

      // Directions URL: Google Maps destination
      let mapsUrl = "";
      if (dealer.latitude != null && dealer.longitude != null) {
        mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${dealer.latitude},${dealer.longitude}`;
      } else {
        mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.name + " " + dealer.address)}`;
      }

      const cleanPhone = (dealer.phone || "").replace(/[^0-9+]/g, "");

      return `
        <article class="${cardClass}" data-dealer-id="${util.esc(dealer.id)}">
          <div>
            <div class="df-card-top-badges">
              <div>
                ${nearestPillHtml}
                ${fixturePillHtml}
              </div>
              <div>
                ${distanceBadgeHtml}
              </div>
            </div>

            <h3 class="df-dealer-name">${util.esc(dealer.name)}</h3>

            <div class="df-dealer-status-row">
              ${stockBadgeHtml}
            </div>

            <div class="df-dealer-address-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>${util.esc(dealer.address)}</span>
            </div>

            <div class="df-dealer-meta-tags">
              <span class="df-area-tag">${util.esc(dealer.division)} Division</span>
              <span class="df-area-tag">${util.esc(dealer.district)} District</span>
              ${dealer.locality ? `<span class="df-area-tag">${util.esc(dealer.locality)}</span>` : ""}
            </div>

            ${dealer.openingHours ? `
              <div class="df-dealer-hours-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>${util.esc(dealer.openingHours)}</span>
              </div>
            ` : ""}

            ${dealer.phone ? `
              <div class="df-dealer-contact-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:${cleanPhone}" class="df-dealer-phone-link">${util.esc(dealer.phone)}</a>
              </div>
            ` : ""}
          </div>

          <div class="df-dealer-actions">
            <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="df-btn df-btn--outline" title="Open Google Maps Directions">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              <span>Get Directions</span>
            </a>
            ${dealer.phone ? `
              <a href="tel:${cleanPhone}" class="df-btn df-btn--primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Call Outlet</span>
              </a>
            ` : `
              <a href="${util.U('contact.html')}" class="df-btn df-btn--primary">
                <span>Inquire</span>
              </a>
            `}
          </div>
        </article>
      `;
    }).join("");
  }

  /**
   * Main Initialization
   */
  function init() {
    selectedProduct = getProductFromUrl();

    // Document title
    if (selectedProduct) {
      document.title = `Find Nearest ${selectedProduct.brand || 'Meetion'} Dealer | ${selectedProduct.name} | South Bangla Computers`;
    } else {
      document.title = `Find Your Nearest Authorized Dealer | South Bangla Computers`;
    }

    renderSelectedProduct();
    initFilterDropdowns();
    renderGeoStatus();
    renderDealers();

    // Automatically trigger Geolocation detection
    detectLocation();
  }

  return {
    init,
    detectLocation
  };
})();
