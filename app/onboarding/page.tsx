"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useIntake } from "@/app/context/IntakeContext";
import { IntakeData } from "@/app/lib/types";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { cn } from "@/app/lib/utils";
import {
  ChevronRight,
  ChevronLeft,
  User,
  Target,
  Salad,
  AlertCircle,
  Check,
  Sparkles,
} from "lucide-react";

const allergiesList = [
  "Dairy",
  "Gluten",
  "Nuts",
  "Soy",
  "Shellfish",
  "Peanuts",
  "Eggs",
  "Fish",
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
  }),
};

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    age: "",
    gender: "male" as "male" | "female",
    height: "",
    weight: "",
    goal: "loss" as "loss" | "maintain" | "gain",
    activity: "sedentary" as "sedentary" | "light" | "moderate" | "very" | "extra",
    dietType: "veg" as "veg" | "non-veg" | "vegan" | "jain" | "maharashtrian",
    allergies: [] as string[],
    cheatFoods: "",
    medicalConditions: "",
  });

  const { setIntakeData } = useIntake();
  const router = useRouter();

  const totalSteps = 3;

  const validateStep = (stepNumber: number): boolean => {
    setError(null);
    switch (stepNumber) {
      case 1:
        if (!formData.age || !formData.height || !formData.weight) {
          setError("Please fill in all basic profile fields");
          return false;
        }
        const ageNum = parseInt(formData.age);
        const heightNum = parseInt(formData.height);
        const weightNum = parseInt(formData.weight);
        if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
          setError("Please enter a valid age between 13 and 120");
          return false;
        }
        if (isNaN(heightNum) || heightNum < 100 || heightNum > 250) {
          setError("Please enter a valid height between 100 and 250 cm");
          return false;
        }
        if (isNaN(weightNum) || weightNum < 30 || weightNum > 300) {
          setError("Please enter a valid weight between 30 and 300 kg");
          return false;
        }
        return true;
      case 2:
        if (!formData.goal || !formData.activity) {
          setError("Please select goal and activity level");
          return false;
        }
        return true;
      case 3:
        if (!formData.dietType) {
          setError("Please select diet type");
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < totalSteps) {
        setDirection(1);
        setStep(step + 1);
      } else {
        const intakeData: IntakeData = {
          age: formData.age,
          gender: formData.gender,
          height: formData.height,
          weight: formData.weight,
          goal: formData.goal,
          activity: formData.activity,
          dietType: formData.dietType,
          allergies: formData.allergies,
          cheatFoods: formData.cheatFoods,
          medicalConditions: formData.medicalConditions || undefined,
        };
        setIntakeData(intakeData);
        router.push("/generating");
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const handleFieldChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const toggleAllergy = (allergy: string) => {
    setFormData((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
    setError(null);
  };

  const stepInfo = [
    { icon: User, label: "Profile", description: "Basic information" },
    { icon: Target, label: "Goals", description: "Your objectives" },
    { icon: Salad, label: "Preferences", description: "Diet & allergies" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="section-padding py-8 lg:py-12">
        <div className="container-narrow max-w-xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Let's personalize your plan
            </h1>
            <p className="text-slate-500">
              Tell us about yourself to create your custom nutrition plan
            </p>
          </motion.div>

          {/* Stepper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between">
              {stepInfo.map((s, i) => {
                const stepNum = i + 1;
                const isActive = step === stepNum;
                const isCompleted = step > stepNum;
                const Icon = s.icon;

                return (
                  <div key={stepNum} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                          isActive &&
                          "bg-primary text-white shadow-glow",
                          isCompleted &&
                          "bg-primary/20 text-primary",
                          !isActive && !isCompleted &&
                          "bg-slate-100 text-slate-400"
                        )}
                      >
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-xs font-medium mt-2 transition-colors",
                          isActive || isCompleted
                            ? "text-primary"
                            : "text-slate-400"
                        )}
                      >
                        {s.label}
                      </span>
                    </div>
                    {stepNum < totalSteps && (
                      <div className="flex-1 h-px mx-3 bg-slate-200 relative">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-primary"
                          initial={{ width: "0%" }}
                          animate={{
                            width:
                              isCompleted || (isActive && stepNum < step)
                                ? "100%"
                                : "0%",
                          }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Content */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-soft-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-1">
                          Basic Profile
                        </h2>
                        <p className="text-sm text-slate-500">
                          Enter your basic body metrics
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">
                            Age
                          </label>
                          <input
                            type="number"
                            min="13"
                            max="120"
                            value={formData.age}
                            onChange={(e) =>
                              handleFieldChange("age", e.target.value)
                            }
                            placeholder="25"
                            className="input-enhanced"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">
                            Gender
                          </label>
                          <select
                            value={formData.gender}
                            onChange={(e) =>
                              handleFieldChange(
                                "gender",
                                e.target.value
                              )
                            }
                            className="input-enhanced"
                          >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">
                            Height (cm)
                          </label>
                          <input
                            type="number"
                            min="100"
                            max="250"
                            value={formData.height}
                            onChange={(e) =>
                              handleFieldChange("height", e.target.value)
                            }
                            placeholder="170"
                            className="input-enhanced"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">
                            Weight (kg)
                          </label>
                          <input
                            type="number"
                            min="30"
                            max="300"
                            value={formData.weight}
                            onChange={(e) =>
                              handleFieldChange("weight", e.target.value)
                            }
                            placeholder="65"
                            className="input-enhanced"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-1">
                          Your Goals
                        </h2>
                        <p className="text-sm text-slate-500">
                          What do you want to achieve?
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">
                            Main Goal
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {(
                              [
                                {
                                  value: "loss",
                                  label: "Lose Weight",
                                  emoji: "",
                                },
                                {
                                  value: "maintain",
                                  label: "Maintain",
                                  emoji: "",
                                },
                                {
                                  value: "gain",
                                  label: "Gain Weight",
                                  emoji: "",
                                },
                              ] as const
                            ).map((g) => (
                              <button
                                key={g.value}
                                onClick={() =>
                                  handleFieldChange("goal", g.value)
                                }
                                className={cn(
                                  "p-4 rounded-xl border-2 text-center transition-all duration-200",
                                  formData.goal === g.value
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-slate-100 hover:border-slate-200 text-slate-600"
                                )}
                              >
                                <div className="text-2xl mb-1">
                                  {g.emoji}
                                </div>
                                <div className="text-xs font-medium">
                                  {g.label}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">
                            Activity Level
                          </label>
                          <div className="space-y-2">
                            {(
                              [
                                {
                                  value: "sedentary",
                                  label: "Sedentary",
                                  desc: "Little to no exercise",
                                },
                                {
                                  value: "light",
                                  label: "Lightly Active",
                                  desc: "Light exercise 1-3 days/week",
                                },
                                {
                                  value: "moderate",
                                  label: "Moderately Active",
                                  desc: "Moderate exercise 3-5 days/week",
                                },
                                {
                                  value: "very",
                                  label: "Very Active",
                                  desc: "Hard exercise 6-7 days/week",
                                },
                                {
                                  value: "extra",
                                  label: "Extra Active",
                                  desc: "Very hard exercise or physical job",
                                },
                              ] as const
                            ).map((a) => (
                              <button
                                key={a.value}
                                onClick={() =>
                                  handleFieldChange(
                                    "activity",
                                    a.value
                                  )
                                }
                                className={cn(
                                  "w-full flex items-center justify-between p-4 rounded-xl border-2 text-left transition-all duration-200",
                                  formData.activity === a.value
                                    ? "border-primary bg-primary/5"
                                    : "border-slate-100 hover:border-slate-200"
                                )}
                              >
                                <div>
                                  <div
                                    className={cn(
                                      "text-sm font-medium",
                                      formData.activity === a.value
                                        ? "text-primary"
                                        : "text-slate-700"
                                    )}
                                  >
                                    {a.label}
                                  </div>
                                  <div className="text-xs text-slate-500 mt-0.5">
                                    {a.desc}
                                  </div>
                                </div>
                                {formData.activity === a.value && (
                                  <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                                    <Check className="w-3 h-3" />
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="text-center mb-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-1">
                          Diet Preferences
                        </h2>
                        <p className="text-sm text-slate-500">
                          Customize your meal plan
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">
                            Diet Type
                          </label>
                          <select
                            value={formData.dietType}
                            onChange={(e) =>
                              handleFieldChange(
                                "dietType",
                                e.target.value
                              )
                            }
                            className="input-enhanced"
                          >
                            <option value="veg">Vegetarian</option>
                            <option value="non-veg">
                              Non-Vegetarian
                            </option>
                            <option value="vegan">Vegan</option>
                            <option value="jain">Jain</option>
                            <option value="maharashtrian">
                              Maharashtrian Specific
                            </option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">
                            Allergies
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {allergiesList.map((allergy) => (
                              <button
                                key={allergy}
                                onClick={() => toggleAllergy(allergy)}
                                className={cn(
                                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200",
                                  formData.allergies.includes(allergy)
                                    ? "bg-red-50 border-red-200 text-red-700"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                                )}
                              >
                                {formData.allergies.includes(allergy) && (
                                  <Check className="w-3 h-3 inline mr-1" />
                                )}
                                {allergy}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">
                            Favorite Cheat Foods
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., misal pav, vada pav, biryani"
                            value={formData.cheatFoods}
                            onChange={(e) =>
                              handleFieldChange(
                                "cheatFoods",
                                e.target.value
                              )
                            }
                            className="input-enhanced"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">
                            Medical Conditions{" "}
                            <span className="text-slate-400 font-normal">
                              (optional)
                            </span>
                          </label>
                          <textarea
                            rows={3}
                            placeholder="e.g., diabetes, hypertension, thyroid"
                            value={formData.medicalConditions}
                            onChange={(e) =>
                              handleFieldChange(
                                "medicalConditions",
                                e.target.value
                              )
                            }
                            className="input-enhanced resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-6 sm:px-8 py-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
              <Button
                variant="ghost"
                onClick={handlePrevious}
                disabled={step === 1}
                className={cn(step === 1 && "invisible")}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">
                  Step {step} of {totalSteps}
                </span>
                <Button onClick={handleNext}>
                  {step === totalSteps ? (
                    <>
                      Generate Plan
                      <Sparkles className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
