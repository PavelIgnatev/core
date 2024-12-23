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

      if (
        nameData?.gender &&
        (nameData.gender.Female || nameData.gender.Male) &&
        Object.values(nameData.rank).filter((rank) => rank !== null).length > 5
      ) {
        contentMap.add(promise.name);
      }
    }
  } catch {}

  const contentRequets = [...contentMap].join(' ');
  if (contentRequets.length < 2) {
    return { aiName: null, aiGender: null };
  }

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
                content: `Your task is to accurately identify and extract the most probable real first name from the provided message and return it in its **${language}** version. The input may contain irrelevant elements such as usernames, nicknames, descriptors, or random words. 

                Focus on recognizing real names, including their diminutive or shortened forms, common misspellings, or transliterations. If a clear match to a valid name exists, adjust it to its full and proper **${language}** form.
                
                If no valid name can be identified with reasonable certainty, return "null". Do not include any additional information, explanations, or context in your response—return only the name as plain text or "null". Ensure strict compliance with these instructions.`,
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
  'саша',
  'людмила',
  'пузенко александр',
  'Madina Malova Madina_Malova',
  'Serhii Liulchenko Liulchenko',
  'Барон  wokeupbackinparis',
  'Irina Galushkina IrinaGalushkyna',
  'Анна Царевская annettetsar',
  'Дмитрий  Draid74',
  'sergbrabus  spafish',
  'Irina Akimova IrinAkimova',
  'Dmitrii Ive Sergeev dmitrii_ive',
  'Helga  nerodda',
  'Валерий Чуриков ogromniy',
  'Alexey Golovin Golovin_79',
  'Антон Трифонов (ТАВ) StartWithTAB',
  'Татьяна Тренина Trenina',
  'insomni.arts  insomniart',
  'Иван Сафронов delusiondsn',
  'Liza  lizzvt',
  'П А PawaAnt',
  'Artem Venkov a_venkov',
  'Oleg  onepieceofcapybara',
  'D I ivanovdv',
  'Алексей Машкевич amashkevich',
  'Tanya Mitskevich Tmitskevich',
  'Mistral  Cielo02',
  'Evgeny Kartukha johny0908',
  'Gromov | treasures  ValeriyGromov',
  'AV  AndVerh',
  'Maxim Bystrov racingmax',
  'Дмитрий  DimGrid',
  'Dmitriy Belyan Belyan18',
];

const language = 'RUSSIAN'; // or 'RUSSIAN'

const testNameParsing = async () => {
  for (const name of testNames) {
    const result = await getUserInformation(name, language);
    console.log(`Input: ${name}, Result:`, result);
  }
};

testNameParsing();
