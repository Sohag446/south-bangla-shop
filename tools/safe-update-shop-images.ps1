$shopProductsFile = "data/shop-products.js"
$lines = [System.IO.File]::ReadAllLines($shopProductsFile, [System.Text.Encoding]::UTF8)

$productImages = @{
    # Mikrotik
    "mikrotik-hex"        = "assets/img/products/mikrotik-rb750gr3.jpg"
    "mikrotik-hap-ac3"    = "assets/img/products/mikrotik-hap-ac3.webp"
    "mikrotik-rb4011"     = "assets/img/products/mikrotik-rb4011.jpg"
    "mikrotik-rb5009"     = "assets/img/products/mikrotik-rb5009.webp"
    "mikrotik-crs326"     = "assets/img/products/mikrotik-crs326-24g.webp"
    "mikrotik-ccr2004"    = "assets/img/products/mikrotik-ccr2004.webp"
    "mikrotik-cap-ac"     = "assets/img/products/mikrotik-cap-ac.webp"
    "mikrotik-css326"     = "assets/img/products/mikrotik-css326.jpg"
    "mikrotik-netmetal"   = "assets/img/products/mikrotik-netmetal-ac2.webp"
    "mikrotik-rb951"      = "assets/img/products/mikrotik-rb951ui.jpg"

    # DBC
    "dbc-cat6-utp"        = "assets/img/products/dbc-c6-305m.webp"
    "dbc-cat6-ftp"        = "assets/img/products/dbc-c6ftp-305m.webp"
    "dbc-cat6a-lszh"      = "assets/img/products/dbc-c6a-lszh.webp"
    "dbc-panel-24p"       = "assets/img/products/dbc-pp-24p.jpg"
    "dbc-panel-48p"       = "assets/img/products/dbc-pp-48p.webp"
    "dbc-rack-6u"         = "assets/img/products/dbc-rack-6u.webp"
    "dbc-rack-9u"         = "assets/img/products/dbc-rack-9u.webp"
    "dbc-rack-12u"        = "assets/img/products/dbc-rack-12u.webp"
    "dbc-rj45-100p"       = "assets/img/products/dbc-rj45-100.jpg"
    "dbc-punch-tool"      = "assets/img/products/dbc-punch-110.webp"

    # Meetion
    "meetion-btm012"      = "assets/img/products/meetion-btm012.jpg"
    "meetion-btm032r"     = "assets/img/products/meetion-btm032r.jpg"
    "meetion-mk008"       = "assets/img/products/meetion-mk008-pro.jpg"
    "meetion-vibekey-b68" = "assets/img/products/meetion-vibekey-b68.webp"
    "meetion-ikey-c210"   = "assets/img/products/meetion-ikey-c210.webp"
    "meetion-hp022"       = "assets/img/products/meetion-hp022.jpg"
    "meetion-sp2011"      = "assets/img/products/meetion-sp2011.webp"
    "meetion-sp2010"      = "assets/img/products/meetion-sp2010.webp"
    "meetion-u002"        = "assets/img/products/meetion-u002.png"
    "meetion-h390"        = "assets/img/products/meetion-h390.png"

    # Tenda & others
    "tenda-ac10"          = "assets/img/products/tenda-ac10.jpg"
    "tenda-ax12-pro"      = "assets/img/products/tenda-ax12-pro.jpg"
    "tenda-tx2l-pro"      = "assets/img/products/tenda-tx2l-pro.jpg"
    "vsol-v2801sg"        = "assets/img/products/vsol-v2801sg.jpg"
    "solitine-panel-24p"  = "assets/img/products/solitine-panel-24p.jpg"
}

$currentId = $null
$updatedCount = 0

for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line -match 'id:\s*"([^"]+)"') {
        $currentId = $matches[1]
    }
    if ($currentId -and $productImages.ContainsKey($currentId)) {
        if ($line -match '^\s*images:\s*\[[^\]]+\]') {
            $newImg = $productImages[$currentId]
            $indent = $line -replace '^(images:.*)$', ''
            if ($line -match '^(\s*)images:') {
                $indent = $matches[1]
            }
            $lines[$i] = "$indent" + 'images: ["' + $newImg + '"],'
            $updatedCount++
            Write-Host "Updated $currentId -> $newImg"
            $currentId = $null
        }
    }
}

[System.IO.File]::WriteAllLines($shopProductsFile, $lines, [System.Text.Encoding]::UTF8)
Write-Host "Safely updated $updatedCount products in shop-products.js."
