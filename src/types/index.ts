export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Book {
  _id: string;
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
}

export type ViewMode = "grid" | "list";
export type SortOption = "recent" | "title" | "author";
