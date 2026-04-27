"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";
import {
    LayoutDashboard,
    PlusCircle,
    History,
    Settings,
    Menu,
    X,
    Leaf,
} from "lucide-react";

const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/tracker", label: "Tracker", icon: PlusCircle },
    { href: "/history", label: "History", icon: History },
];

export function Navigation() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Don't show nav on landing, onboarding, or generating pages
    const hideNavPaths = ["/landing", "/onboarding", "/generating", "/"];
    if (hideNavPaths.includes(pathname)) return null;

    return (
        <>
            {/* Desktop Navigation */}
            <header className="sticky top-0 z-50 w-full glass border-b border-slate-200/60">
                <div className="container-wide flex h-16 items-center justify-between section-padding">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center gap-2.5 group">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
                            <Leaf className="w-5 h-5" />
                        </div>
                        <span className="font-display text-lg font-bold text-slate-900 tracking-tight">
                            Swaad AI
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "text-primary"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 bg-primary/5 rounded-lg border border-primary/10"
                                            transition={{ type: "spring", duration: 0.5 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </header>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-16 z-40 md:hidden glass border-b border-slate-200/60"
                    >
                        <nav className="container-narrow py-3 px-4 space-y-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-primary/5 text-primary border border-primary/10"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
