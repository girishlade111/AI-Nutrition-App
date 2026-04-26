import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { StorageError } from "./errors"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const storage = {
    get: <T>(key: string): T | null => {
        if (typeof window === "undefined") return null;
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`Storage error: Failed to get ${key}`, error);
            throw new StorageError(`Failed to retrieve data for ${key}`);
        }
    },

    set: <T>(key: string, value: T): void => {
        if (typeof window === "undefined") return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Storage error: Failed to set ${key}`, error);
            throw new StorageError(`Failed to save data for ${key}`);
        }
    },

    remove: (key: string): void => {
        if (typeof window === "undefined") return;
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Storage error: Failed to remove ${key}`, error);
            throw new StorageError(`Failed to remove data for ${key}`);
        }
    },

    clear: (): void => {
        if (typeof window === "undefined") return;
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Storage error: Failed to clear storage", error);
            throw new StorageError("Failed to clear storage");
        }
    },
};

export function formatDate(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toISOString().split("T")[0];
}

export function formatTime(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function getToday(): string {
    return formatDate(new Date());
}

export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function calculatePercentage(current: number, target: number): number {
    if (target === 0) return 0;
    return clamp(Math.round((current / target) * 100), 0, 100);
}

export function formatCalories(calories: number): string {
    if (calories >= 1000) {
        return `${(calories / 1000).toFixed(1)}k`;
    }
    return calories.toString();
}

export const unitConversions = {
    gramsToOunces: (grams: number): number => Math.round(grams * 0.035274 * 10) / 10,
    ouncesToGrams: (ounces: number): number => Math.round(ounces * 28.3495),
    cupsToMl: (cups: number): number => Math.round(cups * 236.588),
    mlToCups: (ml: number): number => Math.round(ml / 236.588 * 10) / 10,
    teaspoonsToMl: (tsp: number): number => Math.round(tsp * 4.92892),
    mlToTeaspoons: (ml: number): number => Math.round(ml / 4.92892),
    tableSpoonsToMl: (tbsp: number): number => Math.round(tbsp * 14.7868),
    mlToTableSpoons: (ml: number): number => Math.round(ml / 14.7868),
};

export function calculatePortionNutrition(
    baseNutrition: { calories: number; protein: number; carbs: number; fats: number },
    baseServingWeight: number,
    actualServingWeight: number
): { calories: number; protein: number; carbs: number; fats: number } {
    const ratio = actualServingWeight / baseServingWeight;
    return {
        calories: Math.round(baseNutrition.calories * ratio),
        protein: Math.round(baseNutrition.protein * ratio * 10) / 10,
        carbs: Math.round(baseNutrition.carbs * ratio * 10) / 10,
        fats: Math.round(baseNutrition.fats * ratio * 10) / 10,
    };
}

export function calculateCalorieDeficit(
    consumed: number,
    target: number,
    goal: "loss" | "maintain" | "gain"
): number {
    const diff = target - consumed;
    if (goal === "loss") {
        return Math.abs(diff);
    } else if (goal === "gain") {
        return -Math.abs(diff);
    }
    return diff;
}

export function getNutritionStatus(
    consumed: number,
    target: number
): "under" | "on-track" | "over" {
    const percentage = (consumed / target) * 100;
    if (percentage < 90) return "under";
    if (percentage > 110) return "over";
    return "on-track";
}

export function generateDateRange(days: number): string[] {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(formatDate(date));
    }
    return dates;
}
