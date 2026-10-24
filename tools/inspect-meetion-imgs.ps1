$urls = @(
    "https://www.meetion.com/mt-u002.html",
    "https://www.meetion.com/h390.html"
)

foreach ($u in $urls) {
    $res = Invoke-WebRequest -Uri $u -UserAgent 'Mozilla/5.0' -TimeoutSec 10 -UseBasicParsing
    $m = [System.Text.RegularExpressions.Regex]::Matches($res.Content, '<img[^>]+src="([^"]+)"')
    Write-Host "URL: $u"
    $m | ForEach-Object { $_.Groups[1].Value } | Where-Object { $_ -match '\.(jpg|png|webp)' -and $_ -notmatch 'logo|icon|banner|footer' } | Select-Object -Unique -First 3 | ForEach-Object { Write-Host "   $_" }
}
