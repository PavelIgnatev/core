export const getGreeting = (language: string) => {
  if (language !== 'RUSSIAN' && language !== 'ENGLISH') {
    return null;
  }

  const moscowTime = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Moscow',
  });
  const hours = new Date(moscowTime).getHours();

  if (hours >= 6 && hours < 12) {
    return language === 'RUSSIAN' ? 'Доброе утро' : 'Good morning';
  } else if (hours >= 12 && hours < 16) {
    return language === 'RUSSIAN' ? 'Добрый день' : 'Good afternoon';
  } else {
    return language === 'RUSSIAN' ? 'Добрый вечер' : 'Good evening';
  }
};
