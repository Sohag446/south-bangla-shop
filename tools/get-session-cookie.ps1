$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$tempProfile = "$env:TEMP\chrome-cdp-profile"
if (Test-Path $tempProfile) { Remove-Item -Path $tempProfile -Recurse -Force }

$proc = Start-Process -FilePath $chromePath -ArgumentList "--headless=new --disable-blink-features=AutomationControlled --remote-debugging-port=9222 --user-data-dir=`"$tempProfile`" `"https://www.southbanglabd.com/`"" -PassThru

Write-Host "Chrome launched. Waiting 7 seconds for challenge to complete..."
Start-Sleep -Seconds 7

# Connect to WebSocket
$pages = Invoke-RestMethod -Uri "http://127.0.0.1:9222/json"
$page = $pages | Where-Object { $_.type -eq "page" } | Select-Object -First 1
Write-Host "Page title: $($page.title)"
Write-Host "Page URL: $($page.url)"

# Use ClientWebSocket to send Network.getCookies
$ws = New-Object System.Net.WebSockets.ClientWebSocket
$cts = New-Object System.Threading.CancellationTokenSource
$ws.ConnectAsync([System.Uri]$page.webSocketDebuggerUrl, $cts.Token).Wait()

$cmd = '{"id": 1, "method": "Network.getCookies", "params": {"urls": ["https://www.southbanglabd.com/"]}}'
$bytes = [System.Text.Encoding]::UTF8.GetBytes($cmd)
$segment = New-Object System.ArraySegment[byte] -ArgumentList @(,$bytes)
$ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait()

$buffer = New-Object byte[] 65536
$recvSegment = New-Object System.ArraySegment[byte] -ArgumentList @(,$buffer)
$result = $ws.ReceiveAsync($recvSegment, $cts.Token).Result
$responseJson = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $result.Count)

$cookieObj = $responseJson | ConvertFrom-Json
$cookies = $cookieObj.result.cookies
Write-Host "Total cookies retrieved: $($cookies.Count)"
$cookieHeader = ($cookies | ForEach-Object { "$($_.name)=$($_.value)" }) -join "; "
Write-Host "Cookie Header: $cookieHeader"

# Save cookie to file
[System.IO.File]::WriteAllText("$PSScriptRoot\southbangla-cookie.txt", $cookieHeader, [System.Text.Encoding]::UTF8)

# Close websocket and chrome
$ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Done", $cts.Token).Wait()
if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
