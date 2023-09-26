import { getPollInformation } from "@/utils/prisma";
import { redirect } from "next/navigation";
import PollClient from "./client";
import Link from "next/link";
import { Metadata } from "next";
import style from "./poll.module.scss";

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

    const isExpired = info.close_at.getTime() < new Date().getTime();

    return (
        <>
            <main className="container" style={{
                "alignItems": "center",
                "justifyContent": "center",
                "height": "100vh",
                "margin": "0",
            }}>
                <Link href="/">Home</Link>
                <div className={style.poll}>
                    {isExpired && <span style={{"textTransform": "uppercase", "fontWeight": "900"}}>This poll has expired!</span>}
                    <h1>{info.title}</h1>     
                    <span>{info.description}</span>
                    <PollClient poll={info} expired={isExpired}></PollClient> 
                </div>
            </main>
        </>
    );
}

export default PollPage;