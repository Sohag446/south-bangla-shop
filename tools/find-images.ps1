Get-ChildItem -Path 'C:\Users\Sohag Hossen\.gemini' -Filter *.* -Recurse -ErrorAction SilentlyContinue |
    Where-Object { $_.Extension -match '\.(png|jpg|jpeg|webp)$' } |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 20 |
    ForEach-Object { Write-Output ($_.FullName + " | " + $_.Length + " | " + $_.LastWriteTime) }
