$url = 'https://www.startech.com.bd/tumtec-fst-18s-splicer-machine'
$wc = New-Object System.Net.WebClient
$wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
$html = $wc.DownloadString($url)
if ($html -match 'property="og:image"\s+content="([^"]+)"') {
    $img = $Matches[1].Replace("1200x630", "500x500")
    Write-Host "OG IMAGE: $img"
    $wc.DownloadFile($img, "assets/img/products/tumtec-fst-18s.webp")
    Write-Host "DOWNLOADED: assets/img/products/tumtec-fst-18s.webp ($((Get-Item assets/img/products/tumtec-fst-18s.webp).Length) bytes)"
}
