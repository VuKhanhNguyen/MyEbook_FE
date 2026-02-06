import Link from "next/link";
import { BookOpen, Upload } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="glass-card flex max-w-2xl flex-col items-center gap-8 p-12 text-center">
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-purple-500/20 blur-xl"></div>
          <BookOpen className="relative h-20 w-20 text-white/90" />
        </div>

        <h1 className="bg-gradient-to-br from-white to-white/60 bg-clip-text text-6xl font-bold text-transparent">
          Liquid Reader
        </h1>

        <p className="max-w-md text-xl text-white/70">
          Experience your books in a premium, distraction-free glass
          environment. Seamless .epub rendering with a fluid aesthetic.
        </p>

        <div className="flex gap-4">
          <Link
            href="/reader"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] border border-white/10"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Reading <BookOpen className="h-5 w-5" />
            </span>
          </Link>

          <button className="flex items-center gap-2 rounded-full border border-white/10 px-8 py-4 font-semibold text-white/60 transition-colors hover:bg-white/5 hover:text-white">
            <Upload className="h-5 w-5" /> Upload
          </button>
        </div>
      </div>
    </div>
  );
}
