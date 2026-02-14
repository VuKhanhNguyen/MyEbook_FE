"use client";

import { Suspense, useEffect, useState } from "react";
import { EpubReader } from "@/components/reader/EpubReader";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { MobiReader } from "@/components/reader/MobiReader";
import { api } from "@/lib/api";
import { Book } from "@/types";
import { Loader2 } from "lucide-react";

const getFileExtension = (url: string) => {
  return url.split(".").pop()?.toLowerCase();
};

function ReaderContent() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    api
      .get(`/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.error("Failed to load book:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-slate-950 gap-4">
        <p>Book not found or could not be loaded.</p>
        <button
          onClick={() => router.push("/library")}
          className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500"
        >
          Back to Library
        </button>
      </div>
    );
  }

  const url = `http://localhost:4000/uploads/${book.path}`;
  const ext = getFileExtension(book.path);

  if (ext === "pdf") {
    return (
      <main className="min-h-screen w-full h-screen bg-gray-900 relative">
        <iframe src={url} className="w-full h-full" title="PDF Reader" />
      </main>
    );
  }

  if (ext === "epub") {
    return (
      <main className="min-h-screen relative">
        <EpubReader
          url={url}
          bookId={id || book._id || (book as any).id}
          initialLocation={book.lastLocation}
          initialProgress={book.progress}
        />
      </main>
    );
  }

  if (ext === "mobi" || ext === "prc") {
    return (
      <main className="min-h-screen bg-gray-900 overflow-auto relative">
        <MobiReader url={url} />
      </main>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white gap-4 bg-slate-950">
      <p className="text-xl">
        Format .{ext} is not supported for inline reading.
      </p>
      <a
        href={url}
        download
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
      >
        Download File
      </a>
    </div>
  );
}

export default function ReaderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">
          Loading...
        </div>
      }
    >
      <ReaderContent />
    </Suspense>
  );
}
