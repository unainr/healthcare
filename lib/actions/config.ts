 export const formConfig = {
	databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
	collectionId: process.env.NEXT_PUBLIC_APPWRITE_PATIENT_COLLECTION_ID!,
	admincollectionId: process.env.NEXT_PUBLIC_APPWRITE_ADMIN_COLLECTION_ID!,
	documentId: process.env.NEXT_PUBLIC_APPWRITE_DOCUMENT_ID!,
};



export const doctors = [
	{
	  name: "Dr. Sarah Wilson",
	  image: "https://randomuser.me/api/portraits/women/1.jpg"
	},
	{
	  name: "Dr. James Smith",
	  image: "https://randomuser.me/api/portraits/men/2.jpg"
	},
	{
	  name: "Dr. Emily Brown",
	  image: "https://randomuser.me/api/portraits/women/3.jpg"
	}
  ]
  