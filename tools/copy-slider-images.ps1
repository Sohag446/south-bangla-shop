$srcDir = 'C:\Users\Sohag Hossen\.gemini\antigravity-ide\brain\9266b970-4122-4d2f-87f3-ff20420e1505\.user_uploaded'
if (-not (Test-Path 'assets/img/slider')) {
    New-Item -ItemType Directory -Path 'assets/img/slider' -Force
}
Copy-Item "$srcDir\media_1792847861817.png" 'assets/img/slider/tenda-nova-mx12-mesh.png' -Force
Copy-Item "$srcDir\media_1792847861886.png" 'assets/img/slider/tenda-tx12l-pro-wifi6.png' -Force
Copy-Item "$srcDir\media_1792847861943.png" 'assets/img/slider/tenda-ac3-dual-band.png' -Force
Copy-Item "$srcDir\media_1792847861986.png" 'assets/img/slider/tenda-be12-pro-wifi7.png' -Force
Copy-Item "$srcDir\media_1792847862024.png" 'assets/img/slider/tenda-security-camera.png' -Force

Get-ChildItem 'assets/img/slider' | Select-Object Name, Length, LastWriteTime
