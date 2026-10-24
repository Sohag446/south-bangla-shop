/**
 * FAQ Data (20 items grouped)
 * Blueprint §7 P33, §12.6
 */
window.SBC_DATA = window.SBC_DATA || {};
window.SBC_DATA.faqs = [
  /* Ordering */
  {
    category: "Ordering",
    question: "How can retail customers place an order on South Bangla Computers?",
    answer: "You can browse our networking catalog, select products, and click 'Add to Cart' or 'Request Quote'. For simulated checkout in this prototype, simply proceed to checkout and select your preferred payment mode.",
    draft: true
  },
  {
    category: "Ordering",
    question: "Can I request a commercial quotation for bulk or project quantities?",
    answer: "Yes. Every product card and detail page supports 'Request Quote'. You can also use our Network Solution Configurator to build a comprehensive bill of materials and submit a project quote.",
    draft: true
  },
  {
    category: "Ordering",
    question: "What does 'Quote Only' mean on certain enterprise products?",
    answer: "High-end enterprise switches, OLTs, and fusion splicers often require customized technical staging and volume pricing. Clicking 'Request Quote' connects you directly to our solution engineers.",
    draft: true
  },
  {
    category: "Ordering",
    question: "Do retail prices displayed include VAT?",
    answer: "Prices displayed in the prototype are simulated representative values. Real invoices from South Bangla Computers are issued with standard VAT registration pursuant to Bangladesh NBR regulations.",
    draft: true
  },

  /* Delivery & Logistics */
  {
    category: "Delivery",
    question: "What are the standard delivery charges across Bangladesh?",
    answer: "For this prototype, standard delivery within Dhaka metropolitan area is simulated at ৳ 120, outside Dhaka via courier is ৳ 200, and showroom pickup at any of our 5 showrooms is free.",
    draft: true
  },
  {
    category: "Delivery",
    question: "How long does delivery take for in-stock networking products?",
    answer: "Within Dhaka, orders are typically delivered within 24–48 hours. District shipments via regional couriers (Sundarban, SA Paribahan, Steadfast) take 2–4 business days.",
    draft: true
  },
  {
    category: "Delivery",
    question: "Can I pick up my orders directly from an SBC showroom or warehouse?",
    answer: "Yes! During checkout, select 'Showroom Pickup' and choose your preferred branch (Multiplan Center, IDB Bhabon, Uttara, Chittagong, or Khulna).",
    draft: true
  },
  {
    category: "Delivery",
    question: "Does SBC deliver to ISP server rooms or enterprise project sites?",
    answer: "Yes, our enterprise logistics team coordinates specialized transport for heavy server racks, high-capacity online UPS systems, and telecom batteries.",
    draft: true
  },

  /* Warranty & Support */
  {
    category: "Warranty",
    question: "What warranty comes with official Tenda and Solitine products?",
    answer: "As the authorized distributor, South Bangla Computers provides official manufacturer warranty (e.g. 1 Year Official Warranty on Tenda routers). Warranty stickers must remain intact.",
    draft: true
  },
  {
    category: "Warranty",
    question: "What is the '1-Hour Warranty Decision' promise?",
    answer: "Our Central Support Center at Elephant Road aims to inspect and provide a clear warranty diagnosis or replacement decision within one hour of product drop-off.",
    draft: true
  },
  {
    category: "Warranty",
    question: "What hours does the SBC Technical Support Center operate?",
    answer: "Our dedicated Customer Support Center operates 12 hours a day (9:00 AM – 9:00 PM) to assist ISP operators, network engineers, and retail customers.",
    draft: true
  },
  {
    category: "Warranty",
    question: "Where are the new SBC regional support centers located?",
    answer: "As announced on our official website, regional support centers are being established in Kushtia, Sylhet, Comilla, and Rajshahi to provide decentralized technical RMA services.",
    draft: true
  },

  /* Dealer Program */
  {
    category: "Dealer",
    question: "Who is eligible to register for the SBC Dealer Program?",
    answer: "Computer hardware retailers, network equipment shops, registered ISPs, CCTV system integrators, and IT infrastructure contractors operating anywhere in Bangladesh.",
    draft: true
  },
  {
    category: "Dealer",
    question: "What documents are required to apply for a dealer account?",
    answer: "You will need a valid Trade License, TIN Certificate, National ID (NID) of the proprietor, and a photograph of your storefront or corporate premises.",
    draft: true
  },
  {
    category: "Dealer",
    question: "How long does dealer application verification take?",
    answer: "Applications are typically reviewed within 1 to 2 business days. In this prototype, you can use our built-in demo tool to simulate instant approval.",
    draft: true
  },
  {
    category: "Dealer",
    question: "What benefits do approved SBC dealers receive?",
    answer: "Dealers unlock wholesale pricing tier visibility, carton-pack bulk order tools, fast SKU import, dedicated account manager support, and warranty priority.",
    draft: true
  },

  /* Customer Account */
  {
    category: "Account",
    question: "Do I need an account to browse and buy products?",
    answer: "No, retail customers can browse freely and checkout as a guest. Creating an account lets you save delivery addresses, view order history, and track active shipments.",
    draft: true
  },
  {
    category: "Account",
    question: "Can I switch between my personal customer and dealer account?",
    answer: "Customer accounts and Dealer accounts use separate authentication credentials. Dealers access the dedicated Dealer Portal at /dealer/login.html.",
    draft: true
  },
  {
    category: "Account",
    question: "How does the simulated demo data work in this prototype?",
    answer: "All orders, dealer applications, and login sessions are stored locally in your browser's localStorage. No real financial or personal data is transmitted.",
    draft: true
  },
  {
    category: "Account",
    question: "How do I reset or clear the prototype demo data?",
    answer: "Click the floating 'Demo Tools' button in the lower-left corner of any page and select 'Reset Demo Data' to restore the initial prototype state.",
    draft: true
  }
];
