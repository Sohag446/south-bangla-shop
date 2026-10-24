$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$profileDir = "$PSScriptRoot\chrome-live-profile"

$proc = Start-Process -FilePath $chromePath -ArgumentList "--disable-blink-features=AutomationControlled --user-data-dir=`"$profileDir`" `"https://www.southbanglabd.com/`"" -PassThru

Write-Host "Launched Chrome for 12 seconds..."
Start-Sleep -Seconds 12

if ($proc -and -not $proc.HasExited) {
    Stop-Process -Id $proc.Id -Force
}

Write-Host "Done."
