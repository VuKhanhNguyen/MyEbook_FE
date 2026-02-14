"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SortOption, ViewMode } from "@/types";
import {
  ArrowUpDown,
  LayoutGrid,
  List as ListIcon,
  Plus,
  Search,
  Check,
  Info,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AboutDialog } from "./AboutDialog";

interface LibraryHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  onUploadClick: () => void;
}

export function LibraryHeader({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  sortOption,
  setSortOption,
  onUploadClick,
}: LibraryHeaderProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortLabels: Record<SortOption, string> = {
    recent: "Recently Added",
    title: "Title (A-Z)",
    author: "Author",
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 relative z-30">
      {/* Search Bar */}
      <div className="relative w-full md:w-96 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 z-10 pointer-events-none group-focus-within:text-indigo-400 transition-colors" />
        <Input
          type="text"
          placeholder="Search for books, authors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11 bg-slate-900/50 border-white/10 rounded-full text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all w-full"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 w-full md:w-auto">
        {/* Sort Dropdown (Custom Implementation) */}
        <div className="relative" ref={sortRef}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="h-10 border-white/10 bg-slate-900/50 text-slate-300 hover:text-white hover:bg-white/10 min-w-[140px] px-3"
          >
            <span className="flex items-center w-full justify-between">
              <span className="flex items-center text-sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                {sortLabels[sortOption]}
              </span>
            </span>
          </Button>

          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute right-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 p-1"
              >
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortOption(option);
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between transition-colors ${
                      sortOption === option
                        ? "bg-indigo-500/20 text-indigo-300"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{sortLabels[option]}</span>
                    {sortOption === option && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-900/50 border border-white/10 rounded-lg p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={`h-8! w-8! p-0! rounded-md flex items-center justify-center ${
              viewMode === "grid"
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("list")}
            className={`h-8! w-8! p-0! rounded-md flex items-center justify-center ${
              viewMode === "list"
                ? "bg-white/10 text-white"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={onUploadClick}
          className="ml-auto md:ml-2 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 px-6 flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2 text-black" />
          <span className="text-sm font-medium text-stone-950">Upload</span>
        </Button>

        {/* About Trigger */}
        <Button
          variant="ghost"
          size="icon"
          title="About"
          onClick={() => setIsAboutOpen(true)}
          className="h-10 w-10 border rounded-full text-slate-400 hover:text-white hover:bg-white/10 bg-amber-200"
        >
          <span className="text-sm font-medium text-stone-950">
            <Info />
          </span>
        </Button>
      </div>

      <AboutDialog open={isAboutOpen} onOpenChange={setIsAboutOpen} />
    </div>
  );
}
