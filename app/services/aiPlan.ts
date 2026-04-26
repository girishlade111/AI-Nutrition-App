import { callGemini, GeminiPayload } from "./gemini";
import { generateAlgorithmicMealPlan } from "@/app/lib/nutrition";
import { IntakeData, AiPlan } from "@/app/lib/types";

/**
 * Generate a personalized meal plan using Gemini API with fallback to algorithmic plan
 */
export async function generateAiPlan(intakeData: IntakeData): Promise<AiPlan> {
  try {
    // Construct prompt for Gemini
    const prompt = `
You are a certified nutritionist and dietitian. Generate a personalized one-day meal plan for the user based on their profile.

User Profile:
${JSON.stringify(intakeData, null, 2)}

Return ONLY a valid JSON object (no additional text) with the exact structure:
{
  "calorieTarget": number,
  "macros": {
    "protein": { "target": number, "current": number },
    "carbs": { "target": number, "current": number },
    "fats": { "target": number, "current": number }
  },
  "dailyPlan": [
    {
      "meal": string (e.g., "Breakfast"),
      "time": string (e.g., "8:00 AM"),
      "items": Array<{ 
        "name": string, 
        "calories": number, 
        "protein?: number, 
        "carbs?: number, 
        "fats?: number, 
        "serving?: string 
      }>,
      "totalCalories": number,
      "totalProtein?: number,
      "totalCarbs?: number,
      "totalFats?: number
    }
  ],
  "whyThis": string,
  "moderationTip": { "food": string, "tip": string },
  "microNutrients?: {
    "iron": string,
    "calcium": string,
    "vitaminB12": string,
    "vitaminD": string
  }
}

Requirements:
1. Calculate calorie target based on BMR, TDEE, and goal (loss/maintain/gain)
2. Use appropriate macro ratios for the goal
3. Respect diet type (veg/non-veg/vegan/jain/maharashtrian) and allergies
4. Address the user's cheat foods in moderationTip
5. Provide evidence-based explanation in whyThis
6. Include micronutrient advice relevant to Indian dietary context
7. Set current macro values to 0 (to be updated by tracking)
8. Ensure all numbers are realistic and safe (min 1200 kcal for females, 1500 for males)
9. Distribute calories across 3-4 meals with appropriate timing

If you cannot generate a plan due to constraints, return an algorithmic plan instead.
`;

    const payload: GeminiPayload = {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    };

    // Call Gemini API
    const responseText = await callGemini(payload);

    // Try to parse JSON from response
    let parsed: any;
    try {
      // Extract JSON - handle cases where response might have extra text
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON object found in response");
      }
      parsed = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.warn("Failed to parse Gemini response as JSON, falling back to algorithmic:", parseError);
      throw parseError; // Will trigger fallback
    }

    // Validate essential structure
    if (!parsed.calorieTarget || !parsed.macros || !parsed.dailyPlan) {
      throw new Error("Invalid plan structure from Gemini");
    }

    // Ensure macros have current values
    if (!parsed.macros.protein.current) parsed.macros.protein.current = 0;
    if (!parsed.macros.carbs.current) parsed.macros.carbs.current = 0;
    if (!parsed.macros.fats.current) parsed.macros.fats.current = 0;

    // Ensure dailyPlan items have required totals
    parsed.dailyPlan.forEach((meal: any) => {
      if (!meal.totalCalories) meal.totalCalories = 0;
      if (!meal.totalProtein) meal.totalProtein = 0;
      if (!meal.totalCarbs) meal.totalCarbs = 0;
      if (!meal.totalFats) meal.totalFats = 0;
      // Ensure items array exists
      if (!Array.isArray(meal.items)) meal.items = [];
    });

    // Provide fallback for optional fields if missing
    if (!parsed.whyThis) parsed.whyThis = "Your personalized plan based on nutritional science and your profile.";
    if (!parsed.moderationTip) {
      parsed.moderationTip = {
        food: intakeData.cheatFoods || "Favorite Foods",
        tip: `Enjoy ${intakeData.cheatFoods || "your favorite foods"} in moderation as part of a balanced diet.`
      };
    }
    if (!parsed.microNutrients) {
      parsed.microNutrients = {
        iron: "12-18mg (consume jaggery/gud, spinach/palak, lentils)",
        calcium: "1000mg (dairy, ragi, sesame seeds)",
        vitaminB12: "2.4mcg (dairy, eggs, or fortified foods)",
        vitaminD: "600 IU (sunlight exposure, fortified foods)"
      };
    }

    // Validate calorie target is within safe bounds
    const weight = parseFloat(intakeData.weight);
    const gender = intakeData.gender;
    const minCalories = gender === "female" ? 1200 : 1500;
    if (parsed.calorieTarget < minCalories) {
      console.warn(`Calorie target ${parsed.calorieTarget} below minimum ${minCalories}, adjusting`);
      parsed.calorieTarget = minCalories;
      // Recalculate macros with new target
      const { protein, carbs, fats } = calculateMacroTargets(minCalories, intakeData.goal);
      parsed.macros.protein.target = protein;
      parsed.macros.carbs.target = carbs;
      parsed.macros.fats.target = fats;
    }

    return parsed as AiPlan;
  } catch (error) {
    console.warn("Gemini plan generation failed, falling back to algorithmic:", error);
    // Fallback to algorithmic plan
    return generateAlgorithmicMealPlan(intakeData);
  }
}

/**
 * Calculate macro targets based on calorie target and goal
 * (Duplicated from nutrition.ts to avoid circular dependency - in production we'd import)
 */
function calculateMacroTargets(calorieTarget: number, goal: string): { protein: number; carbs: number; fats: number } {
  // Import constants dynamically to avoid circular issues
  const { MACRO_RATIOS } = require("@/app/lib/constants");
  const ratios = MACRO_RATIOS[goal] || MACRO_RATIOS.maintain;

  // Protein and carbs = 4 kcal/g, Fats = 9 kcal/g
  const protein = Math.round((calorieTarget * ratios.protein) / 4);
  const carbs = Math.round((calorieTarget * ratios.carbs) / 4);
  const fats = Math.round((calorieTarget * ratios.fats) / 9);

  return { protein, carbs, fats };
}