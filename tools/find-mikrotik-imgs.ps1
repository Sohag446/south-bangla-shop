$models = @("RB750Gr3", "hAP ac3", "RB4011", "RB5009", "CRS326", "CCR2004", "cAP ac", "CSS326", "NetMetal ac2", "RB951Ui")

foreach ($m in $models) {
    try {
        $searchUrl = "https://www.startech.com.bd/product/search?search=" + [System.Uri]::EscapeDataString("Mikrotik $m")
        $res = Invoke-WebRequest -Uri $searchUrl -UserAgent 'Mozilla/5.0' -TimeoutSec 10 -UseBasicParsing
        $match = [System.Text.RegularExpressions.Regex]::Match($res.Content, 'https://www\.startech\.com\.bd/image/cache/catalog/[^"''\s]+\.(webp|jpg|png)')
        if ($match.Success) {
            Write-Host "[$m] -> $($match.Value)"
        } else {
            Write-Host "[$m] -> No image found"
        }
    } catch {
        Write-Host "[$m] -> Error: $_"
    }
}
