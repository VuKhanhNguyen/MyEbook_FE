import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div
      className={cn(
        "w-full h-1 bg-gray-700/30 rounded-full overflow-hidden",
        className,
      )}
    >
      <div
        className="h-full bg-indigo-500 transition-all duration-300 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}
