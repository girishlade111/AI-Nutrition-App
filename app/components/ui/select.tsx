"use client";

import React from "react";
import { cn } from "@/app/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const selectVariants = cva(
    "input-enhanced appearance-none cursor-pointer bg-no-repeat bg-right pr-10",
    {
        variants: {
            variant: {
                default: "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2394a3b8%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22m19%209-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.5rem] bg-[right_0.75rem_center]",
            },
            size: {
                default: "h-10 px-4 py-2 text-sm",
                sm: "h-8 px-3 py-1.5 text-xs",
                lg: "h-12 px-5 py-3 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

type SelectVariantProps = VariantProps<typeof selectVariants>;

export interface SelectProps 
    extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    SelectVariantProps { }

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, variant, size, children, ...props }, ref) => {
        return (
            <select
                className={cn(selectVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                {children}
            </select>
        );
    }
);
Select.displayName = "Select";