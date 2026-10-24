$files = Get-ChildItem -Path . -Include *.html,*.js,*.json,*.md -Recurse | Where-Object { $_.FullName -notmatch '\\(node_modules|\.git|\.gemini|tools)\\' }
$results = @()
foreach ($f in $files) {
    $matches = Select-String -Path $f.FullName -Pattern 'tp-link|tplink|\btp\s+link\b' -CaseSensitive:$false
    if ($matches) {
        $rel = $f.FullName.Substring((Get-Location).Path.Length + 1).Replace('\', '/')
        foreach ($m in $matches) {
            $results += "$rel : Line $($m.LineNumber) : $($m.Line.Trim())"
        }
    }
}
Write-Output "Total matches: $($results.Count)"
$results | ForEach-Object { Write-Output $_ }
