"use client";

import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-black/20 backdrop-blur-sm mt-auto">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-white/90">Liquid Reader</h3>
          <p className="mt-2 text-sm text-white/50">
            The next generation of ebook reading.
          </p>
        </div>

        <div className="flex gap-8 text-sm text-white/60">
          <Link href="#" className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex gap-4">
          <Link
            href="#"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Liquid Reader. All rights reserved.
      </div>
    </footer>
  );
};
