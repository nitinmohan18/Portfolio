import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html 
      lang="en" 
      className={`dark ${inter.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#030712" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-dark-900 text-slate-100 antialiased overflow-x-hidden noise-overlay">
        {children}
      </body>
    </html>
  );
}
