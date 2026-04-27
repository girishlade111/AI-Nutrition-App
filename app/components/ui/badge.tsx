"use client";

import { cn } from "@/app/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "bg-primary/10 text-primary-700 border border-primary/20",
                secondary: "bg-slate-100 text-slate-700 border border-slate-200",
                success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
                warning: "bg-amber-50 text-amber-700 border border-amber-200",
                destructive: "bg-red-50 text-red-700 border border-red-200",
                outline: "border border-slate-300 text-slate-700 bg-transparent",
                ghost: "text-slate-500 bg-transparent",
            },
            size: {
                default: "px-2.5 py-0.5 text-xs",
                sm: "px-2 py-0.5 text-[10px]",
                lg: "px-3 py-1 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> { }

export function Badge({ className, variant, size, ...props }: BadgeProps) {
    return (
        <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
    );
}
