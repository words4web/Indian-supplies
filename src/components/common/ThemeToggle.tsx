"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/providers/theme-provider";

interface ThemeToggleProps {
  size?: "sm" | "md";
  className?: string;
}

export function ThemeToggle({ size = "md", className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses =
    size === "sm"
      ? "size-10 rounded-xl"
      : "size-11 lg:size-12 rounded-xl";

  const iconClasses = size === "sm" ? "size-5" : "size-5 lg:size-6";

  if (!mounted) {
    return (
      <div
        className={`flex items-center justify-center text-muted-foreground opacity-70 ${sizeClasses} ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer transition-colors active:scale-95 ${sizeClasses} ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}>
      {isDark ? (
        <Sun className={`${iconClasses} text-amber-400 transition-transform hover:rotate-45`} />
      ) : (
        <Moon className={`${iconClasses} transition-transform hover:-rotate-12`} />
      )}
    </button>
  );
}
