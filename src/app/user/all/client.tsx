"use client"

import { ProfilePreview } from "@/components/profile/profile";
import { Profile } from "@/utils/user";
import style from "./all.module.scss";
import { BaseSyntheticEvent, useState } from "react";

const AllUsersClient = (props: {
    profiles: Profile[]
}) => {
    const [search, setSearch] = useState<string>("");

    return (
        <>
            <input type="text" placeholder="Search by username" onChange={(e: BaseSyntheticEvent) => setSearch(e.target.value.toLowerCase())} />
            <div className={style.previews}>
                {props.profiles.filter((v) => v.username.toLowerCase().includes(search)).map((profile: Profile, index: number) => {
                    return (
                        <ProfilePreview user={profile} key={index}></ProfilePreview>
                    );
                })}
            </div>
        </>
    );
}

export default AllUsersClient;