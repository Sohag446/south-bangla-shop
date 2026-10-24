$content = Get-Content 'data/shop-products.js' -Raw
$regex = [regex]'\"(assets/img/[^\"]+)\"'
$matches = $regex.Matches($content)
$unique = $matches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
$missing = @()
foreach ($p in $unique) {
    if (-not (Test-Path $p)) {
        $missing += $p
    }
}
Write-Host "Total unique local paths in shop-products.js: $($unique.Count)"
Write-Host "Missing local paths: $($missing.Count)"
if ($missing.Count -gt 0) {
    $missing | ForEach-Object { Write-Host "MISSING: $_" }
}

# Also check for any remote URLs or placeholders in shop-products.js
$remoteMatches = [regex]::Matches($content, '\"(http[^\"]+)\"')
Write-Host "Remote URLs in shop-products.js: $($remoteMatches.Count)"
$placeholderMatches = [regex]::Matches($content, 'placeholder-product\.svg')
Write-Host "Placeholder references in shop-products.js: $($placeholderMatches.Count)"
