import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { cn } from "@/lib/utils"; // Assuming utils exists or will use simple concat if not

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Liquid Reader",
  description: "A premium glassmorphism ebook reader",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LiquidBackground />
        <Header />
        <main className="relative z-10 min-h-screen flex flex-col pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
