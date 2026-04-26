import { z } from "zod";

export const intakeStep1Schema = z.object({
    age: z
        .string()
        .min(1, "Age is required")
        .refine((val) => {
            const num = parseInt(val, 10);
            return !isNaN(num) && num >= 13 && num <= 120;
        }, "Age must be between 13 and 120"),
    gender: z.enum(["male", "female"]),
    height: z
        .string()
        .min(1, "Height is required")
        .refine((val) => {
            const num = parseInt(val, 10);
            return !isNaN(num) && num >= 50 && num <= 300;
        }, "Height must be between 50cm and 300cm"),
    weight: z
        .string()
        .min(1, "Weight is required")
        .refine((val) => {
            const num = parseInt(val, 10);
            return !isNaN(num) && num >= 20 && num <= 500;
        }, "Weight must be between 20kg and 500kg"),
});

export const intakeStep2Schema = z.object({
    goal: z.enum(["loss", "maintain", "gain"]),
    activity: z.enum(["sedentary", "light", "moderate", "very", "extra"]),
});

export const intakeStep3Schema = z.object({
    dietType: z.enum(["veg", "non-veg", "vegan", "jain", "maharashtrian"]),
    allergies: z.array(z.string()),
    cheatFoods: z.string().max(200, "Please keep under 200 characters"),
    medicalConditions: z.string().max(500, "Please keep under 500 characters").optional(),
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

export type IntakeStep1Data = z.infer<typeof intakeStep1Schema>;
export type IntakeStep2Data = z.infer<typeof intakeStep2Schema>;
export type IntakeStep3Data = z.infer<typeof intakeStep3Schema>;
export type FullIntakeData = z.infer<typeof fullIntakeSchema>;
