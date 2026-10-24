$results = Get-ChildItem -Path . -Recurse -Filter *.html | Select-String -Pattern 'sbc-banner-tech-card'
$results | Group-Object Path | ForEach-Object {
    $rel = Resolve-Path -Relative $_.Name
    Write-Output "$rel ($($_.Count) matches)"
}
