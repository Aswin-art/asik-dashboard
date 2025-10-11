import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export function SectionWrapper({
  children,
  className,
  fullWidth = false,
  noPadding = false,
  size = "lg",
}: SectionWrapperProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[1400px]",
    full: "max-w-full",
  };

  const paddingClasses = noPadding ? "" : "px-4 lg:px-6";

  return (
    <div className={cn("container mx-auto", !fullWidth && sizeClasses[size], paddingClasses, className)}>
      {children}
    </div>
  );
}
