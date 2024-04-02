import BigInt from "big-integer";

import GramJs from "../../telegram/tl/api";
import { invokeRequest } from "../../telegram";

export const updateContact = (
  id: string,
  accessHash: string,
  firstName: string,
  lastName: string,
  phoneNumber: string = ""
) => {
  const contact = invokeRequest(
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
