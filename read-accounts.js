const fs = require('fs');
const path = require('path');

const working = [];
const other = [];
const not_working = [];
try {
  const filePath = path.join(__dirname, 'core.accounts.json');

  if (!fs.existsSync(filePath)) {
    console.error('Файл core.accounts.json не найден');
    process.exit(1);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContent);

  console.log(`\nНайдено ${data.length} объектов в массиве:\n`);

  for (const item of data) {
    const dc = `dc${item.dcId}`;

    if (!item.banned) {
      working.push(`${item[dc]}:${item.dcId}`);
    } else {
      other.push(`${item[dc]}:${item.dcId}`);
    }
  }

  for (const item of other) {
    if (!working.includes(item)) {
      not_working.push(item);
    }
  }

  const uniqueNotWorking = [...new Set(not_working)];
  
  const resultPath = path.join(__dirname, 'not-working-accounts.txt');
  fs.writeFileSync(resultPath, JSON.stringify(uniqueNotWorking.join('\n'), null, 2), 'utf8');
  
  console.log(`Записано ${uniqueNotWorking.length} уникальных не работающих аккаунтов в файл: ${resultPath}`);
  
} catch (error) {
  console.error('Ошибка при чтении файла:', error.message);
  process.exit(1);
}
