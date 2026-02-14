"use client";

import { useEffect, useState } from "react";
import { Book, SortOption, ViewMode } from "@/types";
import { BookCard } from "@/components/ui/book-card";
import { Button } from "@/components/ui/Button";
import { Loader2, Upload, Library as LibraryIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import { useRouter, useSearchParams } from "next/navigation";
import { Sidebar } from "@/components/library/Sidebar";
import { ContinueReading } from "@/components/library/ContinueReading";
import { LibraryHeader } from "@/components/library/LibraryHeader";

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortOption, setSortOption] = useState<SortOption>("recent");

  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchBooks = async () => {
    if (!isAuthenticated) return;
    try {
      const response = await api.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Failed to fetch books", error);
      toast.error("Failed to load your library");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchBooks();
    else if (!authLoading) setLoading(false);
  }, [isAuthenticated, authLoading]);

  const handleDelete = async (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      const response = await api.delete(`/books/${id}`);
      if (response.status === 200 || response.status === 204) {
        toast.success("Book deleted successfully");
        setBooks((prev) => prev.filter((b) => b.id !== id));
      } else {
        toast.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Error deleting book");
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    if (!file || !file.name.match(/\.(epub|pdf|mobi|prc)$/i)) {
      toast.error("Please upload a valid ebook (epub, pdf, mobi, prc).");
      setIsUploading(false);
      return;
    }
    try {
      const response = await api.post("/books/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200 || response.status === 201) {
        setIsOpen(false);
        fetchBooks();
        toast.success("Book uploaded to your library.");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Failed to upload book:", error);
      toast.error("There was an error uploading your book.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const response = await api.post(`/books/${id}/favorite`);
      if (response.status === 200 || response.status === 201) {
        setBooks((prev) =>
          prev.map((book) =>
            book.id === id ? { ...book, isFavorite: !book.isFavorite } : book,
          ),
        );
        toast.success(
          books.find((b) => b.id === id)?.isFavorite
            ? "Removed from favorites"
            : "Added to favorites",
        );
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("Failed to update favorite status");
    }
  };

  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const filteredBooks = books
    .filter((book) => {
      const matchesSearch = book.title
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (filter === "favorites") return book.isFavorite;
      if (filter === "trash") return false; // Not implemented
      if (filter === "collections") return false; // Not implemented
      if (filter === "reading")
        return (book.progress || 0) > 0 && (book.progress || 0) < 100;

      return true;
    })
    .sort((a, b) => {
      if (sortOption === "title") return a.title.localeCompare(b.title);
      if (sortOption === "author") return 0; // Author not implemented yet
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-slate-950">
        <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
        <p className="text-slate-400 animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 font-sans selection:bg-indigo-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-blob mix-blend-screen pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen pointer-events-none z-0"></div>

      <div className="flex min-h-screen">
        {/* Sidebar - Sticky on desktop */}
        <div className="hidden md:block w-64 shrink-0 relative z-20 mx-6">
          <div className="sticky top-10 h-[calc(100vh-8rem)]">
            <Sidebar
              className="h-full bg-slate-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl"
              counts={{
                all: books.length,
                recent: books.length,
                favorites: books.filter((b) => b.isFavorite).length,
                reading: books.filter(
                  (b) => (b.progress || 0) > 0 && (b.progress || 0) < 100,
                ).length,
                trash: 0, // Placeholder
                collections: 0, // Placeholder
              }}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 relative z-10 pb-20 min-w-0 pt-10">
          <div className="container mx-auto px-4 md:px-8 max-w-7xl">
            {/* Mobile Sidebar Toggle could go here */}

            {/* Continue Reading Section (Hero) */}
            {books.length > 0 && !loading && (
              <ContinueReading book={books[0]} />
            )}

            {/* Library Header Controls */}
            <LibraryHeader
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortOption={sortOption}
              setSortOption={setSortOption}
              onUploadClick={() => setIsOpen(true)}
            />

            {/* Books Grid/List */}
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[30vh] gap-4">
                <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
                <p className="text-slate-400 animate-pulse">
                  Loading your library...
                </p>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[40vh] text-center max-w-md mx-auto p-8 rounded-3xl bg-slate-900/30 border border-white/5">
                <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 border border-white/5">
                  <LibraryIcon className="h-8 w-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No books found
                </h3>
                <p className="text-slate-400 mb-6">
                  {searchQuery
                    ? "Try adjusting your search terms."
                    : "Your library is empty. Start by adding your first book."}
                </p>
                {!searchQuery && (
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="bg-indigo-600 text-zinc-900 hover:bg-indigo-500 rounded-full"
                  >
                    <Upload className="mr-2 h-4 w-4 text-zinc-900" /> Upload
                    Ebook
                  </Button>
                )}
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                    : "flex flex-col gap-3 max-w-4xl mx-auto"
                }
              >
                {filteredBooks.map((book) => (
                  <div key={book.id}>
                    <BookCard
                      book={book}
                      onDelete={(id) => handleDelete(id)}
                      onToggleFavorite={handleToggleFavorite}
                      viewMode={viewMode}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass-panel border-white/10 text-white sm:max-w-md bg-slate-900/90 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle>Upload Ebook</DialogTitle>
            <DialogDescription className="text-slate-400">
              Select an EPUB, PDF, MOBI, PRC file to add to your library.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="file" className="text-slate-300">
                Book File
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept=".epub,.pdf,.mobi,.prc"
                required
                className="bg-slate-900/50 border-white/10 file:bg-indigo-600 file:text-white file:border-0 file:rounded-full file:px-4 file:py-2 file:mr-4 file:text-sm file:font-semibold hover:file:bg-indigo-500"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title" className="text-slate-300">
                Title (Optional)
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Book Title"
                className="bg-slate-900/50 border-white/10 text-white placeholder:text-slate-600"
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isUploading}
                className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-white rounded-full w-full justify-center"
              >
                {isUploading ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
