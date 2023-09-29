import Header from "@/components/header/header";
import PollPreview from "@/components/poll/poll";
import { getTotalVoteCount } from "@/utils/poll";
import { getAllPublicPolls, getUserFromToken } from "@/utils/prisma";
import { Poll } from "@prisma/client";
import { Metadata } from "next";
import Link from "next/link";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        "title": "Public Polls - MyPoll",
        "description": "View all public polls available on MyPoll"
    }
}

const AllPollsPage = async () => {
    const polls = await getAllPublicPolls();
    const user = await getUserFromToken();

    return (
        <>
            <main className="container">
                <Header user={user}></Header>
                <h1>Public Polls</h1>
                {polls.length <= 0 
                    ? <span>There are no public polls currently available! <Link href="/poll/create">Create one</Link></span>
                    : <div className="polls">
                        {polls.reverse().map((poll: Poll, index: number) => {
                            return (
                                <PollPreview poll={poll} key={index}></PollPreview>
                            );
                        })}
                    </div>
                }
            </main>
        </>
    );
}

export default AllPollsPage;