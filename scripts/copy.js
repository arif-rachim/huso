const fs = require('fs');
const path = require('path');

// Copy directory recursively
function copyDir(src, dest) {
  // Create destination directory
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy file
function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

// Main copy operations
try {
  console.log('📦 Copying files to dist/...');

  // Copy public folder contents to dist
  copyDir('public', 'dist');
  console.log('✅ Copied public/ → dist/');

  console.log('✨ Build complete! Run "npm run serve" to start the server.');
} catch (error) {
  console.error('❌ Error copying files:', error);
  process.exit(1);
}
