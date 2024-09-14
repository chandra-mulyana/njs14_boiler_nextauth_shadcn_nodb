import { Button } from "@/components/ui/button";
import Link from "next/link";

// Menggunakan ini untuk menddapatkan session secara server
import { auth } from "@/auth";
import { handleSignOut } from "@/app/actions/authActions";

export default async function Home() {
	const session = await auth();
	console.log("Isi Session : ", session);
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-4">
				Halaman Utama
			</h1>
			<div className="flex items-center justify-center gap-x-2">
				{!session ? (
					<Link href="/auth/login">
						<Button>Sign In</Button>
					</Link>
				) : (
					<form action={handleSignOut}>
						<Button type="submit">Sign Out</Button>
					</form>
				)}
				<Link href="/dashboard">
					<Button>Dashboard</Button>
				</Link>
			</div>
		</div>
	);
}
