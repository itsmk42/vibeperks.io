import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vibeperks.io | Developer Perks Marketplace",
  description: "A centralized marketplace for solo developers to discover free credits, perks, and benefits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased bg-white text-black text-sm`}
      >
        {children}
      </body>
    </html>
  );
}
