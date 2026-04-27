"use client";

import { motion, Variants, Transition } from "framer-motion";
import { ReactNode } from "react";

// Easing curves
export const easings = {
    spring: [0.16, 1, 0.3, 1] as const,
    bounceOut: [0.34, 1.56, 0.64, 1] as const,
    smooth: [0.4, 0, 0.2, 1] as const,
    easeOut: [0, 0, 0.2, 1] as const,
};

// Fade variants
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.4, ease: easings.spring },
    },
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easings.spring },
    },
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easings.spring },
    },
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: easings.spring },
    },
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: easings.spring },
    },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: easings.spring },
    },
};

// Stagger container
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: easings.spring },
    },
};

// Page transition
export const pageTransition: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: easings.spring },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.2 },
    },
};

// Slide transition for step wizard
export const slideInFromRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: easings.spring },
    },
    exit: {
        opacity: 0,
        x: -40,
        transition: { duration: 0.25 },
    },
};

export const slideInFromLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4, ease: easings.spring },
    },
    exit: {
        opacity: 0,
        x: 40,
        transition: { duration: 0.25 },
    },
};

// Card hover
export const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: {
        scale: 1.01,
        y: -2,
        transition: { duration: 0.3, ease: easings.spring },
    },
};

// Pulse animation for loading
export const pulseRing = {
    animate: {
        scale: [1, 1.2, 1],
        opacity: [0.5, 0, 0.5],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

// Animated wrapper components
interface AnimatedProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    variants?: Variants;
}

export function FadeIn({ children, className, delay = 0, variants = fadeIn }: AnimatedProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeInUp({ children, className, delay = 0 }: AnimatedProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function ScaleIn({ children, className, delay = 0 }: AnimatedProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerContainer({ children, className }: Omit<AnimatedProps, "delay" | "variants">) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className }: Omit<AnimatedProps, "delay" | "variants">) {
    return (
        <motion.div variants={staggerItem} className={className}>
            {children}
        </motion.div>
    );
}

export function AnimatedPage({ children, className }: Omit<AnimatedProps, "delay" | "variants">) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageTransition}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function AnimatedCard({ children, className }: Omit<AnimatedProps, "delay" | "variants">) {
    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            variants={cardHover}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Number counter animation
export function AnimatedCounter({
    value,
    duration = 1,
    className,
}: {
    value: number;
    duration?: number;
    className?: string;
}) {
    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration }}
            >
                {value}
            </motion.span>
        </motion.span>
    );
}

// Progress bar animation
export function AnimatedProgress({
    progress,
    className,
    barClassName,
}: {
    progress: number;
    className?: string;
    barClassName?: string;
}) {
    return (
        <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${className || ""}`}>
            <motion.div
                className={`h-full rounded-full ${barClassName || "bg-primary"}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.8, ease: easings.spring, delay: 0.2 }}
            />
        </div>
    );
}
