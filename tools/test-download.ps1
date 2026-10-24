$url = "https://www.startech.com.bd/image/cache/catalog/switch/cisco/cbs110-24t-eu/cbs110-24t-eu-01-500x500.webp"
$dest = "assets/img/products/cisco-cbs110-24t.webp"
try {
    $wc = New-Object System.Net.WebClient
    $wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    $wc.Headers.Add("Referer", "https://www.startech.com.bd/")
    $wc.DownloadFile($url, $dest)
    $fi = Get-Item $dest
    Write-Host "SUCCESS: Downloaded $($fi.Length) bytes to $dest"
} catch {
    Write-Host "FAILED: $($_.Exception.Message)"
}
