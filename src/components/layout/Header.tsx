"use client";

import Link from "next/link";
import { BookOpen, User, Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Library", href: "/reader" },
    { name: "About", href: "/about" },
  ];

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="glass-card mx-auto flex max-w-7xl items-center justify-between px-6 py-3 rounded-full border-white/10 bg-black/20 backdrop-blur-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white/90">
            Liquid Reader
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                pathname === item.href
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/5",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm font-medium text-white/90">
                Hello {user?.email}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium text-white"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium text-white">
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-20 left-6 right-6 p-4 rounded-2xl glass-card bg-black/60 backdrop-blur-xl md:hidden flex flex-col gap-2 animate-in fade-in slide-in-from-top-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "px-4 py-3 text-base font-medium rounded-xl transition-colors",
                pathname === item.href
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
