const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'A');
const destDir = path.join(__dirname, 'public', 'A');

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Get all JPG files from source directory
const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.jpg'));

console.log(`Found ${files.length} images to copy...`);

// Copy each file
files.forEach((file, index) => {
  const sourcePath = path.join(sourceDir, file);
  const destPath = path.join(destDir, file);
  
  try {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`[${index + 1}/${files.length}] Copied: ${file}`);
  } catch (error) {
    console.error(`Error copying ${file}:`, error.message);
  }
});

console.log('\n✅ All images copied successfully!');

