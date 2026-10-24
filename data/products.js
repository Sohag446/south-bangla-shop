/**
 * South Bangla Computers Seed Product Catalogue (53 SKUs)
 * Blueprint Ã‚Â§12.3, Ã‚Â§12.4, Ã‚Â§12.5
 * Names, models, brands, and categories verified from live southbanglabd.com listing.
 */
window.SBC_DATA = window.SBC_DATA || {};
window.SBC_DATA.products = [
  /* --------------------------------------------------------------------------
     1. ROUTERS & WI-FI
     -------------------------------------------------------------------------- */
  {
    id: "tenda-ax12-pro",
    sku: "SBC-TND-AX12P",
    brand: "tenda",
    model: "AX12 Pro",
    name: "Tenda AX12 Pro AX3000 Dual-Band Gigabit Wi-Fi 6 Router",
    category: "routers-wifi",
    subcategory: "Wi-Fi 6",
    tags: ["wifi 6", "ax3000", "mesh", "gigabit", "tenda"],
    attrs: { wifiStandard: "Wi-Fi 6", speedClass: "AX3000", lanPorts: 3, wanPorts: 1, poe: false },
    summary: "High-performance dual-band Wi-Fi 6 router delivering up to 2976 Mbps aggregated speed with high-gain antennas and EasyMesh support.",
    features: [
      "Next-Gen Wi-Fi 6 speeds up to 2402 Mbps on 5 GHz and 574 Mbps on 2.4 GHz",
      "4Ãƒâ€” 6 dBi external antennas with independent signal enhancement modules",
      "Full Gigabit ports: 1Ãƒâ€” WAN + 3Ãƒâ€” LAN for ultra-fast wired connectivity",
      "EasyMesh networking support for seamless multi-room coverage"
    ],
    specs: [
      {
        group: "Hardware",
        rows: [
          ["CPU", "Dual-Core 1.2 GHz High-Performance Processor"],
          ["RAM", "256 MB DDR3"],
          ["Interfaces", "1Ãƒâ€” 10/100/1000 Mbps WAN, 3Ãƒâ€” 10/100/1000 Mbps LAN"],
          ["Antenna", "4Ãƒâ€” External 6 dBi High-Gain Antennas"],
          ["Buttons", "1Ãƒâ€” WPS / Reset Button"],
          ["Power Input", "AC 100Ã¢â‚¬â€œ240V ~ 50/60Hz, DC 12V 1A Output"],
          ["Dimensions", "226 Ãƒâ€” 144 Ãƒâ€” 168 mm"]
        ]
      },
      {
        group: "Wireless",
        rows: [
          ["Wireless Standards", "IEEE 802.11ax/ac/n/a 5 GHz, IEEE 802.11ax/n/b/g 2.4 GHz"],
          ["Data Rate", "5 GHz: Up to 2402 Mbps (HE160), 2.4 GHz: Up to 574 Mbps"],
          ["Operating Frequency", "2.4 GHz & 5 GHz Concurrent"],
          ["Special Features", "MU-MIMO, Beamforming, OFDMA, 160 MHz Bandwidth, EasyMesh"],
          ["Wireless Security", "WPA3-SAE / WPA2-PSK, WPS Quick Encryption"]
        ]
      },
      {
        group: "Software",
        rows: [
          ["Internet Connection", "PPPoE, Dynamic IP, Static IP, Bridge Mode"],
          ["Operating Modes", "Wireless Router Mode, Universal Repeater Mode, AP Mode"],
          ["DHCP", "DHCP Server, DHCP Client List, DHCP Reservation"],
          ["Security", "Parental Controls, Client Filter, Remote Web Management"]
        ]
      },
      {
        group: "Others",
        rows: [
          ["Package Contents", "AX12 Pro Router, Power Adapter, RJ45 Gigabit Cable, Quick Install Guide"],
          ["Certifications", "CE, FCC, RoHS"]
        ]
      }
    ],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [
      { type: "datasheet", label: "Tenda_AX12_Pro_Datasheet.pdf", size: "2.8 MB", url: "#", demo: true }
    ],
    warranty: "1 Year Official Warranty",
    status: "discontinued", // Reference item for discontinued state (Ã‚Â§12.4, Ã‚Â§P05)
    stock: 0,
    isNew: false, // Suppressed when discontinued per Blueprint rule P3
    price: { retail: 4850, compareAt: 5000, dealer: 4250, moq: 5, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["tenda-tx2l-pro", "tenda-be12-pro"]
  },

  {
    id: "tenda-be12-pro",
    sku: "SBC-TND-BE12P",
    brand: "tenda",
    model: "BE12 Pro",
    name: "Tenda BE12 Pro BE7200 Dual Band Gigabit Wi-Fi 7 Router",
    category: "routers-wifi",
    subcategory: "Wi-Fi 7",
    tags: ["wifi 7", "be7200", "multi-link", "gigabit", "tenda"],
    attrs: { wifiStandard: "Wi-Fi 7", speedClass: "BE7200", lanPorts: 4, wanPorts: 1, poe: false },
    summary: "Flagship Wi-Fi 7 router boasting BE7200 speeds, Multi-Link Operation (MLO), 4096-QAM modulation, and 2.5G WAN for maximum bandwidth throughput.",
    features: [
      "Next-generation Wi-Fi 7 with ultra-low latency MLO technology",
      "Aggregated speeds up to 7200 Mbps for 8K streaming and cloud gaming",
      "1Ãƒâ€” 2.5G WAN/LAN port plus 4Ãƒâ€” Gigabit ports",
      "6Ãƒâ€” High-gain beamforming antennas with wide-range signal amplifiers"
    ],
    specs: [
      {
        group: "Hardware",
        rows: [
          ["CPU", "Broadcom Quad-Core 2.0 GHz Processor"],
          ["RAM", "1 GB DDR4"],
          ["Interfaces", "1Ãƒâ€” 2.5G Port + 4Ãƒâ€” Gigabit Ethernet Ports"],
          ["Antennas", "6Ãƒâ€” External High-Performance Antennas"]
        ]
      },
      {
        group: "Wireless",
        rows: [
          ["Standards", "IEEE 802.11be/ax/ac/n/a/b/g"],
          ["Frequency", "2.4 GHz & 5 GHz with 160/240 MHz channel support"],
          ["Modulation", "4096-QAM for 20% higher transmission density"]
        ]
      }
    ],
    images: ["assets/img/slider/tenda-be12-pro-wifi7.png"],
    documents: [{ type: "datasheet", label: "Tenda_BE12_Pro_Specs.pdf", size: "3.4 MB", url: "#", demo: true }],
    warranty: "2 Years Official Warranty",
    status: "in-stock",
    stock: 24,
    isNew: true,
    price: { retail: 9999, compareAt: 16500, dealer: 8800, moq: 3, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: ["tenda-tx2l-pro", "tenda-ac10"]
  },

  {
    id: "tenda-tx2l-pro",
    sku: "SBC-TND-TX2LP",
    brand: "tenda",
    model: "TX2L Pro",
    name: "Tenda TX2L Pro AX1500 Dual-Band Gigabit Wi-Fi 6 Router",
    category: "routers-wifi",
    subcategory: "Wi-Fi 6",
    tags: ["wifi 6", "ax1500", "gigabit", "tenda"],
    attrs: { wifiStandard: "Wi-Fi 6", speedClass: "AX1500", lanPorts: 3, wanPorts: 1, poe: false },
    summary: "Affordable dual-band Wi-Fi 6 router providing up to 1500 Mbps aggregated speed with robust coverage for modern smart homes.",
    features: [
      "Wi-Fi 6 speeds up to 1201 Mbps (5 GHz) + 300 Mbps (2.4 GHz)",
      "5Ãƒâ€” 6 dBi external antennas for penetrating walls",
      "Gigabit Ethernet ports for high-speed fiber broadband connections"
    ],
    specs: [
      { group: "Hardware", rows: [["CPU", "High-Speed Dual Core 1 GHz"], ["Ports", "1Ãƒâ€” GE WAN, 3Ãƒâ€” GE LAN"], ["Antennas", "5Ãƒâ€” 6dBi"]] }
    ],
    images: ["assets/img/products/tenda-tx2l-pro.jpg"],
    documents: [{ type: "datasheet", label: "TX2L_Pro_Brochure.pdf", size: "1.8 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 45,
    isNew: true,
    price: { retail: 2900, compareAt: 3800, dealer: 2550, moq: 10, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: ["tenda-be12-pro", "tenda-ac10"]
  },

  {
    id: "tenda-ac10",
    sku: "SBC-TND-AC10",
    brand: "tenda",
    model: "AC10",
    name: "Tenda AC10 AC1200 1200Mbps Dual Band 4 Antenna Gigabit WiFi Router",
    category: "routers-wifi",
    subcategory: "Wi-Fi 5",
    tags: ["wifi 5", "ac1200", "gigabit", "tenda"],
    attrs: { wifiStandard: "Wi-Fi 5", speedClass: "AC1200", lanPorts: 3, wanPorts: 1, poe: false },
    summary: "Dependable 1200 Mbps dual-band gigabit router powered by 1 GHz CPU with 4 external 5dBi antennas for stable multi-user home internet.",
    features: [
      "AC1200 dual-band 802.11ac wave2 technology",
      "Strong signal through 4Ãƒâ€” 5 dBi omnidirectional antennas",
      "Beamforming+ and MU-MIMO support"
    ],
    specs: [{ group: "Hardware", rows: [["Ports", "1Ãƒâ€” GE WAN, 3Ãƒâ€” GE LAN"], ["CPU", "1 GHz 28nm Processor"]] }],
    images: ["assets/img/products/tenda-ac10.jpg"],
    documents: [{ type: "datasheet", label: "Tenda_AC10_Datasheet.pdf", size: "2.1 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 60,
    isNew: false,
    price: { retail: 2750, compareAt: 2900, dealer: 2400, moq: 10, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: false },
    alternatives: ["tenda-tx2l-pro"]
  },

  {
    id: "tenda-mx3-2pack",
    sku: "SBC-TND-MX3-2P",
    brand: "tenda",
    model: "MX3 2-Pack",
    name: "Tenda Nova MX3 AX1500 Wi-Fi 6 Whole Home Mesh System (2-Pack)",
    category: "routers-wifi",
    subcategory: "Mesh Systems",
    tags: ["mesh", "wifi 6", "nova", "ax1500", "tenda"],
    attrs: { wifiStandard: "Wi-Fi 6", speedClass: "AX1500", coverage: "3,500 sq ft", units: 2 },
    summary: "Whole-home Wi-Fi 6 mesh kit providing seamless roaming across apartments and duplex residences up to 3,500 square feet.",
    features: [
      "Unified single network SSID with seamless 802.11k/v roaming",
      "Covers up to 3,500 sq ft with two node units",
      "Easy mobile app setup and parental controls"
    ],
    specs: [{ group: "Hardware", rows: [["Ports per node", "2Ãƒâ€” Gigabit RJ45"], ["Coverage", "Up to 3,500 sq ft"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [{ type: "datasheet", label: "Nova_MX3_Manual.pdf", size: "3.1 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 18,
    isNew: true,
    price: { retail: 7500, compareAt: 8200, dealer: 6600, moq: 4, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["tenda-mx12-3pack"]
  },

  {
    id: "tenda-mx12-3pack",
    sku: "SBC-TND-MX12-3P",
    brand: "tenda",
    model: "MX12 3-Pack",
    name: "Tenda Nova MX12 AX3000 Wi-Fi 6 Whole Home Mesh System (3-Pack)",
    category: "routers-wifi",
    subcategory: "Mesh Systems",
    tags: ["mesh", "wifi 6", "ax3000", "nova", "tenda"],
    attrs: { wifiStandard: "Wi-Fi 6", speedClass: "AX3000", coverage: "7,000 sq ft", units: 3 },
    summary: "Tri-pack AX3000 Wi-Fi 6 mesh system engineered for multi-story villas and large commercial offices up to 7,000 square feet.",
    features: [
      "Tri-unit mesh coverage eliminating Wi-Fi dead zones across large villas",
      "AX3000 dual-band high-density capacity connecting 100+ devices",
      "Full gigabit backhaul support"
    ],
    specs: [{ group: "Hardware", rows: [["Units", "3 Nodes"], ["Ports", "3Ãƒâ€” Gigabit per node"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [{ type: "datasheet", label: "MX12_Brochure.pdf", size: "2.4 MB", url: "#", demo: true }],
    warranty: "2 Years Official Warranty",
    status: "in-stock",
    stock: 12,
    isNew: true,
    price: { retail: 18500, compareAt: 20000, dealer: 16280, moq: 2, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["tenda-mx3-2pack"]
  },

  {
    id: "tenda-a18",
    sku: "SBC-TND-A18",
    brand: "tenda",
    model: "A18 V4.0",
    name: "Tenda A18 V4.0 AC1200 Dual-Band Wi-Fi Range Extender",
    category: "routers-wifi",
    subcategory: "Range Extenders",
    tags: ["extender", "repeater", "ac1200", "tenda"],
    attrs: { wifiStandard: "Wi-Fi 5", speedClass: "AC1200", lanPorts: 1 },
    summary: "Wall-plug AC1200 dual-band range extender with smart signal LED indicator to eliminate Wi-Fi blind spots instantly.",
    features: ["Plug-and-play setup with WPS button", "Smart signal LED to locate optimal socket placement", "1Ãƒâ€” 10/100M Ethernet port"],
    specs: [{ group: "Hardware", rows: [["Antenna", "2Ãƒâ€” External 2dBi"], ["Speed", "300 + 867 Mbps"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 35,
    isNew: false,
    price: { retail: 2250, compareAt: 2500, dealer: 1950, moq: 10, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["tenda-u2"]
  },

  {
    id: "tenda-u2",
    sku: "SBC-TND-U2",
    brand: "tenda",
    model: "U2",
    name: "Tenda U2 AX300 Wi-Fi 6 High Gain Wireless USB Adapter",
    category: "routers-wifi",
    subcategory: "USB Adapters",
    tags: ["usb adapter", "wifi 6", "tenda"],
    attrs: { wifiStandard: "Wi-Fi 6", interface: "USB 2.0" },
    summary: "Driver-free high-gain 6 dBi antenna wireless USB adapter bringing instant Wi-Fi 6 connectivity to desktop PCs and laptops.",
    features: ["6 dBi ultra-long high-gain rotatable antenna", "Plug and play on Windows 10/11", "Soft AP mode support"],
    specs: [{ group: "Hardware", rows: [["Interface", "USB 2.0"], ["Antenna", "6 dBi External"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 80,
    isNew: true,
    price: { retail: 980, compareAt: 1150, dealer: 820, moq: 20, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["tenda-a18"]
  },

  {
    id: "cisco-c8200",
    sku: "SBC-CSC-C8200",
    brand: "cisco",
    model: "C8200-1N-4T",
    name: "Cisco Catalyst C8200-1N-4T Enterprise Edge Router",
    category: "routers-wifi",
    subcategory: "Enterprise Gateway",
    tags: ["cisco", "catalyst", "enterprise", "edge router", "sd-wan"],
    attrs: { wanPorts: 4, sdwan: true, enterprise: true },
    summary: "Enterprise cloud-edge platform with built-in SD-WAN capabilities, hardware security acceleration, and 1Gbps IPsec throughput.",
    features: [
      "1 NIM slot for WAN/voice modules plus 4Ãƒâ€” 1G integrated WAN ports",
      "Advanced hardware-based crypto acceleration with Trustworthy Solutions",
      "Native integration with Cisco SD-WAN and Catalyst Cloud Manager"
    ],
    specs: [{ group: "Enterprise", rows: [["Throughput", "Up to 1 Gbps IPsec"], ["Memory", "8 GB Default DDR4"]] }],
    images: ["assets/img/products/cisco-c1000-24t.webp"],
    documents: [{ type: "datasheet", label: "Cisco_C8200_Datasheet.pdf", size: "4.8 MB", url: "#", demo: true }],
    warranty: "1 Year Official Cisco Warranty",
    status: "in-stock",
    stock: 4,
    isNew: false,
    price: { retail: 145000, compareAt: null, dealer: 128000, moq: 1, pack: 1, quoteOnly: true, demo: true }, // Quote only Ã‚Â§12.5
    flags: { bestSeller: false, recommended: false },
    alternatives: []
  },

  /* --------------------------------------------------------------------------
     2. SWITCHES & POE
     -------------------------------------------------------------------------- */
  {
    id: "tenda-teg2210p",
    sku: "SBC-TND-TEG2210P",
    brand: "tenda",
    model: "TEG2210P-8-120W",
    name: "Tenda TEG2210P-8-120W 8-Port Gigabit Cloud Managed PoE Switch",
    category: "switches",
    subcategory: "PoE Switches",
    tags: ["poe", "gigabit", "cloud switch", "tenda"],
    attrs: { ports: 8, poe: true, poeBudget: "120W", managed: "Cloud Managed", speed: "1G" },
    summary: "Smart cloud-managed 8-port gigabit switch with 120W total PoE budget and 2 SFP uplink slots for surveillance and VoIP systems.",
    features: [
      "8Ãƒâ€” Gigabit PoE+ ports compliant with IEEE 802.3af/at",
      "2Ãƒâ€” Gigabit SFP fiber uplink slots",
      "Tenda Cloud and Web GUI remote management with QVLAN support",
      "6 kV lightning protection on all ports"
    ],
    specs: [
      { group: "Ports", rows: [["PoE Ports", "8Ãƒâ€” GE RJ45"], ["SFP Uplinks", "2Ãƒâ€” GE SFP"], ["PoE Budget", "120W (up to 30W/port)"]] },
      { group: "Performance", rows: [["Switching Capacity", "20 Gbps"], ["Packet Forwarding", "14.9 Mpps"]] }
    ],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [{ type: "datasheet", label: "TEG2210P_Datasheet.pdf", size: "2.3 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 22,
    isNew: false,
    price: { retail: 9800, compareAt: 10500, dealer: 8600, moq: 3, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: ["ipcom-g1128p", "tenda-teg2226f"]
  },

  {
    id: "tenda-teg2226f",
    sku: "SBC-TND-TEG2226F",
    brand: "tenda",
    model: "TEG2226F",
    name: "Tenda TEG2226F 24-Port Gigabit Cloud Managed Ethernet Switch with 2 SFP",
    category: "switches",
    subcategory: "Smart/Cloud Managed",
    tags: ["gigabit", "24 port", "cloud managed", "sfp", "tenda"],
    attrs: { ports: 24, poe: false, managed: "Cloud Managed", speed: "1G" },
    summary: "Enterprise 24-port gigabit cloud-managed switch featuring 2 SFP slots, VLAN segregation, and loop prevention.",
    features: ["24Ãƒâ€” 10/100/1000M RJ45 ports + 2Ãƒâ€” 1G SFP slots", "Centralized cloud management via Tenda App", "Rackmount metal casing"],
    specs: [{ group: "Hardware", rows: [["Ports", "24 GE + 2 SFP"], ["Capacity", "52 Gbps"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [{ type: "datasheet", label: "TEG2226F_Datasheet.pdf", size: "1.9 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 15,
    isNew: false,
    price: { retail: 14500, compareAt: null, dealer: 12760, moq: 2, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["tenda-teg1024d", "hsgq-5912"]
  },

  {
    id: "tenda-teg1024d",
    sku: "SBC-TND-TEG1024D",
    brand: "tenda",
    model: "TEG1024D",
    name: "Tenda TEG1024D v9.0 24-Port Gigabit Ethernet Switch",
    category: "switches",
    subcategory: "Unmanaged",
    tags: ["unmanaged", "24 port", "gigabit", "rackmount", "tenda"],
    attrs: { ports: 24, poe: false, managed: "Unmanaged", speed: "1G" },
    summary: "Plug-and-play unmanaged 24-port gigabit switch in a 13-inch steel shell, ideal for CCTV monitoring networks and small office racks.",
    features: ["24Ãƒâ€” auto-negotiation Gigabit ports", "Three operational modes: Standard, Flow Control, and VLAN", "Internal power supply"],
    specs: [{ group: "Hardware", rows: [["Switching Capacity", "48 Gbps"], ["Enclosure", "13-inch Metal with 19-inch brackets"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [{ type: "datasheet", label: "TEG1024D_Specs.pdf", size: "1.7 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 30,
    isNew: false,
    price: { retail: 8200, compareAt: 8900, dealer: 7200, moq: 5, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: false },
    alternatives: ["tenda-teg2226f"]
  },

  {
    id: "tenda-sg108",
    sku: "SBC-TND-SG108",
    brand: "tenda",
    model: "SG108",
    name: "Tenda SG108 8-Port Gigabit Desktop Switch",
    category: "switches",
    subcategory: "Unmanaged",
    tags: ["desktop switch", "8 port", "gigabit", "tenda"],
    attrs: { ports: 8, poe: false, managed: "Unmanaged", speed: "1G" },
    summary: "Compact 8-port gigabit desktop switch in a durable steel housing, perfect for study rooms, offices, and surveillance hubs.",
    features: ["8Ãƒâ€” 10/100/1000M ports with auto MDI/MDIX", "Durable metal housing with wall-mount slots", "Energy-efficient design"],
    specs: [{ group: "Hardware", rows: [["Enclosure", "Steel Casing"], ["Ports", "8Ãƒâ€” GE"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 90,
    isNew: false,
    price: { retail: 1900, compareAt: 2590, dealer: 1650, moq: 20, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: false },
    alternatives: ["tenda-teg2210p"]
  },

  {
    id: "ipcom-g1128p",
    sku: "SBC-IPC-G1128P",
    brand: "ip-com",
    model: "G1128P-24-250W",
    name: "IP-COM G1128P-24-250W 24-Port Gigabit PoE Switch with 2 SFP Uplink 230W",
    category: "switches",
    subcategory: "PoE Switches",
    tags: ["ip-com", "poe", "24 port", "250w", "sfp"],
    attrs: { ports: 24, poe: true, poeBudget: "230W", managed: "Unmanaged / Extended", speed: "1G" },
    summary: "Heavy-duty 24-port PoE switch delivering up to 230W power output with 2 SFP and 2 GE uplinks, engineered for high-density IP surveillance.",
    features: [
      "24Ãƒâ€” Gigabit PoE ports + 2Ãƒâ€” Gigabit RJ45 + 2Ãƒâ€” Gigabit SFP uplinks",
      "One-key extension mode supporting up to 250m long-distance CCTV runs",
      "Integrated 6 kV surge protection"
    ],
    specs: [{ group: "Power", rows: [["PoE Budget", "230W"], ["Ports", "24 GE PoE + 2 GE + 2 SFP"]] }],
    images: ["assets/img/products/tenda-teg2210p.jpg"],
    documents: [{ type: "datasheet", label: "IPCOM_G1128P_Datasheet.pdf", size: "2.5 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 14,
    isNew: false,
    price: { retail: 13000, compareAt: 16000, dealer: 11500, moq: 2, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["tenda-teg2210p", "hsgq-sg2024p"]
  },

  {
    id: "solitine-sol3012x",
    sku: "SBC-SLT-3012X",
    brand: "solitine",
    model: "SOL-3012X",
    name: "Solitine SOL-3012X 12-Port 10G SFP+ Managed Switch",
    category: "switches",
    subcategory: "2.5G/10G",
    tags: ["solitine", "10g", "sfp+", "managed switch"],
    attrs: { ports: 12, poe: false, managed: "Managed L3", speed: "10G" },
    summary: "Full 10-Gigabit core fiber switch equipped with 12Ãƒâ€” 10G SFP+ optical slots for ISP distribution rings and data center backbones.",
    features: ["12Ãƒâ€” 10G SFP+ optical ports", "Layer 3 dynamic routing (OSPF, RIP, BGP support)", "Dual redundant power supplies"],
    specs: [{ group: "Performance", rows: [["Throughput", "240 Gbps Switching Fabric"], ["Port Speed", "1G / 10G SFP+"]] }],
    images: ["assets/img/products/solitine-panel-24p.jpg"],
    documents: [{ type: "datasheet", label: "SOL3012X_Datasheet.pdf", size: "3.0 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "low-stock", // low-stock requirement (Ã‚Â§12.5)
    stock: 3,
    isNew: true,
    price: { retail: 42000, compareAt: null, dealer: 36960, moq: 1, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["hsgq-5912"]
  },

  {
    id: "cisco-c9200l-24p",
    sku: "SBC-CSC-9200L24P",
    brand: "cisco",
    model: "C9200L-24P-4X-E",
    name: "Cisco C9200L-24P-4X-E Catalyst 9200 Series Switch",
    category: "switches",
    subcategory: "Managed L3",
    tags: ["cisco", "catalyst", "c9200l", "poe+", "10g uplink"],
    attrs: { ports: 24, poe: true, poeBudget: "370W", managed: "Managed L3", speed: "1G + 10G Uplink" },
    summary: "Enterprise-grade Catalyst 9200L switch with 24 PoE+ ports, 4Ãƒâ€” 10G SFP+ uplinks, and Network Essentials enterprise software.",
    features: [
      "24Ãƒâ€” Full PoE+ 10/100/1000 ports with 370W power budget",
      "4Ãƒâ€” 10G SFP+ fixed uplinks",
      "Full Layer 3 routing capabilities with Cisco DNA Center readiness"
    ],
    specs: [{ group: "Enterprise", rows: [["Uplinks", "4Ãƒâ€” 10G SFP+"], ["Stacking", "Up to 80 Gbps StackWise-80"]] }],
    images: ["assets/img/products/cisco-c1000-24t.webp"],
    documents: [{ type: "datasheet", label: "Catalyst_9200L_Datasheet.pdf", size: "5.1 MB", url: "#", demo: true }],
    warranty: "1 Year Official Cisco Warranty",
    status: "in-stock",
    stock: 5,
    isNew: false,
    price: { retail: 245000, compareAt: 265000, dealer: 215000, moq: 1, pack: 1, quoteOnly: true, demo: true }, // Quote only Ã‚Â§12.5
    flags: { bestSeller: false, recommended: false },
    alternatives: []
  },

  {
    id: "hsgq-5912",
    sku: "SBC-HSG-5912",
    brand: "hsgq",
    model: "HSGQ-5912",
    name: "HSGQ 12*Port L3 Managed Switch",
    category: "switches",
    subcategory: "Managed L3",
    tags: ["hsgq", "l3 managed", "isp switch"],
    attrs: { ports: 12, poe: false, managed: "Managed L3", speed: "10G/1G" },
    summary: "Carrier-class Layer 3 aggregation switch with Gigabit combo ports and 10G optical uplinks designed for ISP aggregation.",
    features: ["12Ãƒâ€” high-capacity optical ports", "Comprehensive L3 routing and ACL security", "Console and Web SNMP management"],
    specs: [{ group: "Hardware", rows: [["Type", "Rackmount Layer 3"], ["Management", "CLI/Web/SNMP"]] }],
    images: ["assets/img/products/vsol-v2801sg.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 8,
    isNew: false,
    price: { retail: 32000, compareAt: 35000, dealer: 28000, moq: 1, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["solitine-sol3012x"]
  },

  {
    id: "hsgq-sg2024p",
    sku: "SBC-HSG-SG2024P",
    brand: "hsgq",
    model: "HSGQ-SG2024P",
    name: "HSGQ 24*Port Black PoE Switch for IP Camera",
    category: "switches",
    subcategory: "PoE Switches",
    tags: ["hsgq", "poe", "cctv", "24 port"],
    attrs: { ports: 24, poe: true, poeBudget: "300W", managed: "Smart Managed", speed: "1G" },
    summary: "Dedicated 24-port IP surveillance PoE switch with 300W total budget, watchdog reboot, and 2 gigabit combo uplink ports.",
    features: ["24Ãƒâ€” PoE AF/AT ports for cameras", "AI watchdog auto-restarts frozen cameras", "300W high-power supply"],
    specs: [{ group: "Power", rows: [["PoE Budget", "300W"], ["Surge Protection", "6 kV"]] }],
    images: ["assets/img/products/vsol-v2801sg.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 16,
    isNew: false,
    price: { retail: 38200, compareAt: 42000, dealer: 33500, moq: 2, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["ipcom-g1128p"]
  },

  /* --------------------------------------------------------------------------
     3. FIBER, PON & ONU
     -------------------------------------------------------------------------- */
  {
    id: "hsgq-g04r",
    sku: "SBC-HSG-G04R",
    brand: "hsgq",
    model: "HSGQ-G04R",
    name: "HSGQ 4*Port Integrated Gpon Black FTTB OLT",
    category: "fiber-pon",
    subcategory: "OLT",
    tags: ["hsgq", "olt", "gpon", "4 port", "ftth"],
    attrs: { ponPorts: 4, type: "GPON OLT", splitRatio: "1:128" },
    summary: "1U rackmount 4-port GPON OLT supporting up to 512 subscriber ONUs with 10G SFP+ uplink ports and EMS centralized management.",
    features: [
      "4Ãƒâ€” GPON optical ports supporting 1:128 split ratio",
      "2Ãƒâ€” 10GE SFP+ and 4Ãƒâ€” GE optical/electrical uplinks",
      "Comprehensive bandwidth control (DBA) and QoS guarantees",
      "Redundant dual AC/DC power options"
    ],
    specs: [{ group: "PON Specs", rows: [["PON Standard", "ITU-T G.984.x"], ["Max ONUs", "512 Clients"], ["Uplinks", "2Ãƒâ€” 10G SFP+ + 4Ãƒâ€” GE"]] }],
    images: ["assets/img/products/vsol-v2801sg.jpg"],
    documents: [{ type: "datasheet", label: "HSGQ_G04R_Datasheet.pdf", size: "3.2 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 6,
    isNew: true,
    price: { retail: 58000, compareAt: 62000, dealer: 51000, moq: 1, pack: 1, quoteOnly: true, demo: true }, // Quote only Ã‚Â§12.5
    flags: { bestSeller: true, recommended: true },
    alternatives: ["hsgq-g08r"]
  },

  {
    id: "hsgq-g08r",
    sku: "SBC-HSG-G08R",
    brand: "hsgq",
    model: "HSGQ-G08R",
    name: "HSGQ 8*Port Pon GPON OLT Integrated Ftth Access",
    category: "fiber-pon",
    subcategory: "OLT",
    tags: ["hsgq", "olt", "8 port", "gpon", "ftth"],
    attrs: { ponPorts: 8, type: "GPON OLT", splitRatio: "1:128" },
    summary: "High-density 8-port GPON OLT capable of driving up to 1,024 optical subscribers with 10G uplinks for ISP distribution hubs.",
    features: ["8Ãƒâ€” GPON ports supporting 1,024 subscribers", "4Ãƒâ€” 10G SFP+ uplinks", "Dual hot-swappable power supplies"],
    specs: [{ group: "PON Specs", rows: [["Max Subscribers", "1,024 ONUs"], ["Uplink Fabric", "4Ãƒâ€” 10GE SFP+"]] }],
    images: ["assets/img/products/vsol-v2801sg.jpg"],
    documents: [{ type: "datasheet", label: "HSGQ_G08R_Manual.pdf", size: "4.1 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 4,
    isNew: true,
    price: { retail: 92000, compareAt: 98000, dealer: 81000, moq: 1, pack: 1, quoteOnly: true, demo: true }, // Quote only Ã‚Â§12.5
    flags: { bestSeller: false, recommended: true },
    alternatives: ["hsgq-g04r"]
  },

  {
    id: "hsgq-x200dw",
    sku: "SBC-HSG-X200DW",
    brand: "hsgq",
    model: "HSGQ-X200DW",
    name: "HSGQ-X200DW 1200M WiFi XPON ONU",
    category: "fiber-pon",
    subcategory: "ONU/ONT",
    tags: ["hsgq", "onu", "xpon", "wifi 5", "ftth"],
    attrs: { ponType: "XPON (GPON/EPON)", wifiStandard: "Wi-Fi 5 AC1200", lanPorts: 1 },
    summary: "Dual-mode XPON optical terminal featuring 1200 Mbps concurrent dual-band Wi-Fi and 1 Gigabit LAN port for FTTH subscribers.",
    features: [
      "Dual-mode XPON automatic compatibility with GPON and EPON OLTs",
      "AC1200 dual-band Wi-Fi with 2Ãƒâ€” 5 dBi high-gain antennas",
      "1Ãƒâ€” Gigabit Ethernet LAN port + 1Ãƒâ€” FE port",
      "OMCI and TR-069 remote configuration"
    ],
    specs: [{ group: "Optical", rows: [["Optical Interface", "SC/UPC or SC/APC"], ["Sensitivity", "-28 dBm"]] }],
    images: ["assets/img/products/vsol-v2801sg.jpg"],
    documents: [{ type: "datasheet", label: "HSGQ_X200DW_Specs.pdf", size: "1.6 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 150,
    isNew: true,
    price: { retail: 2450, compareAt: 2700, dealer: 2150, moq: 20, pack: 10, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: ["hsgq-x421dw", "tenda-hg10c"]
  },

  {
    id: "hsgq-x421dw",
    sku: "SBC-HSG-X421DW",
    brand: "hsgq",
    model: "HSGQ-X421DW",
    name: "HSGQ-X421DW 4GE+2POTS+WiFi XPON ONU",
    category: "fiber-pon",
    subcategory: "ONU/ONT",
    tags: ["hsgq", "onu", "voip", "4ge", "pots"],
    attrs: { ponType: "XPON", wifiStandard: "Wi-Fi 5", lanPorts: 4, pots: 2 },
    summary: "Full-service triple-play optical gateway with 4 Gigabit LAN ports, 2 telephone POTS interfaces for VoIP, and dual-band Wi-Fi.",
    features: ["4Ãƒâ€” Full Gigabit LAN ports for IPTV and PCs", "2Ãƒâ€” RJ11 POTS voice ports for telephone line integration", "XPON auto-sensing"],
    specs: [{ group: "Hardware", rows: [["LAN", "4Ãƒâ€” GE"], ["Voice", "2Ãƒâ€” FXS POTS"]] }],
    images: ["assets/img/products/vsol-v2801sg.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 40,
    isNew: false,
    price: { retail: 3850, compareAt: 4200, dealer: 3350, moq: 10, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["hsgq-x200dw", "tenda-hg10c"]
  },

  {
    id: "tenda-hg10c",
    sku: "SBC-TND-HG10C",
    brand: "tenda",
    model: "HG10C",
    name: "Tenda HG10C AC1200 Wi-Fi 5 XPON ONT",
    category: "fiber-pon",
    subcategory: "ONU/ONT",
    tags: ["tenda", "ont", "onu", "xpon", "ac1200"],
    attrs: { ponType: "XPON", wifiStandard: "Wi-Fi 5 AC1200", lanPorts: 1 },
    summary: "Tenda's flagship FTTH subscriber terminal pairing XPON compatibility with 1200 Mbps wireless speed and OMCI management.",
    features: ["Dual-mode EPON/GPON auto-switching", "AC1200 high-speed wireless connectivity", "1Ãƒâ€” GE + 1Ãƒâ€” FE port"],
    specs: [{ group: "Hardware", rows: [["Antennas", "2Ãƒâ€” 5 dBi External"], ["Fiber Connector", "SC/UPC"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [{ type: "datasheet", label: "HG10C_Datasheet.pdf", size: "2.1 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 55,
    isNew: false,
    price: { retail: 2650, compareAt: 2850, dealer: 2330, moq: 10, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["hsgq-x200dw"]
  },

  {
    id: "solitine-10g-sr",
    sku: "SBC-SLT-10GSR",
    brand: "solitine",
    model: "10G SR SFP+",
    name: "Solitine 10G SR SFP+ Module Ã¢â‚¬â€œ 850nm, 300m, LC Duplex, MMF",
    category: "fiber-pon",
    subcategory: "SFP/QSFP Modules",
    tags: ["solitine", "10g", "sfp+", "transceiver", "fiber module"],
    attrs: { speed: "10G", wavelength: "850nm", distance: "300m", fiberType: "Multi-Mode" },
    summary: "Hot-pluggable 10G SFP+ multi-mode optical transceiver offering up to 300 meters transmission over OM3 duplex LC fiber.",
    features: ["10 Gbps serial optical interface", "850nm VCSEL transmitter with DDM digital diagnostics", "Standard LC duplex connector"],
    specs: [{ group: "Optical", rows: [["Wavelength", "850nm"], ["Max Distance", "300m on OM3"], ["Form Factor", "SFP+"]] }],
    images: ["assets/img/products/solitine-panel-24p.jpg"],
    documents: [{ type: "datasheet", label: "Solitine_10G_SR_Specs.pdf", size: "1.2 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 120,
    isNew: true,
    price: { retail: 1950, compareAt: 2200, dealer: 1700, moq: 10, pack: 10, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: []
  },

  /* --------------------------------------------------------------------------
     4. ACCESS POINTS & OUTDOOR
     -------------------------------------------------------------------------- */
  {
    id: "tenda-w15",
    sku: "SBC-TND-W15",
    brand: "tenda",
    model: "W15",
    name: "Tenda W15 AX3000 Dual-Band Gigabit Wi-Fi 6 In-Wall AP",
    category: "wireless-outdoor",
    subcategory: "In-wall APs",
    tags: ["tenda", "in-wall ap", "hotel wifi", "wifi 6", "poe"],
    attrs: { wifiStandard: "Wi-Fi 6", formFactor: "86 Type In-Wall", poe: true, speedClass: "AX3000" },
    summary: "Standard 86-type junction box in-wall Wi-Fi 6 access point delivering 3000 Mbps throughput for hotels, dormitories, and luxury apartments.",
    features: [
      "Standard 86mm wall junction box form factor with front-facing Gigabit port",
      "AX3000 dual-band Wi-Fi 6 for ultra-dense wireless deployments",
      "Standard 802.3af/at PoE powered",
      "Centralized controller management support"
    ],
    specs: [{ group: "Hardware", rows: [["Mounting", "86-type Junction Box"], ["Ports", "1Ãƒâ€” Front GE, 1Ãƒâ€” Rear PoE GE"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [{ type: "datasheet", label: "W15_InWall_Brochure.pdf", size: "2.3 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 28,
    isNew: true,
    price: { retail: 5400, compareAt: 6200, dealer: 4750, moq: 5, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["ipcom-iuap-ac-m"]
  },

  {
    id: "tenda-oap1200",
    sku: "SBC-TND-OAP1200",
    brand: "tenda",
    model: "OAP1200",
    name: "Tenda OAP1200 802.11AC Indoor/Outdoor Wi-Fi Access Point",
    category: "wireless-outdoor",
    subcategory: "Outdoor CPE/PtP",
    tags: ["tenda", "outdoor ap", "ip65", "ac1200", "poe"],
    attrs: { wifiStandard: "Wi-Fi 5", weatherProof: "IP65", poe: true },
    summary: "Ruggedized IP65 weatherproof outdoor access point featuring dual detachable omni antennas for resort, campus, and park Wi-Fi coverage.",
    features: ["IP65 weatherproof housing resistant to heavy rain and dust", "Detachable external antennas for flexible coverage radius", "Gigabit PoE powered"],
    specs: [{ group: "Environment", rows: [["Ingress Protection", "IP65"], ["Operating Temp", "-30Ã‚Â°C to 60Ã‚Â°C"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [{ type: "datasheet", label: "OAP1200_Datasheet.pdf", size: "2.2 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 14,
    isNew: false,
    price: { retail: 6900, compareAt: null, dealer: 6070, moq: 3, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["ipcom-iuap-ac-m", "tenda-o9"]
  },

  {
    id: "tenda-o9",
    sku: "SBC-TND-O9",
    brand: "tenda",
    model: "O9 1-pack",
    name: "Tenda O9 1-pack 5GHz 11ac 23dBi Gigabit Outdoor CPE",
    category: "wireless-outdoor",
    subcategory: "Outdoor CPE/PtP",
    tags: ["tenda", "ptp", "cpe", "23dbi", "long range"],
    attrs: { frequency: "5 GHz", antennaGain: "23 dBi", maxRange: "25 km", poe: true },
    summary: "Long-range 23 dBi directional 5GHz outdoor CPE designed for PtP and PtMP wireless backhauls spanning up to 25 kilometers.",
    features: [
      "5 GHz 11ac technology delivering up to 867 Mbps wireless link rate",
      "23 dBi dual-polarization directional antenna",
      "Gigabit Ethernet port with 24V passive PoE injector included",
      "IP65 weather protection and 6 kV lightning surge tolerance"
    ],
    specs: [{ group: "Wireless", rows: [["Antenna Gain", "23 dBi Directional"], ["Distance", "Up to 25 km Link"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [{ type: "datasheet", label: "Tenda_O9_Datasheet.pdf", size: "2.7 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 20,
    isNew: false,
    price: { retail: 7450, compareAt: 8200, dealer: 6550, moq: 2, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: ["tenda-oap1200"]
  },

  {
    id: "ipcom-iuap-ac-m",
    sku: "SBC-IPC-IUAP-ACM",
    brand: "ip-com",
    model: "iUAP-AC-M",
    name: "IP-COM iUAP-AC-M 802.11AC Indoor/Outdoor Wi-Fi Access Point",
    category: "wireless-outdoor",
    subcategory: "Outdoor CPE/PtP",
    tags: ["ip-com", "mesh ap", "outdoor", "ac1200", "poe"],
    attrs: { wifiStandard: "Wi-Fi 5 AC1200", weatherProof: "IP65", poe: true },
    summary: "Versatile indoor/outdoor mesh access point with 2 omnidirectional antennas providing wide-angle coverage for shopping centers and schools.",
    features: ["IP65 waterproof and sunproof enclosure", "Mesh networking support without running network cables", "Gigabit PoE port"],
    specs: [{ group: "Hardware", rows: [["Enclosure", "IP65 Outdoor"], ["Ports", "1Ãƒâ€” GE PoE"]] }],
    images: ["assets/img/products/mikrotik-cap-ac.webp"],
    documents: [{ type: "datasheet", label: "iUAP_AC_M_Specs.pdf", size: "2.0 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 16,
    isNew: false,
    price: { retail: 6800, compareAt: 7500, dealer: 5950, moq: 2, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["tenda-oap1200"]
  },

  {
    id: "cisco-c9115axi",
    sku: "SBC-CSC-9115AXI",
    brand: "cisco",
    model: "C9115AXI-EWC",
    name: "Cisco C9115AXI-EWC Access Point",
    category: "wireless-outdoor",
    subcategory: "Indoor APs",
    tags: ["cisco", "catalyst", "wifi 6", "enterprise ap"],
    attrs: { wifiStandard: "Wi-Fi 6", enterprise: true, poe: true },
    summary: "High-density enterprise Wi-Fi 6 access point with internal antennas and embedded wireless controller (EWC) functionality.",
    features: ["Wi-Fi 6 (802.11ax) 4Ãƒâ€”4 MU-MIMO", "Embedded Wireless Controller for zero-hardware management", "Multigigabit 2.5G uplink"],
    specs: [{ group: "Enterprise", rows: [["Radio", "4Ãƒâ€”4:4 MU-MIMO"], ["Uplink", "2.5 mGig PoE+"]] }],
    images: ["assets/img/products/cisco-c1000-24t.webp"],
    documents: [{ type: "datasheet", label: "Cisco_Catalyst_9115_Datasheet.pdf", size: "4.2 MB", url: "#", demo: true }],
    warranty: "1 Year Official Cisco Warranty",
    status: "in-stock",
    stock: 6,
    isNew: false,
    price: { retail: 95000, compareAt: null, dealer: 83600, moq: 1, pack: 1, quoteOnly: true, demo: true }, // Quote only Ã‚Â§12.5
    flags: { bestSeller: false, recommended: false },
    alternatives: ["tenda-w15"]
  },

  /* --------------------------------------------------------------------------
     5. CCTV & SECURITY
     -------------------------------------------------------------------------- */
  {
    id: "tenda-tn3108-8p",
    sku: "SBC-TND-TN3108",
    brand: "tenda",
    model: "TN3108-8P",
    name: "Tenda TN3108-8P 8-Channel PoE UHD Network Video Recorder",
    category: "security-cctv",
    subcategory: "NVR",
    tags: ["nvr", "poe nvr", "8 channel", "4k uhd", "tenda"],
    attrs: { channels: 8, resolution: "4K UHD (8MP)", poePorts: 8, hddSlots: 1 },
    summary: "8-channel 4K Ultra HD network video recorder with 8 integrated plug-and-play PoE ports and intelligent AI human detection support.",
    features: [
      "8Ãƒâ€” Built-in PoE ports for zero-configuration camera setup",
      "Up to 4K / 8MP video decoding and HDMI output",
      "Smart H.265+ compression saving 50% storage space",
      "Supports 1Ãƒâ€” SATA HDD up to 10 TB"
    ],
    specs: [
      { group: "Video & Audio", rows: [["IP Camera Input", "8 Channels"], ["Decoding", "4K / 5MP / 4MP / 1080p"], ["Video Out", "1Ãƒâ€” HDMI, 1Ãƒâ€” VGA"]] },
      { group: "Storage", rows: [["HDD Interface", "1Ãƒâ€” SATA (up to 10 TB)"], ["Compression", "H.265+, H.265, H.264"]] }
    ],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [{ type: "datasheet", label: "Tenda_TN3108_8P_Datasheet.pdf", size: "2.4 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 18,
    isNew: true,
    price: { retail: 11800, compareAt: 12500, dealer: 10350, moq: 2, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: []
  },

  {
    id: "tenda-tc3b24c",
    sku: "SBC-TND-TC3B24C",
    brand: "tenda",
    model: "TC3B24C",
    name: "Tenda TC3B24C 4MP Smart Full-Color Bullet Camera",
    category: "security-cctv",
    subcategory: "IP Cameras",
    tags: ["ip camera", "4mp", "full color", "bullet", "poe", "tenda"],
    attrs: { resolution: "4MP (2560Ãƒâ€”1440)", nightVision: "Full-Color 30m", weatherProof: "IP67", poe: true },
    summary: "High-resolution 4MP outdoor bullet camera with dual warm spotlights for vivid 24/7 full-color night vision and AI human vehicle recognition.",
    features: [
      "4MP crisp video resolution with wide dynamic range (WDR)",
      "24/7 Full-Color night vision up to 30 meters via smart dual-light system",
      "Rugged IP67 metal-composite enclosure resistant to extreme rainfall",
      "Standard PoE (802.3af) and 12V DC power support"
    ],
    specs: [{ group: "Camera", rows: [["Sensor", "1/3\" CMOS 4MP"], ["Lens", "4.0mm @ F1.6"], ["Ingress", "IP67"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [{ type: "datasheet", label: "TC3B24C_Brochure.pdf", size: "1.8 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 45,
    isNew: true,
    price: { retail: 3250, compareAt: 3600, dealer: 2850, moq: 6, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: ["tenda-ch7-wca"]
  },

  {
    id: "tenda-ch7-wca",
    sku: "SBC-TND-CH7WCA",
    brand: "tenda",
    model: "CH7-WCA",
    name: "Tenda CH7-WCA 4MP Outdoor Wi-Fi Pan Tilt Camera",
    category: "security-cctv",
    subcategory: "Wi-Fi Cameras",
    tags: ["wifi camera", "pan tilt", "4mp", "outdoor", "tenda"],
    attrs: { resolution: "4MP", ptz: "360Ã‚Â° Pan / 90Ã‚Â° Tilt", connectivity: "Wi-Fi + RJ45", weatherProof: "IP65" },
    summary: "Motorized 360-degree pan/tilt outdoor Wi-Fi camera with two-way audio talk, sound/light alarm, and auto-tracking capabilities.",
    features: [
      "360-degree panoramic coverage with motorized pan and tilt",
      "Dual external high-gain Wi-Fi antennas ensuring strong reception",
      "Two-way clear audio communication with integrated speaker and mic",
      "MicroSD card slot supporting local recording up to 256 GB"
    ],
    specs: [{ group: "Camera", rows: [["Pan/Tilt", "Horizontal 360Ã‚Â°, Vertical 90Ã‚Â°"], ["Storage", "MicroSD up to 256GB"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [{ type: "datasheet", label: "CH7_WCA_Datasheet.pdf", size: "2.1 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 25,
    isNew: true,
    price: { retail: 4450, compareAt: 4800, dealer: 3900, moq: 4, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["tenda-tc3b24c"]
  },

  /* --------------------------------------------------------------------------
     6. POWER & BACKUP
     -------------------------------------------------------------------------- */
  {
    id: "must-eh55-h1ksl",
    sku: "SBC-MST-EH551K",
    brand: "must",
    model: "EH55-H1KSL",
    name: "Must EH55-H1KSL (EH55-H1KS) Online UPS 1KVA/1KW Ã¢â‚¬â€œ High Frequency Long-Run Online UPS",
    category: "power-backup",
    subcategory: "Online UPS",
    tags: ["must", "online ups", "1kva", "long run", "power backup"],
    attrs: { capacity: "1kVA / 1000W", topology: "True Online Double Conversion", pf: "1.0 Unity", batteryVoltage: "24V / 36V DC" },
    summary: "True online double-conversion high-frequency 1kVA/1kW UPS with unity power factor designed for server rooms, medical tools, and telco POPs.",
    features: [
      "True double-conversion online technology with zero transfer time (0 ms)",
      "Unity Power Factor (PF 1.0) delivering full 1000W real usable power",
      "External long-run battery architecture for extended runtime during outages",
      "Intelligent LCD display showing real-time load and battery levels"
    ],
    specs: [
      { group: "Output", rows: [["Capacity", "1000VA / 1000W"], ["Voltage", "220 / 230 / 240 VAC"], ["Waveform", "Pure Sine Wave"]] },
      { group: "Input & Battery", rows: [["Input Voltage Window", "110Ã¢â‚¬â€œ300 VAC"], ["DC Bus", "24V / 36V External Battery"]] }
    ],
    images: ["assets/img/products/must-ew2110-800.jpg"],
    documents: [{ type: "datasheet", label: "Must_EH55_OnlineUPS.pdf", size: "3.5 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 12,
    isNew: false,
    price: { retail: 28500, compareAt: 31000, dealer: 25000, moq: 2, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: ["marsriva-mr-us3k", "must-ew2110-800"]
  },

  {
    id: "must-ew2110-800",
    sku: "SBC-MST-EW2110",
    brand: "must",
    model: "EW2110-800",
    name: "Must EW2110-800 800VA/480W Line Interactive UPS",
    category: "power-backup",
    subcategory: "Line-interactive UPS",
    tags: ["must", "ups", "800va", "line interactive"],
    attrs: { capacity: "800VA / 480W", topology: "Line Interactive", internalBattery: "1Ãƒâ€” 12V 9Ah" },
    summary: "Compact 800VA line-interactive UPS with automatic voltage regulation (AVR) to protect desktop computers and Wi-Fi routers against blackouts.",
    features: ["Built-in boost and buck AVR for voltage stabilization", "Internal 12V 9Ah battery providing 15Ã¢â‚¬â€œ25 mins PC backup", "Surge and overload protection"],
    specs: [{ group: "Electrical", rows: [["Capacity", "800VA / 480W"], ["Backup Time", "15Ã¢â‚¬â€œ20 Mins Standard Load"]] }],
    images: ["assets/img/products/must-ew2110-800.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 35,
    isNew: false,
    price: { retail: 4650, compareAt: 5200, dealer: 4050, moq: 5, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["must-eh55-h1ksl", "solitine-sol604"]
  },

  {
    id: "marsriva-mr-us3k",
    sku: "SBC-MRS-US3K",
    brand: "marsriva",
    model: "MR-US3K",
    name: "Marsriva MR-US3K long run online UPS",
    category: "power-backup",
    subcategory: "Online UPS",
    tags: ["marsriva", "online ups", "3kva", "long run"],
    attrs: { capacity: "3kVA / 2700W", topology: "Online Double Conversion", dcVoltage: "72V / 96V DC" },
    summary: "Heavy-duty 3kVA/2700W online double-conversion UPS equipped with high-amp charger for heavy external battery banks at enterprise data hubs.",
    features: ["Zero millisecond transfer time protecting sensitive telecom gear", "Smart battery charger optimizing charge profiles for deep cycle batteries", "SNMP network card slot"],
    specs: [{ group: "Capacity", rows: [["Power Rating", "3000VA / 2700W"], ["DC Bus", "96V DC External"]] }],
    images: ["assets/img/home/cat_ups_power.jpg"],
    documents: [{ type: "datasheet", label: "Marsriva_MR_US3K_Brochure.pdf", size: "2.8 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 5,
    isNew: true,
    price: { retail: 48500, compareAt: 52000, dealer: 42500, moq: 1, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["must-eh55-h1ksl"]
  },

  {
    id: "must-ph91-5k",
    sku: "SBC-MST-PH91-5K",
    brand: "must",
    model: "PH91-5KL1EU-HM",
    name: "Must PH91-5KL1EU-HM 5kW Hybrid Solar Inverter",
    category: "power-backup",
    subcategory: "Hybrid Solar Inverters",
    tags: ["must", "solar inverter", "hybrid", "5kw", "mppt"],
    attrs: { capacity: "5kW / 5000W", pvInput: "500V Max MPPT", batteryType: "48V LiFePO4 / Lead-Acid" },
    summary: "Commercial 5kW hybrid solar inverter featuring dual MPPT solar charge controllers and seamless AC grid/generator backup switching.",
    features: [
      "Pure sine wave output 5000W with surge handling up to 10000W",
      "High PV input voltage range (120Ã¢â‚¬â€œ450 VDC) supporting up to 6000W solar panels",
      "Compatible with Must LiFePO4 lithium batteries with BMS RS485 communication",
      "Wi-Fi monitoring dongle for smartphone energy tracking"
    ],
    specs: [{ group: "Solar", rows: [["Inverter Output", "5000W Continuous"], ["MPPT Tracker", "100A Solar Charger"], ["Battery", "48V DC"]] }],
    images: ["assets/img/products/must-ew2110-800.jpg"],
    documents: [{ type: "datasheet", label: "Must_PH91_5kW_Manual.pdf", size: "4.5 MB", url: "#", demo: true }],
    warranty: "2 Years Official Warranty",
    status: "in-stock",
    stock: 7,
    isNew: true,
    price: { retail: 92000, compareAt: 98000, dealer: 80960, moq: 1, pack: 1, quoteOnly: true, demo: true }, // Quote only Ã‚Â§12.5
    flags: { bestSeller: true, recommended: true },
    alternatives: ["must-lp16-48100"]
  },

  {
    id: "must-lp16-48100",
    sku: "SBC-MST-LP16",
    brand: "must",
    model: "LP16-48100",
    name: "Must LP16-48100 LiFePO4 Battery",
    category: "power-backup",
    subcategory: "LiFePO4 Batteries",
    tags: ["must", "lithium battery", "lifepo4", "48v", "100ah", "5kwh"],
    attrs: { voltage: "51.2V", capacity: "100Ah (5.12 kWh)", cycles: "6000+ Cycles", chemistry: "Lithium Iron Phosphate" },
    summary: "Wall-mount 5.12 kWh LiFePO4 lithium battery module delivering 6,000+ deep discharge cycles for solar storage and telecom backup.",
    features: [
      "Ultra-safe Lithium Iron Phosphate (LiFePO4) chemistry",
      "6,000+ cycles at 80% DoD with 10+ years design life",
      "Intelligent BMS protection with CAN/RS485 inverter communication",
      "Scalable up to 15 units in parallel for 76.8 kWh total capacity"
    ],
    specs: [{ group: "Battery", rows: [["Nominal Voltage", "51.2V"], ["Rated Capacity", "100Ah / 5.12 kWh"], ["Max Charge Current", "100A"]] }],
    images: ["assets/img/products/must-ew2110-800.jpg"],
    documents: [{ type: "datasheet", label: "Must_LP16_LiFePO4_Brochure.pdf", size: "2.9 MB", url: "#", demo: true }],
    warranty: "5 Years Official Warranty",
    status: "in-stock",
    stock: 8,
    isNew: true,
    price: { retail: 135000, compareAt: null, dealer: 118800, moq: 1, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["must-ph91-5k"]
  },

  {
    id: "must-hbp18-1006",
    sku: "SBC-MST-HBP18",
    brand: "must",
    model: "HBP18-1006",
    name: "Must HBP18-1006 Portable Solar Power Station",
    category: "power-backup",
    subcategory: "Power Stations",
    tags: ["must", "power station", "portable", "solar generator"],
    attrs: { capacity: "1000W / 1024Wh", batteryType: "LiFePO4", portability: "Portable Luggage Handle" },
    summary: "All-in-one 1000W portable solar generator with built-in 1024Wh lithium storage and AC/USB outlets for field engineers and emergency power.",
    features: ["1000W pure sine wave AC output with 1024Wh capacity", "Multiple outputs: AC sockets, USB-C PD 100W, car 12V port", "Fast solar and grid recharging"],
    specs: [{ group: "Outputs", rows: [["AC Inverter", "1000W"], ["Battery Capacity", "1024Wh LiFePO4"]] }],
    images: ["assets/img/home/prod_apc_ups.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "low-stock", // low-stock requirement (Ã‚Â§12.5)
    stock: 3,
    isNew: true,
    price: { retail: 48000, compareAt: null, dealer: 42240, moq: 1, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["must-ew2110-800"]
  },

  {
    id: "solitine-sol604",
    sku: "SBC-SLT-SOL604",
    brand: "solitine",
    model: "SOL-604",
    name: "Solitine SOL-604 Premium Mini DC UPS",
    category: "power-backup",
    subcategory: "Power Stations",
    tags: ["solitine", "mini ups", "dc ups", "router backup"],
    attrs: { capacity: "10,400 mAh", outputs: "5V USB / 9V DC / 12V DC / POE 15V/24V" },
    summary: "Multi-output 10,400 mAh mini DC UPS keeping Wi-Fi routers, ONUs, and security cameras powered for up to 6Ã¢â‚¬â€œ8 hours during power cuts.",
    features: [
      "Zero-transfer DC output preventing Wi-Fi router reboot during outages",
      "Dedicated 9V/12V DC jacks plus 15V/24V PoE output",
      "High-capacity 10,400 mAh lithium battery cells"
    ],
    specs: [{ group: "Outputs", rows: [["Battery", "10,400 mAh"], ["Voltage Modes", "5V USB, 9V DC, 12V DC, 15V/24V PoE"]] }],
    images: ["assets/img/products/solitine-panel-24p.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 80,
    isNew: false,
    price: { retail: 2450, compareAt: 2800, dealer: 2150, moq: 10, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: ["must-ew2110-800"]
  },

  /* --------------------------------------------------------------------------
     7. CABLING & RACKS
     -------------------------------------------------------------------------- */
  {
    id: "solitine-sol6156-or",
    sku: "SBC-SLT-SOL6156",
    brand: "solitine",
    model: "SOL6156-OR-U",
    name: "SOLITINE SOL6156-OR-U U/UTP Cat-6 Solid Copper PVC LAN Cable (Orange)",
    category: "cabling-racks",
    subcategory: "Cat6 Cable",
    tags: ["solitine", "cat6", "lan cable", "solid copper", "305m"],
    attrs: { category: "Cat6 U/UTP", conductor: "100% Solid Bare Copper (23 AWG)", length: "305 Meters (1000 ft)", jacket: "PVC (Orange)" },
    summary: "Premium 305-meter roll of 23 AWG 100% solid copper unshielded Cat6 network cable exceeding ANSI/TIA-568-C.2 standards.",
    features: [
      "100% Pure solid electrolytic copper conductors (23 AWG)",
      "High-bandwidth 250 MHz transmission frequency for Gigabit and 10G Ethernet",
      "Durable easy-pull box with sequential meter marks",
      "Flame-retardant high-visibility orange PVC jacket"
    ],
    specs: [{ group: "Conductor", rows: [["Wire Gauge", "23 AWG (0.57mm) Bare Copper"], ["Length", "305 Meters per Box"], ["Standard", "TIA/EIA 568-C.2"]] }],
    images: ["assets/img/products/solitine-panel-24p.jpg"],
    documents: [{ type: "datasheet", label: "Solitine_Cat6_Cable_Datasheet.pdf", size: "1.4 MB", url: "#", demo: true }],
    warranty: "Manufacturer Performance Guarantee",
    status: "in-stock",
    stock: 65,
    isNew: false,
    price: { retail: 11500, compareAt: 12500, dealer: 10120, moq: 5, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: ["solitine-patch-24"]
  },

  {
    id: "solitine-patch-24",
    sku: "SBC-SLT-P2401",
    brand: "solitine",
    model: "SOL-P2401-10",
    name: "Solitine 24-Port 1U Patch Panel Cat6 Fully Loaded",
    category: "cabling-racks",
    subcategory: "Patch Panels",
    tags: ["solitine", "patch panel", "cat6", "1u", "24 port"],
    attrs: { ports: 24, rackUnit: "1U", category: "Cat6", loaded: true },
    summary: "Standard 19-inch 1U 24-port Cat6 fully loaded patch panel with gold-plated RJ45 jacks and dual IDC punch-down termination blocks.",
    features: ["24Ãƒâ€” Cat6 gold-plated RJ45 sockets", "Numbered ports with label holders", "Rear cable management bar included"],
    specs: [{ group: "Mechanical", rows: [["Size", "19-inch 1U"], ["Wiring", "T568A / T568B Color Coded"]] }],
    images: ["assets/img/products/solitine-panel-24p.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 25,
    isNew: false,
    price: { retail: 3200, compareAt: 3600, dealer: 2800, moq: 5, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["solitine-rack-9u"]
  },

  {
    id: "solitine-rack-9u",
    sku: "SBC-SLT-266-9U",
    brand: "solitine",
    model: "SOL-266-9U",
    name: "Solitine SOL-266-9U Wall Mount Network Rack",
    category: "cabling-racks",
    subcategory: "Racks",
    tags: ["solitine", "network rack", "server rack", "9u", "wall mount"],
    attrs: { height: "9U", depth: "600 mm", type: "Wall Mount", material: "Cold Rolled Steel" },
    summary: "Heavy-gauge 9U wall-mount network server enclosure with tempered glass front door, cooling fan slot, and lockable security latch.",
    features: [
      "9U standard 19-inch equipment mounting profile",
      "Sturdy 600mm depth accommodating deep rackmount switches and UPS",
      "Tempered toughened glass door with front key lock",
      "Includes 1Ãƒâ€” cooling fan and 6-socket PDU power strip"
    ],
    specs: [{ group: "Dimensions", rows: [["Height", "9U (approx. 500mm)"], ["Width & Depth", "600 Ãƒâ€” 600 mm"], ["Loading Capacity", "60 kg"]] }],
    images: ["assets/img/products/solitine-panel-24p.jpg"],
    documents: [{ type: "datasheet", label: "SOL_266_Rack_Specs.pdf", size: "1.5 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 18,
    isNew: false,
    price: { retail: 9200, compareAt: 10500, dealer: 8100, moq: 2, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["solitine-patch-24"]
  },

  /* --------------------------------------------------------------------------
     8. FIBER TOOLS
     -------------------------------------------------------------------------- */
  {
    id: "tumtec-fst18s",
    sku: "SBC-TMT-FST18S",
    brand: "tumtec",
    model: "FST-18S",
    name: "Tumtec Dust-proof Optical Fusion Splicer FST-18S",
    category: "fiber-tools",
    subcategory: "Fusion Splicers",
    tags: ["tumtec", "fusion splicer", "splicing machine", "fiber tool"],
    attrs: { alignment: "Core-to-Core Direct Alignment", spliceTime: "6 Seconds", heatingTime: "15 Seconds", batteryCapacity: "5200 mAh (300+ cycles)" },
    summary: "High-precision core-alignment optical fusion splicer engineered with dust-proof, shock-proof, and moisture-proof chassis for field FTTH splicing.",
    features: [
      "Ultra-fast 6-second typical splicing time and 15-second heating time",
      "Direct 4-motor core-to-core optical alignment technology",
      "5.0-inch high-resolution touch display with 380Ãƒâ€” magnification",
      "High-capacity 5200 mAh lithium battery supporting over 300 splices per charge"
    ],
    specs: [
      { group: "Splicing", rows: [["Applicable Fibers", "SM (ITU-T G.652&G.657), MM (G.651), DS (G.653), NZDS (G.655)"], ["Splice Loss", "0.02dB (SM), 0.01dB (MM)"]] },
      { group: "Power", rows: [["Battery", "5200 mAh Rechargeable"], ["Weight", "1.7 kg (without battery)"]] }
    ],
    images: ["assets/img/products/tumtec-fst-18s.webp"],
    documents: [{ type: "datasheet", label: "Tumtec_FST18S_Brochure.pdf", size: "4.6 MB", url: "#", demo: true }],
    warranty: "2 Years Official Warranty",
    status: "in-stock",
    stock: 5,
    isNew: true,
    price: { retail: 109000, compareAt: 115000, dealer: 96000, moq: 1, pack: 1, quoteOnly: true, demo: true }, // Quote only Ã‚Â§12.5
    flags: { bestSeller: true, recommended: true },
    alternatives: ["tumtec-a9plus"]
  },

  {
    id: "tumtec-a9plus",
    sku: "SBC-TMT-A9P",
    brand: "tumtec",
    model: "A9+",
    name: "Tumtec A9+ High Precision Fiber Cleaver One-Step Automatic Fiber Cutting Tool",
    category: "fiber-tools",
    subcategory: "Cleavers",
    tags: ["tumtec", "fiber cleaver", "precision cutting"],
    attrs: { cleaveAngle: "< 0.5 Degrees", bladeLife: "48,000 Cleaves (16 positions Ãƒâ€” 3000)", operation: "One-Step Automatic" },
    summary: "Professional one-step automatic fiber cleaver delivering precise cleave angles below 0.5 degrees for zero-loss fusion splicing.",
    features: [
      "Automatic carriage return and fiber scrap collection box",
      "Long-life tungsten blade with 48,000 cleaves capacity",
      "Universal fiber clamp accommodating 250ÃŽÂ¼m, 900ÃŽÂ¼m, and drop cables"
    ],
    specs: [{ group: "Specs", rows: [["Cleave Angle", "Typical < 0.5Ã‚Â°"], ["Blade Positions", "16 Points"], ["Blade Life", "48,000 times"]] }],
    images: ["assets/img/products/tumtec-fst-18s.webp"],
    documents: [{ type: "datasheet", label: "Tumtec_A9_Cleaver_Guide.pdf", size: "1.7 MB", url: "#", demo: true }],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 20,
    isNew: false,
    price: { retail: 9200, compareAt: 10500, dealer: 8100, moq: 2, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: false },
    alternatives: ["tumtec-fst18s", "solitine-power-meter"]
  },

  {
    id: "solitine-power-meter",
    sku: "SBC-SLT-OPM",
    brand: "solitine",
    model: "R45 Tester",
    name: "Solitine Optical Power Meter with VFL & R45 Tester",
    category: "fiber-tools",
    subcategory: "Power Meters & Testers",
    tags: ["solitine", "power meter", "vfl", "fiber tester", "rj45 tester"],
    attrs: { wavelengthRange: "800Ã¢â‚¬â€œ1700nm", vflPower: "10mW (up to 10km)", rj45Tester: true },
    summary: "3-in-1 fiber optic power meter, 10mW visual fault locator (VFL), and RJ45 Ethernet network cable continuity tester.",
    features: [
      "Measures optical power across 850/1300/1310/1490/1550/1625nm wavelengths",
      "Integrated 10mW red laser VFL for locating fiber breaks up to 10 km",
      "Detachable RJ45 network cable sequence tester"
    ],
    specs: [{ group: "Testing", rows: [["Power Range", "-70 to +10 dBm"], ["VFL Distance", "8Ã¢â‚¬â€œ10 km"]] }],
    images: ["assets/img/products/solitine-panel-24p.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 35,
    isNew: false,
    price: { retail: 2800, compareAt: 3200, dealer: 2450, moq: 5, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["tumtec-a9plus"]
  },

  /* --------------------------------------------------------------------------
     9. PERIPHERALS & AUDIO
     -------------------------------------------------------------------------- */
  {
    id: "meetion-mk008-pro",
    sku: "SBC-MTN-MK008P",
    brand: "meetion",
    model: "MT-MK008 Pro",
    name: "Meetion MT-MK008 Pro 80% RGB Hot-swap Mechanical Keyboard",
    category: "peripherals-audio",
    subcategory: "Keyboards",
    tags: ["meetion", "keyboard", "mechanical", "hot swap", "rgb"],
    attrs: { layout: "80% TKL (87 Keys)", switches: "Hot-swappable Custom Linear", connectivity: "Type-C Detachable Cable", backlighting: "RGB Chroma" },
    summary: "Tenkeyless 80% hot-swappable mechanical gaming keyboard featuring sound-dampening silicone gaskets, vibrant RGB lighting, and custom linear switches.",
    features: [
      "Hot-swappable 3-pin and 5-pin mechanical switch sockets",
      "Multi-layer sound absorbing foam for deep, clean acoustic profile",
      "Double-shot PBT keycaps resistant to oil and friction fading",
      "Detachable braided Type-C cable"
    ],
    specs: [{ group: "Hardware", rows: [["Keys", "87 Keys TKL"], ["Switches", "Hot-swap Red/Linear"], ["Interface", "USB Type-C"]] }],
    images: ["assets/img/products/meetion-mk008-pro.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 40,
    isNew: true,
    price: { retail: 2850, compareAt: 3450, dealer: 2500, moq: 5, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: ["meetion-ikey-c210"]
  },

  {
    id: "meetion-btm012",
    sku: "SBC-MTN-BTM012",
    brand: "meetion",
    model: "BTM012",
    name: "Meetion BTM012 Dual-Mode Ergonomic Wireless Mouse",
    category: "peripherals-audio",
    subcategory: "Mice",
    tags: ["meetion", "wireless mouse", "bluetooth", "ergonomic"],
    attrs: { connectivity: "Bluetooth 5.0 + 2.4G Wireless", dpi: "Up to 2400 DPI", buttons: "Silent Click" },
    summary: "Ergonomic dual-mode wireless mouse connecting via Bluetooth and 2.4G nano receiver with silent clicks for office comfort.",
    features: ["Dual connectivity: easily switch between 2 laptops", "Whisper-quiet silent micro-switches", "Rechargeable internal lithium cell"],
    specs: [{ group: "Specs", rows: [["DPI Levels", "1000-1600-2400 DPI"], ["Battery", "Rechargeable 500 mAh"]] }],
    images: ["assets/img/products/meetion-btm012.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 70,
    isNew: false,
    price: { retail: 1450, compareAt: 1650, dealer: 1250, moq: 10, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["meetion-g3330", "meetion-ikey-c210"]
  },

  {
    id: "meetion-g3330",
    sku: "SBC-MTN-G3330",
    brand: "meetion",
    model: "MT-G3330",
    name: "Meetion MT-G3330 Hades RGB Gaming Mouse Ã¢â‚¬â€œ 7+1 Buttons, 10000 DPI, Professional Esports Mouse",
    category: "peripherals-audio",
    subcategory: "Mice",
    tags: ["meetion", "gaming mouse", "10000 dpi", "rgb", "esports"],
    attrs: { sensor: "PMW3325 Optical Sensor", dpi: "10,000 DPI", buttons: "7+1 Programmable" },
    summary: "Esports tournament-grade optical gaming mouse with PMW3325 sensor, 10,000 DPI resolution, RGB illumination, and 20M click switches.",
    features: ["Pixart PMW3325 gaming sensor with 100 IPS tracking", "7+1 programmable macro buttons with software profile saving", "Chroma RGB lighting with 16.8M colors"],
    specs: [{ group: "Sensor", rows: [["DPI Range", "200 to 10000 DPI"], ["Polling Rate", "1000 Hz (1ms)"]] }],
    images: ["assets/img/products/meetion-hp022.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 30,
    isNew: false,
    price: { retail: 2150, compareAt: 2450, dealer: 1850, moq: 10, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: false },
    alternatives: ["meetion-btm012"]
  },

  {
    id: "meetion-ikey-c210",
    sku: "SBC-MTN-C210",
    brand: "meetion",
    model: "iKey C210",
    name: "Meetion iKey C210 Wireless Ultra-thin Keyboard & Mouse Combo",
    category: "peripherals-audio",
    subcategory: "Combos",
    tags: ["meetion", "keyboard combo", "wireless combo", "slim"],
    attrs: { connectivity: "2.4G Nano USB Receiver", profile: "Ultra-thin Scissor Switch" },
    summary: "Ultra-slim wireless desktop keyboard and mouse combo with responsive scissor-switch keys and whisper-quiet operation.",
    features: ["Single 2.4G USB nano receiver for both keyboard and mouse", "Low-profile scissor key mechanisms for effortless typing", "Full numerical keypad"],
    specs: [{ group: "Hardware", rows: [["Connectivity", "2.4 GHz (10m range)"], ["Power", "AAA Batteries"]] }],
    images: ["assets/img/products/meetion-ikey-c210.webp"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 50,
    isNew: false,
    price: { retail: 2350, compareAt: 2650, dealer: 2050, moq: 10, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["meetion-mk008-pro"]
  },

  {
    id: "meetion-hp022",
    sku: "SBC-MTN-HP022",
    brand: "meetion",
    model: "MT-HP022",
    name: "Meetion MT-HP022 Noise-Cancelling RGB Wired Gaming Headset",
    category: "peripherals-audio",
    subcategory: "Headsets",
    tags: ["meetion", "headset", "gaming headphone", "noise cancelling"],
    attrs: { drivers: "50mm Neodymium", microphone: "Omnidirectional Noise-Cancelling", connection: "3.5mm + USB for RGB" },
    summary: "Over-ear gaming headset featuring 50mm dynamic drivers, breathable memory-foam ear cushions, and flexible noise-cancelling microphone.",
    features: ["50mm high-fidelity audio drivers delivering deep bass", "Noise-cancelling bendable microphone for clear voice calls", "Comfortable memory foam headband"],
    specs: [{ group: "Audio", rows: [["Driver Diameter", "50 mm"], ["Frequency Response", "20 Hz Ã¢â‚¬â€œ 20 kHz"]] }],
    images: ["assets/img/products/meetion-hp022.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 25,
    isNew: false,
    price: { retail: 1850, compareAt: 2150, dealer: 1600, moq: 10, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["solitine-se108-bar"]
  },

  {
    id: "solitine-se108-bar",
    sku: "SBC-SLT-SE108",
    brand: "solitine",
    model: "Enter SE108 Soundbar",
    name: "SOLITINE ENTER BAR SE108 Sound Bar Ã¢â‚¬â€œ 32W RMS with Subwoofer",
    category: "peripherals-audio",
    subcategory: "Soundbars & Speakers",
    tags: ["solitine", "soundbar", "speaker", "bluetooth speaker"],
    attrs: { power: "32W RMS", connectivity: "Bluetooth 5.3 / AUX / USB / Optical" },
    summary: "Desktop soundbar featuring 32W RMS stereo audio output with dedicated bass radiator, Bluetooth 5.3, and multi-input connectivity.",
    features: ["32W RMS rich acoustic output with dual full-range speakers", "Bluetooth 5.3 wireless streaming up to 10 meters", "Slim under-monitor desktop profile"],
    specs: [{ group: "Audio", rows: [["Output Power", "32W RMS"], ["Inputs", "Bluetooth, AUX 3.5mm, USB, Optical"]] }],
    images: ["assets/img/products/solitine-panel-24p.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "in-stock",
    stock: 20,
    isNew: true,
    price: { retail: 3450, compareAt: 3800, dealer: 3000, moq: 4, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["meetion-hp022"]
  },

  /* --------------------------------------------------------------------------
     10. COMPUTER ACCESSORIES
     -------------------------------------------------------------------------- */
  {
    id: "hkc-mb21v19f",
    sku: "SBC-HKC-MB21V",
    brand: "hkc",
    model: "MB21V19F",
    name: "HKC MB21V19F 21.45-inch Business Series Monitor",
    category: "computer-accessories",
    subcategory: "Monitors",
    tags: ["hkc", "monitor", "21.5 inch", "fhd", "ips"],
    attrs: { screenSize: "21.45-inch", panelType: "VA / Wide-View", resolution: "FHD (1920Ãƒâ€”1080)", refreshRate: "75 Hz", ports: "HDMI + VGA" },
    summary: "Frameless 21.45-inch Full HD business monitor with 75Hz refresh rate, low blue light eye protection, and HDMI/VGA video connectivity.",
    features: [
      "Crisp 1920Ãƒâ€”1080 Full HD resolution with 3000:1 high contrast ratio",
      "Three-sided micro-edge ultra-narrow bezel design",
      "Flicker-free and Low Blue Light eye-care certification",
      "Standard VESA 75Ãƒâ€”75mm wall-mount support"
    ],
    specs: [
      { group: "Display", rows: [["Panel Size", "21.45 Inches"], ["Resolution", "1920 Ãƒâ€” 1080 FHD"], ["Refresh Rate", "75 Hz"], ["Aspect Ratio", "16:9"]] },
      { group: "Connectivity", rows: [["Inputs", "1Ãƒâ€” HDMI 1.4, 1Ãƒâ€” VGA"], ["Power", "External DC 12V 2A"]] }
    ],
    images: ["assets/img/products/hkc-monitor.webp"],
    documents: [{ type: "datasheet", label: "HKC_MB21V19F_Specs.pdf", size: "1.9 MB", url: "#", demo: true }],
    warranty: "3 Years Official Warranty",
    status: "in-stock",
    stock: 18,
    isNew: false,
    price: { retail: 9200, compareAt: 9800, dealer: 8100, moq: 3, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: true, recommended: true },
    alternatives: []
  },

  {
    id: "solitine-psu-450",
    sku: "SBC-SLT-PSU450",
    brand: "solitine",
    model: "STN-RP450BZ",
    name: "Solitine STN-RP450BZ 450W 80 Plus Bronze Desktop Power Supply (Black)",
    category: "computer-accessories",
    subcategory: "Power Supplies",
    tags: ["solitine", "power supply", "psu", "450w", "80 plus bronze"],
    attrs: { wattage: "450W", efficiency: "80 Plus Bronze (up to 85%)", fanSize: "120mm Silent Hydraulic" },
    summary: "80 Plus Bronze certified 450W desktop power supply with active PFC, silent 120mm fan, and full electrical circuit protections.",
    features: [
      "80 Plus Bronze efficiency rating delivering up to 85% energy efficiency",
      "Active Power Factor Correction (APFC) for clean power delivery",
      "120mm low-noise thermally controlled cooling fan",
      "Full safety protections: OVP, UVP, SCP, OPP"
    ],
    specs: [{ group: "Electrical", rows: [["Continuous Power", "450W"], ["Form Factor", "ATX 12V"], ["Efficiency", "80 PLUS Bronze"]] }],
    images: ["assets/img/products/solitine-panel-24p.jpg"],
    documents: [{ type: "datasheet", label: "Solitine_PSU_450_Manual.pdf", size: "1.6 MB", url: "#", demo: true }],
    warranty: "2 Years Official Warranty",
    status: "in-stock",
    stock: 24,
    isNew: false,
    price: { retail: 3200, compareAt: null, dealer: 2810, moq: 5, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: []
  },

  /* --------------------------------------------------------------------------
     Additional SKUs to satisfy required status mix (Ã‚Â§12.5):
     - Ã¢â€°Â¥ 3 out-of-stock
     - Ã¢â€°Â¥ 3 low-stock
     - Ã¢â€°Â¥ 2 preorder
     -------------------------------------------------------------------------- */
  {
    id: "ubiquiti-u6-pro",
    sku: "SBC-UBQ-U6PRO",
    brand: "ubiquiti",
    model: "U6-Pro",
    name: "Ubiquiti UniFi 6 Pro Indoor/Outdoor Wi-Fi 6 Access Point",
    category: "wireless-outdoor",
    subcategory: "Indoor APs",
    tags: ["ubiquiti", "unifi", "u6", "wifi 6"],
    attrs: { wifiStandard: "Wi-Fi 6", poe: true, weatherProof: "IP54" },
    summary: "High-performance ceiling-mounted Wi-Fi 6 access point designed for large commercial offices and high-density environments.",
    features: ["5.3 Gbps aggregate throughput", "4Ãƒâ€”4 MU-MIMO and OFDMA", "PoE powered"],
    specs: [{ group: "Wireless", rows: [["Throughput", "5.3 Gbps"], ["Antenna", "Internal Omni"]] }],
    images: ["assets/img/products/mikrotik-cap-ac.webp"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "out-of-stock", // Out-of-stock #1 (Ã‚Â§12.5)
    stock: 0,
    isNew: false,
    price: { retail: 21500, compareAt: null, dealer: 18920, moq: 2, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["tenda-w15"]
  },

  {
    id: "rosenberger-cat6-lszh",
    sku: "SBC-RSB-C6LSZH",
    brand: "rosenberger",
    model: "CP11-111-21",
    name: "Rosenberger Cat.6 U/UTP 4-Pair LSZH Cable (305m)",
    category: "cabling-racks",
    subcategory: "Cat6 Cable",
    tags: ["rosenberger", "cat6", "lszh", "lan cable"],
    attrs: { category: "Cat6 U/UTP", jacket: "LSZH Low Smoke Zero Halogen", length: "305m" },
    summary: "Low Smoke Zero Halogen (LSZH) Cat6 solid copper data cable engineered for enterprise banking, hospital, and mission-critical fitouts.",
    features: ["Flame-retardant LSZH outer sheath", "Pure copper 23 AWG conductors", "Certified for high-density horizontal cabling"],
    specs: [{ group: "Cable", rows: [["Jacket", "LSZH Violet"], ["Standard", "ISO/IEC 11801"]] }],
    images: ["assets/img/products/dbc-c6-305m.webp"],
    documents: [],
    warranty: "25-Year System Warranty",
    status: "out-of-stock", // Out-of-stock #2 (Ã‚Â§12.5)
    stock: 0,
    isNew: false,
    price: { retail: 14800, compareAt: null, dealer: 13020, moq: 2, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["solitine-sol6156-or"]
  },

  {
    id: "phyhome-v2801sg",
    sku: "SBC-PHY-2801SG",
    brand: "phyhome",
    model: "V2801SG",
    name: "Phyhome V2801SG 1GE XPON Mini Bridge ONU",
    category: "fiber-pon",
    subcategory: "ONU/ONT",
    tags: ["phyhome", "onu", "xpon", "mini onu"],
    attrs: { ponType: "XPON", lanPorts: 1 },
    summary: "Ultra-compact single Gigabit port bridge XPON ONU designed for zero-loss routing through external Wi-Fi 6 gateways.",
    features: ["Small footprint bridge optical terminal", "Compatible with Huawei and ZTE OLTs", "Low power consumption"],
    specs: [{ group: "Optical", rows: [["Ports", "1Ãƒâ€” GE"], ["Standard", "ITU-T G.984"]] }],
    images: ["assets/img/products/vsol-v2801sg.jpg"],
    documents: [],
    warranty: "1 Year Official Warranty",
    status: "out-of-stock", // Out-of-stock #3 (Ã‚Â§12.5)
    stock: 0,
    isNew: false,
    price: { retail: 1350, compareAt: null, dealer: 1180, moq: 20, pack: 10, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["hsgq-x200dw"]
  },

  {
    id: "tenda-be19-ultra",
    sku: "SBC-TND-BE19U",
    brand: "tenda",
    model: "BE19 Ultra",
    name: "Tenda BE19 Ultra Tri-Band 10G Wi-Fi 7 Enterprise Router",
    category: "routers-wifi",
    subcategory: "Wi-Fi 7",
    tags: ["tenda", "wifi 7", "tri-band", "10g port", "flagship"],
    attrs: { wifiStandard: "Wi-Fi 7", speedClass: "BE19000", lanPorts: 4, wanPorts: 1 },
    summary: "Upcoming flagship tri-band Wi-Fi 7 router boasting dual 10G SFP+ ports and 320 MHz channels for future-proof connectivity.",
    features: ["Tri-band BE19000 speeds", "Dual 10-Gigabit ports", "Available for pre-order"],
    specs: [{ group: "Next-Gen", rows: [["Bandwidth", "320 MHz"], ["Speed", "19 Gbps Aggregate"]] }],
    images: ["assets/img/products/tenda-ax12-pro.jpg"],
    documents: [],
    warranty: "2 Years Official Warranty",
    status: "preorder", // Pre-order #1 (Ã‚Â§12.5)
    stock: 0,
    isNew: true,
    price: { retail: 34000, compareAt: 38000, dealer: 29920, moq: 1, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: true },
    alternatives: ["tenda-be12-pro"]
  },

  {
    id: "must-pv18-pro-solar",
    sku: "SBC-MST-PV18P",
    brand: "must",
    model: "PV18-5048-PRO",
    name: "Must PV18-5048 PRO 5.2kW Off-Grid High-Frequency Solar Inverter",
    category: "power-backup",
    subcategory: "Hybrid Solar Inverters",
    tags: ["must", "solar inverter", "off grid", "5.2kw"],
    attrs: { capacity: "5.2kW", pvInput: "450V DC", batteryVoltage: "48V DC" },
    summary: "Next-generation 5.2kW off-grid solar inverter with dual AC outputs and lithium battery cold-start function.",
    features: ["5200W pure sine wave output", "Can work without battery connected in daytime", "Available for pre-order shipment"],
    specs: [{ group: "Solar", rows: [["Rated Power", "5200W"], ["Solar Input", "450V Max"]] }],
    images: ["assets/img/products/must-ew2110-800.jpg"],
    documents: [],
    warranty: "2 Years Official Warranty",
    status: "preorder", // Pre-order #2 (Ã‚Â§12.5)
    stock: 0,
    isNew: true,
    price: { retail: 84000, compareAt: null, dealer: 73920, moq: 1, pack: 1, quoteOnly: false, demo: true },
    flags: { bestSeller: false, recommended: false },
    alternatives: ["must-ph91-5k"]
  }
];

