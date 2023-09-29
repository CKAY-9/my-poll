import { getUserFromToken } from "@/utils/prisma";
import CreateClient from "./client";
import { Metadata } from "next";
import Header from "@/components/header/header";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        "title": "Create New Poll - MyPoll",
        "description": "Create a new poll on MyPoll."
    }
}

const CreatePage = async () => {
    const user = await getUserFromToken();

    return (
        <>
            <main className="container">
                <Header user={user}></Header>
                <CreateClient user={user}></CreateClient>
            </main>
        </>
    );
}

export default CreatePage;