$file = "data/products.js"
$content = Get-Content $file -Raw
$content = $content.Replace('"1492913860.jpg"', '"assets/img/home/cat_ups_power.jpg"')
$content = $content.Replace('"36742764.png"', '"assets/img/products/meetion-mk008-pro.jpg"')
$content = $content.Replace('"1589070421.jpg"', '"assets/img/products/meetion-hp022.jpg"')
[System.IO.File]::WriteAllText($file, $content)
Write-Host "Replaced 3 final items in products.js"
