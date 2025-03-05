import BigInt from 'big-integer';

import TelegramClient from '../../gramjs/client/TelegramClient';
import GramJs from '../../gramjs/tl/api';
import { Account } from '../@types/Account';
import { unsetAccountById, updateAccountById } from '../db/accounts';
import { getChannel } from '../db/channels';
import { generateCustomString } from '../helpers/generateCustomString';
import { sleep } from '../helpers/helpers';
import { resolveUsername } from '../methods/contacts/resolveUsername';
import { unBlockContact } from '../methods/contacts/unBlockContact';
import { getHistory } from '../methods/messages/getHistory';
import { sendMessage } from '../methods/messages/sendMessage';
import { invokeRequest } from './invokeRequest';

// START_BOT_CONTROLLER_MESSAGES_NOT_FOUND - 27
// START_NEW_BOT_FATHER_MESSAGES_NOT_FOUND4 - 714

const fiveMinutes = 300000; // 300000
const twoMinutes = 120000; // 120000
const halfMinute = 30000; // 30000

const isPersonalChannel = (account: Account) => {
  const { personalChannel, personalChannelDate } = account;

  if (personalChannel) {
    return false;
  }

  if (!personalChannelDate) {
    return true;
  }

  const days =
    (new Date().getTime() - new Date(personalChannelDate).getTime()) / 86400000;

  return days >= 0.25;
};

export const personalChannel = async (
  account: Account,
  client: TelegramClient
) => {
  const { accountId } = account;

  const pc = isPersonalChannel(account);
  const prefix = accountId.includes('-prefix-')
    ? accountId.split('-prefix-')[1]
    : null;

  if (!pc || !prefix) {
    return;
  }

  try {
    const channel = await getChannel(prefix);

    if (!channel) {
      throw new Error('CHANNEL_NOT_FOUND');
    }

    if (!/^[a-zA-Z0-9]+$/.test(channel)) {
      throw new Error('CHANNEL_NOT_VALID');
    }

    const parentChannel = await resolveUsername(client, channel);
    if (!parentChannel) {
      throw new Error('PARENT_CHANNEL_NOT_FOUND');
    }

    const parentChannelChat = parentChannel.chats?.[0];
    if (
      !parentChannelChat ||
      !(parentChannelChat instanceof GramJs.Channel) ||
      !parentChannelChat.accessHash
    ) {
      throw new Error('PARENT_CHANNEL_ID_NOT_FOUND');
    }

    const fullParentChannel = await invokeRequest(
      client,
      new GramJs.channels.GetFullChannel({
        channel: new GramJs.InputChannel({
          channelId: parentChannelChat.id,
          accessHash: parentChannelChat.accessHash,
        }),
      })
    );

    if (!fullParentChannel) {
      throw new Error('FULL_PARENT_CHANNEL_NOT_FOUND');
    }

    const { title } = parentChannelChat;
    const { chatPhoto, about } = fullParentChannel.fullChat;

    if (
      !title ||
      !about ||
      !chatPhoto ||
      !(chatPhoto instanceof GramJs.Photo)
    ) {
      throw new Error('CHANNEL_DATA_NOT_FOUND');
    }

    const channels = await invokeRequest(
      client,
      new GramJs.channels.GetAdminedPublicChannels({})
    );

    if (!channels) {
      throw new Error('CHANNELS_NOT_FOUND');
    }

    for (const chat of channels.chats) {
      if (!chat || !(chat instanceof GramJs.Channel) || !chat.accessHash) {
        throw new Error('CHANNEL_NOT_DEFINED');
      }

      await invokeRequest(
        client,
        new GramJs.channels.DeleteChannel({
          channel: new GramJs.InputChannel({
            channelId: chat.id,
            accessHash: chat.accessHash,
          }),
        }),
        { shouldIgnoreErrors: true }
      );
    }

    const fullChannel = await invokeRequest(
      client,
      new GramJs.channels.CreateChannel({
        broadcast: true,
        title,
        about,
      }),
      { shouldIgnoreErrors: true }
    );

    if (!fullChannel || !(fullChannel instanceof GramJs.Updates)) {
      throw new Error('CHANNEL_NOT_CREATED');
    }

    const newChannel = fullChannel.chats[0];
    if (
      !newChannel ||
      !(newChannel instanceof GramJs.Channel) ||
      !newChannel.accessHash
    ) {
      throw new Error('CHANNEL_CHATS_NOT_DEFINED');
    }

    const username = generateCustomString();
    const channelUsername = await invokeRequest(
      client,
      new GramJs.channels.UpdateUsername({
        channel: new GramJs.InputChannel({
          channelId: newChannel.id,
          accessHash: newChannel.accessHash,
        }),
        username,
      }),
      { shouldIgnoreErrors: true }
    );

    if (!channelUsername) {
      throw new Error('CHANNEL_USERNAME_NOT_DEFINED');
    }

    const editPhoto = await invokeRequest(
      client,
      new GramJs.channels.EditPhoto({
        channel: new GramJs.InputChannel({
          channelId: newChannel.id,
          accessHash: newChannel.accessHash,
        }),
        photo: new GramJs.InputChatPhoto({
          id: new GramJs.InputPhoto({
            id: chatPhoto.id,
            accessHash: chatPhoto.accessHash,
            fileReference: chatPhoto.fileReference,
          }),
        }),
      })
    );

    if (!editPhoto || !(editPhoto instanceof GramJs.Updates)) {
      throw new Error('CHANNEL_PHOTO_NOT_EDITED');
    }

    const newChannelHistory = await invokeRequest(
      client,
      new GramJs.messages.GetHistory({
        peer: new GramJs.InputPeerChannel({
          channelId: newChannel.id,
          accessHash: newChannel.accessHash,
        }),

        minId: 0,
      })
    );

    if (
      !newChannelHistory ||
      newChannelHistory instanceof GramJs.messages.MessagesNotModified
    ) {
      throw new Error('NEW_CHANNEL_HISTORY_NOT_FOUND');
    }

    await invokeRequest(
      client,
      new GramJs.channels.DeleteMessages({
        channel: new GramJs.InputChannel({
          channelId: newChannel.id,
          accessHash: newChannel.accessHash,
        }),
        id: newChannelHistory.messages.map((m) => m.id),
      })
    );

    const parentChannelHistory = await invokeRequest(
      client,
      new GramJs.messages.GetHistory({
        peer: new GramJs.InputPeerChannel({
          channelId: parentChannelChat.id,
          accessHash: parentChannelChat.accessHash,
        }),
        addOffset: -1,
        minId: 0,
      })
    );

    if (
      !parentChannelHistory ||
      parentChannelHistory instanceof GramJs.messages.MessagesNotModified
    ) {
      throw new Error('PARENT_CHANNEL_HISTORY_NOT_FOUND');
    }

    const parentChannelMessages = parentChannelHistory.messages.filter(
      (m) => m instanceof GramJs.Message
    );

    if (!parentChannelMessages.length) {
      throw new Error('MINIMAL_MESSAGES_NOT_FOUND');
    }

    const [lastMessage, ...anotherMessages] = parentChannelMessages;
    const ids: number[] = [];
    const processedGroupIds = new Set<string>();

    let processedCount = 0;
    let currentIndex = 0;

    const buttons =
      lastMessage.replyMarkup instanceof GramJs.ReplyInlineMarkup
        ? lastMessage.replyMarkup.rows
            .map((row) =>
              row.buttons
                .filter(
                  (button): button is GramJs.KeyboardButtonUrl =>
                    button instanceof GramJs.KeyboardButtonUrl
                )
                .map((button) => ({
                  text: button.text,
                  url: button.url,
                }))
            )
            .filter((row) => row.length)
        : [];

    if (!lastMessage.message || !buttons.length) {
      if (lastMessage.groupedId) {
        const groupIdStr = String(lastMessage.groupedId);
        const groupedMessages = parentChannelMessages.filter(
          (m) => String(m.groupedId) === groupIdStr
        );
        ids.push(...groupedMessages.map((m) => m.id));
        processedGroupIds.add(groupIdStr);
      } else {
        ids.push(lastMessage.id);
      }
    }

    while (processedCount < 4 && currentIndex < anotherMessages.length) {
      const message = anotherMessages[currentIndex];
      currentIndex++;

      if (message.groupedId) {
        const groupIdStr = String(message.groupedId);
        if (!processedGroupIds.has(groupIdStr)) {
          const groupedMessages = anotherMessages.filter(
            (m) => String(m.groupedId) === groupIdStr
          );
          ids.push(...groupedMessages.map((m) => m.id));
          processedGroupIds.add(groupIdStr);
          processedCount++;
        }
      } else {
        ids.push(message.id);
        processedCount++;
      }
    }

    if (ids.length) {
      const forwardedMessages = await invokeRequest(
        client,
        new GramJs.messages.ForwardMessages({
          fromPeer: new GramJs.InputPeerChannel({
            channelId: parentChannelChat.id,
            accessHash: parentChannelChat.accessHash,
          }),
          toPeer: new GramJs.InputPeerChannel({
            channelId: newChannel.id,
            accessHash: newChannel.accessHash,
          }),
          randomId: ids.map(() =>
            BigInt(Math.floor(Math.random() * 10 ** 10) + 10 ** 10)
          ),
          id: ids,
          dropAuthor: true,
        })
      );

      if (!forwardedMessages) {
        throw new Error('FORWARDED_MESSAGES_NOT_FOUND');
      }
    }

    if (lastMessage.message && buttons.length) {
      await new Promise((r) =>
        setTimeout(r, (Math.floor(Math.random() * 300) + 1) * 1000)
      );

      const botFather = await resolveUsername(client, 'botfather');
      if (
        !botFather ||
        !botFather.users.length ||
        !(botFather.users[0] instanceof GramJs.User)
      ) {
        throw new Error('BOT_FATHER_NOT_USER');
      }

      const {
        id: botFatherUserId,
        accessHash: botFatherAccessHash,
        username: botFatherUsername,
      } = botFather.users[0];
      if (
        !botFatherAccessHash ||
        !botFatherUsername ||
        botFatherUsername !== 'BotFather'
      ) {
        throw new Error('BOT_FATHER_NOT_FOUND');
      }

      await unBlockContact(
        client,
        new GramJs.InputPeerUser({
          userId: botFatherUserId,
          accessHash: botFatherAccessHash,
        })
      );

      const startBotFatherMessage = await sendMessage(
        client,
        String(botFatherUserId),
        String(botFatherAccessHash),
        '/start',
        '',
        false,
        false
      );

      await sleep(halfMinute);
      const startBotFatherMessages = await getHistory(
        client,
        String(botFatherUserId),
        String(botFatherAccessHash),
        startBotFatherMessage.id
      );

      if (
        !startBotFatherMessages[0] ||
        !startBotFatherMessages[0].message.includes('Telegram bots')
      ) {
        throw new Error('START_BOT_FATHER_MESSAGES_NOT_FOUND');
      }

      while (true) {
        const deleteBotFatherMessage = await sendMessage(
          client,
          String(botFatherUserId),
          String(botFatherAccessHash),
          '/deletebot',
          '',
          false,
          false
        );

        await sleep(halfMinute);
        const deleteBotFatherMessages = await getHistory(
          client,
          String(botFatherUserId),
          String(botFatherAccessHash),
          deleteBotFatherMessage.id
        );

        if (!deleteBotFatherMessages[0]) {
          throw new Error('DELETE_BOT_FATHER_MESSAGES_NOT_FOUND');
        }

        if (
          deleteBotFatherMessages[0].message.includes(
            "You don't have any bots yet"
          )
        ) {
          break;
        }

        if (
          !deleteBotFatherMessages[0].message.includes('Choose a bot to delete')
        ) {
          throw new Error('CHOOSE_BOT_FATHER_MESSAGES_NOT_FOUND');
        }

        const { replyMarkup: deleteBotFatherReplyMarkup } =
          deleteBotFatherMessages[0];

        if (deleteBotFatherReplyMarkup instanceof GramJs.ReplyKeyboardMarkup) {
          const { rows } = deleteBotFatherReplyMarkup;
          const buttons = rows
            .flatMap((row) => row.buttons)
            .map((button) => button.text);
          if (!buttons[0]) {
            throw new Error('DELETE_BOT_FATHER_BUTTONS_NOT_FOUND');
          }

          const deleteBotFatherMessage = await sendMessage(
            client,
            String(botFatherUserId),
            String(botFatherAccessHash),
            buttons[0],
            '',
            false,
            false
          );

          await sleep(halfMinute);
          const deleteBotFatherMessages = await getHistory(
            client,
            String(botFatherUserId),
            String(botFatherAccessHash),
            deleteBotFatherMessage.id
          );

          if (
            !deleteBotFatherMessages[0] ||
            !deleteBotFatherMessages[0].message.includes('OK, you selected')
          ) {
            throw new Error('PROCESS_DELETE_BOT_FATHER_MESSAGES_NOT_FOUND');
          }

          const sureBotFatherMessage = await sendMessage(
            client,
            String(botFatherUserId),
            String(botFatherAccessHash),
            'Yes, I am totally sure.',
            '',
            false,
            false
          );

          await sleep(halfMinute);
          const sureBotFatherMessages = await getHistory(
            client,
            String(botFatherUserId),
            String(botFatherAccessHash),
            sureBotFatherMessage.id
          );

          if (
            !sureBotFatherMessages[0] ||
            !sureBotFatherMessages[0].message.includes('Done! The bot is gone')
          ) {
            throw new Error('DONE_DELETE_BOT_FATHER_MESSAGES_NOT_FOUND');
          }
        }
      }

      const newBotFatherMessage = await sendMessage(
        client,
        String(botFatherUserId),
        String(botFatherAccessHash),
        '/newbot',
        '',
        false,
        false
      );

      await sleep(halfMinute);
      const newBotFatherMessages = await getHistory(
        client,
        String(botFatherUserId),
        String(botFatherAccessHash),
        newBotFatherMessage.id
      );

      if (
        !newBotFatherMessages[0] ||
        !newBotFatherMessages[0].message.includes('new bot')
      ) {
        throw new Error('NEW_BOT_FATHER_MESSAGES_NOT_FOUND');
      }

      const fatherBotUsername = `${generateCustomString(20)}_bot`;
      const nameBotFatherMessage = await sendMessage(
        client,
        String(botFatherUserId),
        String(botFatherAccessHash),
        fatherBotUsername,
        '',
        false,
        false
      );

      await sleep(halfMinute);
      const nameBotFatherMessages = await getHistory(
        client,
        String(botFatherUserId),
        String(botFatherAccessHash),
        nameBotFatherMessage.id
      );

      if (
        !nameBotFatherMessages[0] ||
        !nameBotFatherMessages[0].message.includes(
          'choose a username for your bot'
        )
      ) {
        throw new Error('NAME_BOT_FATHER_MESSAGES_NOT_FOUND');
      }

      const usernameBotFatherMessage = await sendMessage(
        client,
        String(botFatherUserId),
        String(botFatherAccessHash),
        fatherBotUsername,
        '',
        false,
        false
      );

      await sleep(halfMinute);
      const usernameBotFatherMessages = await getHistory(
        client,
        String(botFatherUserId),
        String(botFatherAccessHash),
        usernameBotFatherMessage.id
      );

      if (
        !usernameBotFatherMessages[0] ||
        !usernameBotFatherMessages[0].message.includes('Done!')
      ) {
        throw new Error('USERNAME_BOT_FATHER_MESSAGES_NOT_FOUND');
      }

      const tokenBotFatherMessage =
        usernameBotFatherMessages[0].message.match(
          /Use this token to access the HTTP API:\n([^\n]+)/
        )?.[1] || null;

      if (!tokenBotFatherMessage) {
        throw new Error('TOKEN_BOT_FATHER_NOT_FOUND');
      }

      const newBotFather = await resolveUsername(client, fatherBotUsername);
      if (
        !newBotFather ||
        !newBotFather.users.length ||
        !(newBotFather.users[0] instanceof GramJs.User)
      ) {
        throw new Error('NEW_BOT_FATHER_NOT_USER');
      }

      const {
        id: newBotFatherUserId,
        accessHash: newBotFatherAccessHash,
        username: newBotFatherUsername,
      } = newBotFather.users[0];
      if (!newBotFatherAccessHash || !newBotFatherUsername) {
        throw new Error('NEW_BOT_FATHER_NOT_FOUND');
      }

      const adminedBot = await invokeRequest(
        client,
        new GramJs.channels.EditAdmin({
          channel: new GramJs.InputPeerChannel({
            channelId: newChannel.id,
            accessHash: newChannel.accessHash,
          }),
          userId: new GramJs.InputPeerUser({
            userId: newBotFatherUserId,
            accessHash: newBotFatherAccessHash,
          }),
          adminRights: new GramJs.ChatAdminRights({
            addAdmins: true,
            anonymous: undefined,
            banUsers: true,
            changeInfo: true,
            deleteMessages: true,
            deleteStories: true,
            editMessages: true,
            editStories: true,
            inviteUsers: true,
            manageCall: true,
            manageTopics: true,
            other: true,
            pinMessages: true,
            postMessages: true,
            postStories: true,
          }),
          rank: '',
        })
      );

      if (!adminedBot) {
        throw new Error('ADMIN_BOT_NOT_SETUPED');
      }

      const botController = await resolveUsername(client, 'controllerbot');
      if (
        !botController ||
        !botController.users.length ||
        !(botController.users[0] instanceof GramJs.User)
      ) {
        throw new Error('BOT_CONTROLLER_NOT_USER');
      }

      const {
        id: botControllerUserId,
        accessHash: botControllerAccessHash,
        username: botControllerUsername,
      } = botController.users[0];
      if (
        !botControllerAccessHash ||
        !botControllerUsername ||
        botControllerUsername !== 'ControllerBot'
      ) {
        throw new Error('BOT_CONTROLLER_NOT_FOUND');
      }

      await unBlockContact(
        client,
        new GramJs.InputPeerUser({
          userId: botControllerUserId,
          accessHash: botControllerAccessHash,
        })
      );

      const startBotControllerMessage = await sendMessage(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        '/start',
        '',
        false,
        false
      );

      await sleep(twoMinutes);
      const startBotControllerMessages = await getHistory(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        startBotControllerMessage.id
      );

      if (!startBotControllerMessages[0]) {
        throw new Error('START_BOT_CONTROLLER_MESSAGES_NOT_FOUND');
      }

      const settingsBotControllerMessage = await sendMessage(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        '/settings',
        '',
        false,
        false
      );

      await sleep(twoMinutes);
      const settingsBotControllerMessages = await getHistory(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        settingsBotControllerMessage.id
      );

      if (!settingsBotControllerMessages[0]) {
        throw new Error('SETTINGS_BOT_CONTROLLER_MESSAGES_NOT_FOUND');
      }

      const { replyMarkup: settingsBotControllerReplyMarkup } =
        settingsBotControllerMessages[0];

      if (
        settingsBotControllerReplyMarkup instanceof GramJs.ReplyInlineMarkup
      ) {
        const { rows } = settingsBotControllerReplyMarkup;

        if (rows.length !== 2) {
          throw new Error('SETTINGS_BOT_CONTROLLER_NOT_MINIMAL_2_MESSAGES');
        }

        const lastRow = rows[rows.length - 1];
        const lastButton = lastRow.buttons[lastRow.buttons.length - 1];

        if (!(lastButton instanceof GramJs.KeyboardButtonCallback)) {
          throw new Error('SETTINGS_BOT_FATHER_LAST_BUTTON_NOT_FOUND');
        }

        await invokeRequest(
          client,
          new GramJs.messages.GetBotCallbackAnswer({
            peer: new GramJs.InputPeerUser({
              userId: botControllerUserId,
              accessHash: botControllerAccessHash,
            }),
            msgId: settingsBotControllerMessages[0].id,
            data: lastButton.data,
            game: undefined,
          }),
          { shouldIgnoreErrors: true }
        );

        await sleep(halfMinute);
        const settings2BotControllerMessages = await getHistory(
          client,
          String(botControllerUserId),
          String(botControllerAccessHash),
          settingsBotControllerMessage.id
        );

        if (!settings2BotControllerMessages[0]) {
          throw new Error('SETTINGS2_BOT_CONTROLLER_MESSAGES_NOT_FOUND');
        }

        const { replyMarkup: settings2BotControllerReplyMarkup } =
          settings2BotControllerMessages[0];

        if (
          settings2BotControllerReplyMarkup instanceof GramJs.ReplyInlineMarkup
        ) {
          const { rows } = settings2BotControllerReplyMarkup;
          for (const row of rows) {
            const { buttons } = row;
            for (const button of buttons) {
              if (
                button instanceof GramJs.KeyboardButtonCallback &&
                button.text === 'English'
              ) {
                await invokeRequest(
                  client,
                  new GramJs.messages.GetBotCallbackAnswer({
                    peer: new GramJs.InputPeerUser({
                      userId: botControllerUserId,
                      accessHash: botControllerAccessHash,
                    }),
                    msgId: settings2BotControllerMessages[0].id,
                    data: button.data,
                    game: undefined,
                  }),
                  { shouldIgnoreErrors: true }
                );
              }
            }
          }
        }
      }

      const addChannelBotControllerMessage = await sendMessage(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        '/addchannel',
        '',
        false,
        false
      );

      await sleep(twoMinutes);
      const addChannelBotControllerMessages = await getHistory(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        addChannelBotControllerMessage.id
      );

      if (!addChannelBotControllerMessages[0]) {
        throw new Error('ADD_CHANNEL_BOT_CONTROLLER_MESSAGES_NOT_FOUND');
      }

      if (
        addChannelBotControllerMessages[0].message.includes(
          'Adding a channel'
        ) ||
        addChannelBotControllerMessages[0].message.includes('Choose a bot')
      ) {
        if (
          addChannelBotControllerMessages[0].message.includes(
            'Adding a channel'
          )
        ) {
          const { replyMarkup: addChannelBotControllerReplyMarkup } =
            addChannelBotControllerMessages[0];

          if (
            addChannelBotControllerReplyMarkup instanceof
            GramJs.ReplyInlineMarkup
          ) {
            const { rows } = addChannelBotControllerReplyMarkup;
            for (const row of rows) {
              const { buttons } = row;
              for (const button of buttons) {
                if (
                  button instanceof GramJs.KeyboardButtonCallback &&
                  button.text === 'Change Bot'
                ) {
                  await invokeRequest(
                    client,
                    new GramJs.messages.GetBotCallbackAnswer({
                      peer: new GramJs.InputPeerUser({
                        userId: botControllerUserId,
                        accessHash: botControllerAccessHash,
                      }),
                      msgId: addChannelBotControllerMessages[0].id,
                      data: button.data,
                      game: undefined,
                    }),
                    { shouldIgnoreErrors: true }
                  );
                }
              }
            }
          }
        }

        await sleep(halfMinute);
        const addChannelBotControllerMessages2 = await getHistory(
          client,
          String(botControllerUserId),
          String(botControllerAccessHash),
          addChannelBotControllerMessage.id
        );

        if (!addChannelBotControllerMessages2[0]) {
          throw new Error('ADD_CHANNEL_BOT_CONTROLLER_MESSAGES_NOT_FOUND2');
        }

        if (
          !addChannelBotControllerMessages2[0].message.includes('Choose a bot')
        ) {
          throw new Error('CHOOSE_BOT_CONTROLLER_MESSAGES_NOT_FOUND');
        }
        const { replyMarkup: addChannelBotControllerReplyMarkup2 } =
          addChannelBotControllerMessages2[0];

        if (
          addChannelBotControllerReplyMarkup2 instanceof
          GramJs.ReplyInlineMarkup
        ) {
          const { rows } = addChannelBotControllerReplyMarkup2;
          for (const row of rows) {
            const { buttons } = row;
            for (const button of buttons) {
              if (
                button instanceof GramJs.KeyboardButtonCallback &&
                button.text === 'Connect Bot'
              ) {
                await invokeRequest(
                  client,
                  new GramJs.messages.GetBotCallbackAnswer({
                    peer: new GramJs.InputPeerUser({
                      userId: botControllerUserId,
                      accessHash: botControllerAccessHash,
                    }),
                    msgId: addChannelBotControllerMessages2[0].id,
                    data: button.data,
                    game: undefined,
                  }),
                  { shouldIgnoreErrors: true }
                );
              }
            }
          }
        }

        await sleep(halfMinute);
        const addChannelBotControllerMessages3 = await getHistory(
          client,
          String(botControllerUserId),
          String(botControllerAccessHash),
          addChannelBotControllerMessage.id
        );

        if (
          !addChannelBotControllerMessages3[0] ||
          !addChannelBotControllerMessages3[0].message.includes(
            'Connecting a bot'
          )
        ) {
          throw new Error(
            'CONNECT_ADD_CHANNEL_BOT_CONTROLLER_MESSAGES_NOT_FOUND3'
          );
        }
      } else if (
        !addChannelBotControllerMessages[0].message.includes('Connecting a bot')
      ) {
        throw new Error(
          'CONNECT_ADD_CHANNEL_BOT_CONTROLLER_MESSAGES_NOT_FOUND'
        );
      }

      const tokenBotControllerMessage = await sendMessage(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        tokenBotFatherMessage,
        '',
        false,
        false,
        false
      );

      await sleep(fiveMinutes);
      const tokenBotControllerMessages = await getHistory(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        tokenBotControllerMessage.id
      );

      if (
        !tokenBotControllerMessages[0] ||
        !tokenBotControllerMessages[0].message.includes('Adding a channel')
      ) {
        throw new Error('TOKEN_BOT_CONTROLLER_MESSAGES_NOT_FOUND');
      }

      const usernameBotControllerMessage = await sendMessage(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        `t.me/${username}`,
        '',
        false,
        false,
        false
      );

      await sleep(halfMinute);
      const usernameBotControllerMessages = await getHistory(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        usernameBotControllerMessage.id
      );

      if (
        usernameBotControllerMessages?.[0]?.message?.includes(
          'Setting the time zone'
        )
      ) {
        const usernameBotControllerMessage = await sendMessage(
          client,
          String(botControllerUserId),
          String(botControllerAccessHash),
          `Moskow`,
          '',
          false,
          false,
          false
        );

        await sleep(halfMinute);
        const usernameBotControllerMessages = await getHistory(
          client,
          String(botControllerUserId),
          String(botControllerAccessHash),
          usernameBotControllerMessage.id
        );

        if (
          !usernameBotControllerMessages[0] ||
          !usernameBotControllerMessages[0].message.includes('Is it right')
        ) {
          throw new Error('YES_BOT_CONTROLLER_MESSAGES_NOT_FOUND');
        }

        const { replyMarkup: usernameBotControllerReplyMarkup } =
          usernameBotControllerMessages[0];

        if (
          usernameBotControllerReplyMarkup instanceof GramJs.ReplyInlineMarkup
        ) {
          const { rows } = usernameBotControllerReplyMarkup;
          for (const row of rows) {
            const { buttons } = row;
            for (const button of buttons) {
              if (
                button instanceof GramJs.KeyboardButtonCallback &&
                button.text === "Yes, It's Right"
              ) {
                await invokeRequest(
                  client,
                  new GramJs.messages.GetBotCallbackAnswer({
                    peer: new GramJs.InputPeerUser({
                      userId: botControllerUserId,
                      accessHash: botControllerAccessHash,
                    }),
                    msgId: usernameBotControllerMessages[0].id,
                    data: button.data,
                    game: undefined,
                  }),
                  { shouldIgnoreErrors: true }
                );
              }
            }
          }
        }

        await sleep(halfMinute);
        const usernameBotControllerMessages2 = await getHistory(
          client,
          String(botControllerUserId),
          String(botControllerAccessHash),
          usernameBotControllerMessage.id
        );

        if (
          !usernameBotControllerMessages2[0] ||
          !usernameBotControllerMessages2[0].message.includes('Success!')
        ) {
          throw new Error('YES_BOT_CONTROLLER_MESSAGES_NOT_FOUND2');
        }
      }

      const myChannelsBotFatherMessage = await sendMessage(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        '/mychannels',
        '',
        false,
        false
      );

      await sleep(twoMinutes);
      const myChannelsBotFatherMessages = await getHistory(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        myChannelsBotFatherMessage.id
      );

      if (
        !myChannelsBotFatherMessages[0] ||
        !myChannelsBotFatherMessages[0].message.includes('Channel managment')
      ) {
        throw new Error('MY_REAL_CHANNELS_BOT_FATHER_MESSAGES_NOT_FOUND');
      }

      const { replyMarkup: myChannelsBotFatherReplyMarkup } =
        myChannelsBotFatherMessages[0];

      if (myChannelsBotFatherReplyMarkup instanceof GramJs.ReplyInlineMarkup) {
        const { rows } = myChannelsBotFatherReplyMarkup;

        if (rows.length < 2) {
          throw new Error('MY_CHANNELS_BOT_FATHER_NOT_MINIMAL_2_MESSAGES');
        }

        const lastRow = rows[rows.length - 1];
        const lastButton = lastRow.buttons[lastRow.buttons.length - 1];

        if (!(lastButton instanceof GramJs.KeyboardButtonCallback)) {
          throw new Error('MY_CHANNELS_BOT_FATHER_LAST_BUTTON_NOT_FOUND');
        }

        if (lastButton.text === '»') {
          await invokeRequest(
            client,
            new GramJs.messages.GetBotCallbackAnswer({
              peer: new GramJs.InputPeerUser({
                userId: botControllerUserId,
                accessHash: botControllerAccessHash,
              }),
              msgId: myChannelsBotFatherMessages[0].id,
              data: lastButton.data,
              game: undefined,
            }),
            { shouldIgnoreErrors: true }
          );

          await sleep(halfMinute);
          const myChannelsBotFatherMessagesw = await getHistory(
            client,
            String(botControllerUserId),
            String(botControllerAccessHash),
            myChannelsBotFatherMessage.id
          );

          if (
            !myChannelsBotFatherMessagesw[0] ||
            !myChannelsBotFatherMessagesw[0].message.includes(
              'Channel managment'
            )
          ) {
            throw new Error('MY_CHANNELS_BOT_FATHER_MESSAGES_NOT_FOUND2222');
          }

          const { replyMarkup: myChannelsBotFatherReplyMarkup } =
            myChannelsBotFatherMessagesw[0];

          if (
            myChannelsBotFatherReplyMarkup instanceof GramJs.ReplyInlineMarkup
          ) {
            const { rows } = myChannelsBotFatherReplyMarkup;

            const lastRow = rows[rows.length - 2];
            const lastButton = lastRow.buttons[lastRow.buttons.length - 1];

            if (
              !lastButton ||
              !(lastButton instanceof GramJs.KeyboardButtonCallback)
            ) {
              throw new Error(
                'MY_CHANNELS_BOT_FATHER_LAST_BUTTON_NOT_FOUND22222'
              );
            }
            await invokeRequest(
              client,
              new GramJs.messages.GetBotCallbackAnswer({
                peer: new GramJs.InputPeerUser({
                  userId: botControllerUserId,
                  accessHash: botControllerAccessHash,
                }),
                msgId: myChannelsBotFatherMessagesw[0].id,
                data: lastButton.data,
                game: undefined,
              }),
              { shouldIgnoreErrors: true }
            );
          }
        } else {
          await invokeRequest(
            client,
            new GramJs.messages.GetBotCallbackAnswer({
              peer: new GramJs.InputPeerUser({
                userId: botControllerUserId,
                accessHash: botControllerAccessHash,
              }),
              msgId: myChannelsBotFatherMessages[0].id,
              data: lastButton.data,
              game: undefined,
            }),
            { shouldIgnoreErrors: true }
          );
        }
      }

      await sleep(halfMinute);
      const myChannelsBotFatherMessages2 = await getHistory(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        myChannelsBotFatherMessage.id
      );

      if (
        !myChannelsBotFatherMessages2[0] ||
        !myChannelsBotFatherMessages2[0].message.includes(
          'What do you want to do with the channel'
        )
      ) {
        throw new Error('MY_CHANNELS_BOT_FATHER_MESSAGES_NOT_FOUND23');
      }

      const { replyMarkup: myChannelsBotFatherReplyMarkup2 } =
        myChannelsBotFatherMessages2[0];

      if (myChannelsBotFatherReplyMarkup2 instanceof GramJs.ReplyInlineMarkup) {
        const { rows } = myChannelsBotFatherReplyMarkup2;
        for (const row of rows) {
          const { buttons } = row;
          for (const button of buttons) {
            if (
              button instanceof GramJs.KeyboardButtonCallback &&
              button.text === 'Change Time Zone'
            ) {
              await invokeRequest(
                client,
                new GramJs.messages.GetBotCallbackAnswer({
                  peer: new GramJs.InputPeerUser({
                    userId: botControllerUserId,
                    accessHash: botControllerAccessHash,
                  }),
                  msgId: myChannelsBotFatherMessages2[0].id,
                  data: button.data,
                  game: undefined,
                }),
                { shouldIgnoreErrors: true }
              );
            }
          }
        }
      }

      await sleep(halfMinute);
      const myChannelsBotFatherMessages3 = await getHistory(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        myChannelsBotFatherMessage.id
      );

      if (
        !myChannelsBotFatherMessages3[0] ||
        !myChannelsBotFatherMessages3[0].message.includes('Current time zone')
      ) {
        throw new Error('MY_CHANNELS_BOT_FATHER_MESSAGES_NOT_FOUND3');
      }

      const moskowBotControllerMessage = await sendMessage(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        `Moskow`,
        '',
        false,
        false,
        false
      );

      await sleep(halfMinute);
      const moskowBotControllerMessages = await getHistory(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        moskowBotControllerMessage.id
      );

      if (
        !moskowBotControllerMessages[0] ||
        !moskowBotControllerMessages[0].message.includes('Is it right')
      ) {
        throw new Error('YES_MOSKOW_BOT_CONTROLLER_MESSAGES_NOT_FOUND');
      }

      const { replyMarkup: moskowBotControllerReplyMarkup } =
        moskowBotControllerMessages[0];

      if (moskowBotControllerReplyMarkup instanceof GramJs.ReplyInlineMarkup) {
        const { rows } = moskowBotControllerReplyMarkup;
        for (const row of rows) {
          const { buttons } = row;
          for (const button of buttons) {
            if (
              button instanceof GramJs.KeyboardButtonCallback &&
              button.text === "Yes, It's Right"
            ) {
              await invokeRequest(
                client,
                new GramJs.messages.GetBotCallbackAnswer({
                  peer: new GramJs.InputPeerUser({
                    userId: botControllerUserId,
                    accessHash: botControllerAccessHash,
                  }),
                  msgId: moskowBotControllerMessages[0].id,
                  data: button.data,
                  game: undefined,
                }),
                { shouldIgnoreErrors: true }
              );
            }
          }
        }
      }

      await sleep(halfMinute);
      const myChannelsBotFatherMessages4 = await getHistory(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        moskowBotControllerMessage.id
      );

      if (
        !myChannelsBotFatherMessages4[0] ||
        !myChannelsBotFatherMessages4[0].message.includes('Here it is')
      ) {
        throw new Error('MY_CHANNELS_BOT_FATHER_MESSAGES_NOT_FOUND4');
      }

      const startNewBotFatherMessage = await sendMessage(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        '/start',
        '',
        false,
        false
      );

      await sleep(halfMinute);
      const startNewBotFatherMessages = await getHistory(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        startNewBotFatherMessage.id
      );

      if (
        !startNewBotFatherMessages[0] ||
        !startNewBotFatherMessages[0].message.includes(
          'Here you can create rich posts'
        )
      ) {
        throw new Error('START_NEW_BOT_FATHER_MESSAGES_NOT_FOUND');
      }

      const { replyMarkup: startNewBotFatherReplyMarkup } =
        startNewBotFatherMessages[0];

      if (startNewBotFatherReplyMarkup instanceof GramJs.ReplyInlineMarkup) {
        const { rows } = startNewBotFatherReplyMarkup;

        for (const row of rows) {
          const { buttons } = row;
          for (const button of buttons) {
            if (
              button instanceof GramJs.KeyboardButtonCallback &&
              button.text === 'Create Post'
            ) {
              await invokeRequest(
                client,
                new GramJs.messages.GetBotCallbackAnswer({
                  peer: new GramJs.InputPeerUser({
                    userId: newBotFatherUserId,
                    accessHash: newBotFatherAccessHash,
                  }),
                  msgId: startNewBotFatherMessages[0].id,
                  data: button.data,
                  game: undefined,
                }),
                { shouldIgnoreErrors: true }
              );
            }
          }
        }
      }

      await sleep(halfMinute);
      const startNewBotFatherMessages2 = await getHistory(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        startNewBotFatherMessage.id
      );

      if (
        !startNewBotFatherMessages2[0] ||
        !startNewBotFatherMessages2[0].message.includes(
          'Choose a channel to create a new post'
        )
      ) {
        throw new Error('START_NEW_BOT_FATHER_MESSAGES_NOT_FOUND2');
      }

      const { replyMarkup: startNewBotFatherReplyMarkup2 } =
        startNewBotFatherMessages2[0];

      if (startNewBotFatherReplyMarkup2 instanceof GramJs.ReplyInlineMarkup) {
        const { rows } = startNewBotFatherReplyMarkup2;
        for (const row of rows) {
          const { buttons } = row;
          for (const button of buttons) {
            if (
              button instanceof GramJs.KeyboardButtonCallback &&
              button.text.includes(title)
            ) {
              await invokeRequest(
                client,
                new GramJs.messages.GetBotCallbackAnswer({
                  peer: new GramJs.InputPeerUser({
                    userId: newBotFatherUserId,
                    accessHash: newBotFatherAccessHash,
                  }),
                  msgId: startNewBotFatherMessages2[0].id,
                  data: button.data,
                  game: undefined,
                }),
                { shouldIgnoreErrors: true }
              );
            }
          }
        }
      }

      await sleep(halfMinute);
      const startNewBotFatherMessages3 = await getHistory(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        startNewBotFatherMessage.id
      );

      if (!startNewBotFatherMessages3[0]) {
        throw new Error('START_NEW_BOT_FATHER_MESSAGES_NOT_FOUND3');
      }

      if (startNewBotFatherMessages3[0].message.includes('used by default')) {
        const { replyMarkup: startNewBotFatherReplyMarkup3 } =
          startNewBotFatherMessages3[0];

        if (startNewBotFatherReplyMarkup3 instanceof GramJs.ReplyInlineMarkup) {
          const { rows } = startNewBotFatherReplyMarkup3;
          for (const row of rows) {
            const { buttons } = row;
            for (const button of buttons) {
              if (
                button instanceof GramJs.KeyboardButtonCallback &&
                button.text.includes('Continue')
              ) {
                await invokeRequest(
                  client,
                  new GramJs.messages.GetBotCallbackAnswer({
                    peer: new GramJs.InputPeerUser({
                      userId: newBotFatherUserId,
                      accessHash: newBotFatherAccessHash,
                    }),
                    msgId: startNewBotFatherMessages3[0].id,
                    data: button.data,
                    game: undefined,
                  }),
                  { shouldIgnoreErrors: true }
                );
              }
            }
          }
        }
      }

      await sleep(halfMinute);
      const startNewBotFatherMessages4 = await getHistory(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        startNewBotFatherMessage.id
      );

      if (
        !startNewBotFatherMessages4[0] ||
        !startNewBotFatherMessages4[0].message.includes('Here it is')
      ) {
        throw new Error('START_NEW_BOT_FATHER_MESSAGES_NOT_FOUND4');
      }

      const lastMessageNewBotFatherMessage = await sendMessage(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        lastMessage.message,
        '',
        false,
        false,
        false,
        lastMessage.entities
      );

      await sleep(halfMinute);
      const lastMessageNewBotFatherMessages = await getHistory(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        lastMessageNewBotFatherMessage.id
      );

      if (!lastMessageNewBotFatherMessages[0]) {
        throw new Error('LAST_MESSAGE_NEW_BOT_FATHER_MESSAGES_NOT_FOUND');
      }

      const { replyMarkup: lastMessageNewBotFatherReplyMarkup } =
        lastMessageNewBotFatherMessages[0];

      if (
        lastMessageNewBotFatherReplyMarkup instanceof GramJs.ReplyInlineMarkup
      ) {
        const { rows } = lastMessageNewBotFatherReplyMarkup;
        for (const row of rows) {
          const { buttons } = row;
          for (const button of buttons) {
            if (
              button instanceof GramJs.KeyboardButtonCallback &&
              button.text === 'Add URL Buttons'
            ) {
              await invokeRequest(
                client,
                new GramJs.messages.GetBotCallbackAnswer({
                  peer: new GramJs.InputPeerUser({
                    userId: newBotFatherUserId,
                    accessHash: newBotFatherAccessHash,
                  }),
                  msgId: lastMessageNewBotFatherMessages[0].id,
                  data: button.data,
                  game: undefined,
                }),
                { shouldIgnoreErrors: true }
              );
            }
          }
        }
      }

      await sleep(halfMinute);
      const lastMessageNewBotFatherMessages2 = await getHistory(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        lastMessageNewBotFatherMessage.id
      );

      if (
        !lastMessageNewBotFatherMessages2[0] ||
        !lastMessageNewBotFatherMessages2[0].message.includes('Send me a list')
      ) {
        throw new Error('LAST_MESSAGE_NEW_BOT_FATHER_MESSAGES_NOT_FOUND2');
      }

      const buttonsTextMessage = buttons
        .map((button) => button.map((b) => `${b.text} - ${b.url}`).join(' | '))
        .join('\n');

      const buttonsTextMessageMessage = await sendMessage(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        buttonsTextMessage,
        '',
        false,
        false,
        false
      );

      await sleep(halfMinute);
      const buttonsTextMessageMessages = await getHistory(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        buttonsTextMessageMessage.id
      );

      if (
        !buttonsTextMessageMessages[0] ||
        !buttonsTextMessageMessages[0].message.includes('URL buttons saved')
      ) {
        throw new Error('BUTTONS_TEXT_MESSAGE_MESSAGES_NOT_FOUND');
      }

      const sendMessageMessage = await sendMessage(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        'Send',
        '',
        false,
        false
      );

      await sleep(halfMinute);
      const sendMessageMessages = await getHistory(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        sendMessageMessage.id
      );

      if (
        !sendMessageMessages[0] ||
        !sendMessageMessages[0].message.includes('When you want')
      ) {
        throw new Error('SEND_MESSAGE_MESSAGES_NOT_FOUND');
      }

      const { replyMarkup: sendMessageReplyMarkup } = sendMessageMessages[0];

      if (sendMessageReplyMarkup instanceof GramJs.ReplyInlineMarkup) {
        const { rows } = sendMessageReplyMarkup;
        for (const row of rows) {
          const { buttons } = row;
          for (const button of buttons) {
            if (
              button instanceof GramJs.KeyboardButtonCallback &&
              button.text === 'Send Now'
            ) {
              await invokeRequest(
                client,
                new GramJs.messages.GetBotCallbackAnswer({
                  peer: new GramJs.InputPeerUser({
                    userId: newBotFatherUserId,
                    accessHash: newBotFatherAccessHash,
                  }),
                  msgId: sendMessageMessages[0].id,
                  data: button.data,
                  game: undefined,
                }),
                { shouldIgnoreErrors: true }
              );
            }
          }
        }
      }

      await sleep(halfMinute);
      const sureMessageMessages = await getHistory(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        sendMessageMessage.id
      );

      if (
        !sureMessageMessages[0] ||
        !sureMessageMessages[0].message.includes('Are you sure')
      ) {
        throw new Error('SURE_MESSAGE_MESSAGES_NOT_FOUND');
      }

      const { replyMarkup: sureMessageReplyMarkup } = sureMessageMessages[0];

      if (sureMessageReplyMarkup instanceof GramJs.ReplyInlineMarkup) {
        const { rows } = sureMessageReplyMarkup;
        for (const row of rows) {
          const { buttons } = row;
          for (const button of buttons) {
            if (
              button instanceof GramJs.KeyboardButtonCallback &&
              button.text === 'Send'
            ) {
              await invokeRequest(
                client,
                new GramJs.messages.GetBotCallbackAnswer({
                  peer: new GramJs.InputPeerUser({
                    userId: newBotFatherUserId,
                    accessHash: newBotFatherAccessHash,
                  }),
                  msgId: sureMessageMessages[0].id,
                  data: button.data,
                  game: undefined,
                }),
                {
                  shouldIgnoreErrors: true,
                }
              );
            }
          }
        }
      }

      await sleep(halfMinute);
      const sendedMessageMessages = await getHistory(
        client,
        String(newBotFatherUserId),
        String(newBotFatherAccessHash),
        sendMessageMessage.id
      );

      if (
        !sendedMessageMessages[0] ||
        !sendedMessageMessages[0].message.includes('Here you can create')
      ) {
        throw new Error('SENDED_MESSAGE_MESSAGES_NOT_FOUND');
      }
    }

    const availableReactions = await invokeRequest(
      client,
      new GramJs.messages.SetChatAvailableReactions({
        peer: new GramJs.InputPeerChannel({
          channelId: newChannel.id,
          accessHash: newChannel.accessHash,
        }),
        availableReactions: new GramJs.ChatReactionsNone(),
        reactionsLimit: undefined,
      })
    );

    if (!availableReactions) {
      throw new Error('AVAILABLE_REACTIONS_NOT_FOUND');
    }

    const webPageBot = await resolveUsername(client, 'webpagebot');
    if (
      !webPageBot ||
      !webPageBot.users.length ||
      !(webPageBot.users[0] instanceof GramJs.User)
    ) {
      throw new Error('WEBPAGEBOT_NOT_USER');
    }

    const {
      id: userId,
      accessHash,
      username: botUsername,
    } = webPageBot.users[0];
    if (!accessHash || !botUsername || botUsername !== 'WebpageBot') {
      throw new Error('WEBPAGEBOT_NOT_FOUND');
    }

    await unBlockContact(
      client,
      new GramJs.InputPeerUser({
        userId,
        accessHash,
      })
    );

    const startMessage = await sendMessage(
      client,
      String(userId),
      String(accessHash),
      '/start',
      '',
      false,
      false
    );

    await sleep(halfMinute);
    const startMessages = await getHistory(
      client,
      String(userId),
      String(accessHash),
      startMessage.id
    );

    if (!startMessages[0]) {
      throw new Error('START_WEB_PAGE_BOT_MESSAGES_NOT_FOUND');
    }

    const usernameMessage = await sendMessage(
      client,
      String(userId),
      String(accessHash),
      `https://t.me/${username}`,
      '',
      false,
      false
    );
    await sleep(halfMinute);
    const usernameMessages = await getHistory(
      client,
      String(userId),
      String(accessHash),
      usernameMessage.id
    );

    if (!usernameMessages[0] || !usernameMessages[1]) {
      throw new Error('USERNAME_MESSAGES_NOT_FOUND');
    }

    if (
      usernameMessages[1].message !==
      'Link previews was updated successfully. Check them out!'
    ) {
      throw new Error('LINK_NOT_CONFIRMED');
    }

    const { replyMarkup, id: msgId } = usernameMessages[0];

    if (!replyMarkup || !(replyMarkup instanceof GramJs.ReplyInlineMarkup)) {
      throw new Error('REPLY_MARKUP_NOT_FOUND');
    }

    const { rows } = replyMarkup;

    for (const row of rows) {
      const { buttons } = row;
      for (const button of buttons) {
        if (button instanceof GramJs.KeyboardButtonCallback) {
          await invokeRequest(
            client,
            new GramJs.messages.GetBotCallbackAnswer({
              peer: new GramJs.InputPeerUser({
                userId,
                accessHash,
              }),
              msgId,
              data: button.data,
              game: undefined,
            }),
            { shouldIgnoreErrors: true }
          );
        }
      }
    }

    const updatePersonalChannel = await invokeRequest(
      client,
      new GramJs.account.UpdatePersonalChannel({
        channel: new GramJs.InputChannel({
          channelId: newChannel.id,
          accessHash: newChannel.accessHash,
        }),
      })
    );

    if (!updatePersonalChannel) {
      throw new Error('UPDATE_PERSONAL_CHANNEL_NOT_FOUND');
    }

    await updateAccountById(accountId, {
      personalChannel: username,
      personalChannelDate: new Date(),
    });
    await unsetAccountById(accountId, {
      personalChannelError: null,
    });
  } catch (error: any) {
    await updateAccountById(accountId, {
      personalChannelError: error.message,
      personalChannelDate: new Date(),
    });
  }
};
