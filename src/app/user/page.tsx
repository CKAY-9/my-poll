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
                <Link href="/">Home</Link>
                <Profile polls={polls} user={user} me={true}></Profile>
            </main>
        </>
    );
}

export default UserPage;