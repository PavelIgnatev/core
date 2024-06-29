import BigInt from "big-integer";

import GramJs from "../../common/gramjs/tl/api";

export const updateContact = async (
  client: any,
  id: string,
  accessHash: string,
  firstName: string,
  lastName: string,
  phoneNumber: string = ""
) => {
  const contact = await client.invoke(
    new GramJs.contacts.AddContact({
      id: new GramJs.InputPeerUser({
        userId: BigInt(id),
        accessHash: BigInt(accessHash),
      }),
      firstName,
      lastName,
      phone: phoneNumber,

      addPhonePrivacyException: true,
    })
  );

  return contact;
};
