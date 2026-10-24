/**
 * Safe LocalStorage Wrapper
 * Blueprint §13.2, DESIGN-TOKENS.json §storage
 */
window.SBC = window.SBC || {};

window.SBC.storage = (function () {
  const PREFIX = "sbc.";
  const memoryStore = {};
  let storageAvailable = true;

  try {
    const testKey = "__sbc_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
  } catch (e) {
    storageAvailable = false;
    console.warn("localStorage is not available, falling back to memory store.");
  }

  function get(key, defaultValue = null) {
    const fullKey = PREFIX + key;
    if (storageAvailable) {
      try {
        const item = localStorage.getItem(fullKey);
        if (item === null) return defaultValue;
        return JSON.parse(item);
      } catch (e) {
        console.error("Error reading localStorage key: " + fullKey, e);
        return defaultValue;
      }
    }
    return memoryStore[fullKey] !== undefined ? memoryStore[fullKey] : defaultValue;
  }

  function set(key, value) {
    const fullKey = PREFIX + key;
    if (storageAvailable) {
      try {
        localStorage.setItem(fullKey, JSON.stringify(value));
      } catch (e) {
        console.error("Error writing localStorage key: " + fullKey, e);
      }
    }
    memoryStore[fullKey] = value;
  }

  function remove(key) {
    const fullKey = PREFIX + key;
    if (storageAvailable) {
      try {
        localStorage.removeItem(fullKey);
      } catch (e) {}
    }
    delete memoryStore[fullKey];
  }

  function clearAll() {
    if (storageAvailable) {
      try {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(PREFIX)) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
      } catch (e) {}
    }
    for (const k in memoryStore) {
      if (k.startsWith(PREFIX)) delete memoryStore[k];
    }
  }

  return {
    get,
    set,
    remove,
    clearAll
  };
})();
