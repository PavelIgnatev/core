CRM API - Краткая документация
=================================================

## 1. BITRIX24 API

```json
{
  "TITLE": "Иван Петров (@ivan_petrov)",
  "SOURCE_DESCRIPTION": "Телефон: +79991234567\nЮзернейм: ivan_petrov\nОписание: Описание профиля\nКомментарий: Интересуется ценами на услуги, просит прайс",
  "COMMENTS": "GROUP_ID: -1001234567890\nRECIPIENT_ID: 987654321\nAI_BOT_NAME: Анастасия\nAI_BOT_USERNAME: anastasia_bot\nDIALOGUE:\n[12:30] Иван: Привет\n[12:31] Анастасия: Здравствуйте!",
  "DATE_CREATE": "2024-01-15T10:00:00.000Z",
  "DATE_MODIFY": "2024-01-15T15:45:30.000Z"
}
```

**Примечания для Bitrix24:**

- Поля null отсутствуют - используются пустые строки или 'NO_DATA'

## 2. AMOCRM API

```json
{
  "TITLE_RECIPIENT": "Иван Петров",
  "TITLE_USERNAME": "ivan_petrov", 
  "TITLE_PHONE": "NO_DATA",
  "TITLE_FALLBACK": "NEW_LEAD",
  
  "DESC_USERNAME": "ivan_petrov",
  "DESC_PHONE": "NO_DATA",
  "DESC_BIO": "NO_DATA",
  "DESC_COMMENT": "Интересуется ценами на услуги, просит прайс",
  
  "COMMENTS_GROUP_ID": "-1001234567890",
  "COMMENTS_RECIPIENT_ID": "987654321",
  "COMMENTS_AI_BOT_NAME": "Анастасия",
  "COMMENTS_AI_BOT_USERNAME": "anastasia_bot",
  "COMMENTS_DIALOGUE": "[12:30] Иван: Привет\n[12:31] Анастасия: Здравствуйте!",
  
  "DATE_CREATE": "2024-01-15T10:00:00.000Z",
  "DATE_MODIFY": "2024-01-15T15:45:30.000Z"
}
```

**Примечания для AmoCRM:**

- TITLE_PHONE может быть строкой "NO_DATA", если телефон отсутствует
- DESC_PHONE может быть строкой "NO_DATA", если телефон отсутствует
- DESC_BIO может быть строкой "NO_DATA", если описание отсутствует
- Поля null отсутствуют - используется строка "NO_DATA" для отсутствующих данных

## 3. CUSTOM API

```json
{
  "status": "lead",
  "reason": "Интересуется ценами на услуги, просит прайс",
  "aiBotName": "Анастасия",
  "aiBotUsername": "anastasia_bot",
  
  "groupId": "-1001234567890",
  "leadId": "987654321",
  "leadTitle": "Иван Петров",
  "leadUsername": "ivan_petrov",
  "leadPhone": "NO_DATA",
  "leadBio": "NO_DATA",
  
  "messages": [
    {
      "text": "Привет",
      "from": "lead",
      "date": 1705320600
    },
    {
      "text": "Здравствуйте!",
      "from": "ai", 
      "date": 1705320660
    }
  ],

  "dateCreated": "2024-01-15T10:00:00.000Z",
  "dateUpdated": "2024-01-15T15:45:30.000Z"
}
```

**Примечания для Custom API:**

- leadPhone может быть строкой "NO_DATA" если телефон отсутствует
- leadBio может быть строкой "NO_DATA" если описание отсутствует
- Поля null отсутствуют - используется строка "NO_DATA" для отсутствующих данных
