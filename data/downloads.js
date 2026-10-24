/**
 * Downloads & Firmware Data
 * Blueprint §7 P34, §12.6
 */
window.SBC_DATA = window.SBC_DATA || {};
window.SBC_DATA.downloads = [
  /* Routers */
  {
    id: "dl-tenda-ax12pro-fw",
    category: "router",
    brand: "Tenda",
    model: "AX12 Pro",
    title: "Tenda AX12 Pro Official Firmware Update",
    type: "Firmware",
    version: "V16.03.32.06_multi",
    size: "14.2 MB",
    date: "2026-06-15",
    url: null
  },
  {
    id: "dl-tenda-ax12pro-ds",
    category: "router",
    brand: "Tenda",
    model: "AX12 Pro",
    title: "Tenda AX12 Pro Technical Datasheet & Specifications",
    type: "Datasheet",
    version: "Rev 2.1",
    size: "2.8 MB",
    date: "2026-05-10",
    url: null
  },
  {
    id: "dl-tenda-be12pro-fw",
    category: "router",
    brand: "Tenda",
    model: "BE12 Pro",
    title: "Tenda BE12 Pro Wi-Fi 7 Baseline Firmware Release",
    type: "Firmware",
    version: "V1.0.0.12_EN",
    size: "21.6 MB",
    date: "2026-08-20",
    url: null
  },
  {
    id: "dl-tenda-tx2lpro-fw",
    category: "router",
    brand: "Tenda",
    model: "TX2L Pro",
    title: "Tenda TX2L Pro Dual-Band Wi-Fi 6 Firmware",
    type: "Firmware",
    version: "V16.03.28.14",
    size: "12.8 MB",
    date: "2026-04-12",
    url: null
  },

  /* ONU */
  {
    id: "dl-hsgq-x200dw-fw",
    category: "onu",
    brand: "HSGQ",
    model: "HSGQ-X200DW",
    title: "HSGQ-X200DW XPON 1200M Wi-Fi ONU Firmware",
    type: "Firmware",
    version: "V3.1.8_build2605",
    size: "8.4 MB",
    date: "2026-05-30",
    url: null
  },
  {
    id: "dl-hsgq-x421dw-fw",
    category: "onu",
    brand: "HSGQ",
    model: "HSGQ-X421DW",
    title: "HSGQ-X421DW 4GE+2POTS XPON ONU Firmware",
    type: "Firmware",
    version: "V3.2.0_VOIP",
    size: "10.1 MB",
    date: "2026-07-14",
    url: null
  },
  {
    id: "dl-tenda-hg10c-fw",
    category: "onu",
    brand: "Tenda",
    model: "HG10C",
    title: "Tenda HG10C AC1200 Wi-Fi 5 XPON ONT Firmware",
    type: "Firmware",
    version: "V1.1.2_multi",
    size: "9.6 MB",
    date: "2026-03-22",
    url: null
  },
  {
    id: "dl-hsgq-onu-ds",
    category: "onu",
    brand: "HSGQ",
    model: "HSGQ-X200DW",
    title: "HSGQ Optical Network Unit Specification Sheet",
    type: "Datasheet",
    version: "2026 Ed.",
    size: "1.9 MB",
    date: "2026-02-18",
    url: null
  },

  /* Switches */
  {
    id: "dl-tenda-teg2210p-fw",
    category: "switch",
    brand: "Tenda",
    model: "TEG2210P-8-120W",
    title: "TEG2210P Cloud Management Firmware",
    type: "Firmware",
    version: "V1.0.0.19",
    size: "6.2 MB",
    date: "2026-06-01",
    url: null
  },
  {
    id: "dl-ipcom-g1128p-fw",
    category: "switch",
    brand: "IP-COM",
    model: "G1128P-24-250W",
    title: "IP-COM G1128P PoE Switch Management Software",
    type: "Firmware",
    version: "V1.0.1.04",
    size: "7.8 MB",
    date: "2026-04-05",
    url: null
  },
  {
    id: "dl-solitine-sol3012x-ds",
    category: "switch",
    brand: "Solitine",
    model: "SOL-3012X",
    title: "Solitine SOL-3012X 12-Port 10G SFP+ Switch Datasheet",
    type: "Datasheet",
    version: "Rev 1.4",
    size: "2.3 MB",
    date: "2026-05-18",
    url: null
  },
  {
    id: "dl-cisco-c9200l-ds",
    category: "switch",
    brand: "Cisco",
    model: "C9200L-24P-4X-E",
    title: "Cisco Catalyst 9200 Series Switch Technical Data",
    type: "Datasheet",
    version: "Global v3",
    size: "4.5 MB",
    date: "2026-01-15",
    url: null
  },

  /* Outdoor & CPE */
  {
    id: "dl-tenda-o9-fw",
    category: "outdoor",
    brand: "Tenda",
    model: "O9",
    title: "Tenda O9 5GHz 23dBi Gigabit Outdoor CPE Firmware",
    type: "Firmware",
    version: "V1.0.0.8(293)",
    size: "8.7 MB",
    date: "2026-07-02",
    url: null
  },
  {
    id: "dl-tenda-oap1200-fw",
    category: "outdoor",
    brand: "Tenda",
    model: "OAP1200",
    title: "Tenda OAP1200 Dual-Band Outdoor AP Firmware",
    type: "Firmware",
    version: "V1.0.0.14",
    size: "9.1 MB",
    date: "2026-04-18",
    url: null
  },
  {
    id: "dl-ipcom-iuap-ds",
    category: "outdoor",
    brand: "IP-COM",
    model: "iUAP-AC-M",
    title: "IP-COM iUAP-AC-M Outdoor Mesh AP Product Manual",
    type: "User Manual",
    version: "V2.0",
    size: "3.2 MB",
    date: "2026-03-10",
    url: null
  },
  {
    id: "dl-tenda-cpe-guide",
    category: "outdoor",
    brand: "Tenda",
    model: "O9",
    title: "PtP Point-to-Point Wireless Alignment Installation Guide",
    type: "Quick Guide",
    version: "1.0",
    size: "1.5 MB",
    date: "2026-02-12",
    url: null
  },

  /* Security & Camera */
  {
    id: "dl-tenda-tn3108-fw",
    category: "security",
    brand: "Tenda",
    model: "TN3108-8P",
    title: "Tenda TN3108 8-Channel PoE UHD NVR System Firmware",
    type: "Firmware",
    version: "V1.1.0.18",
    size: "18.5 MB",
    date: "2026-08-01",
    url: null
  },
  {
    id: "dl-tenda-tc3b24c-fw",
    category: "security",
    brand: "Tenda",
    model: "TC3B24C",
    title: "Tenda TC3B24C 4MP Smart Bullet Camera Firmware",
    type: "Firmware",
    version: "V1.0.2.22",
    size: "11.4 MB",
    date: "2026-06-25",
    url: null
  },
  {
    id: "dl-tenda-ch7wca-ds",
    category: "security",
    brand: "Tenda",
    model: "CH7-WCA",
    title: "Tenda CH7-WCA Outdoor Wi-Fi Pan/Tilt Camera Specs",
    type: "Datasheet",
    version: "Rev 1.2",
    size: "2.1 MB",
    date: "2026-05-15",
    url: null
  },
  {
    id: "dl-tenda-nvr-manual",
    category: "security",
    brand: "Tenda",
    model: "TN3108-8P",
    title: "PoE NVR Security Surveillance Setup Manual",
    type: "User Manual",
    version: "V3.0",
    size: "5.6 MB",
    date: "2026-04-10",
    url: null
  },

  /* Access Point */
  {
    id: "dl-tenda-w15-fw",
    category: "access-point",
    brand: "Tenda",
    model: "W15",
    title: "Tenda W15 AX3000 In-Wall Access Point Firmware",
    type: "Firmware",
    version: "V1.0.0.15",
    size: "10.8 MB",
    date: "2026-07-28",
    url: null
  },
  {
    id: "dl-cisco-c9115-ds",
    category: "access-point",
    brand: "Cisco",
    model: "C9115AXI-EWC",
    title: "Cisco Catalyst 9115 Series Wi-Fi 6 AP Datasheet",
    type: "Datasheet",
    version: "Rel 26.1",
    size: "3.8 MB",
    date: "2026-02-20",
    url: null
  },
  {
    id: "dl-tenda-ap-controller-manual",
    category: "access-point",
    brand: "Tenda",
    model: "W15",
    title: "Centralized Access Point Management Guide",
    type: "User Manual",
    version: "V2.2",
    size: "4.1 MB",
    date: "2026-03-15",
    url: null
  },
  {
    id: "dl-ipcom-ap-guide",
    category: "access-point",
    brand: "IP-COM",
    model: "iUAP-AC-M",
    title: "Hotel & Enterprise Wi-Fi In-Wall Deployment Guide",
    type: "Quick Guide",
    version: "1.1",
    size: "1.8 MB",
    date: "2026-01-25",
    url: null
  }
];
