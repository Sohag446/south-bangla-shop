# Link Checker for Local Prototype Files (ignoring JS template strings)
$filesToCheck = @('index.html', 'shop.html', 'product.html', 'cart.html', 'contact.html')

$brokenCount = 0
$checkedCount = 0
$brokenList = @()

foreach ($relPath in $filesToCheck) {
    if (-not (Test-Path $relPath)) { continue }
    $content = [System.IO.File]::ReadAllText($relPath)
    
    # Match href="..." and src="..."
    $matches = [regex]::Matches($content, '(?:href|src)=["'']([^"'':#?]+)(?:[?#][^"'']*)?["'']')
    foreach ($m in $matches) {
        $link = $m.Groups[1].Value.Trim()
        if ($link -match '^(http|https|mailto|tel|javascript|data):' -or $link -eq '' -or $link.StartsWith('#') -or $link.StartsWith('$')) {
            continue
        }
        $checkedCount++
        
        # Resolve target
        $targetPath = $link
        if (-not (Test-Path $targetPath)) {
            $brokenList += "In $relPath -> '$link'"
            $brokenCount++
        }
    }
}

Write-Output "Total internal asset & page links checked: $checkedCount"
Write-Output "Total broken links found: $brokenCount"
if ($brokenCount -gt 0) {
    Write-Output "Broken Links:"
    $brokenList | ForEach-Object { Write-Output " - $_" }
} else {
    Write-Output "All $checkedCount static links and asset paths are valid!"
}
