$redirects = @(
    @{ Name = "hkc-gaming-monitor"; Url = "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG5azpEM7HdBTyvU-BbXTaL0Jy9OducBTl04rBM45EyOfDBVHF7bAqUPuBOmJIXCVcqEa-XY-AZV1JDx33_81AsS-_hCKnd5WNlhjms8-Hx92miDlJ9Ghe5RPeaDn-ijU5vmXqV" }
)

foreach ($r in $redirects) {
    $req = [System.Net.HttpWebRequest]::Create($r.Url)
    $req.AllowAutoRedirect = $true
    $res = $req.GetResponse()
    $finalUrl = $res.ResponseUri.AbsoluteUri
    Write-Host "$($r.Name) => $finalUrl"
    
    $wc = New-Object System.Net.WebClient
    $wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
    $html = $wc.DownloadString($finalUrl)
    if ($html -match 'property="og:image"\s+content="([^"]+)"') {
        $img = $Matches[1].Replace("1200x630", "500x500")
        Write-Host "  OG IMAGE: $img"
        $dest = "assets/img/products/$($r.Name).webp"
        $wc.DownloadFile($img, $dest)
        Write-Host "  DOWNLOADED: $dest ($((Get-Item $dest).Length) bytes)"
    }
}
