# Extracted from 962631605.jpg challenge:
# X = '/z0f76a1d14fd21a8fb5fd0d03e0fdc3d3cedae52f'
# Q = 3489262, s = 5689202 => Q+s = 9178464
# id = '7fa3b767c460b54a2be4d49030b349c7'
# ts = '1792861893'
# pdata = 'https%3A%2F%2Fwww.southbanglabd.com%2Fbackend%2Fproducts%2Fimage%2F962631605.jpg'
# cttl = '0'

$verifyUrl = "https://www.southbanglabd.com/z0f76a1d14fd21a8fb5fd0d03e0fdc3d3cedae52f?wsidchk=9178464&id=7fa3b767c460b54a2be4d49030b349c7&ts=1792861893&pdata=https%3A%2F%2Fwww.southbanglabd.com%2Fbackend%2Fproducts%2Fimage%2F962631605.jpg&cttl=0"

$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    "Accept" = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
    "Referer" = "https://www.southbanglabd.com/backend/products/image/962631605.jpg"
}

try {
    $res = Invoke-WebRequest -Uri $verifyUrl -WebSession $session -Headers $headers -MaximumRedirection 0 -ErrorAction SilentlyContinue
    Write-Host "Verify status: $($res.StatusCode)"
    Write-Host "Set-Cookie: $($res.Headers['Set-Cookie'])"
    Write-Host "Location: $($res.Headers['Location'])"
} catch {
    Write-Host "Error/Redirect: $($_.Exception.Response.StatusCode)"
    Write-Host "Set-Cookie: $($_.Exception.Response.Headers['Set-Cookie'])"
    Write-Host "Location: $($_.Exception.Response.Headers['Location'])"
}
