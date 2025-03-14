const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [16, 32, 64, 192, 512];
const publicDir = path.join(__dirname, '../public');
const assetsDir = path.join(__dirname, '../src/assets');

async function generateIcons() {
  // Read the SVG file
  const svgBuffer = fs.readFileSync(path.join(assetsDir, 'Logo.svg'));

  // Generate high quality PNG icons first
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png({ quality: 100 })
      .toFile(path.join(publicDir, `logo${size}.png`));
  }

  // Generate high quality favicon.ico
  await sharp(svgBuffer)
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .toFile(path.join(publicDir, 'favicon.ico'));

  // Generate og-image.png for social sharing with better quality
  await sharp(svgBuffer)
    .resize(1200, 630, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'og-image.png'));

  console.log('Icons generated successfully!');
}

generateIcons().catch(console.error); 