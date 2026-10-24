$c = [System.IO.File]::ReadAllText((Resolve-Path "js/configurator.js").Path) -replace "\r\n", "`n"
[System.IO.File]::WriteAllText((Resolve-Path "js/configurator.js").Path, $c, (New-Object System.Text.UTF8Encoding $false))
Write-Output "Normalized js/configurator.js"
