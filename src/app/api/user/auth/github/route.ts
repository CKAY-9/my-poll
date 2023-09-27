import axios, { AxiosResponse } from "axios";
import { redirect } from "next/navigation";
import { GithubInitialDTO, GithubUserDTO } from "../dto";
import { GITHUB_ID, GITHUB_KEY } from "@/utils/oauth";
import { GITHUB_API } from "@/app/api/resources";
import { prisma } from "@/utils/prisma";
import { MD5, SHA256 } from "crypto-js";

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const code = params.get("code");
    if (code === null) {
        return redirect("/user/auth?msg=dcf");
    }

    let initialResponse: AxiosResponse<GithubInitialDTO>;
    try {
        initialResponse = await axios({
            "url": "https://github.com/login/oauth/access_token",
            "method": "POST",
            "data": {
                "client_id": GITHUB_ID,
                "client_secret": GITHUB_KEY,
                "code": code
            }
        });
    } catch (ex: any) {
        console.log(ex.toString());
        return redirect("/user/auth?msg=gif");
    }

    let userResponse: AxiosResponse<GithubUserDTO>
    try {
        userResponse = await axios({
            "url": GITHUB_API + "/user",
            "method": "GET",
            "params": {
                "access_token": initialResponse.data.access_token
            }
        });
    } catch (ex: any) {
        console.log(ex.toString());
        return redirect("/user/auth?msg=guf");
    }

    const oauthID = `github-${userResponse.data.id}`;
    let user = await prisma.user.findFirst({
        "where": {
            "oauth_id": oauthID
        }
    });

    if (user === null) {
        user = await prisma.user.create({
            "data": {
                "avatar": userResponse.data.avatar_url,
                "username": userResponse.data.login,
                "oauth_id": oauthID,
                "token": SHA256(
                    (Math.random() * Number.MAX_SAFE_INTEGER).toString() +
                    (Math.random() * Number.MIN_SAFE_INTEGER).toString() + 
                    oauthID + 
                    MD5(new Date().getTime().toString())).toString()
            }
        });
    }

    return redirect(`/user/auth?token=${user.token}&msg=passed`);
}