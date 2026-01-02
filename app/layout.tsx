import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const autography = localFont({
  src: "./fonts/Autography.otf",
  variable: "--font-autography",
});

export const metadata: Metadata = {
  title: "24_pupilz Photography | Capturing Moments That Last Forever",
  description: "Professional wedding, baby shower, and event photography in Sathyamangalam, Erode. Capturing life's most beautiful moments with authenticity and artistry.",
  keywords: ["photography", "wedding photography", "baby shower", "Sathyamangalam", "Erode", "Tamil Nadu", "24_pupilz"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${autography.variable} antialiased bg-background text-foreground`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
