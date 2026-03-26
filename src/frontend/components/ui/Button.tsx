"use client";

import Link from "next/link";
import { cn } from "@shared/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isLoading?: boolean;
  children: ReactNode;
  className?: string;
}

const variants = {
  primary:
    "bg-gold-gradient text-background font-semibold hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98]",
  secondary:
    "bg-transparent border border-navy-light text-cream hover:bg-navy/20 hover:border-navy hover:shadow-[0_0_20px_rgba(26,26,94,0.3)]",
  ghost:
    "bg-transparent text-cream hover:text-gold",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  isLoading,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg font-sans transition-all duration-300 select-none",
    variants[variant],
    sizes[size],
    isLoading && "opacity-50 pointer-events-none",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={isLoading} {...props}>
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
}
