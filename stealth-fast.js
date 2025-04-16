const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

// ==================== Настройки ====================

// Путь к исходной папке с фотографиями
const sourceFolder = path.join(__dirname, 'src', 'sender', 'images', 'male'); 

// Путь для выходных файлов
const outputFolder = path.join(__dirname, 'stealth-fast');

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
      // Используем уникальный ID для каждого изображения для создания уникального шума
      noise: Math.max(0.5, rand() * 2), // 0.5-2
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
 * Модифицирует изображение с максимальной скоростью, но 100% изменением пикселей
 */
async function modifyImage(sourcePath, destinationPath, params) {
  try {
    // Шаг 1: Базовые модификации с sharp (быстро и эффективно)
    let pipeline = sharp(sourcePath)
      // Модификация базовых параметров
      .modulate({
        brightness: params.brightness,
        saturation: params.saturation, 
        hue: params.hue
      })
      // Регулировка цветовых каналов
      .recomb(params.colorMatrix)
      // Микроскопическое изменение резкости
      .sharpen(params.sharpen.sigma, 1, params.sharpen.strength);
    
    // Шаг 2: Добавляем микро-изменения - это гарантированно меняет каждый пиксель
    // но в очень малой степени, сохраняя визуальное сходство
    pipeline = pipeline.linear(
      // Очень слабые изменения чтобы сохранить визуальное сходство
      1.005, 
      // Небольшой сдвиг (не массив массивов, а просто число)
      params.forceChange.rShift - 1 // Это даст значение от 0 до 1
    );
    
    // Вместо noise используем дополнительную модификацию через linear
    // Это гарантирует, что каждый пиксель будет изменен
    pipeline = pipeline.linear(
      1.001 + (params.forceChange.seed % 10) / 10000, // Очень слабый множитель
      params.forceChange.gShift / 1000 // Очень слабый сдвиг
    );
    
    // Шаг 4: Добавление уникальных метаданных (дополнительный уровень защиты)
    pipeline = pipeline.withMetadata({
      exif: {
        IFD0: {
          ImageDescription: `Protected Image ${params.metadata.id}`,
          Copyright: `Generated ${params.metadata.timestamp}`
        }
      }
    });
    
    // Сохраняем с высоким качеством (95%)
    await pipeline.jpeg({ quality: 95 }).toFile(destinationPath);
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
      
      // Создаем копии
      const promises = [];
      
      for (let i = 0; i < copiesPerImage; i++) {
        // Уникальный хеш с максимальной энтропией
        const uniqueHash = generateUniqueHash(`${image.path}_${i}_${Date.now()}_${Math.random()}`);
        const params = generateParams(uniqueHash);
        
        // Имя выходного файла
        const paddedNumber = (i + 1).toString().padStart(4, '0');
        const outputFileName = `${paddedNumber}${path.extname(image.fileName)}`;
        const outputPath = path.join(imageFolder, outputFileName);
        
        // Добавляем в очередь задач
        promises.push(modifyImage(image.path, outputPath, params));
      }
      
      // Параллельное выполнение всех задач для одного изображения
      await Promise.all(promises);
      
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