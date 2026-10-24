/**
 * Network Solution Configurator Rule Engine
 * Blueprint §7 P11, §12.6
 * Maps project profile + device counts + requirements to verified SKUs.
 */
window.SBC_DATA = window.SBC_DATA || {};
window.SBC_DATA.configuratorRules = {
  projectTypes: [
    { id: "home", label: "Home / Residential", defaultDevices: 10, defaultArea: "1,500 sq ft" },
    { id: "office", label: "Small / Medium Office", defaultDevices: 30, defaultArea: "3,500 sq ft" },
    { id: "enterprise", label: "Enterprise Corporate", defaultDevices: 120, defaultArea: "10,000 sq ft" },
    { id: "hotel", label: "Hotel / Hospitality", defaultDevices: 80, defaultArea: "15,000 sq ft" },
    { id: "isp", label: "ISP / FTTH Substation", defaultDevices: 250, defaultArea: "Coverage Zone" },
    { id: "cctv", label: "CCTV Surveillance Project", defaultDevices: 16, defaultArea: "Campus" }
  ],

  getRecommendations: function(params) {
    const type = params.projectType || "office";
    const devices = parseInt(params.deviceCount, 10) || 25;
    const poeNeeded = !!params.needPoE;
    const outdoorNeeded = !!params.needOutdoor;
    const upsNeeded = !!params.needUPS;
    const cctvNeeded = !!params.needCCTV;

    const items = [];

    // 1. Router Selection
    if (type === "home") {
      items.push({ id: "tenda-be12-pro", qty: 1, role: "Primary Wi-Fi 7 Core Gateway" });
    } else if (type === "office") {
      items.push({ id: "tenda-tx2l-pro", qty: 1, role: "Gigabit Dual-Band Gateway" });
    } else if (type === "isp" || type === "enterprise") {
      items.push({ id: "cisco-c8200", qty: 1, role: "Enterprise Aggregation Router" });
    } else {
      items.push({ id: "tenda-be12-pro", qty: 1, role: "High-Throughput Gateway" });
    }

    // 2. Switching Infrastructure
    if (type === "home") {
      items.push({ id: "tenda-sg108", qty: 1, role: "8-Port Gigabit Distribution Switch" });
    } else if (poeNeeded || cctvNeeded) {
      if (devices > 50) {
        items.push({ id: "ipcom-g1128p", qty: Math.ceil(devices / 20), role: "24-Port 250W Gigabit PoE Switch" });
      } else {
        items.push({ id: "tenda-teg2210p", qty: Math.ceil(devices / 8), role: "8-Port Cloud Managed PoE Switch" });
      }
    } else {
      if (devices > 40) {
        items.push({ id: "tenda-teg1024d", qty: Math.ceil(devices / 24), role: "24-Port Gigabit Rackmount Switch" });
      } else {
        items.push({ id: "tenda-teg2210p", qty: 1, role: "Managed Distribution Switch" });
      }
    }

    // 3. Wireless Coverage & APs
    if (type === "hotel" || type === "office" || type === "enterprise") {
      const apCount = Math.max(2, Math.ceil(devices / 15));
      items.push({ id: "tenda-w15", qty: apCount, role: "AX3000 In-Wall / Ceiling Access Points" });
    } else if (type === "home" && devices > 15) {
      items.push({ id: "tenda-mx3-2pack", qty: 1, role: "Whole-Home Mesh Satellite Nodes" });
    }

    // 4. Outdoor Wireless PtP / CPE
    if (outdoorNeeded) {
      items.push({ id: "tenda-o9", qty: 2, role: "5GHz 23dBi Outdoor Wireless Backhaul (Pair)" });
      items.push({ id: "tenda-oap1200", qty: 1, role: "Outdoor High-Gain Wi-Fi Access Point" });
    }

    // 5. Optical FTTH / PON for ISPs
    if (type === "isp") {
      items.push({ id: "hsgq-g04r", qty: 1, role: "4-Port Integrated GPON OLT" });
      items.push({ id: "hsgq-x200dw", qty: Math.min(devices, 30), role: "1200M XPON Subscriber ONUs" });
      items.push({ id: "solitine-10g-sr", qty: 2, role: "10G SFP+ Optical Uplink Transceivers" });
    }

    // 6. CCTV Surveillance Package
    if (cctvNeeded || type === "cctv") {
      const camCount = type === "cctv" ? devices : 8;
      items.push({ id: "tenda-tn3108-8p", qty: Math.ceil(camCount / 8), role: "8-Channel PoE UHD Network Video Recorder" });
      items.push({ id: "tenda-tc3b24c", qty: Math.ceil(camCount * 0.75), role: "4MP Full-Color Fixed Bullet IP Cameras" });
      items.push({ id: "tenda-ch7-wca", qty: Math.max(1, Math.floor(camCount * 0.25)), role: "4MP Outdoor Pan/Tilt Security Cameras" });
    }

    // 7. Power Protection & UPS
    if (upsNeeded || type === "isp" || type === "enterprise") {
      if (type === "isp" || type === "enterprise") {
        items.push({ id: "must-eh55-h1ksl", qty: 1, role: "1kVA True Online Double-Conversion UPS" });
        items.push({ id: "must-lp16-48100", qty: 1, role: "48V 100Ah LiFePO4 Lithium Battery Bank" });
      } else {
        items.push({ id: "must-ew2110-800", qty: 1, role: "800VA Line Interactive Power Backup" });
      }
    }

    // 8. Structured Cabling & Enclosure
    if (type !== "home") {
      items.push({ id: "solitine-rack-9u", qty: 1, role: "9U Wall Mount Server Rack" });
      items.push({ id: "solitine-patch-24", qty: 1, role: "24-Port Cat6 Fully Loaded Patch Panel" });
      items.push({ id: "solitine-sol6156-or", qty: Math.ceil(devices / 20), role: "Cat6 Solid Copper 305m LAN Cable Box" });
    }

    return items;
  }
};
