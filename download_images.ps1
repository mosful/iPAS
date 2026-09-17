$baseUrl = 'https://images.vocus.cc/6a06c97cfd89780001bd70ba_'
$targetDir = 'C:\Code\iPAS\vocus_images'
if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir
}
for ($i = 0; $i -le 19; $i++) {
    $url = "${baseUrl}${i}.jpg"
    $num = $i.ToString('D2')
    $fileName = "${num}.jpg"
    $outPath = Join-Path $targetDir $fileName
    Write-Host "Downloading $url to $outPath..."
    Invoke-WebRequest -Uri $url -OutFile $outPath -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" -Headers @{ "Referer" = "https://vocus.cc/article/6a06c97cfd89780001bd70ba" }
}
