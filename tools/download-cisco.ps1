$redirects = @(
    @{ Name = "cisco-c1000-24t"; Url = "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG6ilV51E_wkOdvZbWXxg6YOoxXMGNGciYmKTLmIH-c0vfE_-Homg3QQWlEmrMM-XK2iSJedbzPNJcGmkgoWIvR93CbIrTfF8DRvECIfA5abLq1RPJMg4rttkRFs6oDHlhR023uYVB_f-mpXoASPIsXMCHHJ15ioOrGfuCCPA==" },
    @{ Name = "cisco-c1000-16p"; Url = "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFJjRMxCKKaB7SJyqXdV7wVPuzXuz8mjGEQgI8mPJ4MTzgxnSoWCGDSlcGen7UCdXh8w8zXL5SnKbLKIRRiCdQv5VP-7qVbkPir3MhGr4vZSWg4avvZ3HIhQrrSzSoP52Cd3SFj3WhI1B8gNnNLI-aOBh4yWVlCeZr4W2wnc4o=" },
    @{ Name = "cisco-c1200-24t"; Url = "https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_qA9iOflqVHb-3QgVLyw3uZPZLHEKoO00FrVGWiaYP6M-thJzQVKJXrxr3R-Sj33WZP4DyqLilgcMQxaXabrRtt8mHgTZurbl8z_ahnFJv8oQ3qpvsi5oEH0xedRFEDVdSc76H8n7zsz9tY1KHeIoox-WoZTVXvQbFcfx" }
)

foreach ($r in $redirects) {
    try {
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
    } catch {
        Write-Host "  ERROR: $($_.Exception.Message)"
    }
}
