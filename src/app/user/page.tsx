import Profile from "@/components/profile/profile";
import { getUserFromToken } from "@/utils/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

const UserPage = async () => {
    const user = await getUserFromToken();

    if (user === null) {
        return redirect("/");
    }

    return (
        <>
            <main className="container">
                <Link href="/">Home</Link>
                <Profile user={user} me={true}></Profile>
            </main>
        </>
    );
}

export default UserPage;