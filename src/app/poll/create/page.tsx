import { getUserFromToken } from "@/utils/prisma";
import CreateClient from "./client";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        "title": "Create new poll - MyPoll",
        "description": "Create a new poll on MyPoll"
    }
}

const CreatePage = async () => {
    const user = await getUserFromToken();

    return (
        <>
            <main className="container">
                <CreateClient user={user}></CreateClient>
            </main>
        </>
    );
}

export default CreatePage;