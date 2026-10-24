$mikrotikPages = @{
    "mikrotik-rb750gr3"     = "https://www.startech.com.bd/image/cache/catalog/router1/Microtik/RB750Gr2-500x500.jpg"
    "mikrotik-rb4011"       = "https://www.startech.com.bd/image/cache/catalog/router/mikrotik/rb4011igs/rb4011igs-500x500.jpg"
    "mikrotik-crs326-24g"   = "https://www.startech.com.bd/image/cache/catalog/networking/network-switch/mikrotik/crs326-24s-2q-rm/crs326-24s-2q-rm-01-500x500.webp"
    "mikrotik-ccr2004"      = "https://www.startech.com.bd/image/cache/catalog/router/mikrotik/ccr2004-16g-2s-plus/mikrotik-ccr2004-16g-2s-router-01-500x500.webp"
    "mikrotik-cap-ac"       = "https://www.startech.com.bd/image/cache/catalog/access-point/mikrotik/cap-ac/cap-ac-500x500.webp"
    "mikrotik-css326"       = "https://www.startech.com.bd/image/cache/catalog/switch/mikrotik/css326-24g-2s-rm/css326-24g-2s-plus-rm-500x500.jpg"
    "mikrotik-rb951ui"      = "https://www.startech.com.bd/image/cache/catalog/networking/router/mikrotik/rb951ui-2nd/rb951ui-2nd-1-500x500.jpg"
}

$destDir = "assets/img/products"

foreach ($k in $mikrotikPages.Keys) {
    $url = $mikrotikPages[$k]
    $ext = [System.IO.Path]::GetExtension($url)
    $dest = Join-Path $destDir "$k$ext"
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -UserAgent 'Mozilla/5.0' -TimeoutSec 15
        $item = Get-Item $dest
        Write-Host "Downloaded: $($item.Name) - $($item.Length) bytes"
    } catch {
        Write-Host "Failed: $k - $_"
    }
}
