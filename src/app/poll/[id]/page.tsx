import { getPollInformation } from "@/utils/prisma";
import { redirect } from "next/navigation";
import PollClient from "./client";
import Link from "next/link";
import { Metadata } from "next";

export const generateMetadata = async ({params}: {
    params: {
        id: string
    }
}): Promise<Metadata> => {
    const info = await getPollInformation(Number.parseInt(params.id));

    if (info === null) {
        return {
            "title": "Invalid Poll - MyPoll",
            "description": "Vote on other polls on MyPoll"
        }
    }

    return {
        "title": `${info.title} - MyPoll`,
        "description": `Vote on the ${info.title} poll on MyPoll. Poll Description: ${info.description.length <= 0 ? "None" : info.description}`
    }
}

const PollPage = async ({params}: {
    params: {
        id: string
    }
}) => {
    const info = await getPollInformation(Number.parseInt(params.id));

    if (info === null) {
        redirect("/");
    }

    return (
        <>
            <main className="container" style={{
                "alignItems": "center",
                "justifyContent": "center",
                "height": "100vh",
                "margin": "0"
            }}>
                <div className="poll">
                    <Link href="/">Home</Link>
                    <h1>{info.title}</h1>     
                    <span>{info.description}</span>
                    <PollClient poll={info}></PollClient> 
                </div>
            </main>
        </>
    );
}

export default PollPage;