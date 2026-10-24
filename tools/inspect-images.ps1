$filePath = 'C:\Users\Sohag Hossen\.gemini\antigravity-ide\brain\9266b970-4122-4d2f-87f3-ff20420e1505\.system_generated\steps\1371\content.md'
$text = [System.IO.File]::ReadAllText($filePath)
$matches = [System.Text.RegularExpressions.Regex]::Matches($text, 'https?://[^\s"''>]+\.(?:jpg|jpeg|png|webp)')
Write-Host "Total image URLs found: $($matches.Count)"
$unique = $matches | ForEach-Object { $_.Value } | Select-Object -Unique | Select-Object -First 40
$unique | ForEach-Object { Write-Host $_ }
