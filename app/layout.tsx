import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import React from "react";


const courierPrime = Courier_Prime({
  variable: "--font-courier-prime",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "AtlanticJohnson",
  description: "Art by Atlantic Johnson",
  icons: {
    icon: "/logo-black.png",
    shortcut: "/logo-black.png",
    apple: "/logo-black.png",
  },
  keywords: ["Atlantic Johnson", "Art", "Music", "Visual Art", "Digital Art", "London Artists", "Up & Coming Artists", "Gunna Art", "Gunna"],
  authors: [{ name: "TeenWeeny Studio", url: "https://atlanticjohnson.com" }],
  creator: "onceuponaprince",
  publisher: "TeenyWeeny Studio",
  category: "art",
  applicationName: "Atlantic Johnson",
  twitter: {
    card: "summary_large_image",
    title: "Atlantic Johnson",
    description: "Art by Atlantic Johnson",
    images: "/SitePreview.png",
  },
  openGraph: {
    title: "Atlantic Johnson",
    description: "Art by Atlantic Johnson",
    images: "/SitePreview.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      
      <body className={`${courierPrime.variable} ${courierPrime.className} antialiased`}>
        <Providers>
          <div className=" flex min-h-screen w-full max-w-3xl flex-col items-center justify-between light:bg-background dark:bg-black sm:items-start">
            {children}
          </div>
          </Providers>
      </body>
    </html>
  );
}
