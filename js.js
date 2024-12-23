const axios = require('axios');

const isRussian = (str) => /^[А-Яа-яЁё]+$/.test(str);
const isEnglish = (str) => /^[A-Za-z]+$/.test(str);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const withTimeout = (promise, ms) => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout exceeded')), ms)
  );
  return Promise.race([promise, timeout]);
};

const makeRequest = async (word) => {
  return await axios
    .get(`http://185.84.162.158:5000/search?name=${encodeURIComponent(word)}`)
    .then((response) => response.data)
    .catch(() => {
      return null;
    });
};

const getUserInformation = async (userContent, language) => {
  if (language !== 'RUSSIAN' && language !== 'ENGLISH') {
    return { aiName: null, aiGender: null };
  }

  const content = userContent
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();

  const words = content.split(' ');
  const requests = words.map(makeRequest);

  let contentMap = new Set();
  try {
    const promises = await Promise.all(requests);
    for (const promise of promises) {
      const nameData = promise?.result?.first_name;
      console.log(promise.name, nameData);
      if (
        nameData?.gender &&
        (nameData.gender.Female || nameData.gender.Male) &&
        Object.values(nameData.rank).filter((rank) => rank !== null).length > 3
      ) {
        contentMap.add(promise.name);
      }
    }
  } catch {}

  const contentRequets = [...contentMap].join(' ');
  if (contentRequets.length < 2) {
    return { aiName: null, aiGender: null };
  }
  console.log(contentRequets);

  const processRequest = async () => {
    for (let i = 0; i < 5; i++) {
      try {
        const { data: resultData } = await axios.post(
          'http://91.198.220.234/chatv2',
          {
            temperature: 0.4,
            model: 'command-r-plus',
            safety_mode: 'NONE',
            messages: [
              {
                role: 'system',
                content: `Your task is to accurately identify and extract the real first name from the provided message and adjust it to its **${language}** version. The message may contain various elements such as usernames, display names, nicknames, titles, descriptors, and irrelevant words. Your primary goal is to extract the most likely real first name of the person and provide it in its **${language}** form, ensuring proper communication.

                Please disregard usernames unless they are the only source of the name. If the display name is available and contains a plausible first name, prioritize it. Remove words like 'undefined', titles (e.g., 'Coach', 'Founder'), descriptors, emojis, and special characters. If multiple names are present, choose the first one that is likely the first name. Ignore additional information like surnames or middle names, as they are already removed automatically by the system.
                
                **Important clarifications:**
                1. If the name is a short form, do not attempt to convert it to a full form, even if the full form is commonly known. and "Alex" must remain "Alex"
                2. If only a patronymic is present (e.g., 'Ivanovich', 'Vladimirovna'), **do not extract a first name from the patronymic**. If no first name is present alongside the patronymic, return "null."
                3. If the input does not contain any recognizable short, full, or transliterated form of a real first name, you must return "null." Do not fabricate or infer a name in such cases.
                
                Ensure the extracted name is adjusted to its **${language}** version, either by translation or transliteration, and maintain correct spelling and cultural appropriateness in **${language}**. If the name is already in **${language}**, leave it as is. Return only the name as plain text or "null" if no valid name is found. Do not provide any explanations or additional information.
                `,
              },
              {
                role: 'user',
                content: contentRequets,
              },
            ],
          }
        );

        const userInfo = resultData?.message?.content?.[0]?.text;
        if (userInfo === 'null') {
          return { aiName: null, aiGender: null };
        }

        if (
          (language === 'RUSSIAN' && !isRussian(userInfo)) ||
          (language === 'ENGLISH' && !isEnglish(userInfo))
        ) {
          throw new Error('Incorrect name');
        }

        const data = await makeRequest(userInfo);
        const { Female = 0, Male = 0 } = data?.result?.first_name?.gender || {};

        if (!Female && !Male) {
          throw new Error('Incorrect gender');
        }

        return {
          aiName: capitalizeFirstLetter(userInfo.toLowerCase()),
          aiGender: Female > Male ? 'female' : 'male',
        };
      } catch (error) {
        await new Promise((res) => setTimeout(res, 1000));
      }
    }

    return { aiName: null, aiGender: null };
  };

  try {
    return await withTimeout(processRequest(), 300000);
  } catch {
    return { aiName: null, aiGender: null };
  }
};

// Test array with 20 names
const testNames = [
  'азарий webex',
  'савва makeloveskiy ps',
  'Alex',
  'Sasha',
  'Aleksey',
  'Lesha',
  'Dima',
  'Dimon',
  'Nastya',
  'Katya',
  'Liza',
  'Masha',
  'Vanya',
  'Vova',
  'Sergey',
  'Max',
  'Danny',
  'Julia',
  'Greg',
  'Andrew',
  'Vicky',
  'Kolya',
  'Eliza',
  'Sophie',
  'Tanya',
];

const language = 'RUSSIAN'; // or 'RUSSIAN'

const testNameParsing = async () => {
  for (const name of testNames) {
    const result = await getUserInformation(name, language);
    console.log(`Input: ${name}, Result:`, result);
  }
};

testNameParsing();
