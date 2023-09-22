import { UserAuthDTO } from "../dto";

export const POST = async (request: Request) => {
    const body: UserAuthDTO = await request.json();
}