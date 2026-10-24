$files = Get-ChildItem -Path . -Include *.html,*.js -Recurse | Where-Object { $_.FullName -notmatch '\\(node_modules|\.git|\.gemini|tools)\\' }
$patterns = @(
    'Direct Communication Hub',
    '01746 175 778',
    '01973009007',
    '12 Service Centers',
    '1-Hr Express RMA',
    'Express Swap',
    'glam-bottom-banner__support'
)

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    $rel = $f.FullName.Substring((Get-Location).Path.Length + 1).Replace('\', '/')
    foreach ($p in $patterns) {
        if ($content -match [regex]::Escape($p)) {
            Write-Output "Matched '$p' in $rel"
        }
    }
}
