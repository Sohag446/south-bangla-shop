try {
    $res = Invoke-WebRequest -Uri 'https://www.startech.com.bd/meetion-vibekey-b68-gaming-keyboard' -UserAgent 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' -UseBasicParsing -TimeoutSec 10
    $html = $res.Content
    $matches = [System.Text.RegularExpressions.Regex]::Matches($html, 'https://www\.startech\.com\.bd/image/cache/catalog/[^"''\s]+\.(webp|jpg|png)')
    Write-Host "Matches found: $($matches.Count)"
    $matches | Select-Object -First 5 | ForEach-Object { Write-Host $_.Value }
} catch {
    Write-Host "Error: $_"
}
