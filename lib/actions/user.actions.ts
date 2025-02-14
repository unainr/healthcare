"use server";
import { ID, Query } from "appwrite";
import { databases, users } from "../appwrite";


export interface UsersProps {
	name: string;
	email: string;
	password: string;
}

export const CreateUser = async (user: UsersProps) => {
	try {
		const newUser = await users.create(
			ID.unique(),
			user.email,
			undefined,
			user.password,
			user.name
		);

		return {
			success: true,
			message: "User created successfully",
			newUser,
		};
	} catch (error: any) {
		if (error.code === 409) {
			const documents = await users.list([Query.equal("email", user.email)]);
			return {
				success: false,
				message: "Email already exists",
				user: documents?.users[0] || null,
			};
		}

		console.error("Unexpected error in CreateUser:", error);

		// Always return a structured response
		return {
			success: false,
			message: error.message || "Failed to create user",
			user: null,
		};
	}
};


export const passCode = async (passcode: number) => {
	try {
	  // Fetch document from Appwrite
	  const response = await databases.getDocument(
		process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
		process.env.NEXT_PUBLIC_APPWRITE_ADMIN_COLLECTION_ID!,
		process.env.NEXT_PUBLIC_APPWRITE_DOCUMENT_ID!
	  );
  
  
	  // Ensure correct data type
	  const storedOtp = Number(response.adminpasscode);
  
	  if (isNaN(storedOtp)) {
		return { success: false, message: "Stored passcode is invalid" };
	  }
  
	  if (storedOtp === passcode) {
		return { success: true, message: "Passcode matched" };
	  } else {
		return { success: false, message: "Passcode not matched" };
	  }
	} catch (error: any) {
	  console.error("Error validating passcode:", error);
	  return { success: false, message: "Error validating passcode" };
	}
  };


  export const getPatient = async ()=>{
	try {
		const response = await databases.listDocuments(
			process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
			process.env.NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID!,
			[Query.orderDesc("$createdAt")]
		);
	
		return {
			success: true,
			message: "Patient fetched successfully",
			patients: response.documents,
		};
	} catch (error: any) {
		console.error("Error fetching patients:", error);
		return {
			success: false,
			message: "Failed to fetch patients",
			patients: [],
		};
	}
  }