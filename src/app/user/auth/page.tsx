import Link from "next/link";
import AuthClient from "./client";
import Header from "@/components/header/header";
import { getUserFromToken } from "@/utils/prisma";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
    const user = await getUserFromToken();

    if (user !== null) {
        return redirect("/user");
    }

    return (
        <>
            <main className="container">
                <Header user={user}></Header>
                <h1>Authenticate</h1>
                <AuthClient></AuthClient>
            </main>
        </>
    );
}

export default RegisterPage;