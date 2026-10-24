# Read all image mappings from data/shop-products.js
$shopContent = Get-Content 'data/shop-products.js' -Raw
$shopRegex = [regex]'id:\s*"([^"]+)",[\s\S]*?images:\s*\["([^"]+)"\]'
$shopMatches = $shopRegex.Matches($shopContent)

$map = @{}
foreach ($m in $shopMatches) {
    $id = $m.Groups[1].Value
    $img = $m.Groups[2].Value
    $map[$id] = $img
}

Write-Host "Loaded $($map.Count) product image mappings from data/shop-products.js"

# Update data/products.js
$file = "data/products.js"
$lines = [System.IO.File]::ReadAllLines($file)
$updatedCount = 0
$currentId = ""

for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line -match '^\s+id:\s+"([^"]+)"') {
        $currentId = $Matches[1]
    }
    
    if ($currentId -and $line -match 'images:\s*\["(.*?)"\]') {
        if ($map.ContainsKey($currentId)) {
            $newImg = $map[$currentId]
            $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', "images: [`"$newImg`"]"
            $updatedCount++
        } else {
            # Fallback by brand or type
            Write-Host "Unmapped in shop-products: $currentId"
            if ($currentId -like '*tenda*') {
                $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', 'images: ["assets/img/products/tenda-ax12-pro.jpg"]'
                $updatedCount++
            } elseif ($currentId -like '*cisco*') {
                $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', 'images: ["assets/img/products/cisco-c1000-24t.webp"]'
                $updatedCount++
            } elseif ($currentId -like '*must*') {
                $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', 'images: ["assets/img/products/must-ew2110-800.jpg"]'
                $updatedCount++
            } elseif ($currentId -like '*solitine*') {
                $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', 'images: ["assets/img/products/solitine-panel-24p.jpg"]'
                $updatedCount++
            } elseif ($currentId -like '*tumtec*') {
                $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', 'images: ["assets/img/products/tumtec-fst-18s.webp"]'
                $updatedCount++
            } elseif ($currentId -like '*hsgq*') {
                $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', 'images: ["assets/img/products/vsol-v2801sg.jpg"]'
                $updatedCount++
            } elseif ($currentId -like '*ipcom*') {
                $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', 'images: ["assets/img/products/tenda-teg2210p.jpg"]'
                $updatedCount++
            } elseif ($currentId -like '*hkc*') {
                $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', 'images: ["assets/img/products/hkc-monitor.webp"]'
                $updatedCount++
            } elseif ($currentId -like '*ubiquiti*') {
                $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', 'images: ["assets/img/products/mikrotik-cap-ac.webp"]'
                $updatedCount++
            } elseif ($currentId -like '*rosenberger*') {
                $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', 'images: ["assets/img/products/dbc-c6-305m.webp"]'
                $updatedCount++
            } elseif ($currentId -like '*phyhome*') {
                $lines[$i] = $line -replace 'images:\s*\["(.*?)"\]', 'images: ["assets/img/products/vsol-v2801sg.jpg"]'
            }
        }
        $currentId = "" # reset
    }
}

[System.IO.File]::WriteAllLines($file, $lines)
Write-Host "Successfully updated $updatedCount products in $file!"
