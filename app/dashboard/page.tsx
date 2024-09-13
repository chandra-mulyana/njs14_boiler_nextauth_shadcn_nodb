import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = () => {
	return (
		<div className="flex flex-col h-screen items-center justify-center">
			<h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
				Dashboard Page
			</h2>
			<div className="flex items-center justify-center pt-4">
				<Link href="/">
					<Button>Back to Home</Button>
				</Link>
			</div>
		</div>
	);
};

export default DashboardPage;
