/**
 * Product Gallery & Lightbox Zoom
 * Blueprint §7 P05, §10.5
 */
window.SBC = window.SBC || {};

window.SBC.gallery = (function () {
  const util = window.SBC.util;
  const ui = window.SBC.ui;

  function init(containerEl, images = [], altText = "") {
    if (!containerEl || images.length === 0) return;

    let currentIndex = 0;

    function render() {
      const mainImg = util.imgUrl(images[currentIndex]);
      const thumbsHtml = images.map((img, idx) => `
        <button class="sbc-gallery-thumb ${idx === currentIndex ? 'is-active' : ''}" data-idx="${idx}" style="width:72px;height:72px;border:2px solid ${idx === currentIndex ? 'var(--blue-600)' : 'var(--gray-200)'};border-radius:6px;padding:4px;background:#fff;cursor:pointer;overflow:hidden;" aria-label="View photo ${idx + 1}">
          <img src="${util.esc(util.imgUrl(img))}" alt="" style="width:100%;height:100%;object-fit:contain;" onerror="this.src='${util.getRoot()}assets/img/placeholder-product.svg';">
        </button>
      `).join("");

      containerEl.innerHTML = `
        <div class="sbc-gallery">
          <div class="sbc-gallery__main" style="position:relative;background:var(--gray-50);border:1px solid var(--gray-200);border-radius:var(--r-lg);padding:var(--sp-6);aspect-ratio:1/1;display:flex;align-items:center;justify-content:center;cursor:zoom-in;">
            <img id="sbc-gallery-main-img" src="${util.esc(mainImg)}" alt="${util.esc(altText)}" style="max-height:100%;max-width:100%;object-fit:contain;" onerror="this.src='${util.getRoot()}assets/img/placeholder-product.svg';">
            <span style="position:absolute;bottom:12px;right:12px;font-size:11px;background:rgba(255,255,255,0.85);padding:4px 8px;border-radius:4px;color:var(--gray-700);display:flex;align-items:center;gap:4px;">
              ${ui.icon("search", "sm")} Click to zoom
            </span>
          </div>
          ${images.length > 1 ? `
            <div class="sbc-gallery__thumbs" style="display:flex;gap:8px;margin-top:12px;overflow-x:auto;padding-bottom:4px;">
              ${thumbsHtml}
            </div>
          ` : ""}
        </div>
      `;

      // Thumbnail clicks
      containerEl.querySelectorAll(".sbc-gallery-thumb").forEach(btn => {
        btn.addEventListener("click", () => {
          currentIndex = parseInt(btn.dataset.idx, 10);
          render();
        });
      });

      // Lightbox click
      const mainEl = containerEl.querySelector(".sbc-gallery__main");
      if (mainEl) {
        mainEl.addEventListener("click", openLightbox);
      }
    }

    function openLightbox() {
      const zoomImg = util.imgUrl(images[currentIndex]);
      ui.modal({
        title: "Product Image Gallery",
        maxWidth: 900,
        body: `
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:10px 0;">
            <div style="max-height:65vh;display:flex;align-items:center;justify-content:center;background:#fff;">
              <img src="${util.esc(zoomImg)}" alt="${util.esc(altText)}" style="max-height:60vh;max-width:100%;object-fit:contain;" onerror="this.src='${util.getRoot()}assets/img/placeholder-product.svg';">
            </div>
            ${images.length > 1 ? `
              <div style="display:flex;align-items:center;gap:16px;margin-top:16px;">
                <button class="sbc-btn sbc-btn--sm sbc-btn--outline js-lb-prev">&larr; Previous</button>
                <span style="font-size:13px;color:var(--c-text-muted);">Photo ${currentIndex + 1} of ${images.length}</span>
                <button class="sbc-btn sbc-btn--sm sbc-btn--outline js-lb-next">Next &rarr;</button>
              </div>
            ` : ""}
          </div>
        `,
        footer: `<button class="sbc-btn sbc-btn--primary js-modal-close">Close</button>`
      });

      setTimeout(() => {
        const prevBtn = document.querySelector(".js-lb-prev");
        const nextBtn = document.querySelector(".js-lb-next");
        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            ui.closeModal();
            openLightbox();
          });
        }
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % images.length;
            ui.closeModal();
            openLightbox();
          });
        }
      }, 50);
    }

    render();
  }

  return { init };
})();
