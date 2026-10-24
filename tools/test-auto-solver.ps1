$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
    "Accept-Language" = "en-US,en;q=0.5"
}

$url = "https://www.southbanglabd.com/backend/products/image/962631605.jpg"
Write-Host "Step 1: Fetching initial challenge..."
$res1 = Invoke-WebRequest -Uri $url -WebSession $session -Headers $headers -UseBasicParsing
$html = $res1.Content
Write-Host "Length: $($html.Length)"

# Extract parameters using regex
# Look for X = '/z...'
$actionMatch = [System.Text.RegularExpressions.Regex]::Match($html, "X='(/z[a-f0-9]+)'")
$idMatch = [System.Text.RegularExpressions.Regex]::Match($html, "r\['name'\]='id',r\[[^\]]+\]='([a-f0-9]+)'")
$tsMatch = [System.Text.RegularExpressions.Regex]::Match($html, "w\['name'\]='ts',w\[[^\]]+\]='(\d+)'")
$pdataMatch = [System.Text.RegularExpressions.Regex]::Match($html, "M='([^']+)'")

Write-Host "Action: $($actionMatch.Groups[1].Value)"
Write-Host "ID: $($idMatch.Groups[1].Value)"
Write-Host "TS: $($tsMatch.Groups[1].Value)"
Write-Host "pdata: $($pdataMatch.Groups[1].Value)"

# Extract Q and s expressions
$qMatch = [System.Text.RegularExpressions.Regex]::Match($html, 'Q=\+\(([^;]+)\),m=')
$sMatch = [System.Text.RegularExpressions.Regex]::Match($html, 's=\+\(([^;]+)\),b=')

Write-Host "Q expr: $($qMatch.Groups[1].Value.Length) chars"
Write-Host "s expr: $($sMatch.Groups[1].Value.Length) chars"

# Let's evaluate Q and s
function Eval-JsNum($expr) {
    # Each digit is formed by (+!+[]+!![]...)
    # Split by +
    $digits = [System.Text.RegularExpressions.Regex]::Matches($expr, '\(\+!([^)]+)\)')
    $str = ""
    foreach ($d in $digits) {
        $val = ([System.Text.RegularExpressions.Regex]::Matches($d.Value, '!\+\[\]|!!\[\]')).Count
        $str += "$val"
    }
    return [int64]$str
}

$qVal = Eval-JsNum $qMatch.Groups[1].Value
$sVal = Eval-JsNum $sMatch.Groups[1].Value
$sum = $qVal + $sVal
Write-Host "Q: $qVal, s: $sVal, Sum: $sum"

$verifyUrl = "https://www.southbanglabd.com$($actionMatch.Groups[1].Value)?wsidchk=$sum&id=$($idMatch.Groups[1].Value)&ts=$($tsMatch.Groups[1].Value)&pdata=$($pdataMatch.Groups[1].Value)&cttl=0"
Write-Host "Step 2: Submitting verification: $verifyUrl"

$verifyHeaders = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    "Referer" = $url
}

try {
    $res2 = Invoke-WebRequest -Uri $verifyUrl -WebSession $session -Headers $verifyHeaders -MaximumRedirection 0 -ErrorAction SilentlyContinue
    Write-Host "Verify status: $($res2.StatusCode)"
    Write-Host "Cookies: $($session.Cookies.GetCookies([System.Uri]'https://www.southbanglabd.com/').Count)"
} catch {
    Write-Host "Verify redirect status: $($_.Exception.Response.StatusCode)"
}

Write-Host "Step 3: Fetching image again with session..."
$res3 = Invoke-WebRequest -Uri $url -WebSession $session -Headers $verifyHeaders -UseBasicParsing
Write-Host "Final Content-Type: $($res3.Headers['Content-Type'])"
Write-Host "Final Size: $($res3.Content.Length)"
