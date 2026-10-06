import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thainguyen2k.github.io/nomo-portfolio/"),
  title: "Nomo - Nguyen Thai Nguyen | Software Engineer",
  description:
    "Software Engineer building full-stack web, mobile, backend, cloud, and AI products with React, FastAPI, PostgreSQL, Cloudflare, and Expo.",
  keywords: ["Software Engineer", "Full-Stack Developer", "Backend Engineer", "FastAPI", "PostgreSQL", "Cloudflare", "React", "Nguyen Thai Nguyen", "Ho Chi Minh City"],
  authors: [{ name: "Nguyen Thai Nguyen" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nomo - Nguyen Thai Nguyen | Software Engineer",
    description: "Building complete software products across web, mobile, APIs, databases, cloud services, and AI.",
    type: "website",
    locale: "en_US",
    url: "/",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Nomo - Nguyen Thai Nguyen, Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nomo - Nguyen Thai Nguyen | Software Engineer",
    description: "Building complete software products across web, mobile, APIs, databases, cloud services, and AI.",
    images: ["/og.png"],
  },
  icons: { icon: "/nomo-logo-cube.png", shortcut: "/nomo-logo-cube.png", apple: "/nomo-logo-cube.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
