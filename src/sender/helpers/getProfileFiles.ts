import crypto from 'crypto';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import sharp from 'sharp';

type Matrix3x3 = [[number, number, number], [number, number, number], [number, number, number]];

class CustomFile {
  name: string;
  size: number;
  filePath: string;
  buffer?: Buffer;

  constructor(name: string, size: number, filePath: string, buffer?: Buffer) {
    this.name = name;
    this.size = size;
    this.filePath = filePath;
    this.buffer = buffer;
  }
}

interface ModifyParams {
  brightness: number;
  saturation: number;
  hue: number; // degrees (0–360)
  sharpen: { sigma: number; strength: number };
  colorMatrix: Matrix3x3;
  blurRadius: number;
  flipHorizontal: boolean;
  forceChange: {
    rShift: number;
    gShift: number;
    bShift: number;
    shiftPattern: number[];
    copyIndex: number;
  };
  metadata: {
    id: string;
    timestamp: number;
    variant: number;
    uniqueData: string;
  };
}

/** Сгенерировать SHA-256 хэш (hex) по строке */
function generateUniqueHash(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

/** Создать псевдо-случайный генератор на основе первых 12 символов hex-хэша */
function createRandomGenerator(hash: string): () => number {
  let state = parseInt(hash.substring(0, 12), 16) >>> 0;
  return (): number => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

/** Обрезать буфер изображения в центрированный квадрат */
async function cropToSquare(imageBuffer: Buffer): Promise<Buffer> {
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();
  if (!metadata.width || !metadata.height) return imageBuffer;
  const size = Math.min(metadata.width, metadata.height);
  const left = Math.floor((metadata.width - size) / 2);
  const top = Math.floor((metadata.height - size) / 2);
  return await image.extract({ left, top, width: size, height: size }).toBuffer();
}

/** Сгенерировать параметры модификации для одного изображения */
function generateModificationParams(
  imageHash: string,
  folderHash: string,
  index: number
): ModifyParams {
  const rand = createRandomGenerator(imageHash);
  const folderRand = createRandomGenerator(folderHash);
  const timestamp = Date.now() % 1000;
  const variant = Math.floor(folderRand() * 3) + 1;

  // Hue shift: случайно в диапазоне [-36°, +36°]
  const hueShiftFraction = folderRand() * 0.2 - 0.1;
  const hueDegrees = Math.round(hueShiftFraction * 360);

  const colorMatrix: Matrix3x3 = [
    [1 + (folderRand() * 0.004 - 0.002), folderRand() * 0.001, folderRand() * 0.001],
    [folderRand() * 0.001, 1 + (folderRand() * 0.004 - 0.002), folderRand() * 0.001],
    [folderRand() * 0.001, folderRand() * 0.001, 1 + (folderRand() * 0.004 - 0.002)],
  ];

  // Сгенерировать shiftPattern длиной 64 со случайными {-1,0,1}
  const shiftPattern: number[] = Array.from({ length: 64 }, () => Math.floor(rand() * 3) - 1);
  const uniqueData = crypto.randomBytes(12).toString('hex');
  const id = `${imageHash.substring(0, 12)}${timestamp}${index}`;

  return {
    brightness: 1 + (folderRand() * 0.01 - 0.005),
    saturation: 1 + (folderRand() * 0.01 - 0.005),
    hue: hueDegrees,
    sharpen: { sigma: 0.1 + folderRand() * 0.2, strength: 0.2 + folderRand() * 0.2 },
    colorMatrix,
    blurRadius: 0,
    flipHorizontal: false,
    forceChange: {
      rShift: Math.floor(rand() * 3) - 1,    // случайный shift в {-1, 0, 1}
      gShift: Math.floor(rand() * 3) - 1,
      bShift: Math.floor(rand() * 3) - 1,
      shiftPattern,
      copyIndex: index,
    },
    metadata: {
      id,
      timestamp: Date.now(),
      variant,
      uniqueData,
    },
  };
}

/**
 * Обеспечить уникальность пикселей: плавно «распространить» разницу с оригиналом,
 * добавить небольшую шумовую компоненту и скорректировать младшие биты.
 */
function guaranteePixelUniqueness(
  originalData: Uint8Array,
  modifiedData: Uint8Array,
  channels: number,
  hash: string,
  width: number,
  height: number
): Buffer {
  const result = Buffer.from(modifiedData);
  const rand = createRandomGenerator(hash);
  const totalPixels = width * height;
  const changeMap = new Float32Array(totalPixels * 3).fill(0);
  const kernel = [
    [0.11, 0.15, 0.11],
    [0.15, 0.20, 0.15],
    [0.11, 0.15, 0.11],
  ];

  // Построить карту изменений через ядро 3×3
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const baseIndex = (y * width + x) * channels;
      const diffR = modifiedData[baseIndex] - originalData[baseIndex];
      const diffG = modifiedData[baseIndex + 1] - originalData[baseIndex + 1];
      const diffB = modifiedData[baseIndex + 2] - originalData[baseIndex + 2];

      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const weight = kernel[ky + 1][kx + 1];
          const neighborIdx = ((y + ky) * width + (x + kx)) * channels;
          changeMap[neighborIdx] += diffR * weight;
          changeMap[neighborIdx + 1] += diffG * weight;
          changeMap[neighborIdx + 2] += diffB * weight;
        }
      }
    }
  }

  // Применить плавную корректировку и шум
  for (let i = 0; i < totalPixels; i++) {
    const x = i % width;
    const y = Math.floor(i / width);
    const baseIndex = i * channels;

    for (let c = 0; c < 3; c++) {
      const change = changeMap[baseIndex + c];
      const noise = Math.sin(x * 0.1 + y * 0.1 + c) * 0.3 + Math.cos(x * 0.07 - y * 0.05) * 0.4;
      const correction = change * 0.8 + noise * 0.2;
      const newValue = originalData[baseIndex + c] + correction;
      result[baseIndex + c] = Math.max(0, Math.min(255, Math.round(newValue)));
    }
  }

  // Если пиксель остался без изменений, перевернуть один LSB
  const lsbRand = createRandomGenerator(hash);
  for (let i = 0; i < totalPixels; i++) {
    const baseIndex = i * channels;
    let identical = true;
    for (let c = 0; c < 3; c++) {
      if (originalData[baseIndex + c] !== result[baseIndex + c]) {
        identical = false;
        break;
      }
    }
    if (identical) {
      const channelToFlip = Math.floor(lsbRand() * 3);
      result[baseIndex + channelToFlip] =
        (result[baseIndex + channelToFlip] & 0xfe) | (lsbRand() > 0.5 ? 1 : 0);
    }
  }

  // Вставить случайные LSB по всему изображению
  for (let i = 0; i < totalPixels; i++) {
    const baseIndex = i * channels;
    for (let c = 0; c < 3; c++) {
      const bit = lsbRand() > 0.5 ? 1 : 0;
      result[baseIndex + c] = (result[baseIndex + c] & 0xfe) | bit;
    }
  }

  return result;
}

/**
 * Модифицировать один буфер изображения:
 * 1) Цветокоррекция через sharp.modulate + recomb
 * 2) Пер-пиксельная уникализация (smoothing + noise + LSB)
 * 3) Применить forceChange: добавить сдвиг из shiftPattern и r/g/b Shift
 * 4) Глобальный фильтр яркости/темноты
 * 5) Локальный (пер-пиксельный) фильтр затемнения до 15%
 * 6) Перекодировка в JPEG
 */
async function modifyImageAdvanced(
  imageBuffer: Buffer,
  params: ModifyParams,
  globalFactor: number
): Promise<Buffer> {
  // 1. Извлечь «сырые» данные оригинала
  const { data: sourceData } = await sharp(imageBuffer)
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Цветовые преобразования
  let intermediate = sharp(imageBuffer).modulate({
    brightness: params.brightness,
    saturation: params.saturation,
    hue: params.hue,
  });
  intermediate = intermediate.recomb(params.colorMatrix);

  if (params.sharpen.sigma > 0) {
    intermediate = intermediate.sharpen(params.sharpen.sigma, 1, params.sharpen.strength);
  }
  if (params.blurRadius > 0) {
    intermediate = intermediate.blur(params.blurRadius);
  }
  if (params.flipHorizontal) {
    intermediate = intermediate.flip();
  }

  const bufferAfterMod = await intermediate.toBuffer();
  const { data: modifiedData, info: modifiedInfo } = await sharp(bufferAfterMod)
    .raw()
    .toBuffer({ resolveWithObject: true });

  // 2. Пер-пиксельная уникализация (smoothing + noise + LSB)
  let uniquePixelsBuffer = guaranteePixelUniqueness(
    sourceData,
    modifiedData,
    modifiedInfo.channels,
    params.metadata.id,
    modifiedInfo.width,
    modifiedInfo.height
  );

  // 3. Применить forceChange (shiftPattern + rShift/gShift/bShift)
  const totalPixels = modifiedInfo.width * modifiedInfo.height;
  const channels = modifiedInfo.channels;
  for (let i = 0; i < totalPixels; i++) {
    const baseIndex = i * channels;
    const patternShift = params.forceChange.shiftPattern[i % params.forceChange.shiftPattern.length];
    // R
    let rVal = uniquePixelsBuffer[baseIndex] + patternShift + params.forceChange.rShift;
    uniquePixelsBuffer[baseIndex] = Math.max(0, Math.min(255, Math.round(rVal)));
    // G
    let gVal = uniquePixelsBuffer[baseIndex + 1] + patternShift + params.forceChange.gShift;
    uniquePixelsBuffer[baseIndex + 1] = Math.max(0, Math.min(255, Math.round(gVal)));
    // B
    let bVal = uniquePixelsBuffer[baseIndex + 2] + patternShift + params.forceChange.bShift;
    uniquePixelsBuffer[baseIndex + 2] = Math.max(0, Math.min(255, Math.round(bVal)));
  }

  // 4. Глобальный фильтр яркости/темноты (один раз для всего изображения)
  for (let i = 0; i < uniquePixelsBuffer.length; i++) {
    uniquePixelsBuffer[i] = Math.max(
      0,
      Math.min(255, Math.round(uniquePixelsBuffer[i] * globalFactor))
    );
  }

  // 5. Локальное (пер-пиксельное) затемнение до 15%
  const randPerPixel = createRandomGenerator(params.metadata.id + 'perpixel');
  for (let i = 0; i < uniquePixelsBuffer.length; i++) {
    const dimFactor = 1 - randPerPixel() * 0.15; // [0.85, 1.0]
    uniquePixelsBuffer[i] = Math.max(
      0,
      Math.min(255, Math.round(uniquePixelsBuffer[i] * dimFactor))
    );
  }

  // 6. Перекодировать в JPEG
  const finalBuffer = await sharp(uniquePixelsBuffer, {
    raw: {
      width: modifiedInfo.width,
      height: modifiedInfo.height,
      channels: modifiedInfo.channels,
    },
  })
    .jpeg({
      quality: 95,
      mozjpeg: true,
      trellisQuantisation: true,
      overshootDeringing: true,
    })
    .withMetadata()
    .toBuffer();

  return finalBuffer;
}

/**
 * Обработать все изображения в случайной подпапке для заданного префикса.
 * Глобальный фильтр (яркость/темнота) вычисляется один раз по folderHash
 * и применяется ко всем изображениям, чтобы они выглядели одинаково.
 * Именование файлов полностью рандомное (crypto.randomUUID()), без связи с оригиналом.
 */
export async function getProfileFiles(
  prefix: 'male' | 'female' | 'adult' | 'vasilisa' | 'casino' | 'onlik' | 'wellside'
): Promise<CustomFile[]> {
  let folderName = '';
  let filesInFolder: string[] = [];
  const rootFolder = path.join(__dirname, 'images', prefix);

  while (filesInFolder.length === 0) {
    const subfolders = await fs.readdir(rootFolder, { withFileTypes: true });
    const onlyDirs = subfolders.filter((d) => d.isDirectory()).map((d) => d.name);
    if (onlyDirs.length === 0) {
      throw new Error(`No subfolders found under images/${prefix}`);
    }
    folderName = onlyDirs[Math.floor(Math.random() * onlyDirs.length)];
    const candidateFolder = path.join(rootFolder, folderName);
    const allFiles = await fs.readdir(candidateFolder);
    filesInFolder = allFiles.filter((f) => /\.(png|jpe?g)$/i.test(f));
  }

  const uniqueId = crypto.randomBytes(8).toString('hex');
  const tempDir = path.join(os.tmpdir(), `${uniqueId}-${Date.now()}`);
  await fs.mkdir(tempDir, { recursive: true });

  // Основная «семя» для папки
  const folderHash = generateUniqueHash(`${folderName}_${prefix}_${Date.now()}`);
  const folderRand = createRandomGenerator(folderHash);

  // Вычислить единый глобальный коэффициент яркости/темноты для всех изображений
  const globalFactor = 1 + (folderRand() * 0.3 - 0.15); // [0.85, 1.15]

  const customFiles: CustomFile[] = [];
  for (const fileName of filesInFolder) {
    const absolutePath = path.join(rootFolder, folderName, fileName);
    const fileBuffer = await fs.readFile(absolutePath);
    const stat = await fs.stat(absolutePath);
    customFiles.push(new CustomFile(fileName, stat.size, absolutePath, fileBuffer));
  }

  const processedFiles: CustomFile[] = [];
  await Promise.all(
    customFiles.map(async (file, index) => {
      if (!file.buffer) return;
      let workingBuffer = await cropToSquare(file.buffer);
      const entropy = [
        file.filePath,
        index.toString(),
        Date.now().toString(),
        crypto.randomBytes(16).toString('hex'),
      ].join('_');
      const imageHash = generateUniqueHash(entropy);
      const params = generateModificationParams(imageHash, folderHash, index);
      workingBuffer = await modifyImageAdvanced(workingBuffer, params, globalFactor);

      // Сгенерировать абсолютно рандомное название через UUID, без связи с оригиналом
      const randomName = `${crypto.randomUUID()}${path.extname(file.name)}`;
      const newFilePath = path.join(tempDir, randomName);
      await fs.writeFile(newFilePath, workingBuffer);
      const newStat = await fs.stat(newFilePath);
      file.name = randomName;
      file.filePath = newFilePath;
      file.size = newStat.size;
      file.buffer = workingBuffer;
      processedFiles.push(file);
    })
  );

  return processedFiles;
}
