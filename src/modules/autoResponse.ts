import { getUnreadDialogs } from "../methods/dialogs/getUnreadDialogs";
import { sendMessage } from "../methods/messages/sendMessage";

export const  autoResponse = async () => {
  const unreadDialogs = await getUnreadDialogs();
  console.log(unreadDialogs)
  for (const dialog of unreadDialogs) {
    // await sendMessage(dialog.id, dialog.accessHash, '');
  }
};
