import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MediCare Plus - Patient Management System",
    description: "Modern healthcare management system for efficient patient care, medical records, and appointment scheduling",
    keywords: "healthcare, patient management, medical records, doctors, appointments, medical care",
    authors: [{ name: "MediCare Plus Team" }],
    openGraph: {
        title: "MediCare Plus - Patient Management System",
        description: "Advanced healthcare management platform for modern medical practices",
        type: "website"
    }
};


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					{children}
					<Toaster position="top-right" reverseOrder={false} />
				</ThemeProvider>
			</body>
		</html>
	);
}
