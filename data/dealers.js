/**
 * South Bangla Computers — Authorized Dealer & Retail Partner Registry
 *
 * ============================================================================
 * OPERATIONAL GUIDANCE FOR SOUTH BANGLA COMPUTERS ADMINISTRATORS
 * ============================================================================
 * 1. APPROVED DATA SOURCE:
 *    This registry stores verified retail outlets, partner showrooms, and authorized
 *    resellers where customers can inspect and purchase genuine Meetion and official
 *    South Bangla distributed hardware.
 *
 * 2. RECORD STRUCTURE & FIELD DEFINITIONS:
 *    - id                  : (string, required) Unique kebab-case slug (e.g., 'multiplan-showroom')
 *    - name                : (string, required) Full official business / showroom name
 *    - address             : (string, required) Complete physical address
 *    - division            : (string, required) Division name matching window.SBC_DATA.divisions
 *    - district            : (string, required) District name matching window.SBC_DATA.divisions[division]
 *    - locality            : (string, optional) Local area, market, or upazila name (e.g., 'Elephant Road')
 *    - latitude            : (number, optional) Decimal WGS84 latitude for GPS distance calculations
 *    - longitude           : (number, optional) Decimal WGS84 longitude for GPS distance calculations
 *    - phone               : (string, optional) Primary customer contact telephone number
 *    - phones              : (array, optional) Array of formatted phone strings
 *    - email               : (string, optional) Official inquiry email
 *    - openingHours        : (string, optional) Retail operating hours (e.g., 'Sat–Thu: 10AM–8PM')
 *    - verificationStatus  : (string, required) 'verified_outlet' | 'authorized_partner' | 'test_fixture'
 *    - authorizedBrands    : (array, required) Array of brands officially stocked (e.g., ['Meetion'])
 *    - productAvailability : (object, optional) Map of { [productId]: 'in_stock' | 'limited' | 'order_only' }
 *                            If null or omitted, UI strictly displays 'Confirmation Required'
 *    - active              : (boolean, required) Set to false to temporarily hide an outlet
 *    - isTestFixture       : (boolean, required) Set to true for dev/QA fixtures; false for live data
 *
 * 3. COORDINATE MAINTENANCE:
 *    Acquire valid decimal coordinates directly from Google Maps (Right-click map location -> copy lat/long).
 *    Do NOT enter fabricated coordinates. If coordinates are unavailable, leave latitude/longitude as null;
 *    the system will gracefully fall back to division/district area matching without showing false distances.
 * ============================================================================
 */

window.SBC_DATA = window.SBC_DATA || {};

window.SBC_DATA.dealers = [
  /* ==========================================================================
     VERIFIED LIVE OUTLETS & SOUTH BANGLA SHOWROOMS
     Official distribution locations with verified commercial contact data
     ========================================================================== */
  {
    id: "multiplan-showroom",
    name: "South Bangla Computers — Multiplan Showroom",
    address: "ECS Computer City, Multiplan Center, Shop #608-609, Level 6, New Elephant Road, Dhaka-1205",
    division: "Dhaka",
    district: "Dhaka",
    locality: "Elephant Road",
    latitude: 23.7389,
    longitude: 90.3860,
    phone: "+88 01678 040435",
    phones: ["+88 01678 040435", "+88 01746 175778"],
    email: "multiplan@southbanglabd.com",
    openingHours: "Saturday – Thursday: 10:00 AM – 8:00 PM (Closed Tuesday)",
    verificationStatus: "verified_outlet",
    authorizedBrands: ["Meetion", "Tenda", "Cisco", "HSGQ", "Tumtec"],
    productAvailability: {
      "meetion-btm012": "in_stock",
      "meetion-btm032r": "in_stock",
      "meetion-mk008": "in_stock",
      "meetion-ikey-c210": "in_stock",
      "meetion-vibekey-b68": "in_stock",
      "meetion-hp022": "in_stock",
      "meetion-h390": "in_stock",
      "meetion-sp2010": "in_stock",
      "meetion-sp2011": "in_stock",
      "meetion-u002": "in_stock"
    },
    active: true,
    isTestFixture: false
  },
  {
    id: "idb-showroom",
    name: "South Bangla Computers — IDB Bhabon Showroom",
    address: "E/8A, IDB Bhabon (Level-0, Shop No:SGR-22), Agargaon, Dhaka-1207",
    division: "Dhaka",
    district: "Dhaka",
    locality: "Agargaon",
    latitude: 23.7776,
    longitude: 90.3804,
    phone: "+88 01911 555181",
    phones: ["+88 01911-555181", "+88 01678-040438"],
    email: "idb@southbanglabd.com",
    openingHours: "Saturday – Thursday: 10:00 AM – 8:00 PM (Closed Sunday)",
    verificationStatus: "verified_outlet",
    authorizedBrands: ["Meetion", "Tenda", "Cisco", "HSGQ"],
    productAvailability: {
      "meetion-btm012": "in_stock",
      "meetion-btm032r": "in_stock",
      "meetion-mk008": "in_stock",
      "meetion-ikey-c210": "in_stock",
      "meetion-hp022": "in_stock"
    },
    active: true,
    isTestFixture: false
  },
  {
    id: "uttara-showroom",
    name: "South Bangla Computers — Uttara Showroom",
    address: "Plot #89, Syed Grand Center, Shop #74 (2nd Floor), Sector #07, Uttara, Dhaka-1230",
    division: "Dhaka",
    district: "Dhaka",
    locality: "Uttara",
    latitude: 23.8700,
    longitude: 90.3980,
    phone: "+88 01618 040437",
    phones: ["+88 01618040437", "+88 01721506417"],
    email: "uttara@southbanglabd.com",
    openingHours: "Saturday – Thursday: 10:00 AM – 8:00 PM",
    verificationStatus: "verified_outlet",
    authorizedBrands: ["Meetion", "Tenda", "Cisco"],
    productAvailability: {
      "meetion-btm012": "in_stock",
      "meetion-mk008": "in_stock",
      "meetion-vibekey-b68": "in_stock"
    },
    active: true,
    isTestFixture: false
  },
  {
    id: "head-office-hub",
    name: "South Bangla Computers — Central Head Office Collection Counter",
    address: "323, Akram Serenity, Level 5 & 6, Elephant Road, Dhaka-1205",
    division: "Dhaka",
    district: "Dhaka",
    locality: "Elephant Road",
    latitude: 23.7388,
    longitude: 90.3862,
    phone: "+88 01746 175778",
    phones: ["+88 01746175778", "+88 02-9667366"],
    email: "info@southbanglabd.com",
    openingHours: "Saturday – Thursday: 9:30 AM – 7:30 PM (Closed Friday)",
    verificationStatus: "verified_outlet",
    authorizedBrands: ["Meetion", "Tenda", "Cisco", "HSGQ", "Tumtec", "Must"],
    productAvailability: {
      "meetion-btm012": "in_stock",
      "meetion-btm032r": "in_stock",
      "meetion-mk008": "in_stock",
      "meetion-ikey-c210": "in_stock",
      "meetion-vibekey-b68": "in_stock",
      "meetion-hp022": "in_stock",
      "meetion-h390": "in_stock",
      "meetion-sp2010": "in_stock",
      "meetion-sp2011": "in_stock",
      "meetion-u002": "in_stock"
    },
    active: true,
    isTestFixture: false
  },
  {
    id: "chattogram-showroom",
    name: "South Bangla Computers — Chattogram Regional Showroom",
    address: "1401, Johara Tower, S.K. Mujib Road, Agrabad, Chittagong-4100",
    division: "Chattogram",
    district: "Chattogram",
    locality: "Agrabad Commercial Area",
    latitude: 22.3274,
    longitude: 91.8122,
    phone: "+88 031 257911",
    phones: ["+88 031-257911", "+88 01678-040445"],
    email: "ctg@southbanglabd.com",
    openingHours: "Saturday – Thursday: 10:00 AM – 7:30 PM (Closed Friday)",
    verificationStatus: "verified_outlet",
    authorizedBrands: ["Meetion", "Tenda", "Cisco", "HSGQ", "Tumtec"],
    productAvailability: {
      "meetion-btm012": "in_stock",
      "meetion-btm032r": "in_stock",
      "meetion-mk008": "in_stock",
      "meetion-ikey-c210": "in_stock"
    },
    active: true,
    isTestFixture: false
  },
  {
    id: "khulna-showroom",
    name: "South Bangla Computers — Khulna Regional Showroom",
    address: "37 Sir Iqbal Road, Fatema Garden (2nd Floor), Press Club, Khulna",
    division: "Khulna",
    district: "Khulna",
    locality: "Sir Iqbal Road",
    latitude: 22.8120,
    longitude: 89.5645,
    phone: "+88 01611 500112",
    phones: ["+88 01611500112"],
    email: "khulna@southbanglabd.com",
    openingHours: "Saturday – Thursday: 10:00 AM – 7:30 PM (Closed Friday)",
    verificationStatus: "verified_outlet",
    authorizedBrands: ["Meetion", "Tenda", "Cisco"],
    productAvailability: {
      "meetion-btm012": "in_stock",
      "meetion-mk008": "in_stock"
    },
    active: true,
    isTestFixture: false
  },

  /* ==========================================================================
     DEVELOPMENT TEST FIXTURES (CLEARLY LABELED AS TEST FIXTURES)
     Used solely to test cross-division filtering and distance calculations in
     regions where independent partner dealers are undergoing accreditation.
     ========================================================================== */
  {
    id: "fixture-rajshahi-hub",
    name: "[TEST FIXTURE] Rajshahi Tech Pavilion (Accreditation Pending)",
    address: "Sample IT Market (Development Test Record — Not a verified commercial partner)",
    division: "Rajshahi",
    district: "Rajshahi",
    locality: "Shaheb Bazar",
    latitude: 24.3636,
    longitude: 88.6241,
    phone: "+88 01988 813201",
    phones: ["+88 01988-813201"],
    email: "support@southbanglabd.com",
    openingHours: "Saturday – Thursday: 10:00 AM – 7:00 PM",
    verificationStatus: "test_fixture",
    authorizedBrands: ["Meetion"],
    productAvailability: null,
    active: true,
    isTestFixture: true
  },
  {
    id: "fixture-sylhet-point",
    name: "[TEST FIXTURE] Sylhet Peripheral Point (Accreditation Pending)",
    address: "Sample Zindabazar Hub (Development Test Record — Not a verified commercial partner)",
    division: "Sylhet",
    district: "Sylhet",
    locality: "Zindabazar",
    latitude: 24.8949,
    longitude: 91.8687,
    phone: "+88 01988 813201",
    phones: ["+88 01988-813201"],
    email: "support@southbanglabd.com",
    openingHours: "Saturday – Thursday: 10:00 AM – 7:00 PM",
    verificationStatus: "test_fixture",
    authorizedBrands: ["Meetion"],
    productAvailability: null,
    active: true,
    isTestFixture: true
  }
];
