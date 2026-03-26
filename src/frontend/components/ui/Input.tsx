import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@shared/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-cream/70">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 bg-surface border border-white/10 rounded-lg text-cream placeholder:text-cream/30",
            "focus:outline-none focus:border-navy-light focus:shadow-[0_0_15px_rgba(26,26,94,0.2)]",
            "transition-all duration-300",
            error && "border-red-500/50",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
