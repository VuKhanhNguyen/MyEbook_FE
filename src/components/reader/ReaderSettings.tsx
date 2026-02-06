"use client";

import { Minus, Plus, Sun, Moon, Type } from "lucide-react";

interface ReaderSettingsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export const ReaderSettings = ({
  fontSize,
  setFontSize,
  theme,
  setTheme,
}: ReaderSettingsProps) => {
  return (
    <div className="absolute top-20 right-6 z-50 w-72 bg-neutral-900/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-xl p-5">
      <div className="space-y-4">
        {/* Font Size Control */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
            <Type className="h-4 w-4" /> Font Size
          </label>
          <div className="flex items-center justify-between gap-2 rounded-lg bg-white/10 p-1">
            <button
              onClick={() => setFontSize(Math.max(80, fontSize - 10))}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/20 text-white transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="text-white font-semibold text-sm">
              {fontSize}%
            </span>
            <button
              onClick={() => setFontSize(Math.min(200, fontSize + 10))}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/20 text-white transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Theme Control (Placeholder functionality as main theme is glass) */}
        <div>
          <label className="mb-2 text-sm text-white/70 block">View Mode</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition-colors ${
                theme === "dark"
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <Moon className="h-3 w-3" /> Dark
            </button>
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition-colors ${
                theme === "light"
                  ? "bg-white/20 text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              <Sun className="h-3 w-3" /> Light
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
