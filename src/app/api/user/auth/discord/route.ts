import { redirect } from "next/navigation";

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const params = url.searchParams;
    const code = params.get("code");
    if (code === null) {
        return redirect("/user/auth");
    }

    
}