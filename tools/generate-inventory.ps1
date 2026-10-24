# Inventory generator for all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter *.html -Recurse | Where-Object { $_.FullName -notmatch '\\(node_modules|\.git|\.gemini)\\' }

$results = @()

foreach ($f in $htmlFiles) {
    $relPath = $f.FullName.Substring((Get-Location).Path.Length + 1).Replace('\', '/')
    $content = [System.IO.File]::ReadAllText($f.FullName)
    
    $titleMatch = [regex]::Match($content, '<title>(.*?)</title>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    $title = if ($titleMatch.Success) { $titleMatch.Groups[1].Value.Trim() } else { "No Title" }
    
    $hasHeader = $content.Contains('id="sbc-header"') -or $content.Contains('class="sbc-header') -or $content.Contains('sbc-header')
    $hasFooter = $content.Contains('id="sbc-footer"') -or $content.Contains('class="sbc-footer') -or $content.Contains('sbc-footer')
    $hasViewport = $content.Contains('name="viewport"')
    
    $results += [PSCustomObject]@{
        File = $relPath
        Title = $title
        HasHeader = $hasHeader
        HasFooter = $hasFooter
        HasViewport = $hasViewport
        Lines = ($content -split "`n").Length
    }
}

Write-Output ("Total HTML Pages Found: " + $results.Count)
$results | Format-Table -Property File, HasViewport, HasHeader, HasFooter, Lines -AutoSize
