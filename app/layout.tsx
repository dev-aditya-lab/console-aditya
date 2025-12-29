import type { Metadata } from "next";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Aditya Dev Portfolio";
const DEFAULT_DESCRIPTION =
	"Full-stack developer portfolio by Aditya — Next.js, TypeScript, Tailwind, and modern web projects, blogs, and tutorials.";

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: {
		default: SITE_NAME,
		template: "%s | Aditya",
	},
	description: DEFAULT_DESCRIPTION,
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title: SITE_NAME,
		description: DEFAULT_DESCRIPTION,
		url: BASE_URL,
		siteName: SITE_NAME,
		images: [
			{
				url: `${BASE_URL}/og.png`,
				width: 1200,
				height: 630,
				alt: `${SITE_NAME} — Portfolio`.
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: SITE_NAME,
		description: DEFAULT_DESCRIPTION,
		images: [`${BASE_URL}/og.png`],
		creator: "@aditya",
		site: "@aditya",
	},
	robots: {
		index: true,
		follow: true,
	},
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
