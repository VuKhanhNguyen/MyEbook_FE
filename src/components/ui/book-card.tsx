import { Book } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
}

export function BookCard({ book, onDelete }: BookCardProps) {
  const bookUrl = `http://localhost:4000/uploads/${book.path}`;

  return (
    <div className="group relative h-full">
      <div className="glass-card h-full flex flex-col overflow-hidden relative z-10">
        <Link
          href={`/reader?url=${encodeURIComponent(bookUrl)}`}
          className="block flex-grow relative"
        >
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            {/* Book Cover Placeholder or Image */}
            <div className="absolute inset-0 book-cover-placeholder flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <div className="text-center p-4">
                <span className="text-4xl block mb-2 filter drop-shadow-lg">
                  📖
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#f4ead5] opacity-50 font-bold">
                  {book.format}
                </span>
              </div>

              {/* Gradient Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </Link>

        <CardContent className="p-4 flex flex-col gap-2 relative bg-slate-900/40 backdrop-blur-sm">
          <Link href={`/reader?url=${encodeURIComponent(bookUrl)}`}>
            <h3
              className="font-serif font-bold text-lg leading-tight text-white line-clamp-2 group-hover:text-primary transition-colors"
              title={book.title}
            >
              {book.title || "Untitled Book"}
            </h3>
          </Link>

          <div className="flex items-center justify-between mt-auto">
            <p className="text-xs text-slate-400 truncate max-w-[60%]">
              {book.originalName}
            </p>
            <span className="text-xs text-slate-500 font-mono">
              {(book.size / 1024 / 1024).toFixed(1)} MB
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-3 pt-0 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              onDelete(book._id);
            }}
            className="text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors gap-2 text-xs h-8 flex items-center mt-3"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Xóa</span>
          </Button>
        </CardFooter>
      </div>

      {/* Glow Effect behind the card */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 group-hover:duration-200 -z-10"></div>
    </div>
  );
}
