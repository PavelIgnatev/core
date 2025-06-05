// test-uniqueness.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

/**
 * Обрезает изображение до квадрата по центру.
 */
async function cropImageBuffer(imageBuffer) {
  try {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();
    if (!metadata.width || !metadata.height) return imageBuffer;
    const size = Math.min(metadata.width, metadata.height);
    const left = Math.floor((metadata.width - size) / 2);
    const top = Math.floor((metadata.height - size) / 2);
    return await image.extract({ left, top, width: size, height: size }).toBuffer();
  } catch {
    return imageBuffer;
  }
}

/**
 * Возвращает SHA-256-хеш от строки.
 */
function generateUniqueHash(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

/**
 * Создаёт псевдослучайный генератор, инициализируя состояние
 * из первых 12 символов hex-хеша. Выдаёт значения в [0,1).
 */
function createRandomGenerator(hash) {
  let state = parseInt(hash.substring(0, 12), 16);
  return function () {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

/**
 * Гарантирует, что ни один пиксель не совпадает с оригиналом:
 * 1) Распределяет разницу по соседним пикселям (ядро 3×3).
 * 2) Добавляет «шума» (sin/cos).
 * 3) Если пиксель остался тем же, добавляет ±1.
 * 4) LSB-встраивание: в каждый из R,G,B-каналов устанавливает младший бит.
 */
function guaranteePixelUniqueness(originalData, modifiedData, channels, hash, width, height) {
  const result = Buffer.from(modifiedData);
  const rand = createRandomGenerator(hash);
  const changeMap = new Float32Array(width * height * 3).fill(0);
  const kernel = [
    [0.11, 0.15, 0.11],
    [0.15, 0.20, 0.15],
    [0.11, 0.15, 0.11],
  ];
  const idx = (x, y, c) => (y * width + x) * channels + c;

  // Распространение разницы по ядру 3×3
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const diffR = modifiedData[idx(x, y, 0)] - originalData[idx(x, y, 0)];
      const diffG = modifiedData[idx(x, y, 1)] - originalData[idx(x, y, 1)];
      const diffB = modifiedData[idx(x, y, 2)] - originalData[idx(x, y, 2)];
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const weight = kernel[ky + 1][kx + 1];
          const pos = idx(x + kx, y + ky, 0);
          changeMap[pos]     += diffR * weight;
          changeMap[pos + 1] += diffG * weight;
          changeMap[pos + 2] += diffB * weight;
        }
      }
    }
  }

  // Применение диффузии + шум
  for (let i = 0; i < originalData.length; i += channels) {
    const pixelIndex = Math.floor(i / channels);
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);
    for (let c = 0; c < 3; c++) {
      let change = changeMap[i + c];
      const noise =
        Math.sin(x * 0.1 + y * 0.1 + c) * 0.3 +
        Math.cos(x * 0.07 - y * 0.05) * 0.4;
      const correction = change * 0.8 + noise * 0.2;
      const newValue = originalData[i + c] + correction;
      result[i + c] = Math.max(0, Math.min(255, Math.round(newValue)));
    }
  }

  // Если пиксель остался точно таким же, меняем его ±1
  for (let i = 0; i < originalData.length; i += channels) {
    let changed = false;
    for (let c = 0; c < 3; c++) {
      if (originalData[i + c] !== result[i + c]) {
        changed = true;
        break;
      }
    }
    if (!changed) {
      const pattern = [
        rand() > 0.5 ? 1 : -1,
        rand() > 0.5 ? 1 : -1,
        rand() > 0.5 ? 1 : -1,
      ];
      for (let c = 0; c < 3; c++) {
        result[i + c] = Math.max(0, Math.min(255, originalData[i + c] + pattern[c]));
      }
    }
  }

  // LSB-встраивание
  const lsbRand = createRandomGenerator(hash);
  for (let i = 0; i < result.length; i += channels) {
    for (let c = 0; c < 3; c++) {
      const bit = lsbRand() > 0.5 ? 1 : 0;
      result[i + c] = (result[i + c] & 0xFE) | bit;
    }
  }

  return result;
}

/**
 * На выходе — JPEG с сохранением EXIF (генерируем «похожие» метаданные).
 */
function generatePlausibleMetadata(hash) {
  const rand = createRandomGenerator(hash);
  const devices = [
    { make: 'Canon', model: 'EOS R5', software: 'Adobe Photoshop 25.0' },
    { make: 'Nikon', model: 'D850', software: 'Adobe Photoshop 24.7' },
    { make: 'Sony',  model: 'ILCE-7M4', software: 'Capture One 23' },
    { make: 'Fujifilm', model: 'X-T5', software: 'Lightroom Classic 12.3' },
  ];
  const device = devices[Math.floor(rand() * devices.length)];
  const date = new Date(Date.now() - Math.floor(rand() * 31536000000))
    .toISOString()
    .replace('T', ' ')
    .substring(0, 19);
  return {
    Make: device.make,
    Model: device.model,
    Software: device.software,
    DateTime: date,
    DateTimeOriginal: date,
    DateTimeDigitized: date,
    Copyright: `© ${new Date().getFullYear()}`,
    Artist: `User${Math.floor(rand() * 10000)}`,
    ImageDescription: `IMG_${Math.floor(rand() * 10000).toString().padStart(4, '0')}`,
  };
}

/**
 * Модифицирует изображение «минимально»:
 * - Только обрезка до квадрата.
 * - Далее сразу raw → uniqueness → JPEG с LSB.
 */
async function modifyMinimal(imageBuffer, hash) {
  const cropped = await cropImageBuffer(imageBuffer);
  const { data: srcData, info: srcInfo } = await sharp(cropped)
    .raw()
    .toBuffer({ resolveWithObject: true });
  // У нас нет глобальных модификаций (modulate/recomb/sharpen)
  const finalData = guaranteePixelUniqueness(
    srcData,
    srcData,
    srcInfo.channels,
    hash,
    srcInfo.width,
    srcInfo.height
  );
  return await sharp(finalData, {
    raw: {
      width: srcInfo.width,
      height: srcInfo.height,
      channels: srcInfo.channels,
    },
  })
    .jpeg({ quality: 95 })
    .withMetadata({ exif: generatePlausibleMetadata(hash) })
    .toBuffer();
}

/**
 * Модифицирует изображение «максимально»:
 * - Обрезка до квадрата.
 * - Modulate с сильными настройками.
 * - Recomb (усиление красного).
 * - Sharpen с большим sigma/strength.
 * - Затем raw → uniqueness → JPEG с LSB.
 */
async function modifyMaximal(imageBuffer, hash) {
  const cropped = await cropImageBuffer(imageBuffer);
  const modulated = await sharp(cropped)
    .modulate({ brightness: 1.3, saturation: 1.3, hue: 50 })            // сильная коррекция
    .recomb([
      [1.2, 0,   0  ], // усиливаем красный канал
      [0,   1.0, 0  ],
      [0,   0,   1.0],
    ])
    .sharpen(5, 1, 5) // очень сильная резкость
    .toBuffer();

  const { data: modData, info: modInfo } = await sharp(modulated)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data: srcData, info: srcInfo } = await sharp(cropped)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const finalData = guaranteePixelUniqueness(
    srcData,
    modData,
    modInfo.channels,
    hash,
    modInfo.width,
    modInfo.height
  );

  return await sharp(finalData, {
    raw: {
      width: modInfo.width,
      height: modInfo.height,
      channels: modInfo.channels,
    },
  })
    .jpeg({ quality: 95 })
    .withMetadata({ exif: generatePlausibleMetadata(hash) })
    .toBuffer();
}

async function runTest() {
  const inputDir = '/Users/pavel/Projects/telegram-tt/src/sender/images/male/1';
  const outputDir = path.join(inputDir, 'uniqueness_test');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const files = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png)$/i.test(f));

  for (const fileName of files) {
    const filePath = path.join(inputDir, fileName);
    const buffer = fs.readFileSync(filePath);
    const baseHash = generateUniqueHash(fileName);

    // «Минус» версия: минимальные изменения
    const minusBuffer = await modifyMinimal(buffer, baseHash + '_minus');
    const minusName = fileName.replace(/(\.(jpe?g|png))$/i, '_minus$1');
    fs.writeFileSync(path.join(outputDir, minusName), minusBuffer);

    // «Плюс» версия: максимальные изменения
    const plusBuffer = await modifyMaximal(buffer, baseHash + '_plus');
    const plusName = fileName.replace(/(\.(jpe?g|png))$/i, '_plus$1');
    fs.writeFileSync(path.join(outputDir, plusName), plusBuffer);

    console.log(`Processed: ${fileName} → ${minusName}, ${plusName}`);
  }
}

runTest().catch(err => console.error(err));
