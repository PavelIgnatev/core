import BigInt from 'big-integer';

import TelegramClient from '../../gramjs/client/TelegramClient';
import GramJs from '../../gramjs/tl/api';
import { Account } from '../@types/Account';
import { unsetAccountById, updateAccountById } from '../db/accounts';
import { generateCustomString } from '../helpers/generateCustomString';
import { sleep } from '../helpers/helpers';
import { resolveUsername } from '../methods/contacts/resolveUsername';
import { unBlockContact } from '../methods/contacts/unBlockContact';
import { getHistory } from '../methods/messages/getHistory';
import { sendMessage } from '../methods/messages/sendMessage';
import { invokeRequest } from './invokeRequest';

export const personalChannel = async (
  account: Account,
  client: TelegramClient
) => {
  const { personalChannel: personalChannelAccount, accountId } = account;

  if (
    personalChannelAccount ||
    ![
      '5386260304-prefix-aisender',
      '5469313688-prefix-aisender',
      '5469527077-prefix-aisender',
      '5475614681-prefix-aisender',
      '5475884972-prefix-aisender',
      '5478693194-prefix-aisender',
      '5479580380-prefix-aisender',
      '5482050979-prefix-aisender',
      '5482140410-prefix-aisender',
      '5486986079-prefix-aisender',
      '5487204260-prefix-aisender',
      '5487692327-prefix-aisender',
      '5495171448-prefix-aisender',
      '5497094785-prefix-aisender',
      '5504388853-prefix-aisender',
      '5504476351-prefix-aisender',
      '5509678791-prefix-aisender',
      '5510921997-prefix-aisender',
      '5514833287-prefix-aisender',
      '5518553090-prefix-aisender',
      '5519401495-prefix-aisender',
      '5529022002-prefix-aisender',
      '5531976720-prefix-aisender',
      '5534122955-prefix-aisender',
      '5534381735-prefix-aisender',
      '5543808790-prefix-aisender',
      '5548406987-prefix-aisender',
      '5553328834-prefix-aisender',
      '5558528492-prefix-aisender',
      '5560743837-prefix-aisender',
      '5567905608-prefix-aisender',
      '5570124313-prefix-aisender',
      '5572985888-prefix-aisender',
      '5576603587-prefix-aisender',
      '5591750365-prefix-aisender',
      '5592519319-prefix-aisender',
      '5594101497-prefix-aisender',
      '5595483244-prefix-aisender',
      '5605960529-prefix-aisender',
      '5610227341-prefix-aisender',
      '5616514162-prefix-aisender',
      '5624545022-prefix-aisender',
      '5627166966-prefix-aisender',
      '5631272153-prefix-aisender',
      '5631567765-prefix-aisender',
      '5632445501-prefix-aisender',
      '5643720540-prefix-aisender',
      '5646455911-prefix-aisender',
      '5650298252-prefix-aisender',
      '5654284732-prefix-aisender',
      '5656620295-prefix-aisender',
      '5658346140-prefix-aisender',
      '5666357712-prefix-aisender',
      '5667201864-prefix-aisender',
      '5673078660-prefix-aisender',
      '5673419317-prefix-aisender',
      '5676294047-prefix-aisender',
      '5678057293-prefix-aisender',
      '5684983534-prefix-aisender',
      '5698690702-prefix-aisender',
      '5700928171-prefix-aisender',
      '5702422554-prefix-aisender',
      '5703212098-prefix-aisender',
      '5707088380-prefix-aisender',
      '5707529498-prefix-aisender',
      '5714656568-prefix-aisender',
      '5715682591-prefix-aisender',
      '5716633507-prefix-aisender',
      '5716900607-prefix-aisender',
      '5722018852-prefix-aisender',
      '5723214829-prefix-aisender',
      '5724905979-prefix-aisender',
      '5731829452-prefix-aisender',
      '5732308556-prefix-aisender',
      '573503789171-columbaaaaaaain-8-dec-prefix-aisender',
      '573504911906-columbaaaaaaain-8-dec-prefix-aisender',
      '573505217690-columbaaaaaaain-8-dec-prefix-aisender',
      '573505570222-cooooooolunbain-9-dec-prefix-aisender',
      '573505646469-cooooooolunbain-9-dec-prefix-aisender',
      '573505647505-cooooooolunbain-9-dec-prefix-aisender',
      '573505926968-cooooooolunbain-9-dec-prefix-aisender',
      '573505957314-cooooooolunbain-9-dec-prefix-aisender',
      '573506023539-cooooooolunbain-9-dec-prefix-aisender',
      '573506024813-cooooooolunbain-9-dec-prefix-aisender',
      '573506025316-cooooooolunbain-9-dec-prefix-aisender',
      '573506026017-cooooooolunbain-9-dec-prefix-aisender',
      '573506026307-cooooooolunbain-9-dec-prefix-aisender',
      '573506028151-cooooooolunbain-9-dec-prefix-aisender',
      '573506032491-cooooooolunbain-9-dec-prefix-aisender',
      '573506034616-cooooooolunbain-9-dec-prefix-aisender',
      '573506085116-cooooooolunbain-9-dec-prefix-aisender',
      '573506085481-cooooooolunbain-9-dec-prefix-aisender',
      '573506088980-cooooooolunbain-9-dec-prefix-aisender',
      '573506192735-cooooooolunbain-9-dec-prefix-aisender',
      '573506193079-cooooooolunbain-9-dec-prefix-aisender',
      '573506202625-cooooooolunbain-9-dec-prefix-aisender',
      '573506343986-cooooooolunbain-9-dec-prefix-aisender',
      '573506344124-cooooooolunbain-9-dec-prefix-aisender',
      '573506357038-cooooooolunbain-9-dec-prefix-aisender',
      '573506359157-cooooooolunbain-9-dec-prefix-aisender',
      '573506360967-cooooooolunbain-9-dec-prefix-aisender',
      '573506362215-cooooooolunbain-9-dec-prefix-aisender',
      '573506365415-cooooooolunbain-9-dec-prefix-aisender',
      '573506365691-cooooooolunbain-9-dec-prefix-aisender',
      '573507220680-cooooooolunbain-9-dec-prefix-aisender',
      '573507565072-cooooooolunbain-9-dec-prefix-aisender',
      '573507581194-cooooooolunbain-9-dec-prefix-aisender',
      '573507831727-cooooooolunbain-9-dec-prefix-aisender',
      '573507832918-cooooooolunbain-9-dec-prefix-aisender',
      '573507833172-cooooooolunbain-9-dec-prefix-aisender',
      '573507833573-cooooooolunbain-9-dec-prefix-aisender',
      '573507833947-cooooooolunbain-9-dec-prefix-aisender',
      '573508203532-cooooooolunbain-9-dec-prefix-aisender',
      '573508203812-cooooooolunbain-9-dec-prefix-aisender',
      '573508344416-cooooooolunbain-9-dec-prefix-aisender',
      '573508850358-cooooooolunbain-9-dec-prefix-aisender',
      '5826229423-prefix-aisender',
      '5826630644-prefix-aisender',
      '5842862546-prefix-aisender',
      '5847180260-prefix-aisender',
      '5850856834-prefix-aisender',
      '5858141661-prefix-aisender',
      '5858794681-prefix-aisender',
      '5917588640-prefix-aisender',
      '5918320640-prefix-aisender',
      '5926024689-prefix-aisender',
      '5930791750-prefix-aisender',
      '5933808365-prefix-aisender',
      '5934992445-prefix-aisender',
      '5937352554-prefix-aisender',
      '5950103767-prefix-aisender',
      '5963221043-prefix-aisender',
      '5967945454-prefix-aisender',
      '5968285246-prefix-aisender',
      '6038569175-prefix-aisender',
      '6039251122-prefix-aisender',
      '6040903483-prefix-aisender',
      '6041097064-prefix-aisender',
      '6044004814-prefix-aisender',
      '6045508502-prefix-aisender',
      '6049219449-prefix-aisender',
      '6054455379-prefix-aisender',
      '6056175848-prefix-aisender',
      '6057228387-prefix-aisender',
      '6057247295-prefix-aisender',
      '6061667277-prefix-aisender',
      '6064539755-prefix-aisender',
      '6065456630-prefix-aisender',
      '6065951244-prefix-aisender',
      '6067612726-prefix-aisender',
      '6077867584-prefix-aisender',
      '6081060682-prefix-aisender',
      '6084389593-prefix-aisender',
      '6088274769-prefix-aisender',
      '6088367570-prefix-aisender',
      '6095956045-prefix-aisender',
      '6097803459-prefix-aisender',
      '6102022333-prefix-aisender',
      '6105707638-prefix-aisender',
      '6109876094-prefix-aisender',
      '6112055593-prefix-aisender',
      '6117891563-prefix-aisender',
      '6119636939-prefix-aisender',
      '6120550152-prefix-aisender',
      '+79123888760-256-after-lolz-new-19-sep-prefix-aisender',
      '+79123956635-256-after-lolz-new-19-sep-prefix-aisender',
      '+79123965682-256-after-lolz-new-19-sep-prefix-aisender',
      '+79123965993-256-after-lolz-new-19-sep-prefix-aisender',
      '+79123966529-256-after-lolz-new-19-sep-prefix-aisender',
      '+79123983167-256-after-lolz-new-19-sep-prefix-aisender',
      '+79123983323-256-after-lolz-new-19-sep-prefix-aisender',
      '+79123983699-256-after-lolz-new-19-sep-prefix-aisender',
      '+79123983817-256-after-lolz-new-19-sep-prefix-aisender',
      '+79123984059-256-after-lolz-new-19-sep-prefix-aisender',
      '+79123985129-256-after-lolz-new-19-sep-prefix-aisender',
      '+79123985139-256-after-lolz-new-19-sep-prefix-aisender',
      '6532170006-prefix-aisender',
      '7182563201-prefix-aisender',
      '5765644686-prefix-aisender',
      '7083414397-prefix-aisender',
      '6516454392-prefix-aisender',
      '6088274769-prefix-aisender',
      '7327879244-prefix-aisender',
      '7330642051-prefix-aisender',
      '6034690340-prefix-aisender',
      '7043459945-prefix-aisender',
      '7332632555-prefix-aisender',
      '7058455435-prefix-aisender',
      '7230116304-prefix-aisender',
      '6976113445-prefix-aisender',
      '6823941440-prefix-aisender',
      '6589786445-prefix-aisender',
      '6469489107-prefix-aisender',
      '7002207564-prefix-aisender',
      '7270182020-prefix-aisender',
      '6831860505-prefix-aisender',
      '6914272452-prefix-aisender',
      '6736252842-prefix-aisender',
      '7068775107-prefix-aisender',
      '6129790891-prefix-aisender',
      '7492136483-prefix-aisender',
    ].includes(accountId)
  ) {
    return;
  }

  try {
    const parentChannel = await resolveUsername(client, 'channelforcopyy');

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

      const deletedChannel = await invokeRequest(
        client,
        new GramJs.channels.DeleteChannel({
          channel: new GramJs.InputChannel({
            channelId: chat.id,
            accessHash: chat.accessHash,
          }),
        })
      );

      if (!deletedChannel) {
        throw new Error('CHANNEL_NOT_DELETED');
      }
    }

    const fullChannel = await invokeRequest(
      client,
      new GramJs.channels.CreateChannel({
        broadcast: true,
        title,
        about,
      })
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
      })
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

      await sleep(30000);
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

        await sleep(30000);
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

          await sleep(30000);
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

          await sleep(30000);
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

      await sleep(30000);
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

      await sleep(30000);
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

      await sleep(30000);
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

      await sleep(30000);
      const startBotControllerMessages = await getHistory(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        startBotControllerMessage.id
      );

      if (
        !startBotControllerMessages[0] ||
        !startBotControllerMessages[0].message.includes('Telegram channels')
      ) {
        throw new Error('START_BOT_CONTROLLER_MESSAGES_NOT_FOUND');
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

      await sleep(30000);
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
                    })
                  );
                }
              }
            }
          }
        }

        await sleep(30000);
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
                  })
                );
              }
            }
          }
        }

        await sleep(30000);
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

      await sleep(30000);
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

      await sleep(30000);
      const usernameBotControllerMessages = await getHistory(
        client,
        String(botControllerUserId),
        String(botControllerAccessHash),
        usernameBotControllerMessage.id
      );

      if (!usernameBotControllerMessages[0]) {
        throw new Error('USERNAME_BOT_CONTROLLER_MESSAGES_NOT_FOUND');
      }

      if (
        usernameBotControllerMessages[0].message.includes(
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

        await sleep(30000);
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
                  })
                );
              }
            }
          }
        }

        await sleep(30000);
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
      } else if (
        !usernameBotControllerMessages[0].message.includes('Success!')
      ) {
        throw new Error('SUCCESS_BOT_CONTROLLER_MESSAGES_NOT_FOUND');
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

      await sleep(30000);
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

      await sleep(30000);
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
                })
              );
            }
          }
        }
      }

      await sleep(30000);
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

      await sleep(30000);
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

      await sleep(30000);
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
                })
              );
            }
          }
        }
      }

      await sleep(30000);
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

      await sleep(30000);
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

      await sleep(30000);
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

      await sleep(30000);
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

      await sleep(30000);
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

    await sleep(30000);
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
    await sleep(30000);
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
            })
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
    });
    await unsetAccountById(accountId, {
      personalChannelError: null,
    });
  } catch (error: any) {
    await updateAccountById(accountId, {
      personalChannelError: error.message,
    });
  }
};
