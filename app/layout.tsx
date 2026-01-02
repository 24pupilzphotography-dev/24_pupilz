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
  title: "24_pupilz_photography | Capturing Moments",
  description: "Professional photography portfolio by 24_pupilz_photography. Capturing life's most beautiful moments.",
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
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
