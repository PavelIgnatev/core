export const extractLastQuestion = (text: string) => {
  const urlRegex =
    /((http|https):\/\/)?(www\.)?([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9\&\;\:\.\,\?\=\-\_\+\%\'\~\#]*)*/g;
  const links: Array<{ key: string; url: string }> = [];
  let replacedStr = text;

  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    const key = `__LINK_${links.length}__`;
    const fullLink = match[0].replace(/[?.!,]$/, '');
    links.push({ key, url: fullLink });
    replacedStr = replacedStr.replace(fullLink, key);
  }

  const matches = replacedStr.match(/[^.?!]*\?/g);
  const lastQuestion = matches ? matches[matches.length - 1].trim() : null;
  const restoredLastQuestion = lastQuestion
    ? lastQuestion.replace(/__LINK_\d+__/g, (key) => {
        const link = links.find((item) => item.key === key);
        return link ? link.url : key;
      })
    : null;

  return restoredLastQuestion;
};
