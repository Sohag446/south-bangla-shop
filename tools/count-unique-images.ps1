$shopProductsFile = "data/shop-products.js"
$content = [System.IO.File]::ReadAllText($shopProductsFile, [System.Text.Encoding]::UTF8)

# Find all image filenames matching \d+\.(jpg|png|webp)
$matches = [System.Text.RegularExpressions.Regex]::Matches($content, '(\d+\.(?:jpg|png|webp))')
$uniqueImgs = $matches | ForEach-Object { $_.Value } | Select-Object -Unique

Write-Host "Total unique South Bangla image files found in shop-products: $($uniqueImgs.Count)"
$uniqueImgs | Select-Object -First 20 | ForEach-Object { Write-Host $_ }
