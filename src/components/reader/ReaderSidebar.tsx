"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

interface ReaderSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  toc?: NavItem[]; // Simplified TOC structure for now
  onTocClick: (href: string) => void;
}

export const ReaderSidebar = ({
  isOpen,
  onClose,
  toc = [],
  onTocClick,
}: ReaderSidebarProps) => {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 h-full w-80 transform bg-black/90 backdrop-blur-xl border-r border-white/10 shadow-2xl transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Contents</h2>
        <button
          onClick={onClose}
          className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="h-[calc(100%-80px)] overflow-y-auto p-4 scrollbar-thin">
        {toc.length === 0 ? (
          <p className="text-white/50 text-center mt-10">No chapters found</p>
        ) : (
          <ul className="space-y-2">
            {toc.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => onTocClick(item.href)}
                  className="w-full text-left rounded-lg px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
