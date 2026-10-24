$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
    "Accept-Language" = "en-US,en;q=0.5"
}
try {
    $res = Invoke-WebRequest -Uri "https://www.trende.com.bd/tenda-router" -Headers $headers -UseBasicParsing -TimeoutSec 15
    Write-Host "Trende length with UA: $($res.Content.Length)"
} catch {
    Write-Host "Error: $_"
}

try {
    $res2 = Invoke-WebRequest -Uri "https://www.southbanglabd.com/products" -Headers $headers -UseBasicParsing -TimeoutSec 15
    Write-Host "Southbanglabd length with UA: $($res2.Content.Length)"
} catch {
    Write-Host "Error southbangla: $_"
}
