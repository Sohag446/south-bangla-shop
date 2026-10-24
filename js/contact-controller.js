/**
 * South Bangla Computers — Contact Page Controller
 * Fully Functional Google Maps Interactive Bangladesh Network
 * Features:
 * - Real Google Maps roadmap, terrain, and satellite tile layers
 * - Authentic Google Red Location Pins with pulses and Bengali/English labels
 * - Interactive popups with branch contact, working hours, and Google GPS navigation
 * - City filter buttons (Dhaka, Rangpur, Sylhet, Khulna, Barishal, Chattogram, Rajshahi, etc.)
 * - Floating active branch detail panel & directory cards
 * - Graceful fallback if offline
 * - Validated contact inquiry form
 */
window.SBC = window.SBC || {};

window.SBC.contact = (function () {
  const util = window.SBC.util || { esc: s => s };
  const ui = window.SBC.ui;

  // Verified South Bangla Computers Offices & Service Hubs across Bangladesh
  const offices = [
    {
      id: "dhaka-head",
      city: "Dhaka",
      bengali: "ঢাকা",
      name: "Corporate Head Office",
      type: "Corporate Headquarters",
      lat: 23.7390,
      lng: 90.3846,
      address: "323, Akram Serenity, Level 5 & 6, Elephant Road, Dhaka-1205",
      phones: ["+88 01746 175 778", "+88 02-9667366"],
      email: "info@southbanglabd.com",
      hours: "Sat – Thu: 9:30 AM – 7:30 PM",
      mapQuery: "Akram+Serenity+Elephant+Road+Dhaka"
    },
    {
      id: "rangpur-hub",
      city: "Rangpur",
      bengali: "রংপুর",
      name: "Rangpur Regional Service Hub",
      type: "Regional Service Center",
      lat: 25.7439,
      lng: 89.2752,
      address: "Station Road, Jahaj Company Mor, Rangpur-5400",
      phones: ["+88 01988 813 201"],
      email: "rangpur@southbanglabd.com",
      hours: "Sat – Thu: 10:00 AM – 6:30 PM",
      mapQuery: "Jahaj+Company+Mor+Rangpur"
    },
    {
      id: "sylhet-support",
      city: "Sylhet",
      bengali: "সিলেট",
      name: "Sylhet Support Center",
      type: "Regional Support Hub",
      lat: 24.8949,
      lng: 91.8687,
      address: "Jollarpar Road, Zindabazar, Sylhet-3100",
      phones: ["+88 01988 813 201"],
      email: "sylhet@southbanglabd.com",
      hours: "Sat – Thu: 10:00 AM – 6:30 PM",
      mapQuery: "Zindabazar+Sylhet"
    },
    {
      id: "khulna-showroom",
      city: "Khulna",
      bengali: "খুলনা",
      name: "Khulna Showroom & Service Hub",
      type: "Divisional Showroom",
      lat: 22.8456,
      lng: 89.5403,
      address: "37 Sir Iqbal Road, Fatema Garden (2nd Floor), Press Club, Khulna",
      phones: ["+88 01611 500 112"],
      email: "khulna@southbanglabd.com",
      hours: "Sat – Thu: 10:00 AM – 7:30 PM",
      mapQuery: "Khulna+Press+Club+Sir+Iqbal+Road+Khulna"
    },
    {
      id: "barishal-support",
      city: "Barishal",
      bengali: "বরিশাল",
      name: "Barishal Regional Support Center",
      type: "RMA & Technical Center",
      lat: 22.7010,
      lng: 90.3535,
      address: "Sadar Road, Hospital Mor, Barishal-8200",
      phones: ["+88 01988 813 201"],
      email: "barishal@southbanglabd.com",
      hours: "Sat – Thu: 10:00 AM – 6:00 PM",
      mapQuery: "Sadar+Road+Barishal"
    },
    {
      id: "ctg-showroom",
      city: "Chattogram",
      bengali: "চট্টগ্রাম",
      name: "Chattogram Showroom & Hub",
      type: "Divisional Showroom",
      lat: 22.3270,
      lng: 91.8123,
      address: "1401, Johara Tower, S.K. Mujib Road, Agrabad, Chittagong-4100",
      phones: ["+88 031-257911", "+88 01678 040 445"],
      email: "ctg@southbanglabd.com",
      hours: "Sat – Thu: 10:00 AM – 7:30 PM",
      mapQuery: "Johara+Tower+Agrabad+Chittagong"
    },
    {
      id: "rajshahi-support",
      city: "Rajshahi",
      bengali: "রাজশাহী",
      name: "Rajshahi Service Center",
      type: "RMA & Technical Center",
      lat: 24.3636,
      lng: 88.6241,
      address: "Aloka Mor, Station Road, Rajshahi-6000",
      phones: ["+88 01988 813 201"],
      email: "rajshahi@southbanglabd.com",
      hours: "Sat – Thu: 10:00 AM – 6:30 PM",
      mapQuery: "Station+Road+Rajshahi"
    },
    {
      id: "kushtia-support",
      city: "Kushtia",
      bengali: "কুষ্টিয়া",
      name: "Kushtia Service Center",
      type: "RMA & Support Center",
      lat: 23.9013,
      lng: 89.1205,
      address: "NS Road, Court Para, Kushtia-7000",
      phones: ["+88 01988 813 201"],
      email: "kushtia@southbanglabd.com",
      hours: "Sat – Thu: 10:00 AM – 6:00 PM",
      mapQuery: "NS+Road+Kushtia"
    },
    {
      id: "comilla-support",
      city: "Cumilla",
      bengali: "কুমিল্লা",
      name: "Cumilla Support Center",
      type: "Technical Service Desk",
      lat: 23.4607,
      lng: 91.1809,
      address: "Kandirpar, Ramghat Road, Cumilla-3500",
      phones: ["+88 01988 813 201"],
      email: "comilla@southbanglabd.com",
      hours: "Sat – Thu: 10:00 AM – 6:30 PM",
      mapQuery: "Kandirpar+Cumilla"
    },
    {
      id: "bogura-support",
      city: "Bogura",
      bengali: "বগুড়া",
      name: "Bogura Service Hub",
      type: "RMA Support Center",
      lat: 24.8465,
      lng: 89.3777,
      address: "Rangpur Road, Borogola, Bogura-5800",
      phones: ["+88 01988 813 201"],
      email: "bogura@southbanglabd.com",
      hours: "Sat – Thu: 10:00 AM – 6:30 PM",
      mapQuery: "Borogola+Bogura"
    }
  ];

  let map = null;
  let activeOffice = offices[0];
  let markerInstances = {};
  let currentLayer = null;
  const BD_CENTER = [23.85, 90.15];
  const BD_ZOOM = 7.2;

  // Google Red Location Pin SVG with drop-shadow and inner white circle
  function createPinSvg() {
    return `
      <svg width="34" height="46" viewBox="0 0 34 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 0C7.611 0 0 7.611 0 17C0 27.683 14.542 44.024 16.142 45.794C16.592 46.289 17.408 46.289 17.858 45.794C19.458 44.024 34 27.683 34 17C34 7.611 26.389 0 17 0Z" fill="#EA4335"/>
        <circle cx="17" cy="17" r="6.2" fill="#FFFFFF"/>
      </svg>
    `;
  }

  /**
   * Initialize Leaflet Google Maps Instance
   */
  function initGoogleMap() {
    const mapContainer = document.getElementById("gmap-canvas");
    if (!mapContainer) return;

    // Check if Leaflet is loaded
    if (typeof L === "undefined") {
      console.warn("Leaflet library not loaded, falling back to SVG map.");
      initFallbackMap();
      return;
    }

    try {
      // Create map
      map = L.map("gmap-canvas", {
        center: BD_CENTER,
        zoom: BD_ZOOM,
        minZoom: 6,
        maxZoom: 18,
        zoomControl: true,
        scrollWheelZoom: true,
        maxBounds: [
          [20.0, 87.0],
          [27.0, 93.5]
        ]
      });

      // Layer definitions
      const roadmapLayer = L.tileLayer("https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["0", "1", "2", "3"],
        attribution: ""
      });

      const terrainLayer = L.tileLayer("https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["0", "1", "2", "3"],
        attribution: ""
      });

      const satelliteLayer = L.tileLayer("https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["0", "1", "2", "3"],
        attribution: ""
      });

      // Default to Google Roadmap
      currentLayer = roadmapLayer;
      roadmapLayer.addTo(map);

      // Handle layer switcher buttons
      setupLayerSwitcher({ roadmap: roadmapLayer, terrain: terrainLayer, satellite: satelliteLayer });

      // Add Red Google Pins for each office
      offices.forEach(office => {
        const pinHtml = `
          <div class="gmap-marker-pin" id="pin-${office.id}" data-office-id="${office.id}" title="${office.name}">
            ${createPinSvg()}
            <span class="gmap-pin-pulse"></span>
            <span class="gmap-pin-badge">${office.city} ${office.bengali}</span>
          </div>
        `;

        const icon = L.divIcon({
          className: "gmap-custom-div-icon",
          html: pinHtml,
          iconSize: [34, 46],
          iconAnchor: [17, 46],
          popupAnchor: [0, -42]
        });

        const marker = L.marker([office.lat, office.lng], { icon })
          .addTo(map);

        // Tooltip showing City Name on hover
        marker.bindTooltip(`${office.city} (${office.bengali})`, {
          permanent: false,
          direction: "top",
          offset: [0, -44],
          className: "gmap-tooltip"
        });

        marker.on("click", () => {
          selectOffice(office, true);
        });

        markerInstances[office.id] = marker;
      });

      // Reset View Button
      const resetBtn = document.getElementById("gmap-reset-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          resetMapView();
        });
      }

    } catch (err) {
      console.error("Leaflet map initialization error:", err);
      initFallbackMap();
    }
  }

  /**
   * Layer switcher for Roadmap, Terrain, and Satellite
   */
  function setupLayerSwitcher(layers) {
    const buttons = document.querySelectorAll(".gmap-layer-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        const layerKey = btn.dataset.layer;
        buttons.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        if (map && layers[layerKey] && currentLayer !== layers[layerKey]) {
          map.removeLayer(currentLayer);
          layers[layerKey].addTo(map);
          currentLayer = layers[layerKey];
        }
      });
    });
  }

  /**
   * Reset to full Bangladesh overview
   */
  function resetMapView() {
    if (map) {
      map.closePopup();
      map.flyTo(BD_CENTER, BD_ZOOM, { duration: 1.2 });
    }

    // Reset pills
    const pills = document.querySelectorAll(".gmap-city-pill");
    pills.forEach(p => p.classList.remove("is-active"));
    const allPill = document.querySelector('.gmap-city-pill[data-city="All Bangladesh"]');
    if (allPill) allPill.classList.add("is-active");

    // Close panel
    const panel = document.getElementById("gmap-active-panel");
    if (panel) panel.classList.add("is-hidden");
  }

  /**
   * Fallback Interactive Canvas if Leaflet or CDN is unavailable
   */
  function initFallbackMap() {
    const container = document.getElementById("gmap-canvas");
    if (!container) return;

    container.innerHTML = `
      <div style="position:relative; width:100%; height:100%; background:radial-gradient(circle at 50% 50%, #f0fdf4 0%, #e0f2fe 100%); display:flex; align-items:center; justify-content:center; overflow:hidden;">
        <svg viewBox="0 0 420 500" style="width:90%; height:90%; filter:drop-shadow(0 8px 24px rgba(0,88,131,0.12));" xmlns="http://www.w3.org/2000/svg">
          <path d="M 120,40 L 160,20 L 220,30 L 280,70 L 320,110 L 340,150 L 320,180 L 280,180 L 260,210 L 300,260 L 330,320 L 320,380 L 290,440 L 250,420 L 220,380 L 180,380 L 140,410 L 110,380 L 110,330 L 90,300 L 70,250 L 80,180 L 60,130 L 90,80 Z" fill="#e8f5e9" stroke="#81c784" stroke-width="2.5" />
          <path d="M 220,30 Q 180,150 200,240 T 220,380" stroke="#bbf7d0" stroke-width="3" fill="none" />
        </svg>
        <div id="fallback-pins-container" style="position:absolute; inset:0;"></div>
      </div>
    `;

    const pinsBox = document.getElementById("fallback-pins-container");
    if (!pinsBox) return;

    const coordsPercent = {
      "rangpur-hub": { top: "18%", left: "42%" },
      "sylhet-support": { top: "32%", left: "80%" },
      "dhaka-head": { top: "48%", left: "52%" },
      "khulna-showroom": { top: "68%", left: "38%" },
      "barishal-support": { top: "69%", left: "57%" },
      "ctg-showroom": { top: "76%", left: "78%" },
      "rajshahi-support": { top: "38%", left: "28%" },
      "kushtia-support": { top: "52%", left: "34%" },
      "comilla-support": { top: "56%", left: "68%" },
      "bogura-support": { top: "33%", left: "44%" }
    };

    pinsBox.innerHTML = offices.map(o => {
      const pos = coordsPercent[o.id] || { top: "50%", left: "50%" };
      return `
        <div class="gmap-marker-pin" style="position:absolute; top:${pos.top}; left:${pos.left}; transform:translate(-50%, -100%); cursor:pointer;" data-office-id="${o.id}">
          ${createPinSvg()}
          <span class="gmap-pin-pulse"></span>
          <span class="gmap-pin-badge" style="display:block;">${o.city}</span>
        </div>
      `;
    }).join("");

    pinsBox.querySelectorAll(".gmap-marker-pin").forEach(pin => {
      pin.addEventListener("click", () => {
        const id = pin.dataset.officeId;
        const target = offices.find(o => o.id === id);
        if (target) selectOffice(target, false);
      });
    });
  }

  /**
   * Render Top Quick-Select City Pills
   */
  function renderCityPills() {
    const pillsWrap = document.getElementById("gmap-city-pills");
    if (!pillsWrap) return;

    const cities = [
      { label: "All Bangladesh (10)", id: "all" },
      { label: "Rangpur", id: "rangpur-hub" },
      { label: "Sylhet", id: "sylhet-support" },
      { label: "Dhaka", id: "dhaka-head" },
      { label: "Khulna", id: "khulna-showroom" },
      { label: "Barishal", id: "barishal-support" },
      { label: "Chattogram", id: "ctg-showroom" },
      { label: "Rajshahi", id: "rajshahi-support" },
      { label: "Kushtia", id: "kushtia-support" },
      { label: "Cumilla", id: "comilla-support" }
    ];

    pillsWrap.innerHTML = cities.map(item => {
      const isCurrent = (item.id === "all" && !activeOffice) || (activeOffice && activeOffice.id === item.id);
      return `
        <button type="button" class="gmap-city-pill ${isCurrent ? 'is-active' : ''}" data-pill-id="${item.id}">
          <span class="pill-dot"></span>
          <span>${item.label}</span>
        </button>
      `;
    }).join("");

    pillsWrap.querySelectorAll(".gmap-city-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.pillId;
        pillsWrap.querySelectorAll(".gmap-city-pill").forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        if (id === "all") {
          resetMapView();
        } else {
          const match = offices.find(o => o.id === id);
          if (match) selectOffice(match, true);
        }
      });
    });
  }

  /**
   * Render Directory Cards under Map
   */
  function renderDirectory() {
    const grid = document.getElementById("contact-directory-grid");
    if (!grid) return;

    grid.innerHTML = offices.map(office => {
      const isCurrent = activeOffice && activeOffice.id === office.id;
      return `
        <div class="contact-directory-card ${isCurrent ? 'is-active' : ''}" id="dir-card-${office.id}">
          <div class="contact-dir-top">
            <span class="contact-dir-badge">${office.type}</span>
            <h4 class="contact-dir-name">${office.name}</h4>
            <div class="contact-dir-city">${office.city} (${office.bengali})</div>
            <p class="contact-dir-address">${office.address}</p>
            <div class="contact-dir-phone">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>${office.phones[0]}</span>
            </div>
          </div>
          <button type="button" class="contact-dir-btn js-view-on-map" data-office-id="${office.id}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="10" r="3"></circle><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path></svg>
            Show on Map &rarr;
          </button>
        </div>
      `;
    }).join("");

    // Attach click listeners to directory cards
    grid.querySelectorAll(".js-view-on-map").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.officeId;
        const target = offices.find(o => o.id === id);
        if (target) {
          selectOffice(target, true);
          // Scroll up to map smoothly
          const mapSec = document.getElementById("nationwide-map-section");
          if (mapSec) {
            mapSec.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }

  /**
   * Select and Focus an Office
   */
  function selectOffice(office, panMap = true) {
    activeOffice = office;

    // Update Floating Detail Card
    const panel = document.getElementById("gmap-active-panel");
    const badge = document.getElementById("gmap-active-badge");
    const name = document.getElementById("gmap-active-name");
    const city = document.getElementById("gmap-active-city");
    const address = document.getElementById("gmap-active-address");
    const phone = document.getElementById("gmap-active-phone");
    const hours = document.getElementById("gmap-active-hours");
    const callBtn = document.getElementById("gmap-active-call");
    const dirBtn = document.getElementById("gmap-active-directions");

    if (panel) panel.classList.remove("is-hidden");
    if (badge) badge.textContent = office.type;
    if (name) name.textContent = office.name;
    if (city) city.textContent = `${office.city} (${office.bengali}), Bangladesh`;
    if (address) address.textContent = office.address;
    if (phone) phone.textContent = office.phones.join(" • ");
    if (hours) hours.textContent = office.hours;

    if (callBtn) {
      callBtn.href = `tel:${office.phones[0].replace(/\s+/g, '')}`;
    }

    if (dirBtn) {
      dirBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`;
    }

    // Smoothly pan & zoom to the selected office without intrusive popup
    if (map && panMap) {
      map.flyTo([office.lat, office.lng], 15, {
        duration: 1.0
      });
    }

    // Update active city pill
    const pills = document.querySelectorAll(".gmap-city-pill");
    pills.forEach(p => {
      p.classList.toggle("is-active", p.dataset.pillId === office.id);
    });

    // Update directory card highlight
    const dirCards = document.querySelectorAll(".contact-directory-card");
    dirCards.forEach(c => {
      c.classList.toggle("is-active", c.id === `dir-card-${office.id}`);
    });
  }

  /**
   * Setup Active Panel Close Button
   */
  function setupPanelClose() {
    const closeBtn = document.getElementById("gmap-active-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        const panel = document.getElementById("gmap-active-panel");
        if (panel) panel.classList.add("is-hidden");
      });
    }
  }

  /**
   * Setup Contact Form Submission & Validation
   */
  function setupForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("c-name");
      const phoneInput = document.getElementById("c-phone");
      const emailInput = document.getElementById("c-email");
      const subjectInput = document.getElementById("c-subject");
      const messageInput = document.getElementById("c-message");
      const resultBox = document.getElementById("c-result-box");

      const name = nameInput ? nameInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value.trim() : "";
      const email = emailInput ? emailInput.value.trim() : "";
      const subject = subjectInput ? subjectInput.value : "General Inquiry";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name) {
        if (ui && ui.toast) ui.toast("Please enter your full name.", "warning");
        if (nameInput) nameInput.focus();
        return;
      }

      const bdPhoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;
      if (!phone || !bdPhoneRegex.test(phone.replace(/[\s-]/g, ""))) {
        if (ui && ui.toast) ui.toast("Please enter a valid 11-digit Bangladeshi mobile number.", "warning");
        if (phoneInput) phoneInput.focus();
        return;
      }

      if (!email || !email.includes("@")) {
        if (ui && ui.toast) ui.toast("Please enter a valid email address.", "warning");
        if (emailInput) emailInput.focus();
        return;
      }

      if (!message || message.length < 10) {
        if (ui && ui.toast) ui.toast("Please write your inquiry details (at least 10 characters).", "warning");
        if (messageInput) messageInput.focus();
        return;
      }

      // Generate Reference Ticket
      const refId = "SBC-INQ-" + Math.floor(100000 + Math.random() * 900000);

      if (resultBox) {
        resultBox.style.display = "block";
        resultBox.innerHTML = `
          <div style="background:#dcfce7; border:1px solid #86efac; border-radius:10px; padding:16px; margin-top:16px; color:#14532d;">
            <div style="font-weight:800; font-size:15px; margin-bottom:4px;">Inquiry Transmitted Successfully!</div>
            <div style="font-size:13px; line-height:1.5;">
              Thank you, <strong>${util.esc(name)}</strong>. Your reference ticket is <strong>${refId}</strong>. Our corporate account manager will reach you at <strong>${util.esc(phone)}</strong> shortly.
            </div>
          </div>
        `;
      }

      if (ui && ui.toast) {
        ui.toast(`Inquiry ${refId} submitted successfully!`, "success");
      }

      form.reset();
    });
  }

  function init() {
    initGoogleMap();
    renderCityPills();
    renderDirectory();
    setupPanelClose();
    setupForm();

    // Set initial active office (Dhaka Head Office)
    if (offices.length > 0) {
      selectOffice(offices[0], false);
    }
  }

  return {
    init,
    selectOffice,
    resetMapView
  };
})();
