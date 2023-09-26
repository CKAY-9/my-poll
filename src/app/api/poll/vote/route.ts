import { prisma } from "@/utils/prisma";
import { IncomingVoteDTO } from "./dto"
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const body: IncomingVoteDTO = await request.json();

    const poll = await prisma.poll.findUnique({
        "where": {
            "id": body.poll
        }
    });
    if (poll === null) {
        return NextResponse.json({"message": "Failed to find poll"}, {"status": 404});
    }

    const pastAllowedTime = poll.close_at.getTime() < new Date().getTime();
    if (pastAllowedTime) {
        return NextResponse.json({"message": "This poll is past the time allowed"}, {"status": 400});
    }

    if (poll.requires_account) {
        const user = await prisma.user.findFirst({
            "where": {
                "token": request.headers.get("Authorization") || ""
            }
        });
        if (user === null) {
            return NextResponse.json({"message": "User must be provided for this poll"}, {"status": 401});
        }
    }

    if (poll.optionVotes[body.voteIndex] === undefined) {
        poll.optionVotes[body.voteIndex] = 0;
    } else {
        poll.optionVotes[body.voteIndex] += 1;
    }

    const update = await prisma.poll.update({
        "where": {
            "id": poll.id
        },
        "data": {
            "optionVotes": poll.optionVotes
        }
    });

    return NextResponse.json({"message": "Voted on poll"}, {"status": 200});
}