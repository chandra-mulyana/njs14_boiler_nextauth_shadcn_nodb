"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function handleCredentialsSignIn({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Salah Email atau Password " };
				case "AccessDenied":
					return { error: "Access Denied!" };
				default:
					return { error: "Ada yang salah" };
			}
		}
		throw error;
	}
}

export async function handleSignOut() {
	await signOut();
}
