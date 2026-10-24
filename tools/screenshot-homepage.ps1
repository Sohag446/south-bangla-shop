$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$indexHtmlPath = "file:///" + ("$PSScriptRoot\..\index.html" -replace '\\', '/')
$destScreenshot = "$PSScriptRoot\index-homepage-preview.png"

$args = "--headless=new --window-size=1280,2200 --screenshot=`"$destScreenshot`" `"$indexHtmlPath`""
Start-Process -FilePath $chromePath -ArgumentList $args -Wait -WindowStyle Hidden

if (Test-Path $destScreenshot) {
    $f = Get-Item $destScreenshot
    Write-Host "Homepage screenshot created: $($f.Length) bytes"
} else {
    Write-Host "Screenshot failed"
}
