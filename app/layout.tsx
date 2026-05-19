import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Batik AI Studio",
  description: "Sintesis Filosofi Motif Leluhur Nusantara dengan Kecerdasan Buatan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Fonts used by the Landing Page */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Playfair+Display:wght@400&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet" />
        {/* Material Symbols */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background">
        <Navbar />
        {/* Padding top 16 added to account for the fixed Navbar */}
        <div className="pt-16 flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}