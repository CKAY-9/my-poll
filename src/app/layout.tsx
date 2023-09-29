import "./globals.scss"
import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "MyPoll",
	description: "Create polls and vote on them.",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
