$queries = @{
    "dbc-c6-305m"      = "Cat6 UTP Cable 305m"
    "dbc-c6ftp-305m"   = "Cat6 Outdoor Cable 305m"
    "dbc-c6a-lszh"     = "Cat6A Cable LSZH"
    "dbc-pp-24p"       = "Cat6 24 Port Patch Panel"
    "dbc-pp-48p"       = "48 Port Patch Panel"
    "dbc-rack-6u"      = "6U Wall Mount Rack"
    "dbc-rack-9u"      = "9U Wall Mount Rack"
    "dbc-rack-12u"     = "12U Server Rack"
    "dbc-rj45-100"     = "RJ45 Modular Plug Cat6"
    "dbc-punch-110"    = "Punch Down Tool 110"
}

$destDir = "assets/img/products"

foreach ($k in $queries.Keys) {
    $q = $queries[$k]
    try {
        $searchUrl = "https://www.startech.com.bd/product/search?search=" + [System.Uri]::EscapeDataString($q)
        $res = Invoke-WebRequest -Uri $searchUrl -UserAgent 'Mozilla/5.0' -TimeoutSec 15 -UseBasicParsing
        $m = [System.Text.RegularExpressions.Regex]::Match($res.Content, 'https://www\.startech\.com\.bd/image/cache/catalog/[^"''\s]+-500x500\.(webp|jpg|png)')
        if (-not $m.Success) {
            $m = [System.Text.RegularExpressions.Regex]::Match($res.Content, 'https://www\.startech\.com\.bd/image/cache/catalog/[^"''\s]+-228x228\.(webp|jpg|png)')
        }
        if ($m.Success) {
            $imgUrl = $m.Value -replace '-228x228\.', '-500x500.'
            $ext = [System.IO.Path]::GetExtension($imgUrl)
            $dest = Join-Path $destDir "$k$ext"
            Invoke-WebRequest -Uri $imgUrl -OutFile $dest -UserAgent 'Mozilla/5.0' -TimeoutSec 15
            $f = Get-Item $dest
            Write-Host "[$k] Downloaded: $($f.Name) ($($f.Length) bytes) from $imgUrl"
        } else {
            Write-Host "[$k] No image found for: $q"
        }
    } catch {
        Write-Host "[$k] Failed: $_"
    }
}
