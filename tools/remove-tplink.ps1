$file = 'data/shop-products.js'
$content = [System.IO.File]::ReadAllText($file)
$pattern = '(?s)\s*\{\s*id:\s*"tplink-ax73".*?id:\s*"tplink-sf1008d".*?colorDots:\s*"green,teal"\s*\},'
if ($content -match $pattern) {
    $content = $content -replace $pattern, ''
    [System.IO.File]::WriteAllText($file, $content)
    Write-Output "Successfully removed TP-Link products from $file"
} else {
    Write-Output "Could not match TP-Link block in $file"
}
