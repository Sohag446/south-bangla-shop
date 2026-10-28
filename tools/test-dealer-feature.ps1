# Verification script for "Find the Nearest Dealer" feature
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$workspaceRoot = Split-Path -Parent $PSScriptRoot

Write-Host "=== 1. SYNTAX & INTEGRITY CHECK ===" -ForegroundColor Cyan

# Check data/dealers.js
$dealersJs = Get-Content "$workspaceRoot\data\dealers.js" -Raw
$dOpenB = ([regex]::Matches($dealersJs, '\{')).Count
$dCloseB = ([regex]::Matches($dealersJs, '\}')).Count
Write-Host "data/dealers.js - Open Braces: $dOpenB, Close Braces: $dCloseB"
if ($dOpenB -ne $dCloseB) { throw "Brace mismatch in data/dealers.js" }

# Check js/dealer-finder.js
$finderJs = Get-Content "$workspaceRoot\js\dealer-finder.js" -Raw
$fOpenB = ([regex]::Matches($finderJs, '\{')).Count
$fCloseB = ([regex]::Matches($finderJs, '\}')).Count
Write-Host "js/dealer-finder.js - Open Braces: $fOpenB, Close Braces: $fCloseB"
if ($fOpenB -ne $fCloseB) { throw "Brace mismatch in js/dealer-finder.js" }

# Check css/dealer-finder.css
$finderCss = Get-Content "$workspaceRoot\css\dealer-finder.css" -Raw
$cOpenB = ([regex]::Matches($finderCss, '\{')).Count
$cCloseB = ([regex]::Matches($finderCss, '\}')).Count
Write-Host "css/dealer-finder.css - Open Braces: $cOpenB, Close Braces: $cCloseB"
if ($cOpenB -ne $cCloseB) { throw "Brace mismatch in css/dealer-finder.css" }

Write-Host "`n=== 2. CHROME HEADLESS RENDER TESTS ===" -ForegroundColor Cyan

function Test-PageRender($testName, $filePath, $query, $checks) {
    Write-Host "`nTesting: $testName" -ForegroundColor Yellow
    $fullUrl = "file:///$($filePath -replace '\\', '/')"
    if ($query) { $fullUrl += "$query" }
    
    $outFile = "$PSScriptRoot\temp-render.html"
    $chromeArgs = "--headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=3000 --dump-dom `"$fullUrl`""
    
    $proc = Start-Process -FilePath $chromePath -ArgumentList $chromeArgs -RedirectStandardOutput $outFile -Wait -PassThru -WindowStyle Hidden
    
    if (-not (Test-Path $outFile)) {
        Write-Host "FAILED: Output file was not created!" -ForegroundColor Red
        return $false
    }
    
    $renderedHtml = [System.IO.File]::ReadAllText($outFile)
    Remove-Item $outFile -Force -ErrorAction SilentlyContinue
    
    $allPassed = $true
    foreach ($check in $checks) {
        if ($renderedHtml -match [regex]::Escape($check)) {
            Write-Host "  [PASS] Found: '$check'" -ForegroundColor Green
        } else {
            Write-Host "  [FAIL] Missing: '$check'" -ForegroundColor Red
            $allPassed = $false
        }
    }
    return $allPassed
}

# Test 1: Product detail page has "Find the Nearest Dealer" button
$p1 = Test-PageRender "Single Product Page (Meetion BTM012)" `
    "$workspaceRoot\product.html" `
    "?id=meetion-btm012" `
    @("Find the Nearest Dealer", "Discover participating retailers near you.", "pdp-btn-find-dealer", "Meetion BTM012 Dual-Mode Ergonomic Wireless Mouse")

# Test 2: Another Product detail page (Meetion Keyboard MK008)
$p2 = Test-PageRender "Single Product Page (Meetion MK008 Keyboard)" `
    "$workspaceRoot\product.html" `
    "?id=meetion-mk008" `
    @("Find the Nearest Dealer", "pdp-btn-find-dealer", "Meetion MT-MK008 Pro")

# Test 3: Dealer finder page with selected product
$p3 = Test-PageRender "Dealer Finder Page with Meetion Product" `
    "$workspaceRoot\dealers.html" `
    "?product=meetion-btm012" `
    @("Find Your Nearest", "Meetion Dealer", "Meetion BTM012 Dual-Mode Ergonomic Wireless Mouse", "Multiplan Showroom", "IDB Bhabon Showroom", "Elephant Road", "Location Privacy:")

# Test 4: Dealer finder page without selected product
$p4 = Test-PageRender "Dealer Finder Page Direct Access (No Product)" `
    "$workspaceRoot\dealers.html" `
    "" `
    @("Find Your Nearest", "Authorized Dealer", "Multiplan Showroom", "IDB Bhabon Showroom", "All Divisions (Nationwide)")

# Test 5: dealers/index.html directory route
$p5 = Test-PageRender "dealers/index.html Directory Route" `
    "$workspaceRoot\dealers\index.html" `
    "?product=meetion-mk008" `
    @("Find Your Nearest", "Meetion Dealer", "Meetion MT-MK008 Pro", "Multiplan Showroom")

Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
if ($p1 -and $p2 -and $p3 -and $p4 -and $p5) {
    Write-Host "ALL TESTS PASSED!" -ForegroundColor Green
} else {
    Write-Host "SOME TESTS FAILED!" -ForegroundColor Red
}
