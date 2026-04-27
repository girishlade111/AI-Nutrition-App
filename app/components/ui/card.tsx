"use client";

import { cn } from "@/app/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export function Card({ children, className, hover = true, onClick }: CardProps) {
    const Component = onClick ? motion.button : motion.div;

    return (
        <Component
            onClick={onClick}
            whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
            className={cn(
                "bg-white rounded-xl border border-slate-100/80 shadow-card",
                "transition-shadow duration-300",
                hover && "hover:shadow-card-hover",
                onClick && "cursor-pointer text-left",
                className
            )}
        >
            {children}
        </Component>
    );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("px-5 py-4 border-b border-slate-50", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
    return <h3 className={cn("text-base font-semibold text-slate-900", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
    return <p className={cn("text-sm text-slate-500 mt-0.5", className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("px-5 py-4", className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("px-5 py-4 border-t border-slate-50 flex items-center gap-3", className)}>{children}</div>;
}

// Stat card for dashboard metrics
interface StatCardProps {
    title: string;
    value: string | number;
    unit?: string;
    icon?: ReactNode;
    trend?: {
        value: number;
        positive: boolean;
    };
    color?: "default" | "success" | "warning" | "info";
    className?: string;
}

export function StatCard({ title, value, unit, icon, trend, color = "default", className }: StatCardProps) {
    const colorStyles = {
        default: "bg-slate-50 text-slate-700",
        success: "bg-emerald-50 text-emerald-700",
        warning: "bg-amber-50 text-amber-700",
        info: "bg-sky-50 text-sky-700",
    };

    return (
        <Card className={cn("overflow-hidden", className)}>
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-500">{title}</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-slate-900">{value}</span>
                            {unit && <span className="text-sm text-slate-500">{unit}</span>}
                        </div>
                        {trend && (
                            <div className="flex items-center gap-1">
                                <span
                                    className={cn(
                                        "text-xs font-medium",
                                        trend.positive ? "text-emerald-600" : "text-red-600"
                                    )}
                                >
                                    {trend.positive ? "+" : "-"}
                                    {trend.value}%
                                </span>
                                <span className="text-xs text-slate-400">vs last week</span>
                            </div>
                        )}
                    </div>
                    {icon && (
                        <div className={cn("p-2.5 rounded-lg", colorStyles[color])}>
                            {icon}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
