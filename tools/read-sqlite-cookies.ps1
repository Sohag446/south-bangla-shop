$cookieFiles = Get-ChildItem -Path "tools\chrome-live-profile" -Recurse -Filter "Cookies"
foreach ($f in $cookieFiles) {
    Write-Host "Found cookie file: $($f.FullName) - Size: $($f.Length)"
    # Read strings from SQLite file
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    $text = [System.Text.Encoding]::ASCII.GetString($bytes)
    $matches = [System.Text.RegularExpressions.Regex]::Matches($text, '[a-zA-Z0-9_\-\.]{4,60}')
    Write-Host "Sample tokens in file:"
    $tokens = $matches | ForEach-Object { $_.Value } | Where-Object { $_ -match 'wsidchk|session|cf_|south|trende' }
    $tokens | Select-Object -First 20 | ForEach-Object { Write-Host "  $_" }
}
