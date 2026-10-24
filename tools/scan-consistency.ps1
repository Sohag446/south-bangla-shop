# Scan repository for consistency and unverified claims
$files = Get-ChildItem -Path . -Include *.html,*.js -Recurse | Where-Object { $_.FullName -notmatch '\\(node_modules|\.git|\.gemini|tools|tests)\\' }

$flagged = @()

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    $rel = $f.FullName.Substring((Get-Location).Path.Length + 1).Replace('\', '/')
    
    if ($content -match 'info@example\.com|contact@example\.com|test@test\.com') {
        $flagged += "Placeholder email in: $rel"
    }
    if ($content -match '555-0199|\+1-555|\(555\)') {
        $flagged += "Placeholder phone in: $rel"
    }
    if ($content -match 'South Bangla Computer\b' -and $content -notmatch 'South Bangla Computers\b') {
        # Check if singular is used without 's'
        $singularCount = ([regex]::Matches($content, 'South Bangla Computer(?![sS])')).Count
        if ($singularCount -gt 0) {
            $flagged += "Singular 'South Bangla Computer' ($singularCount times) in: $rel"
        }
    }
}

Write-Output ("Total files scanned: " + $files.Count)
Write-Output ("Total issues flagged: " + $flagged.Count)
$flagged | ForEach-Object { Write-Output " - $_" }
