$content = Get-Content 'data/shop-products.js' -Raw
$regex = [regex]'id:\s*"([^"]+)",[\s\S]*?brand:\s*"([^"]+)",[\s\S]*?images:\s*\[(.*?)\]'
$matches = $regex.Matches($content)

$byBrand = @{}
foreach ($m in $matches) {
    $id = $m.Groups[1].Value
    $brand = $m.Groups[2].Value
    $imgsRaw = $m.Groups[3].Value
    $img = ([regex]::Match($imgsRaw, '"([^"]+)"')).Groups[1].Value
    if (-not (Test-Path $img)) {
        if (-not $byBrand.ContainsKey($brand)) { $byBrand[$brand] = @() }
        $byBrand[$brand] += [PSCustomObject]@{ Id = $id; Img = $img }
    }
}

foreach ($b in $byBrand.Keys) {
    Write-Host "$b : $($byBrand[$b].Count) items"
}
