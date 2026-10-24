$filePath = 'C:\Users\Sohag Hossen\.gemini\antigravity-ide\brain\9266b970-4122-4d2f-87f3-ff20420e1505\.system_generated\steps\1371\content.md'
$text = [System.IO.File]::ReadAllText($filePath)
$matches = [System.Text.RegularExpressions.Regex]::Matches($text, 'href="(https://www\.trende\.com\.bd/[^"]+)"')
Write-Host "Total links found: $($matches.Count)"
$unique = $matches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique | Where-Object { $_ -notmatch 'css|javascript|#|route=account' }
$unique | Select-Object -First 50 | ForEach-Object { Write-Host $_ }
