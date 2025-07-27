const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { withRetry } = require('./retry-utils.js');

const AUTH_DIR = './auth';
const CREDENTIALS_PATH = path.join(AUTH_DIR, 'credentials.json');
const TOKEN_PATH = path.join(AUTH_DIR, 'token.json');

async function initializeAuth() {
  try {
    if (!fs.existsSync(CREDENTIALS_PATH)) {
      console.log('❌ Файл auth/credentials.json не найден');
      return null;
    }

    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    const { client_secret, client_id } = credentials.installed;
    const auth = new google.auth.OAuth2(client_id, client_secret);

    if (!fs.existsSync(TOKEN_PATH)) {
      console.log('❌ Токен не найден в auth/token.json');
      return { auth, needsAuth: true };
    }

    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));
    auth.setCredentials(token);
    await refreshTokenAndSave(auth);

    return { auth, needsAuth: false };
  } catch (error) {
    console.error('❌ Ошибка авторизации:', error.message);
    return null;
  }
}

async function refreshTokenAndSave(auth) {
  try {
    const currentToken = JSON.parse(fs.readFileSync(TOKEN_PATH));
    const { credentials: newCredentials } = await auth.refreshAccessToken();

    const tokenToSave = {
      access_token: newCredentials.access_token,
      refresh_token: newCredentials.refresh_token || currentToken.refresh_token,
    };

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokenToSave, null, 2));
    auth.setCredentials(newCredentials);
  } catch (error) {
    console.error('❌ Ошибка обновления токена:', error.message);
    if (error.message.includes('invalid_grant')) {
      throw error;
    }
  }
}

async function createSpreadsheet(auth, title) {
  const sheets = google.sheets({ version: 'v4', auth });
  const maxRetries = 30;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
  const response = await sheets.spreadsheets.create({
    requestBody: { properties: { title } },
  });
  return response.data.spreadsheetId;
    } catch (error) {
      if (retryCount < maxRetries - 1) {
        retryCount++;
        console.log(`⚠️ Ошибка API: ${error.message}, ожидание 5 секунд... (попытка ${retryCount}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        throw error;
      }
    }
  }
}

async function getTableData(auth, spreadsheetId, range = 'A:Z') {
  const sheets = google.sheets({ version: 'v4', auth });
  const maxRetries = 30;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return response.data.values || [];
    } catch (error) {
      if (retryCount < maxRetries - 1) {
        retryCount++;
        console.log(`⚠️ Ошибка API: ${error.message}, ожидание 5 секунд... (попытка ${retryCount}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        throw error;
      }
    }
  }
}

async function insertRowsAtPosition(auth, spreadsheetId, position, rows, sheetId = 0) {
  const sheets = google.sheets({ version: 'v4', auth });
  
  const maxRetries = 30;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          insertDimension: {
            range: {
              sheetId: sheetId,
              dimension: 'ROWS',
              startIndex: position,
              endIndex: position + rows.length,
            },
            inheritFromBefore: false,
          },
        },
            {
              updateCells: {
                range: {
                  sheetId: sheetId,
                  startRowIndex: position,
                  endRowIndex: position + rows.length,
                  startColumnIndex: 0,
                  endColumnIndex: 9,
                },
                rows: rows.map(row => ({
                  values: row.map(cell => ({ userEnteredValue: { stringValue: cell.toString() } }))
                })),
                fields: 'userEnteredValue',
              },
            },
      ],
    },
  });

      return;
    } catch (error) {
      if (retryCount < maxRetries - 1) {
        retryCount++;
        console.log(`⚠️ Ошибка API: ${error.message}, ожидание 5 секунд... (попытка ${retryCount}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        throw error;
      }
    }
  }
}

async function formatHeaders(auth, spreadsheetId, startPosition, headerCount, sheetId = 0) {
  const sheets = google.sheets({ version: 'v4', auth });
  const requests = [];
  
  for (let i = 0; i < headerCount; i++) {
    requests.push({
      mergeCells: {
        range: {
          sheetId: sheetId,
          startRowIndex: startPosition + i,
          endRowIndex: startPosition + i + 1,
          startColumnIndex: 0,
          endColumnIndex: 9,
        },
        mergeType: 'MERGE_ALL',
      },
    });
  }
  
  if (requests.length > 0) {
    const maxRetries = 30;
    let retryCount = 0;
    
    while (retryCount < maxRetries) {
      try {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests },
        });
        return;
      } catch (error) {
        if (retryCount < maxRetries - 1) {
          retryCount++;
          console.log(`⚠️ Ошибка API: ${error.message}, ожидание 5 секунд... (попытка ${retryCount}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, 5000));
        } else {
          throw error;
        }
      }
    }
  }
}

async function makePublic(auth, spreadsheetId) {
  const drive = google.drive({ version: 'v3', auth });
  const maxRetries = 30;
  let retryCount = 0;
  
  while (retryCount < maxRetries) {
    try {
      await drive.permissions.create({
        fileId: spreadsheetId,
        requestBody: { role: 'reader', type: 'anyone' },
      });
      return;
    } catch (error) {
      if (retryCount < maxRetries - 1) {
        retryCount++;
        console.log(`⚠️ Ошибка API: ${error.message}, ожидание 5 секунд... (попытка ${retryCount}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        throw error;
      }
    }
  }
}

function getSpreadsheetLink(spreadsheetId) {
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?usp=sharing`;
}

async function createClientTable(title) {
  try {
    const authResult = await initializeAuth();
    if (!authResult || authResult.needsAuth) {
      console.log('❌ Требуется авторизация');
      return null;
    }

    const { auth } = authResult;
    const spreadsheetId = await createSpreadsheet(auth, title);
    await makePublic(auth, spreadsheetId);
    const link = getSpreadsheetLink(spreadsheetId);

    console.log(`✅ Таблица создана: ${title}`);
    console.log(`🔗 Ссылка: ${link}`);

    return { spreadsheetId, title, link };
  } catch (error) {
    console.error('❌ Ошибка создания таблицы:', error.message);
    return null;
  }
}

async function getOrCreateMonthSheet(auth, spreadsheetId, year, month) {
  const sheets = google.sheets({ version: 'v4', auth });
  const monthName = getMonthName(month);
  const sheetTitle = `${monthName} ${year}`;
  
  try {
    // Получаем список всех листов
    const response = await withRetry(async () => {
      return await sheets.spreadsheets.get({ spreadsheetId });
    });
    
    const existingSheets = response.data.sheets;
    const existingSheet = existingSheets.find(sheet => 
      sheet.properties.title === sheetTitle
    );
    
    if (existingSheet) {
      console.log(`✅ Лист "${sheetTitle}" уже существует`);
      return existingSheet.properties.sheetId;
    }
    
    // Проверяем, не является ли главный лист уже этим месяцем
    const mainSheet = existingSheets.find(sheet => sheet.properties.index === 0);
    if (mainSheet && mainSheet.properties.title === sheetTitle) {
      console.log(`✅ Главный лист уже содержит "${sheetTitle}"`);
      return mainSheet.properties.sheetId;
    }
    
    // Создаем новый лист в позиции 1 (после главного листа)
    console.log(`🆕 Создаем лист "${sheetTitle}" в позиции 1`);
    const createResponse = await withRetry(async () => {
      return await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            addSheet: {
              properties: {
                title: sheetTitle,
                gridProperties: {
                  rowCount: 1000,
                  columnCount: 9
                },
                index: 1 // Вставляем после главного листа
              }
            }
          }]
        }
      });
    });
    
    const newSheetId = createResponse.data.replies[0].addSheet.properties.sheetId;
    console.log(`✅ Лист "${sheetTitle}" создан с ID: ${newSheetId}`);
    
    // Удаляем пустой Лист1 если он существует
    await deleteEmptyMainSheet(auth, spreadsheetId);
    
    // Теперь нужно переместить все листы в правильном порядке
    await reorderSheetsByDate(auth, spreadsheetId);
    
    return newSheetId;
    
  } catch (error) {
    console.error(`❌ Ошибка создания листа "${sheetTitle}":`, error.message);
    throw error;
  }
}

async function reorderSheetsByDate(auth, spreadsheetId) {
  const sheets = google.sheets({ version: 'v4', auth });
  
  try {
    // Получаем список всех листов
    const response = await withRetry(async () => {
      return await sheets.spreadsheets.get({ spreadsheetId });
    });
    
    const allSheets = response.data.sheets;
    
    // Фильтруем только месячные листы (исключаем главный лист)
    const monthSheets = allSheets.filter(sheet => {
      const title = sheet.properties.title;
      return sheet.properties.index !== 0 && /^[А-Яа-я]+ \d{4}$/.test(title);
    });
    
    if (monthSheets.length <= 1) {
      return; // Нечего сортировать
    }
    
    // Сортируем по дате (новые сначала)
    monthSheets.sort((a, b) => {
      const dateA = parseSheetDate(a.properties.title);
      const dateB = parseSheetDate(b.properties.title);
      return dateB - dateA; // Обратная сортировка
    });
    
    // Создаем запросы на перемещение листов
    const requests = [];
    let targetIndex = 1; // Начинаем после главного листа
    
    for (const sheet of monthSheets) {
      if (sheet.properties.index !== targetIndex) {
              requests.push({
        updateSheetProperties: {
          properties: {
            sheetId: sheet.properties.sheetId,
            index: targetIndex
          },
          fields: 'index'
        }
      });
      }
      targetIndex++;
    }
    
    if (requests.length > 0) {
      console.log(`🔄 Переупорядочиваем ${requests.length} листов...`);
      await withRetry(async () => {
        return await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: { requests }
        });
      });
      console.log('✅ Листы переупорядочены');
    }
    
  } catch (error) {
    console.error('❌ Ошибка переупорядочивания листов:', error.message);
  }
}

function parseSheetDate(sheetTitle) {
  const monthMap = {
    'Январь': 0, 'Февраль': 1, 'Март': 2, 'Апрель': 3, 'Май': 4, 'Июнь': 5,
    'Июль': 6, 'Август': 7, 'Сентябрь': 8, 'Октябрь': 9, 'Ноябрь': 10, 'Декабрь': 11
  };
  
  const match = sheetTitle.match(/^([А-Яа-я]+) (\d{4})$/);
  if (match) {
    const monthName = match[1];
    const year = parseInt(match[2]);
    const month = monthMap[monthName];
    if (month !== undefined) {
      return new Date(year, month, 1).getTime();
    }
  }
  return 0;
}

async function deleteEmptyMainSheet(auth, spreadsheetId) {
  const sheets = google.sheets({ version: 'v4', auth });
  
  try {
    // Получаем список всех листов
    const response = await withRetry(async () => {
      return await sheets.spreadsheets.get({ spreadsheetId });
    });
    
    const allSheets = response.data.sheets;
    
    // Ищем главный лист (нулевой лист)
    const mainSheet = allSheets.find(sheet => sheet.properties.index === 0);
    
    if (mainSheet) {
      // Проверяем, пустой ли он
      const data = await getTableData(auth, spreadsheetId, `${mainSheet.properties.title}!A:Z`);
      const isEmpty = data.length === 0 || (data.length === 1 && (!data[0] || data[0].every(cell => !cell)));
      
      if (isEmpty) {
        console.log(`🗑️ Удаляем пустой главный лист "${mainSheet.properties.title}"`);
        await withRetry(async () => {
          return await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
              requests: [{
                deleteSheet: {
                  sheetId: mainSheet.properties.sheetId
                }
              }]
            }
          });
        });
        console.log(`✅ Пустой главный лист "${mainSheet.properties.title}" удален`);
      }
    }
    
  } catch (error) {
    console.error('❌ Ошибка удаления пустого листа:', error.message);
  }
}

function getDateComponents(date) {
  const dayFormatted = date.toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric', 
    month: 'long',
    day: 'numeric',
  }).toUpperCase();
  
  const yearFormatted = date.getFullYear().toString();
  
  const monthFormatted = date.toLocaleDateString('ru-RU', {
    month: 'long',
  }).toUpperCase();
  
  const weekFormatted = getWeekInMonth(date);
  
  return { dayFormatted, yearFormatted, monthFormatted, weekFormatted };
}

function getWeekInMonth(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  
  let start = new Date(date);
  let end = new Date(date);
  
  // Ищем ближайший понедельник в прошлом (может быть в предыдущем месяце)
  while (start.getDay() !== 1) {
    start.setDate(start.getDate() - 1);
  }
  
  // Ищем ближайшее воскресенье в будущем (может быть в следующем месяце)
  while (end.getDay() !== 0) {
    end.setDate(end.getDate() + 1);
  }
  
  // Обрезаем до границ месяца
  if (start < monthStart) {
    start = monthStart;
  }
  if (end > monthEnd) {
    end = monthEnd;
  }
  
  return `${start.toLocaleDateString('ru-RU')} - ${end.toLocaleDateString('ru-RU')}`;
}

function findYear(data, yearText) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] && data[i][0] === yearText) {
      return i;
    }
  }
  return -1;
}

function findMonth(data, monthText, yearPosition) {
  for (let i = yearPosition + 1; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;
    
    const text = data[i][0];
    
    if (isYear(text)) break;
    
    if (text === monthText) return i;
  }
  return -1;
}

function findWeek(data, weekText, monthPosition) {
  for (let i = monthPosition + 1; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;
    
    const text = data[i][0];
    
    if (isMonth(text)) break;
    
    if (text === weekText) return i;
  }
  return -1;
}

function findDay(data, dayText, weekPosition) {
  for (let i = weekPosition + 1; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;
    
    const text = data[i][0];
    
    if (isMonth(text) || isWeek(text)) break;
    
    if (text === dayText) return i;
  }
  return -1;
}

function isYear(text) {
  return text && /^\d{4}$/.test(text);
}

function isMonth(text) {
  if (!text) return false;
  const months = ['ЯНВАРЬ', 'ФЕВРАЛЬ', 'МАРТ', 'АПРЕЛЬ', 'МАЙ', 'ИЮНЬ', 'ИЮЛЬ', 'АВГУСТ', 'СЕНТЯБРЬ', 'ОКТЯБРЬ', 'НОЯБРЬ', 'ДЕКАБРЬ'];
  return months.some(month => text === month) && 
         !text.includes('НЕДЕЛЯ') && !text.includes('ПОНЕДЕЛЬНИК') && !text.includes('ВТОРНИК') && 
         !text.includes('СРЕДА') && !text.includes('ЧЕТВЕРГ') && !text.includes('ПЯТНИЦА') && 
         !text.includes('СУББОТА') && !text.includes('ВОСКРЕСЕНЬЕ');
}

function isWeek(text) {
  return text && /\d{1,2}\.\d{1,2}\.\d{4} - \d{1,2}\.\d{1,2}\.\d{4}/.test(text);
}

function isDay(text) {
  if (!text) return false;
  const days = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА', 'СУББОТА', 'ВОСКРЕСЕНЬЕ'];
  return days.some(day => text.includes(day));
}

function isLead(text) {
  return text && /^\d{1,2}:\d{2}$/.test(text);
}

function findYearInsertPosition(data, targetYear) {
  const targetYearNum = parseInt(targetYear);
  
  for (let i = 0; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;
    
    if (isYear(data[i][0])) {
      const currentYearNum = parseInt(data[i][0]);
      if (targetYearNum > currentYearNum) {
        return i;
      }
    }
  }
  return data.length;
}

function findMonthInsertPosition(data, targetMonth, yearPosition) {
  const targetDate = getMonthDate(targetMonth);
  
  for (let i = yearPosition + 1; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;
    
    const text = data[i][0];
    if (isYear(text)) return i;
    
    if (isMonth(text)) {
      const currentDate = getMonthDate(text);
      if (currentDate && targetDate && targetDate > currentDate) {
        return i;
      }
    }
  }
  return data.length;
}

function findWeekInsertPosition(data, targetWeek, monthPosition) {
  const targetDate = getWeekDate(targetWeek);
  
  for (let i = monthPosition + 1; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;
    
    const text = data[i][0];
    if (isMonth(text)) return i;
    
    if (isWeek(text)) {
      const currentDate = getWeekDate(text);
      if (currentDate && targetDate && targetDate > currentDate) {
        return i;
      }
    }
  }
  return data.length;
}

function findDayInsertPosition(data, targetDay, weekPosition) {
  const targetDate = getDayDate(targetDay);
  
  for (let i = weekPosition + 1; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;
    
    const text = data[i][0];
    if (isMonth(text) || isWeek(text)) return i;
    
    if (isDay(text)) {
      const currentDate = getDayDate(text);
      if (currentDate && targetDate && targetDate > currentDate) {
        return i;
      }
    }
  }
  return data.length;
}

function findLeadInsertPosition(data, targetTime, dayPosition) {
  const targetMinutes = timeToMinutes(targetTime);
  
  for (let i = dayPosition + 1; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;
    
    const text = data[i][0];
    if (isMonth(text) || isWeek(text) || isDay(text)) return i;
    
    if (isLead(text)) {
      const currentMinutes = timeToMinutes(text);
      if (targetMinutes < currentMinutes) return i;
    }
  }
  return data.length;
}

function getMonthDate(monthText) {
  const monthMap = {
    'ЯНВАРЬ': 0, 'ФЕВРАЛЬ': 1, 'МАРТ': 2, 'АПРЕЛЬ': 3, 'МАЙ': 4, 'ИЮНЬ': 5,
    'ИЮЛЬ': 6, 'АВГУСТ': 7, 'СЕНТЯБРЬ': 8, 'ОКТЯБРЬ': 9, 'НОЯБРЬ': 10, 'ДЕКАБРЬ': 11
  };
  
  return monthMap[monthText] !== undefined ? new Date(new Date().getFullYear(), monthMap[monthText], 1) : null;
}

function getWeekDate(weekText) {
  const match = weekText.match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (match) {
    return new Date(parseInt(match[3]), parseInt(match[2]) - 1, parseInt(match[1]));
  }
  return null;
}

function getDayDate(dayText) {
  const monthMap = {
    'ЯНВАРЯ': 0, 'ФЕВРАЛЯ': 1, 'МАРТА': 2, 'АПРЕЛЯ': 3, 'МАЯ': 4, 'ИЮНЯ': 5,
    'ИЮЛЯ': 6, 'АВГУСТА': 7, 'СЕНТЯБРЯ': 8, 'ОКТЯБРЯ': 9, 'НОЯБРЯ': 10, 'ДЕКАБРЯ': 11
  };
  
  const parts = dayText.split(' ');
  if (parts.length >= 4) {
    const day = parseInt(parts[1]);
    const monthName = parts[2];
    const year = parseInt(parts[3]);
    
    const monthNum = monthMap[monthName];
    if (monthNum !== undefined) {
      return new Date(year, monthNum, day);
    }
  }
  return null;
}

function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function formatLeadForTable(lead) {
  return [
    lead.time,
    lead.name || '',
    lead.email || '', 
    lead.phone || '',
    lead.company || '',
    lead.project || '',
    lead.status || 'Новый',
    parseInt(lead.amount?.replace(/[^\d]/g, '') || '0'),
    lead.notes || ''
  ];
}

async function addLeadToMonthSheet(spreadsheetId, leadData, targetDate = null) {
  try {
    console.log(`\n🎯 ДОБАВЛЯЕМ ЛИДА: ${leadData.name}`);
    
    const authResult = await initializeAuth();
    if (!authResult || authResult.needsAuth) {
      return { success: false, error: 'Авторизация не выполнена' };
    }

    const { auth } = authResult;
    const dateToUse = targetDate ? new Date(targetDate) : new Date();
    const year = dateToUse.getFullYear();
    const month = dateToUse.getMonth();
    
    console.log(`📅 Дата: ${dateToUse.toLocaleDateString('ru-RU')}`);
    console.log(`🗓️ Год: ${year} | Месяц: ${getMonthName(month)}`);
    
    // Получаем или создаем лист для месяца
    const sheetId = await getOrCreateMonthSheet(auth, spreadsheetId, year, month);
    
    // Получаем данные листа
    const monthName = getMonthName(month);
    const sheetTitle = `${monthName} ${year}`;
    let data = await getTableData(auth, spreadsheetId, `'${sheetTitle}'!A:Z`);
    console.log(`📋 Строк в листе "${sheetTitle}": ${data.length}`);
    
    // Если лист пустой, начинаем с пустых данных
    if (data.length === 0) {
      data = [];
    }
    
    // Добавляем лида с умной логикой недель
    const result = await addLeadToMonthWithWeeks(auth, spreadsheetId, leadData, dateToUse, sheetId, data);
    if (!result.success) {
      throw new Error(result.error);
    }
    
    // Если это самый новый месяц, копируем данные в Лист1
    await updateMainSheet(auth, spreadsheetId, year, month);
    
    console.log('✅ Лид добавлен в месячный лист!\n');
    return { success: true };
    
  } catch (error) {
    console.error(`❌ Ошибка: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function addLeadToMonthWithWeeks(auth, spreadsheetId, leadData, targetDate, sheetId, data) {
  try {
    const components = getDateComponents(targetDate);
    
    console.log(`🗓️ Год: ${components.yearFormatted} | Месяц: ${components.monthFormatted} | Неделя: ${components.weekFormatted}`);
    console.log(`📆 День: ${components.dayFormatted}`);
    
    // Ищем или создаем неделю
    let weekPos = findWeekInMonthData(data, components.weekFormatted);
    if (weekPos === -1) {
      console.log('🆕 Создаем неделю');
      const insertPos = findWeekInsertPositionInMonth(data, components.weekFormatted);
      await insertRowsAtPosition(auth, spreadsheetId, insertPos, [[components.weekFormatted, '', '', '', '', '', '', '', '']], sheetId);
      await formatHeaders(auth, spreadsheetId, insertPos, 1, sheetId);
      data = await getTableData(auth, spreadsheetId, `'${getMonthName(targetDate.getMonth())} ${targetDate.getFullYear()}'!A:Z`);
      weekPos = findWeekInMonthData(data, components.weekFormatted);
      if (weekPos === -1) {
        throw new Error('Не удалось создать неделю после вставки');
      }
      console.log(`✅ Неделя создана на позиции ${weekPos}`);
    } else {
      console.log(`✅ Неделя найдена на позиции ${weekPos}`);
    }
    
    // Ищем или создаем день
    let dayPos = findDayInMonthData(data, components.dayFormatted, weekPos);
    if (dayPos === -1) {
      console.log('🆕 Создаем день');
      const insertPos = findDayInsertPositionInMonth(data, components.dayFormatted, weekPos);
      await insertRowsAtPosition(auth, spreadsheetId, insertPos, [[components.dayFormatted, '', '', '', '', '', '', '', '']], sheetId);
      await formatHeaders(auth, spreadsheetId, insertPos, 1, sheetId);
      data = await getTableData(auth, spreadsheetId, `'${getMonthName(targetDate.getMonth())} ${targetDate.getFullYear()}'!A:Z`);
      dayPos = findDayInMonthData(data, components.dayFormatted, weekPos);
      if (dayPos === -1) {
        throw new Error('Не удалось создать день после вставки');
      }
      console.log(`✅ День создан на позиции ${dayPos}`);
    } else {
      console.log(`✅ День найден на позиции ${dayPos}`);
    }
    
    // Добавляем лида
    console.log(`📝 Добавляем лида с временем ${leadData.time}`);
    const leadInsertPos = findLeadInsertPositionInMonth(data, leadData.time, dayPos);
    const formattedLead = formatLeadForTable(leadData);
    await insertRowsAtPosition(auth, spreadsheetId, leadInsertPos, [formattedLead], sheetId);
    
    return { success: true };
    
  } catch (error) {
    console.error(`❌ Ошибка добавления лида: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Функции для работы с месячными данными
function findWeekInMonthData(data, weekText) {
  for (let i = 0; i < data.length; i++) {
    if (data[i] && data[i][0] === weekText) {
      return i;
    }
  }
  return -1;
}

function findDayInMonthData(data, dayText, weekPosition) {
  for (let i = weekPosition + 1; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;
    
    const text = data[i][0];
    
    if (isWeek(text)) break;
    
    if (text === dayText) return i;
  }
  return -1;
}

function findWeekInsertPositionInMonth(data, targetWeek) {
  const targetDate = getWeekDate(targetWeek);
  
  for (let i = 0; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;
    
    const text = data[i][0];
    if (isWeek(text)) {
      const currentDate = getWeekDate(text);
      if (currentDate && targetDate && targetDate > currentDate) {
        return i;
      }
    }
  }
  return data.length;
}

function findDayInsertPositionInMonth(data, targetDay, weekPosition) {
  const targetDate = getDayDate(targetDay);
  
  for (let i = weekPosition + 1; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;
    
    const text = data[i][0];
    if (isWeek(text)) return i;
    
    if (isDay(text)) {
      const currentDate = getDayDate(text);
      if (currentDate && targetDate && targetDate > currentDate) {
        return i;
      }
    }
  }
  return data.length;
}

function findLeadInsertPositionInMonth(data, targetTime, dayPosition) {
  const targetMinutes = timeToMinutes(targetTime);
  
  for (let i = dayPosition + 1; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;
    
    const text = data[i][0];
    if (isWeek(text) || isDay(text)) return i;
    
    if (isLead(text)) {
      const currentMinutes = timeToMinutes(text);
      if (targetMinutes < currentMinutes) return i;
    }
  }
  return data.length;
}

async function updateMainSheet(auth, spreadsheetId, year, month) {
  const sheets = google.sheets({ version: 'v4', auth });
  
  try {
    // Получаем список всех листов
    const response = await withRetry(async () => {
      return await sheets.spreadsheets.get({ spreadsheetId });
    });
    
    const allSheets = response.data.sheets;
    
    // Фильтруем только месячные листы
    const monthSheets = allSheets.filter(sheet => {
      const title = sheet.properties.title;
      return /^[А-Яа-я]+ \d{4}$/.test(title);
    });
    
    if (monthSheets.length === 0) return;
    
    // Находим самый новый месяц
    monthSheets.sort((a, b) => {
      const dateA = parseSheetDate(a.properties.title);
      const dateB = parseSheetDate(b.properties.title);
      return dateB - dateA; // Обратная сортировка
    });
    
    const newestSheet = monthSheets[0];
    const newestSheetTitle = newestSheet.properties.title;
    
    console.log(`🔄 Перемещаем "${newestSheetTitle}" в позицию 0 (главный лист)`);
    
    // Перемещаем самый новый лист в позицию 0
    await withRetry(async () => {
      return await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{
            updateSheetProperties: {
              properties: {
                sheetId: newestSheet.properties.sheetId,
                index: 0
              },
              fields: 'index'
            }
          }]
        }
      });
    });
    
    console.log(`✅ "${newestSheetTitle}" стал главным листом`);
    
  } catch (error) {
    console.error('❌ Ошибка обновления главного листа:', error.message);
  }
}

async function addLeadToSubTable(spreadsheetId, leadData, targetDate = null) {
  try {
    console.log(`\n🎯 ДОБАВЛЯЕМ ЛИДА: ${leadData.name}`);
    
    const authResult = await initializeAuth();
    if (!authResult || authResult.needsAuth) {
      return { success: false, error: 'Авторизация не выполнена' };
    }

    const { auth } = authResult;
    const dateToUse = targetDate ? new Date(targetDate) : new Date();
    const components = getDateComponents(dateToUse);
    
    console.log(`📅 Дата: ${dateToUse.toLocaleDateString('ru-RU')}`);
    console.log(`🗓️ Год: ${components.yearFormatted} | Месяц: ${components.monthFormatted} | Неделя: ${components.weekFormatted}`);
    console.log(`📆 День: ${components.dayFormatted}`);
    
    let data = await getTableData(auth, spreadsheetId, 'A:Z');
    console.log(`📋 Строк в таблице: ${data.length}`);
    
    let yearPos = findYear(data, components.yearFormatted);
    if (yearPos === -1) {
      console.log('🆕 Создаем год');
      const insertPos = findYearInsertPosition(data, components.yearFormatted);
      await insertRowsAtPosition(auth, spreadsheetId, insertPos, [[components.yearFormatted, '', '', '', '', '', '', '', '']]);
      await formatHeaders(auth, spreadsheetId, insertPos, 1);
      data = await getTableData(auth, spreadsheetId, 'A:Z');
      yearPos = findYear(data, components.yearFormatted);
      if (yearPos === -1) {
        throw new Error('Не удалось создать год после вставки');
      }
      console.log(`✅ Год создан на позиции ${yearPos}`);
    } else {
      console.log(`✅ Год найден на позиции ${yearPos}`);
    }
    
    let monthPos = findMonth(data, components.monthFormatted, yearPos);
    if (monthPos === -1) {
      console.log('🆕 Создаем месяц');
      const insertPos = findMonthInsertPosition(data, components.monthFormatted, yearPos);
      await insertRowsAtPosition(auth, spreadsheetId, insertPos, [[components.monthFormatted, '', '', '', '', '', '', '', '']]);
      await formatHeaders(auth, spreadsheetId, insertPos, 1);
      data = await getTableData(auth, spreadsheetId, 'A:Z');
      monthPos = findMonth(data, components.monthFormatted, yearPos);
      if (monthPos === -1) {
        throw new Error('Не удалось создать месяц после вставки');
      }
      console.log(`✅ Месяц создан на позиции ${monthPos}`);
    } else {
      console.log(`✅ Месяц найден на позиции ${monthPos}`);
    }
    
    let weekPos = findWeek(data, components.weekFormatted, monthPos);
    if (weekPos === -1) {
      console.log('🆕 Создаем неделю');
      const insertPos = findWeekInsertPosition(data, components.weekFormatted, monthPos);
      await insertRowsAtPosition(auth, spreadsheetId, insertPos, [[components.weekFormatted, '', '', '', '', '', '', '', '']]);
      await formatHeaders(auth, spreadsheetId, insertPos, 1);
      data = await getTableData(auth, spreadsheetId, 'A:Z');
      weekPos = findWeek(data, components.weekFormatted, monthPos);
      if (weekPos === -1) {
        throw new Error('Не удалось создать неделю после вставки');
      }
      console.log(`✅ Неделя создана на позиции ${weekPos}`);
    } else {
      console.log(`✅ Неделя найдена на позиции ${weekPos}`);
    }
    
    let dayPos = findDay(data, components.dayFormatted, weekPos);
    if (dayPos === -1) {
      console.log('🆕 Создаем день');
      const insertPos = findDayInsertPosition(data, components.dayFormatted, weekPos);
      await insertRowsAtPosition(auth, spreadsheetId, insertPos, [[components.dayFormatted, '', '', '', '', '', '', '', '']]);
      await formatHeaders(auth, spreadsheetId, insertPos, 1);
      data = await getTableData(auth, spreadsheetId, 'A:Z');
      dayPos = findDay(data, components.dayFormatted, weekPos);
      if (dayPos === -1) {
        throw new Error('Не удалось создать день после вставки');
      }
      console.log(`✅ День создан на позиции ${dayPos}`);
    } else {
      console.log(`✅ День найден на позиции ${dayPos}`);
    }
    
    console.log(`📝 Добавляем лида с временем ${leadData.time}`);
    const leadInsertPos = findLeadInsertPosition(data, leadData.time, dayPos);
    const formattedLead = formatLeadForTable(leadData);
    await insertRowsAtPosition(auth, spreadsheetId, leadInsertPos, [formattedLead]);
    
    console.log('✅ Лид добавлен!\n');
    return { success: true };
    
  } catch (error) {
    console.error(`❌ Ошибка: ${error.message}`);
    return { success: false, error: error.message };
  }
}

function generateDatesForMonth(year, month) {
  const dates = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(year, month, day));
  }
  
  return dates;
}

function generateTestLeads(dates) {
  const companies = [
    'Технологии Будущего', 'Инновации Плюс', 'Цифровые Решения', 
    'Смарт Системы', 'АйТи Консалтинг', 'Веб Разработка',
    'Мобильные Приложения', 'Облачные Сервисы', 'Безопасность Данных',
    'Автоматизация Процессов', 'Аналитика Больших Данных', 'Искусственный Интеллект'
  ];
  
  const names = [
    'Александр Петров', 'Мария Сидорова', 'Дмитрий Козлов', 'Анна Волкова',
    'Сергей Николаев', 'Елена Морозова', 'Андрей Соколов', 'Ольга Лебедева',
    'Владимир Новиков', 'Татьяна Козлова', 'Михаил Иванов', 'Наталья Смирнова',
    'Игорь Захаров', 'Светлана Федорова', 'Роман Алексеев', 'Юлия Дмитриева',
    'Павел Степанов', 'Екатерина Васильева', 'Артем Павлов', 'Алина Семенова',
    'Константин Голубев', 'Виктория Виноградова', 'Николай Богданов', 'Ангелина Воробьева',
    'Георгий Федотов', 'Кристина Жукова', 'Даниил Соловьев', 'Валерия Романова',
    'Тимур Абрамов', 'Арина Власова', 'Максим Мельников', 'Диана Рыбакова'
  ];
  
  return dates.map((date, index) => ({
    name: names[index % names.length],
    company: companies[index % companies.length],
    time: `${9 + (index % 8)}:${(index % 4) * 15}`.padStart(5, '0'),
    amount: `${(100000 + (index % 900000) * 1000).toLocaleString('ru-RU')}`,
    date: date
  }));
}

async function fillFullMonths(spreadsheetId, year, months) {
  try {
    console.log(`🚀 ЗАПОЛНЯЕМ ПОЛНЫЕ МЕСЯЦЫ: ${year} год, месяцы: ${months.join(', ')}\n`);

    const allLeads = [];
    
    for (const month of months) {
      const monthIndex = month - 1;
      const dates = generateDatesForMonth(year, monthIndex);
      const leads = generateTestLeads(dates);
      allLeads.push(...leads);
      
      console.log(`📅 ${getMonthName(monthIndex)} ${year}: ${dates.length} дней → ${leads.length} лидов`);
    }
    
    console.log(`\n🎯 Всего лидов для добавления: ${allLeads.length}\n`);

    for (let i = 0; i < allLeads.length; i++) {
      const lead = allLeads[i];
      
      console.log(`${i + 1}/${allLeads.length}. ${lead.name} | ${lead.company} | ${lead.time} | ${lead.amount} ₽`);
      console.log(`📅 Дата: ${lead.date.toLocaleDateString('ru-RU')} (${['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'][lead.date.getDay()]})`);
      
      const result = await addLeadToSubTable(spreadsheetId, lead, lead.date);
      
      if (!result.success) {
        console.log(`❌ Ошибка: ${result.error}`);
        break;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n🎉 ЗАПОЛНЕНИЕ ЗАВЕРШЕНО!');
    return { success: true, totalLeads: allLeads.length };
    
  } catch (error) {
    console.error('❌ Ошибка заполнения месяцев:', error.message);
    return { success: false, error: error.message };
  }
}

function getMonthName(monthIndex) {
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  return months[monthIndex];
}

module.exports = {
  createClientTable,
  addLeadToSubTable,
  addLeadToMonthSheet,
  initializeAuth,
  fillFullMonths,
  generateDatesForMonth,
  generateTestLeads,
};

if (require.main === module) {
  async function demo() {
    console.log('🚀 ТЕСТИРУЕМ ДОБАВЛЕНИЕ ЛИДОВ В РАЗНЫЕ ГОДЫ\n');

    try {
      const table = await createClientTable('CRM - Множественные Годы');
      if (!table) {
        console.log('❌ Не удалось создать таблицу');
        return;
      }

      console.log(`✅ Таблица создана: ${table.link}\n`);

      // Генерируем полные месяцы с пограничными случаями
      const testLeads = [];
      
      // Февраль 2024 (високосный год) - полный месяц
      const feb2024Dates = generateDatesForMonth(2024, 1); // февраль
      const feb2024Leads = generateTestLeads(feb2024Dates);
      testLeads.push(...feb2024Leads);
      
      // Март 2025 (обычный год) - полный месяц
      const mar2025Dates = generateDatesForMonth(2025, 2); // март
      const mar2025Leads = generateTestLeads(mar2025Dates);
      testLeads.push(...mar2025Leads);
      
      // Февраль 2025 (не високосный) - полный месяц
      const feb2025Dates = generateDatesForMonth(2025, 1); // февраль
      const feb2025Leads = generateTestLeads(feb2025Dates);
      testLeads.push(...feb2025Leads);

      console.log(`📅 Тестируем полные месяцы с пограничными случаями:`);
      console.log(`├── Февраль 2024 (високосный): ${feb2024Dates.length} дней`);
      console.log(`├── Март 2025 (обычный): ${mar2025Dates.length} дней`);
      console.log(`└── Февраль 2025 (не високосный): ${feb2025Dates.length} дней`);
      console.log(`\n🎯 Всего лидов для добавления: ${testLeads.length}\n`);

      for (let i = 0; i < testLeads.length; i++) {
        const lead = testLeads[i];
        const date = new Date(lead.date);
        
        console.log(`${i + 1}/${testLeads.length}. ${lead.name} | ${lead.company} | ${lead.time} | ${lead.amount} ₽`);
        console.log(`📅 Дата: ${date.toLocaleDateString('ru-RU')} (${['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'][date.getDay()]})`);
        
        const result = await addLeadToMonthSheet(table.spreadsheetId, lead, lead.date);
        
        if (!result.success) {
          console.log(`❌ Ошибка: ${result.error}`);
          break;
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      console.log('\n🎉 ДЕМО ЗАВЕРШЕНО!');
      console.log(`🔗 Откройте таблицу: ${table.link}`);
      
      console.log('\n📊 Ожидаемая структура:');
      console.log('📋 Пустой главный лист удален');
      console.log('📋 Отдельные листы по месяцам (новые слева):');
      console.log('├── Март 2025 (главный лист)');
      console.log('├── Февраль 2025');
      console.log('└── Февраль 2024 (самый старый)');
      console.log('\n📋 В каждом месяце:');
      console.log('├── Недели с правильными границами');
      console.log('├── Дни внутри недель');
      console.log('└── Лиды внутри дней');
      
    } catch (error) {
      console.error('❌ Ошибка демо:', error.message);
    }
  }

  demo().catch(console.error);
}