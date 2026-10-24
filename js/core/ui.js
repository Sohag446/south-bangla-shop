/**
 * UI Component Helpers (Modal, Toast, Drawer, Skeletons, Icons)
 * Blueprint §10, §13.5
 */
window.SBC = window.SBC || {};

window.SBC.ui = (function () {
  const util = window.SBC.util;

  /* ==================== ICONS ==================== */
  function icon(name, size = "md", extraClass = "") {
    const sizeMap = {
      xs: "sbc-icon--xs",
      sm: "sbc-icon--sm",
      md: "sbc-icon--md",
      lg: "sbc-icon--lg",
      xl: "sbc-icon--xl"
    };
    const sizeClass = sizeMap[size] || "sbc-icon--md";
    return `<svg class="sbc-icon ${sizeClass} ${extraClass}" aria-hidden="true" viewBox="0 0 24 24"><use href="#icon-${name}"></use></svg>`;
  }

  /* ==================== TOASTS ==================== */
  function toast(message, type = "info", duration = 4000, actionLabel = null, onAction = null) {
    let container = document.getElementById("sbc-toast");
    if (!container) {
      container = document.createElement("div");
      container.id = "sbc-toast";
      container.setAttribute("role", "status");
      container.setAttribute("aria-live", "polite");
      document.body.appendChild(container);
    }

    const toastItem = document.createElement("div");
    toastItem.className = `sbc-toast-item sbc-toast-item--${type}`;

    let iconName = "info";
    if (type === "success") iconName = "check-circle";
    if (type === "error") iconName = "alert-circle";
    if (type === "warning") iconName = "alert-triangle";

    let html = `
      <div style="display:flex;align-items:center;gap:10px;">
        ${icon(iconName, "sm")}
        <span>${util.esc(message)}</span>
      </div>
    `;

    if (actionLabel && onAction) {
      html += `<button class="sbc-btn sbc-btn--sm sbc-btn--outline" style="color:#fff;border-color:rgba(255,255,255,0.4);margin-left:12px;">${util.esc(actionLabel)}</button>`;
    }

    toastItem.innerHTML = html;

    if (actionLabel && onAction) {
      const btn = toastItem.querySelector("button");
      btn.addEventListener("click", () => {
        onAction();
        removeToast();
      });
    }

    function removeToast() {
      toastItem.style.opacity = "0";
      toastItem.style.transform = "translateY(8px)";
      setTimeout(() => toastItem.remove(), 200);
    }

    container.appendChild(toastItem);

    if (duration > 0) {
      setTimeout(removeToast, duration);
    }

    return removeToast;
  }

  /* ==================== MODALS ==================== */
  let activeModal = null;

  function modal({ title, body, footer = "", maxWidth = null, onClose = null }) {
    closeModal();

    const backdrop = document.createElement("div");
    backdrop.className = "sbc-modal-backdrop";
    backdrop.setAttribute("role", "dialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.setAttribute("aria-labelledby", "sbc-modal-title");

    backdrop.innerHTML = `
      <div class="sbc-modal" ${maxWidth ? `style="max-width:${maxWidth}px;"` : ""}>
        <div class="sbc-modal__header">
          <h3 id="sbc-modal-title" style="margin:0;font-size:var(--fs-h4);color:var(--navy-900);">${util.esc(title)}</h3>
          <button class="sbc-btn sbc-btn--ghost sbc-btn--icon-only sbc-btn--sm js-modal-close" aria-label="Close dialog">
            ${icon("x", "sm")}
          </button>
        </div>
        <div class="sbc-modal__body">
          ${body}
        </div>
        ${footer ? `<div class="sbc-modal__footer">${footer}</div>` : ""}
      </div>
    `;

    document.body.appendChild(backdrop);
    // Trigger transition
    requestAnimationFrame(() => backdrop.classList.add("is-open"));

    function handleClose() {
      backdrop.classList.remove("is-open");
      document.removeEventListener("keydown", onKeyDown);
      setTimeout(() => {
        backdrop.remove();
        if (onClose) onClose();
      }, 200);
      activeModal = null;
    }

    function onKeyDown(e) {
      if (e.key === "Escape") handleClose();
    }

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop || e.target.closest(".js-modal-close")) {
        handleClose();
      }
    });

    document.addEventListener("keydown", onKeyDown);
    activeModal = handleClose;
    return handleClose;
  }

  function closeModal() {
    if (activeModal) activeModal();
  }

  /* ==================== DRAWERS ==================== */
  let activeDrawer = null;

  function drawer({ position = "right", title = "", content = "", footer = "", onClose = null }) {
    closeDrawer();

    const backdrop = document.createElement("div");
    backdrop.className = "sbc-drawer-backdrop";

    const isLeft = position === "left";
    backdrop.innerHTML = `
      <div class="sbc-drawer ${isLeft ? 'sbc-drawer--left' : ''}" role="dialog" aria-modal="true">
        <div class="sbc-drawer__header">
          <h4 style="margin:0;font-size:var(--fs-h4);color:var(--navy-900);">${util.esc(title)}</h4>
          <button class="sbc-btn sbc-btn--ghost sbc-btn--icon-only sbc-btn--sm js-drawer-close" aria-label="Close drawer">
            ${icon("x", "sm")}
          </button>
        </div>
        <div class="sbc-drawer__body">
          ${content}
        </div>
        ${footer ? `<div class="sbc-drawer__footer">${footer}</div>` : ""}
      </div>
    `;

    document.body.appendChild(backdrop);
    requestAnimationFrame(() => backdrop.classList.add("is-open"));

    function handleClose() {
      backdrop.classList.remove("is-open");
      document.removeEventListener("keydown", onKeyDown);
      setTimeout(() => {
        backdrop.remove();
        if (onClose) onClose();
      }, 240);
      activeDrawer = null;
    }

    function onKeyDown(e) {
      if (e.key === "Escape") handleClose();
    }

    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop || e.target.closest(".js-drawer-close")) {
        handleClose();
      }
    });

    document.addEventListener("keydown", onKeyDown);
    activeDrawer = handleClose;
    return handleClose;
  }

  function closeDrawer() {
    if (activeDrawer) activeDrawer();
  }

  /* ==================== SKELETONS ==================== */
  function productCardSkeleton(count = 4) {
    let html = "";
    for (let i = 0; i < count; i++) {
      html += `
        <div class="sbc-card" style="pointer-events:none;">
          <div class="sbc-skeleton" style="aspect-ratio:1/1;width:100%;margin-bottom:12px;"></div>
          <div class="sbc-skeleton" style="height:14px;width:40%;margin-bottom:8px;"></div>
          <div class="sbc-skeleton" style="height:18px;width:90%;margin-bottom:12px;"></div>
          <div class="sbc-skeleton" style="height:22px;width:50%;margin-top:auto;margin-bottom:12px;"></div>
          <div class="sbc-skeleton" style="height:44px;width:100%;border-radius:6px;"></div>
        </div>
      `;
    }
    return html;
  }

  return {
    icon,
    toast,
    modal,
    closeModal,
    drawer,
    closeDrawer,
    productCardSkeleton
  };
})();
