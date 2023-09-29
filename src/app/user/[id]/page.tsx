import Header from "@/components/header/header";
import Profile from "@/components/profile/profile";
import { getUserCreatedPolls, getUserFromToken, getUserProfile } from "@/utils/prisma";
import { Metadata } from "next";
import Link from "next/link";

export const generateMetadata = async ({params}: { 
    params: { id: string } 
}): Promise<Metadata> => {
    const profile = await getUserProfile(Number.parseInt(params.id || "0"));

    if (profile === null) {
        return {
            "title": "Invalid Account - MyPoll",
            "description": "MyPoll Profile Page"
        }
    }

    return {
        "title": `${profile.username} - MyPoll`,
        "description": `${profile.username}'s Profile. Joined ${profile.joined.toISOString()}`
    }
}

const ProfilePage = async ({params}: { 
    params: { id: string } 
}) => {
    const profile = await getUserProfile(Number.parseInt(params.id || "0"));
    const user = await getUserFromToken();

    if (profile === null) {
        return (
            <>
                <main className="container">
                    <Header user={user}></Header>
                    <h1>This user doesn&apos;t exist!</h1>
                </main>
            </>
        )
    }

    const polls = await getUserCreatedPolls(profile.id);

    return (
        <>
            <main className="container">
                <Header user={user}></Header>
                <Profile polls={polls.reverse()} user={profile} me={user?.id === profile.id}></Profile>
            </main>
        </>
    );
}

export default ProfilePage;