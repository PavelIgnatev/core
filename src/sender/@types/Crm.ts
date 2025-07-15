export type BitrixCrm = {
  type: 'bitrix';
  groupId: string;
  webhook: string;
};

export type AmoCrm = {
  type: 'amo';
  groupId: string;
  webhook: string;
};

export type ApiCrm = {
  type: 'api';
  groupId: string;
  webhook: string;
};

export type Crm = BitrixCrm | AmoCrm | ApiCrm;
