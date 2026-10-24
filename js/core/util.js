/**
 * Core Utilities
 * Blueprint §13.2, §13.4, §13.5, DESIGN-TOKENS.json §currency
 */
window.SBC = window.SBC || {};

window.SBC.util = (function () {
  /**
   * Escape HTML to prevent XSS
   */
  function esc(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }

  function qsa(selector, scope) {
    return Array.from((scope || document).querySelectorAll(selector));
  }

  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay || 150);
    };
  }

  /**
   * Format BDT with South Asian / Lakh grouping (last 3, then groups of 2)
   * Example: 125000 -> ৳ 1,25,000
   */
  function formatBDT(num) {
    if (num === null || num === undefined || isNaN(num)) return "৳ —";
    const n = Math.round(Number(num));
    const isNegative = n < 0;
    const str = Math.abs(n).toString();
    let res = "";

    if (str.length <= 3) {
      res = str;
    } else {
      const last3 = str.substring(str.length - 3);
      const other = str.substring(0, str.length - 3);
      const groups = [];
      let temp = other;
      while (temp.length > 2) {
        groups.unshift(temp.substring(temp.length - 2));
        temp = temp.substring(0, temp.length - 2);
      }
      if (temp.length > 0) groups.unshift(temp);
      res = groups.join(",") + "," + last3;
    }

    return (isNegative ? "-" : "") + (window.SBC.config.CURRENCY_SYMBOL || "৳") + " " + res;
  }

  /**
   * Get root-relative prefix from body attribute (e.g. data-root="../")
   */
  function getRoot() {
    return document.body ? (document.body.dataset.root || "") : "";
  }

  /**
   * Build root-aware URLs with query params
   */
  function U(path, params) {
    const root = getRoot();
    let url = root + path;
    if (params && typeof params === "object") {
      const parts = [];
      for (const k in params) {
        if (params[k] !== undefined && params[k] !== null && params[k] !== "") {
          parts.push(encodeURIComponent(k) + "=" + encodeURIComponent(params[k]));
        }
      }
      if (parts.length > 0) {
        url += (url.includes("?") ? "&" : "?") + parts.join("&");
      }
    }
    return url;
  }

  /**
   * Resolve image URL: try remote demo image, fallback to local placeholder
   */
  function imgUrl(filename, type) {
    const root = getRoot();
    if (!filename) {
      return root + "assets/img/placeholder-product.svg";
    }
    if (filename.startsWith("http://") || filename.startsWith("https://") || filename.startsWith("data:")) {
      return filename;
    }
    if (filename.startsWith("assets/") || filename.startsWith("./assets/") || filename.startsWith("/")) {
      return (filename.startsWith("assets/") ? root : "") + filename;
    }
    if (type === "brand") {
      return window.SBC.config.ASSET_BRAND_REMOTE + filename;
    }
    // Product image
    return window.SBC.config.ASSET_BASE_REMOTE_DEMO + filename;
  }

  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function getAllQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (const [k, v] of params.entries()) {
      obj[k] = v;
    }
    return obj;
  }

  function setQueryParams(params, replaceState = true) {
    const url = new URL(window.location);
    for (const k in params) {
      if (params[k] === null || params[k] === undefined || params[k] === "") {
        url.searchParams.delete(k);
      } else {
        url.searchParams.set(k, params[k]);
      }
    }
    if (replaceState) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }
  }

  return {
    esc,
    qs,
    qsa,
    debounce,
    formatBDT,
    getRoot,
    U,
    imgUrl,
    getQueryParam,
    getAllQueryParams,
    setQueryParams
  };
})();
