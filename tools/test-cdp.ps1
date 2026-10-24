$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$tempProfile = "$env:TEMP\chrome-cdp-test"

# Start chrome in background with remote debugging
$proc = Start-Process -FilePath $chromePath -ArgumentList "--headless=new --disable-blink-features=AutomationControlled --remote-debugging-port=9222 --user-data-dir=`"$tempProfile`"" -PassThru

Start-Sleep -Seconds 2

try {
    $res = Invoke-RestMethod -Uri "http://127.0.0.1:9222/json/version" -TimeoutSec 5
    Write-Host "Chrome CDP available! Browser: $($res.Browser)"
    Write-Host "WebSocket debugger URL: $($res.webSocketDebuggerUrl)"
} catch {
    Write-Host "Failed to connect to CDP: $_"
} finally {
    if ($proc -and -not $proc.HasExited) {
        Stop-Process -Id $proc.Id -Force
    }
}
