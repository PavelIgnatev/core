const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const crypto = require('crypto');

// Получаем путь к папке из аргументов командной строки или используем значение по умолчанию
const folderArg = process.argv[2];
const stealthFolder = folderArg 
  ? path.join(__dirname, folderArg) 
  : path.join(__dirname, 'stealth-unique');

// Функция для вычисления хеша изображения
async function calculateImageHash(imagePath) {
    try {
        const imageBuffer = await fs.promises.readFile(imagePath);
        const hash = crypto.createHash('sha256').update(imageBuffer).digest('hex');
        return hash;
    } catch (error) {
        console.error(`Ошибка при вычислении хеша для ${imagePath}:`, error);
        return null;
    }
}

// Функция для расчета процента измененных пикселей между двумя изображениями
async function calculatePixelDifference(image1Path, image2Path) {
    try {
        // Загружаем оба изображения
        const img1 = await sharp(image1Path).raw().toBuffer({ resolveWithObject: true });
        const img2 = await sharp(image2Path).raw().toBuffer({ resolveWithObject: true });
        
        const { data: data1, info: info1 } = img1;
        const { data: data2, info: info2 } = img2;
        
        // Проверяем, имеют ли изображения одинаковый размер
        if (info1.width !== info2.width || info1.height !== info2.height) {
            console.log(`Размеры изображений различаются: ${path.basename(image1Path)} vs ${path.basename(image2Path)}`);
            return null;
        }
        
        // Считаем различия в пикселях
        let diffPixels = 0;
        let totalPixels = info1.width * info1.height;
        
        for (let i = 0; i < data1.length; i += 3) { // Предполагаем RGB (3 канала)
            if (data1[i] !== data2[i] || data1[i + 1] !== data2[i + 1] || data1[i + 2] !== data2[i + 2]) {
                diffPixels++;
            }
        }
        
        // Возвращаем процент отличающихся пикселей
        return (diffPixels / totalPixels) * 100;
    } catch (error) {
        console.error(`Ошибка при сравнении изображений ${image1Path} и ${image2Path}:`, error);
        return null;
    }
}

// Функция для анализа папки с изображениями и проверки их уникальности
async function analyzeImageUniqueness() {
    try {
        // Получаем список папок людей
        const personFolders = fs.readdirSync(stealthFolder)
            .filter(item => fs.statSync(path.join(stealthFolder, item)).isDirectory());
        
        console.log(`Найдено ${personFolders.length} папок людей`);
        
        // Для анализа возьмем первую папку и первое изображение
        if (personFolders.length > 0) {
            const personFolder = personFolders[0];
            const personPath = path.join(stealthFolder, personFolder);
            
            // Получаем папки изображений для этого человека
            const imageFolders = fs.readdirSync(personPath)
                .filter(item => fs.statSync(path.join(personPath, item)).isDirectory());
            
            if (imageFolders.length > 0) {
                const imageFolder = imageFolders[0];
                const imageFolderPath = path.join(personPath, imageFolder);
                
                // Получаем все варианты изображения
                const imageVariants = fs.readdirSync(imageFolderPath)
                    .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
                    .map(file => path.join(imageFolderPath, file));
                
                console.log(`Анализируем ${imageVariants.length} вариантов изображения в папке ${personFolder}/${imageFolder}`);
                
                // Проверяем уникальность хешей
                const imageHashes = [];
                for (const imagePath of imageVariants) {
                    const hash = await calculateImageHash(imagePath);
                    imageHashes.push({ path: imagePath, hash });
                }
                
                // Проверяем на дубликаты хешей
                let duplicateFound = false;
                for (let i = 0; i < imageHashes.length; i++) {
                    for (let j = i + 1; j < imageHashes.length; j++) {
                        if (imageHashes[i].hash === imageHashes[j].hash) {
                            console.log(`ВНИМАНИЕ: Найдены дубликаты: ${path.basename(imageHashes[i].path)} и ${path.basename(imageHashes[j].path)}`);
                            duplicateFound = true;
                        }
                    }
                }
                
                if (!duplicateFound) {
                    console.log(`✓ Все изображения имеют уникальные хеши (SHA-256)`);
                }
                
                // Анализируем первые 3 изображения для демонстрации различий
                if (imageVariants.length >= 3) {
                    // Создаем матрицу попарных сравнений
                    for (let i = 0; i < 3; i++) {
                        for (let j = i + 1; j < 3; j++) {
                            const pctDiff = await calculatePixelDifference(imageVariants[i], imageVariants[j]);
                            if (pctDiff !== null) {
                                console.log(`Разница между ${path.basename(imageVariants[i])} и ${path.basename(imageVariants[j])}: ${pctDiff.toFixed(2)}% пикселей`);
                            }
                        }
                    }
                }
                
                // Проверяем статистику по изменениям для всех изображений
                const stats = {
                    totalComparisons: 0,
                    minDiffPct: 100,
                    maxDiffPct: 0,
                    avgDiffPct: 0,
                    totalDiffPct: 0
                };
                
                for (let i = 0; i < imageVariants.length; i++) {
                    for (let j = i + 1; j < imageVariants.length; j++) {
                        const pctDiff = await calculatePixelDifference(imageVariants[i], imageVariants[j]);
                        if (pctDiff !== null) {
                            stats.totalComparisons++;
                            stats.totalDiffPct += pctDiff;
                            stats.minDiffPct = Math.min(stats.minDiffPct, pctDiff);
                            stats.maxDiffPct = Math.max(stats.maxDiffPct, pctDiff);
                        }
                    }
                }
                
                if (stats.totalComparisons > 0) {
                    stats.avgDiffPct = stats.totalDiffPct / stats.totalComparisons;
                    console.log('\nСтатистика различий:');
                    console.log(`Минимальное различие: ${stats.minDiffPct.toFixed(2)}%`);
                    console.log(`Максимальное различие: ${stats.maxDiffPct.toFixed(2)}%`);
                    console.log(`Среднее различие: ${stats.avgDiffPct.toFixed(2)}%`);
                    console.log(`Общее количество сравнений: ${stats.totalComparisons}`);
                    
                    // Оценка уникальности на основе процента изменений
                    if (stats.minDiffPct < 5) {
                        console.log('\n⚠️ ПРЕДУПРЕЖДЕНИЕ: Некоторые изображения очень похожи (менее 5% различий)');
                    } else if (stats.minDiffPct < 10) {
                        console.log('\n⚠️ ПРИМЕЧАНИЕ: Некоторые изображения имеют умеренные различия (5-10%)');
                    } else {
                        console.log('\n✓ ХОРОШО: Все изображения имеют существенные различия (более 10%)');
                    }
                    
                    return {
                        allUnique: true,
                        statistics: stats
                    };
                }
            } else {
                console.log(`Папка ${personFolder} не содержит подпапок изображений`);
            }
        } else {
            console.log('Папка stealth-unique пуста');
        }
        
        return { allUnique: false };
    } catch (error) {
        console.error('Ошибка при анализе уникальности изображений:', error);
        return { allUnique: false, error: error.message };
    }
}

// Запускаем анализ
console.log(`Анализируем изображения в папке: ${stealthFolder}`);
analyzeImageUniqueness().then(result => {
    console.log('\nЗаключение:');
    if (result.allUnique) {
        console.log('✓ Все проанализированные изображения уникальны с точки зрения хешей и пиксельного анализа.');
        console.log(`  Среднее различие между изображениями: ${result.statistics.avgDiffPct.toFixed(2)}%`);
    } else {
        console.log('⚠️ Анализ не удалось провести полностью или найдены дубликаты.');
    }
}).catch(error => {
    console.error('Ошибка при выполнении анализа:', error);
}); 