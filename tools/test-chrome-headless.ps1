$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "https://www.southbanglabd.com/"
$dumpFile = "$PSScriptRoot\chrome-dump.html"

# Run chrome with automation hidden and virtual time budget
$args = "--headless=new --disable-blink-features=AutomationControlled --user-agent=`"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36`" --virtual-time-budget=5000 --dump-dom `"$url`""

Start-Process -FilePath $chromePath -ArgumentList $args -RedirectStandardOutput $dumpFile -Wait -WindowStyle Hidden
$content = [System.IO.File]::ReadAllText($dumpFile)
Write-Host "Chrome headless dump length: $($content.Length)"
$imgMatches = [System.Text.RegularExpressions.Regex]::Matches($content, '<img[^>]+src="([^"]+)"')
Write-Host "Img matches found: $($imgMatches.Count)"
$imgMatches | Select-Object -First 10 | ForEach-Object { Write-Host $_.Groups[1].Value }
