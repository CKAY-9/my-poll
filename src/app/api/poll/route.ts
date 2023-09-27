import { getUserFromToken, prisma } from "@/utils/prisma";
import { NewPollDTO } from "./dto"
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const body: NewPollDTO = await request.json();
    const token = request.headers.get("Authorization");

    let user = null;
    if (token !== null) {
        user = await getUserFromToken(token);
    }

    const insert = await prisma.poll.create({
        "data": {
            "title": body.title,
            "description": body.description,
            "optionVotes": [],
            "options": body.options,
            "requires_account": body.requiresAccount,
            "close_at": new Date(new Date().getTime() + (body.time * 60 * 1000)), // convert minutes to milliseconds
            "unlisted": body.unlisted,
            "owner": user?.id || undefined
        }
    });

    return NextResponse.json({"message": "Created poll", "id": insert.id});
}

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const id = params.get("id");
    if (id === null) {
        return NextResponse.json({"message": "Failed to parse ID"}, {"status": 400});
    }

    const poll = await prisma.poll.findUnique({
        "where": {
            "id": Number.parseInt(id || "0")
        }
    });

    if (poll === null) {
        return NextResponse.json({"message": "Failed to find poll"}, {"status": 404});
    }

    return NextResponse.json({"message": "Fetched poll", "poll": poll}, {"status": 200});
}