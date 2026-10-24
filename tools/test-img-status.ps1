$testImages = @("962631605.jpg", "1202424832.jpg", "544478617.jpg", "36742764.png", "1440784407.jpg")

foreach ($img in $testImages) {
    $url = "https://www.southbanglabd.com/backend/products/image/$img"
    try {
        $res = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -TimeoutSec 10
        Write-Host "$url -> $($res.StatusCode)"
    } catch {
        Write-Host "$url -> Error: $_"
    }
}
