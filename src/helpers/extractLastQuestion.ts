export const extractLastQuestion = (str: string) => {
  const matches = str.match(/[^.?!]*\?/g);
  return matches ? matches[matches.length - 1].trim() : null;
};
