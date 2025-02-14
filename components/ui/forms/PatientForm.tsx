"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PatientFormSchema } from "@/lib";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { ActivityIcon, HeartPulseIcon, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from "react-hot-toast";
import { doctors } from "@/lib/actions/config";
import { useRouter } from "next/navigation";
const PatientForm = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof PatientFormSchema>>({
		resolver: zodResolver(PatientFormSchema),
		defaultValues: {
			name: "",
			email: "",
			date: "",
			gender: "",
			address: "",
			occupation: "",
			emergency_contact: 0,
			doctors: "",
			insurance: "",
			bloodgroup: "",
			allergies: "",
			currentmedication: "",
			familymedical: "",
			pastmedical: "",
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof PatientFormSchema>) {
		setLoading(true);
		try {
			const response = await fetch("/api/create-patient", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			});

			const data = await response.json();

			if (data.success) {
				 document.cookie = 'formSubmitted=true; path=/'
				toast.success("Patient created successfully");
				form.reset();
				router.push("/success");
			} else {
				toast.error(data.message || "Something went wrong");
				router.push("/");
			}
		} catch (error: any) {
			console.error(error);
			toast.error(error.message || "Submission failed");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
				<section className="flex flex-col  gap-4 bg-gradient-to-r  p-6 rounded-xl shadow-md">
					<div className="flex items-center gap-3">
						<div className="p-3 bg-blue-500 rounded-lg shadow-lg">
							<ActivityIcon className="w-8 h-8 text-white animate-pulse" />
						</div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
							Health Care
						</h1>
					</div>
					
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
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
						name="date"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Date</FormLabel>
								<FormControl>
									<Input
										placeholder="Date"
										type="date"
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
						name="gender"
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormLabel>Gender</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex ">
										<FormItem className="flex items-center space-x-3 space-y-0  ">
											<FormControl>
												<RadioGroupItem value="male" />
											</FormControl>
											<FormLabel className="font-normal ">Male</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0 ">
											<FormControl>
												<RadioGroupItem value="female" />
											</FormControl>
											<FormLabel className="font-normal">Female</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="other" />
											</FormControl>
											<FormLabel className="font-normal">Other</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input
										placeholder="Address"
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
						name="occupation"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Occupation</FormLabel>
								<FormControl>
									<Input
										placeholder="Occupation"
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
						name="emergency_contact"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Emergency Contact</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="emergency_contact"
										{...field}
										className="bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 "
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<section className="flex flex-col gap-4 bg-gradient-to-r  p-6 rounded-xl shadow-md">
					<div className="flex items-center gap-3">
						<div className="p-3 bg-rose-500 rounded-lg shadow-lg">
							<HeartPulseIcon className="w-8 h-8 text-white animate-pulse" />
						</div>
						<h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
							Medical Information
						</h1>
					</div>
				</section>
				<FormField
					control={form.control}
					name="doctors"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Doctor</FormLabel>
							<FormControl>
								<div className="relative">
									<select
										{...field}
										className="w-full p-2 pl-12 border rounded-md  border-dark-500">
										<option value="">Select a Doctor</option>
										{doctors.map((doctor) => (
											<option
												key={doctor.name}
												value={doctor.name}
												className="flex items-center gap-2">
												{doctor.name}
											</option>
										))}
									</select>
									{field.value && (
										<div className="absolute left-2 top-1/2 -translate-y-1/2">
											<img
												src={doctors.find((d) => d.name === field.value)?.image}
												alt={field.value}
												className="w-8 h-8 rounded-full object-cover"
											/>
										</div>
									)}
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<FormField
						control={form.control}
						name="insurance"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Insurance Provider</FormLabel>
								<FormControl>
									<Input
										placeholder="Insurance Provider"
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
						name="bloodgroup"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Blood Group</FormLabel>
								<FormControl>
									<Input
										placeholder="Blood Group"
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
						name="allergies"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Allergies (if any)</FormLabel>
								<FormControl>
									<Input
										placeholder="Allergies"
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
						name="currentmedication"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Current Medication</FormLabel>
								<FormControl>
									<Input
										placeholder="Current Medication"
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
						name="familymedical"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Family Medical History (If Relevant)</FormLabel>
								<FormControl>
									<Input
										placeholder="Family Medical"
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
						name="pastmedical"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Past Medical History</FormLabel>
								<FormControl>
									<Input
										placeholder="Past Medical"
										{...field}
										className="bg-dark-400 placeholder:text-dark-600 border-dark-500 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 "
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

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
	);
};

export default PatientForm;
