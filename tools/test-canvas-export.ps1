$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$tempProfile = "$env:TEMP\chrome-export-profile"
if (Test-Path $tempProfile) { Remove-Item -Path $tempProfile -Recurse -Force }

$exportHtmlPath = "file:///" + ("$PSScriptRoot\exporter.html" -replace '\\', '/')

$args = "--headless=new --disable-web-security --disable-blink-features=AutomationControlled --user-data-dir=`"$tempProfile`" --virtual-time-budget=8000 --dump-dom `"$exportHtmlPath`""
$dumpOutput = "$PSScriptRoot\exporter-dump.html"

Start-Process -FilePath $chromePath -ArgumentList $args -RedirectStandardOutput $dumpOutput -Wait -WindowStyle Hidden

$dump = [System.IO.File]::ReadAllText($dumpOutput)
Write-Host "Dump length: $($dump.Length)"

# Check if base64Data is present
if ($dump -match 'id="b64">(data:image/png;base64,[A-Za-z0-9+/=]+)<') {
    $b64 = $matches[1] -replace 'data:image/png;base64,', ''
    Write-Host "Success! Base64 length: $($b64.Length)"
    $bytes = [System.Convert]::FromBase64String($b64)
    [System.IO.File]::WriteAllBytes("assets/img/products/meetion-btm012.png", $bytes)
    Write-Host "Saved: assets/img/products/meetion-btm012.png ($($bytes.Length) bytes)"
} elseif ($dump -match 'id="err">([^<]+)<') {
    Write-Host "Error in page: $($matches[1])"
} else {
    Write-Host "Neither b64 nor err found in dump"
}
