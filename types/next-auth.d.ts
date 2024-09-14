import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	// Penambahan field pada session
	interface User {
		id: string;
		role: string;
	}
	interface Session {
		user: User;
	}
}

declare module "next-auth/jwt" {
	// Penambahan field pada session
	interface JWT {
		id: string;
		role: string;
	}
}
