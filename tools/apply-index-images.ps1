$indexFile = "index.html"
$content = [System.IO.File]::ReadAllText($indexFile, [System.Text.Encoding]::UTF8)

# Popular Products replacements
$replacements = @(
    @{ Old = 'src="assets/img/home/prod_tenda_f9.jpg" alt="Tenda AC10'; New = 'src="assets/img/products/tenda-ac10.jpg" alt="Tenda AC10' },
    @{ Old = 'src="assets/img/home/prod_tenda_switch.jpg" alt="Tenda TEG1024D'; New = 'src="assets/img/products/tenda-teg1024d.jpg" alt="Tenda TEG1024D' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/1966551378.jpg'; New = 'assets/img/products/must-ew2110-800.jpg' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/1230543292.jpg'; New = 'assets/img/products/tenda-o9.jpg' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/962631605.jpg'; New = 'assets/img/products/tenda-ax12-pro.jpg' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/1440784407.jpg'; New = 'assets/img/products/vsol-v2801sg.jpg' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/855190478.jpg'; New = 'assets/img/products/solitine-panel-24p.jpg' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/618068149.webp'; New = 'assets/img/products/tenda-tx2l-pro.jpg' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/1470565362.jpg'; New = 'assets/img/products/tenda-teg2210p.jpg' },

    # Meetion Section replacements
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/36742764.png'; New = 'assets/img/products/meetion-mk008-pro.jpg' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/544478617.jpg'; New = 'assets/img/products/meetion-btm032r.jpg' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/954485121.png'; New = 'assets/img/products/meetion-vibekey-b68.webp' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/1694178577.png'; New = 'assets/img/products/meetion-ikey-c210.webp' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/836755513.png'; New = 'assets/img/products/meetion-hp022.jpg' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/1202424832.jpg'; New = 'assets/img/products/meetion-btm012.jpg' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/1455351586.png'; New = 'assets/img/products/meetion-sp2011.webp' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/1928379151.png'; New = 'assets/img/products/meetion-sp2010.webp' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/466215169.png'; New = 'assets/img/products/meetion-u002.png' },
    @{ Old = 'https://www.southbanglabd.com/backend/products/image/2116031251.png'; New = 'assets/img/products/meetion-h390.png' }
)

$count = 0
foreach ($r in $replacements) {
    if ($content.Contains($r.Old)) {
        $content = $content.Replace($r.Old, $r.New)
        $count++
        Write-Host "Replaced: $($r.Old) -> $($r.New)"
    } else {
        Write-Warning "Not found: $($r.Old)"
    }
}

# Remove useless onerror fallbacks for products in these cards
$content = $content -replace ' loading="lazy" onerror="this\.onerror=null;\s*this\.src=''[^'']+''\s*;">', ' loading="lazy">'

[System.IO.File]::WriteAllText($indexFile, $content, [System.Text.Encoding]::UTF8)
Write-Host "Updated index.html ($count replacements completed)."
