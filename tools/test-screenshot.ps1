$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "https://www.southbanglabd.com/backend/products/image/962631605.jpg"
$destImg = "$PSScriptRoot\test-chrome-img-verified.png"

$args = "--headless=new --disable-blink-features=AutomationControlled --window-size=500,500 --virtual-time-budget=9000 --screenshot=`"$destImg`" `"$url`""
Start-Process -FilePath $chromePath -ArgumentList $args -Wait -WindowStyle Hidden

if (Test-Path $destImg) {
    $f = Get-Item $destImg
    Write-Host "Screenshot created: $($f.FullName) - Size: $($f.Length) bytes"
} else {
    Write-Host "Screenshot failed"
}
