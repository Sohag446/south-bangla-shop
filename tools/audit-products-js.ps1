$content = Get-Content 'data/products.js' -Raw
$regex = [regex]'id:\s*"([^"]+)",[\s\S]*?images:\s*\["(.*?)"\]'
$matches = $regex.Matches($content)

foreach ($m in $matches) {
    $id = $m.Groups[1].Value
    $img = $m.Groups[2].Value
    if (-not (Test-Path $img)) {
        Write-Host "Broken: $id => $img"
    }
}
