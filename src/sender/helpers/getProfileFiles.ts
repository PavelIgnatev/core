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
  return crypto.createHash('sha512').update(input).digest('hex');
}

function createRandomGenerator(hash: string): () => number {
  let state = parseInt(hash.substring(0, 16), 16);
  const mixer = parseInt(hash.substring(16, 24), 16) || 0x9E3779B9;

  return function () {
    state = (state ^ (state >>> 30)) * mixer;
    state = (state ^ (state >>> 27)) * 0x94D049BB133111EB;
    return (state ^ (state >>> 31)) / 18446744073709551616;
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
  noiseProfile: {
    amplitude: number;
    frequency: number;
    phaseShift: number;
  };
  steganography: {
    density: number;
    payload: Buffer;
  };
  geometric: {
    rotation: number;
    perspective: [number, number, number, number];
  };
  quantization: {
    dithering: number;
    palette: boolean;
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

  // Глубокие параметры уникализации
  const strategyVariant = Math.floor(folderRand() * 7) + 1;
  
  // Цветовые корректировки с индивидуальными характеристиками
  const hueShift = folderRand() * 360; // [0, 360] градусов
  
  // Уникальная цветовая матрица для каждого изображения
  const colorMatrix: Matrix3x3 = [
    [
      1 + (folderRand() * 0.02 - 0.01),
      folderRand() * 0.005 - 0.0025,
      folderRand() * 0.005 - 0.0025,
    ],
    [
      folderRand() * 0.005 - 0.0025,
      1 + (folderRand() * 0.02 - 0.01),
      folderRand() * 0.005 - 0.0025,
    ],
    [
      folderRand() * 0.005 - 0.0025,
      folderRand() * 0.005 - 0.0025,
      1 + (folderRand() * 0.02 - 0.01),
    ],
  ];

  // Уникальный паттерн изменений высокой сложности
  const uniqueShiftPattern = [];
  for (let i = 0; i < 256; i++) {
    uniqueShiftPattern.push(Math.floor(rand() * 7) - 3);
  }

  // Профиль шума для уникализации
  const noiseProfile = {
    amplitude: 0.5 + rand() * 1.5,
    frequency: 0.02 + rand() * 0.08,
    phaseShift: rand() * Math.PI * 2,
  };

  // Стеганографические данные
  const stegoPayload = crypto.randomBytes(128);
  
  // Геометрические искажения
  const rotation = (rand() - 0.5) * 0.25;
  const perspective: [number, number, number, number] = [
    (rand() - 0.5) * 0.02,
    (rand() - 0.5) * 0.02,
    (rand() - 0.5) * 0.02,
    (rand() - 0.5) * 0.02,
  ];

  // Квантование и дизеринг
  const quantization = {
    dithering: rand() > 0.7 ? 0.5 + rand() * 0.5 : 0,
    palette: rand() > 0.8,
  };

  return {
    brightness: 1 + (folderRand() * 0.04 - 0.02),
    saturation: 1 + (folderRand() * 0.04 - 0.02),
    hue: hueShift,

    sharpen: {
      sigma: 0.1 + folderRand() * 0.4,
      strength: 0.2 + folderRand() * 0.4,
    },

    blur: rand() > 0.8 ? 0.1 + rand() * 0.3 : 0,
    flip: rand() > 0.85,

    colorMatrix,

    forceChange: {
      rShift: Math.floor(rand() * 5) - 2,
      gShift: Math.floor(rand() * 5) - 2,
      bShift: Math.floor(rand() * 5) - 2,
      shiftPattern: uniqueShiftPattern,
      copyIndex: index,
    },

    metadata: {
      id: hash.substring(0, 24) + timestamp + index,
      timestamp: Date.now(),
      variant: strategyVariant,
      uniqueData: crypto.randomBytes(32).toString('hex'),
    },
    
    noiseProfile,
    
    steganography: {
      density: 0.1 + rand() * 0.15,
      payload: stegoPayload,
    },
    
    geometric: {
      rotation,
      perspective,
    },
    
    quantization,
  };
}

function applySteganography(
  imageData: Uint8Array | Buffer,
  width: number,
  height: number,
  channels: number,
  payload: Buffer,
  density: number
): Buffer {
  const result = Buffer.from(imageData);
  const bitLength = payload.length * 8;
  const totalPixels = width * height;
  
  // Конвертируем полезную нагрузку в биты
  const bits: number[] = [];
  for (const byte of payload) {
    for (let i = 0; i < 8; i++) {
      bits.push((byte >> i) & 1);
    }
  }
  
  // Внедряем данные в случайные пиксели с псевдослучайным распределением
  let bitIndex = 0;
  const pixelStride = Math.max(1, Math.floor(1 / density));
  const seed = payload.readUInt32LE(0);
  let position = seed % (width * height);
  
  while (bitIndex < bits.length) {
    const x = position % width;
    const y = Math.floor(position / width);
    
    if (y < height) {
      const pixelIndex = (y * width + x) * channels;
      const channel = (x + y) % 3;
      
      if (pixelIndex + channel < result.length) {
        // Меняем младший бит
        result[pixelIndex + channel] = 
          (result[pixelIndex + channel] & 0xFE) | bits[bitIndex];
        bitIndex++;
      }
    }
    
    // Псевдослучайное перемещение
    position = (position * 1664525 + 1013904223) % (width * height);
  }
  
  return result;
}

function guaranteePixelUniqueness(
  originalData: Uint8Array | Buffer,
  modifiedData: Uint8Array | Buffer,
  channels: number,
  hash: string,
  width: number,
  height: number,
  noiseProfile: {
    amplitude: number;
    frequency: number;
    phaseShift: number;
  }
): Buffer {
  const result = Buffer.from(modifiedData);
  const rand = createRandomGenerator(hash);
  
  // Многоканальный шумовой профиль
  const noiseAmplitudes = [
    noiseProfile.amplitude * (0.8 + rand() * 0.4),
    noiseProfile.amplitude * (0.8 + rand() * 0.4),
    noiseProfile.amplitude * (0.8 + rand() * 0.4),
  ];
  
  const noiseFrequencies = [
    noiseProfile.frequency * (0.7 + rand() * 0.6),
    noiseProfile.frequency * (0.7 + rand() * 0.6),
    noiseProfile.frequency * (0.7 + rand() * 0.6),
  ];
  
  const noisePhases = [
    noiseProfile.phaseShift + rand() * Math.PI,
    noiseProfile.phaseShift + rand() * Math.PI,
    noiseProfile.phaseShift + rand() * Math.PI,
  ];
  
  // Функция для вычисления индекса
  const idx = (x: number, y: number, c: number) => 
    (y * width + x) * channels + c;
  
  // Применяем адаптивные изменения с уникальным шумом
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixelIndex = (y * width + x) * channels;
      
      for (let c = 0; c < 3; c++) {
        if (c >= channels) continue;
        
        // Генерируем уникальный шум для каждого канала
        const fractalNoise = 
          Math.sin(x * noiseFrequencies[c] + noisePhases[c]) * 0.5 +
          Math.sin(x * noiseFrequencies[c] * 2.3 + y * noiseFrequencies[c] * 1.7) * 0.3 +
          Math.sin(x * noiseFrequencies[c] * 4.1 + y * noiseFrequencies[c] * 3.3) * 0.2;
        
        const noiseValue = fractalNoise * noiseAmplitudes[c];
        
        // Случайное смещение на основе хеша
        const hashShift = (rand() - 0.5) * 1.5;
        
        // Финальная коррекция с защитой от клиппинга
        const newValue = result[pixelIndex + c] + noiseValue + hashShift;
        result[pixelIndex + c] = Math.max(0, Math.min(255, Math.round(newValue)));
      }
    }
  }
  
  // Гарантированное изменение каждого пикселя
  const pattern = [
    (rand() > 0.5 ? 1 : -1) * (0.5 + rand()),
    (rand() > 0.5 ? 1 : -1) * (0.5 + rand()),
    (rand() > 0.5 ? 1 : -1) * (0.5 + rand()),
  ];
  
  for (let i = 0; i < originalData.length; i += channels) {
    for (let c = 0; c < 3; c++) {
      if (c >= channels) continue;
      
      // Добавляем микро-сдвиг для гарантии уникальности
      result[i + c] = Math.max(0, Math.min(255, 
        result[i + c] + pattern[c]
      ));
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
    { make: 'Fujifilm', model: 'X-T5', software: 'Lightroom Classic 12.3' },
    { make: 'Panasonic', model: 'LUMIX S1R', software: 'DxO PhotoLab 6' },
    { make: 'Leica', model: 'M11', software: 'Darktable 4.2' },
  ];
  
  const lenses = [
    'EF 24-70mm f/2.8L II USM',
    'NIKKOR Z 24-70mm f/2.8 S',
    'FE 24-70mm f/2.8 GM II',
    'XF 23mm f/1.4 R LM WR',
    'DG 50mm f/1.4 HSM | A',
    'APO-Summicron-M 50mm f/2 ASPH',
  ];
  
  const device = devices[Math.floor(rand() * devices.length)];
  const lens = lenses[Math.floor(rand() * lenses.length)];
  const date = new Date(Date.now() - Math.floor(rand() * 31536000000))
    .toISOString().replace('T', ' ').substring(0, 19);
  
  const serial = `000${Math.floor(rand() * 1000000)}`.slice(-6);
  const exposure = `1/${Math.floor(100 + rand() * 500)}`;
  const fNumber = `f/${(1.8 + rand() * 4).toFixed(1)}`;
  const iso = `${Math.floor(100 + rand() * 2000)}`;
  
  return {
    Make: device.make,
    Model: device.model,
    Software: device.software,
    DateTime: date,
    DateTimeOriginal: date,
    DateTimeDigitized: date,
    Copyright: `Copyright © ${new Date().getFullYear()}`,
    Artist: `User${Math.floor(rand() * 10000)}`,
    ImageDescription: `IMG_${Math.floor(rand() * 10000).toString().padStart(4, '0')}`,
    SerialNumber: serial,
    LensModel: lens,
    GPSLatitude: (rand() * 180 - 90).toFixed(6),
    GPSLongitude: (rand() * 360 - 180).toFixed(6),
    ExposureTime: exposure,
    FNumber: fNumber,
    ISOSpeedRatings: iso,
    Rating: `${Math.floor(rand() * 5)}`,
    Creator: `Photographer${Math.floor(rand() * 100)}`,
    Keywords: `portrait,${device.make.toLowerCase()},${lens.split(' ')[0].toLowerCase()}`,
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

    // Первичная обработка изображения
    let buffer = await sharp(imageBuffer)
      .rotate(params.geometric.rotation, {
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .modulate({
        brightness: params.brightness,
        saturation: params.saturation,
        hue: params.hue // Теперь всегда в [0, 360]
      })
      .recomb(params.colorMatrix)
      .sharpen(params.sharpen.sigma, 1, params.sharpen.strength)
      .blur(params.blur)
      .toBuffer();
    
    const { data: modifiedData, info: modifiedInfo } = await sharp(buffer)
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    // Применяем улучшенную уникализацию пикселей
    let finalData = guaranteePixelUniqueness(
      sourceData,
      modifiedData,
      modifiedInfo.channels,
      params.metadata.id,
      modifiedInfo.width,
      modifiedInfo.height,
      params.noiseProfile
    );
    
    // Применяем стеганографию
    finalData = applySteganography(
      finalData,
      modifiedInfo.width,
      modifiedInfo.height,
      modifiedInfo.channels,
      params.steganography.payload,
      params.steganography.density
    );
    
    // Финальная обработка и сжатие
    const pipeline = sharp(finalData, {
      raw: {
        width: modifiedInfo.width,
        height: modifiedInfo.height,
        channels: modifiedInfo.channels
      }
    });
    
    // Расширенные параметры кодирования
    if (params.quantization.palette) {
      pipeline.png({
        quality: 90,
        progressive: true,
        palette: true,
        dither: params.quantization.dithering
      });
    } else {
      pipeline.jpeg({ 
        quality: 90 + Math.floor(Math.random() * 8),
        mozjpeg: true,
        trellisQuantisation: true,
        overshootDeringing: true,
        optimiseScans: true,
        quantisationTable: Math.floor(Math.random() * 8)
      });
    }
    
    const resultBuffer = await pipeline
      .withMetadata({
        exif: generatePlausibleMetadata(params.metadata.id),
        orientation: params.flip ? 8 : undefined
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
    const basePath = path.join(__dirname, `images/${prefix}`);
    if (!fs.existsSync(basePath)) {
      throw new Error(`Directory not found: ${basePath}`);
    }
    
    const folders = fs.readdirSync(basePath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
      
    if (!folders.length) {
      throw new Error(`No folders found in: ${basePath}`);
    }
    
    const randomIndex = Math.floor(Math.random() * folders.length);
    folderName = folders[randomIndex];
    
    const folderPath = path.join(basePath, folderName);
    files = fs.readdirSync(folderPath)
      .filter(file => /\.(png|jpg|jpeg)$/i.test(file));
  };

  while (!files.length) {
    getFilesFromFolder();
  }

  const uniqueId = crypto.randomBytes(16).toString('hex');
  const tempDir = path.join(os.tmpdir(), `${uniqueId}-${Date.now()}`);
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const folderHash = generateUniqueHash(
    `${folderName}_${prefix}_${Date.now()}_${crypto.randomBytes(32).toString('hex')}`
  );

  const customFiles = files.map((fileName) => {
    const filePath = path.join(
      __dirname,
      `images/${prefix}/${folderName}/${fileName}`
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
          crypto.randomBytes(48).toString('hex'),
          Math.random().toString(36).slice(2, 12)
        ].join('_');
        
        const uniqueHash = generateUniqueHash(entropy);
        const params = generateModificationParams(
          uniqueHash,
          folderHash,
          fileIndex
        );
        
        file.buffer = await modifyImageAdvanced(file.buffer, params);
        
        const tempFileName = `${uniqueHash}-${crypto.randomBytes(12).toString('hex')}${path.extname(file.name)}`;
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