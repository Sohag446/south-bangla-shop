$lines = Get-Content 'data/products.js'
$prod = ''
for ($i=0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match '^\s+id:\s+"([^"]+)"') { $prod = $Matches[1] }
    if ($lines[$i] -match 'images:\s*\[(.*?)\]') {
        $img = $Matches[1].Trim()
        Write-Host "$prod => $img"
    }
}
