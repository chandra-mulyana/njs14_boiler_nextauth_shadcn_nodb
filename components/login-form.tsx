"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/lib/zod";
import { useState, useTransition } from "react";
import { handleCredentialsSignIn } from "@/app/actions/authActions";
import { Social } from "@/components/auth/social";

// import ConfirmationDialog, {
// 	useAlertDialog,
// } from "@/components/peringatan/confirm-dialog";
import ReusableAlertDialog, {
	useAlertDialog,
} from "@/components/peringatan/alert-dialog";

export default function LoginForm() {
	const [isPending, startTransition] = useTransition();
	const [globalError, setGlobalError] = useState<string | undefined>("");
	const { isOpen, openAlert, closeAlert } = useAlertDialog();

	const formsch = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const submitHandler = async (values: z.infer<typeof signInSchema>) => {
		startTransition(async () => {
			try {
				const result = await handleCredentialsSignIn(values);
				setGlobalError(result?.error);
				openAlert();
				console.log("Result : ", result);
			} catch (error) {
				console.log("Ada error");
			}
		});
	};

	const handleConfirm = () => {
		console.log("Confirmed!");
		// Add your confirmation logic here
	};

	return (
		<Card className="mx-auto max-w-sm">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				{globalError && (
					// <ConfirmationDialog
					// 	isOpen={isOpen}
					// 	close={closeAlert}
					// 	title="Konfirmasi"
					// 	description={globalError}
					// 	confirmText="OK"
					// 	cancelText="Cancel"
					// 	onConfirm={handleConfirm}
					// 	onCancel={handleCancel}
					// />

					// // Mode : False -> Error Alert
					//      : True -> Informasi Alert

					<ReusableAlertDialog
						isOpen={isOpen}
						close={closeAlert}
						mode={false}
						title="Error"
						description={globalError}
						OKText="Close"
						onConfirm={handleConfirm}
					/>
				)}
				<Form {...formsch}>
					<form
						className="space-y-8"
						onSubmit={formsch.handleSubmit(submitHandler)}
					>
						<FormField
							control={formsch.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											type="email"
											placeholder="Enter your email"
											autoComplete="off"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={formsch.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											type="password"
											placeholder="Enter password"
											autoComplete="off"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							disabled={isPending}
							type="submit"
							className="w-full"
						>
							Login with Credential
						</Button>
					</form>
				</Form>
				<span className="text-sm text-gray-500 text-center block pt-4">
					or
				</span>
			</CardContent>
			<CardFooter>
				<Social />
			</CardFooter>
		</Card>
	);
}
