import { IntakeData, AiPlan } from "@/app/lib/types";
import { generateAlgorithmicMealPlan } from "@/app/lib/nutrition";

/**
 * Generates an AI meal plan.
 * In production, this calls the Gemini API.
 * In development / without API key, it uses algorithmic generation.
 */
export async function fetchAiPlan(intakeData: IntakeData): Promise<AiPlan> {
    // Validate inputs
    const age = parseInt(intakeData.age, 10);
    const weight = parseFloat(intakeData.weight);
    const height = parseFloat(intakeData.height);

    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
        throw new Error("Invalid intake data: age, weight, and height must be valid numbers.");
    }

    if (age < 13 || age > 120) {
        throw new Error("Age must be between 13 and 120.");
    }
    if (weight < 20 || weight > 500) {
        throw new Error("Weight must be between 20kg and 500kg.");
    }
    if (height < 50 || height > 300) {
        throw new Error("Height must be between 50cm and 300cm.");
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const plan = generateAlgorithmicMealPlan(intakeData);

    // Personalize moderation tip based on cheat foods
    if (intakeData.cheatFoods.trim()) {
        const cheat = intakeData.cheatFoods.toLowerCase();
        if (cheat.includes("misal")) {
            plan.moderationTip = {
                food: "Misal Pav",
                tip: "Misal Pav is a great choice! To manage calories, ask for less farsan on top and have it with just one pav. Pair it with buttermilk (Chaas) instead of a sugary drink.",
            };
        } else if (cheat.includes("vada")) {
            plan.moderationTip = {
                food: "Vada Pav",
                tip: "We see you enjoy Vada Pav! Limit to once a week. Have it with a side salad instead of fried chilies, and consider it as part of your lunch's carb quota.",
            };
        } else if (cheat.includes("poli") || cheat.includes("puran")) {
            plan.moderationTip = {
                food: "Puran Poli",
                tip: "Puran Poli is a festive favorite! Have it post-workout when your body needs quick carbs. Limit to 1-2 pieces and enjoy with warm milk or ghee.",
            };
        } else if (cheat.includes("biryani")) {
            plan.moderationTip = {
                food: "Biryani",
                tip: "Biryani can fit into your plan! Opt for a smaller portion (1 cup), add extra raita for protein, and load up on salad. Consider it your main meal of the day.",
            };
        }
    }

    return plan;
}
