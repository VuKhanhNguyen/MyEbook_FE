"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import {
  BookOpen,
  Code2,
  Feather,
  FileType,
  Globe,
  Heart,
  Layers,
  Layout,
  Sparkles,
  Zap,
  X,
} from "lucide-react";

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  const features = [
    {
      icon: Layout,
      title: "Liquid Interface",
      description: "Immersive glassmorphism design that feels alive.",
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      icon: FileType,
      title: "Multi-Format",
      description: "Support for EPUB, PDF, MOBI, and PRC files.",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance for smooth reading.",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      icon: Globe,
      title: "Read Anywhere",
      description: "Your library, accessible from any device.",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-slate-900/95 backdrop-blur-3xl border-white/10 text-white shadow-2xl overflow-hidden p-0 gap-0 [&>button]:hidden">
        {/* Header Section with Gradient */}
        <div className="relative p-6 pb-8 overflow-hidden">
          <div className="absolute top-0 right-0 p-3 opacity-20">
            <BookOpen className="w-32 h-32 text-indigo-500 transform rotate-12" />
          </div>
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 via-transparent to-transparent pointer-events-none" />

          {/* Custom Close Button */}
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <DialogHeader className="relative z-10 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-indigo-500/20 shadow-inner ring-1 ring-white/10">
                <Sparkles className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight text-white">
                  MyEbook Reader
                </DialogTitle>
                <div className="flex items-center gap-2 text-sm text-slate-400 font-medium mt-1">
                  <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-white/80">
                    v1.0.0
                  </span>
                  <span>•</span>
                  <span>Beta Release</span>
                </div>
              </div>
            </div>
            <DialogDescription className="text-slate-300 text-base leading-relaxed max-w-md mt-2">
              A modern, beautifully designed ebook reader for the web.
              Experience your favorite stories in a distraction-free,
              liquid-style environment.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-black/20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 bg-white/5"
            >
              <div
                className={`p-3 rounded-xl h-fit ${feature.bg} ${feature.color} ring-1 ring-white/5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 mb-1 group-hover:text-white transition-colors">
                  {feature.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Tech Stack */}
        <div className="p-4 bg-slate-950/50 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
              <Code2 className="w-3.5 h-3.5" /> Built with Next.js
            </span>
            <span className="flex items-center gap-1.5 hover:text-slate-300 transition-colors">
              <Feather className="w-3.5 h-3.5" /> Tailwind CSS
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>by NguyenVuKhanh</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
