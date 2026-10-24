$shopProductsFile = "data/shop-products.js"
$content = [System.IO.File]::ReadAllText($shopProductsFile, [System.Text.Encoding]::UTF8)

$matches = [System.Text.RegularExpressions.Regex]::Matches($content, 'id:\s*"([^"]+)",.*?images:\s*\[([^\]]+)\]', [System.Text.RegularExpressions.RegexOptions]::Singleline)
Write-Host "Total products matched with images: $($matches.Count)"

$sample = $matches | Select-Object -First 30
foreach ($s in $sample) {
    Write-Host "[$($s.Groups[1].Value)] -> $($s.Groups[2].Value.Trim())"
}
