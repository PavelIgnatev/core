import "dotenv/config";

import { initClient } from "./helpers/initClient";

import { getAccountData } from "./methods/accounts/getAccountData";
import { usersMe } from "./methods/users/usersMe";

import { autoResponse } from "./modules/autoResponse";
import { autoSender } from "./modules/autoSender";
import { accountSetup } from "./modules/accountSetup";
import { updateAuthorizations } from "./modules/updateAuthorizations";
import { addAiContact } from "./modules/addAiContact";

const main = async (ID: string) => {
  while (true) {
    try {
      let isAutoResponse = true;
      const accountData = await getAccountData(ID);
      const { dcId, platform, userAgent, accountId } = accountData;

      if (![dcId, platform, userAgent, accountId].every(Boolean)) {
        throw new Error("Insufficient number of parameters to start");
      }

      const client = await initClient(
        accountData,
        () => (isAutoResponse = true)
      );

      await updateAuthorizations(client, accountData);
      await accountSetup(client, accountData);

      const {
        fullUser: { id: meFullUserId },
        users,
      } = await usersMe(client);
      const meFullUser = users[0];

      for (let i = 0; i < 60; i++) {
        const accountData = await getAccountData(ID);

        if (isAutoResponse) {
          isAutoResponse = false;
          await autoResponse(client, accountData, meFullUser);
        }

        await addAiContact(client, accountData);
        await autoSender(client, accountData, String(meFullUserId));
        await new Promise((res) => setTimeout(res, 60000));
      }
    } catch (e: any) {
      console.error(`MAIN ERROR (${ID}): ${e.message}`);

      if (e.message.includes("Global Error")) {
        break;
      }

      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

[
  "+79582326098",
  "+79582326119",
  "+79582326127",
  "+79582326135",
  "+79582326139",
  "+79582326155",
  "+79588833099",
  "+79588836174",
  "+79918026084",
  "+79918036140",
  "+79918036142",
  "+79918036145",
  "+79918046107",
  "+79918056155",
  "+79918064143",
  "01498cb0-1ec1-4fc5-9ea2-fcd5ce3c3aef-218",
  "04a8337c-8901-4708-8a12-76848c573981ыващфывгефыв",
  "11943124-0238-45e5-9af2-6811a707a935-105",
  "1366bc69-3b50-4629-a284-9160919a93d8phone-164",
  "159d6c38-3e5f-4051-bbb5-be5cafa064a8-210",
  "1c3deb9f-a690-4f70-8341-c7f794d540e4-105",
  "2bf530c6-07c2-4f4c-bc08-5aaf341c04c0-105",
  "319063b6-f5c2-464c-9fb8-d8ec658b735b-210",
  "4315cb7c-bcf2-4559-9b9a-0842a6129a10phone-164",
  "447405424340-uk-test-50",
  "447405440515-uk-test-50",
  "447405563551-uk-test-50",
  "447405586461-uk-test-50",
  "447405629211-uk-test-50",
  "447405777513-uk-test-50",
  "447405788787-uk-test-50",
  "447405797366-uk-test-50",
  "447405837633-uk-test-50",
  "447405869947-uk-test-50",
  "447405881751-uk-test-50",
  "447413705581-uk-test-50",
  "447415067751-uk-test-50",
  "447415787443-uk-test-50",
  "4fb62e81-eab7-42dd-b15b-1b1a86772e51-210",
  "57e6834a-c895-49c7-9148-0049f5282220ыващфывгефыв",
  "57f4f8de-6021-44a7-bd18-12e46f6204d1-210",
  "5e6170bf-014b-43fc-b113-e562fa633f31-210",
  "66b27023-0dd9-412a-87b6-71b468c2d88b-218",
  "6a3f3f23-78a8-4d1f-9db7-d611bf80ad2eыващфывгефыв",
  "6e1a4e1d-e42f-4cc2-bfac-e3ec4b6b7436-105",
  "7d5cd41a-6bd2-4c7b-b96c-efa43c5297cfыващфывгефыв",
  "7debd1c4-1fd9-4fb7-9f6a-4a2191cad699-210",
  "83f0a668-32b7-4e2e-8d34-84d5c43b30daphone-164",
  "840be57c-95ff-43ea-ba0b-17bfb9b09bfaыващфывгефыв",
  "8b7ac645-4dd2-4097-bbaa-b6af0644aec8-109",
  "8f8d2d3a-29b6-48d7-91b6-6368c69adfb5-210",
  "94707c3d-91a6-4c21-bf80-6096b63338a6-218",
  "a84b933e-f240-48e8-b670-6d4b7ee9bc04ыващфывгефыв",
  "b59400d5-c56e-45fd-85fb-15a02445e13c-163",
  "b637f5f0-3442-429d-871c-6025199db185-105",
  "ba376c56-e7af-4594-b052-fca35e3b361a-109",
  "c482783f-195c-46ec-89e5-5cb777bc3aa7-210",
  "d7a7236d-39d4-4b33-9a1a-a04ecda00c7cphone-164",
  "d88a6e27-2346-47e3-af5b-26c39cf5669e-210",
  "dc88ed70-c535-4750-93a8-d61fecb2dd43ыващфывгефыв",
  "e8dc5ada-bd55-47b1-8c83-e21bc43056d8-218",
  "efc90fe2-9d95-40f5-a27e-f31c9a00d1e0-163",
  "f27195ff-a428-4085-9920-23c85d526d10-218",
  "fbd4b590-e479-48cf-94eb-61120692ac35-105",
].forEach((accountId) => main(accountId));
