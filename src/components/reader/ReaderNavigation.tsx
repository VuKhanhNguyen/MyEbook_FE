import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ReaderNavigation() {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Navigating back to library");
    router.push("/library");
  };

  return (
    <div className="fixed top-20 left-4 z-100 flex items-center gap-2 pointer-events-auto">
      <Button
        variant="outline"
        size="sm"
        onClick={handleBack}
        className="bg-slate-900/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:text-white transition-all duration-300 rounded-full pr-4 pl-3 h-10 shadow-lg group font-medium cursor-pointer"
        style={{ zIndex: 9999 }} // Force z-index
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Library</span>
      </Button>
    </div>
  );
}
