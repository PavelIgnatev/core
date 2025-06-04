import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
import sharp from 'sharp';

type Matrix3x3 = [
  [number, number, number],
  [number, number, number],
  [number, number, number],
];

class CustomFile {
  name: string;
  size: number;
  path: string;
  buffer?: Buffer;

  constructor(name: string, size: number, path: string, buffer?: Buffer) {
    this.name = name;
    this.size = size;
    this.path = path;
    this.buffer = buffer;
  }
}

async function cropImageBuffer(imageBuffer: Buffer): Promise<Buffer> {
  try {
    const image = sharp(imageBuffer);
    const metadata = await image.metadata();

    if (!metadata.width || !metadata.height) return imageBuffer;

    const size = Math.min(metadata.width, metadata.height);
    const left = Math.floor((metadata.width - size) / 2);
    const top = Math.floor((metadata.height - size) / 2);

    return await image
      .extract({
        left,
        top,
        width: size,
        height: size,
      })
      .toBuffer();
  } catch {
    return imageBuffer;
  }
}

function generateUniqueHash(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function createRandomGenerator(hash: string): () => number {
  let state = parseInt(hash.substring(0, 12), 16);

  return function () {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

interface ModifyParams {
  brightness: number;
  saturation: number;
  hue: number;
  sharpen: {
    sigma: number;
    strength: number;
  };
  colorMatrix: Matrix3x3;
  blur: number;
  flip: boolean;
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

function generateModificationParams(
  hash: string,
  folderHash: string,
  index: number
): ModifyParams {
  const rand = createRandomGenerator(hash);
  const folderRand = createRandomGenerator(folderHash);
  const timestamp = Date.now() % 1000;

  // Упрощенная стратегия с минимальными визуальными изменениями
  const strategyVariant = Math.floor(folderRand() * 3) + 1;
  
  // Минимальные цветовые корректировки
  const hueShift = folderRand() * 0.2 - 0.1; // ±0.1 градуса
  
  // Мягкая цветовая матрица
  const colorMatrix: Matrix3x3 = [
    [1 + (folderRand() * 0.004 - 0.002), folderRand() * 0.001, folderRand() * 0.001],
    [folderRand() * 0.001, 1 + (folderRand() * 0.004 - 0.002), folderRand() * 0.001],
    [folderRand() * 0.001, folderRand() * 0.001, 1 + (folderRand() * 0.004 - 0.002)],
  ];

  // Генерация уникального паттерна изменений
  const uniqueShiftPattern = [];
  for (let i = 0; i < 64; i++) {
    uniqueShiftPattern.push(Math.floor(rand() * 3) - 1); // -1, 0, или 1
  }

  const uniqueData = crypto.randomBytes(12).toString('hex');

  return {
    brightness: 1 + (folderRand() * 0.01 - 0.005),
    saturation: 1 + (folderRand() * 0.01 - 0.005),
    hue: hueShift,

    sharpen: {
      sigma: 0.1 + folderRand() * 0.2,
      strength: 0.2 + folderRand() * 0.2,
    },

    blur: 0,
    flip: false,

    colorMatrix: colorMatrix,

    forceChange: {
      rShift: 0,
      gShift: 0,
      bShift: 0,
      shiftPattern: uniqueShiftPattern,
      copyIndex: index,
    },

    metadata: {
      id: hash.substring(0, 12) + timestamp + index,
      timestamp: Date.now(),
      variant: strategyVariant,
      uniqueData: uniqueData,
    },
  };
}

function guaranteePixelUniqueness(
  originalData: Uint8Array | Buffer,
  modifiedData: Uint8Array | Buffer,
  channels: number,
  hash: string,
  width: number,
  height: number
): Buffer {
  const result = Buffer.from(modifiedData);
  const rand = createRandomGenerator(hash);
  
  // Создаем карту изменений для соседних пикселей
  const changeMap = new Float32Array(width * height * 3).fill(0);
  const kernel = [
    [0.11, 0.15, 0.11],
    [0.15, 0.20, 0.15],
    [0.11, 0.15, 0.11]
  ];
  
  // Функция для вычисления индекса
  const idx = (x: number, y: number, c: number) => 
    (y * width + x) * channels + c;
  
  // Применяем согласованные изменения по областям
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      // Вычисляем разницу с оригиналом
      const diffR = modifiedData[idx(x, y, 0)] - originalData[idx(x, y, 0)];
      const diffG = modifiedData[idx(x, y, 1)] - originalData[idx(x, y, 1)];
      const diffB = modifiedData[idx(x, y, 2)] - originalData[idx(x, y, 2)];
      
      // Распространяем разницу на соседние пиксели
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const weight = kernel[ky+1][kx+1];
          const pos = idx(x+kx, y+ky, 0);
          
          changeMap[pos]   += diffR * weight;
          changeMap[pos+1] += diffG * weight;
          changeMap[pos+2] += diffB * weight;
        }
      }
    }
  }
  
  // Применяем адаптивные изменения
  for (let i = 0; i < originalData.length; i += channels) {
    const pixelIndex = Math.floor(i / channels);
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);
    
    // Только для RGB каналов
    for (let c = 0; c < 3; c++) {
      // Вычисляем базовое изменение
      let change = changeMap[i + c];
      
      // Добавляем уникальное шумоподобное изменение
      const noise = Math.sin(x * 0.1 + y * 0.1 + c) * 0.3 + 
                   Math.cos(x * 0.07 - y * 0.05) * 0.4;
      
      // Финальная коррекция
      const correction = change * 0.8 + noise * 0.2;
      
      // Применяем с ограничениями
      const newValue = originalData[i + c] + correction;
      result[i + c] = Math.max(0, Math.min(255, Math.round(newValue)));
    }
  }
  
  // Гарантируем минимальные изменения в каждом пикселе
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
        (rand() > 0.5 ? 1 : -1),
        (rand() > 0.5 ? 1 : -1),
        (rand() > 0.5 ? 1 : -1)
      ];
      
      for (let c = 0; c < 3; c++) {
        result[i + c] = Math.max(0, Math.min(255, 
          originalData[i + c] + pattern[c]
        ));
      }
    }
  }
  
  return result;
}

function generatePlausibleMetadata(hash: string): Record<string, string> {
  const rand = createRandomGenerator(hash);
  const devices = [
    { make: 'Canon', model: 'EOS R5', software: 'Adobe Photoshop 25.0' },
    { make: 'Nikon', model: 'D850', software: 'Adobe Photoshop 24.7' },
    { make: 'Sony', model: 'ILCE-7M4', software: 'Capture One 23' },
    { make: 'Fujifilm', model: 'X-T5', software: 'Lightroom Classic 12.3' }
  ];
  
  const device = devices[Math.floor(rand() * devices.length)];
  const date = new Date(Date.now() - Math.floor(rand() * 31536000000))
    .toISOString().replace('T', ' ').substring(0, 19);
  
  return {
    Make: device.make,
    Model: device.model,
    Software: device.software,
    DateTime: date,
    DateTimeOriginal: date,
    DateTimeDigitized: date,
    Copyright: `Copyright © ${new Date().getFullYear()}`,
    Artist: `User${Math.floor(rand() * 10000)}`,
    ImageDescription: `IMG_${Math.floor(rand() * 10000).toString().padStart(4, '0')}`
  };
}

async function modifyImageAdvanced(
  imageBuffer: Buffer,
  params: ModifyParams
): Promise<Buffer> {
  try {
    const originalBuffer = Buffer.from(imageBuffer);
    const { data: sourceData, info: sourceInfo } = await sharp(imageBuffer)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Минимальные глобальные корректировки
    let buffer = await sharp(imageBuffer)
      .modulate({
        brightness: params.brightness,
        saturation: params.saturation,
        hue: params.hue
      })
      .recomb(params.colorMatrix)
      .sharpen(params.sharpen.sigma, 1, params.sharpen.strength)
      .toBuffer();
    
    const { data: modifiedData, info: modifiedInfo } = await sharp(buffer)
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    // Применяем улучшенную уникализацию пикселей
    const finalData = guaranteePixelUniqueness(
      sourceData,
      modifiedData,
      modifiedInfo.channels,
      params.metadata.id,
      modifiedInfo.width,
      modifiedInfo.height
    );
    
    // Сохраняем с улучшенным сжатием
    const resultBuffer = await sharp(finalData, {
      raw: {
        width: modifiedInfo.width,
        height: modifiedInfo.height,
        channels: modifiedInfo.channels
      }
    })
    .jpeg({ 
      quality: 95,
      mozjpeg: true,
      trellisQuantisation: true,
      overshootDeringing: true
    })
    .withMetadata({
      exif: generatePlausibleMetadata(params.metadata.id)
    })
    .toBuffer();
    
    return resultBuffer;
  } catch (error) {
    return imageBuffer;
  }
}

export const getProfileFiles = async (
  prefix:
    | 'male'
    | 'female'
    | 'adult'
    | 'vasilisa'
    | 'casino'
    | 'onlik'
    | 'wellside'
) => {
  let files: string[] = [];
  let folderName = '';

  const getFilesFromFolder = () => {
    const folders = fs.readdirSync(path.join(__dirname, `/images/${prefix}`));
    const randomIndex = Math.floor(Math.random() * folders.length);
    const randomFolder = folders[randomIndex];
    folderName = path.basename(randomFolder);
    files = fs
      .readdirSync(path.join(__dirname, `/images/${prefix}/${folderName}`))
      .filter((file) => /\.(png|jpg|jpeg)$/i.test(file));
  };

  while (!files.length) {
    getFilesFromFolder();
  }

  const uniqueId = crypto.randomBytes(8).toString('hex');
  const tempDir = path.join(os.tmpdir(), `${uniqueId}-${Date.now()}`);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const folderHash = generateUniqueHash(
    `${folderName}_${prefix}_${Date.now()}`
  );

  const customFiles = files.map((fileName) => {
    const filePath = path.join(
      __dirname,
      `/images/${prefix}/${folderName}/${fileName}`
    );
    const originalBuffer = fs.readFileSync(filePath);

    return new CustomFile(
      fileName,
      fs.statSync(filePath).size,
      filePath,
      originalBuffer
    );
  });

  return Promise.all(
    customFiles.map(async (file, fileIndex) => {
      if (file.buffer) {
        file.buffer = await cropImageBuffer(file.buffer);

        const entropy = [
          file.path,
          fileIndex.toString(),
          Date.now().toString(),
          crypto.randomBytes(16).toString('hex'),
        ].join('_');
        
        const uniqueHash = generateUniqueHash(entropy);
        const params = generateModificationParams(
          uniqueHash,
          folderHash,
          fileIndex
        );
        
        file.buffer = await modifyImageAdvanced(file.buffer, params);
        
        const tempFileName = `${uniqueHash}-${crypto.randomBytes(4).toString('hex')}${path.extname(file.name)}`;
        const tempFilePath = path.join(tempDir, tempFileName);

        fs.writeFileSync(tempFilePath, file.buffer);

        file.path = tempFilePath;
        file.name = tempFileName;
        file.size = file.buffer.length;
      }
      return file;
    })
  );
};