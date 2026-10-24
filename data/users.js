/**
 * Demo Users & Credentials
 * Blueprint §7 P13, P24, §12.6
 */
window.SBC_DATA = window.SBC_DATA || {};
window.SBC_DATA.users = {
  customer: {
    email: "customer@demo.sbc",
    password: "Demo@1234",
    name: "Sohag Hossen",
    phone: "01712345678",
    type: "customer",
    addresses: [
      {
        id: "addr-1",
        label: "Office",
        name: "Sohag Hossen",
        phone: "01712345678",
        division: "Dhaka",
        district: "Dhaka",
        area: "Dhanmondi",
        address: "House 42, Road 9/A, Dhanmondi, Dhaka-1209",
        isDefault: true
      }
    ]
  },
  dealer: {
    email: "dealer@demo.sbc",
    password: "Dealer@1234",
    name: "Kamrul Hasan",
    phone: "01812345678",
    type: "dealer",
    businessName: "Delta Networking Solutions",
    businessType: "Reseller / System Integrator",
    tradeLicense: "TRAD/DSCC/019283/2021",
    tin: "518294029182",
    status: "approved", // approved | pending | rejected | more_info
    accountManager: {
      name: "SBC Enterprise Desk",
      phone: "+88 09639 257 121",
      email: "dealer-desk@southbanglabd.com"
    },
    tier: "Tier 1 Partner",
    discountPercent: 12
  }
};
