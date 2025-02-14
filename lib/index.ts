import { z } from "zod";

export const Formvalidation = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email(),
	password: z.string().min(8).max(20),
});

export const PatientFormSchema = z.object({
	name: z.string().min(2).max(50),
	email: z.string().email(),
	date: z.string().min(2),
	gender: z.string().min(1),
	address: z.string().min(10).max(100),
	occupation: z.string().min(1).max(50),
	emergency_contact: z.preprocess(
		(val) => Number(val),
		z.number().min(1, "Invalid number")
	),
	doctors: z
		.string({
			required_error: "Please select a doctor",
		})
		.min(1, "Please select a doctor"),
	insurance: z.string().min(1).max(50),
	bloodgroup: z.string().min(1).max(50),
	allergies: z.string().min(1).max(50),
	currentmedication: z.string().min(1).max(50),
	familymedical: z.string().min(1).max(50),
	pastmedical: z.string().min(1).max(50),
});
