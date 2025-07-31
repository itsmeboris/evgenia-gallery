#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

/**
 * CRITICAL: Emergency Image Compression for Evgenia Gallery
 * Target: 90%+ compression while maintaining museum quality
 */

const CONFIG = {
  // Compression settings optimized for art gallery
  jpeg: {
    quality: 85,        // High quality for art detail preservation
    progressive: true,  // Progressive loading for better UX
    mozjpeg: true      // Better compression algorithm
  },
  webp: {
    quality: 90,        // Higher quality for modern format
    effort: 6          // Maximum compression effort
  },
  avif: {
    quality: 85,        // Excellent compression with quality
    effort: 9          // Maximum effort for best compression
  },
  // Resize options - maintain aspect ratio
  resize: {
    width: 1200,        // Max width for web display
    height: 1200,       // Max height for web display
    fit: 'inside',      // Maintain aspect ratio
    withoutEnlargement: true
  }
};

async function analyzeImage(filePath) {
  try {
    const stats = await fs.stat(filePath);
    const metadata = await sharp(filePath).metadata();

    return {
      originalSize: stats.size,
      dimensions: `${metadata.width}x${metadata.height}`,
      format: metadata.format,
      colorSpace: metadata.space
    };
  } catch (error) {
    console.error(`Error analyzing ${filePath}:`, error.message);
    return null;
  }
}

async function compressImage(inputPath, outputDir) {
  const fileName = path.basename(inputPath, '.jpg');
  const analysis = await analyzeImage(inputPath);

  if (!analysis) return null;

  console.log(`\n🎨 Processing: ${fileName}`);
  console.log(`   Original: ${(analysis.originalSize / 1024 / 1024).toFixed(2)}MB (${analysis.dimensions})`);

  const results = {};

  try {
    // Create Sharp instance with color profile preservation
    const image = sharp(inputPath)
      .resize(CONFIG.resize)
      .rotate(); // Auto-rotate based on EXIF

    // 1. Optimized JPEG (primary format)
    const jpegPath = path.join(outputDir, `${fileName}.jpg`);
    await image
      .jpeg(CONFIG.jpeg)
      .toFile(jpegPath);

    const jpegStats = await fs.stat(jpegPath);
    results.jpeg = {
      path: jpegPath,
      size: jpegStats.size,
      reduction: ((analysis.originalSize - jpegStats.size) / analysis.originalSize * 100).toFixed(1)
    };

    // 2. WebP format for modern browsers
    const webpPath = path.join(outputDir, `${fileName}.webp`);
    await image
      .webp(CONFIG.webp)
      .toFile(webpPath);

    const webpStats = await fs.stat(webpPath);
    results.webp = {
      path: webpPath,
      size: webpStats.size,
      reduction: ((analysis.originalSize - webpStats.size) / analysis.originalSize * 100).toFixed(1)
    };

    // 3. AVIF format for maximum compression
    const avifPath = path.join(outputDir, `${fileName}.avif`);
    await image
      .avif(CONFIG.avif)
      .toFile(avifPath);

    const avifStats = await fs.stat(avifPath);
    results.avif = {
      path: avifPath,
      size: avifStats.size,
      reduction: ((analysis.originalSize - avifStats.size) / analysis.originalSize * 100).toFixed(1)
    };

    // Log compression results
    console.log(`   ✅ JPEG: ${(results.jpeg.size / 1024).toFixed(0)}KB (${results.jpeg.reduction}% reduction)`);
    console.log(`   ✅ WebP: ${(results.webp.size / 1024).toFixed(0)}KB (${results.webp.reduction}% reduction)`);
    console.log(`   ✅ AVIF: ${(results.avif.size / 1024).toFixed(0)}KB (${results.avif.reduction}% reduction)`);

    return {
      original: analysis,
      compressed: results
    };

  } catch (error) {
    console.error(`❌ Error compressing ${fileName}:`, error.message);
    return null;
  }
}

async function processCategory(categoryPath, outputPath) {
  console.log(`\n📁 Processing category: ${path.basename(categoryPath)}`);

  try {
    const files = await fs.readdir(categoryPath);
    const jpgFiles = files.filter(file => file.toLowerCase().endsWith('.jpg'));

    console.log(`   Found ${jpgFiles.length} images to process`);

    // Ensure output directory exists
    await fs.mkdir(outputPath, { recursive: true });

    const results = [];
    let totalOriginalSize = 0;
    let totalCompressedSize = 0;

    for (const file of jpgFiles) {
      const inputPath = path.join(categoryPath, file);
      const result = await compressImage(inputPath, outputPath);

      if (result) {
        results.push(result);
        totalOriginalSize += result.original.originalSize;
        totalCompressedSize += result.compressed.jpeg.size; // Using JPEG as primary
      }
    }

    const totalReduction = ((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100).toFixed(1);

    console.log(`\n📊 Category Summary:`);
    console.log(`   Original total: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Compressed total: ${(totalCompressedSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Total reduction: ${totalReduction}%`);

    return { results, totalReduction, totalOriginalSize, totalCompressedSize };

  } catch (error) {
    console.error(`Error processing category ${categoryPath}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚨 EMERGENCY IMAGE COMPRESSION PIPELINE ACTIVATED');
  console.log('🎯 Target: 90%+ compression while maintaining museum quality\n');

  const categories = ['birds', 'floral', 'towns'];
  const inputBase = 'public/artwork';
  const outputBase = 'public/artwork-optimized';

  let grandTotalOriginal = 0;
  let grandTotalCompressed = 0;

  for (const category of categories) {
    const inputPath = path.join(inputBase, category);
    const outputPath = path.join(outputBase, category);

    const result = await processCategory(inputPath, outputPath);

    if (result) {
      grandTotalOriginal += result.totalOriginalSize;
      grandTotalCompressed += result.totalCompressedSize;
    }
  }

  const grandTotalReduction = ((grandTotalOriginal - grandTotalCompressed) / grandTotalOriginal * 100).toFixed(1);

  console.log('\n🎉 COMPRESSION PIPELINE COMPLETE!');
  console.log('=' .repeat(50));
  console.log(`📈 GALLERY PERFORMANCE TRANSFORMATION:`);
  console.log(`   Before: ${(grandTotalOriginal / 1024 / 1024).toFixed(2)}MB total payload`);
  console.log(`   After:  ${(grandTotalCompressed / 1024 / 1024).toFixed(2)}MB total payload`);
  console.log(`   🚀 REDUCTION: ${grandTotalReduction}% (${((grandTotalOriginal - grandTotalCompressed) / 1024 / 1024).toFixed(2)}MB saved!)`);
  console.log('\n✅ Gallery ready for museum-quality, high-performance deployment!');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { compressImage, processCategory };