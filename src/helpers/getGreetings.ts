export const getGreeting = () => {
  const moscowTime = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Moscow',
  });
  const hours = new Date(moscowTime).getHours();

  if (hours >= 6 && hours < 12) {
    return 'Доброе утро';
  } else if (hours >= 12 && hours < 16) {
    return 'Добрый день';
  } else {
    return 'Добрый вечер';
  }
};
