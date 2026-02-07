interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-white/10 dark:bg-black/20
        backdrop-blur-xl
        border border-white/20 dark:border-white/10
        shadow-xl shadow-black/5
        rounded-2xl
        p-8
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
