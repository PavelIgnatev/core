const { GoogleAPI, GoogleAuth } = require('./google-api.js');

const sendToBot = async (message) => {
  console.log(message);
};

function getSpreadsheetLink(spreadsheetId) {
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit?usp=sharing`;
}

async function createGoogleTable(title) {
  try {
    const auth = await GoogleAuth.initializeAuth();
    const api = new GoogleAPI(auth);
    const spreadsheetId = await api.createSpreadsheet(title);
    await api.createPermission(spreadsheetId);
    await api.batchUpdate(spreadsheetId, [
      {
        addSheet: {
          properties: {
            title: `${getMonthName(new Date().getMonth())} ${new Date().getFullYear()}`,
            gridProperties: {
              rowCount: 1000,
              columnCount: 26,
            },
            index: 1,
          },
        },
      },
    ]);
    await api.batchUpdate(spreadsheetId, [
      {
        deleteSheet: {
          sheetId: 0,
        },
      },
    ]);

    return spreadsheetId;
  } catch (error) {
    await sendToBot(
      `* CREATE_GOOGLE_TABLE_ERROR *
ERROR: ${error.message}`
    );
    return null;
  }
}

async function insertRow(
  api,
  spreadsheetId,
  position,
  rows,
  sheetId,
  mergeRow = false
) {
  const requests = [
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
        rows: rows.map((row) => ({
          values: row.map((cell) => ({
            userEnteredValue: { stringValue: cell.toString() },
          })),
        })),
        fields: 'userEnteredValue',
      },
    },
  ];

  if (mergeRow) {
    for (let i = 0; i < rows.length; i++) {
      requests.push({
        mergeCells: {
          range: {
            sheetId: sheetId,
            startRowIndex: position + i,
            endRowIndex: position + i + 1,
            startColumnIndex: 0,
            endColumnIndex: 9,
          },
          mergeType: 'MERGE_ALL',
        },
      });
    }
  }

  await api.batchUpdate(spreadsheetId, requests);
}

async function getSheet(api, spreadsheetId, sheetTitle) {
  try {
    const response = await api.getSpreadsheet(spreadsheetId);

    const existingSheets = response.data.sheets;
    const existingSheet = existingSheets.find(
      (sheet) => sheet.properties.title === sheetTitle
    );
    if (existingSheet) {
      return existingSheet.properties.sheetId;
    }

    const createResponse = await api.batchUpdate(spreadsheetId, [
      {
        addSheet: {
          properties: {
            title: sheetTitle,
            gridProperties: {
              rowCount: 1000,
              columnCount: 26,
            },
            index: 1,
          },
        },
      },
    ]);

    const newSheetId =
      createResponse.data.replies[0].addSheet.properties.sheetId;

    await reorderSheetsByDate(api, spreadsheetId);

    return newSheetId;
  } catch (error) {
    throw error;
  }
}

function isMonthSheet(title) {
  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  const parts = title.split(' ');
  if (parts.length !== 2) return false;

  const monthName = parts[0];
  const yearStr = parts[1];

  if (!monthNames.includes(monthName)) return false;

  const year = parseInt(yearStr);
  if (isNaN(year) || yearStr.length !== 4 || year < 1900 || year > 2100)
    return false;

  return true;
}

async function reorderSheetsByDate(api, spreadsheetId) {
  try {
    const response = await api.getSpreadsheet(spreadsheetId);

    const allSheets = response.data.sheets;

    const monthSheets = [];
    const otherSheets = [];

    allSheets.forEach((sheet) => {
      const title = sheet.properties.title;
      if (isMonthSheet(title)) {
        monthSheets.push(sheet);
      } else {
        otherSheets.push(sheet);
      }
    });

    if (otherSheets.length > 0) {
      console.log(`Найдено ${otherSheets.length} лишних листов, удаляем...`);

      const deleteRequests = otherSheets.map((sheet) => ({
        deleteSheet: {
          sheetId: sheet.properties.sheetId,
        },
      }));

      await api.batchUpdate(spreadsheetId, deleteRequests);
      console.log('Лишние листы удалены');
    }

    if (monthSheets.length <= 1) {
      return;
    }

    monthSheets.sort((a, b) => {
      const dateA = parseSheetDate(a.properties.title);
      const dateB = parseSheetDate(b.properties.title);
      return dateB - dateA;
    });

    const requests = [];
    let targetIndex = 0;

    for (const sheet of monthSheets) {
      if (sheet.properties.index !== targetIndex) {
        requests.push({
          updateSheetProperties: {
            properties: {
              sheetId: sheet.properties.sheetId,
              index: targetIndex,
            },
            fields: 'index',
          },
        });
      }
      targetIndex++;
    }

    if (requests.length > 0) {
      await api.batchUpdate(spreadsheetId, requests);
      console.log('Месячные листы отсортированы');
    }
  } catch (error) {
    console.log(`Ошибка при сортировке листов: ${error.message}`);
  }
}

function parseSheetDate(sheetTitle) {
  const monthMap = {
    Январь: 0,
    Февраль: 1,
    Март: 2,
    Апрель: 3,
    Май: 4,
    Июнь: 5,
    Июль: 6,
    Август: 7,
    Сентябрь: 8,
    Октябрь: 9,
    Ноябрь: 10,
    Декабрь: 11,
  };

  const parts = sheetTitle.split(' ');
  if (parts.length !== 2) return 0;

  const monthName = parts[0];
  const yearStr = parts[1];

  const year = parseInt(yearStr);
  const month = monthMap[monthName];

  if (isNaN(year) || month === undefined) {
    return 0;
  }

  return new Date(year, month, 1).getTime();
}

function getDateComponents(date) {
  const dayFormatted = date
    .toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toUpperCase();

  const yearFormatted = date.getFullYear().toString();

  const monthFormatted = date
    .toLocaleDateString('ru-RU', {
      month: 'long',
    })
    .toUpperCase();

  return { dayFormatted, yearFormatted, monthFormatted };
}

function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function getDayDate(dayText) {
  const monthMap = {
    ЯНВАРЯ: 0,
    ФЕВРАЛЯ: 1,
    МАРТА: 2,
    АПРЕЛЯ: 3,
    МАЯ: 4,
    ИЮНЯ: 5,
    ИЮЛЯ: 6,
    АВГУСТА: 7,
    СЕНТЯБРЯ: 8,
    ОКТЯБРЯ: 9,
    НОЯБРЯ: 10,
    ДЕКАБРЯ: 11,
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

function isDay(text) {
  if (!text) return false;
  const days = [
    'ПОНЕДЕЛЬНИК',
    'ВТОРНИК',
    'СРЕДА',
    'ЧЕТВЕРГ',
    'ПЯТНИЦА',
    'СУББОТА',
    'ВОСКРЕСЕНЬЕ',
  ];
  return days.some((day) => text.includes(day));
}

function isLead(text) {
  if (!text) return false;

  const parts = text.split(':');
  if (parts.length !== 2) return false;

  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);

  return (
    !isNaN(hours) &&
    !isNaN(minutes) &&
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59
  );
}

function formatLeadForTable(lead) {
  const extractDigits = (str) => {
    if (!str) return '0';
    let result = '';
    for (let i = 0; i < str.length; i++) {
      if (str[i] >= '0' && str[i] <= '9') {
        result += str[i];
      }
    }
    return result || '0';
  };

  return [
    lead.time,
    lead.name || '',
    lead.email || '',
    lead.phone || '',
    lead.company || '',
    lead.project || '',
    lead.status || 'Новый',
    parseInt(extractDigits(lead.amount)),
    lead.notes || '',
  ];
}

async function addLeadToMonthSheet(spreadsheetId, leadData, targetDate) {
  try {
    const auth = await GoogleAuth.initializeAuth();
    const api = new GoogleAPI(auth);
    const dateToUse = new Date(targetDate);
    const year = dateToUse.getFullYear();
    const month = dateToUse.getMonth();

    const monthName = getMonthName(month);
    const sheetTitle = `${monthName} ${year}`;

    const sheetId = await getSheet(api, spreadsheetId, sheetTitle);

    let data = await api.getValues(spreadsheetId, `'${sheetTitle}'!A:Z`);

    if (data.length === 0) {
      data = [];
    }

    const result = await addLeadToMonth(
      api,
      spreadsheetId,
      leadData,
      dateToUse,
      sheetId,
      data
    );
    if (!result.success) {
      throw new Error(result.error);
    }

    return { success: true };
  } catch (error) {
    console.log(`Ошибка добавления лида: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function addLeadToMonth(
  api,
  spreadsheetId,
  leadData,
  targetDate,
  sheetId,
  data
) {
  try {
    const components = getDateComponents(targetDate);

    console.log(`День: ${components.dayFormatted}`);

    let dayPos = findDayInMonthData(data, components.dayFormatted);

    if (dayPos === -1) {
      console.log('Создаем новый день');
      const insertPos = findDayInsertPositionInMonth(
        data,
        components.dayFormatted
      );

      await insertRow(
        api,
        spreadsheetId,
        insertPos,
        [[components.dayFormatted, '', '', '', '', '', '', '', '']],
        sheetId,
        true
      );
      data = await api.getValues(
        spreadsheetId,
        `'${getMonthName(targetDate.getMonth())} ${targetDate.getFullYear()}'!A:Z`
      );
      dayPos = findDayInMonthData(data, components.dayFormatted);

      if (dayPos === -1) {
        throw new Error('Не удалось создать день после вставки');
      }
    }

    console.log(`Добавляем лида: ${leadData.name} в ${leadData.time}`);
    const leadInsertPos = findLeadInsertPositionInMonth(
      data,
      leadData.time,
      dayPos
    );
    const formattedLead = formatLeadForTable(leadData);
    await insertRow(
      api,
      spreadsheetId,
      leadInsertPos,
      [formattedLead],
      sheetId
    );

    return { success: true };
  } catch (error) {
    console.log(`Ошибка в addLeadToMonth: ${error.message}`);
    return { success: false, error: error.message };
  }
}

function findDayInMonthData(data, dayText) {
  for (let i = 0; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;

    const text = data[i][0];

    if (text === dayText) {
      return i;
    }
  }
  return -1;
}

function findDayInsertPositionInMonth(data, targetDay) {
  const targetDate = getDayDate(targetDay);

  for (let i = 0; i < data.length; i++) {
    if (!data[i] || !data[i][0]) continue;

    const text = data[i][0];
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
    if (isDay(text)) return i;

    if (isLead(text)) {
      const currentMinutes = timeToMinutes(text);
      if (targetMinutes < currentMinutes) return i;
    }
  }
  return data.length;
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
    'Технологии Будущего',
    'Инновации Плюс',
    'Цифровые Решения',
    'Смарт Системы',
    'АйТи Консалтинг',
    'Веб Разработка',
    'Мобильные Приложения',
    'Облачные Сервисы',
    'Безопасность Данных',
    'Автоматизация Процессов',
    'Аналитика Больших Данных',
    'Искусственный Интеллект',
  ];

  const names = [
    'Александр Петров',
    'Мария Сидорова',
    'Дмитрий Козлов',
    'Анна Волкова',
    'Сергей Николаев',
    'Елена Морозова',
    'Андрей Соколов',
    'Ольга Лебедева',
    'Владимир Новиков',
    'Татьяна Козлова',
    'Михаил Иванов',
    'Наталья Смирнова',
    'Игорь Захаров',
    'Светлана Федорова',
    'Роман Алексеев',
    'Юлия Дмитриева',
    'Павел Степанов',
    'Екатерина Васильева',
    'Артем Павлов',
    'Алина Семенова',
    'Константин Голубев',
    'Виктория Виноградова',
    'Николай Богданов',
    'Ангелина Воробьева',
    'Георгий Федотов',
    'Кристина Жукова',
    'Даниил Соловьев',
    'Валерия Романова',
    'Тимур Абрамов',
    'Арина Власова',
    'Максим Мельников',
    'Диана Рыбакова',
  ];

  return dates.map((date, index) => ({
    name: names[index % names.length],
    company: companies[index % companies.length],
    time: `${9 + (index % 8)}:${(index % 4) * 15}`.padStart(5, '0'),
    amount: `${(100000 + (index % 900000) * 1000).toLocaleString('ru-RU')}`,
    date: date,
  }));
}

function getMonthName(monthIndex) {
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  return months[monthIndex];
}

if (require.main === module) {
  async function demo() {
    try {
      const id = await createGoogleTable('CRM - Множественные Годы');
      if (!id) {
        return;
      }

      console.log(getSpreadsheetLink(id));

      const testLeads = [];

      const jul2025Dates = generateDatesForMonth(2025, 6);
      const jul2025Leads = generateTestLeads(jul2025Dates);
      testLeads.push(...jul2025Leads);

      const aug2025Dates = generateDatesForMonth(2025, 7);
      const aug2025Leads = generateTestLeads(aug2025Dates);
      testLeads.push(...aug2025Leads);

      const sep2025Dates = generateDatesForMonth(2025, 8);
      const sep2025Leads = generateTestLeads(sep2025Dates);
      testLeads.push(...sep2025Leads);

      console.log(`Создано ${testLeads.length} тестовых лидов`);

      for (let i = 0; i < testLeads.length; i++) {
        const lead = testLeads[i];
        const date = new Date(lead.date);

        const result = await addLeadToMonthSheet(id, lead, lead.date);

        if (!result.success) {
          console.log(`Ошибка: ${result.error}`);
          break;
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error) {}
  }

  demo().catch(console.error);
}

module.exports = {
  createGoogleTable,
  addLeadToMonthSheet,
  initializeAuth: GoogleAuth.initializeAuth,
  generateDatesForMonth,
  generateTestLeads,
};
