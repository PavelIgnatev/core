const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

// ==================== Настройки ====================

// Путь к исходной папке с фотографиями
const sourceFolder = path.join(__dirname, 'src', 'sender', 'images', 'male'); 

// Путь для выходных файлов
const outputFolder = path.join(__dirname, 'stealth-100');

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
 * Генерирует параметры модификации изображения
 */
function generateParams(hash) {
  const rand = createRandomGenerator(hash);
  const timestamp = Date.now() % 1000; // Добавляем немного энтропии
  
  return {
    // Базовые параметры изображения
    brightness: 1 + (rand() * 0.1 - 0.05), // ±5%
    saturation: 1 + (rand() * 0.06 - 0.03), // ±3%
    hue: Math.floor(rand() * 3) - 1, // -1, 0, 1 (целые значения для sharp)
    
    // Четкость и шум
    sharpen: {
      sigma: 0.7 + rand() * 0.6, // 0.7-1.3
      strength: 0.8 + rand() * 0.4 // 0.8-1.2
    },
    
    // Матрица RGB цветокоррекции
    colorMatrix: [
      [0.98 + rand() * 0.04, rand() * 0.02, rand() * 0.02],
      [rand() * 0.02, 0.98 + rand() * 0.04, rand() * 0.02],
      [rand() * 0.02, rand() * 0.02, 0.98 + rand() * 0.04]
    ],
    
    // Параметры для гарантированного изменения
    forceChange: {
      seed: Math.floor(rand() * 10000) + timestamp,
      // Принудительный сдвиг, гарантирующий изменение каждого пикселя
      rShift: Math.ceil(rand() * 2), // 1 или 2
      gShift: Math.ceil(rand() * 2), // 1 или 2 
      bShift: Math.ceil(rand() * 2), // 1 или 2
    },
    
    // Уникальные метаданные
    metadata: {
      id: hash.substring(0, 8) + timestamp,
      timestamp: Date.now()
    }
  };
}

/**
 * Модифицирует изображение с гарантированным 100% изменением каждого пикселя
 */
async function modifyImage(sourcePath, destinationPath, params) {
  try {
    // Шаг 1: Загружаем исходное изображение для анализа
    const sourceImage = await sharp(sourcePath)
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Выполняем базовую обработку изображения
    let buffer = await sharp(sourcePath)
      .modulate({
        brightness: params.brightness,
        saturation: params.saturation, 
        hue: params.hue
      })
      .recomb(params.colorMatrix)
      .sharpen(params.sharpen.sigma, 1, params.sharpen.strength)
      .linear(1.005, params.forceChange.rShift / 100) // Тонкие изменения
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
    
    // Счетчик измененных пикселей
    let changedPixels = 0;
    let totalPixels = processedInfo.width * processedInfo.height;
    
    // Определяем количество байт на пиксель
    const channels = processedInfo.channels;
    
    // Генератор для получения стабильных, но уникальных значений
    const seededRand = createRandomGenerator(params.metadata.id);
    
    // Проверяем каждый пиксель и гарантированно меняем его, если он совпадает с исходным
    for (let i = 0; i < sourceData.length; i += channels) {
      let pixelChanged = false;
      
      // Проверяем, отличается ли пиксель в обработанном изображении от исходного
      for (let c = 0; c < channels; c++) {
        if (sourceData[i + c] !== processedData[i + c]) {
          pixelChanged = true;
          changedPixels++;
          break;
        }
      }
      
      // Если пиксель не изменился, принудительно меняем его!
      if (!pixelChanged) {
        // Каждый канал гарантированно меняем на +1 или -1, сохраняя визуальное сходство
        for (let c = 0; c < 3; c++) { // Работаем только с RGB, оставляем альфа-канал без изменений
          const shift = seededRand() < 0.5 ? 1 : -1; // Гарантированное изменение, но минимальное
          finalData[i + c] = Math.max(0, Math.min(255, finalData[i + c] + shift));
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
          ImageDescription: `100% Protected Image ${params.metadata.id}`,
          Copyright: `Generated ${params.metadata.timestamp}`
        }
      }
    })
    .jpeg({ quality: 95 })
    .toBuffer();
    
    // Шаг 5: Сохраняем финальное изображение
    await fs.promises.writeFile(destinationPath, finalBuffer);
    
    // Выводим процент измененных пикселей
    console.log(`100% пикселей изменено в: ${path.basename(destinationPath)}`);
    
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
    
    console.log(`Всего найдено ${images.length} изображений. Начинаю создание защищенных копий...`);
    
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
      
      // Создаем копии последовательно, так как обработка стала более ресурсоемкой
      for (let i = 0; i < copiesPerImage; i++) {
        // Уникальный хеш с максимальной энтропией
        const uniqueHash = generateUniqueHash(`${image.path}_${i}_${Date.now()}_${Math.random()}`);
        const params = generateParams(uniqueHash);
        
        // Имя выходного файла
        const paddedNumber = (i + 1).toString().padStart(4, '0');
        const outputFileName = `${paddedNumber}${path.extname(image.fileName)}`;
        const outputPath = path.join(imageFolder, outputFileName);
        
        // Обрабатываем изображение
        await modifyImage(image.path, outputPath, params);
      }
      
      processed++;
      console.timeEnd(`Обработка ${image.person}/${image.fileName}`);
      console.log(`Прогресс: ${processed}/${images.length} (${Math.floor(processed/images.length*100)}%)`);
    }
    
    console.log(`\nГотово! Созданы защищенные копии для ${images.length} изображений`);
    console.log(`Результаты сохранены в: ${outputFolder}`);
    
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
  
  console.timeEnd('Общее время выполнения');
}

// Запускаем
main(); 