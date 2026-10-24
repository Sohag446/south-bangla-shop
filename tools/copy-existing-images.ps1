$prevBrain = 'C:\Users\Sohag Hossen\.gemini\antigravity-ide\brain\9266b970-4122-4d2f-87f3-ff20420e1505'
$dest = 'assets/img/products'
if (-not (Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest -Force
}

$filesToCopy = @{
    'meetion_btm012_1792863987798.jpg' = 'meetion-btm012.jpg'
    'meetion_mk008_1792864005594.jpg'   = 'meetion-mk008-pro.jpg'
    'meetion_hp022_1792864022905.jpg'   = 'meetion-hp022.jpg'
    'must_ew2110_800_1792864038544.jpg' = 'must-ew2110-800.jpg'
    'tenda_ax12_pro_1792864057997.jpg'  = 'tenda-ax12-pro.jpg'
    'vsol_v2801sg_1792864075050.jpg'    = 'vsol-v2801sg.jpg'
    'solitine_panel_24p_1792864094115.jpg' = 'solitine-panel-24p.jpg'
}

foreach ($src in $filesToCopy.Keys) {
    $srcPath = Join-Path $prevBrain $src
    $dstPath = Join-Path $dest $filesToCopy[$src]
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $dstPath -Force
        Write-Host "Copied $src -> $($filesToCopy[$src])"
    } else {
        Write-Warning "Source not found: $srcPath"
    }
}

Get-ChildItem -Path $dest | Select-Object Name, Length
