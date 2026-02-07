import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-medium text-white/80 ml-1">
          {label}
        </label>
      )}
      <input
        className={`
          bg-white/5 border border-white/10
          rounded-xl px-4 py-3
          text-white placeholder:text-white/30
          focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30
          transition-all duration-200
          backdrop-blur-sm
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
