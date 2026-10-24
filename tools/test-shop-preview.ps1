$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "file:///c:/Users/Sohag Hossen/Documents/south bangla shop/shop.html"
$screenshot = "$PSScriptRoot\shop-catalog-preview.png"

$args = "--headless=new --window-size=1400,2400 --virtual-time-budget=3000 --screenshot=`"$screenshot`" `"$url`""
Start-Process -FilePath $chromePath -ArgumentList $args -Wait -WindowStyle Hidden

if (Test-Path $screenshot) {
    $len = (Get-Item $screenshot).Length
    Write-Host "SUCCESS: Captured $screenshot ($len bytes)"
} else {
    Write-Host "FAILED to capture screenshot"
}
