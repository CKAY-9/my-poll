import { ProfilePreview } from "@/components/profile/profile"
import { getAllProfiles, getUserFromToken } from "@/utils/prisma"
import { Profile } from "@/utils/user"
import { Metadata } from "next"
import Link from "next/link"
import style from "./all.module.scss";
import AllUsersClient from "./client"
import Header from "@/components/header/header"

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        "title": "All Users - MyPoll",
        "description": "Search all registered users on MyPoll."
    }
}

const AllUsers = async () => {
    const profiles: Profile[] = await getAllProfiles();
    const user = await getUserFromToken();

    return (
        <>
            <main className="container">
                <Header user={user}></Header>
                <h1>All Users</h1>
                <AllUsersClient profiles={profiles}></AllUsersClient>
            </main>
        </>
    )
}

export default AllUsers;