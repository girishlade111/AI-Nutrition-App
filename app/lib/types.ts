export interface IntakeData {
    age: string;
    gender: "male" | "female";
    height: string;
    weight: string;
    goal: "loss" | "maintain" | "gain";
    activity: "sedentary" | "light" | "moderate" | "very" | "extra";
    dietType: "veg" | "non-veg" | "vegan" | "jain" | "maharashtrian";
    allergies: string[];
    cheatFoods: string;
    medicalConditions?: string;
}

export interface Macro {
    target: number;
    current: number;
}

export interface MealItem {
    name: string;
    calories: number;
    protein?: number;
    carbs?: number;
    fats?: number;
    serving?: string;
}

export interface Meal {
    meal: string;
    time: string;
    items: MealItem[];
    totalCalories: number;
    totalProtein?: number;
    totalCarbs?: number;
    totalFats?: number;
}

export interface ModerationTip {
    food: string;
    tip: string;
}

export interface DailyLog {
    date: string;
    meals: Meal[];
    waterIntake: number;
    notes: string;
}

export interface UserProfile {
    intakeData: IntakeData;
    createdAt: string;
    updatedAt: string;
}

export interface AiPlan {
    calorieTarget: number;
    macros: {
        protein: Macro;
        carbs: Macro;
        fats: Macro;
    };
    dailyPlan: Meal[];
    whyThis: string;
    moderationTip: ModerationTip;
    microNutrients?: {
        iron: string;
        calcium: string;
        vitaminB12: string;
        vitaminD: string;
    };
}

export interface NutritionApiResponse {
    foods: Array<{
        food_name: string;
        serving_qty: number;
        serving_unit: string;
        serving_weight_grams: number;
        nf_calories: number;
        nf_protein: number;
        nf_total_carbohydrate: number;
        nf_total_fat: number;
    }>;
}

export interface DailyProgress {
    date: string;
    caloriesConsumed: number;
    proteinConsumed: number;
    carbsConsumed: number;
    fatsConsumed: number;
    caloriesTarget: number;
    proteinTarget: number;
    carbsTarget: number;
    fatsTarget: number;
}
