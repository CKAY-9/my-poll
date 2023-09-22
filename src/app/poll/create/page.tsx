import CreateClient from "./client";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        "title": "Create new poll - MyPoll",
        "description": "Create a new poll on MyPoll"
    }
}

const CreatePage = async () => {
    return (
        <>
            <main className="container">
                <CreateClient></CreateClient>
            </main>
        </>
    );
}

export default CreatePage;