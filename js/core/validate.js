/**
 * Form Validation Library
 * Blueprint §10.9, §11.1, §11.2
 */
window.SBC = window.SBC || {};

window.SBC.validate = (function () {
  /**
   * Validate Bangladesh 11-digit mobile number
   * Format: 013-019 followed by 8 digits
   */
  function isBDPhone(str) {
    if (!str) return false;
    const clean = str.replace(/[\s\-\+]/g, "");
    // Handles +8801..., 8801..., or 01...
    const match = clean.match(/^(?:88)?(01[3-9]\d{8})$/);
    return !!match;
  }

  function isEmail(str) {
    if (!str) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str.trim());
  }

  function isRequired(val) {
    if (val === null || val === undefined) return false;
    if (typeof val === "string") return val.trim().length > 0;
    if (Array.isArray(val)) return val.length > 0;
    return true;
  }

  function isTradeLicense(str) {
    if (!str) return false;
    const clean = str.replace(/[\s\-\/\_]/g, "");
    return clean.length >= 4 && clean.length <= 25;
  }

  function isTIN(str) {
    if (!str) return false;
    const clean = str.replace(/[\s\-]/g, "");
    return /^\d{10,12}$/.test(clean);
  }

  function getPasswordStrength(pwd) {
    if (!pwd) return { score: 0, label: "Too weak" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, label: "Weak", color: "var(--red-700)" };
    if (score <= 3) return { score: 2, label: "Medium", color: "var(--amber-800)" };
    return { score: 3, label: "Strong", color: "var(--green-700)" };
  }

  /**
   * Attach inline error to a form group
   */
  function setError(inputEl, message) {
    const group = inputEl.closest(".sbc-form-group") || inputEl.parentElement;
    group.classList.add("has-error");
    let errEl = group.querySelector(".sbc-error-msg");
    if (!errEl) {
      errEl = document.createElement("span");
      errEl.className = "sbc-error-msg";
      errEl.setAttribute("role", "alert");
      group.appendChild(errEl);
    }
    errEl.textContent = message;
    inputEl.setAttribute("aria-invalid", "true");
  }

  function clearError(inputEl) {
    const group = inputEl.closest(".sbc-form-group") || inputEl.parentElement;
    group.classList.remove("has-error");
    const errEl = group.querySelector(".sbc-error-msg");
    if (errEl) errEl.remove();
    inputEl.removeAttribute("aria-invalid");
  }

  return {
    isBDPhone,
    isEmail,
    isRequired,
    isTradeLicense,
    isTIN,
    getPasswordStrength,
    setError,
    clearError
  };
})();
