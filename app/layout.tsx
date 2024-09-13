import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "NextJS14 _NextAuthV5",
	description: "NextJS14 _NextAuthV5",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
