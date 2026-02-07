import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { LiquidBackground } from "@/components/ui/LiquidBackground";
import { Toaster } from "sonner";
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
        <AuthProvider>
          <LiquidBackground />
          <Header />
          <main className="relative z-10 min-h-screen flex flex-col pt-16">
            {children}
          </main>
          <Footer />
          <Toaster
            position="top-right"
            duration={5000}
            theme="dark"
            richColors
          />
        </AuthProvider>
      </body>
    </html>
  );
}
