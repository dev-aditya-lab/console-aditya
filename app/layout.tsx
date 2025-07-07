import type { Metadata } from "next";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
	title: "Console Aditya ",
	description:
		"As a Computer Science Engineering student with a passion for building impactful web applications, I specialize in crafting full-stack solutions using modern technologies like React, Next.js, Node.js, TypeScript, Firebase, Tailwind css. My portfolio showcases my journey in software development, highlighting projects that demonstrate my skills in creating user-friendly interfaces and robust back-end systems. I am committed to continuous learning and innovation, always seeking to enhance my expertise in the ever-evolving tech landscape.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" >
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					// disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
