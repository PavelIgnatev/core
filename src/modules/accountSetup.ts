import BigInt from 'big-integer';

import GramJs from '../common/gramjs/tl/api';

import { uploadFile } from '../common/gramjs/client/uploadFile';
import { updateAccountById } from '../db/accounts';
import { generateRandomString } from '../helpers/generateRandomString';
import { generateUser } from '../helpers/generateUser';
import { getProfileFiles } from '../helpers/getProfileFiles';
import { sleep } from '../helpers/sleep';
import { updateProfile } from '../methods/account/updateProfile';
import { sendToBot } from '../helpers/sendToBot';
import { invokeRequest } from '../common/gramjs';
import { buildInputPeer, getIdByPeer } from '../helpers/buildInputPeer';
import TelegramClient from '../common/gramjs/client/TelegramClient';
import { deleteHistoryByPeer } from '../methods/messages/deleteHistoryByPeer';

const settings = {
  muteUntil: 2147483647,
  showPreviews: false,
  silent: true,
};

const emojis = [
  '🌎',
  '🌍',
  '🌏',
  '🪐',
  '♻️',
  '🌿',
  '🧩',
  '☘️',
  '🍀',
  '🦕',
  '🍃',
  '🧳',
  '💼',
  '🚀',
  '🌊',
  '📌',
  '🎯',
  '👋',
  '🤝',
  '👨‍💻',
  '🌳',
  '🐢',
  '🦖',
  '🌵',
  '🌀',
  '⛰️',
  '🍁',
  '🍂',
  '🦔',
  '🥑',
  '🏆',
  '🐌',
  '🧬',
  '🐊',
  '🌔',
];

const getDialogsTG = async (
  client: TelegramClient,
  accountId: string,
  folderId: 0 | 1
) => {
  const dialogs: Array<{
    dialog: GramJs.Dialog;
    user?: GramJs.TypeUser;
    chat?: GramJs.TypeChat;
    message?: GramJs.TypeMessage;
  }> = [];
  let offsetDate = 0;
  while (true) {
    const d = await invokeRequest(
      client,
      new GramJs.messages.GetDialogs({
        offsetPeer: new GramJs.InputPeerEmpty(),
        folderId,
        limit: 100,
        offsetDate,
      })
    );

    if (d instanceof GramJs.messages.DialogsNotModified) {
      return [];
    }

    for (const dialog of d.dialogs) {
      if (
        !(dialog instanceof GramJs.Dialog) ||
        dialogs.find(
          ({ dialog: dl }) => getIdByPeer(dl.peer) === getIdByPeer(dialog.peer)
        )
      ) {
        continue;
      }

      const id = getIdByPeer(dialog.peer);
      const user = d.users.find((m) => String(m.id) === id);
      const chat = d.chats.find((d) => String(d.id) === id);
      const message = d.messages.find((m) => getIdByPeer(m.peerId) === id);

      dialogs.push({ user, chat, dialog, message });
    }

    if (d.dialogs.length < 100) {
      break;
    } else {
      const lastDialog = dialogs[dialogs.length - 1].dialog;
      const lastMessage = d.messages.find(
        (m) => getIdByPeer(m.peerId) === getIdByPeer(lastDialog.peer)
      );
      if (!lastMessage || lastMessage instanceof GramJs.MessageEmpty) {
        await sendToBot(`** LAST MESSAGE NOT DEFINED **
ACCOUNT ID: ${accountId}
MESSAGE: ${JSON.stringify(lastMessage)}
MESSAGE_EMPTY: ${lastMessage instanceof GramJs.MessageEmpty}
OFFSET DATE: ${offsetDate}`);
        return [];
      }

      offsetDate = lastMessage.date;
    }
  }
  return dialogs;
};

export const accountSetup = async (
  client: any,
  accountId: string,
  setuped: boolean,
  firstName?: string
) => {
  if (setuped) {
    return firstName as string;
  }

  const folderPeers = [];
  const archiveDialogsTG = await getDialogsTG(client, accountId, 1);

  for (const dialogTG of archiveDialogsTG) {
    const { dialog, chat, user } = dialogTG;

    const peer = buildInputPeer(dialog.peer, chat || null, user || null);
    if (dialog.pinned) {
      await invokeRequest(
        client,
        new GramJs.messages.ToggleDialogPin({
          peer: new GramJs.InputDialogPeer({
            peer,
          }),
          pinned: undefined,
        })
      );
    }

    folderPeers.push(
      new GramJs.InputFolderPeer({
        peer,
        folderId: 0,
      })
    );
  }

  if (folderPeers.length) {
    for (let i = 0; i < folderPeers.length; i += 100) {
      const chunk = folderPeers.slice(i, i + 100);
      await client.invoke(
        new GramJs.folders.EditPeerFolders({
          folderPeers: chunk,
        })
      );
    }
  }

  const dialogsTG = await getDialogsTG(client, accountId, 0);
  for (const dialogTG of dialogsTG) {
    const { dialog, chat, user } = dialogTG;

    const id = getIdByPeer(dialog.peer);
    const peer = buildInputPeer(dialog.peer, chat || null, user || null);

    if (id === '178220800') {
      continue;
    }

    if (dialog.peer instanceof GramJs.PeerChannel) {
      await invokeRequest(
        client,
        new GramJs.channels.LeaveChannel({
          channel: peer,
        })
      );
    } else if (dialog.peer instanceof GramJs.PeerChat) {
      if (
        chat &&
        (chat instanceof GramJs.Chat ||
          chat instanceof GramJs.ChatForbidden ||
          chat instanceof GramJs.ChatEmpty)
      ) {
        await invokeRequest(
          client,
          new GramJs.messages.DeleteChatUser({
            chatId: BigInt(id),
            userId: new GramJs.InputUserSelf(),
          })
        );

        await deleteHistoryByPeer(client, peer, false);
      } else {
        await invokeRequest(
          client,
          new GramJs.channels.LeaveChannel({
            channel: peer,
          })
        );
      }
    } else {
      await deleteHistoryByPeer(client, peer, true);

      if (user && user instanceof GramJs.User && user.bot) {
        await invokeRequest(
          client,
          new GramJs.contacts.Block({
            id: peer,
          })
        );
      }
    }
  }

  const dialogFilters = await invokeRequest(
    client,
    new GramJs.messages.GetDialogFilters()
  );

  for (const filter of dialogFilters.filters) {
    if (filter instanceof GramJs.DialogFilterDefault) {
      continue;
    }

    const isDeleted = await invokeRequest(
      client,
      new GramJs.messages.UpdateDialogFilter({
        id: filter.id,
        filter: undefined,
      })
    );

    if (!isDeleted) {
      await sendToBot(`** ACCOUNT SETUP: DELETE DIALOG FILTER ERROR **
ID: ${accountId}
FID: ${filter.id}`);
      throw new Error('GLOBAL_ERROR');
    }
  }

  const contacts = await invokeRequest(
    client,
    new GramJs.contacts.GetContacts({ hash: BigInt('0') })
  );

  if (contacts instanceof GramJs.contacts.ContactsNotModified) {
    await sendToBot(`** ACCOUNT SETUP: GET CONTACTS ERROR **
ID: ${accountId}
CONTACTS: ${Boolean(contacts)}
NOT_MODIFIED: ${contacts instanceof GramJs.contacts.ContactsNotModified}`);
    throw new Error('GLOBAL_ERROR');
  }

  const users = contacts.users.map(
    (user: any) =>
      new GramJs.InputPeerUser({
        userId: BigInt(user.id),
        accessHash: BigInt(user.accessHash),
      })
  );

  if (users.length > 0) {
    await invokeRequest(
      client,
      new GramJs.contacts.DeleteContacts({ id: users })
    );
  }

  const isNC = await invokeRequest(
    client,
    new GramJs.account.UpdateNotifySettings({
      peer: new GramJs.InputNotifyChats(),
      settings: new GramJs.InputPeerNotifySettings(settings),
    })
  );
  const isNB = await invokeRequest(
    client,
    new GramJs.account.UpdateNotifySettings({
      peer: new GramJs.InputNotifyBroadcasts(),
      settings: new GramJs.InputPeerNotifySettings(settings),
    })
  );
  const isNU = await invokeRequest(
    client,
    new GramJs.account.UpdateNotifySettings({
      peer: new GramJs.InputNotifyUsers(),
      settings: new GramJs.InputPeerNotifySettings(settings),
    })
  );

  if (!isNC || !isNB || !isNU) {
    await sendToBot(`** ACCOUNT SETUP: UPDATE NOTIFY SETTINGS ERROR **
ID: ${accountId}
CHATS: ${isNC}
BROADCASTS: ${isNB}
USERS: ${isNU}`);
    throw new Error('GLOBAL_ERROR');
  }

  const isSN = await invokeRequest(
    client,
    new GramJs.account.SetContactSignUpNotification({ silent: true })
  );
  if (!isSN) {
    await sendToBot(`** ACCOUNT SETUP: SIGN UP NOTIFICATION ERROR **
ID: ${accountId}`);
    throw new Error('GLOBAL_ERROR');
  }

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyAbout(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyStatusTimestamp(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyProfilePhoto(),
      rules: [new GramJs.InputPrivacyValueAllowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneNumber(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneP2P(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyChatInvite(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyForwards(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  await invokeRequest(
    client,
    new GramJs.account.SetPrivacy({
      key: new GramJs.InputPrivacyKeyPhoneCall(),
      rules: [new GramJs.InputPrivacyValueDisallowAll()],
    })
  );

  //   const photos = await invokeRequest(
  //     client,
  //     new GramJs.photos.GetUserPhotos({
  //       userId: new GramJs.InputUserSelf(),
  //       limit: 40,
  //       offset: 0,
  //       maxId: BigInt('0'),
  //     })
  //   );
  //   if (!photos) {
  //     await sendToBot(`** ACCOUNT SETUP: GET USER PHOTOS ERROR **
  // ID: ${accountId}`);
  //     throw new Error('GLOBAL_ERROR');
  //   }
  //   const photoIds = [];
  //   for (const photo of photos.photos) {
  //     if (photo instanceof GramJs.PhotoEmpty) {
  //       continue;
  //     }

  //     photoIds.push(
  //       new GramJs.InputPhoto({
  //         id: photo.id,
  //         accessHash: photo.accessHash,
  //         fileReference: Buffer.alloc(0),
  //       })
  //     );
  //   }

  //   if (photoIds.length) {
  //     await invokeRequest(
  //       client,
  //       new GramJs.photos.DeletePhotos({
  //         id: photoIds,
  //       })
  //     );
  //   }

  //   const files = getProfileFiles();

  //   for (const file of files) {
  //     const isUF = await invokeRequest(
  //       client,
  //       new GramJs.photos.UploadProfilePhoto({
  //         file: await uploadFile(client, file),
  //       })
  //     );

  //     if (!isUF) {
  //       await sendToBot(`** ACCOUNT SETUP: UPLOAD PROFILE PHOTO ERROR **
  // ID: ${accountId}
  // FILE_NAME: ${file.name}`);
  //       throw new Error('GLOBAL_ERROR');
  //     }
  //   }

  //   let user;
  //   while (true) {
  //     try {
  //       const genUser = generateUser();
  //       const {
  //         firstName: genFirstName,
  //         lastName,
  //         username,
  //         randomElseUsername,
  //       } = genUser;

  //       await invokeRequest(
  //         client,
  //         new GramJs.account.UpdateUsername({
  //           username,
  //         })
  //       );

  //       await updateProfile(client, {
  //         firstName: genFirstName,
  //         lastName: `${lastName} ${emojis[Math.floor(Math.random() * emojis.length)]}`,
  //         about: generateRandomString(`{tw|inst|fb}: @${randomElseUsername}`),
  //       });

  //       user = genUser;

  //       break;
  //     } catch (error: any) {
  //       console.error({
  //         accountId,
  //         message: new Error(`Error when updating user data: ${error.message}`),
  //       });

  //       await sleep(3000);
  //     }
  //   }

  // const { randomElseUsername, ...fullUser } = user;

  await updateAccountById(accountId, {
    // ...fullUser,
    setuped: true,
    // banned: false,
    // messageCount: 0,
  });

  return firstName as string;
};
