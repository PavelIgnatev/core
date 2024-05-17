type Message = { id: number; text: string; fromId: string; date: number };

export const getCombinedMessages = (messages: Message[]) => {
  const combinedMessages = [];
  for (let i = 0; i < messages.length; i++) {
    const curr = { ...messages[i] };
    if (combinedMessages.length > 0) {
      const lastItem = combinedMessages[combinedMessages.length - 1];
      if (lastItem.fromId === curr.fromId) {
        lastItem.text += "." + curr.text;
      } else {
        combinedMessages.push(curr);
      }
    } else {
      combinedMessages.push(curr);
    }
  }
  return combinedMessages;
};
