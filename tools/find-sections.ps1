$lines = Get-Content 'index.html'
for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line -match '<(section|main|aside|footer|header)\b' -or $line -match '<!-- ===' -or $line -match 'class=".*(section|hero|popular|featured|banner|meetion|brand|trust|dealer|guide)') {
        Write-Output ("{0}: {1}" -f ($i + 1), $line.Trim())
    }
}
