import { BigInteger } from 'big-integer';

import GramJs from '../gramjs/tl/api';

type BaseDialogInfo = {
  message: GramJs.TypeMessage;
};

export type UserDialogInfo = BaseDialogInfo & {
  type: 'user';
  dialog: GramJs.Dialog;
  user: GramJs.User & {
    accessHash: BigInteger;
  };
  chat: null;
};

type ChatWithAccessHash = (GramJs.Channel | GramJs.ChannelForbidden) & {
  accessHash: BigInteger;
};

type ChatWithoutAccessHash =
  | GramJs.ChatEmpty
  | GramJs.Chat
  | GramJs.ChatForbidden;

export type ChatDialogInfo = BaseDialogInfo & {
  type: 'chat';
  dialog: GramJs.Dialog;
  chat: ChatWithoutAccessHash | ChatWithAccessHash;
  user: null;
};

export type ChannelDialogInfo = BaseDialogInfo & {
  type: 'channel';
  dialog: GramJs.Dialog;
  chat: ChatWithAccessHash | ChatWithoutAccessHash;
  user: null;
};

export type Dialog = UserDialogInfo | ChatDialogInfo | ChannelDialogInfo;
