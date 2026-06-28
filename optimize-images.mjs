import sharp from 'sharp';
import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

const INPUT_DIR = 'public/images';
const OUTPUT_DIR = 'public/images-optimized';
const QUALITY = 75; // Adjust quality from 0 to 100
const MAX_WIDTH = 1920; // Max width for large images

async function optimizeImages() {
    console.log('Starting image optimization...');

    try {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });

        const imagePaths = await glob(`${INPUT_DIR}/**/*.{jpg,jpeg,png,webp}`);
        if (imagePaths.length === 0) {
            console.log('No images found to optimize.');
            return;
        }

        console.log(`Found ${imagePaths.length} images. Optimizing...`);

        const promises = imagePaths.map(async (imgPath) => {
            const relativePath = path.relative(INPUT_DIR, imgPath);
            const outputFilePath = path.join(OUTPUT_DIR, relativePath).replace(/\.(jpg|jpeg|png)$/i, '.webp');

            const outputDirPath = path.dirname(outputFilePath);
            await fs.mkdir(outputDirPath, { recursive: true });

            try {
                const image = sharp(imgPath);
                const metadata = await image.metadata();

                await image
                    .resize({
                        width: Math.min(metadata.width || MAX_WIDTH, MAX_WIDTH),
                        withoutEnlargement: true,
                    })
                    .webp({ quality: QUALITY })
                    .toFile(outputFilePath);

                const originalSize = (await fs.stat(imgPath)).size;
                const newSize = (await fs.stat(outputFilePath)).size;
                const reduction = Math.round(((originalSize - newSize) / originalSize) * 100);

                console.log(`✅ Optimized:  | Reduction: %`);

            } catch (err) {
                console.error(`❌ Failed to optimize :`, err);
            }
        });

        await Promise.all(promises);
        console.log('\nImage optimization complete!');
        console.log(`Optimized images are in the "" directory.`);
        console.log('Remember to update your <img> src paths to use the new .webp images.');

    } catch (error) {
        console.error('An error occurred during the optimization process:', error);
    }
}

optimizeImages();
