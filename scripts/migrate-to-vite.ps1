# Migrates Next.js imports/patterns to Vite + React Router in src/
$srcRoot = Join-Path $PSScriptRoot "..\src"
$files = Get-ChildItem $srcRoot -Recurse -Include *.tsx,*.ts |
  Where-Object {
    $_.FullName -notmatch '\\app\\api\\' -and
    $_.Name -ne 'proxy.ts' -and
    $_.FullName -notmatch '\\layouts\\' -and
    $_.FullName -notmatch '\\App\.tsx$' -and
    $_.FullName -notmatch '\\main\.tsx$'
  }

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw -Encoding UTF8
  $original = $content

  $content = $content -replace "(?m)^'use client';\r?\n\r?\n", ''
  $content = $content -replace "(?m)^`"use client`";\r?\n\r?\n", ''

  $content = $content -replace "from 'next/link'", "from 'react-router-dom'"
  $content = $content -replace 'from "next/link"', 'from "react-router-dom"'
  $content = $content -replace "from 'next/image'", "from '@/components/AppImage'"
  $content = $content -replace 'from "next/image"', 'from "@/components/AppImage"'
  $content = $content -replace "import Image from '@/components/AppImage'", "import AppImage from '@/components/AppImage'"
  $content = $content -replace 'import Image from "@/components/AppImage"', 'import AppImage from "@/components/AppImage"'
  $content = $content -replace '<Image\b', '<AppImage'
  $content = $content -replace '</Image>', '</AppImage>'

  $content = $content -replace "from 'next/navigation'", "from 'react-router-dom'"
  $content = $content -replace 'from "next/navigation"', 'from "react-router-dom"'
  $content = $content -replace '\buseRouter\b', 'useNavigate'
  $content = $content -replace '\bconst navigate = useNavigate\(\)', 'const navigate = useNavigate()'
  $content = $content -replace '\bnavigate\.push\(', 'navigate('
  $content = $content -replace '\bnavigate\.replace\(', 'navigate('

  $content = $content -replace '<Link href=', '<Link to='
  $content = $content -replace '\bhref=\{', 'to={'

  $content = $content -replace "import \{ Metadata \} from 'next';\r?\n", ''
  $content = $content -replace 'import \{ Metadata \} from "next";\r?\n', ''
  $content = $content -replace "import type \{ Metadata \} from 'next';\r?\n", ''
  $content = $content -replace 'import type \{ Metadata \} from "next";\r?\n', ''
  $content = $content -replace "import \{ notFound \} from 'react-router-dom';\r?\n", ''
  $content = $content -replace 'import \{ notFound \} from "react-router-dom";\r?\n', ''

  $content = $content -replace "process\.env\.NEXT_PUBLIC_", 'import.meta.env.VITE_'
  $content = $content -replace "process\.env\.NODE_ENV === 'development'", 'import.meta.env.DEV'
  $content = $content -replace 'process\.env\.NODE_ENV === "development"', 'import.meta.env.DEV'

  # Remove export const metadata blocks (single-line exports kept for manual fix)
  $content = $content -replace '(?ms)^export const metadata: Metadata = \{.*?\};\r?\n\r?\n', ''

  # Remove generateMetadata functions
  $content = $content -replace '(?ms)^export async function generateMetadata\([^)]*\)[^{]*\{.*?\}\r?\n\r?\n', ''

  if ($content -ne $original) {
    Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($file.FullName)"
  }
}

Write-Host "Migration pass complete."
