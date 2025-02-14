"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Formvalidation } from "@/lib";
import { CreateUser } from "@/lib/actions/user.actions";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import OTPForm from "./OTPForm";

const RegisterForm = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof Formvalidation>>({
		resolver: zodResolver(Formvalidation),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit({
		name,
		email,
		password,
	}: z.infer<typeof Formvalidation>) {
		setLoading(true);
		try {
			if (!name || !email || !password) {
				throw new Error("Please fill all fields");
			}

			const data = { name, email, password };
			const response = await CreateUser(data);

			if (response.success) {
				document.cookie = "registered=true; path=/";
				toast.success(response.message);
				form.reset(); //  Reset only when user creation is successful
				router.replace("/patients");
			} else {
				router.push("/");
				toast.error(response.message);
			}
		} catch (error: any) {
			console.error("Error in user creation:", error); //  Debugging line
			toast.error(error?.message || "An unexpected error occurred");
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
					<section className="flex flex-col gap-4">
						<h1 className="flex items-center gap-3 text-4xl font-bold text-blue-600">
							<svg
								className="h-12 w-12 text-blue-500 animate-heartbeat"
								viewBox="0 0 24 24"
								fill="currentColor">
								<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
								<path
									d="M3 12h4l2-3 3 6 2-3h4"
									fill="none"
									stroke="white"
									strokeWidth="1.5"
									className="animate-pulse-line"
								/>
							</svg>
							<span className="animate-fade-in">Health Care</span>
						</h1>
					</section>

					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Name"
										{...field}
										className="bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 "
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										className="bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 "
										placeholder="example@example.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										className="bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 "
										placeholder="Password"
										type="password"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">
						{loading ? (
							<>
								<Loader2 className="h-4 w-4 animate-spin" />
								Submitting...
							</>
						) : (
							"Submit"
						)}
					</Button>
				</form>
			</Form>
			<div className="my-5">
				<OTPForm />
			</div>
		</>
	);
};

export default RegisterForm;
