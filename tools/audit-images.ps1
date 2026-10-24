$shopProductsFile = "data/shop-products.js"
$content = [System.IO.File]::ReadAllText($shopProductsFile, [System.Text.Encoding]::UTF8)

# Find all products and their images
$regex = '(?s)id:\s*"([^"]+)",\s*sku:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*model:\s*"([^"]+)",\s*name:\s*"([^"]+)",.*?images:\s*\[([^\]]+)\]'
$matches = [System.Text.RegularExpressions.Regex]::Matches($content, $regex)

Write-Host "Total products in shop-products.js: $($matches.Count)"

$missingOrPlaceholder = @()
$hasSpecificImage = @()
$duplicateImages = @{}

foreach ($m in $matches) {
    $id = $m.Groups[1].Value
    $brand = $m.Groups[3].Value
    $name = $m.Groups[5].Value
    $imgRaw = $m.Groups[6].Value.Trim()
    
    # Check if uses placeholder or svg
    if ($imgRaw -match 'placeholder|tenda-router\.svg' -or $imgRaw -eq '') {
        $missingOrPlaceholder += [PSCustomObject]@{ Id=$id; Brand=$brand; Name=$name; Img=$imgRaw }
    } else {
        $hasSpecificImage += [PSCustomObject]@{ Id=$id; Brand=$brand; Name=$name; Img=$imgRaw }
        # count occurrences of image
        $firstImg = ($imgRaw -split ',')[0].Trim().Trim('"').Trim("'")
        if (-not $duplicateImages.ContainsKey($firstImg)) {
            $duplicateImages[$firstImg] = 0
        }
        $duplicateImages[$firstImg]++
    }
}

Write-Host "Products with placeholder or svg: $($missingOrPlaceholder.Count)"
Write-Host "Products with image filenames: $($hasSpecificImage.Count)"

Write-Host "`nTop repeated images across catalog:"
$duplicateImages.GetEnumerator() | Sort-Object Value -Descending | Select-Object -First 15 | ForEach-Object {
    Write-Host "  $($_.Key) is used by $($_.Value) products"
}

Write-Host "`nSample products using generic/duplicate images:"
$missingOrPlaceholder | Select-Object -First 10 | ForEach-Object {
    Write-Host "  - [$($_.Brand)] $($_.Name) -> $($_.Img)"
}
