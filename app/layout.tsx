import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const instrumentSerif = Geist({ subsets: ["latin"], variable: "--font-serif" });
const instrumentMono = Geist({ subsets: ["latin"], variable: "--font-mono" });
export const metadata: Metadata = {
    title: "Momentum",
    description: "Minimal task management",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(
                "min-h-screen bg-white font-sans antialiased",
                geist.variable,
                instrumentSerif.variable,
                instrumentMono.variable
            )}>
                {children}
            </body>
        </html>
    );
}
