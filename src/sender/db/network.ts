import { networkDB } from './db';

const getNetworkCollection = async () => {
  return (await networkDB()).collection('network');
};

export const insertNetworkData = async (networkData: {
  type: 'send' | 'recieve';
  id: string;
  size: number;
  proxy: string;
  date: Date;
}) => {
  const networkCollection = await getNetworkCollection();

  return await networkCollection.insertOne(networkData);
};
