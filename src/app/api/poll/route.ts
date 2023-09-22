import { prisma } from "@/utils/prisma";
import { NewPollDTO } from "./dto"
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const body: NewPollDTO = await request.json();

    const insert = await prisma.poll.create({
        "data": {
            "title": body.title,
            "description": body.description,
            "optionVotes": [],
            "options": body.options,
            "requires_account": body.requiresAccount,
            "close_at": new Date(new Date().getTime() + (body.time * 60 * 1000)), // convert minutes to milliseconds
            "unlisted": body.unlisted
        }
    });

    return NextResponse.json({"message": "Created poll", "id": insert.id});
}