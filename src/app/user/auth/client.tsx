"use client"

import { DISCORD_OAUTH, GITHUB_OAUTH } from "@/utils/oauth";
import Image from "next/image";
import Link from "next/link";
import style from "./auth.module.scss";

const AuthClient = () => {
    return (
        <>
            {GITHUB_OAUTH !== undefined &&
                <Link href={GITHUB_OAUTH} className={style.oauth} style={{"backgroundColor": "#333"}}>
                    <Image src="/github-mark-white.svg" alt="Github" sizes="100%" width={0} height={0} />
                    <span>Github</span>
                </Link>
            }
            {DISCORD_OAUTH !== undefined &&
                <Link href={DISCORD_OAUTH} className={style.oauth} style={{"backgroundColor": "#5865F2"}}>
                    <Image src="/discord-mark-white.svg" alt="Github" sizes="100%" width={0} height={0} />
                    <span>Discord</span>
                </Link>
            }
        </>
    );
}

export default AuthClient;