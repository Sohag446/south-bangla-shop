$htmlFiles = Get-ChildItem -Filter *.html
Write-Host "Auditing $($htmlFiles.Count) HTML files..."

$allBroken = @()
$allRemote = @()

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    $matches = [regex]::Matches($content, '<img[^>]+src=["'']([^"'']+)["'']')
    foreach ($m in $matches) {
        $src = $m.Groups[1].Value
        # ignore template tags like ${...}
        if ($src -like '*${*') {
            continue
        }
        if ($src -like 'http*') {
            $allRemote += [PSCustomObject]@{ File = $file.Name; Src = $src }
        } else {
            # Normalize path
            $cleanSrc = $src.Split('?')[0].Split('#')[0]
            if (-not (Test-Path $cleanSrc)) {
                $allBroken += [PSCustomObject]@{ File = $file.Name; Src = $src }
            }
        }
    }
}

Write-Host "`n=== Audit Results ==="
Write-Host "Broken local paths count: $($allBroken.Count)"
if ($allBroken.Count -gt 0) {
    $allBroken | Format-Table -AutoSize
}

Write-Host "Remote URLs count: $($allRemote.Count)"
if ($allRemote.Count -gt 0) {
    $allRemote | Format-Table -AutoSize
}
