import Header from "@/components/header/header";
import Profile from "@/components/profile/profile";
import { getUserCreatedPolls, getUserFromToken } from "@/utils/prisma";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        "title": "My Account - MyPoll",
        "description": "MyPoll Account Page"
    }
}

const UserPage = async () => {
    const user = await getUserFromToken();

    if (user === null) {
        return redirect("/");
    }

    const polls = await getUserCreatedPolls(user.id);

    return (
        <>
            <main className="container">
                <Header user={user}></Header>
                <Profile polls={polls.reverse()} user={user} me={true}></Profile>
            </main>
        </>
    );
}

export default UserPage;
