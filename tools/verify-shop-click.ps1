$chromePath = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$url = 'file:///c:/Users/Sohag Hossen/Documents/south bangla shop/shop.html'
$dumpFile = "$PSScriptRoot\chrome-shop-rendered.html"
$args = "--headless=new --virtual-time-budget=4000 --dump-dom `"$url`""
Start-Process -FilePath $chromePath -ArgumentList $args -RedirectStandardOutput $dumpFile -Wait -WindowStyle Hidden
$c = Get-Content $dumpFile -Raw
$links = [regex]::Matches($c, 'class="glam-card__img-link"')
Write-Host "Rendered glam-card__img-link count: $($links.Count)"

# Also print the first rendered card media HTML
if ($c -match '<div class="glam-card__media">[\s\S]*?</div>') {
    Write-Host "`nSample Card Media HTML:"
    Write-Host $Matches[0]
}
