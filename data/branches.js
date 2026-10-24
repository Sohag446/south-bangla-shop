/**
 * Branches and Support Centers
 * Blueprint §3, §7 P44, verified from live website
 */
window.SBC_DATA = window.SBC_DATA || {};
window.SBC_DATA.branches = [
  {
    id: "head-office",
    name: "Head Office",
    type: "office",
    city: "Dhaka",
    address: "323, Akram Serenity, Level 5 & 6, Elephant Road, Dhaka-1205",
    phones: ["+88 01746175778", "+88 02-9667366"],
    email: "info@southbanglabd.com",
    hours: "Saturday – Thursday: 9:30 AM – 7:30 PM",
    isPickup: true
  },
  {
    id: "support-center",
    name: "Central Support Center",
    type: "support",
    city: "Dhaka",
    address: "323, Akram Serenity, Level 6, Elephant Road, Dhaka-1205",
    phones: ["+88 01631-074824", "+88 01988-813201"],
    email: "support@southbanglabd.com",
    hours: "12 Hours Support Service: 9:00 AM – 9:00 PM (Daily)",
    isPickup: false
  },
  {
    id: "warehouse",
    name: "Central Warehouse",
    type: "warehouse",
    city: "Dhaka",
    address: "143/1 Hazaribagh Road, Dhaka-1209",
    phones: ["01717147306", "01911168123"],
    email: "warehouse@southbanglabd.com",
    hours: "Saturday – Thursday: 9:00 AM – 6:00 PM",
    isPickup: false
  },
  {
    id: "multiplan-showroom",
    name: "Multiplan Showroom",
    type: "showroom",
    city: "Dhaka",
    address: "ECS Computer City, Multiplan Center, Shop #608-609, Level 6, New Elephant Road, Dhaka-1205",
    phones: ["+88 01678 040435"],
    email: "multiplan@southbanglabd.com",
    hours: "Saturday – Thursday: 10:00 AM – 8:00 PM (Closed Tuesday)",
    isPickup: true
  },
  {
    id: "idb-showroom",
    name: "IDB Bhabon Showroom",
    type: "showroom",
    city: "Dhaka",
    address: "E/8A, IDB Bhabon (Level-0, Shop No:SGR-22), Agargaon, Dhaka-1207",
    phones: ["+88 01911-555181", "+88 01678-040438"],
    email: "idb@southbanglabd.com",
    hours: "Saturday – Thursday: 10:00 AM – 8:00 PM (Closed Sunday)",
    isPickup: true
  },
  {
    id: "uttara-showroom",
    name: "Uttara Showroom",
    type: "showroom",
    city: "Dhaka",
    address: "Plot #89, Syed Grand Center, Shop #74 (2nd Floor), Sector #07, Uttara, Dhaka-1230",
    phones: ["+88 01618040437", "+88 01721506417"],
    email: "uttara@southbanglabd.com",
    hours: "Saturday – Thursday: 10:00 AM – 8:00 PM",
    isPickup: true
  },
  {
    id: "chittagong-showroom",
    name: "Chattogram Showroom",
    type: "showroom",
    city: "Chattogram",
    address: "1401, Johara Tower, S.K. Mujib Road, Agrabad, Chittagong-4100",
    phones: ["+88 031-257911", "+88 01678-040445"],
    email: "ctg@southbanglabd.com",
    hours: "Saturday – Thursday: 10:00 AM – 7:30 PM",
    isPickup: true
  },
  {
    id: "khulna-showroom",
    name: "Khulna Showroom",
    type: "showroom",
    city: "Khulna",
    address: "37 Sir Iqbal Road, Fatema Garden (2nd Floor), Press Club, Khulna",
    phones: ["+88 01611500112"],
    email: "khulna@southbanglabd.com",
    hours: "Saturday – Thursday: 10:00 AM – 7:30 PM",
    isPickup: true
  },
  /* Announced new support centers from the live site notice */
  {
    id: "kushtia-support",
    name: "Kushtia Support Center",
    type: "support",
    city: "Kushtia",
    address: "Details coming soon (Newly announced center)",
    phones: ["+88 01988-813201"],
    email: "support@southbanglabd.com",
    hours: "Opening Soon",
    isPickup: false,
    announced: true
  },
  {
    id: "sylhet-support",
    name: "Sylhet Support Center",
    type: "support",
    city: "Sylhet",
    address: "Details coming soon (Newly announced center)",
    phones: ["+88 01988-813201"],
    email: "support@southbanglabd.com",
    hours: "Opening Soon",
    isPickup: false,
    announced: true
  },
  {
    id: "comilla-support",
    name: "Comilla Support Center",
    type: "support",
    city: "Comilla",
    address: "Details coming soon (Newly announced center)",
    phones: ["+88 01988-813201"],
    email: "support@southbanglabd.com",
    hours: "Opening Soon",
    isPickup: false,
    announced: true
  },
  {
    id: "rajshahi-support",
    name: "Rajshahi Support Center",
    type: "support",
    city: "Rajshahi",
    address: "Details coming soon (Newly announced center)",
    phones: ["+88 01988-813201"],
    email: "support@southbanglabd.com",
    hours: "Opening Soon",
    isPickup: false,
    announced: true
  }
];

window.SBC_DATA.supportTeams = {
  support: {
    title: "Support Team",
    phones: ["+88 01988 813 201", "+88 01988 813 202", "+88 01988 813 205"]
  },
  sales: {
    title: "Sales Team",
    phones: ["+88 09639 257 121", "+88 09639 257 122"]
  },
  marketing: {
    title: "Marketing Team",
    phones: ["+88 01988 813 204"]
  }
};
