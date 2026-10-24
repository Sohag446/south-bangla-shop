$targets = @(
    "contact.html",
    "brand.html",
    "configurator.html",
    "branches.html",
    "category.html",
    "quote.html",
    "support.html",
    "warranty.html",
    "dealer\index.html",
    "about.html",
    "shop.html",
    "js\shop-controller.js",
    "css\layout.css",
    "css\contact.css"
)
foreach ($t in $targets) {
    if (Test-Path $t) {
        $content = [System.IO.File]::ReadAllText((Resolve-Path $t).Path)
        $content = $content -replace "\r\n", "`n"
        [System.IO.File]::WriteAllText((Resolve-Path $t).Path, $content, (New-Object System.Text.UTF8Encoding $false))
        Write-Output "Normalized $t"
    }
}
