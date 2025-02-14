import { NextResponse } from "next/server";
import { ID } from "appwrite";
import { databases } from "@/lib/appwrite";
import { formConfig } from "@/lib/actions/config";


export async function POST(req: Request) {
    try {

        const body = await req.json();

        const { name, email, date, gender, address, occupation, emergency_contact,doctors, insurance,bloodgroup,allergies,currentmedication,familymedical,pastmedical } = body;

        if (!name || !email  || !date || !gender || !address || !occupation || !emergency_contact ||!doctors ||!insurance ||!bloodgroup ||!allergies ||!currentmedication ||!familymedical ||!pastmedical ) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
        }

        const document = await databases.createDocument(
            formConfig.databaseId,
            formConfig.collectionId,
            ID.unique(),
            { name, email, date, gender, address, occupation, emergency_contact,doctors, insurance,bloodgroup,allergies,currentmedication,familymedical,pastmedical }
        );

        return NextResponse.json({ success: true, data: document }, { status: 200 });

    } catch (error: any) {
        
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
