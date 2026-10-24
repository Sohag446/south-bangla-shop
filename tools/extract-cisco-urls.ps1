$file = 'C:\Users\Sohag Hossen\.gemini\antigravity-ide\brain\2de403b6-7ccf-433e-b936-ad2538c1c652\.system_generated\steps\480\content.md'
$content = Get-Content $file -Raw
$regex = [regex]'src="([^"]+)"'
$matches = $regex.Matches($content)
$urls = $matches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
Write-Host "Found $($urls.Count) image URLs:"
$urls | Select-Object -First 20 | ForEach-Object { Write-Host $_ }
