$file = 'c:\Code\iPAS\index.html'
$lines = [System.IO.File]::ReadAllLines($file, [System.Text.Encoding]::UTF8)

# 找 study-s40 div 的起始行（含前一行的注釋）
$startLine = -1
$endLine = -1

for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match 'id="study-s40"') {
        # 往前找注釋行
        if ($i -gt 0 -and $lines[$i-1] -match '<!--') {
            $startLine = $i - 1
        } else {
            $startLine = $i
        }
        break
    }
}

if ($startLine -ge 0) {
    # 計算配對的 </div> 行
    $depth = 0
    for ($i = $startLine; $i -lt $lines.Length; $i++) {
        $openCount = ([regex]::Matches($lines[$i], '<div')).Count
        $closeCount = ([regex]::Matches($lines[$i], '</div>')).Count
        $depth += $openCount - $closeCount
        if ($depth -eq 0 -and $i -gt $startLine) {
            $endLine = $i
            break
        }
    }
}

Write-Host "Start line (0-indexed): $startLine  (1-indexed: $($startLine + 1))"
Write-Host "End line (0-indexed): $endLine  (1-indexed: $($endLine + 1))"
Write-Host "Start content: $($lines[$startLine])"
Write-Host "End content: $($lines[$endLine])"
