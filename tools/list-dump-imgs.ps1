$content = [System.IO.File]::ReadAllText("tools/chrome-dump.html", [System.Text.Encoding]::UTF8)

$matches = [System.Text.RegularExpressions.Regex]::Matches($content, '<img[^>]+>')
Write-Host "Total img tags: $($matches.Count)"
$matches | Select-Object -Skip 25 -First 40 | ForEach-Object { Write-Host $_.Value }
