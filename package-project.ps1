# Packaging Script for IIIT Bhubaneswar IWT Mess Management Project
# Bundles clean source code and prepares the final submission zip named by Student ID

param(
    [string]$StudentID = "B122045"
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " 📦 IIIT Bhubaneswar - IWT Project Submission Packager" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan

$CurrentDir = (Get-Location).Path
$PackageFolderName = $StudentID.Trim().ToUpper()
$TargetDir = Join-Path $CurrentDir $PackageFolderName
$ZipFileName = "$($PackageFolderName).zip"
$ZipFilePath = Join-Path $CurrentDir $ZipFileName

Write-Host "[1/5] Preparing packaging directory for ID: $PackageFolderName..." -ForegroundColor Green

# Remove existing staging folder if present
if (Test-Path $TargetDir) {
    Remove-Item -Path $TargetDir -Recurse -Force
}
if (Test-Path $ZipFilePath) {
    Remove-Item -Path $ZipFilePath -Force
}

# Create staging directories
New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $TargetDir "source_code") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $TargetDir "Video") -Force | Out-Null

$SourceTarget = Join-Path $TargetDir "source_code"

Write-Host "[2/5] Copying clean source code (excluding node_modules)..." -ForegroundColor Green

# Copy Root Files
Copy-Item -Path (Join-Path $CurrentDir "package.json") -Destination $SourceTarget -Force
if (Test-Path (Join-Path $CurrentDir "README.md")) {
    Copy-Item -Path (Join-Path $CurrentDir "README.md") -Destination $SourceTarget -Force
    Copy-Item -Path (Join-Path $CurrentDir "README.md") -Destination $TargetDir -Force
}
if (Test-Path (Join-Path $CurrentDir "PRESENTATION_SCRIPT.md")) {
    Copy-Item -Path (Join-Path $CurrentDir "PRESENTATION_SCRIPT.md") -Destination $SourceTarget -Force
    Copy-Item -Path (Join-Path $CurrentDir "PRESENTATION_SCRIPT.md") -Destination $TargetDir -Force
}

# Copy Server
$ServerDest = Join-Path $SourceTarget "server"
New-Item -ItemType Directory -Path $ServerDest -Force | Out-Null
Copy-Item -Path (Join-Path $CurrentDir "server\*") -Destination $ServerDest -Recurse -Exclude "node_modules" -Force

# Copy Client
$ClientDest = Join-Path $SourceTarget "client"
New-Item -ItemType Directory -Path $ClientDest -Force | Out-Null
Copy-Item -Path (Join-Path $CurrentDir "client\*") -Destination $ClientDest -Recurse -Exclude "node_modules","dist" -Force

# Create Video Instructions file in Video directory
$Instructions = @(
    "===================================================================",
    "10-MINUTE PRESENTATION VIDEO SUBMISSION FOLDER",
    "===================================================================",
    "Student ID: $PackageFolderName",
    "Project: IIIT Bhubaneswar Mess Management System (IWT Course)",
    "",
    "INSTRUCTIONS:",
    "1. Record your 10-minute presentation using the in-app 10-Min Video Guide",
    "   or follow the PRESENTATION_SCRIPT.md guide.",
    "2. Save your recorded MP4 video in this folder as:",
    "   ${PackageFolderName}_Presentation_Video.mp4",
    "3. Verify video length is approximately 10 minutes.",
    "4. Ensure your audio is clear and all key features (Menu, QR Pass, Rebate Desk,",
    "   Billing, Feedback, and Admin Console) are demonstrated.",
    "==================================================================="
)
$Instructions -join "`r`n" | Out-File -FilePath (Join-Path $TargetDir "Video\INSTRUCTIONS_FOR_VIDEO.txt") -Encoding utf8

Write-Host "[3/5] Compressing folder into $ZipFileName..." -ForegroundColor Green
Compress-Archive -Path "$TargetDir\*" -DestinationPath $ZipFilePath -CompressionLevel Optimal

Write-Host "[4/5] Verifying archive contents..." -ForegroundColor Green
$ArchiveSize = (Get-Item $ZipFilePath).Length / 1MB
Write-Host ("Archive created: {0:N2} MB" -f $ArchiveSize) -ForegroundColor Yellow

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " PACKAGING COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host " Output Zip: $ZipFilePath" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "SUBMISSION CHECKLIST:" -ForegroundColor White
Write-Host " 1. Record your 10-minute video." -ForegroundColor Gray
Write-Host " 2. Place it in the 'Video' folder inside $ZipFileName." -ForegroundColor Gray
Write-Host " 3. Upload '$ZipFileName' to your Google Drive." -ForegroundColor Gray
Write-Host " 4. Set share permission to 'Anyone with link can view'." -ForegroundColor Gray
Write-Host " 5. Submit the Google Drive link and your deployed URL in Google Classroom!" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Cyan
