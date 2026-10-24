$urls = @(
    "https://www.meetion.com/vibekeyb68.html",
    "https://www.meetion.com/meetion-sp2011.html",
    "https://www.meetion.com/meetion-sp2010.html",
    "https://www.meetion.com/mt-u002.html",
    "https://www.meetion.com/h390.html"
)

foreach ($u in $urls) {
    try {
        $res = Invoke-WebRequest -Uri $u -UserAgent 'Mozilla/5.0' -TimeoutSec 10 -UseBasicParsing
        $m = [System.Text.RegularExpressions.Regex]::Matches($res.Content, 'https?://[^\s"''<>]+\.(?:jpg|png|webp)')
        Write-Host "URL: $u - Matches: $($m.Count)"
        $m | ForEach-Object { $_.Value } | Where-Object { $_ -match 'upload|product|goods|attachment' } | Select-Object -Unique -First 3 | ForEach-Object { Write-Host "   $_" }
    } catch {
        Write-Host "Failed: $u - $_"
    }
}
