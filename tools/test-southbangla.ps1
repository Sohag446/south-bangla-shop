$response = Invoke-WebRequest -Uri "https://www.southbanglabd.com/" -UseBasicParsing -TimeoutSec 10
[System.IO.File]::WriteAllText("tools/southbangla-home.html", $response.Content, [System.Text.Encoding]::UTF8)
$imgTags = [System.Text.RegularExpressions.Regex]::Matches($response.Content, '<img[^>]+>')
Write-Host "Total img tags: $($imgTags.Count)"
$imgTags | Select-Object -First 20 | ForEach-Object { Write-Host $_.Value }
