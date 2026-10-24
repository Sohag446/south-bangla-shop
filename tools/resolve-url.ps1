$r = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFRaJRXZkhPDxJeu1FV0U1UvikwbULNEu7A5qRdKQ7yKolqBGFNAqZ4Nj-625TKFEtaWBg-tI0BCDbb-kbSiYxXDWspjUrTYolyyZ3xDEJi01HAriyB2Y0uDew8CAbXy3fx8kTh0KrD2FaojFy2clPg'
$req = [System.Net.HttpWebRequest]::Create($r)
$req.AllowAutoRedirect = $true
$res = $req.GetResponse()
Write-Host "Final URL: $($res.ResponseUri.AbsoluteUri)"
