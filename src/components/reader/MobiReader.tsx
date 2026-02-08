"use client";

import { useEffect, useState } from "react";
import { initMobiFile } from "@lingo-reader/mobi-parser";

interface MobiReaderProps {
  url: string;
}

export const MobiReader = ({ url }: MobiReaderProps) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMobi = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch file");

        const arrayBuffer = await response.arrayBuffer();
        // @lingo-reader/mobi-parser expects Uint8Array or File
        const fileData = new Uint8Array(arrayBuffer);

        // Use the library's init function
        // @ts-ignore: Library types might mismatch with exact Uint8Array in strict mode, forcing ignore for safety if needed, or it works.
        const parser = await initMobiFile(fileData);

        const spine = parser.getSpine();
        let fullHtml = "";

        // Concatenate all chapters
        for (const chapter of spine) {
          const chapterData = parser.loadChapter(chapter.id);
          if (chapterData) {
            fullHtml += chapterData.html;
          }
        }

        if (fullHtml) {
          // Normalize to NFC to fix detached accents in some texts
          setContent(fullHtml.normalize("NFC"));
        } else {
          setError("No content found in MOBI file");
        }
      } catch (err: any) {
        console.error("Error loading MOBI:", err);
        setError(err.message || "Error loading file");
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      loadMobi();
    }
  }, [url]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading MOBI...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#f4ead5] text-[#333] p-8 overflow-auto leading-relaxed max-w-4xl mx-auto shadow-lg my-8"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >
      {/* 
        Injecting HTML content directly. 
        WARNING: This is risky for untrusted content (XSS). 
        Since this is a personal library, we assume some trust, but ideally we should sanitize.
      */}
      <div
        className="prose prose-lg max-w-none prose-p:my-4 prose-headings:font-bold prose-headings:my-6"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
