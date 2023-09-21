import Link from "next/link";

const Home = async () => {
	return (
		<>
			<main className="container" style={{
				"display": "grid",
				"placeContent": "center",
				"height": "100vh",
				"margin": "0"
			}}>
				<div className="landing">
					<h1>My Poll</h1>
					<Link href="/poll/create">Create a poll</Link>
				</div>
				<div className="landing">
					<h1>Account</h1>
					<span style={{"opacity": "0.5", "marginBottom": "1rem"}}>Having an account gives you access to more features</span>
					<section style={{"display": "grid", "gap": "1rem", "gridTemplateColumns": "50% 50%"}}>
						<Link href="/user/login">Login</Link>
						<Link href="/user/register">Register</Link>
					</section>
				</div>
			</main>
		</>
	);
}

export default Home;