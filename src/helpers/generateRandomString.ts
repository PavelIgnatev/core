export const generateRandomString = (template: string) => {
  const regex = /{(.*?)}/g;
  // Удаляем переносы строк и заменяем множественные пробелы на один
  const cleanedTemplate = template.replace(/\n/g, '').replace(/\s{2,}/g, ' ');

  return cleanedTemplate
    .replace(regex, (match, group) => {
      const options = group.split('|');
      const randomIndex = Math.floor(Math.random() * options.length);
      return options[randomIndex];
    })
    .trim();
};
