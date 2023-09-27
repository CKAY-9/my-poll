import { DISCORD_API, DISCORD_CDN, LOCAL_URL } from "@/app/api/resources";
import { DISCORD_ID, DISCORD_KEY } from "@/utils/oauth";
import axios, { Axios, AxiosResponse } from "axios";
import { redirect } from "next/navigation";
import { DiscordInitialDTO, DiscordUserDTO } from "../dto";
import { prisma } from "@/utils/prisma";
import { MD5, SHA256 } from "crypto-js";

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const code = params.get("code");
    if (code === null) {
        return redirect("/user/auth?msg=dcf");
    }

    const initialRequestData = {
        "client_id": DISCORD_ID,
        "client_secret": DISCORD_KEY,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": LOCAL_URL + "/api/user/auth/discord"
    }

    let initialResponse: AxiosResponse<DiscordInitialDTO>;
    try {
        initialResponse = await axios({
            "url": DISCORD_API + "/oauth2/token",
            "method": "POST",
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            "data": initialRequestData
        });
    } catch (ex: any) {
        console.log(ex);
        return redirect("/user/auth?msg=dif");
    }

    let discordUserResponse: AxiosResponse<DiscordUserDTO>;
    try {
        discordUserResponse = await axios({
            "url": DISCORD_API + "/users/@me",
            "method": "GET",
            "headers": {
                "Authorization": `${initialResponse.data.token_type} ${initialResponse.data.access_token}`
            }
        });
    } catch (ex: any) {
        console.log(ex.toString());
        return redirect("/user/auth?msg=duf");
    }

    const oauthID = `discord-${discordUserResponse.data.id}`;
    let user = await prisma.user.findFirst({
        "where": {
            "oauth_id": oauthID
        }
    });

    if (user === null) {
        user = await prisma.user.create({
            "data": {
                "avatar": DISCORD_CDN + `/avatars/${discordUserResponse.data.id}/${discordUserResponse.data.avatar}`,
                "oauth_id": oauthID,
                "token": SHA256(
                    (Math.random() * Number.MAX_SAFE_INTEGER).toString() +
                    (Math.random() * Number.MIN_SAFE_INTEGER).toString() + 
                    oauthID + 
                    MD5(new Date().getTime().toString())).toString(),
                "username": discordUserResponse.data.global_name,
            }
        });
    }

    return redirect(`/user/auth?token=${user.token}&msg=passed`);
}