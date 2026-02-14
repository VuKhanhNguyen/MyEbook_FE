"use client";

import { Book } from "@/types";
import { BookCover } from "@/components/ui/BookCover";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

interface ContinueReadingProps {
  book: Book;
}

export function ContinueReading({ book }: ContinueReadingProps) {
  const progress = book.progress || 0;
  const bookUrl = `http://localhost:4000/uploads/${book.path}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full overflow-hidden rounded-3xl bg-slate-900/40 border border-white/10 p-6 md:p-8 mb-10 group"
    >
      {/* Background Gradient & Blur */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-3xl z-0" />
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" /> */}

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        {/* Book Cover */}
        <div className="relative shrink-0 w-32 md:w-48 aspect-2/3 shadow-2xl rounded-lg overflow-hidden transform transition-transform group-hover:scale-105 duration-500">
          <BookCover book={book} />
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase border border-indigo-500/30">
              Continue Reading
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-serif leading-tight">
              {book.title || "Untitled Book"}
            </h2>
            <p className="text-slate-400 text-lg">
              {book.originalName.replace(/\.(epub|pdf|mobi|prc)$/i, "")}
            </p>
          </div>

          <div className="space-y-2 max-w-md mx-auto md:mx-0">
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-indigo-500 to-purple-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="pt-4">
            <Link href={`/reader/${book.id}`}>
              <Button
                size="lg"
                className="rounded-full bg-white text-slate-900 hover:bg-indigo-50 px-8 py-6 font-semibold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95"
              >
                <Play className="fill-slate-900 mr-2 h-5 w-5" />
                Resume Reading
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
