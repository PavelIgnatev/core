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
  return crypto.createHash('md5').update(input).digest('hex');
}

function createRandomGenerator(hash: string): () => number {
  let state = parseInt(hash.substring(0, 8), 16);

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

  const strategyVariant = Math.floor(folderRand() * 5) + 1;

  const hueShift =
    strategyVariant === 1
      ? Math.floor(folderRand() * 5) - 2
      : Math.floor(folderRand() * 3) - 1;

  const blur = strategyVariant === 3 ? 0.3 + folderRand() * 0.4 : 0;

  const flip = strategyVariant === 4;

  let colorMatrix: Matrix3x3;
  switch (strategyVariant) {
    case 1:
      colorMatrix = [
        [1.03 + folderRand() * 0.05, folderRand() * 0.02, folderRand() * 0.02],
        [folderRand() * 0.01, 0.95 + folderRand() * 0.04, folderRand() * 0.01],
        [folderRand() * 0.01, folderRand() * 0.01, 0.96 + folderRand() * 0.03],
      ];
      break;
    case 2:
      colorMatrix = [
        [0.95 + folderRand() * 0.03, folderRand() * 0.01, folderRand() * 0.01],
        [folderRand() * 0.02, 1.03 + folderRand() * 0.05, folderRand() * 0.02],
        [folderRand() * 0.01, folderRand() * 0.01, 0.96 + folderRand() * 0.03],
      ];
      break;
    case 3:
      colorMatrix = [
        [0.96 + folderRand() * 0.03, folderRand() * 0.01, folderRand() * 0.01],
        [folderRand() * 0.01, 0.97 + folderRand() * 0.02, folderRand() * 0.01],
        [folderRand() * 0.02, folderRand() * 0.02, 1.03 + folderRand() * 0.05],
      ];
      break;
    case 4:
      colorMatrix = [
        [
          1.02 + folderRand() * 0.04,
          -0.01 - folderRand() * 0.01,
          -0.01 - folderRand() * 0.01,
        ],
        [
          -0.01 - folderRand() * 0.01,
          1.02 + folderRand() * 0.04,
          -0.01 - folderRand() * 0.01,
        ],
        [
          -0.01 - folderRand() * 0.01,
          -0.01 - folderRand() * 0.01,
          1.02 + folderRand() * 0.04,
        ],
      ];
      break;
    default:
      colorMatrix = [
        [0.98 + folderRand() * 0.04, folderRand() * 0.02, folderRand() * 0.02],
        [folderRand() * 0.02, 0.98 + folderRand() * 0.04, folderRand() * 0.02],
        [folderRand() * 0.02, folderRand() * 0.02, 0.98 + folderRand() * 0.04],
      ];
  }

  const uniqueShiftPattern = [];
  for (let i = 0; i < 16; i++) {
    uniqueShiftPattern.push(Math.floor(rand() * 3) - 1);
  }

  const indexSpecificShift = {
    r: ((index % 3) - 1) * 2,
    g: (((index + 1) % 3) - 1) * 2,
    b: (((index + 2) % 3) - 1) * 2,
  };

  const uniqueData = Buffer.from(hash + timestamp.toString())
    .toString('base64')
    .substring(0, 20);

  return {
    brightness: 1 + (folderRand() * 0.1 - 0.05) + index * 0.01,
    saturation: 1 + (folderRand() * 0.06 - 0.03) - index * 0.005,
    hue: hueShift,

    sharpen: {
      sigma: 0.7 + folderRand() * 0.6 + index * 0.05,
      strength: 0.8 + folderRand() * 0.4,
    },

    blur: blur,
    flip: flip,

    colorMatrix: colorMatrix,

    forceChange: {
      rShift: Math.ceil(rand() * 2) + indexSpecificShift.r,
      gShift: Math.ceil(rand() * 2) + indexSpecificShift.g,
      bShift: Math.ceil(rand() * 2) + indexSpecificShift.b,
      shiftPattern: uniqueShiftPattern,
      copyIndex: index,
    },

    metadata: {
      id: hash.substring(0, 10) + timestamp + index,
      timestamp: Date.now(),
      variant: strategyVariant,
      uniqueData: uniqueData,
    },
  };
}

function guaranteeAllPixelsChanged(
  originalData: Uint8Array | Buffer,
  modifiedData: Uint8Array | Buffer,
  channels: number
): Buffer {
  const result = Buffer.from(modifiedData);

  for (let i = 0; i < originalData.length; i += channels) {
    let pixelChanged = false;

    for (let c = 0; c < 3; c++) {
      if (originalData[i + c] !== result[i + c]) {
        pixelChanged = true;
        break;
      }
    }

    if (!pixelChanged) {
      result[i] = originalData[i] ^ 1;
      result[i + 1] = originalData[i + 1] ^ 1;
      result[i + 2] = originalData[i + 2] ^ 1;
    }
  }

  return result;
}

function generateRandomMetadata(): Record<string, string> {
  const randomWords = [
    'image',
    'photo',
    'pic',
    'snapshot',
    'camera',
    'lens',
    'view',
    'moment',
    'memory',
    'capture',
    'scene',
    'portrait',
    'frame',
    'shot',
    'panorama',
    'digital',
    'pixel',
    'color',
    'light',
    'shadow',
    'focus',
    'visual',
    'artwork',
  ];

  const getRandomWord = () =>
    randomWords[Math.floor(Math.random() * randomWords.length)];

  const randomString = (length: number) => {
    return crypto.randomBytes(length).toString('hex').substring(0, length);
  };

  const randomDate = () => {
    const start = new Date(2018, 0, 1).getTime();
    const end = new Date().getTime();
    const randomTimestamp = start + Math.random() * (end - start);
    return new Date(randomTimestamp)
      .toISOString()
      .split('T')[0]
      .replace(/-/g, ':');
  };

  return {
    ImageDescription: `${getRandomWord()}-${getRandomWord()}-${randomString(8)}`,
    Copyright: `${randomString(4)}-${randomString(6)}-${randomString(4)}`,
    Software: `${getRandomWord()}${randomString(5)}`,
    Artist: `${randomString(8)}`,
    DateTime: randomDate(),
    Make: `${getRandomWord()}${randomString(3)}`,
    Model: `${getRandomWord()}-${randomString(4)}`,
  };
}

function generateExtendedMetadata(): Record<string, any> {
  const baseMetadata = generateRandomMetadata();
  
  // Добавляем GPS данные с минимальными вариациями
  const baseLatitude = 55.7558 + (Math.random() - 0.5) * 0.0001;
  const baseLongitude = 37.6173 + (Math.random() - 0.5) * 0.0001;
  
  // Генерируем уникальные настройки камеры
  const cameraSettings = {
    ISO: Math.floor(100 + Math.random() * 900),
    ShutterSpeed: `1/${Math.floor(100 + Math.random() * 900)}`,
    Aperture: `f/${(2 + Math.random() * 14).toFixed(1)}`,
    FocalLength: `${Math.floor(24 + Math.random() * 176)}mm`,
    SerialNumber: crypto.randomBytes(8).toString('hex').toUpperCase(),
  };

  // Добавляем XMP-подобные метаданные
  const xmpData = {
    DocumentID: `xmp.did:${crypto.randomBytes(16).toString('hex')}`,
    InstanceID: `xmp.iid:${crypto.randomBytes(16).toString('hex')}`,
    ModifyDate: new Date().toISOString(),
    MetadataDate: new Date().toISOString(),
    CreatorTool: `CustomImageProcessor-${crypto.randomBytes(4).toString('hex')}`,
  };

  return {
    ...baseMetadata,
    GPSLatitude: `${baseLatitude}`,
    GPSLongitude: `${baseLongitude}`,
    ...cameraSettings,
    ...xmpData,
  };
}

function createUniqueNoisePattern(width: number, height: number, seed: string): Uint8Array {
  const rand = createRandomGenerator(seed);
  const pattern = new Uint8Array(width * height * 4);
  
  for (let i = 0; i < pattern.length; i += 4) {
    // Очень слабые изменения для RGB каналов
    pattern[i] = Math.floor(rand() * 2);     // R: 0 или 1
    pattern[i + 1] = Math.floor(rand() * 2); // G: 0 или 1
    pattern[i + 2] = Math.floor(rand() * 2); // B: 0 или 1
    pattern[i + 3] = 0;                      // Альфа: без изменений
  }
  
  return pattern;
}

function createComplexNoisePattern(
  width: number,
  height: number,
  seed: string,
  index: number
): Uint8Array {
  const rand = createRandomGenerator(seed + index);
  const pattern = new Uint8Array(width * height * 4);
  
  // Создаем базовый шум с разной интенсивностью
  for (let i = 0; i < pattern.length; i += 4) {
    pattern[i] = Math.floor(rand() * 3) - 1;     // R: -1, 0, или 1
    pattern[i + 1] = Math.floor(rand() * 3) - 1; // G: -1, 0, или 1
    pattern[i + 2] = Math.floor(rand() * 3) - 1; // B: -1, 0, или 1
    pattern[i + 3] = 0;                          // Альфа: без изменений
  }
  
  return pattern;
}

function applySubtlePatterns(
  data: Uint8Array,
  width: number,
  height: number,
  params: ModifyParams
): Uint8Array {
  const result = Buffer.from(data);
  const noisePattern = createComplexNoisePattern(width, height, params.metadata.id, params.forceChange.copyIndex);
  
  // Паттерн 1: Сложный шахматный паттерн с разными размерами клеток
  const chessSize1 = params.forceChange.copyIndex + 3;
  const chessSize2 = params.forceChange.copyIndex + 5;
  
  // Паттерн 2: Множественные диагональные линии
  const diagonalStep1 = params.forceChange.copyIndex + 7;
  const diagonalStep2 = params.forceChange.copyIndex + 11;
  
  // Паттерн 3: Волновой паттерн
  const waveLength = params.forceChange.copyIndex + 13;
  const waveAmplitude = params.forceChange.copyIndex + 17;
  
  // Паттерн 4: Спиральный паттерн
  const spiralStep = params.forceChange.copyIndex + 19;
  
  // Паттерн 5: Радиальный градиент
  const centerX = width / 2;
  const centerY = height / 2;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      
      // Проверяем различные паттерны
      const isChessPixel1 = Math.floor(x / chessSize1) % 2 === Math.floor(y / chessSize1) % 2;
      const isChessPixel2 = Math.floor(x / chessSize2) % 2 === Math.floor(y / chessSize2) % 2;
      const isDiagonalPixel1 = (x + y) % diagonalStep1 === 0;
      const isDiagonalPixel2 = (x + y) % diagonalStep2 === 0;
      
      // Волновой паттерн
      const waveValue = Math.sin(x / waveLength) * Math.cos(y / waveLength) * waveAmplitude;
      const isWavePixel = Math.abs(waveValue - Math.round(waveValue)) < 0.2;
      
      // Спиральный паттерн
      const angle = Math.atan2(y - centerY, x - centerX);
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      const isSpiralPixel = (angle * distance / spiralStep) % 1 < 0.1;
      
      // Радиальный градиент
      const normalizedDistance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) / Math.sqrt(centerX ** 2 + centerY ** 2);
      const isGradientPixel = normalizedDistance % 0.1 < 0.02;
      
      if (isChessPixel1 || isChessPixel2 || isDiagonalPixel1 || isDiagonalPixel2 || 
          isWavePixel || isSpiralPixel || isGradientPixel) {
        // Применяем более сложные изменения
        for (let c = 0; c < 3; c++) {
          const noise = noisePattern[idx + c];
          const currentValue = result[idx + c];
          
          // Добавляем микроскопические изменения на основе всех паттернов
          let change = noise;
          if (isChessPixel1) change += (x + y) % 2 ? 1 : -1;
          if (isDiagonalPixel1) change += (x * y) % 2 ? 1 : -1;
          if (isWavePixel) change += Math.sign(waveValue);
          if (isSpiralPixel) change += Math.sign(angle);
          if (isGradientPixel) change += Math.sign(normalizedDistance - 0.5);
          
          // Нормализуем изменения до ±1
          change = Math.sign(change);
          
          result[idx + c] = Math.max(0, Math.min(255, currentValue + change));
        }
      }
      
      // Добавляем уникальные маркеры в разных частях изображения
      const markerSize = 2;
      const markerPositions = [
        [markerSize, markerSize],                        // Верхний левый
        [width - markerSize, markerSize],                // Верхний правый
        [markerSize, height - markerSize],               // Нижний левый
        [width - markerSize, height - markerSize],       // Нижний правый
        [width / 2, markerSize],                         // Верхний центр
        [width / 2, height - markerSize],                // Нижний центр
        [markerSize, height / 2],                        // Левый центр
        [width - markerSize, height / 2],                // Правый центр
      ];
      
      for (const [markerX, markerY] of markerPositions) {
        if (Math.abs(x - markerX) < markerSize && Math.abs(y - markerY) < markerSize) {
          const markerPattern = (x * y + params.forceChange.copyIndex) % 3 - 1;
          result[idx] = Math.max(0, Math.min(255, result[idx] + markerPattern));
          result[idx + 1] = Math.max(0, Math.min(255, result[idx + 1] - markerPattern));
          result[idx + 2] = Math.max(0, Math.min(255, result[idx + 2] + markerPattern));
        }
      }
    }
  }
  
  return result;
}

async function modifyImageAdvanced(
  imageBuffer: Buffer,
  params: ModifyParams
): Promise<Buffer> {
  try {
    const originalBuffer = Buffer.from(imageBuffer);
    const sourceImage = await sharp(imageBuffer)
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data: sourceData, info: sourceInfo } = sourceImage;
    
    // Применяем тонкие изменения пикселей
    const modifiedData = applySubtlePatterns(
      sourceData,
      sourceInfo.width,
      sourceInfo.height,
      params
    );

    // Генерируем уникальные GPS координаты
    const baseLatitude = 55.7558 + (Math.random() - 0.5) * 0.0001;
    const baseLongitude = 37.6173 + (Math.random() - 0.5) * 0.0001;

    // Генерируем уникальное имя создателя
    const creatorTool = `ImageProcessor-${crypto.randomBytes(4).toString('hex')}`;

    const resultBuffer = await sharp(modifiedData, {
      raw: {
        width: sourceInfo.width,
        height: sourceInfo.height,
        channels: sourceInfo.channels,
      },
    })
      .withMetadata({
        exif: {
          IFD0: {
            GPSLatitudeRef: 'N',
            GPSLatitude: baseLatitude.toString(),
            GPSLongitudeRef: 'E',
            GPSLongitude: baseLongitude.toString(),
            UserComment: `Custom-${crypto.randomBytes(16).toString('hex')}`,
            ImageUniqueID: crypto.randomBytes(32).toString('hex'),
            DocumentName: `Doc-${Date.now()}-${crypto.randomBytes(8).toString('hex')}`,
            ImageDescription: `${creatorTool}-${Date.now()}`,
            Software: `${creatorTool}-v${crypto.randomBytes(4).toString('hex')}`,
            ModifyDate: new Date().toISOString(),
          }
        }
      })
      .jpeg({ 
        quality: 95,
        force: true,
        chromaSubsampling: '4:4:4',
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
          Math.random().toString(),
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
