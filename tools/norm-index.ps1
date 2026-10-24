$f = "index.html"
$content = [System.IO.File]::ReadAllText((Resolve-Path $f).Path) -replace "\r\n", "`n"
[System.IO.File]::WriteAllText((Resolve-Path $f).Path, $content, (New-Object System.Text.UTF8Encoding $false))
Write-Output "Normalized index.html to LF"
