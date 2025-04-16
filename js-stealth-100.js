const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');
const { createCanvas, Image } = require('canvas');

// ==================== Настройка путей ====================

// Путь к исходной папке с фотографиями
const sourceFolder = path.join(__dirname, 'src', 'sender', 'images', 'male'); 

// Пути для выходных папок
const outputFolder = path.join(__dirname, 'stealth-unique-100');

// Создаем выходную папку, если её еще нет
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// Список допустимых расширений изображений
const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

/**
 * Создает уникальный хеш для генерации параметров
 */
function generateUniqueHash(input) {
  return crypto.createHash('md5').update(input).digest('hex');
}

/**
 * Создаёт псевдослучайный генератор на основе хеша
 */
function createSeededRandom(hash) {
  let state = parseInt(hash.substring(0, 8), 16);
  
  return function() {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296; // Нормализуем до 0-1
  };
}

/**
 * Генерирует параметры модификации на основе хеша
 */
function generateModificationParams(hash) {
  const rand = createSeededRandom(hash);
  
  // Параметры для микро-геометрических искажений
  const distortionAmount = rand() * 0.5 + 0.2; // 0.2-0.7
  const distortionFrequency = 2 + rand() * 5; // 2-7
  
  // Параметры для шума каждого пикселя
  const noisePattern = [];
  for (let i = 0; i < 256; i++) {
    noisePattern.push(Math.floor(rand() * 3) - 1); // -1, 0, 1
  }
  
  // Нам нужен уникальный сдвиг для каждого пикселя
  // Создаем массивы сдвигов, которые будем применять принудительно
  const pixelShifts = [];
  for (let i = 0; i < 256; i++) {
    // Обязательный ненулевой сдвиг для каждого пикселя (гарантирует изменение)
    const shift = Math.floor(rand() * 2) + 1; // 1 или 2
    const direction = rand() < 0.5 ? -1 : 1; // отрицательное или положительное
    pixelShifts.push(shift * direction);
  }
  
  // Создаем уникальный цветовой фильтр
  const colorMatrix = [
    [0.99 + rand() * 0.02, rand() * 0.01, rand() * 0.01],
    [rand() * 0.01, 0.99 + rand() * 0.02, rand() * 0.01],
    [rand() * 0.01, rand() * 0.01, 0.99 + rand() * 0.02]
  ];
  
  // Параметры для обязательного изменения каждого канала
  const forcedShiftR = (rand() < 0.5 ? -1 : 1);
  const forcedShiftG = (rand() < 0.5 ? -1 : 1);
  const forcedShiftB = (rand() < 0.5 ? -1 : 1);
  
  return {
    distortionAmount,
    distortionFrequency,
    noisePattern, 
    pixelShifts,
    colorMatrix,
    forcedShiftR,
    forcedShiftG,
    forcedShiftB,
    rand // Сохраняем генератор для использования в дальнейшей обработке
  };
}

/**
 * Применяет микроискажения к координатам пикселя для создания незаметного искажения геометрии
 */
function applyMicroDistortion(x, y, width, height, params) {
  // Нормализованные координаты от 0 до 1
  const nx = x / width;
  const ny = y / height;
  
  // Создаем микроискажение на основе синусоидальных волн с уникальным паттерном
  const angle = params.rand() * Math.PI * 2;
  const dx = Math.sin(nx * params.distortionFrequency + angle) * params.distortionAmount;
  const dy = Math.cos(ny * params.distortionFrequency + angle) * params.distortionAmount;
  
  // Применяем минимальное искажение, сохраняя координаты в пределах изображения
  return {
    x: Math.max(0, Math.min(width - 1, x + dx)),
    y: Math.max(0, Math.min(height - 1, y + dy))
  };
}

/**
 * Применяет обязательное изменение каждого пикселя для уникальности изображения
 */
function forcePixelChanges(imageData, originalPixels, params) {
  const { data, width, height } = imageData;
  const pixelShifts = params.pixelShifts;
  
  // Проходим по каждому пикселю
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const patternIdx = (x + y) % pixelShifts.length;
      
      // Получаем значения оригинального пикселя
      const origR = originalPixels[idx];
      const origG = originalPixels[idx + 1]; 
      const origB = originalPixels[idx + 2];
      
      // Текущие значения пикселя после искажений геометрии
      let currentR = data[idx];
      let currentG = data[idx + 1];
      let currentB = data[idx + 2];
      
      // Проверяем каждый канал и принудительно изменяем, если он не изменился
      if (currentR === origR) {
        data[idx] = Math.min(255, Math.max(0, currentR + params.forcedShiftR + pixelShifts[patternIdx]));
      }
      
      if (currentG === origG) {
        data[idx + 1] = Math.min(255, Math.max(0, currentG + params.forcedShiftG + pixelShifts[(patternIdx + 1) % pixelShifts.length]));
      }
      
      if (currentB === origB) {
        data[idx + 2] = Math.min(255, Math.max(0, currentB + params.forcedShiftB + pixelShifts[(patternIdx + 2) % pixelShifts.length]));
      }
      
      // Применяем цветовую матрицу для дополнительного изменения
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      data[idx] = Math.min(255, Math.max(0, Math.floor(
        r * params.colorMatrix[0][0] + 
        g * params.colorMatrix[0][1] + 
        b * params.colorMatrix[0][2]
      )));
      
      data[idx + 1] = Math.min(255, Math.max(0, Math.floor(
        r * params.colorMatrix[1][0] + 
        g * params.colorMatrix[1][1] + 
        b * params.colorMatrix[1][2]
      )));
      
      data[idx + 2] = Math.min(255, Math.max(0, Math.floor(
        r * params.colorMatrix[2][0] + 
        g * params.colorMatrix[2][1] + 
        b * params.colorMatrix[2][2]
      )));
    }
  }
}

/**
 * Проверяет, действительно ли все пиксели были изменены
 * Возвращает процент измененных пикселей
 */
function verifyAllPixelsChanged(originalData, modifiedData) {
  const length = originalData.length;
  let changedPixels = 0;
  let unchangedPixels = [];
  
  for (let i = 0; i < length; i += 4) {
    // Проверяем все три канала RGB
    if (originalData[i] !== modifiedData[i] || 
        originalData[i + 1] !== modifiedData[i + 1] || 
        originalData[i + 2] !== modifiedData[i + 2]) {
      changedPixels++;
    } else {
      // Если нашелся неизмененный пиксель, добавляем его индекс
      unchangedPixels.push(i / 4);
    }
  }
  
  // Возвращаем процент измененных пикселей и индексы неизмененных
  return {
    percentChanged: (changedPixels / (length / 4)) * 100,
    unchangedIndices: unchangedPixels
  };
}

/**
 * Модифицирует изображение с гарантией изменения каждого пикселя
 */
async function modifyImageWithFullCoverage(sourcePath, destinationPath, params) {
  try {
    // Загружаем оригинальное изображение для сравнения
    const originalImageBuffer = await fs.promises.readFile(sourcePath);
    const originalImage = await sharp(originalImageBuffer).raw().toBuffer();
    
    // Применяем базовые искажения геометрии
    const sharpBuffer = await sharp(sourcePath)
      // Применяем микроскопическое размытие по Гауссу для изменения всех пикселей
      .blur(0.3)
      // Добавляем минимальное изменение контраста
      .linear(1.01, -1)
      .toBuffer();
    
    // Загружаем изображение в canvas для попиксельной обработки
    const img = new Image();
    img.src = sharpBuffer;
    
    // Создаем canvas размером с изображение
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    
    // Рисуем изображение на canvas
    ctx.drawImage(img, 0, 0);
    
    // Получаем данные изображения для попиксельной обработки
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    
    // Создаем новый буфер для измененного изображения с геометрическими искажениями
    const distortedData = ctx.createImageData(img.width, img.height);
    
    // Применяем микро-искажения к каждому пикселю
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        const idx = (y * img.width + x) * 4;
        
        // Искажаем координаты
        const distorted = applyMicroDistortion(x, y, img.width, img.height, params);
        
        // Вычисляем билинейную интерполяцию для получения значения пикселя
        const x1 = Math.floor(distorted.x);
        const y1 = Math.floor(distorted.y);
        const x2 = Math.min(x1 + 1, img.width - 1);
        const y2 = Math.min(y1 + 1, img.height - 1);
        
        const dx = distorted.x - x1;
        const dy = distorted.y - y1;
        
        const idx11 = (y1 * img.width + x1) * 4;
        const idx12 = (y1 * img.width + x2) * 4;
        const idx21 = (y2 * img.width + x1) * 4;
        const idx22 = (y2 * img.width + x2) * 4;
        
        // Интерполяция для каждого канала RGB
        for (let i = 0; i < 3; i++) {
          const val11 = imageData.data[idx11 + i];
          const val12 = imageData.data[idx12 + i];
          const val21 = imageData.data[idx21 + i];
          const val22 = imageData.data[idx22 + i];
          
          const val = Math.round(
            val11 * (1 - dx) * (1 - dy) +
            val12 * dx * (1 - dy) +
            val21 * (1 - dx) * dy +
            val22 * dx * dy
          );
          
          distortedData.data[idx + i] = val;
        }
        
        // Сохраняем альфа-канал
        distortedData.data[idx + 3] = imageData.data[idx + 3];
      }
    }
    
    // Принудительно изменяем все пиксели, которые могли остаться неизмененными
    forcePixelChanges(distortedData, originalImage, params);
    
    // Применяем измененные данные на canvas
    ctx.putImageData(distortedData, 0, 0);
    
    // Проверяем, действительно ли все пиксели изменились
    const verification = verifyAllPixelsChanged(originalImage, distortedData.data);
    
    // Если есть неизмененные пиксели, исправляем их принудительно
    if (verification.percentChanged < 100) {
      console.log(`Дополнительная коррекция: Изначально изменено ${verification.percentChanged.toFixed(2)}% пикселей`);
      
      // Второй проход принудительного изменения для оставшихся пикселей
      for (const pixelIndex of verification.unchangedIndices) {
        const idx = pixelIndex * 4;
        distortedData.data[idx] = (distortedData.data[idx] + 1) % 256;
        distortedData.data[idx + 1] = (distortedData.data[idx + 1] + 1) % 256;
        distortedData.data[idx + 2] = (distortedData.data[idx + 2] + 1) % 256;
      }
      
      // Снова применяем измененные данные
      ctx.putImageData(distortedData, 0, 0);
      
      // Перепроверяем
      const reverification = verifyAllPixelsChanged(originalImage, distortedData.data);
      console.log(`После коррекции: ${reverification.percentChanged.toFixed(2)}% пикселей изменено`);
    }
    
    // Получаем JPEG Buffer с высоким качеством
    const outputBuffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
    
    // Записываем финальный результат
    await sharp(outputBuffer)
      // Изменяем метаданные для еще большей уникальности
      .withMetadata({
        exif: {
          IFD0: {
            ImageDescription: `Generated at ${Date.now()}`,
            Copyright: `Protected ${new Date().toISOString()}`
          }
        }
      })
      .toFile(destinationPath);
    
    return true;
  } catch (error) {
    console.error(`Ошибка при обработке изображения ${sourcePath}:`, error);
    return false;
  }
}

/**
 * Получает список всех изображений в папке и подпапках
 */
async function getAllImages(directory) {
  let allImages = [];
  
  // Получаем список подпапок
  const persons = fs.readdirSync(directory)
    .filter(item => fs.statSync(path.join(directory, item)).isDirectory());
  
  console.log(`Найдено ${persons.length} папок с разными людьми`);
  
  // Обходим каждую подпапку и собираем из неё изображения
  for (const person of persons) {
    const personPath = path.join(directory, person);
    const files = fs.readdirSync(personPath);
    
    // Фильтруем только изображения
    const images = files.filter(file => {
      return validExtensions.includes(path.extname(file).toLowerCase());
    });
    
    console.log(`В папке ${person} найдено ${images.length} изображений`);
    
    // Добавляем каждое изображение в общий список
    for (const image of images) {
      allImages.push({
        path: path.join(personPath, image),
        person: person,
        fileName: image
      });
    }
  }
  
  return allImages;
}

/**
 * Основная функция обработки
 */
async function processAllImages() {
  try {
    // Получаем все изображения
    const allImages = await getAllImages(sourceFolder);
    
    if (allImages.length === 0) {
      console.error("Не найдено ни одного изображения в исходных папках.");
      process.exit(1);
    }
    
    console.log(`Всего найдено ${allImages.length} изображений. Начинаю создание 100% уникальных копий...`);
    
    // Сколько копий каждого изображения создавать
    const copiesPerImage = 5; // Можно изменить на нужное количество
    
    // Обрабатываем каждое изображение
    let processedCount = 0;
    for (const image of allImages) {
      // Создаем папку для человека
      const personOutputFolder = path.join(outputFolder, image.person);
      if (!fs.existsSync(personOutputFolder)) {
        fs.mkdirSync(personOutputFolder, { recursive: true });
      }
      
      // Создаем папку для изображения
      const imageBaseName = path.basename(image.fileName, path.extname(image.fileName));
      const imageOutputFolder = path.join(personOutputFolder, imageBaseName);
      if (!fs.existsSync(imageOutputFolder)) {
        fs.mkdirSync(imageOutputFolder, { recursive: true });
      }
      
      console.log(`Создаю ${copiesPerImage} 100% защищенных копий для ${image.person}/${image.fileName}...`);
      
      // Создаем заданное количество уникальных вариаций
      for (let i = 0; i < copiesPerImage; i++) {
        // Генерируем уникальный хеш с текущим временем для еще большей уникальности
        const uniqueHash = generateUniqueHash(`${image.path}_${i}_${Date.now()}_${Math.random()}`);
        
        // Генерируем параметры модификации на основе хеша
        const params = generateModificationParams(uniqueHash);
        
        // Формируем имя файла с номером копии
        const paddedNumber = (i + 1).toString().padStart(4, '0'); // 0001, 0002, ...
        const outputFileName = `${paddedNumber}${path.extname(image.fileName)}`;
        const outputPath = path.join(imageOutputFolder, outputFileName);
        
        // Создаем уникальную защищенную копию с проверкой 100% изменения пикселей
        await modifyImageWithFullCoverage(image.path, outputPath, params);
        
        // Выводим прогресс
        console.log(`  Прогресс: ${i + 1}/${copiesPerImage} копий создано (${Math.floor((i + 1) / copiesPerImage * 100)}%)`);
      }
      
      processedCount++;
      console.log(`Обработано ${processedCount}/${allImages.length} изображений (${Math.floor(processedCount / allImages.length * 100)}%)`);
    }
    
    console.log(`Готово! 100% уникальные копии созданы в: ${outputFolder}`);
    
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

// Запускаем обработку
processAllImages(); 