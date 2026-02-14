"use client";

import {
  BookOpen,
  Clock,
  Heart,
  LayoutGrid,
  Library,
  Settings,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { icon: Library, label: "All Books", href: "/library", count: 2 },
    { icon: Clock, label: "Recent", href: "/library?filter=recent", count: 2 },
    {
      icon: Heart,
      label: "Favorites",
      href: "/library?filter=favorites",
      count: 0,
    },
    {
      icon: LayoutGrid,
      label: "Collections",
      href: "/library?filter=collections",
    },
  ];

  const categories = [
    { icon: BookOpen, label: "Reading Now", count: 1 },
    { icon: Trash2, label: "Trash", count: 0 },
  ];

  return (
    <aside className={cn("w-64 flex-shrink-0 flex flex-col gap-8", className)}>
      <div className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
              item.href === pathname ||
                (item.href !== "/library" && pathname.startsWith(item.href))
                ? "bg-indigo-500/10 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.1)] border border-indigo-500/20"
                : "text-slate-400 hover:text-slate-100 hover:bg-white/5 hover:translate-x-1",
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </div>
            {item.count !== undefined && (
              <span className="text-xs opacity-60">{item.count}</span>
            )}
          </Link>
        ))}
      </div>

      <div className="space-y-1">
        <h3 className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Library
        </h3>
        {categories.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all duration-200 hover:translate-x-1"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </div>
            {item.count !== undefined && (
              <span className="text-xs opacity-60">{item.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-auto px-4">
        <button className="flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
