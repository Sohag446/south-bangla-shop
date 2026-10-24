$map = @{
    "cisco-c9200l-24t"   = "assets/img/products/cisco-c1000-24t.webp"
    "cisco-c8200-1n-4t"  = "assets/img/products/mikrotik-ccr2004.webp"
    "cisco-c8200l-1n-4t" = "assets/img/products/mikrotik-ccr2004.webp"
    "cisco-cbs350-24t"   = "assets/img/products/cisco-cbs350-24p.webp"
    "cisco-cbs250-8p"    = "assets/img/products/cisco-cbs110-24t.webp"
    "cisco-2960x-24td"   = "assets/img/products/cisco-c1000-24t.webp"
    "cisco-rv340"        = "assets/img/products/mikrotik-rb4011.jpg"
    "cisco-isr-4331"     = "assets/img/products/mikrotik-ccr2004.webp"
    "cisco-sf300-24"     = "assets/img/products/cisco-cbs110-24t.webp"
    "must-ph91-12kw"     = "assets/img/products/must-ew2110-800.jpg"
    "must-ph91-10kw"     = "assets/img/products/must-ew2110-800.jpg"
    "must-ph91-8kw"      = "assets/img/products/must-ew2110-800.jpg"
    "must-ph91-6kw"      = "assets/img/products/must-ew2110-800.jpg"
    "must-ph91-5kw"      = "assets/img/products/must-ew2110-800.jpg"
    "must-ph91-36kw"     = "assets/img/products/must-ew2110-800.jpg"
}

$file = "data/shop-products.js"
$lines = [System.IO.File]::ReadAllLines($file)
$updatedCount = 0
$currentId = ""

for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line -match '^\s+id:\s+"([^"]+)"') {
        $currentId = $Matches[1]
    }
    
    if ($currentId -and $map.ContainsKey($currentId)) {
        if ($line -match 'images:\s*\["(.*?)"\]') {
            $newImg = $map[$currentId]
            $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', "images: [`"$newImg`"]"
            $updatedCount++
            $currentId = "" # reset
        }
    }
}

[System.IO.File]::WriteAllLines($file, $lines)
Write-Host "Successfully updated $updatedCount products in $file!"
