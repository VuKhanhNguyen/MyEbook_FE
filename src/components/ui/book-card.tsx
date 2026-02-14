import { Book, ViewMode } from "@/types";
import { BookCover } from "@/components/ui/BookCover";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
  viewMode?: ViewMode;
}

export function BookCard({ book, onDelete, viewMode = "grid" }: BookCardProps) {
  const bookUrl = `http://localhost:4000/uploads/${book.path}`;

  if (viewMode === "list") {
    return (
      <div className="group relative flex items-center gap-6 bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/5 transition-colors">
        <Link
          href={`/reader?url=${encodeURIComponent(bookUrl)}`}
          className="flex-shrink-0 w-16 h-24 relative overflow-hidden rounded-md shadow-md"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center">
            <span className="text-xl">📖</span>
          </div>
          {/* <Image src={book.coverUrl} fill className="object-cover" /> */}
        </Link>

        <div className="flex-grow min-w-0">
          <Link href={`/reader?url=${encodeURIComponent(bookUrl)}`}>
            <h3 className="font-serif font-bold text-lg text-white truncate group-hover:text-indigo-400 transition-colors">
              {book.title || "Untitled Book"}
            </h3>
          </Link>
          <p className="text-sm text-slate-400 truncate">{book.originalName}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 font-mono">
            <span className="uppercase bg-white/5 px-1.5 py-0.5 rounded">
              {book.format}
            </span>
            <span>{(book.size / 1024 / 1024).toFixed(1)} MB</span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            onDelete(book._id);
          }}
          className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 h-8 w-8 p-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="group relative h-full">
      <div className="glass-card h-full flex flex-col overflow-hidden relative z-10 transition-all hover:translate-y-[-4px]">
        <Link
          href={`/reader?url=${encodeURIComponent(bookUrl)}`}
          className="block flex-grow relative"
        >
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            {/* Book Cover */}
            <BookCover
              book={book}
              className="group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60 pointer-events-none"></div>
          </div>
        </Link>

        <CardContent className="p-4 flex flex-col gap-2 relative bg-slate-900/40 backdrop-blur-sm">
          <Link href={`/reader?url=${encodeURIComponent(bookUrl)}`}>
            <h3
              className="font-serif font-bold text-lg leading-tight text-white line-clamp-2 group-hover:text-indigo-400 transition-colors"
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
            className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors gap-2 text-xs h-8 flex items-center mt-3"
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
