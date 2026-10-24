$shopProductsFile = "data/shop-products.js"
$content = [System.IO.File]::ReadAllText($shopProductsFile, [System.Text.Encoding]::UTF8)

# Parse products
$regex = '(?s)id:\s*"([^"]+)",\s*sku:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*model:\s*"([^"]+)",\s*name:\s*"([^"]+)",.*?images:\s*\[([^\]]+)\]'
$matches = [System.Text.RegularExpressions.Regex]::Matches($content, $regex)

Write-Host "Total products in shop-products.js: $($matches.Count)"

$downloadList = @()

foreach ($m in $matches) {
    $id = $m.Groups[1].Value
    $sku = $m.Groups[2].Value
    $brand = $m.Groups[3].Value
    $model = $m.Groups[4].Value
    $name = $m.Groups[5].Value
    $rawImgs = $m.Groups[6].Value.Trim()
    
    # Split images
    $imgs = $rawImgs -split ',' | ForEach-Object { $_.Trim().Trim('"').Trim("'") } | Where-Object { $_ -ne '' }
    
    $downloadList += [PSCustomObject]@{
        Id = $id
        Brand = $brand
        Model = $model
        Name = $name
        Images = $imgs
    }
}

Write-Host "Sample 15 items:"
$downloadList | Select-Object -First 15 | ForEach-Object {
    Write-Host "$($_.Id) ($($_.Brand)): $($_.Images -join ', ')"
}
