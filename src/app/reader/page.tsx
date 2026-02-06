import { EpubReader } from "@/components/reader/EpubReader";

export default function ReaderPage() {
  // Using public demo epub from React-Reader examples for MVP
  // In production, this would be loaded from public/ or via API
  const demoUrl = "/test.epub";

  return (
    <main className="min-h-screen">
      <EpubReader url={demoUrl} />
    </main>
  );
}
