"use client";

import {
  BookOpen,
  Code2,
  Feather,
  FileType,
  Globe,
  Heart,
  Layout,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
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
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-indigo-900/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900/10 blur-[100px] pointer-events-none" />

      <div className="max-w-2xl w-full bg-slate-900/80 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative z-10">
        {/* Header Section with Gradient */}
        <div className="relative p-8 pb-10 overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 p-6 opacity-20 hidden md:block">
            <BookOpen className="w-48 h-48 text-indigo-500 transform rotate-12" />
          </div>
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6 justify-center md:justify-start">
              <div className="p-4 rounded-3xl bg-indigo-500/20 shadow-inner ring-1 ring-white/10">
                <Sparkles className="w-8 h-8 text-indigo-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                  MyEbook Reader
                </h1>
                <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-slate-400 font-medium">
                  <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-xs text-white/90">
                    v1.0.0
                  </span>
                  <span>•</span>
                  <span>Beta Release</span>
                </div>
              </div>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
              A modern, beautifully designed ebook reader for the web.
              Experience your favorite stories in a distraction-free,
              liquid-style environment.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 bg-black/20 border-t border-white/5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 bg-white/5"
            >
              <div
                className={`p-3 rounded-xl h-fit ${feature.bg} ${feature.color} ring-1 ring-white/5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 mb-1 group-hover:text-white transition-colors text-lg">
                  {feature.title}
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Tech Stack */}
        <div className="p-6 bg-slate-950/50 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-slate-300 transition-colors">
              <Code2 className="w-4 h-4" /> Built with Next.js
            </span>
            <span className="flex items-center gap-2 hover:text-slate-300 transition-colors">
              <Feather className="w-4 h-4" /> Tailwind CSS
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            <span>by Antigravity</span>
          </div>
        </div>

        {/* Back Button */}
        <div className="absolute top-6 right-6 z-20">
          <Link href="/library">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-white/10 rounded-full"
            >
              Close
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
