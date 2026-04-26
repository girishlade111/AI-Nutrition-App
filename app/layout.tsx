import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { IntakeProvider } from "@/app/context/IntakeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Swaad AI - Regional Nutrition",
    description: "AI Nutrition, Made for Maharashtra.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <IntakeProvider>
                    <main className="w-full max-w-lg mx-auto bg-white min-h-screen shadow-2xl overflow-hidden">
                        {children}
                    </main>
                </IntakeProvider>
            </body>
        </html>
    );
}
