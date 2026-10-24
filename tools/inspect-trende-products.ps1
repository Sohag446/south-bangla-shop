$url = "https://www.trende.com.bd/tenda-router"
$response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 15
Write-Host "Length: $($response.Content.Length)"
$imgMatches = [System.Text.RegularExpressions.Regex]::Matches($response.Content, 'image/(?:cache/)?catalog/[^"'']+\.(?:jpg|png|webp|jpeg)')
Write-Host "Image catalog urls found: $($imgMatches.Count)"
$imgMatches | ForEach-Object { $_.Value } | Select-Object -Unique | Select-Object -First 30 | ForEach-Object { Write-Host $_ }
