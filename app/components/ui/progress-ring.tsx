"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface ProgressRingProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
    trackColor?: string;
    progressColor?: string;
    children?: React.ReactNode;
}

export function ProgressRing({
    progress,
    size = 120,
    strokeWidth = 8,
    className,
    trackColor = "stroke-slate-100",
    progressColor = "stroke-primary",
    children,
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (Math.min(progress, 100) / 100) * circumference;

    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="transform -rotate-90"
            >
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    className={trackColor}
                    strokeWidth={strokeWidth}
                />
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    className={progressColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                />
            </svg>
            {children && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {children}
                </div>
            )}
        </div>
    );
}
