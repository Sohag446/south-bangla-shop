$content = Get-Content index.html -Raw
$matches = [regex]::Matches($content, '<symbol id="([^"]+)"')
foreach ($m in $matches) {
    Write-Output $m.Groups[1].Value
}
