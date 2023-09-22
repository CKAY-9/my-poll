import { PrismaClient } from "@prisma/client";

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