import Api from "../tl/api";
import type TelegramClient from "./TelegramClient";

export async function clearAuthorizations(client: TelegramClient) {
    const { authorizations } = await client.invoke(
        new Api.account.GetAuthorizations()
    );

    for (const authorization of authorizations) {
        try {
            if (
                !authorization.current &&
                authorization.deviceModel !== "Desktop"
            ) {
                await client.invoke(
                    new Api.account.ResetAuthorization({
                        hash: authorization.hash,
                    })
                );
            }
        } catch {}
    }
}
