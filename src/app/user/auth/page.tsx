import Link from "next/link";
import AuthClient from "./client";

const RegisterPage = async () => {
    return (
        <>
            <main className="container">
                <Link href="/">Home</Link>
                <h1>Authenticate</h1>
                <AuthClient></AuthClient>
            </main>
        </>
    );
}

export default RegisterPage;