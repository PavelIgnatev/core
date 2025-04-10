// Импортируем необходимые функции и библиотеки
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const countries = require('i18n-iso-countries');
const fs = require('fs');

// Регистрируем локаль для получения полных названий стран
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

// Читаем JSON файл с аккаунтами
const accounts = JSON.parse(fs.readFileSync('fucker.accounts.json', 'utf8'));

// Объект для группировки аккаунтов по странам
const groupedAccounts = {};

// Проходим по каждому аккаунту
accounts.forEach((account) => {
  // Получаем номер телефона из аккаунта
  const phoneNumber = account.phone;
  
  // Форматируем номер: если он не начинается с "+", добавляем его
  const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : '+' + phoneNumber;

  // Разбираем номер телефона
  const parsedNumber = parsePhoneNumberFromString(formattedNumber);

  let countryName;

  if (parsedNumber && parsedNumber.country) {
    // Получаем полное название страны по ISO-коду
    countryName = countries.getName(parsedNumber.country, 'en');
  } else {
    // Если определить страну не удалось, используем ключ "Unknown"
    countryName = 'Unknown';
  }

  // Если для страны ещё нет ключа в объекте, создаём массив
  if (!groupedAccounts[countryName]) {
    groupedAccounts[countryName] = [];
  }

  // Добавляем аккаунт в соответствующий массив
  groupedAccounts[countryName].push(account);
});

// Создаем объект с количеством аккаунтов для каждой страны
const countryCounts = {};

// Для каждой страны в объекте groupedAccounts получаем длину массива с аккаунтами
for (const country in groupedAccounts) {
  countryCounts[country] = groupedAccounts[country].length;
}

// Объект для хранения групп с более чем 5 аккаунтами
const largeGroups = {};
// Массив для хранения аккаунтов из малых групп (менее 5 аккаунтов)
const mixAccounts = [];

// Разделяем на большие группы и микс
for (const country in groupedAccounts) {
  if (groupedAccounts[country].length >= 5) {
    largeGroups[country] = groupedAccounts[country];
  } else {
    mixAccounts.push(...groupedAccounts[country]);
  }
}

// Вывод результатов в консоль
console.log("\nСтатистика по странам (5+ аккаунтов):");
for (const country in largeGroups) {
  console.log(`${country}: ${largeGroups[country].length} аккаунтов`);
}

console.log("\nМикс (страны с менее чем 5 аккаунтами):");
console.log(`Всего в миксе: ${mixAccounts.length} аккаунтов`);

// Если нужно вывести состав микса
const mixCountries = {};
mixAccounts.forEach(account => {
  const phoneNumber = account.phone;
  const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : '+' + phoneNumber;
  const parsedNumber = parsePhoneNumberFromString(formattedNumber);
  
  let countryName;
  if (parsedNumber && parsedNumber.country) {
    countryName = countries.getName(parsedNumber.country, 'en');
  } else {
    countryName = 'Unknown';
  }
  
  if (!mixCountries[countryName]) {
    mixCountries[countryName] = 0;
  }
  mixCountries[countryName]++;
});

console.log("Состав микса по странам:");
for (const country in mixCountries) {
  console.log(`  ${country}: ${mixCountries[country]} аккаунтов`);
}

// Вывод общего количества аккаунтов
const totalAccounts = accounts.length;
console.log(`\nВсего аккаунтов: ${totalAccounts}`);