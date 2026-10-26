$css = Get-Content css\layout.css -Raw
$openBraces = ([regex]::Matches($css, '\{')).Count
$closeBraces = ([regex]::Matches($css, '\}')).Count
Write-Output "layout.css - Open: $openBraces, Close: $closeBraces"
if ($openBraces -ne $closeBraces) {
    Write-Error "Brace mismatch in css/layout.css!"
}

$js = Get-Content js\layout.js -Raw
$openParen = ([regex]::Matches($js, '\(')).Count
$closeParen = ([regex]::Matches($js, '\)')).Count
Write-Output "layout.js - Open Paren: $openParen, Close: $closeParen"

$openB = ([regex]::Matches($js, '\{')).Count
$closeB = ([regex]::Matches($js, '\}')).Count
Write-Output "layout.js - Open Braces: $openB, Close: $closeB"
if ($openB -ne $closeB) {
    Write-Error "Brace mismatch in js/layout.js!"
}

$enJs = Get-Content js\i18n\en.js -Raw
$enOpenB = ([regex]::Matches($enJs, '\{')).Count
$enCloseB = ([regex]::Matches($enJs, '\}')).Count
Write-Output "en.js - Open Braces: $enOpenB, Close: $enCloseB"
if ($enOpenB -ne $enCloseB) {
    Write-Error "Brace mismatch in js/i18n/en.js!"
}
