import { getUserFromToken, prisma } from "@/utils/prisma";
import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";
import { DISCORD_API, DISCORD_CDN, GITHUB_API } from "../resources";
import { DISCORD_BOT_KEY, DISCORD_KEY, GITHUB_KEY } from "@/utils/oauth";
import { DiscordUserDTO, GithubUserDTO } from "./auth/dto";

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
            const dResponse: AxiosResponse<DiscordUserDTO> = await axios({
                "url": DISCORD_API + "/users/" + oauthID,
                "method": "GET",
                "headers": {
                    "Authorization": `Bot ${DISCORD_BOT_KEY}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });
            if (dResponse.status !== 200) {
                return NextResponse.json({"message": "Failed to get Discord user"}, {"status": 404});
            }
            const dUpdate =await prisma.user.update({
                "where": {
                    "id": user.id
                },
                "data": {
                    "avatar": DISCORD_CDN + `/avatars/${dResponse.data.id}/${dResponse.data.avatar}`,
                    "username":dResponse.data.global_name
                }
            });
        } else {
            const gResponse: AxiosResponse<GithubUserDTO[]> = await axios({
                "url": GITHUB_API + "/users",
                "method": "GET",
                "headers": {
                    "Authorization": GITHUB_KEY
                },
                "params": {
                    "since": Number.parseInt(oauthID) - 1, // since starts after the specified ID
                    "per_page": 1
                }
            });
            if (gResponse.data.length <= 0) {
                return NextResponse.json({"message": "Failed to get GitHub user"}, {"status": 404});
            }
            const gUpdate =await prisma.user.update({
                "where": {
                    "id": user.id
                },
                "data": {
                    "avatar": gResponse.data[0].avatar_url,
                    "username": gResponse.data[0].login
                }
            });
        }
    } catch (ex: any) {
        console.log(ex.toString());
        return NextResponse.json({"message": "Failed to get user"}, {"status": 400});
    }

    return NextResponse.json({"message": "Updated user from OAuth2 provider"}, {"status": 200});
}