$file = "C:\Users\Sohag Hossen\.gemini\antigravity-ide\brain\9266b970-4122-4d2f-87f3-ff20420e1505\.system_generated\steps\1626\content.md"
$text = [System.IO.File]::ReadAllText($file, [System.Text.Encoding]::UTF8)

# Find all product thumbs and images
$matches = [System.Text.RegularExpressions.Regex]::Matches($text, '<div class="product-thumb".*?<img\s+(?:data-)?src="([^"]+)"[^>]*alt="([^"]+)"', [System.Text.RegularExpressions.RegexOptions]::Singleline)

Write-Host "Matched Solitine products: $($matches.Count)"
foreach ($m in $matches) {
    Write-Host "[$($m.Groups[2].Value)] -> $($m.Groups[1].Value)"
}
