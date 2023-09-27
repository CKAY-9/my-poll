import { PrismaClient, User } from "@prisma/client";
import { cookies } from "next/headers";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// Functions for getting and updating stuff
export const getPollInformation = async (id: number) => {
    const info = await prisma.poll.findUnique({
        "where": {
            "id": id
        }
    });
    return info;
}

export const getAllPublicPolls = async () => {
    const polls = await prisma.poll.findMany({
        "where": {
            "unlisted": false
        } 
    });
    return polls;
}

export const getToken = (): string | null => {
    const token = cookies().get("token");
    return token === undefined ? null : token.value;
}

export const getUserFromToken = async (token: string = ""): Promise<User | null> => {
    if (token === "") {
        const tempToken = getToken();
        if (tempToken === null) {
            return null;
        }
        token = tempToken;
    }

    const user = await prisma.user.findFirst({
        "where": {
            "token": token || ""
        }
    });

    return user;
}