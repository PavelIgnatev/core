import { Channel } from '../@types/Channel';
import { coreDB } from './db';

const getChannelsCollection = async () => {
  return (await coreDB()).collection('channels');
};

export const getChannel = async (prefix: string) => {
  const channelsCollection = await getChannelsCollection();

  const result = await channelsCollection.findOne<Channel>({
    prefix,
  });

  return result?.channel;
};
