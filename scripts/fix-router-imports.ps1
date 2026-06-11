$srcRoot = Join-Path $PSScriptRoot "..\src"
$files = Get-ChildItem $srcRoot -Recurse -Include *.tsx,*.ts

foreach ($file in $files) {
  $lines = Get-Content $file.FullName -Encoding UTF8
  $content = $lines -join "`n"
  $original = $content

  $content = $content -replace "import Link from 'react-router-dom'", "import { Link } from 'react-router-dom'"
  $content = $content -replace 'import Link from "react-router-dom"', 'import { Link } from "react-router-dom"'
  $content = $content -replace '<Link\s+href=', '<Link to='

  if ($content -ne $original) {
    [System.IO.File]::WriteAllText($file.FullName, $content)
    Write-Host "Fixed: $($file.Name)"
  }
}
