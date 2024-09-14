import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { signInSchema } from "./lib/zod";
import {
	DEFAULT_LOGIN_REDIRECT,
	apiAuthPrefix,
	authRoutes,
	publicRoutes,
} from "@/routes";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Github,
		Google,
		Credentials({
			credentials: {},
			async authorize(credentials) {
				let user = null;

				// Validasi dari sisi server
				const parsedCredentials = signInSchema.safeParse(credentials);
				if (!parsedCredentials.success) {
					console.error(
						"Invalid Credentials",
						parsedCredentials.error.errors
					);
					return null;
				}

				if (parsedCredentials.data.email !== "test@test.com") {
					console.log("Salah email");
					return null;
				}

				if (parsedCredentials.data.password !== "987654321") {
					console.log("Salah password");
					return null;
				}

				user = {
					id: "1",
					name: "chandra",
					email: "test@test.com",
					role: "admin",
				};

				return user;
			},
		}),
	],
	callbacks: {
		authorized({ request: { nextUrl }, auth }) {
			const isLoggedIn = !!auth?.user;

			const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
			const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
			const isAuthRoute = authRoutes.includes(nextUrl.pathname);

			if (isPublicRoute) {
				return true;
			}

			if (isApiAuthRoute) {
				return true;
			}

			if (isAuthRoute) {
				if (isLoggedIn) {
					return Response.redirect(
						new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
					);
				}
				return true;
			}

			if (!isLoggedIn && !isPublicRoute) {
				return Response.redirect(new URL("/auth/login", nextUrl));
			}

			return !!auth;
		},

		// Untuk penambahan field ID dalam session ini,
		// Silahkan tambahkan lihat file /types/next-auth.d.ts
		jwt({ token, user }) {
			if (user) {
				token.id = user.id as string;
				token.role = user.role as string;
			}
			return token;
		},

		session({ session, token }) {
			session.user.id = token.id;
			session.user.role = token.role;
			return session;
		},
	},
	pages: {
		signIn: "/auth/login",
	},
});
