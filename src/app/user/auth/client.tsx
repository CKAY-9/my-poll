"use client"

import { DISCORD_OAUTH, GITHUB_OAUTH } from "@/utils/oauth";
import Image from "next/image";
import Link from "next/link";
import style from "./auth.module.scss";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { setCookie } from "@/utils/cookies";

const AuthClient = () => {
    const [message, setMessage] = useState<string>("");

    const searchParams = useSearchParams();

    useEffect(() => {
        const msg = searchParams.get("msg");
        const token = searchParams.get("token");

        if (msg !== null) {
            switch (msg.toLowerCase()) {
                case "dif":
                    setMessage("Failed to use OAuth2 for Discord!");
                    break;
                case "duf":
                    setMessage("Failed to fetch OAuth2 user!");
                    break;
                case "gif":
                    setMessage("Failed to use OAuth2 for GitHub!");
                    break;
                case "guf":
                    setMessage("Failed to fetch OAuth2 user!");
                    break;
            }
        }

        if (token !== null) {
            setCookie("token", token, 365);
            window.location.href = "/";
        }
    }, [searchParams]);

    return (
        <>
            {message !== "" && <span>{message}</span>}
            {GITHUB_OAUTH !== undefined &&
                <Link href={GITHUB_OAUTH} className={style.oauth} style={{"backgroundColor": "#333"}}>
                    <Image src="/github-mark-white.svg" alt="Github" sizes="100%" width={0} height={0} />
                    <span>Login with GitHub</span>
                </Link>
            }
            {DISCORD_OAUTH !== undefined &&
                <Link href={DISCORD_OAUTH} className={style.oauth} style={{"backgroundColor": "#5865F2"}}>
                    <Image src="/discord-mark-white.svg" alt="Github" sizes="100%" width={0} height={0} />
                    <span>Login with Discord</span>
                </Link>
            }
        </>
    );
}

export default AuthClient;