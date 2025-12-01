# Script to copy G folder images to public/G
$sourceDir = "G"
$destDir = "public\G"

# Create destination directory if it doesn't exist
if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force | Out-Null
}

# Copy all JPG files
Get-ChildItem -Path $sourceDir -Filter "*.jpg" | Copy-Item -Destination $destDir -Force

Write-Host "Images copied successfully to $destDir"

