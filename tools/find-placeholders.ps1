$shopProductsFile = "data/shop-products.js"
$content = [System.IO.File]::ReadAllText($shopProductsFile, [System.Text.Encoding]::UTF8)

$regex = '(?s)id:\s*"([^"]+)",\s*sku:\s*"([^"]+)",\s*brand:\s*"([^"]+)",\s*model:\s*"([^"]+)",\s*name:\s*"([^"]+)",.*?images:\s*\[([^\]]+)\]'
$matches = [System.Text.RegularExpressions.Regex]::Matches($content, $regex)

$missingOrGeneric = @()
foreach ($m in $matches) {
    $id = $m.Groups[1].Value
    $brand = $m.Groups[3].Value
    $model = $m.Groups[4].Value
    $name = $m.Groups[5].Value
    $rawImgs = $m.Groups[6].Value.Trim()
    if ($rawImgs -match 'placeholder-product\.svg') {
        $missingOrGeneric += [PSCustomObject]@{ Id=$id; Brand=$brand; Model=$model; Name=$name }
    }
}

Write-Host "Products using placeholder-product.svg: $($missingOrGeneric.Count)"
$missingOrGeneric | ForEach-Object {
    Write-Host "$($_.Id) => $($_.Model) ($($_.Brand))"
}
