const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const imagesToConvert = [
  'heroimage.png',
  'image.png',
  'Residential Pest Control.png',
  'Termite Control.png',
  'aboutus.jpg',
  'sliderpest.jpg'
];

async function convertToWebP() {
  console.log('Starting image conversion to WebP...');
  
  for (const imageName of imagesToConvert) {
    const inputPath = path.join(imagesDir, imageName);
    const outputPath = path.join(imagesDir, imageName.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    
    try {
      if (fs.existsSync(inputPath)) {
        await sharp(inputPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(outputPath);
        
        console.log(`✓ Converted ${imageName} to WebP`);
        
        // Get file sizes for comparison
        const originalSize = fs.statSync(inputPath).size;
        const webpSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
        
        console.log(`  Original: ${(originalSize / 1024).toFixed(1)}KB → WebP: ${(webpSize / 1024).toFixed(1)}KB (${savings}% smaller)`);
      } else {
        console.log(`⚠ File not found: ${imageName}`);
      }
    } catch (error) {
      console.error(`✗ Error converting ${imageName}:`, error.message);
    }
  }
  
  console.log('\nImage conversion completed!');
}

convertToWebP().catch(console.error);