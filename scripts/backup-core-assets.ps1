param(
  [string]$OutputRoot = "_backups"
)

$ErrorActionPreference = "Stop"

function Test-ExcludedBackupPath {
  param([string]$RelativePath)

  $normalizedPath = $RelativePath.Replace("\", "/")
  $segments = $normalizedPath.Split("/")
  $leafName = $segments[-1]

  if ($segments | Where-Object { $_ -in @(".git", "node_modules", "dist", ".astro", "_verification", "_backups", ".vercel") }) {
    return $true
  }

  # .gitignore explicitly re-includes this tracked, non-secret template.
  if ($leafName -eq ".env.example") {
    return $false
  }

  if ($leafName -like "*.log" -or
      $leafName -eq ".env" -or
      $leafName -like ".env.*" -or
      $leafName -like "*.env" -or
      $leafName -like "*.sqlite" -or
      $leafName -like "*.sqlite3" -or
      $leafName -like "*.db" -or
      $leafName -like "*.db-shm" -or
      $leafName -like "*.db-wal" -or
      $leafName -like "*.pem" -or
      $leafName -like "*.key" -or
      $leafName -like "*.p12" -or
      $leafName -like "*.pfx" -or
      $leafName -in @("id_rsa", "id_dsa", "id_ecdsa", "id_ed25519", "credentials.json", "service-account.json")) {
    return $true
  }

  return $false
}

function Get-StreamSha256 {
  param([System.IO.Stream]$InputStream)

  $sha256 = [System.Security.Cryptography.SHA256]::Create()
  try {
    return ([System.BitConverter]::ToString($sha256.ComputeHash($InputStream))).Replace("-", "")
  } finally {
    $sha256.Dispose()
  }
}

function Assert-SafeRelativePath {
  param([string]$RelativePath)

  $normalizedPath = $RelativePath.Replace("\", "/")
  if ([System.IO.Path]::IsPathRooted($normalizedPath) -or
      ($normalizedPath.Split("/") | Where-Object { $_ -eq ".." })) {
    throw "Git returned an unsafe tracked path: $RelativePath"
  }

  return $normalizedPath
}

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
if ([System.IO.Path]::IsPathRooted($OutputRoot)) {
  $backupDir = [System.IO.Path]::GetFullPath($OutputRoot)
} else {
  $backupDir = [System.IO.Path]::GetFullPath((Join-Path $repoRoot $OutputRoot))
}

$gitCommand = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCommand) {
  throw "Git is required to create a complete tracked-file backup. Install Git or run this script from a Git checkout."
}

$previousOutputEncoding = [Console]::OutputEncoding
$staging = Join-Path $env:TEMP ("tan-chin-core-backup-" + [guid]::NewGuid().ToString("N"))
$backupFile = $null
$backupCreated = $false
$archive = $null

try {
  # Git emits UTF-8 paths; preserve non-ASCII asset-library names on Windows PowerShell.
  [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
  $trackedFiles = @(& $gitCommand.Source -C $repoRoot -c "core.quotepath=false" ls-files)
  if ($LASTEXITCODE -ne 0) {
    throw "Unable to list Git tracked files. Run this script from a healthy Git checkout."
  }

  $trackedFiles = @(
    $trackedFiles |
      ForEach-Object { Assert-SafeRelativePath $_ } |
      Where-Object { -not (Test-ExcludedBackupPath $_) }
  )
  if ($trackedFiles.Count -eq 0) {
    throw "Git reported no eligible tracked files; backup was not created."
  }

  New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
  New-Item -ItemType Directory -Force -Path $staging | Out-Null
  $stagingHashes = @{}

  foreach ($relativePath in $trackedFiles) {
    $source = Join-Path $repoRoot $relativePath
    if (-not (Test-Path -LiteralPath $source -PathType Leaf)) {
      throw "Tracked file is missing from the working tree: $relativePath"
    }

    $target = Join-Path $staging $relativePath
    $targetParent = Split-Path -Parent $target
    New-Item -ItemType Directory -Force -Path $targetParent | Out-Null
    Copy-Item -LiteralPath $source -Destination $target -Force

    $sourceHash = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash
    $stagingHash = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
    if ($sourceHash -ne $stagingHash) {
      throw "Staging verification failed; copied file hash differs from source: $relativePath"
    }
    $stagingHashes[$relativePath] = $stagingHash
  }

  $timestamp = Get-Date -Format "yyyyMMdd-HHmmss-fff"
  $candidate = Join-Path $backupDir "tan-chin-core-$timestamp.zip"
  $suffix = 1
  while (Test-Path -LiteralPath $candidate) {
    $candidate = Join-Path $backupDir ("tan-chin-core-{0}-{1}.zip" -f $timestamp, $suffix)
    $suffix++
  }
  $backupFile = $candidate

  Add-Type -AssemblyName System.IO.Compression.FileSystem
  [System.IO.Compression.ZipFile]::CreateFromDirectory(
    $staging,
    $backupFile,
    [System.IO.Compression.CompressionLevel]::Optimal,
    $false
  )

  $archive = [System.IO.Compression.ZipFile]::OpenRead($backupFile)
  try {
    $archiveEntryMap = @{}
    foreach ($entry in $archive.Entries) {
      $entryName = $entry.FullName.Replace("\", "/")
      if ($entryName.EndsWith("/")) {
        continue
      }
      if ($archiveEntryMap.ContainsKey($entryName)) {
        throw "Archive verification failed; duplicate ZIP entry: $entryName"
      }
      $archiveEntryMap[$entryName] = $entry
    }
    $archiveEntries = @($archiveEntryMap.Keys)
    $missingTrackedFiles = @($trackedFiles | Where-Object { -not $archiveEntryMap.ContainsKey($_) })
    if ($missingTrackedFiles.Count -gt 0) {
      throw "Archive verification failed; tracked files are missing: $($missingTrackedFiles -join ', ')"
    }
    $unexpectedArchiveEntries = @($archiveEntries | Where-Object { $_ -notin $trackedFiles })
    if ($unexpectedArchiveEntries.Count -gt 0) {
      throw "Archive verification failed; unexpected ZIP entries: $($unexpectedArchiveEntries -join ', ')"
    }

    $hashMismatchFiles = @()
    foreach ($relativePath in $trackedFiles) {
      $entryStream = $archiveEntryMap[$relativePath].Open()
      try {
        $entryHash = Get-StreamSha256 $entryStream
      } finally {
        $entryStream.Dispose()
      }
      if ($entryHash -ne $stagingHashes[$relativePath]) {
        $hashMismatchFiles += $relativePath
      }
    }
    if ($hashMismatchFiles.Count -gt 0) {
      throw "Archive verification failed; SHA-256 mismatches: $($hashMismatchFiles -join ', ')"
    }

    $assetLibraryPrefix = [string]::Concat(([char]0x7D20), ([char]0x6750), ([char]0x5EAB))
    $missingManifestFiles = @(
      @("package.json", "package-lock.json", "future-site/package.json", "future-site/package-lock.json") |
        Where-Object { $_ -notin $archiveEntries }
    )
    $requiredChecks = @(
      @{ Name = "asset library"; Present = [bool]($archiveEntries | Where-Object { $_ -like "$assetLibraryPrefix/*" }) },
      @{ Name = "future-site/vercel.json"; Present = $archiveEntries -contains "future-site/vercel.json" },
      @{ Name = ".github"; Present = [bool]($archiveEntries | Where-Object { $_ -like ".github/*" }) },
      @{ Name = "future-site/src"; Present = [bool]($archiveEntries | Where-Object { $_ -like "future-site/src/*" }) },
      @{ Name = "future-site/public"; Present = [bool]($archiveEntries | Where-Object { $_ -like "future-site/public/*" }) },
      @{ Name = "package manifests"; Present = $missingManifestFiles.Count -eq 0 }
    )
    $missingRequiredItems = @($requiredChecks | Where-Object { -not $_.Present } | ForEach-Object { $_.Name })
    if ($missingRequiredItems.Count -gt 0) {
      throw "Archive verification failed; required content is missing: $($missingRequiredItems -join ', ')"
    }
  } finally {
    if ($archive) {
      $archive.Dispose()
      $archive = $null
    }
  }

  $backupCreated = $true
  $archiveSizeMiB = [math]::Round((Get-Item -LiteralPath $backupFile).Length / 1MB, 2)
  Write-Output "Backup completed: $backupFile"
  Write-Output "Archived tracked files: $($trackedFiles.Count); ZIP entries: $($archiveEntries.Count); SHA-256 mismatches: 0; ZIP size: $archiveSizeMiB MiB"
} finally {
  [Console]::OutputEncoding = $previousOutputEncoding
  if ($archive) {
    $archive.Dispose()
  }
  if (Test-Path -LiteralPath $staging) {
    try {
      Remove-Item -LiteralPath $staging -Recurse -Force -ErrorAction Stop
    } catch {
      Write-Warning "Could not remove temporary staging directory '$staging': $($_.Exception.Message)"
    }
  }
  if (-not $backupCreated -and $backupFile -and (Test-Path -LiteralPath $backupFile)) {
    try {
      Remove-Item -LiteralPath $backupFile -Force -ErrorAction Stop
    } catch {
      Write-Warning "Backup failed and partial archive could not be removed '$backupFile': $($_.Exception.Message)"
    }
  }
}
