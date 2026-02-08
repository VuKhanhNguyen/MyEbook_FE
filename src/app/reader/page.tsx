"use client";

import { Suspense } from "react";
import { EpubReader } from "@/components/reader/EpubReader";
import { useSearchParams } from "next/navigation";
import { MobiReader } from "@/components/reader/MobiReader";

const getFileExtension = (url: string) => {
  return url.split(".").pop()?.toLowerCase();
};

function ReaderContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");

  if (!url) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        <p>No book selected. Please go back to the library.</p>
      </div>
    );
  }

  const ext = getFileExtension(url);

  if (ext === "pdf") {
    return (
      <main className="min-h-screen w-full h-screen bg-gray-900">
        <iframe src={url} className="w-full h-full" title="PDF Reader" />
      </main>
    );
  }

  if (ext === "epub") {
    return (
      <main className="min-h-screen">
        <EpubReader url={url} />
      </main>
    );
  }

  if (ext === "mobi" || ext === "prc") {
    return (
      <main className="min-h-screen bg-gray-900 overflow-auto">
        <MobiReader url={url} />
      </main>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white gap-4">
      <p className="text-xl">
        Format .{ext} is not supported for inline reading.
      </p>
      <a
        href={url}
        download
        className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
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
        <div className="min-h-screen flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <ReaderContent />
    </Suspense>
  );
}
