"use client"

import { Profile } from "@/utils/user";
import style from "./proflile.module.scss";
import Image from "next/image";
import { Poll } from "@prisma/client";
import PollPreview from "../poll/poll";
import Link from "next/link";
import { BaseSyntheticEvent } from "react";
import axios from "axios";
import { LOCAL_URL } from "@/app/api/resources";
import { eraseCookie, getCookie } from "@/utils/cookies";

export const ProfilePreview = (props: {
    user: Profile
}) => {
    const oauthType = props.user.oauth_id.split("-")[0].toLowerCase();

    return (
        <Link href={`/user/${props.user.id}`} className={style.preview}>
            <section className={style.header}>
                <Image className={style.pfp} src={props.user.avatar} alt="PFP" sizes="100%" width={0} height={0} />
                <section style={{
                    "display": "flex",
                    "alignItems": "center",
                    "gap": "1rem"
                }}>
                    <h1 className={style.name}>{props.user.username}</h1>
                    {oauthType === "discord" &&
                        <Image className={style.oauth} src="/discord-mark-white.svg" alt="Discord" sizes="100%" width={0} height={0} />
                    }
                    {oauthType === "github" &&
                        <Image className={style.oauth} src="/github-mark-white.svg" alt="GitHub" sizes="100%" width={0} height={0} />
                    }
                </section>
            </section>
        </Link>
    );
}

const Profile = (props: {
    user: Profile,
    polls: Poll[],
    me: boolean
}) => {
    const oauthType = props.user.oauth_id.split("-")[0].toLowerCase();

    const updateInfo = async (e: BaseSyntheticEvent) => {
        e.preventDefault();
        if (!props.me) return;

        const response = await axios({
            "url": LOCAL_URL + "/api/user",
            "method": "PUT",
            "headers": {
                "Authorization": getCookie("token") || ""
            }
        });

        if (response.status === 200) {
            window.location.reload();
        }
    }

    const logout = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        eraseCookie("token");
        window.location.href = "/user/auth";
    }

    return (
        <div className={style.profile}>
            <section className={style.header}>
                <Image className={style.pfp} src={props.user.avatar} alt="PFP" sizes="100%" width={0} height={0} />
                <section style={{
                    "display": "flex",
                    "alignItems": "center",
                    "gap": "1rem"
                }}>
                    <h1 className={style.name}>{props.user.username}</h1>
                    {oauthType === "discord" &&
                        <Image className={style.oauth} src="/discord-mark-white.svg" alt="Discord" sizes="100%" width={0} height={0} />
                    }
                    {oauthType === "github" &&
                        <Image className={style.oauth} src="/github-mark-white.svg" alt="GitHub" sizes="100%" width={0} height={0} />
                    }
                </section>
                <span>Joined {props.user.joined.toDateString()}</span>
                {props.me && 
                    <section style={{
                        "display": "flex",
                        "alignItems": "center",
                        "gap": "1rem"
                    }}>                  
                        <button onClick={updateInfo} style={{
                            "backgroundColor": "rgb(var(--accent))",
                            "color": "white"
                        }}>Sync Information</button>
                        <button onClick={logout} style={{
                            "backgroundColor": "rgb(var(--accent))",
                            "color": "white"
                        }}>Logout</button>
                    </section>}
            </section>
            <section>
                <h2>Created Polls</h2>
                {props.polls.filter((v) => !v.unlisted).length <= 0 && <span>This user doesn&apos;t have any polls</span>}
                <div className="polls">
                    {props.polls.filter((v) => !v.unlisted).map((poll: Poll, index: number) => {
                        return (
                            <PollPreview poll={poll} key={index}></PollPreview>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default Profile;