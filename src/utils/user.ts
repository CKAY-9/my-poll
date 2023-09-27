import { Poll } from "@prisma/client";

export interface Profile {
    username: string,
    avatar: string,
    oauth_id: string,
    id: number,
    created_polls: string[]
}