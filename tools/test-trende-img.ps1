try {
    $url = "https://www.trende.com.bd/image/cache/catalog/Tx2l%20pro%20and%20hg1-956x510h.jpg"
    $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
    Write-Host "Trende image status: $($res.StatusCode)"
    Write-Host "Content-Type: $($res.Headers['Content-Type'])"
    Write-Host "Size: $($res.Content.Length)"
} catch {
    Write-Host "Error: $_"
}
