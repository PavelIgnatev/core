export const getGreeting = (language: string) => {
  if (language !== 'RUSSIAN' && language !== 'ENGLISH') {
    return null;
  }

  if (language === 'RUSSIAN') {
    return 'Здравствуйте';
  }

  return 'Hello';
};
