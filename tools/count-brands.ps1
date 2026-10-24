$content = Get-Content data\shop-products.js -Raw
$matches = [regex]::Matches($content, 'brand:\s*"([^"]+)"')
$brands = $matches | ForEach-Object { $_.Groups[1].Value } | Group-Object | Sort-Object Count -Descending
foreach ($b in $brands) {
    Write-Output "$($b.Name): $($b.Count)"
}
