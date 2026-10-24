$files = Get-ChildItem -Path . -Filter *.html
foreach ($f in $files) {
    $lines = Get-Content $f.FullName
    for ($i = 0; $i -lt $lines.Length; $i++) {
        if ($lines[$i] -match '<main') {
            Write-Output "$($f.Name): $($lines[$i])"
        }
    }
}
