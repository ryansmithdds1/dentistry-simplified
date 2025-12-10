import { cn } from "@/lib/utils";
import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
    const variants = {
        default: "bg-brand-primary text-white",
        secondary: "bg-slate-100 text-slate-700 border border-slate-200",
        outline: "bg-transparent border border-slate-200 text-slate-700",
        success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        warning: "bg-amber-50 text-amber-700 border border-amber-200",
        danger: "bg-red-50 text-red-700 border border-red-200",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors",
                variants[variant],
                className
            )}
            {...props}
        />
    );
}
