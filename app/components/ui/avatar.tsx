"use client";

import React from "react";
import { cn } from "@/app/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
};

export function Avatar({
    src,
    alt,
    fallback,
    size = "md",
    className,
    ...props
}: AvatarProps) {
    const initials = fallback || (alt ? alt.charAt(0).toUpperCase() : "?");

    return (
        <div
            className={cn(
                "relative flex shrink-0 overflow-hidden rounded-full bg-primary/10 text-primary font-semibold items-center justify-center",
                sizeClasses[size],
                className
            )}
            {...props}
        >
            {src ? (
                <img src={src} alt={alt} className="aspect-square h-full w-full object-cover" />
            ) : (
                <span>{initials}</span>
            )}
        </div>
    );
}

interface AvatarGroupProps {
    children: React.ReactNode;
    max?: number;
    size?: "sm" | "md" | "lg";
}

export function AvatarGroup({ children, max = 4, size = "md" }: AvatarGroupProps) {
    const childArray = React.Children.toArray(children);
    const visibleAvatars = childArray.slice(0, max);
    const remaining = childArray.length - max;

    return (
        <div className="flex -space-x-3">
            {visibleAvatars}
            {remaining > 0 && (
                <div
                    className={cn(
                        "relative flex shrink-0 overflow-hidden rounded-full bg-slate-200 text-slate-600 font-medium items-center justify-center ring-2 ring-white",
                        sizeClasses[size]
                    )}
                >
                    +{remaining}
                </div>
            )}
        </div>
    );
}