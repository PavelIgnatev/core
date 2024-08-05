export const generateRandomString = (template: string) => {
  const regex = /{(.*?)}/g;
  return template.replace(regex, (match, group) => {
    const options = group.split('|');
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  });
};
