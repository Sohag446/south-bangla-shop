$shopProductsFile = "data/shop-products.js"
$content = [System.IO.File]::ReadAllText($shopProductsFile, [System.Text.Encoding]::UTF8)

# Extract brand, name, model, image
$regex = 'id:\s*"([^"]+)",\s*sku:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*model:\s*"([^"]+)",\s*name:\s*"([^"]+)"'
$matches = [System.Text.RegularExpressions.Regex]::Matches($content, $regex)

Write-Host "Total products in shop-products.js: $($matches.Count)"

$brandGroups = @{}
foreach ($m in $matches) {
    $brand = $m.Groups[3].Value
    if (-not $brandGroups.ContainsKey($brand)) {
        $brandGroups[$brand] = @()
    }
    $brandGroups[$brand] += [PSCustomObject]@{
        Id = $m.Groups[1].Value
        Brand = $brand
        Model = $m.Groups[4].Value
        Name = $m.Groups[5].Value
    }
}

foreach ($b in $brandGroups.Keys) {
    Write-Host "Brand '$b': $($brandGroups[$b].Count) products"
    $brandGroups[$b] | Select-Object -First 3 | ForEach-Object {
        Write-Host "  - [$($_.Id)] $($_.Name)"
    }
}
