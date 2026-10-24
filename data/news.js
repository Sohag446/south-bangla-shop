/**
 * News, Articles and Buying Guides
 * Blueprint §7 P40, §7 P41, §12.6
 */
window.SBC_DATA = window.SBC_DATA || {};
window.SBC_DATA.news = [
  {
    id: "optical-network-unit-buying-guide",
    title: "What is an ONU? Features, Benefits & Complete Buying Guide (2026)",
    slug: "optical-network-unit-buying-guide",
    date: "2026-08-03",
    author: "SBC Engineering Editorial",
    category: "Buying Guide",
    badge: "Buying Guide",
    image: "assets/img/products/vsol-v2801sg.jpg",
    excerpt: "As Fiber-to-the-Home (FTTH) technology becomes the standard for high-speed broadband in Bangladesh, Optical Network Units (ONUs) serve as the essential bridge between optical distribution and customer premises.",
    readTime: "5 min read",
    content: `
      <h2>Introduction to Optical Network Units (ONUs)</h2>
      <p>An Optical Network Unit (ONU) is the subscriber-side terminal in a Passive Optical Network (PON) architecture. Connected directly to single-mode fiber dropped from a localized optical splitter, the ONU transforms optical light impulses into conventional Ethernet electrical signals suitable for routers, switches, and client computers.</p>
      
      <h2>GPON vs. EPON vs. XPON: What to Choose?</h2>
      <p>Modern internet service providers (ISPs) in Bangladesh increasingly deploy <strong>XPON (Dual-mode)</strong> ONUs. Dual-mode devices automatically sense whether the upstream Optical Line Terminal (OLT) operates on Gigabit PON (GPON, ITU-T G.984) or Ethernet PON (EPON, IEEE 802.3ah), reducing inventory complexity for installers.</p>
      
      <h2>Single-Band vs. Dual-Band Wi-Fi ONUs</h2>
      <p>While basic bridge ONUs feature a single Gigabit LAN port designed to plug into a dedicated standalone Wi-Fi router, integrated Wi-Fi 5 and Wi-Fi 6 ONUs (such as the HSGQ-X200DW or Tenda HG10C) combine optical termination and wireless coverage into one cost-effective enclosure.</p>
      
      <h2>Key Factors When Buying an ONU</h2>
      <ul>
        <li><strong>Chipset Compatibility:</strong> Ensure broad interoperability with major OLT brands including HSGQ, Huawei, ZTE, and VSOL.</li>
        <li><strong>Port Configuration:</strong> Look for Gigabit Ethernet ports (GE) rather than legacy Fast Ethernet (FE) to support 100+ Mbps bandwidth tiers.</li>
        <li><strong>Optical Sensitivity:</strong> Optimal receive sensitivity of -28 dBm ensures stable link margins across extended ODN distribution lines.</li>
      </ul>
    `,
    relatedProducts: ["hsgq-x200dw", "hsgq-x421dw", "tenda-hg10c"]
  },
  {
    id: "optical-line-terminal-buying-guide",
    title: "What is an OLT? How Optical Line Terminal Works & Complete Buying Guide (2026)",
    slug: "optical-line-terminal-buying-guide",
    date: "2026-08-03",
    author: "SBC Engineering Editorial",
    category: "Buying Guide",
    badge: "Buying Guide",
    image: "assets/img/home/cat_network_switches.jpg",
    excerpt: "As Fiber-to-the-Home (FTTH) and Fiber-to-the-Business (FTTB) deployments continue to expand, Optical Line Terminal (OLT) equipment anchors the central office distribution backbone.",
    readTime: "7 min read",
    content: `
      <h2>The Core of Passive Optical Networking</h2>
      <p>The Optical Line Terminal (OLT) serves as the primary endpoint in a passive optical network. Situated at the ISP central office, server room, or regional point of presence (POP), the OLT converts high-capacity IP upstream traffic into optical signals distributed across optical splitters to hundreds or thousands of client ONUs.</p>
      
      <h2>Port Density and Split Ratios</h2>
      <p>Standard GPON OLTs support a 1:128 optical split ratio per PON port. A compact 4-Port OLT can serve up to 512 subscribers, while an 8-Port or 16-Port rackmount unit scales to 1,024 or 2,048 optical drops, delivering unprecedented transmission efficiency.</p>
      
      <h2>Redundancy and Power Backing</h2>
      <p>For ISP operations requiring 99.99% uptime, dual AC/DC hot-swappable power supplies and 10G SFP+ uplink ports are critical for handling peak traffic without packet degradation.</p>
    `,
    relatedProducts: ["hsgq-g04r", "hsgq-g08r", "solitine-10g-sr"]
  },
  {
    id: "media-converter-buying-guide",
    title: "What is a Media Converter? Types, Benefits & Complete Buying Guide (2026)",
    slug: "media-converter-buying-guide",
    date: "2026-08-03",
    author: "SBC Engineering Editorial",
    category: "Buying Guide",
    badge: "Buying Guide",
    image: "assets/img/home/cat_fiber_optic.jpg",
    excerpt: "Connecting legacy copper Ethernet infrastructure with modern long-distance fiber optic cabling requires reliable, low-latency optical media converters.",
    readTime: "4 min read",
    content: `
      <h2>Bridging Copper and Glass</h2>
      <p>While standard Cat6 twisted-pair copper cable is constrained to a 100-meter physical transmission limit, fiber optic media converters allow network administrators to extend Ethernet networks over distances ranging from 550 meters up to 20, 40, or 80 kilometers.</p>
      
      <h2>Single-Fiber vs. Dual-Fiber (WDM)</h2>
      <p>Bi-directional WDM media converters utilize wavelength division multiplexing (Tx 1310nm / Rx 1550nm) to transmit and receive data over a single optical strand, immediately cutting fiber core leasing costs in half.</p>
    `,
    relatedProducts: ["solitine-10g-sr", "solitine-sol6156-or", "tenda-teg1024d"]
  },
  {
    id: "wifi-7-vs-wifi-6-enterprise-guide",
    title: "Wi-Fi 7 vs Wi-Fi 6: Which Standard Does Your Office Need in 2026?",
    slug: "wifi-7-vs-wifi-6-enterprise-guide",
    date: "2026-09-12",
    author: "SBC Engineering Editorial",
    category: "Tech Analysis",
    badge: "Technology",
    image: "assets/img/slider/tenda-be12-pro-wifi7.png",
    excerpt: "With the arrival of Wi-Fi 7 routers like the Tenda BE12 Pro, IT leaders face a choice between mature Wi-Fi 6 infrastructure and ultra-wide 320 MHz Wi-Fi 7 channels.",
    readTime: "6 min read",
    content: `
      <h2>The Generational Leap to Wi-Fi 7 (802.11be)</h2>
      <p>Wi-Fi 7 introduces Multi-Link Operation (MLO), enabling client devices to transmit and receive data simultaneously across both 2.4 GHz and 5 GHz frequency bands. This drastically eliminates latency spikes during live video conferencing and high-density office use.</p>
      
      <h2>Evaluating Office Deployment Costs</h2>
      <p>While Wi-Fi 6 remains exceptionally cost-effective for standard SOHO environments, tech companies and media design firms with hundreds of active laptops benefit immediately from the superior channel throughput of Wi-Fi 7.</p>
    `,
    relatedProducts: ["tenda-be12-pro", "tenda-ax12-pro", "tenda-w15"]
  },
  {
    id: "isp-power-backup-solutions",
    title: "Designing Fault-Tolerant Power Backup for ISP POP Sites with Hybrid Inverters",
    slug: "isp-power-backup-solutions",
    date: "2026-09-28",
    author: "SBC Technical Solutions",
    category: "Solutions",
    badge: "Power Solutions",
    image: "assets/img/home/cat_ups_power.jpg",
    excerpt: "Grid fluctuations and prolonged load shedding demand reliable online UPS and solar hybrid inverters paired with high-cycle LiFePO4 battery banks.",
    readTime: "6 min read",
    content: `
      <h2>Zero Transfer Time: Why Online UPS Matters</h2>
      <p>Optical transmitters and managed L3 core switches are highly sensitive to voltage surges and millisecond micro-outages. True online double-conversion UPS systems from Must and Marsriva provide pristine pure sine wave AC output with zero switching delay.</p>
      
      <h2>The Economics of LiFePO4 Lithium Batteries</h2>
      <p>Compared to traditional lead-acid batteries that degrade within 18 months, 48V 100Ah LiFePO4 batteries deliver over 4,000 charge cycles, withstanding daily thermal cycling without capacity decay.</p>
    `,
    relatedProducts: ["must-eh55-h1ksl", "must-lp16-48100", "must-ph91-5k"]
  },
  {
    id: "fiber-splicing-best-practices",
    title: "Fiber Optic Splicing Best Practices: Low-Loss Cleaving and Maintenance",
    slug: "fiber-splicing-best-practices",
    date: "2026-10-10",
    author: "SBC Fiber Lab",
    category: "Tutorial",
    badge: "Field Engineering",
    image: "assets/img/home/prod_fiber_patch_cord.jpg",
    excerpt: "Achieving splice losses below 0.02 dB requires rigorous cable preparation, dust-free V-groove maintenance, and high-precision automatic cleavers.",
    readTime: "5 min read",
    content: `
      <h2>Precision Cleaving: The First Step</h2>
      <p>Over 80% of optical fusion splice failures originate from poor fiber cleave angles. Using precision one-step tools like the Tumtec A9+ ensures cleave angles consistently below 0.5 degrees, allowing core-alignment splicers like the Tumtec FST-18S to complete flawless joints.</p>
    `,
    relatedProducts: ["tumtec-fst18s", "tumtec-a9plus", "solitine-power-meter"]
  }
];
