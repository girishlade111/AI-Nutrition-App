"use client";

import React from "react";
import { cn } from "@/app/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "circular" | "text";
    width?: string | number;
    height?: string | number;
}

export function Skeleton({
    className,
    variant = "default",
    width,
    height,
    ...props
}: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse bg-slate-200",
                variant === "circular" && "rounded-full",
                variant === "text" && "rounded h-4",
                variant === "default" && "rounded-lg",
                className
            )}
            style={{
                width: width || (variant === "circular" ? "100%" : undefined),
                height: height || (variant === "text" ? undefined : "100%"),
                aspectRatio: variant === "circular" ? 1 : undefined,
            }}
            {...props}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-white rounded-xl border border-slate-100 p-5 space-y-4">
            <div className="flex items-center gap-3">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="space-y-2 flex-1">
                    <Skeleton variant="text" className="w-3/4" />
                    <Skeleton variant="text" className="w-1/2" />
                </div>
            </div>
            <Skeleton className="h-24 w-full" />
            <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </div>
        </div>
    );
}

export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
    return (
        <div className="flex items-center gap-4 p-4 border-b border-slate-100">
            <Skeleton variant="circular" width={32} height={32} />
            {Array.from({ length: columns }).map((_, i) => (
                <Skeleton key={i} variant="text" className="flex-1" />
            ))}
        </div>
    );
}