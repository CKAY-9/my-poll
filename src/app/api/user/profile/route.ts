import { getUserProfile } from "@/utils/prisma";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const userID = params.get("userID");
    if (userID === null) {
        return NextResponse.json({"message": "Failed to get user ID"}, {"status": 400});
    }

    const profile = await getUserProfile(Number.parseInt(userID || "0"));
    if (profile === null) {
        return NextResponse.json({"message": "Invalid user ID"}, {"status": 404});
    }

    return NextResponse.json({"profile": profile, "message": "Got user profile"}, {"status": 200});
}