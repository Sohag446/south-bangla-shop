# Verification Script for Phase 3 Mobile Shop Page Redesign
$shopHtml = Get-Content -Path 'shop.html' -Raw
$shopJs = Get-Content -Path 'js/shop-controller.js' -Raw
$shopCss = Get-Content -Path 'css/glamora-shop.css' -Raw

$checks = @()

function Test-Condition($name, $condition) {
    if ($condition) {
        Write-Output "[PASS] $name"
    } else {
        Write-Output "[FAIL] $name"
    }
}

Write-Output "--- HTML CHECKS ---"
Test-Condition "Category Chips Container in shop.html" ($shopHtml.Contains('id="sbc-shop-cat-chips"'))
Test-Condition "Mobile Filter Button in shop.html" ($shopHtml.Contains('id="sbc-open-filter-btn"'))
Test-Condition "Mobile Filter Count Badge in shop.html" ($shopHtml.Contains('id="sbc-mobile-filter-badge"'))
Test-Condition "Mobile Drawer Close Button in shop.html" ($shopHtml.Contains('id="sbc-close-filter-btn"'))
Test-Condition "Mobile Drawer Backdrop in shop.html" ($shopHtml.Contains('id="glam-sidebar-backdrop"'))
Test-Condition "Mobile Drawer Clear Button in shop.html" ($shopHtml.Contains('id="sbc-drawer-clear-btn"'))
Test-Condition "Mobile Drawer Apply Button in shop.html" ($shopHtml.Contains('id="sbc-drawer-apply-btn"'))

Write-Output "`n--- JS CHECKS ---"
Test-Condition "renderCategoryChips defined in shop-controller.js" ($shopJs.Contains('function renderCategoryChips()'))
Test-Condition "updateMobileFilterBadge defined in shop-controller.js" ($shopJs.Contains('function updateMobileFilterBadge()'))
Test-Condition "1-Tap Mobile Add to Cart button rendered in glam card" ($shopJs.Contains('glam-card__mobile-btn js-add-cart-glam'))
Test-Condition "Mobile Filter Drawer open listener attached" ($shopJs.Contains('openFilterBtn.addEventListener("click", openFilterDrawer)'))
Test-Condition "Mobile Filter Drawer close listener attached" ($shopJs.Contains('closeFilterBtn.addEventListener("click", closeFilterDrawer)'))
Test-Condition "Mobile Filter Drawer apply listener attached" ($shopJs.Contains('drawerApplyBtn.addEventListener("click"'))
Test-Condition "Mobile Filter Drawer clear listener attached" ($shopJs.Contains('drawerClearBtn.addEventListener("click"'))
Test-Condition "Escape key listener closes drawer" ($shopJs.Contains('e.key === "Escape"'))

Write-Output "`n--- CSS CHECKS ---"
Test-Condition "Category chips container styled" ($shopCss.Contains('.sbc-shop-cat-chips-wrap'))
Test-Condition "Category chip pill styled" ($shopCss.Contains('.sbc-shop-chip'))
Test-Condition "Category chip active state styled" ($shopCss.Contains('.sbc-shop-chip.is-active'))
Test-Condition "Mobile filter button styled" ($shopCss.Contains('.sbc-mobile-filter-btn'))
Test-Condition "Filter count badge styled" ($shopCss.Contains('.sbc-filter-count-badge'))
Test-Condition "Mobile filter drawer off-canvas styled" ($shopCss.Contains('.glam-sidebar.is-open'))
Test-Condition "Mobile filter backdrop styled" ($shopCss.Contains('.glam-sidebar-backdrop.is-open'))
Test-Condition "Mobile 2-column grid rule styled" ($shopCss.Contains('grid-template-columns: repeat(2, 1fr) !important;'))
Test-Condition "Mobile add to cart button styled" ($shopCss.Contains('.glam-card__mobile-btn'))
Test-Condition "Desktop overlay hidden on mobile" ($shopCss.Contains('.glam-card__overlay'))
