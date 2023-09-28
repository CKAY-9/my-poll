import { ProfilePreview } from "@/components/profile/profile"
import { getAllProfiles } from "@/utils/prisma"
import { Profile } from "@/utils/user"
import { Metadata } from "next"
import Link from "next/link"
import style from "./all.module.scss";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        "title": "My Account - MyPoll",
        "description": "MyPoll Account Page"
    }
}

const AllUsers = async () => {
    const profiles: Profile[] = await getAllProfiles();

    return (
        <>
            <main className="container">
                <Link href="/">Home</Link>
                <h1>All Users</h1>
                <div className={style.previews}>
                    {profiles.map((profile: Profile, index: number) => {
                        return (
                            <ProfilePreview user={profile} key={index}></ProfilePreview>
                        );
                    })}
                </div>
            </main>
        </>
    )
}

export default AllUsers;