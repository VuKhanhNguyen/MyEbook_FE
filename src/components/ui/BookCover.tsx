"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Book } from "@/types";
import type JSZip from "jszip"; // Import type only

interface BookCoverProps {
  book: Book;
  className?: string;
}

export function BookCover({ book, className }: BookCoverProps) {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchCover = async () => {
      if (book.coverUrl) {
        setCoverUrl(book.coverUrl);
        setIsLoading(false);
        return;
      }

      const bookFileUrl = `http://localhost:4000/uploads/${book.path}`;

      try {
        // Fetch only the beginning of the file to try and find the cover
        // Note: For a robust solution, we might need to fetch the whole file if cover is at the end,
        // but for performance, let's try to be smart.
        // Actually, for client-side extraction, we often need the full file for JSZip/PDF.js
        // optimization: maybe backend should do this. But per request, let's do frontend.

        const response = await fetch(bookFileUrl);
        const blob = await response.blob();

        if (!isMounted) return;

        if (book.format === "epub") {
          const JSZip = (await import("jszip")).default;
          const zip = await JSZip.loadAsync(blob);
          // Try to find cover image (usually in OEBPS/images or just images)
          // Heuristic: Find first image file that looks like a cover
          let coverFile: JSZip.JSZipObject | null = null;

          // 1. Check standard cover paths
          const potentialCovers = Object.keys(zip.files).filter((path) =>
            path.match(/(cover|title|page1|images\/img001)\.(jpg|jpeg|png)$/i),
          );

          if (potentialCovers.length > 0) {
            coverFile = zip.file(potentialCovers[0]);
          } else {
            // 2. Find ANY image
            const images = Object.keys(zip.files).filter(
              (path) =>
                path.match(/\.(jpg|jpeg|png)$/i) && !path.includes("thumb"),
            );
            if (images.length > 0) {
              coverFile = zip.file(images[0]);
            }
          }

          if (coverFile) {
            const imgBlob = await coverFile.async("blob");
            setCoverUrl(URL.createObjectURL(imgBlob));
          }
        } else if (book.format === "pdf") {
          const pdfjsLib = await import("pdfjs-dist");
          pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

          const arrayBuffer = await blob.arrayBuffer();
          const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          const page = await pdf.getPage(1);

          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          if (context) {
            await page.render({
              canvas: canvas,
              canvasContext: context,
              viewport: viewport,
            }).promise;
            setCoverUrl(canvas.toDataURL());
          }
        } else if (book.format === "mobi" || book.format === "prc") {
          // MOBI parsing is complex on client.
          // For now, no cover or generic cover.
        }
      } catch (error) {
        console.error("Error extracting cover:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchCover();

    return () => {
      isMounted = false;
      if (coverUrl && coverUrl.startsWith("blob:")) {
        URL.revokeObjectURL(coverUrl);
      }
    };
  }, [book]);

  if (isLoading) {
    return (
      <div
        className={`absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center ${className}`}
      >
        <span className="text-slate-600 text-xs">Loading...</span>
      </div>
    );
  }

  if (coverUrl) {
    return (
      <img
        src={coverUrl}
        alt={`Cover of ${book.title}`}
        className={`object-cover w-full h-full ${className}`}
      />
    );
  }

  // Fallback
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center ${className}`}
    >
      <div className="text-center p-4">
        <span className="text-4xl block mb-2 filter drop-shadow-lg">📖</span>
        <span className="text-[10px] uppercase tracking-widest text-[#f4ead5] opacity-50 font-bold">
          {book.format}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60"></div>
    </div>
  );
}
