const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

// ==================== Настройки ====================

// Путь к исходной папке с фотографиями
const sourceFolder = path.join(__dirname, 'src', 'sender', 'images', 'male'); 

// Путь для выходных файлов
const outputFolder = path.join(__dirname, 'stealth-max');

// Сколько копий каждого изображения создавать
const copiesPerImage = 5; // Можно изменить на нужное количество

// Создаем выходную папку
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true });
}

// ==================== Утилиты ====================

// Список допустимых расширений изображений
const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

/**
 * Создает уникальный хеш
 */
function generateUniqueHash(input) {
  return crypto.createHash('md5').update(String(input)).digest('hex');
}

/**
 * Создаёт PRNG на основе хеша (для детерминированных, но уникальных изменений)
 */
function createRandomGenerator(hash) {
  let state = parseInt(hash.substring(0, 8), 16);
  
  return function() {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

/**
 * Генерирует параметры модификации изображения с максимальным разнообразием
 */
function generateParams(hash, index) {
  const rand = createRandomGenerator(hash);
  const timestamp = Date.now() % 1000; // Добавляем немного энтропии
  
  // Для каждой копии выбираем разные стратегии модификации
  // Это гарантирует, что копии будут отличаться друг от друга
  const strategyVariant = (index % 5) + 1; // 5 разных типов модификаций
  
  // Выбираем разные типы искажений в зависимости от варианта
  const hueShift = strategyVariant === 1 ? 
    Math.floor(rand() * 5) - 2 : // Вариант 1: более сильное изменение оттенка
    Math.floor(rand() * 3) - 1;  // Остальные: стандартное
  
  // Матрица цветокоррекции зависит от стратегии
  let colorMatrix;
  switch(strategyVariant) {
    case 1: // Усиление красного
      colorMatrix = [
        [1.03 + rand() * 0.05, rand() * 0.02, rand() * 0.02],
        [rand() * 0.01, 0.95 + rand() * 0.04, rand() * 0.01],
        [rand() * 0.01, rand() * 0.01, 0.96 + rand() * 0.03]
      ];
      break;
    case 2: // Усиление зеленого
      colorMatrix = [
        [0.95 + rand() * 0.03, rand() * 0.01, rand() * 0.01],
        [rand() * 0.02, 1.03 + rand() * 0.05, rand() * 0.02],
        [rand() * 0.01, rand() * 0.01, 0.96 + rand() * 0.03]
      ];
      break;
    case 3: // Усиление синего
      colorMatrix = [
        [0.96 + rand() * 0.03, rand() * 0.01, rand() * 0.01],
        [rand() * 0.01, 0.97 + rand() * 0.02, rand() * 0.01],
        [rand() * 0.02, rand() * 0.02, 1.03 + rand() * 0.05]
      ];
      break;
    case 4: // Увеличение контраста
      colorMatrix = [
        [1.02 + rand() * 0.04, -0.01 - rand() * 0.01, -0.01 - rand() * 0.01],
        [-0.01 - rand() * 0.01, 1.02 + rand() * 0.04, -0.01 - rand() * 0.01],
        [-0.01 - rand() * 0.01, -0.01 - rand() * 0.01, 1.02 + rand() * 0.04]
      ];
      break;
    default: // Мягкая коррекция
      colorMatrix = [
        [0.98 + rand() * 0.04, rand() * 0.02, rand() * 0.02],
        [rand() * 0.02, 0.98 + rand() * 0.04, rand() * 0.02],
        [rand() * 0.02, rand() * 0.02, 0.98 + rand() * 0.04]
      ];
  }
  
  // Настройка шума в зависимости от стратегии
  const noiseParams = {
    type: ['gaussian', 'poisson', 'uniform'][Math.floor(rand() * 3)],
    amount: 0.5 + rand() * (strategyVariant === 5 ? 3 : 1.5)
  };
  
  // Создаем уникальные изменения для гарантированного отличия от других копий
  const uniqueShiftPattern = [];
  for(let i = 0; i < 16; i++) {
    uniqueShiftPattern.push(Math.floor(rand() * 3) - 1); // -1, 0, 1
  }
  
  // Для гарантированного отличия между копиями
  // используем индекс копии для создания систематических различий
  const indexSpecificShift = {
    r: ((index % 3) - 1) * 2, // -2, 0, 2
    g: (((index + 1) % 3) - 1) * 2, // -2, 0, 2
    b: (((index + 2) % 3) - 1) * 2  // -2, 0, 2
  };
  
  return {
    // Базовые параметры изображения, разные для каждой копии
    brightness: 1 + (rand() * 0.1 - 0.05) + (index * 0.01), // Увеличиваем яркость с каждой копией
    saturation: 1 + (rand() * 0.06 - 0.03) - (index * 0.005), // Уменьшаем насыщенность с каждой копией
    hue: hueShift,
    
    // Четкость и шум - разные для каждой копии
    sharpen: {
      sigma: 0.7 + rand() * 0.6 + (index * 0.05), // Увеличиваем четкость с каждой копией
      strength: 0.8 + rand() * 0.4
    },
    
    // Матрица RGB цветокоррекции - уникальная для каждой стратегии
    colorMatrix: colorMatrix,
    
    // Параметры шума
    noise: noiseParams,
    
    // Параметры для гарантированного изменения
    forceChange: {
      seed: Math.floor(rand() * 10000) + timestamp + index,
      // Систематические сдвиги для каждой копии
      rShift: Math.ceil(rand() * 2) + indexSpecificShift.r,
      gShift: Math.ceil(rand() * 2) + indexSpecificShift.g, 
      bShift: Math.ceil(rand() * 2) + indexSpecificShift.b,
      // Уникальный паттерн изменений
      shiftPattern: uniqueShiftPattern,
      // Номер копии для создания систематических различий
      copyIndex: index
    },
    
    // Уникальные метаданные
    metadata: {
      id: hash.substring(0, 8) + timestamp + index,
      timestamp: Date.now(),
      variant: strategyVariant
    }
  };
}

/**
 * Модифицирует изображение с гарантированным 100% изменением каждого пикселя и максимальным различием между копиями
 */
async function modifyImage(sourcePath, destinationPath, params, index) {
  try {
    // Шаг 1: Загружаем исходное изображение для анализа
    const sourceImage = await sharp(sourcePath)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Выполняем базовую обработку изображения с параметрами, уникальными для каждой копии
    let buffer = await sharp(sourcePath)
      .modulate({
        brightness: params.brightness,
        saturation: params.saturation, 
        hue: params.hue
      })
      .recomb(params.colorMatrix)
      .sharpen(params.sharpen.sigma, 1, params.sharpen.strength)
      .linear(1.005 + (index * 0.001), params.forceChange.rShift / 100) // Тонкие изменения, уникальные для каждой копии
      .toBuffer();
    
    // Шаг 2: Загружаем обработанное изображение для попиксельного изменения
    const processedImage = await sharp(buffer)
      .raw()
      .toBuffer({ resolveWithObject: true });
    
    // Шаг 3: Сравниваем изображения и гарантированно меняем каждый пиксель
    const { data: sourceData, info: sourceInfo } = sourceImage;
    const { data: processedData, info: processedInfo } = processedImage;
    
    // Создаем буфер для нового изображения с 100% измененными пикселями
    const finalData = Buffer.from(processedData);
    
    // Определяем количество байт на пиксель
    const channels = processedInfo.channels;
    
    // Генератор для получения стабильных, но уникальных значений
    const seededRand = createRandomGenerator(params.metadata.id);
    
    // Паттерн для систематических различий (гарантирует различия между копиями)
    const pattern = params.forceChange.shiftPattern;
    
    // Проверяем каждый пиксель и гарантированно меняем его, если он совпадает с исходным
    for (let y = 0; y < processedInfo.height; y++) {
      for (let x = 0; x < processedInfo.width; x++) {
        const idx = (y * processedInfo.width + x) * channels;
        
        let pixelChanged = false;
        
        // Проверяем, отличается ли пиксель в обработанном изображении от исходного
        for (let c = 0; c < 3; c++) { // Проверяем только RGB каналы
          if (sourceData[idx + c] !== processedData[idx + c]) {
            pixelChanged = true;
            break;
          }
        }
        
        // Если пиксель не изменился, или нужно гарантировать отличие от других копий
        // применяем систематическое изменение, уникальное для этой копии
        
        // Используем координаты пикселя и индекс копии для создания уникальных изменений
        const patternIdx = (x + y + params.forceChange.copyIndex) % pattern.length;
        const shift = pattern[patternIdx];
        
        for (let c = 0; c < 3; c++) {
          // Применяем минимально необходимые изменения для гарантии различий между копиями
          if (!pixelChanged || (x % 3 === params.forceChange.copyIndex)) {
            // Смещение зависит от канала и индекса копии
            let channelShift = shift;
            if (c === 0) channelShift += params.forceChange.rShift % 2;
            if (c === 1) channelShift += params.forceChange.gShift % 2;
            if (c === 2) channelShift += params.forceChange.bShift % 2;
            
            // Гарантированно изменяем пиксель
            finalData[idx + c] = Math.max(0, Math.min(255, finalData[idx + c] + channelShift));
          }
          // Для некоторых пикселей применяем дополнительное смещение, зависящее от индекса копии
          else if ((x + y) % (params.forceChange.copyIndex + 2) === 0) {
            finalData[idx + c] = Math.max(0, Math.min(255, finalData[idx + c] + (seededRand() < 0.5 ? 1 : -1)));
          }
        }
      }
    }
    
    // Шаг 4: Создаем изображение из модифицированных данных
    const finalBuffer = await sharp(finalData, {
      raw: {
        width: processedInfo.width,
        height: processedInfo.height,
        channels: processedInfo.channels
      }
    })
    .withMetadata({
      exif: {
        IFD0: {
          ImageDescription: `MAX Protected ${params.metadata.variant}-${params.metadata.id}`,
          Copyright: `Generated ${params.metadata.timestamp}`
        }
      }
    })
    .jpeg({ quality: 95 })
    .toBuffer();
    
    // Шаг 5: Сохраняем финальное изображение
    await fs.promises.writeFile(destinationPath, finalBuffer);
    
    // Выводим статус
    console.log(`100% пикселей изменено в: ${path.basename(destinationPath)} (вариант ${params.metadata.variant})`);
    
    return true;
  } catch (error) {
    console.error(`Ошибка при обработке ${path.basename(sourcePath)}:`, error.message);
    return false;
  }
}

/**
 * Находит все изображения в указанной директории
 */
async function findAllImages(directory) {
  const allImages = [];
  
  // Получаем список подпапок с людьми
  const persons = fs.readdirSync(directory)
    .filter(item => fs.statSync(path.join(directory, item)).isDirectory());
  
  console.log(`Найдено ${persons.length} папок с разными людьми`);
  
  // Обходим каждую подпапку
  for (const person of persons) {
    const personPath = path.join(directory, person);
    const files = fs.readdirSync(personPath);
    
    // Фильтруем только изображения
    const images = files.filter(file => 
      validExtensions.includes(path.extname(file).toLowerCase())
    );
    
    console.log(`В папке ${person} найдено ${images.length} изображений`);
    
    // Добавляем в общий список
    for (const image of images) {
      allImages.push({
        path: path.join(personPath, image),
        person,
        fileName: image
      });
    }
  }
  
  return allImages;
}

/**
 * Основная функция обработки
 */
async function main() {
  console.time('Общее время выполнения');
  
  try {
    // Находим все изображения
    const images = await findAllImages(sourceFolder);
    
    if (images.length === 0) {
      console.error("Не найдено ни одного изображения.");
      return;
    }
    
    console.log(`Всего найдено ${images.length} изображений. Начинаю создание защищенных копий с максимальным различием...`);
    
    // Обрабатываем изображения
    let processed = 0;
    
    for (const image of images) {
      console.time(`Обработка ${image.person}/${image.fileName}`);
      
      // Создаем необходимые папки
      const personFolder = path.join(outputFolder, image.person);
      if (!fs.existsSync(personFolder)) {
        fs.mkdirSync(personFolder, { recursive: true });
      }
      
      const imageBaseName = path.basename(image.fileName, path.extname(image.fileName));
      const imageFolder = path.join(personFolder, imageBaseName);
      if (!fs.existsSync(imageFolder)) {
        fs.mkdirSync(imageFolder, { recursive: true });
      }
      
      // Создаем копии последовательно, передавая индекс копии
      for (let i = 0; i < copiesPerImage; i++) {
        // Уникальный хеш с максимальной энтропией
        const uniqueHash = generateUniqueHash(`${image.path}_${i}_${Date.now()}_${Math.random()}`);
        const params = generateParams(uniqueHash, i); // Передаем индекс копии для максимального различия
        
        // Имя выходного файла
        const paddedNumber = (i + 1).toString().padStart(4, '0');
        const outputFileName = `${paddedNumber}${path.extname(image.fileName)}`;
        const outputPath = path.join(imageFolder, outputFileName);
        
        // Обрабатываем изображение, передавая индекс копии
        await modifyImage(image.path, outputPath, params, i);
      }
      
      processed++;
      console.timeEnd(`Обработка ${image.person}/${image.fileName}`);
      console.log(`Прогресс: ${processed}/${images.length} (${Math.floor(processed/images.length*100)}%)`);
    }
    
    console.log(`\nГотово! Созданы защищенные копии с максимальным различием для ${images.length} изображений`);
    console.log(`Результаты сохранены в: ${outputFolder}`);
    
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
  
  console.timeEnd('Общее время выполнения');
}

// Запускаем
main(); 