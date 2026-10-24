$chromePath = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$profileDir = "$PSScriptRoot\chrome-profile"
if (-not (Test-Path $profileDir)) { New-Item -ItemType Directory -Path $profileDir -Force }

# First run chrome pointing to southbanglabd with a user-data-dir so it stores cookies
$args = "--headless=new --disable-blink-features=AutomationControlled --user-data-dir=`"$profileDir`" --virtual-time-budget=6000 `"https://www.southbanglabd.com/`""
Start-Process -FilePath $chromePath -ArgumentList $args -Wait -WindowStyle Hidden

Write-Host "Chrome profile created. Checking Cookies file..."
$cookieDb = Get-ChildItem -Path $profileDir -Recurse -Filter "Cookies"
$cookieDb | ForEach-Object { Write-Host $_.FullName }
