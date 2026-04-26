export const PAGES = {
    LANDING: "landing",
    ONBOARDING: "onboarding",
    INTAKE_STEP_1: "intake-step-1",
    INTAKE_STEP_2: "intake-step-2",
    INTAKE_STEP_3: "intake-step-3",
    GENERATING: "generating",
    DASHBOARD: "dashboard",
    TRACKER: "tracker",
    HISTORY: "history",
} as const;

export const DIET_TYPES = [
    { value: "veg", label: "Vegetarian" },
    { value: "non-veg", label: "Non-Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "jain", label: "Jain" },
    { value: "maharashtrian", label: "Maharashtrian Specific" },
];

export const ACTIVITY_LEVELS = [
    { value: "sedentary", label: "Sedentary (little to no exercise)" },
    { value: "light", label: "Lightly Active (light exercise 1-3 days/week)" },
    { value: "moderate", label: "Moderately Active (moderate exercise 3-5 days/week)" },
    { value: "very", label: "Very Active (hard exercise 6-7 days/week)" },
    { value: "extra", label: "Extra Active (very hard exercise, physical job)" },
];

export const GOALS = [
    { value: "loss", label: "Weight Loss" },
    { value: "maintain", label: "Weight Maintenance" },
    { value: "gain", label: "Weight Gain" },
];

export const ALLERGIES_OPTIONS = [
    "Dairy",
    "Gluten",
    "Nuts",
    "Soy",
    "Shellfish",
    "Peanuts",
    "Eggs",
    "Fish",
];

export const ACTIVITY_MULTIPLIERS: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    very: 1.725,
    extra: 1.9,
};

export const GOAL_ADJUSTMENTS: Record<string, number> = {
    loss: -500,
    maintain: 0,
    gain: 300,
};

export const MACRO_RATIOS: Record<string, { protein: number; carbs: number; fats: number }> = {
    loss: { protein: 0.35, carbs: 0.35, fats: 0.3 },
    maintain: { protein: 0.3, carbs: 0.4, fats: 0.3 },
    gain: { protein: 0.3, carbs: 0.45, fats: 0.25 },
};

export const MEAL_TIMINGS = [
    { meal: "Breakfast", time: "8:00 AM" },
    { meal: "Mid-Morning Snack", time: "10:30 AM" },
    { meal: "Lunch", time: "1:00 PM" },
    { meal: "Afternoon Snack", time: "4:00 PM" },
    { meal: "Dinner", time: "8:00 PM" },
];

export const LOCAL_STORAGE_KEYS = {
    INTAKE_DATA: "nutritionIntakeData",
    AI_PLAN: "nutritionAiPlan",
    DAILY_LOGS: "nutritionDailyLogs",
    USER_PROFILE: "nutritionUserProfile",
} as const;
