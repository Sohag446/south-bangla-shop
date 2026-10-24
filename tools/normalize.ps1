$filePath = $args[0]
if (Test-Path $filePath) {
    $content = [System.IO.File]::ReadAllText($filePath)
    $content = $content.Replace("`r`n", "`n")
    [System.IO.File]::WriteAllText($filePath, $content)
    Write-Output "Normalized $filePath"
}
