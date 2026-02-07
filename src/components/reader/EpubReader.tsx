"use client";

import { useState, useRef } from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { Menu, Settings } from "lucide-react";
import { ReaderSidebar } from "./ReaderSidebar";
import { ReaderSettings } from "./ReaderSettings";
import { BookPageContainer } from "./BookPageContainer";

interface EpubReaderProps {
  url: string;
}

export const EpubReader = ({ url }: EpubReaderProps) => {
  const [location, setLocation] = useState<string | number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [theme, setTheme] = useState("dark");
  const tocRef = useRef<any>(null); // To store TOC data

  const onLocationChanged = (loc: string | number) => {
    setLocation(loc);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Top Bar (Floating) */}
      <div className="absolute top-0 left-0 right-0 z-[60] flex h-16 items-center justify-between px-6 pointer-events-none">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`pointer-events-auto rounded-full p-2 transition-colors backdrop-blur-md ${
            sidebarOpen
              ? "bg-white text-black hover:bg-white/90"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="text-white/80 font-medium tracking-wide">
          My Library
        </div>

        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="pointer-events-auto rounded-full bg-white/10 p-2 text-white backdrop-blur-md hover:bg-white/20 transition-colors"
        >
          <Settings className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebars */}
      <ReaderSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        toc={tocRef.current?.toc || []} // This is tricky with ReactReader, see note below
        onTocClick={(href) => {
          setLocation(href);
          setSidebarOpen(false);
        }}
      />

      {settingsOpen && (
        <ReaderSettings
          fontSize={fontSize}
          setFontSize={setFontSize}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      {/* Focus Backdrop */}
      <div className="fixed inset-0 z-0 bg-black/60 backdrop-blur-sm transition-opacity duration-700" />

      {/* Main Reader Area */}
      <div className="relative z-10 h-full w-full py-4 px-2 md:px-8 flex justify-center items-center">
        {/* Book Wrapper */}
        <div className="h-[95vh] w-full max-w-[1600px] shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-r-lg overflow-hidden relative bg-white/5">
          <BookPageContainer location={location}>
            <ReactReader
              url={url}
              location={location}
              locationChanged={onLocationChanged}
              title="Liquid Reader"
              epubOptions={{
                manager: "default",
                flow: "paginated",
                width: "100%",
                height: "100%",
              }}
              // Extract TOC
              getRendition={(rendition) => {
                rendition.themes.fontSize(`${fontSize}%`);
                // Override internal iframe styles for Book effect
                rendition.themes.register("custom", {
                  body: {
                    color: "#333", // Dark ink
                    background: "transparent !important", // Allow our paper texture to show
                    padding: "0 !important",
                    margin: "0 !important",
                    "-webkit-font-smoothing": "antialiased",
                    "-moz-osx-font-smoothing": "grayscale",
                    "text-rendering": "optimizeLegibility",
                  },
                  p: {
                    "font-family": "'Times New Roman', Times, serif !important",
                    "font-size": "1.2rem !important",
                    "line-height": "1.6 !important",
                    "text-align": "justify",
                  },
                });
                rendition.themes.select("custom");
              }}
              tocChanged={(toc) => {
                tocRef.current = { toc };
              }}
              // Custom Styling: enforce transparency
              readerStyles={{
                ...ReactReaderStyle,
                container: {
                  ...ReactReaderStyle.container,
                  backgroundColor: "transparent",
                  overflow: "hidden",
                },
                readerArea: {
                  ...ReactReaderStyle.readerArea,
                  backgroundColor: "transparent",
                  transition: "none", // We handle anim in BookPageContainer
                },
                titleArea: {
                  ...ReactReaderStyle.titleArea,
                  display: "none",
                },
                tocArea: {
                  ...ReactReaderStyle.tocArea,
                  display: "none",
                },
                tocButton: {
                  display: "none",
                },
                arrow: {
                  ...ReactReaderStyle.arrow,
                  color: "#555", // Darker arrows for paper contrast
                  zIndex: 10,
                },
              }}
            />
          </BookPageContainer>
        </div>
      </div>
    </div>
  );
};
