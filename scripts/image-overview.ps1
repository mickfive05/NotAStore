Add-Type -AssemblyName System.Drawing
$catalogItems = (node --input-type=module -e "import {CATALOG,imgSrc} from './js/data.js'; console.log(JSON.stringify(CATALOG.map(p=>({id:p.id,image:imgSrc(p.id)}))));") | ConvertFrom-Json
$sheet = New-Object System.Drawing.Bitmap(1200, ([int][Math]::Ceiling($catalogItems.Count / 8.0) * 150))
$graphics = [System.Drawing.Graphics]::FromImage($sheet)
$graphics.Clear([System.Drawing.Color]::White)
$font = New-Object System.Drawing.Font('Arial', 9)
$i = 0
foreach ($item in $catalogItems) {
  $x = ($i % 8) * 150; $y = [int][Math]::Floor($i / 8.0) * 150
  if (Test-Path -LiteralPath $item.image) {
    $photo = [System.Drawing.Image]::FromFile((Join-Path (Get-Location) $item.image))
    $ratio = [Math]::Min(136.0 / $photo.Width, 122.0 / $photo.Height)
    $w = [int]($photo.Width * $ratio); $h = [int]($photo.Height * $ratio)
    $graphics.DrawImage($photo, [int]($x + (150-$w)/2), [int]($y+(126-$h)/2), $w, $h)
    $photo.Dispose()
  }
  $graphics.DrawString($item.id, $font, [System.Drawing.Brushes]::Black, $x+8, $y+130)
  $i++
}
$sheet.Save((Join-Path (Get-Location) 'scripts\image-overview.jpg'), [System.Drawing.Imaging.ImageFormat]::Jpeg)
$graphics.Dispose(); $sheet.Dispose(); $font.Dispose()
