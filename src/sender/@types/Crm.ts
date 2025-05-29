export type BitrixCrm = {
  type: 'bitrix';
  prefix: string;
  webhook: string;
};

export type ApiUrlCrm = {
  type: 'api';
  prefix: string;
  apiUrl: string;
};

export type Crm = BitrixCrm | ApiUrlCrm;
