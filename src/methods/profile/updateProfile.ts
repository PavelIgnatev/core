import GramJs from "../../telegram/tl/api";
import { invokeRequest } from "../../telegram";

export const updateProfile = ({
  firstName,
  lastName,
  about,
}: {
  firstName?: string;
  lastName?: string;
  about?: string;
}) => {
  return invokeRequest(
    new GramJs.account.UpdateProfile({
      firstName: firstName || "",
      lastName: lastName || "",
      about: about || "",
    })
  );
};
