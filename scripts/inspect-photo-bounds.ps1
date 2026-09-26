Add-Type -AssemblyName System.Drawing
$photoIds = 'sp-03','pc-04','vg-01','ab-01','ab-04','pr-03','sk-04','sc-03','tv-03','ar-05','sk-05'
foreach ($photoId in $photoIds) {
  $photo = [System.Drawing.Bitmap]::FromFile((Join-Path (Get-Location) "images/products/p-$photoId.png"))
  $bg = $photo.GetPixel(0,0)
  $left=$photo.Width; $top=$photo.Height; $right=0; $bottom=0
  for ($y=0; $y -lt $photo.Height; $y+=4) { for ($x=0; $x -lt $photo.Width; $x+=4) {
    $pixel=$photo.GetPixel($x,$y)
    if ($pixel.A -gt 20 -and ([Math]::Abs($pixel.R-$bg.R)+[Math]::Abs($pixel.G-$bg.G)+[Math]::Abs($pixel.B-$bg.B)) -gt 75) {
      $left=[Math]::Min($left,$x);$right=[Math]::Max($right,$x);$top=[Math]::Min($top,$y);$bottom=[Math]::Max($bottom,$y)
    }
  }}
  "$photoId bg=$($bg.R),$($bg.G),$($bg.B) size=$($photo.Width)x$($photo.Height) bounds=$left,$top,$right,$bottom"
  $photo.Dispose()
}
