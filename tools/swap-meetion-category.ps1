$filePath = "$PSScriptRoot\..\index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Find the start of the duplicate Meetion section after Popular Products
$searchStart = "<!-- =====================================================================`r`n         MEETION BRAND PRODUCTS (PRIMARY AUTHORIZED PARTNER BRAND)"
if (-not $content.Contains($searchStart)) {
    # Try LF version
    $searchStart = "<!-- =====================================================================`n         MEETION BRAND PRODUCTS (PRIMARY AUTHORIZED PARTNER BRAND)"
}

$startIdx = $content.IndexOf($searchStart)
if ($startIdx -lt 0) {
    Write-Error "Could not find duplicate Meetion section start!"
    exit 1
}

$searchEnd = "<!-- =====================================================================`r`n         SECTION 3: ENTERPRISE NETWORK PLANNING ARCHITECTURE"
if (-not $content.Contains($searchEnd)) {
    $searchEnd = "<!-- =====================================================================`n         SECTION 3: ENTERPRISE NETWORK PLANNING ARCHITECTURE"
}

$endIdx = $content.IndexOf($searchEnd, $startIdx)
if ($endIdx -lt 0) {
    Write-Error "Could not find Enterprise Planning section boundary!"
    exit 1
}

$categorySection = @"
    <!-- =====================================================================
         SECTION 5: SHOP BY CATEGORY
         ===================================================================== -->
    <section class="sbc-home-section sbc-cat-section" aria-labelledby="cat-heading">
      <div class="l-container">
        <div class="sbc-sec-header">
          <div>
            <div class="sbc-sec-tag">
              <span class="sbc-sec-tag__dash" aria-hidden="true">—</span>
              <span class="sbc-sec-tag__text" data-i18n="home.catTag">SHOP BY CATEGORY</span>
            </div>
            <h2 id="cat-heading" class="sbc-sec-title" data-i18n="home.catHeading">Explore Our Product Categories</h2>
          </div>
          <a href="shop.html" class="sbc-sec-viewall">
            <span data-i18n="home.catViewAll">View All Categories</span>
            <svg class="sbc-icon sbc-icon--xs" aria-hidden="true">
              <use href="#icon-arrow-right"></use>
            </svg>
          </a>
        </div>

        <div class="sbc-cat-cards-grid">
          <!-- Card 1: Wi-Fi Routers -->
          <a href="category.html?c=routers-wifi" class="sbc-cat-card">
            <div class="sbc-cat-card__media">
              <img src="assets/img/home/cat_wifi_routers.jpg" alt="Wi-Fi Routers" loading="lazy">
            </div>
            <div class="sbc-cat-card__bar">
              <div class="sbc-cat-card__icon">
                <svg class="sbc-icon sbc-icon--sm" aria-hidden="true">
                  <use href="#icon-wifi"></use>
                </svg>
              </div>
              <div class="sbc-cat-card__info">
                <h3 class="sbc-cat-card__title" data-i18n="home.catWifiTitle">Wi-Fi Routers</h3>
                <span class="sbc-cat-card__desc" data-i18n="home.catWifiDesc">Home &amp; Business Routers</span>
              </div>
              <div class="sbc-cat-card__arrow" aria-hidden="true">
                <svg class="sbc-icon sbc-icon--xs">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </div>
            </div>
          </a>

          <!-- Card 2: Network Switches -->
          <a href="category.html?c=switches" class="sbc-cat-card">
            <div class="sbc-cat-card__media">
              <img src="assets/img/home/cat_network_switches.jpg" alt="Network Switches" loading="lazy">
            </div>
            <div class="sbc-cat-card__bar">
              <div class="sbc-cat-card__icon">
                <svg class="sbc-icon sbc-icon--sm" aria-hidden="true">
                  <use href="#icon-server"></use>
                </svg>
              </div>
              <div class="sbc-cat-card__info">
                <h3 class="sbc-cat-card__title" data-i18n="home.catSwitchesTitle">Network Switches</h3>
                <span class="sbc-cat-card__desc" data-i18n="home.catSwitchesDesc">Managed &amp; Unmanaged Switches</span>
              </div>
              <div class="sbc-cat-card__arrow" aria-hidden="true">
                <svg class="sbc-icon sbc-icon--xs">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </div>
            </div>
          </a>

          <!-- Card 3: Fiber Optic -->
          <a href="category.html?c=fiber-pon" class="sbc-cat-card">
            <div class="sbc-cat-card__media">
              <img src="assets/img/home/cat_fiber_optic.jpg" alt="Fiber Optic" loading="lazy">
            </div>
            <div class="sbc-cat-card__bar">
              <div class="sbc-cat-card__icon">
                <svg class="sbc-icon sbc-icon--sm" aria-hidden="true">
                  <use href="#icon-tool"></use>
                </svg>
              </div>
              <div class="sbc-cat-card__info">
                <h3 class="sbc-cat-card__title" data-i18n="home.catFiberTitle">Fiber Optic</h3>
                <span class="sbc-cat-card__desc" data-i18n="home.catFiberDesc">Fiber Cable &amp; Accessories</span>
              </div>
              <div class="sbc-cat-card__arrow" aria-hidden="true">
                <svg class="sbc-icon sbc-icon--xs">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </div>
            </div>
          </a>

          <!-- Card 4: UPS & Power -->
          <a href="category.html?c=power-backup" class="sbc-cat-card">
            <div class="sbc-cat-card__media">
              <img src="assets/img/home/cat_ups_power.jpg" alt="UPS & Power" loading="lazy">
            </div>
            <div class="sbc-cat-card__bar">
              <div class="sbc-cat-card__icon">
                <svg class="sbc-icon sbc-icon--sm" aria-hidden="true">
                  <use href="#icon-zap"></use>
                </svg>
              </div>
              <div class="sbc-cat-card__info">
                <h3 class="sbc-cat-card__title" data-i18n="home.catPowerTitle">UPS &amp; Power</h3>
                <span class="sbc-cat-card__desc" data-i18n="home.catPowerDesc">Backup Power Solutions</span>
              </div>
              <div class="sbc-cat-card__arrow" aria-hidden="true">
                <svg class="sbc-icon sbc-icon--xs">
                  <use href="#icon-arrow-right"></use>
                </svg>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>

"@

$newContent = $content.Substring(0, $startIdx) + $categorySection + $content.Substring($endIdx)
[System.IO.File]::WriteAllText($filePath, $newContent, [System.Text.Encoding]::UTF8)
Write-Output "Successfully replaced duplicate Meetion section with Shop by Category section!"
