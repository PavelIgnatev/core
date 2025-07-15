import { Crm } from '../@types/Crm';
import { coreDB } from './db';

const getCrmCollection = async () => {
  return (await coreDB()).collection('crm');
};

export const getCrm = async (groupId: string) => {
  const crmCollection = await getCrmCollection();

  const result = await crmCollection.findOne<Crm>({
    groupId,
  });

  return result;
};
