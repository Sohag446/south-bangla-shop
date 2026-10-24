$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$profileDir = "$PSScriptRoot\chrome-live-profile"
$url = "https://www.southbanglabd.com/"
$dumpFile = "$PSScriptRoot\chrome-live-dump.html"

$args = "--headless=new --disable-blink-features=AutomationControlled --user-data-dir=`"$profileDir`" --dump-dom `"$url`""
Start-Process -FilePath $chromePath -ArgumentList $args -RedirectStandardOutput $dumpFile -Wait -WindowStyle Hidden

$content = [System.IO.File]::ReadAllText($dumpFile)
Write-Host "Dump length: $($content.Length)"
if ($content -match '<title>([^<]+)</title>') {
    Write-Host "Title: $($matches[1])"
}
