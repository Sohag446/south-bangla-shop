$downloads = @(
    @{
        Url = "https://www.startech.com.bd/image/cache/catalog/switch/cisco/cbs350-24p-4x-eu/cbs350-24p-4x-eu-01-500x500.webp"
        Dest = "assets/img/products/cisco-cbs350-24p.webp"
    }
)

$wc = New-Object System.Net.WebClient
$wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
$wc.Headers.Add("Referer", "https://www.startech.com.bd/")

foreach ($d in $downloads) {
    try {
        $wc.DownloadFile($d.Url, $d.Dest)
        $len = (Get-Item $d.Dest).Length
        Write-Host "SUCCESS: $($d.Dest) ($len bytes)"
    } catch {
        Write-Host "FAILED: $($d.Dest) - $($_.Exception.Message)"
    }
}
