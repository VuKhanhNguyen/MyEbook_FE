export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Book {
  id: string; // Changed from _id due to backend transformation
  _id?: string; // Optional for backward compatibility
  title: string;
  originalName: string;
  path: string;
  mimeType: string;
  format: "epub" | "pdf" | "mobi" | "prc";
  size: number;
  owner?: string; // ID of the user who owns the book
  createdAt: string;
  updatedAt: string;
  coverUrl?: string; // Optional cover URL if we generate covers later
  lastRead?: string; // Timestamp of last read
  progress?: number; // % progress
  lastLocation?: string; // Last read location (CFI or page number)
  isFavorite?: boolean;
}

export type ViewMode = "grid" | "list";
export type SortOption = "recent" | "title" | "author";
