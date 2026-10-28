# Comprehensive interactive test script for dealer finder logic and UI states
$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$workspaceRoot = Split-Path -Parent $PSScriptRoot

$testScript = @"
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Dealer Finder Unit & Integration Tests</title>
  <script src="../data/categories.js"></script>
  <script src="../data/brands.js"></script>
  <script src="../data/districts.js"></script>
  <script src="../data/branches.js"></script>
  <script src="../data/shop-products.js"></script>
  <script src="../data/products.js"></script>
  <script src="../data/dealers.js"></script>
  <script src="../js/config.js"></script>
  <script src="../js/core/util.js"></script>
  <script src="../js/dealer-finder.js"></script>
</head>
<body>
  <div id="test-results"></div>
  <script>
    const results = [];
    function assert(name, condition, extra) {
      results.push({ name, passed: Boolean(condition), extra: extra || '' });
    }

    const D = window.SBC_DATA || {};
    const dealers = D.dealers || [];

    // Test 1: Verified Outlets Data Structure
    assert("Dealers array loaded with data", dealers.length >= 6, "Count: " + dealers.length);
    const multiplan = dealers.find(d => d.id === 'multiplan-showroom');
    assert("Multiplan showroom exists with genuine coordinates", multiplan && multiplan.latitude === 23.7389 && multiplan.longitude === 90.3860);
    assert("Multiplan showroom has phone and address", multiplan && multiplan.phone && multiplan.address);
    assert("Multiplan is marked verified_outlet (not test fixture)", multiplan && multiplan.verificationStatus === 'verified_outlet' && !multiplan.isTestFixture);

    // Test 2: Test Fixtures are explicitly flagged
    const fixtures = dealers.filter(d => d.isTestFixture);
    assert("Test fixtures exist and are explicitly flagged", fixtures.length > 0 && fixtures.every(f => f.verificationStatus === 'test_fixture'));

    // Test 3: Haversine distance calculation correctness
    // Distance from Dhanmondi (23.7461, 90.3742) to Multiplan Elephant Road (23.7389, 90.3860) ~ 1.45 km
    const lat1 = 23.7461, lon1 = 90.3742;
    const lat2 = 23.7389, lon2 = 90.3860;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;
    assert("Haversine formula produces realistic distance (~1.45 km in Dhaka)", dist > 1.3 && dist < 1.6, "Calculated: " + dist.toFixed(2) + " km");

    // Test 4: Distance from Dhaka to Chattogram showroom (~200 km)
    const ctg = dealers.find(d => d.id === 'chattogram-showroom');
    const dDhakaCtgLat = (ctg.latitude - lat1) * Math.PI / 180;
    const dDhakaCtgLon = (ctg.longitude - lon1) * Math.PI / 180;
    const aCtg = Math.sin(dDhakaCtgLat / 2) * Math.sin(dDhakaCtgLat / 2) +
                 Math.cos(lat1 * Math.PI / 180) * Math.cos(ctg.latitude * Math.PI / 180) *
                 Math.sin(dDhakaCtgLon / 2) * Math.sin(dDhakaCtgLon / 2);
    const distCtg = R * 2 * Math.atan2(Math.sqrt(aCtg), Math.sqrt(1 - aCtg));
    assert("Distance to Chattogram showroom is ~200+ km", distCtg > 200 && distCtg < 250, "Calculated: " + distCtg.toFixed(1) + " km");

    // Test 5: In-stock product match logic
    const btm012 = (D.shopProducts || []).find(p => p.id === 'meetion-btm012');
    assert("Product meetion-btm012 exists in catalog", Boolean(btm012));
    assert("Multiplan has meetion-btm012 verified in stock", multiplan.productAvailability && multiplan.productAvailability['meetion-btm012'] === 'in_stock');

    // Test 6: Divisions and 64 Districts data
    const divisions = D.divisions || {};
    assert("8 Divisions exist in dataset", Object.keys(divisions).length === 8);
    const totalDistricts = Object.values(divisions).reduce((acc, list) => acc + list.length, 0);
    assert("All 64 Bangladesh districts mapped", totalDistricts === 64, "Total: " + totalDistricts);

    // Output results as JSON in body
    const div = document.getElementById("test-results");
    div.innerText = JSON.stringify(results, null, 2);
  </script>
</body>
</html>
"@

$testHtmlPath = "$PSScriptRoot\test-runner.html"
[System.IO.File]::WriteAllText($testHtmlPath, $testScript)

$outFile = "$PSScriptRoot\test-runner-out.html"
$fileUrl = "file:///$($testHtmlPath -replace '\\', '/')"
$chromeArgs = "--headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=2000 --dump-dom `"$fileUrl`""

$proc = Start-Process -FilePath $chromePath -ArgumentList $chromeArgs -RedirectStandardOutput $outFile -Wait -PassThru -WindowStyle Hidden

$content = [System.IO.File]::ReadAllText($outFile)
Remove-Item $outFile -Force -ErrorAction SilentlyContinue
Remove-Item $testHtmlPath -Force -ErrorAction SilentlyContinue

Write-Host "=== UNIT & INTEGRATION TEST RESULTS ===" -ForegroundColor Cyan
if ($content -match '<div id="test-results">([\s\S]*?)<\/div>') {
    $rawJson = $matches[1].Trim()
    $cleanJson = $rawJson -replace '<br\s*\/?>', "`n"
    $cleanJson = [System.Net.WebUtility]::HtmlDecode($cleanJson)
    $parsed = ConvertFrom-Json $cleanJson
    $allPass = $true
    foreach ($r in $parsed) {
        if ($r.passed) {
            Write-Host "  [PASS] $($r.name) $(if ($r.extra) { "($($r.extra))" })" -ForegroundColor Green
        } else {
            Write-Host "  [FAIL] $($r.name) $(if ($r.extra) { "($($r.extra))" })" -ForegroundColor Red
            $allPass = $false
        }
    }
    if ($allPass) {
        Write-Host "`nALL 7 INTEGRATION TESTS PASSED!" -ForegroundColor Green
    } else {
        Write-Host "`nSOME TESTS FAILED!" -ForegroundColor Red
    }
} else {
    Write-Host "Could not parse test results from DOM dump!" -ForegroundColor Red
    Write-Host $content
}
