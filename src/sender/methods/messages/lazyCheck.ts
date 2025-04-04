import BigInt from 'big-integer';

import TelegramClient from '../../../gramjs/client/TelegramClient';
import GramJs from '../../../gramjs/tl/api';
import { Account } from '../../@types/Account';
import { updateAccountById } from '../../db/accounts';
import { sendToMainBot } from '../../helpers/sendToMainBot';
import { invokeRequest } from '../../modules/invokeRequest';
import { deleteContacts } from '../contacts/deleteContacts';
import { getContacts } from '../contacts/getContacts';
import { resolveUsername } from '../contacts/resolveUsername';
import { editFolders } from '../folders/editFolders';
import { buildInputPeer } from '../peer/buildInputPeer';
import { getDialogs } from '../users/getDialogs';
import { togglePin } from './togglePin';

const period = { period: 0 };

const isLazyCheck = (account: Account) => {
  if (!account.lazyCheckDate) {
    return true;
  }

  const days =
    (new Date().getTime() - new Date(account.lazyCheckDate).getTime()) /
    86400000;

  return days >= 1;
};

export const lazyCheck = async (client: TelegramClient, account: Account) => {
  if (!isLazyCheck(account)) {
    return;
  }

  const { accountId, personalChannel } = account;

  if (!personalChannel) {
    await invokeRequest(
      client,
      new GramJs.account.UpdatePersonalChannel({
        channel: new GramJs.InputChannelEmpty(),
      })
    );
  } else {
    const channel = await resolveUsername(client, personalChannel);

    if (!channel) {
      await sendToMainBot(
        `[${accountId}] Personal channel not found: ${personalChannel}`
      );
    }
  }

  const folderPeers = [];
  const archiveDialogs = await getDialogs(client, account.accountId, 1);
  for (const archiveDialog of archiveDialogs) {
    const { dialog } = archiveDialog;

    const peer = buildInputPeer(archiveDialog);
    if (dialog.pinned) {
      await togglePin(
        client,
        new GramJs.InputDialogPeer({
          peer,
        }),
        undefined
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
      await editFolders(client, chunk);
    }
  }

  const contacts = await getContacts(client);
  if (contacts && contacts.users.length > 0) {
    const users = [];
    for (const user of contacts.users) {
      if (user instanceof GramJs.User && user.accessHash) {
        users.push(
          new GramJs.InputPeerUser({
            userId: user.id,
            accessHash: user.accessHash,
          })
        );
      }
    }

    if (users.length > 0) {
      await deleteContacts(client, users);
    }
  }

  await invokeRequest(client, new GramJs.messages.ClearAllDrafts());

  await invokeRequest(client, new GramJs.account.ResetWebAuthorizations());

  await invokeRequest(client, new GramJs.account.DeleteAutoSaveExceptions());

  await invokeRequest(client, new GramJs.contacts.ResetSaved());

  await invokeRequest(client, new GramJs.messages.SetDefaultHistoryTTL(period));

  await invokeRequest(
    client,
    new GramJs.account.SaveAutoSaveSettings({
      users: undefined,
      chats: undefined,
      broadcasts: undefined,
      peer: new GramJs.InputPeerSelf(),
      settings: new GramJs.AutoSaveSettings({
        photos: undefined,
        videos: undefined,
        videoMaxSize: BigInt(0),
      }),
    })
  );

  await updateAccountById(accountId, {
    lazyCheckDate: new Date(),
  });
};
