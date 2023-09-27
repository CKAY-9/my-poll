import Link from "next/link";
import { Metadata } from "next";
import { getUserFromToken } from "@/utils/prisma";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        "title": "Home - MyPoll",
        "description": "MyPoll Homepage. Navigation"
    }
}

const Home = async () => {
	const user = await getUserFromToken();

	return (
		<>
			<main className="container" style={{
				"display": "grid",
				"placeContent": "center",
				"height": "100vh",
				"margin": "0"
			}}>
				<div className="landing">
					<h1>MyPoll</h1>
					<section style={{
						"display": "flex",
						"gap": "1rem"
					}}>
						<Link href="/poll/create">Create a poll</Link>
						<Link href="/poll/all">View public polls</Link>
					</section>
				</div>
				<div className="landing">
					<h1>Account</h1>
					{user === null 
						? <>
							<span style={{"opacity": "0.5", "marginBottom": "1rem", "textAlign": "center"}}>Having an account gives you access to more features</span>
							<Link href="/user/auth">Login</Link>
						</>
						: <>
							<Link href="/user">My Account</Link>
						</>
					}
				</div>
				<div className="landing">
					<h1>About</h1>
					<p style={{"textAlign": "center"}}>
						My Poll is a polling application developed by <Link style={{"padding": "0", "background": "none"}} href="https://github.com/CKAY-9">CKAY9</Link> and
						<br/>the repository can be found on <Link  href="https://github.com/CKAY-9/my-poll" style={{"padding": "0", "background": "none"}}>Github</Link>
					</p>
				</div>
			</main>
		</>
	);
}

export default Home;