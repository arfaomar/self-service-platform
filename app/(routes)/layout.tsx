import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import { cn } from "@lib/cn";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Self Serivce",
    description: "Corporate Self Service Portal",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "antialiased")}>
                <ClerkProvider>{children}</ClerkProvider>
            </body>
        </html>
    );
}
