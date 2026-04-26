import { z } from "zod";

const createStringSchema = (fieldName: string, min: number, max: number, customMsg?: string) =>
    z.string()
        .min(min, `${fieldName} is required`)
        .max(max, customMsg || `${fieldName} must be less than ${max} characters`);

export const intakeStep1Schema = z.object({
    age: createStringSchema("Age", 1, 3)
        .refine((val) => {
            const num = parseInt(val, 10);
            return !isNaN(num) && num >= 13 && num <= 120;
        }, "Age must be between 13 and 120"),
    gender: z.enum(["male", "female"], {
        errorMap: () => ({ message: "Please select a gender" }),
    }),
    height: createStringSchema("Height", 1, 3)
        .refine((val) => {
            const num = parseInt(val, 10);
            return !isNaN(num) && num >= 50 && num <= 300;
        }, "Height must be between 50cm and 300cm"),
    weight: createStringSchema("Weight", 1, 3)
        .refine((val) => {
            const num = parseInt(val, 10);
            return !isNaN(num) && num >= 20 && num <= 500;
        }, "Weight must be between 20kg and 500kg"),
});

export const intakeStep2Schema = z.object({
    goal: z.enum(["loss", "maintain", "gain"], {
        errorMap: () => ({ message: "Please select a goal" }),
    }),
    activity: z.enum(["sedentary", "light", "moderate", "very", "extra"], {
        errorMap: () => ({ message: "Please select an activity level" }),
    }),
});

export const intakeStep3Schema = z.object({
    dietType: z.enum(["veg", "non-veg", "vegan", "jain", "maharashtrian"], {
        errorMap: () => ({ message: "Please select a diet type" }),
    }),
    allergies: z.array(z.string()).default([]),
    cheatFoods: z.string().max(200, "Please keep under 200 characters").default(""),
    medicalConditions: z.string().max(500, "Please keep under 500 characters").optional().default(""),
});

export const fullIntakeSchema = intakeStep1Schema.merge(intakeStep2Schema).merge(intakeStep3Schema);

export const foodQuerySchema = z
    .string()
    .min(2, "Food name must be at least 2 characters")
    .max(100, "Food name too long")
    .regex(/^[a-zA-Z0-9\s\-(),.]+$/, "Invalid characters in food name");

export const waterIntakeSchema = z
    .number()
    .min(0, "Water intake cannot be negative")
    .max(10000, "Water intake seems too high");

export const servingSizeSchema = z
    .number()
    .min(0.1, "Serving must be at least 0.1")
    .max(50, "Serving size seems too large");

export const mealItemSchema = z.object({
    name: z.string().min(1, "Food name is required").max(100),
    calories: z.number().min(0).max(10000),
    protein: z.number().min(0).optional(),
    carbs: z.number().min(0).optional(),
    fats: z.number().min(0).optional(),
    serving: z.string().optional(),
});

export const noteSchema = z
    .string()
    .max(1000, "Notes must be less than 1000 characters");

export type IntakeStep1Data = z.infer<typeof intakeStep1Schema>;
export type IntakeStep2Data = z.infer<typeof intakeStep2Schema>;
export type IntakeStep3Data = z.infer<typeof intakeStep3Schema>;
export type FullIntakeData = z.infer<typeof fullIntakeSchema>;
export type MealItemData = z.infer<typeof mealItemSchema>;

export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: boolean;
    data?: T;
    errors?: { field: string; message: string }[];
} {
    const result = schema.safeParse(data);
    
    if (result.success) {
        return { success: true, data: result.data };
    }
    
    const errors = result.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
    }));
    
    return { success: false, errors };
}
