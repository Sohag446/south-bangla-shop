$content = [System.IO.File]::ReadAllText("tools/chrome-dump.html", [System.Text.Encoding]::UTF8)

$matches = [System.Text.RegularExpressions.Regex]::Matches($content, '<script[^>]+src="([^"]+)"')
Write-Host "Script tags found: $($matches.Count)"
$matches | ForEach-Object { Write-Host $_.Groups[1].Value }
