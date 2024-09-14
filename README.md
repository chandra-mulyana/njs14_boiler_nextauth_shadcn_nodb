# Next.JS14 + NextAuth5 + Shadcn UI

## Skenario

Untuk login, gunakan :
Email : `test@test.com`
Password : `987654321`

Halaman Dashboard di protect. Hanya bisa diakses setelah login berhasil

## Install Shadcn

```
npx shadcn@latest init
```

## Instalasi NextAuth dan ZOD

Next Auth
Zod

```
npm i next-auth@beta zod
```

## Setting Next Auth

### Generate Auth Secret

```
npx auth secret
```

### Create NextAuth config file

Buat file `auth.ts` sejajar dengan folder `app` isinya :

```
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [],
});
```

### buat file `route.ts` di folder `app/api/auth/[...nextauth]` yang isinya adalah :

```
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

### Create Middleware

Buat file `middleware.ts` sejajar dengan folder `app` isinya :

```
export { auth as middleware } from "@/auth";

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
```

## Pengaturan Providers

Di file `auth.ts`

```
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		Credentials({
			credentials: {},
			async authorize(credentials) {
				let user = null;

				// Check user dan password dari db

				user = {
					id: "1",
					name: "chandra",
					email: "motorcb100@gmail.com",
				};

				if (!user) {
					console.log("Salah Password");
					return null;
				}

				return user;
			},
		}),
	],
});

```

Sekarang bisa ditest dulu untuk sign in

`http://localhost:3000/api/auth/signin`

Kalau di tekan tombol sign in with credentials, maka langsung login. Silahkan check di Session nya

## Install Form dan Input Component

```
npx shadcn@latest add form input
```

## File-file yang berhubungan dengan Authentikasi

## route.ts

Lokasi : `@/app/api/auth/[...nextauth]`
Ini untuk NextAuth

## routes.ts

Lokasi : `@/`
Pendefinisian routing.
Ini berguna saat otorisasi

## middleware.ts

Lokasi : `@/`
Posisinya harus sejajar dengan folder `app`
Fungsinya untuk mengecek setiap request

## auth.ts

Lokasi : `@/`
Posisinya harus sejajar dengan folder `app`
Fungsinya untuk :

-   Pendaftaran Provider
-   Pengecekan Credentials Provider
-   Middleware Auth (ada di callback `authorized`)

# next-auth.d.ts

Lokasi : `@/types`
Fungsinya untuk penambahan field pada session

# zod.ts

Lokasi : `@/lib`
Fungsinya untuk validasi form

# authActions.ts

Lokasi : `@/app/actions`
Fungsinya server side actions untuk signIn dan signOut
