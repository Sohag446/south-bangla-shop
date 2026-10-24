$htmlFiles = Get-ChildItem -Path . -Recurse -Filter "*.html" | Where-Object { $_.FullName -notmatch '\\(\.git|node_modules)\\' }

$count = 0
foreach ($file in $htmlFiles) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    if ($content -match 'class="sbc-skip-link"') {
        # Remove the skip link line completely
        $newContent = [System.Text.RegularExpressions.Regex]::Replace($content, '\s*<a\s+href="#main-content"\s+class="sbc-skip-link"[^>]*>.*?</a>', '')
        if ($newContent -ne $content) {
            [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
            $count++
            Write-Host "Cleaned skip link in: $($file.Name)"
        }
    }
}

Write-Host "Total files cleaned: $count"
