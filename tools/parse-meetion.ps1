$file = "C:\Users\Sohag Hossen\.gemini\antigravity-ide\brain\9266b970-4122-4d2f-87f3-ff20420e1505\.system_generated\steps\1602\content.md"
$text = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Find all product thumbs and images
$matches = [System.Text.RegularExpressions.Regex]::Matches($text, '<div class="product-thumb".*?<img\s+(?:data-)?src="([^"]+)"[^>]*alt="([^"]+)"', [System.Text.RegularExpressions.RegexOptions]::Singleline)

Write-Host "Matched products: $($matches.Count)"
foreach ($m in $matches) {
    Write-Host "[$($m.Groups[2].Value)] -> $($m.Groups[1].Value)"
}

if ($matches.Count -eq 0) {
    # Let's search for image/cache/catalog/meetion
    $imgMatches = [System.Text.RegularExpressions.Regex]::Matches($text, 'https?://[^\s"''>]+image/(?:cache/)?catalog/[^"''>]+\.(?:jpg|png|webp)')
    Write-Host "Direct image matches: $($imgMatches.Count)"
    $imgMatches | ForEach-Object { $_.Value } | Select-Object -Unique | Select-Object -First 30 | ForEach-Object { Write-Host $_ }
}
