$currBrain = 'C:\Users\Sohag Hossen\.gemini\antigravity-ide\brain\2de403b6-7ccf-433e-b936-ad2538c1c652'
$dest = 'assets/img/products'

$mapping = @{
    'tenda_ac10_1792865334966.jpg'     = 'tenda-ac10.jpg'
    'tenda_teg1024d_1792865351092.jpg' = 'tenda-teg1024d.jpg'
    'tenda_o9_1792865367019.jpg'       = 'tenda-o9.jpg'
    'tenda_tx2l_pro_1792865384414.jpg' = 'tenda-tx2l-pro.jpg'
    'tenda_teg2210p_1792865403041.jpg' = 'tenda-teg2210p.jpg'
    'meetion_btm032r_1792865422198.jpg' = 'meetion-btm032r.jpg'
}

foreach ($src in $mapping.Keys) {
    $srcPath = Join-Path $currBrain $src
    $dstPath = Join-Path $dest $mapping[$src]
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $dstPath -Force
        Write-Host "Copied: $src -> $($mapping[$src])"
    } else {
        Write-Warning "Not found: $srcPath"
    }
}

Get-ChildItem -Path $dest | Select-Object Name, Length
