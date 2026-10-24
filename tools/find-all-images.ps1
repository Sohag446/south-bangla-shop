$files = Get-ChildItem -Path . -Recurse -Include *.png, *.jpg, *.jpeg, *.webp | Where-Object { $_.FullName -notmatch '\\(\.git|node_modules|tools\\chrome)\\' }
Write-Host "Total images in repo: $($files.Count)"
$files | Select-Object Name, Length, FullName | ForEach-Object {
    Write-Host "$($_.Name) - $($_.Length) bytes ($($_.FullName))"
}
