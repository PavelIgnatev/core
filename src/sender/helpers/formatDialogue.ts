export const formatDialogue = (
  messages: Array<{ text: string; fromId: string; date: number }>,
  recipientId: string
): string =>
  messages
    .map((msg) => {
      const role = msg.fromId === recipientId ? 'КЛИЕНТ' : 'БОТ';

      return `${role}:${msg.text}`.trim();
    })
    .join('\n');
