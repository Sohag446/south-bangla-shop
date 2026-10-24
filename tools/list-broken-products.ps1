$content = Get-Content 'data/shop-products.js' -Raw
$regex = [regex]'id:\s*"([^"]+)",[\s\S]*?brand:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?images:\s*\[(.*?)\]'
$matches = $regex.Matches($content)

$broken = @()
foreach ($m in $matches) {
    $id = $m.Groups[1].Value
    $brand = $m.Groups[2].Value
    $name = $m.Groups[3].Value
    $imgsRaw = $m.Groups[4].Value
    $img = ([regex]::Match($imgsRaw, '"([^"]+)"')).Groups[1].Value
    if (-not (Test-Path $img)) {
        $broken += [PSCustomObject]@{ Id = $id; Brand = $brand; Name = $name }
    }
}

Write-Host "Total broken: $($broken.Count)"
$broken | Export-Csv -Path 'tools/broken-products.csv' -NoTypeInformation
$broken | Format-Table -AutoSize
