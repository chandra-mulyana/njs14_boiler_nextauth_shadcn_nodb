import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
	return (
		<div className="h-screen flex flex-col items-center justify-center">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-4">
				Halaman Utama
			</h1>
			<div className="flex items-center justify-center gap-x-2">
				<Link href="/auth/login">
					<Button>Login</Button>
				</Link>
				<Link href="/dashboard">
					<Button>Dashboard</Button>
				</Link>
			</div>
		</div>
	);
}
