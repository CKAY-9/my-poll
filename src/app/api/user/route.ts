import { getUserFromToken } from "@/utils/prisma";
import axios from "axios";
import { NextResponse } from "next/server";
import { DISCORD_API } from "../resources";
import { DISCORD_KEY } from "@/utils/oauth";

export const PUT = async (request: Request) => {
    const token = request.headers.get("Authorization");
    if (token === null) {
        return NextResponse.json({"message": "Failed to get user token"}, {"status": 400});
    }

    const user = await getUserFromToken(token);
    if (user === null) {
        return NextResponse.json({"message": "Failed to get user"}, {"status": 401});
    }

    const oauthSplit = user.oauth_id.split("-");
    const oauthType = oauthSplit[0].toLowerCase();
    const oauthID = oauthSplit[1];

    try {
        if (oauthType === "discord") {
            const dResponse = await axios({
                "url": DISCORD_API + "/users/" + oauthID,
                "method": "GET",
                "headers": {
                    "Authorization": `Bot ${DISCORD_KEY}`
                }
            });
        } else {
    
        }
    } catch (ex: any) {
        console.log(ex.toString());
    }

    return NextResponse.json({"message": "Updated user from OAuth2 provider"}, {"status": 200});
}