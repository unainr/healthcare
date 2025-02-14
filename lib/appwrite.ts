import {Databases } from "appwrite";

const sdk = require("node-appwrite");
const client = new sdk.Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
	.setKey(process.env.API_KEY!)
const databases = new Databases(client);
const users = new sdk.Users(client);

export { databases, users };
