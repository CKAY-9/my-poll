import { getAllPublicPolls } from "@/utils/prisma";
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

    return (
        <>
            <main className="container">
                <Link href="/">Home</Link>
                <h1>Public Polls</h1>
                {polls.length <= 0 
                    ? <span>There are no public polls currently available! <Link href="/poll/create">Create one</Link></span>
                    : <div className="polls">
                        {polls.map((poll: Poll, index: number) => {
                            return (
                                <Link href={`/poll/${poll.id}`} key={index} className="poll">
                                    <h2>{poll.title}</h2>
                                    <span>Description: {poll.description}</span>
                                    <span>Vote Count: {poll.optionVotes.length}</span>
                                </Link>
                            );
                        })}
                    </div>
                }
            </main>
        </>
    );
}

export default AllPollsPage;