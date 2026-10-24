$content = [System.IO.File]::ReadAllText("tools/chrome-dump.html", [System.Text.Encoding]::UTF8)

# Find all product cards / images
$matches = [System.Text.RegularExpressions.Regex]::Matches($content, '<img[^>]+src="([^"]*backend/products/image/[^"]+)"[^>]*alt="([^"]*)"', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
Write-Host "Product images with alt text found: $($matches.Count)"

$results = @{}
foreach ($m in $matches) {
    $imgUrl = $m.Groups[1].Value
    $alt = $m.Groups[2].Value.Trim()
    if ($alt -ne "") {
        $results[$alt] = $imgUrl
    }
}

Write-Host "Unique products found on homepage: $($results.Count)"
$results.GetEnumerator() | Select-Object -First 25 | ForEach-Object {
    Write-Host "[$($_.Key)] -> $($_.Value)"
}
