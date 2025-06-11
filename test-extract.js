function findAllJsonObjects(input) {
  if (!input) return [];

  const results = [];
  let depth = 0;
  let start = -1;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (char === '}') {
      depth--;
      if (depth === 0 && start !== -1) {
        const jsonCandidate = input.slice(start, i + 1);
        try {
          const parsed = JSON.parse(jsonCandidate);
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            results.push(parsed);
          }
        } catch {}
        start = -1;
      }
    }
  }

  return results;
}

function extractStatusAndReason(input) {
  if (!input) return null;

  try {
    // Находим все JSON объекты в тексте
    const allObjects = findAllJsonObjects(input);

    // Ищем объекты с нужной структурой
    const validObjects = allObjects
      .map((obj) => {
        const status = String(obj.status || '').toLowerCase();
        const reason = String(obj.reason || '');

        if (
          status &&
          reason &&
          ['negative', 'normal', 'meeting'].includes(status)
        ) {
          return { status, reason };
        }
        return null;
      })
      .filter(Boolean);

    // Если нашли хотя бы один подходящий объект, возвращаем первый
    // В будущем тут можно добавить более сложную логику выбора нужного объекта
    return validObjects.length > 0 ? validObjects[0] : null;
  } catch (e) {
    console.log('Main error:', e);
    return null;
  }
}

// Тест кейсы
const testCases = [
  // Тест 1: Чистый JSON
'```json{"status": "normal","reason": "Пользователь вежливо отклонил предложение, заявив, что в данный момент не ищет варианты недвижимости. Ответ не содержит негативных сигналов или враждебности."}```',

  // Тест 2: JSON с префиксом
  `json
  {
    "status": "normal",
    "reason": "Пользователь не проявляет интереса к инвестициям или покупке недвижимости, указывая, что вопрос уже решен и они просто отдыхают. Отсутствуют признаки негативного отношения или обсуждения встречи."
  }`,

  // Тест 3: JSON с мусором вокруг
  `some text before
  {
    "status": "meeting",
    "reason": "Пользователь согласился на встречу в четверг"
  }
  some text after`,

  // Тест 4: JSON с кавычками
  `"json"
  {
    "status": "negative",
    "reason": "Пользователь агрессивно отреагировал на предложение"
  }`,

  // Тест 5: JSON с переносами строк и пробелами
  `
  
  {
    "status": "normal",
    "reason": "Обычный ответ"
  }
  
  `,

  // Тест 6: Невалидный JSON
  `not a json at all`,

  // Тест 7: Частично валидный JSON
  `{
    status: normal,
    reason: "Некорректный JSON"
  }`,

  // Тест 8: Множественные JSON объекты
  `
  Первый объект:
  {
    "status": "normal",
    "reason": "Первый ответ"
  }
  Второй объект:
  {
    "status": "meeting",
    "reason": "Второй ответ"
  }
  `,

  // Тест 9: Множественные объекты с невалидными
  `
  {
    "not_our_object": true
  }
  {
    "status": "normal",
    "reason": "Правильный объект"
  }
  {
    invalid json
  }
  `,

  // Тест 10: Вложенные объекты
  `
  {
    "outer": {
      "status": "normal",
      "reason": "Вложенный ответ"
    },
    "status": "meeting",
    "reason": "Внешний ответ"
  }
  `,
];

// Запускаем все тесты
testCases.forEach((testCase, index) => {
  console.log(`\nTest ${index + 1}:`);
  console.log('Input:', testCase);
  console.log('Result:', extractStatusAndReason(testCase));

  // Дополнительно показываем все найденные объекты
  console.log('All found objects:', findAllJsonObjects(testCase));
});
