$indexFile = "index.html"
$content = [System.IO.File]::ReadAllText($indexFile, [System.Text.Encoding]::UTF8)

# Find all product cards and their img tags
$matches = [System.Text.RegularExpressions.Regex]::Matches($content, '<article class="sbc-prod-card"[^>]*>.*?<img\s+src="([^"]+)"\s+alt="([^"]+)"[^>]*>.*?<h3[^>]*>.*?<a[^>]*>([^<]+)</a>', [System.Text.RegularExpressions.RegexOptions]::Singleline)

Write-Host "Total product cards in index.html: $($matches.Count)"
foreach ($m in $matches) {
    Write-Host "Product: $($m.Groups[3].Value.Trim())"
    Write-Host "  Img: $($m.Groups[1].Value)"
}
