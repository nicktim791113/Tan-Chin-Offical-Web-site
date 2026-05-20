param(
  [string]$OutputRoot = "_backups"
)

$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupDir = Join-Path $repoRoot $OutputRoot
$backupFile = Join-Path $backupDir "tan-chin-core-$timestamp.zip"
$staging = Join-Path $env:TEMP "tan-chin-core-backup-$timestamp"

New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
New-Item -ItemType Directory -Force -Path $staging | Out-Null

$items = @(
  ".github",
  "docs",
  "scripts",
  "future-site\src",
  "future-site\public",
  "future-site\astro.config.mjs",
  "future-site\package.json",
  "future-site\package-lock.json",
  "future-site\tsconfig.json",
  "_archive",
  "_blueprint",
  "package.json",
  "package-lock.json",
  ".gitignore",
  ".gitattributes"
)

foreach ($item in $items) {
  $source = Join-Path $repoRoot $item
  if (Test-Path $source) {
    $target = Join-Path $staging $item
    $targetParent = Split-Path $target -Parent
    New-Item -ItemType Directory -Force -Path $targetParent | Out-Null
    Copy-Item -LiteralPath $source -Destination $target -Recurse -Force
  }
}

if (Test-Path $backupFile) {
  Remove-Item -LiteralPath $backupFile -Force
}

Compress-Archive -Path (Join-Path $staging "*") -DestinationPath $backupFile -Force
Remove-Item -LiteralPath $staging -Recurse -Force

Write-Host "Backup completed: $backupFile"
