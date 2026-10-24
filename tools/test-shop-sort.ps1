$content = Get-Content data\shop-products.js -Raw
$matches = [regex]::Matches($content, 'id:\s*"([^"]+)".*?brand:\s*"([^"]+)".*?name:\s*"([^"]+)".*?isTopSale:\s*(true|false)', [System.Text.RegularExpressions.RegexOptions]::Singleline)
$products = @()
foreach ($m in $matches) {
    $products += [PSCustomObject]@{
        id = $m.Groups[1].Value
        brand = $m.Groups[2].Value
        name = $m.Groups[3].Value
        isTopSale = ($m.Groups[4].Value -eq 'true')
    }
}

Write-Output "Parsed $($products.Count) products from data/shop-products.js"

$sorted = $products | Sort-Object -Property @{
    Expression = { if ($_.brand.ToLower() -eq 'meetion') { 0 } else { 1 } }
}, @{
    Expression = { if ($_.isTopSale) { 0 } else { 1 } }
}, @{
    Expression = { $_.name }
}

Write-Output "`n--- Products on Initial Load / Refresh (First 12 - Page 1) ---"
$page1 = $sorted | Select-Object -First 12
for ($i = 0; $i -lt $page1.Count; $i++) {
    $p = $page1[$i]
    Write-Output "$($i + 1). [$($p.brand)] $($p.name) (TopSale: $($p.isTopSale))"
}
