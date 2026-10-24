$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$profileDir = "$PSScriptRoot\chrome-live-profile"
$url = "https://www.southbanglabd.com/backend/products/image/962631605.jpg"
$destImg = "$PSScriptRoot\chrome-product-962631605.png"

$args = "--headless=new --disable-blink-features=AutomationControlled --user-data-dir=`"$profileDir`" --window-size=500,500 --screenshot=`"$destImg`" `"$url`""
Start-Process -FilePath $chromePath -ArgumentList $args -Wait -WindowStyle Hidden

if (Test-Path $destImg) {
    $f = Get-Item $destImg
    Write-Host "Screenshot created: $($f.FullName) - Size: $($f.Length) bytes"
} else {
    Write-Host "Failed to create screenshot"
}
