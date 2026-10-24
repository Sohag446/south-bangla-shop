$files = @("brand.html", "contact.html", "quote.html", "support.html", "warranty.html", "branches.html", "category.html", "configurator.html", "dealer\index.html")
foreach ($f in $files) {
    if (Test-Path $f) {
        $lines = Get-Content $f
        Write-Output "=== $f ==="
        for ($i = 0; $i -lt $lines.Length; $i++) {
            if ($lines[$i] -match 'sbc-banner-tech-card') {
                $start = [Math]::Max(0, $i - 2)
                $end = [Math]::Min($lines.Length - 1, $i + 25)
                for ($j = $start; $j -le $end; $j++) {
                    Write-Output "$($j+1): $($lines[$j])"
                }
                break
            }
        }
    }
}
