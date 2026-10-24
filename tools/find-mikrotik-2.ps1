$pages = @(
    "https://www.startech.com.bd/mikrotik-hap-ac3-dual-band-router",
    "https://www.startech.com.bd/mikrotik-rb5009upr-s-in-router"
)

foreach ($p in $pages) {
    try {
        $res = Invoke-WebRequest -Uri $p -UserAgent 'Mozilla/5.0' -TimeoutSec 15 -UseBasicParsing
        $m = [System.Text.RegularExpressions.Regex]::Matches($res.Content, 'https://www\.startech\.com\.bd/image/cache/catalog/[^"''\s]+-500x500\.(webp|jpg|png)')
        Write-Host "Page: $p"
        $m | ForEach-Object { $_.Value } | Select-Object -Unique | ForEach-Object { Write-Host "   $_" }
    } catch {
        Write-Host "Failed: $p - $_"
    }
}
