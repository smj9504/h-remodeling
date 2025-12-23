const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Image optimization settings
const OPTIMIZATION_SETTINGS = {
  hero: {
    width: 1920,
    height: 1080,
    quality: 80,
    targetSize: 200, // KB
  },
  services: {
    width: 1200,
    height: 900,
    quality: 80,
    targetSize: 150,
  },
  projects: {
    width: 1200,
    height: 900,
    quality: 80,
    targetSize: 150,
  },
  about: {
    width: 1200,
    height: 900,
    quality: 80,
    targetSize: 150,
  },
};

// Get all image files
function getImageFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      files.push(...getImageFiles(fullPath));
    } else if (/\.(jpeg|jpg|png)$/i.test(item.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

// Determine image category from path
function getCategoryFromPath(filePath) {
  if (filePath.includes('hero')) return 'hero';
  if (filePath.includes('services')) return 'services';
  if (filePath.includes('projects')) return 'projects';
  if (filePath.includes('about')) return 'about';
  return 'services'; // default
}

// Format file size
function formatSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Check if WebP version already exists
function webpExists(inputPath) {
  const outputPath = inputPath.replace(/\.(jpeg|jpg|png)$/i, '.webp');
  return fs.existsSync(outputPath);
}

// Optimize single image
async function optimizeImage(inputPath) {
  const category = getCategoryFromPath(inputPath);
  const settings = OPTIMIZATION_SETTINGS[category];

  const outputPath = inputPath.replace(/\.(jpeg|jpg|png)$/i, '.webp');

  // Check if WebP already exists
  if (webpExists(inputPath)) {
    console.log(`\n⏭️  Skipping: ${path.basename(inputPath)}`);
    console.log(`   ℹ️  WebP version already exists: ${path.basename(outputPath)}`);
    return null; // Skip this file
  }

  console.log(`\n🔄 Processing: ${path.basename(inputPath)}`);
  console.log(`   Category: ${category}`);

  try {
    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;

    // Optimize and convert to WebP
    await sharp(inputPath)
      .resize(settings.width, settings.height, {
        fit: 'cover',
        position: 'center',
      })
      .webp({
        quality: settings.quality,
        effort: 6, // Max compression effort
      })
      .toFile(outputPath);

    // Get optimized file size
    const optimizedStats = fs.statSync(outputPath);
    const optimizedSize = optimizedStats.size;
    const reduction = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    console.log(`   ✅ Original: ${formatSize(originalSize)}`);
    console.log(`   ✅ Optimized: ${formatSize(optimizedSize)}`);
    console.log(`   ✅ Reduction: ${reduction}%`);
    console.log(`   ✅ Saved to: ${path.basename(outputPath)}`);

    return {
      original: inputPath,
      optimized: outputPath,
      originalSize,
      optimizedSize,
      reduction: parseFloat(reduction),
    };
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return null;
  }
}

// Main optimization function
async function optimizeAllImages() {
  console.log('🖼️  Image Optimization Started\n');
  console.log('='.repeat(60));

  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  const imageFiles = getImageFiles(imagesDir);

  // Filter out files that already have WebP versions
  const filesToOptimize = imageFiles.filter(file => !webpExists(file));
  const skippedCount = imageFiles.length - filesToOptimize.length;

  console.log(`\n📂 Found ${imageFiles.length} JPEG/PNG files`);
  if (skippedCount > 0) {
    console.log(`   ⏭️  ${skippedCount} already optimized (WebP exists)`);
  }
  console.log(`   🔄 ${filesToOptimize.length} files to optimize\n`);

  const results = [];
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of filesToOptimize) {
    const result = await optimizeImage(file);
    if (result) {
      results.push(result);
      totalOriginal += result.originalSize;
      totalOptimized += result.optimizedSize;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Optimization Summary\n');
  console.log(`   Total images processed: ${results.length}`);
  console.log(`   Original total size: ${formatSize(totalOriginal)}`);
  console.log(`   Optimized total size: ${formatSize(totalOptimized)}`);
  console.log(`   Total reduction: ${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%`);
  console.log(`   Space saved: ${formatSize(totalOriginal - totalOptimized)}`);

  console.log('\n✅ Optimization Complete!\n');
  console.log('📝 Next steps:');
  console.log('   1. Update src/data/images.ts to use .webp extensions');
  console.log('   2. Restart the development server');
  console.log('   3. Test the website');
  console.log('   4. Optional: Delete original .jpeg files to save space\n');
}

// Run optimization
optimizeAllImages().catch(console.error);
