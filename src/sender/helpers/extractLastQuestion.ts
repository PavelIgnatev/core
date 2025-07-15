export const extractLastQuestion = (
  text: string
): { mainText: string; question: string | null } => {
  const sentences = text.match(/[^.!?\n]+[.!?\n]+/g) || [];

  if (sentences.length === 0) {
    return { mainText: text, question: null };
  }

  const lastSentence = sentences[sentences.length - 1].trim();

  if (lastSentence.endsWith('?')) {
    const mainText = sentences.slice(0, -1).join('').trim();
    return {
      mainText,
      question: lastSentence.charAt(0).toUpperCase() + lastSentence.slice(1),
    };
  }

  return { mainText: text, question: null };
};
