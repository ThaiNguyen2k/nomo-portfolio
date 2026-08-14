import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.example.com"),
  title: "Nomo - Nguyen Thai Nguyen | Frontend Developer",
  description:
    "Frontend Developer specializing in React, TypeScript, responsive commerce experiences, and AI-powered products.",
  keywords: ["Frontend Developer", "React Developer", "TypeScript", "Nguyen Thai Nguyen", "Ho Chi Minh City"],
  authors: [{ name: "Nguyen Thai Nguyen" }],
  openGraph: {
    title: "Nomo - Nguyen Thai Nguyen | Frontend Developer",
    description: "React & TypeScript developer crafting responsive interfaces and AI-powered products.",
    type: "website",
    locale: "en_US",
  },
  icons: { icon: "/nomo-logo-modern.png", shortcut: "/nomo-logo-modern.png", apple: "/nomo-logo-modern.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
