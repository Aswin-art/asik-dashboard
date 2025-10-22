import { ReactNode, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

export const SectionWrapper = forwardRef<HTMLDivElement, SectionWrapperProps>(
  ({ children, className, fullWidth = false, noPadding = false, size = "lg" }, ref) => {
    const sizeClasses = {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      xl: "max-w-[1400px]",
      full: "max-w-full",
    };

    const paddingClasses = noPadding ? "" : "px-4 lg:px-6";

    return (
      <div ref={ref} className={cn("container mx-auto", !fullWidth && sizeClasses[size], paddingClasses, className)}>
        {children}
      </div>
    );
  },
);

SectionWrapper.displayName = "SectionWrapper";
