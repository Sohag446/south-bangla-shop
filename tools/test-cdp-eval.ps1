$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$tempProfile = "$env:TEMP\chrome-cdp-profile"
if (Test-Path $tempProfile) { Remove-Item -Path $tempProfile -Recurse -Force }

$proc = Start-Process -FilePath $chromePath -ArgumentList "--headless=new --disable-blink-features=AutomationControlled --remote-debugging-port=9222 --user-data-dir=`"$tempProfile`" `"https://www.trende.com.bd/`"" -PassThru

Start-Sleep -Seconds 2

$pages = Invoke-RestMethod -Uri "http://127.0.0.1:9222/json"
$page = $pages | Where-Object { $_.type -eq "page" } | Select-Object -First 1

$ws = New-Object System.Net.WebSockets.ClientWebSocket
$cts = New-Object System.Threading.CancellationTokenSource
$ws.ConnectAsync([System.Uri]$page.webSocketDebuggerUrl, $cts.Token).Wait()

$idCounter = 1
function Exec-CDP($method, $params) {
    $script:idCounter++
    $cmd = @{ id = $script:idCounter; method = $method; params = $params } | ConvertTo-Json -Compress
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($cmd)
    $segment = New-Object System.ArraySegment[byte] -ArgumentList @(,$bytes)
    $ws.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cts.Token).Wait()
    
    $buffer = New-Object byte[] 65536
    $recvSegment = New-Object System.ArraySegment[byte] -ArgumentList @(,$buffer)
    $result = $ws.ReceiveAsync($recvSegment, $cts.Token).Result
    return [System.Text.Encoding]::UTF8.GetString($buffer, 0, $result.Count)
}

$evalRes = Exec-CDP "Runtime.evaluate" @{ expression = "document.getElementById('yvukbecieayn') ? document.getElementById('yvukbecieayn').outerHTML : 'no target div'" ; returnByValue = $true }
Write-Host "Target div: $evalRes"

$evalRes2 = Exec-CDP "Runtime.evaluate" @{ expression = "document.title" ; returnByValue = $true }
Write-Host "Title: $evalRes2"

$ws.CloseAsync([System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure, "Done", $cts.Token).Wait()
if ($proc -and -not $proc.HasExited) { Stop-Process -Id $proc.Id -Force }
