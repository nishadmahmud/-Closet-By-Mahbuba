import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slidersDir = path.join(__dirname, "../public/sliders");
const MAX_WIDTH = 2560;
const TARGET_HEIGHT = Math.round(MAX_WIDTH / (16 / 7));
const files = ["cbm_h1.png", "cbm_h2.png", "cbm_h3.png"];

async function optimize(file) {
  const inputPath = path.join(slidersDir, file);
  const base = file.replace(/\.png$/i, "");
  const webpPath = path.join(slidersDir, `${base}.webp`);
  const backupPath = path.join(slidersDir, `${base}.original.png`);
  const pngPath = inputPath;

  const before = fs.statSync(inputPath).size;
  const meta = await sharp(inputPath).metadata();

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
  }

  const pipeline = sharp(inputPath).resize(MAX_WIDTH, TARGET_HEIGHT, {
    fit: "cover",
    position: "centre",
    withoutEnlargement: true,
  });

  const pngTemp = path.join(slidersDir, `${base}.opt.png`);

  await pipeline
    .clone()
    .webp({ quality: 90, effort: 6, smartSubsample: true })
    .toFile(webpPath);

  await pipeline
    .clone()
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
    .toFile(pngTemp);

  fs.renameSync(pngTemp, pngPath);

  const pngAfter = fs.statSync(pngPath).size;
  const webpAfter = fs.statSync(webpPath).size;

  return {
    file,
    dimensions: `${meta.width}x${meta.height} -> max ${MAX_WIDTH}x${TARGET_HEIGHT}`,
    beforeMB: (before / 1024 / 1024).toFixed(2),
    pngMB: (pngAfter / 1024 / 1024).toFixed(2),
    webpMB: (webpAfter / 1024 / 1024).toFixed(2),
  };
}

const results = [];
for (const file of files) {
  results.push(await optimize(file));
}

console.table(results);
