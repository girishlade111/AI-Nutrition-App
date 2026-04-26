import { ACTIVITY_MULTIPLIERS, GOAL_ADJUSTMENTS, MACRO_RATIOS } from "./constants";
import { IntakeData, AiPlan, Meal, MealItem } from "./types";

/**
 * Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
 */
export function calculateBMR(intakeData: IntakeData): number {
    const weight = parseFloat(intakeData.weight);
    const height = parseFloat(intakeData.height);
    const age = parseFloat(intakeData.age);

    if (isNaN(weight) || isNaN(height) || isNaN(age)) {
        throw new Error("Invalid input data for BMR calculation");
    }

    // Mifflin-St Jeor Equation
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (intakeData.gender === "male") {
        bmr += 5;
    } else {
        bmr -= 161;
    }

    return Math.round(bmr);
}

/**
 * Calculate Total Daily Energy Expenditure (TDEE)
 */
export function calculateTDEE(intakeData: IntakeData): number {
    const bmr = calculateBMR(intakeData);
    const multiplier = ACTIVITY_MULTIPLIERS[intakeData.activity] || 1.2;
    return Math.round(bmr * multiplier);
}

/**
 * Calculate daily calorie target based on goal
 */
export function calculateCalorieTarget(intakeData: IntakeData): number {
    const tdee = calculateTDEE(intakeData);
    const adjustment = GOAL_ADJUSTMENTS[intakeData.goal] || 0;
    const target = tdee + adjustment;

    // Safety bounds
    const minCalories = intakeData.gender === "female" ? 1200 : 1500;
    const maxCalories = 5000;

    return Math.max(minCalories, Math.min(maxCalories, target));
}

/**
 * Calculate macro targets based on calorie target and goal
 */
export function calculateMacroTargets(
    calorieTarget: number,
    goal: string
): { protein: number; carbs: number; fats: number } {
    const ratios = MACRO_RATIOS[goal] || MACRO_RATIOS.maintain;

    // Protein and carbs = 4 kcal/g, Fats = 9 kcal/g
    const protein = Math.round((calorieTarget * ratios.protein) / 4);
    const carbs = Math.round((calorieTarget * ratios.carbs) / 4);
    const fats = Math.round((calorieTarget * ratios.fats) / 9);

    return { protein, carbs, fats };
}

/**
 * Calculate BMI
 */
export function calculateBMI(intakeData: IntakeData): number {
    const weight = parseFloat(intakeData.weight);
    const height = parseFloat(intakeData.height) / 100; // convert to meters

    if (isNaN(weight) || isNaN(height) || height === 0) {
        throw new Error("Invalid input data for BMI calculation");
    }

    return Math.round((weight / (height * height)) * 10) / 10;
}

/**
 * Get BMI category
 */
export function getBMICategory(bmi: number): string {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
}

/**
 * Generate a meal plan based on user profile (algorithmic fallback)
 */
export function generateAlgorithmicMealPlan(intakeData: IntakeData): AiPlan {
    const calorieTarget = calculateCalorieTarget(intakeData);
    const macros = calculateMacroTargets(calorieTarget, intakeData.goal);
    const bmi = calculateBMI(intakeData);
    const bmiCategory = getBMICategory(bmi);

    const meals = buildMealsForDietType(intakeData, calorieTarget);

    const plan: AiPlan = {
        calorieTarget,
        macros: {
            protein: { target: macros.protein, current: 0 },
            carbs: { target: macros.carbs, current: 0 },
            fats: { target: macros.fats, current: 0 },
        },
        dailyPlan: meals,
        whyThis: `Your plan is based on a TDEE of ${calculateTDEE(intakeData)} kcal with a ${intakeData.goal} adjustment. Your BMI is ${bmi} (${bmiCategory}). We prioritized ${intakeData.dietType} options respecting your dietary preferences.`,
        moderationTip: generateModerationTip(intakeData.cheatFoods),
        microNutrients: {
            iron: "12-18mg (consume jaggery/gud, spinach/palak, lentils)",
            calcium: "1000mg (dairy, ragi, sesame seeds)",
            vitaminB12: "2.4mcg (dairy, eggs, or fortified foods)",
            vitaminD: "600 IU (sunlight exposure, fortified foods)",
        },
    };

    return plan;
}

function buildMealsForDietType(intakeData: IntakeData, calorieTarget: number): Meal[] {
    const { dietType, allergies } = intakeData;
    const isVeg = dietType === "veg" || dietType === "jain" || dietType === "vegan";
    const isJain = dietType === "jain";

    const avoidDairy = allergies.includes("Dairy");
    const avoidNuts = allergies.includes("Nuts") || allergies.includes("Peanuts");
    const avoidGluten = allergies.includes("Gluten");
    const avoidSoy = allergies.includes("Soy");

    const breakfast: MealItem[] = [];
    const lunch: MealItem[] = [];
    const snack: MealItem[] = [];
    const dinner: MealItem[] = [];

    if (dietType === "maharashtrian") {
        breakfast.push(
            { name: "Poha ( flattened rice)", calories: 200, protein: 4, carbs: 40, fats: 6 },
            { name: "Peanuts (handful)", calories: 80, protein: 4, carbs: 2, fats: 7 },
            { name: "Lemon juice", calories: 10, protein: 0, carbs: 3, fats: 0 }
        );
        lunch.push(
            { name: "Jowar Bhakri (2 medium)", calories: 140, protein: 4, carbs: 30, fats: 1 },
            { name: "Varan (Tur Dal)", calories: 100, protein: 6, carbs: 16, fats: 2 },
            { name: "Bharli Vangi (stuffed eggplant)", calories: 120, protein: 3, carbs: 14, fats: 6 },
            { name: "Koshimbir (salad)", calories: 40, protein: 1, carbs: 8, fats: 0 }
        );
        snack.push(
            { name: "Sprouted Matki (moth beans)", calories: 100, protein: 7, carbs: 15, fats: 1 },
            { name: "Green tea", calories: 0, protein: 0, carbs: 0, fats: 0 }
        );
        dinner.push(
            { name: "Moong Dal Khichdi", calories: 280, protein: 10, carbs: 48, fats: 4 },
            { name: "Dahi (curd) / Buttermilk", calories: 80, protein: 4, carbs: 6, fats: 4 },
            { name: "Steamed vegetables", calories: 60, protein: 2, carbs: 12, fats: 0 }
        );
    } else if (isVeg) {
        breakfast.push(
            { name: "Oats porridge with milk", calories: 220, protein: 8, carbs: 36, fats: 5 },
            { name: "Banana", calories: 90, protein: 1, carbs: 23, fats: 0 }
        );
        lunch.push(
            { name: "Brown rice (1 cup)", calories: 216, protein: 5, carbs: 45, fats: 2 },
            { name: "Rajma curry (1 cup)", calories: 150, protein: 8, carbs: 22, fats: 3 },
            { name: "Mixed vegetable sabzi", calories: 100, protein: 3, carbs: 15, fats: 3 },
            { name: "Salad", calories: 30, protein: 1, carbs: 6, fats: 0 }
        );
        snack.push(
            { name: "Roasted chana", calories: 120, protein: 6, carbs: 20, fats: 2 },
            { name: "Green tea", calories: 0, protein: 0, carbs: 0, fats: 0 }
        );
        dinner.push(
            { name: "Roti (2 whole wheat)", calories: 180, protein: 6, carbs: 36, fats: 1 },
            { name: "Paneer bhurji (100g)", calories: 200, protein: 14, carbs: 6, fats: 14 },
            { name: "Cucumber raita", calories: 60, protein: 3, carbs: 5, fats: 3 }
        );
    } else {
        // Non-veg
        breakfast.push(
            { name: "Egg bhurji (2 eggs)", calories: 180, protein: 12, carbs: 4, fats: 12 },
            { name: "Whole wheat toast (2 slices)", calories: 160, protein: 6, carbs: 28, fats: 2 }
        );
        lunch.push(
            { name: "Chicken curry (150g)", calories: 250, protein: 30, carbs: 6, fats: 12 },
            { name: "Rice (1 cup)", calories: 200, protein: 4, carbs: 44, fats: 0 },
            { name: "Dal (1 cup)", calories: 120, protein: 7, carbs: 18, fats: 2 },
            { name: "Salad", calories: 30, protein: 1, carbs: 6, fats: 0 }
        );
        snack.push(
            { name: "Greek yogurt (100g)", calories: 100, protein: 10, carbs: 4, fats: 0 },
            { name: "Almonds (10 pieces)", calories: 70, protein: 2, carbs: 2, fats: 6 }
        );
        dinner.push(
            { name: "Grilled fish (150g)", calories: 200, protein: 28, carbs: 0, fats: 8 },
            { name: "Quinoa (1 cup cooked)", calories: 222, protein: 8, carbs: 39, fats: 4 },
            { name: "Sauteed vegetables", calories: 80, protein: 2, carbs: 12, fats: 3 }
        );
    }

    // Adjust for allergies
    if (avoidDairy) {
        removeItemsContaining(breakfast, ["milk", "curd", "buttermilk", "dahi", "paneer", "yogurt"]);
        removeItemsContaining(dinner, ["milk", "curd", "buttermilk", "dahi", "paneer", "yogurt"]);
    }
    if (avoidNuts) {
        removeItemsContaining(breakfast, ["peanut", "almond", "nut", "walnut"]);
        removeItemsContaining(snack, ["peanut", "almond", "nut", "walnut"]);
    }
    if (avoidGluten) {
        removeItemsContaining(breakfast, ["oats", "toast", "roti", "bhakri"]);
        removeItemsContaining(lunch, ["roti", "bhakri"]);
        removeItemsContaining(dinner, ["roti", "bhakri"]);
    }
    if (avoidSoy) {
        removeItemsContaining(lunch, ["soy", "tofu"]);
        removeItemsContaining(dinner, ["soy", "tofu"]);
    }

    if (isJain) {
        // Remove root vegetables, eggs, etc.
        const nonJainItems = ["potato", "onion", "garlic", "egg", "chicken", "fish", "meat"];
        removeItemsContaining(breakfast, nonJainItems);
        removeItemsContaining(lunch, nonJainItems);
        removeItemsContaining(snack, nonJainItems);
        removeItemsContaining(dinner, nonJainItems);
    }

    // Build meal objects with totals
    const meals: Meal[] = [
        {
            meal: "Breakfast",
            time: "8:00 AM",
            items: breakfast,
            totalCalories: breakfast.reduce((s, i) => s + i.calories, 0),
            totalProtein: breakfast.reduce((s, i) => s + (i.protein || 0), 0),
            totalCarbs: breakfast.reduce((s, i) => s + (i.carbs || 0), 0),
            totalFats: breakfast.reduce((s, i) => s + (i.fats || 0), 0),
        },
        {
            meal: "Lunch",
            time: "1:00 PM",
            items: lunch,
            totalCalories: lunch.reduce((s, i) => s + i.calories, 0),
            totalProtein: lunch.reduce((s, i) => s + (i.protein || 0), 0),
            totalCarbs: lunch.reduce((s, i) => s + (i.carbs || 0), 0),
            totalFats: lunch.reduce((s, i) => s + (i.fats || 0), 0),
        },
        {
            meal: "Snack",
            time: "4:30 PM",
            items: snack,
            totalCalories: snack.reduce((s, i) => s + i.calories, 0),
            totalProtein: snack.reduce((s, i) => s + (i.protein || 0), 0),
            totalCarbs: snack.reduce((s, i) => s + (i.carbs || 0), 0),
            totalFats: snack.reduce((s, i) => s + (i.fats || 0), 0),
        },
        {
            meal: "Dinner",
            time: "8:00 PM",
            items: dinner,
            totalCalories: dinner.reduce((s, i) => s + i.calories, 0),
            totalProtein: dinner.reduce((s, i) => s + (i.protein || 0), 0),
            totalCarbs: dinner.reduce((s, i) => s + (i.carbs || 0), 0),
            totalFats: dinner.reduce((s, i) => s + (i.fats || 0), 0),
        },
    ];

    // Scale meals proportionally to match calorie target
    const currentTotal = meals.reduce((s, m) => s + m.totalCalories, 0);
    if (currentTotal > 0 && Math.abs(currentTotal - calorieTarget) > 50) {
        const scale = calorieTarget / currentTotal;
        meals.forEach((meal) => {
            meal.items.forEach((item) => {
                item.calories = Math.round(item.calories * scale);
                item.protein = Math.round((item.protein || 0) * scale * 10) / 10;
                item.carbs = Math.round((item.carbs || 0) * scale * 10) / 10;
                item.fats = Math.round((item.fats || 0) * scale * 10) / 10;
            });
            meal.totalCalories = meal.items.reduce((s, i) => s + i.calories, 0);
            meal.totalProtein = meal.items.reduce((s, i) => s + (i.protein || 0), 0);
            meal.totalCarbs = meal.items.reduce((s, i) => s + (i.carbs || 0), 0);
            meal.totalFats = meal.items.reduce((s, i) => s + (i.fats || 0), 0);
        });
    }

    return meals.filter((m) => m.items.length > 0);
}

function removeItemsContaining(items: MealItem[], keywords: string[]) {
    for (let i = items.length - 1; i >= 0; i--) {
        const lowerName = items[i].name.toLowerCase();
        if (keywords.some((k) => lowerName.includes(k))) {
            items.splice(i, 1);
        }
    }
}

function generateModerationTip(cheatFoods: string): { food: string; tip: string } {
    const lowerCheat = cheatFoods.toLowerCase().trim();
    if (!lowerCheat) {
        return {
            food: "Fried Snacks",
            tip: "Enjoy your favorite fried snacks occasionally. Limit to once a week and pair with a side salad or buttermilk to balance the meal.",
        };
    }

    if (lowerCheat.includes("misal")) {
        return {
            food: "Misal Pav",
            tip: "Misal Pav is a great choice! To manage calories, ask for less farsan on top and have it with just one pav. Pair it with buttermilk (Chaas) instead of a sugary drink.",
        };
    }
    if (lowerCheat.includes("vada")) {
        return {
            food: "Vada Pav",
            tip: "We see you enjoy Vada Pav! You can absolutely include it. We recommend limiting it to once a week. To make it healthier, try having it with a side salad instead of fried chilies, and consider it as part of your lunch's carb quota.",
        };
    }
    if (lowerCheat.includes("poli") || lowerCheat.includes("puran")) {
        return {
            food: "Puran Poli",
            tip: "Puran Poli is a festive favorite! Have it as a post-workout meal when your body needs quick carbs. Limit to 1-2 pieces and enjoy with a glass of warm milk or ghee.",
        };
    }
    if (lowerCheat.includes("biryani")) {
        return {
            food: "Biryani",
            tip: "Biryani can fit into your plan! Opt for a smaller portion (1 cup), add extra raita for protein and cooling, and load up on the salad. Consider it your main meal of the day.",
        };
    }

    return {
        food: cheatFoods.split(",")[0].trim() || "Favorite Foods",
        tip: `You can absolutely enjoy ${cheatFoods.split(",")[0].trim() || "your favorite foods"}! The key is moderation. Try the 80/20 rule: eat nutritiously 80% of the time, and enjoy your favorites 20% of the time without guilt.`,
    };
}
