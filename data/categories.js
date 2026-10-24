/**
 * Categories Taxonomy
 * Blueprint §12.2
 */
window.SBC_DATA = window.SBC_DATA || {};
window.SBC_DATA.categories = [
  {
    slug: "routers-wifi",
    name: "Routers & Wi-Fi",
    description: "High-performance Wi-Fi 7, Wi-Fi 6, mesh systems, and enterprise routers for home and business.",
    icon: "wifi",
    subcategories: ["Wi-Fi 7", "Wi-Fi 6", "Wi-Fi 5", "Mesh Systems", "Range Extenders", "USB Adapters"]
  },
  {
    slug: "switches",
    name: "Switches & PoE",
    description: "Gigabit unmanaged, cloud-managed, and Layer 3 PoE switches for seamless network distribution.",
    icon: "layers",
    subcategories: ["Unmanaged", "Smart/Cloud Managed", "Managed L3", "PoE Switches", "2.5G/10G", "PoE Injectors"]
  },
  {
    slug: "fiber-pon",
    name: "Fiber, PON & ONU",
    description: "FTTH access solutions including GPON/EPON ONUs, OLT terminals, and optical transceivers.",
    icon: "share-2",
    subcategories: ["ONU/ONT", "OLT", "SFP/QSFP Modules", "Splitters"]
  },
  {
    slug: "wireless-outdoor",
    name: "Access Points & Outdoor",
    description: "Enterprise ceiling, in-wall, and long-range outdoor PtP/CPE wireless connectivity.",
    icon: "radio",
    subcategories: ["Indoor APs", "In-wall APs", "Outdoor CPE/PtP", "AP Controllers"]
  },
  {
    slug: "security-cctv",
    name: "CCTV & Security",
    description: "High-definition IP cameras, smart Wi-Fi cameras, and network video recorders (NVR).",
    icon: "video",
    subcategories: ["NVR", "IP Cameras", "Wi-Fi Cameras"]
  },
  {
    slug: "power-backup",
    name: "Power & Backup",
    description: "Online UPS, line-interactive backup, hybrid solar inverters, and durable LiFePO4 batteries.",
    icon: "zap",
    subcategories: ["Online UPS", "Line-interactive UPS", "Hybrid Solar Inverters", "LiFePO4 Batteries", "Power Stations", "Mini DC UPS"]
  },
  {
    slug: "cabling-racks",
    name: "Cabling & Racks",
    description: "Solid copper Cat6 network cables, patch panels, patch cords, and wall-mount server racks.",
    icon: "server",
    subcategories: ["Cat6 Cable", "Patch Cords", "Patch Panels", "Keystone/Face Plates", "Racks"]
  },
  {
    slug: "fiber-tools",
    name: "Fiber Tools",
    description: "Optical fusion splicers, precision cleavers, strippers, and optical power testers.",
    icon: "tool",
    subcategories: ["Fusion Splicers", "Cleavers", "Strippers", "Power Meters & Testers"]
  },
  {
    slug: "peripherals-audio",
    name: "Peripherals & Audio",
    description: "Mechanical keyboards, ergonomic mice, gaming headsets, and desktop soundbars.",
    icon: "headphones",
    subcategories: ["Keyboards", "Mice", "Combos", "Headsets", "Soundbars & Speakers"]
  },
  {
    slug: "computer-accessories",
    name: "Computer Accessories",
    description: "Business monitors, 80 Plus power supplies, and essential computing accessories.",
    icon: "monitor",
    subcategories: ["Monitors", "Power Supplies"]
  }
];
