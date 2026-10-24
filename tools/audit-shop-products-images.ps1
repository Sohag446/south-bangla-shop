$content = Get-Content 'data/shop-products.js' -Raw
$regex = [regex]'id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?images:\s*\[(.*?)\]'
$matches = $regex.Matches($content)

Write-Host "Total products matched in shop-products.js: $($matches.Count)"

$brokenLocal = @()
$placeholders = @()
$remote = @()
$validLocal = @()

foreach ($m in $matches) {
    $id = $m.Groups[1].Value
    $name = $m.Groups[2].Value
    $imgsRaw = $m.Groups[3].Value
    
    $imgMatches = [regex]::Matches($imgsRaw, '"([^"]+)"')
    foreach ($im in $imgMatches) {
        $imgPath = $im.Groups[1].Value
        if ($imgPath -like '*placeholder*') {
            $placeholders += [PSCustomObject]@{ Id = $id; Name = $name; Image = $imgPath }
        } elseif ($imgPath -like 'http*') {
            $remote += [PSCustomObject]@{ Id = $id; Name = $name; Image = $imgPath }
        } else {
            if (Test-Path $imgPath) {
                $validLocal += [PSCustomObject]@{ Id = $id; Name = $name; Image = $imgPath }
            } else {
                $brokenLocal += [PSCustomObject]@{ Id = $id; Name = $name; Image = $imgPath }
            }
        }
    }
}

Write-Host "Valid Local: $($validLocal.Count)"
Write-Host "Broken Local: $($brokenLocal.Count)"
Write-Host "Placeholders: $($placeholders.Count)"
Write-Host "Remote URLs: $($remote.Count)"

if ($brokenLocal.Count -gt 0) {
    Write-Host "`nBroken Local Images:"
    $brokenLocal | Format-Table -AutoSize
}

if ($placeholders.Count -gt 0) {
    Write-Host "`nPlaceholders:"
    $placeholders | Format-Table -AutoSize
}

if ($remote.Count -gt 0) {
    Write-Host "`nRemote URLs:"
    $remote | Select-Object -First 10 | Format-Table -AutoSize
}
