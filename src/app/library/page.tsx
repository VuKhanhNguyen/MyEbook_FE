"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types";
import { BookCard } from "@/components/ui/book-card";
import { Button } from "@/components/ui/Button";
import {
  Plus,
  Library as LibraryIcon,
  Search,
  Loader2,
  Upload,
} from "lucide-react";
import Link from "next/link";
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
import { useRouter } from "next/navigation";

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Protect the route
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchBooks = async () => {
    if (!isAuthenticated) return;

    try {
      // api instance handles the Authorization header automatically
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
    if (isAuthenticated) {
      fetchBooks();
    } else if (!authLoading) {
      setLoading(false); // Stop loading if checked and not auth (will redirect)
    }
  }, [isAuthenticated, authLoading]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      const response = await api.delete(`/books/${id}`);
      if (response.status === 200 || response.status === 204) {
        toast.success("Book deleted successfully");
        fetchBooks();
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
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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

  // If not authenticated, we return null (effect will redirect)
  // or show a simplified view/login prompt if preferred.
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden mt-5">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-blob mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg shadow-indigo-500/20">
              <LibraryIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              My Library
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-900/50 border border-white/10 rounded-full text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all w-64 focus:w-80"
              />
            </div>

            <Button
              onClick={() => setIsOpen(true)}
              className="flex items-center rounded-full bg-white text-slate-950 hover:bg-slate-200 font-semibold px-6 shadow-lg shadow-white/5 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add book
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-12 pb-12 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
            <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
            <p className="text-slate-400 animate-pulse">
              Loading your library...
            </p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-slate-900/50 rounded-full flex items-center justify-center mb-6 border border-white/5">
              <LibraryIcon className="h-10 w-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No books found
            </h3>
            <p className="text-slate-400 mb-8">
              {searchQuery
                ? "Try adjusting your search terms."
                : "Your library is empty. Start by adding your first book."}
            </p>
            {!searchQuery && (
              <Button
                variant="outline"
                onClick={() => setIsOpen(true)}
                className="border-white/10 text-white hover:bg-white/5"
              >
                Upload PDF, EPUB, or MOBI
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
            {filteredBooks.map((book) => (
              <div key={book._id}>
                <BookCard book={book} onDelete={handleDelete} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Upload Dialog - Moved outside header to avoid clipping/backdrop issues */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass-panel border-white/10 text-white sm:max-w-md">
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
                className="bg-slate-900/50 border-white/10 file:bg-indigo-600 file:text-white file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-4 file:text-sm file:font-semibold hover:file:bg-indigo-500"
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
                className="flex items-center bg-indigo-600 hover:bg-indigo-500 text-amber-950"
              >
                {isUploading ? (
                  <>Uploading...</>
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
