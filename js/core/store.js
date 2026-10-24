/**
 * State Management Store
 * Blueprint §10, §13.5
 * Handles Cart, Wishlist, Compare, Session, and Orders
 */
window.SBC = window.SBC || {};

window.SBC.store = (function () {
  const storage = window.SBC.storage;

  function emit(eventName, detail) {
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  // Cross-tab sync
  window.addEventListener("storage", function (e) {
    if (e.key && e.key.startsWith("sbc.")) {
      emit("sbc:sync", { key: e.key });
      if (e.key === "sbc.cart") emit("sbc:cart", getCart());
      if (e.key === "sbc.wishlist") emit("sbc:wishlist", getWishlist());
      if (e.key === "sbc.compare") emit("sbc:compare", getCompare());
      if (e.key === "sbc.session") emit("sbc:session", getSession());
    }
  });

  /* ==================== CART ==================== */
  function getCart() {
    return storage.get("cart", []);
  }

  function addToCart(productId, qty = 1) {
    const cart = getCart();
    const existing = cart.find(item => item.id === productId);
    const product = getProductById(productId);
    if (!product) return false;

    // Check MOQ for dealers
    const isDealerSession = isDealer();
    const minQty = (isDealerSession && product.price.moq) ? product.price.moq : 1;
    const addedQty = Math.max(parseInt(qty, 10) || 1, minQty);

    if (existing) {
      existing.qty += addedQty;
    } else {
      cart.push({ id: productId, qty: addedQty });
    }
    storage.set("cart", cart);
    emit("sbc:cart", cart);
    return true;
  }

  function updateCartQty(productId, qty) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
      const q = parseInt(qty, 10);
      if (q <= 0) {
        cart = cart.filter(i => i.id !== productId);
      } else {
        item.qty = Math.min(q, 999);
      }
      storage.set("cart", cart);
      emit("sbc:cart", cart);
    }
  }

  function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(i => i.id !== productId);
    storage.set("cart", cart);
    emit("sbc:cart", cart);
  }

  function clearCart() {
    storage.set("cart", []);
    emit("sbc:cart", []);
  }

  function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.qty, 0);
  }

  function getCartDetails() {
    const cart = getCart();
    const isD = isDealer();
    return cart.map(item => {
      const p = getProductById(item.id);
      if (!p) return null;
      const unitPrice = (isD && p.price.dealer) ? p.price.dealer : (p.price.retail || 0);
      return {
        ...item,
        product: p,
        unitPrice,
        lineTotal: unitPrice * item.qty
      };
    }).filter(Boolean);
  }

  function getCartSubtotal() {
    const items = getCartDetails();
    return items.reduce((sum, item) => sum + item.lineTotal, 0);
  }

  /* ==================== WISHLIST ==================== */
  function getWishlist() {
    return storage.get("wishlist", []);
  }

  function toggleWishlist(productId) {
    let wishlist = getWishlist();
    const exists = wishlist.includes(productId);
    if (exists) {
      wishlist = wishlist.filter(id => id !== productId);
    } else {
      wishlist.push(productId);
    }
    storage.set("wishlist", wishlist);
    emit("sbc:wishlist", wishlist);
    return !exists;
  }

  function isInWishlist(productId) {
    return getWishlist().includes(productId);
  }

  function getWishlistCount() {
    return getWishlist().length;
  }

  /* ==================== COMPARE ==================== */
  function getCompare() {
    return storage.get("compare", []);
  }

  function addToCompare(productId) {
    let compare = getCompare();
    if (compare.includes(productId)) return { success: true, count: compare.length };

    const product = getProductById(productId);
    if (!product) return { success: false, reason: "Product not found" };

    // Max 4 rule (§7 P06)
    if (compare.length >= 4) {
      return { success: false, reason: "You can compare up to 4 products at a time." };
    }

    // Category match rule
    if (compare.length > 0) {
      const firstProduct = getProductById(compare[0]);
      if (firstProduct && firstProduct.category !== product.category) {
        return {
          success: false,
          categoryMismatch: true,
          reason: "You can only compare products within the same category."
        };
      }
    }

    compare.push(productId);
    storage.set("compare", compare);
    emit("sbc:compare", compare);
    return { success: true, count: compare.length };
  }

  function removeFromCompare(productId) {
    let compare = getCompare();
    compare = compare.filter(id => id !== productId);
    storage.set("compare", compare);
    emit("sbc:compare", compare);
  }

  function clearCompare() {
    storage.set("compare", []);
    emit("sbc:compare", []);
  }

  function isInCompare(productId) {
    return getCompare().includes(productId);
  }

  function getCompareCount() {
    return getCompare().length;
  }

  /* ==================== SESSION & USERS ==================== */
  function getSession() {
    return storage.get("session", null);
  }

  function setSession(userObj) {
    storage.set("session", userObj);
    emit("sbc:session", userObj);
  }

  function logout() {
    storage.remove("session");
    emit("sbc:session", null);
  }

  function isDealer() {
    const s = getSession();
    return s && s.type === "dealer";
  }

  function isCustomer() {
    const s = getSession();
    return s && s.type === "customer";
  }

  /* ==================== ORDERS ==================== */
  function getOrders() {
    return storage.get("orders", []);
  }

  function createOrder(orderPayload) {
    const orders = getOrders();
    const orderSeq = storage.get("orderSeq", 100);
    const newSeq = orderSeq + 1;
    storage.set("orderSeq", newSeq);

    const orderId = "SBC-DEMO-" + String(newSeq).padStart(6, "0");
    const order = {
      id: orderId,
      date: new Date().toISOString(),
      status: "Placed", // Placed -> Confirmed -> Packed -> Shipped -> Delivered
      items: getCartDetails(),
      subtotal: getCartSubtotal(),
      deliveryFee: orderPayload.deliveryFee || 120,
      total: getCartSubtotal() + (orderPayload.deliveryFee || 120),
      customer: orderPayload.customer,
      delivery: orderPayload.delivery,
      paymentMethod: orderPayload.paymentMethod,
      isDealer: isDealer()
    };

    orders.unshift(order);
    storage.set("orders", orders);
    clearCart();
    return order;
  }

  function getOrderById(orderId) {
    const orders = getOrders();
    return orders.find(o => o.id === orderId) || null;
  }

  /* Helper to query products across all catalogs */
  function getProductById(id) {
    if (!id) return null;
    if (window.SBC_DATA && window.SBC_DATA.shopProducts && window.SBC_DATA.shopProducts.length) {
      const matchShop = window.SBC_DATA.shopProducts.find(p => p.id === id || p.sku === id);
      if (matchShop) return matchShop;
    }
    const prods = (window.SBC_DATA && window.SBC_DATA.products) || [];
    return prods.find(p => p.id === id || p.sku === id) || null;
  }

  return {
    // Cart
    getCart,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartDetails,
    getCartSubtotal,
    // Wishlist
    getWishlist,
    toggleWishlist,
    isInWishlist,
    getWishlistCount,
    // Compare
    getCompare,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    getCompareCount,
    // Session
    getSession,
    setSession,
    logout,
    isDealer,
    isCustomer,
    // Orders
    getOrders,
    createOrder,
    getOrderById,
    getProductById
  };
})();
