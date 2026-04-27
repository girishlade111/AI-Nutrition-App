"use client";

import React from "react";
import { cn } from "@/app/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow-button hover:bg-primary-700 hover:shadow-glow active:scale-[0.98]",
                destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700 active:scale-[0.98]",
                outline: "border border-slate-200 bg-white text-slate-700 shadow-button hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]",
                secondary: "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200 active:scale-[0.98]",
                ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-5 py-2.5",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-11 rounded-lg px-8 text-base",
                icon: "h-10 w-10",
                "icon-sm": "h-8 w-8",
                "icon-lg": "h-11 w-11",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    animate?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, animate = true, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";

        const buttonContent = (
            <Comp
                className={cn(buttonVariants({ variant, size }), className)}
                ref={ref}
                {...props}
            >
                {children}
            </Comp>
        );

        if (animate && !props.disabled) {
            return (
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="inline-flex"
                >
                    {buttonContent}
                </motion.div>
            );
        }

        return buttonContent;
    }
);
Button.displayName = "Button";
