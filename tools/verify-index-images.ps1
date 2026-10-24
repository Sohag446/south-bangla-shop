$indexContent = Get-Content 'index.html' -Raw
$imgSrcRegex = [regex]'<img[^>]+src=["'']([^"'']+)["'']'
$matches = $imgSrcRegex.Matches($indexContent)
$unique = $matches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique

Write-Host "=== index.html Image Audit ==="
Write-Host "Total unique image src tags: $($unique.Count)"

$missing = @()
$remote = @()
foreach ($src in $unique) {
    if ($src -like 'http*') {
        $remote += $src
    } elseif ($src -like 'assets/*') {
        if (-not (Test-Path $src)) {
            $missing += $src
        }
    }
}
Write-Host "Missing local images: $($missing.Count)"
if ($missing.Count -gt 0) {
    $missing | ForEach-Object { Write-Host "  MISSING: $_" }
}
Write-Host "Remote URLs in index.html: $($remote.Count)"
if ($remote.Count -gt 0) {
    $remote | ForEach-Object { Write-Host "  REMOTE: $_" }
}

$placeholders = [regex]::Matches($indexContent, 'placeholder-product\.svg')
Write-Host "Placeholder references in index.html: $($placeholders.Count)"
