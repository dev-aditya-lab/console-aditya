import type { Metadata } from "next";
import { ThemeProvider } from "@/components/Theme/theme-provider";
import { MainNavbar } from "@/components/MainNavbar";
import { Contact } from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
    title: "Blog — Console Aditya",
    description:
        "Thoughts, tutorials, and project write-ups about web development, TypeScript, React, Next.js, and software engineering.",
    authors: [{ name: "Aditya" }],
    keywords: [
        "blog",
        "web development",
        "TypeScript",
        "React",
        "Next.js",
        "software engineering",
        "tutorials",
        "projects"
    ],
    openGraph: {
        title: "Blog — Console Aditya",
        description:
            "Thoughts, tutorials, and project write-ups about web development, TypeScript, React, Next.js, and software engineering.",
        siteName: "Console Aditya",
        type: "website",
        locale: "en_US",
        url: "https://console-aditya.vercel.app/blog",
        images: [
            {
                url: "/logo.jpg",
                width: 1200,
                height: 630,
                alt: "Console Aditya Blog"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog — Console Aditya",
        description:
            "Thoughts, tutorials, and project write-ups about web development, TypeScript, React, Next.js, and software engineering.",
        images: ["/logo.jpg"]
    }
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
                >
                    <MainNavbar/>
                    {children}
                    <Contact/>
                    <Footer/>
                </ThemeProvider>
            </body>
        </html>
    );
}
