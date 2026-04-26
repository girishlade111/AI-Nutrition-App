import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { IntakeProvider } from "@/app/context/IntakeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://swaad-ai.vercel.app"),
    title: {
        default: "Swaad AI - AI Nutrition App for Maharashtra",
        template: "%s | Swaad AI",
    },
    description: "Swaad AI is an AI-powered nutrition app designed specifically for Maharashtra. Track your daily nutrition, get personalized meal plans, and monitor your health with regional Indian food preferences. Free AI nutrition tracker for Indians.",
    keywords: [
        "AI nutrition app",
        "nutrition tracker India",
        "Maharashtra food nutrition",
        "healthy eating app",
        "meal planning AI",
        "Indian diet tracker",
        "weight management",
        "calorie counter Maharashtra",
        "personalized nutrition",
        "health tracking app",
    ],
    authors: [{ name: "Swaad AI", url: "https://ladestack.in" }],
    creator: "Swaad AI",
    publisher: "Swaad AI",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_IN",
        url: "https://swaad-ai.vercel.app",
        siteName: "Swaad AI",
        title: "Swaad AI - AI Nutrition App for Maharashtra",
        description: "AI-powered nutrition app designed for Maharashtra. Track your daily nutrition, get personalized meal plans, and monitor your health with regional Indian food preferences.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Swaad AI - AI Nutrition for Maharashtra",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Swaad AI - AI Nutrition App for Maharashtra",
        description: "AI-powered nutrition app designed for Maharashtra. Track your daily nutrition with personalized meal plans.",
        images: ["/og-image.png"],
        creator: "@girish_lade_",
    },
    verification: {
        google: "google-site-verification-code",
    },
    alternates: {
        canonical: "https://swaad-ai.vercel.app",
        languages: {
            "en-IN": "https://swaad-ai.vercel.app",
            "mr-IN": "https://swaad-ai.vercel.app",
        },
    },
    category: "health",
    classification: "Health & Fitness",
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
