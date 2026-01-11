import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const aeonik = localFont({
    src: [
        {
            path: "../fonts/Aeonik-Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../fonts/Aeonik-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/Aeonik-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../fonts/Aeonik-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-aeonik",
});

export const metadata: Metadata = {
    title: "HIFLIX",
    description: "AI-Curated Video Channels",
};


// Wrapper layout handles Header/Footer per route group

// ...

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
            <body className={cn(aeonik.variable, "bg-black text-white antialiased min-h-screen relative font-sans")} suppressHydrationWarning>
                <div className="fixed inset-0 bg-noise z-50 pointer-events-none mix-blend-overlay opacity-30" />
                <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 via-black to-black -z-10" />
                {children}
            </body>
        </html>
    );
}
