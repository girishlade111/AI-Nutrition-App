"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIntake } from "@/app/context/IntakeContext";
import { generateAiPlan } from "@/app/services/aiPlan";
import { generateAlgorithmicMealPlan } from "@/app/lib/nutrition";
import { motion } from "framer-motion";
import { Brain, Sparkles, Zap } from "lucide-react";

const loadingMessages = [
  "Analyzing your profile...",
  "Calculating optimal macros...",
  "Curating Maharashtra specialties...",
  "Building your meal schedule...",
  "Finalizing nutrition insights...",
];

export default function GeneratingPage() {
  const { state, setAiPlan } = useIntake();
  const intakeData = state.intakeData;
  const router = useRouter();

  useEffect(() => {
    let isCancelled = false;

    async function generatePlan() {
      if (!intakeData) return;

      try {
        const aiPlan = await generateAiPlan(intakeData);
        if (!isCancelled) {
          setAiPlan(aiPlan);
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Failed to generate AI plan:", error);
        try {
          const algorithmicPlan = generateAlgorithmicMealPlan(intakeData);
          if (!isCancelled) {
            setAiPlan(algorithmicPlan);
            router.push("/dashboard");
          }
        } catch (fallbackError) {
          console.error("Failed to generate fallback plan:", fallbackError);
          if (!isCancelled) {
            router.push("/dashboard");
          }
        }
      }
    }

    if (intakeData) {
      generatePlan();
    }

    return () => {
      isCancelled = true;
    };
  }, [intakeData, setAiPlan, router]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 section-padding">
      <div className="container-narrow max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-2xl border border-slate-100 shadow-soft-xl p-10"
        >
          {/* Animated Icon */}
          <div className="relative w-20 h-20 mx-auto mb-8">
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/10"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
            <div className="relative w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-xl font-bold text-slate-900 mb-2"
          >
            Generating your plan
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 mb-8"
          >
            Our AI is analyzing your profile and creating a personalized
            nutrition plan just for you.
          </motion.p>

          {/* Progress Steps */}
          <div className="space-y-3">
            {loadingMessages.map((message, i) => (
              <motion.div
                key={message}
                initial={{ opacity: 0, x: -10 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { delay: i * 0.4 + 0.5 },
                }}
                className="flex items-center gap-3 text-sm"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: { delay: i * 0.4 + 0.6, type: "spring" },
                  }}
                  className="flex-shrink-0"
                >
                  {i < 2 ? (
                    <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-slate-300" />
                    </div>
                  )}
                </motion.div>
                <span
                  className={
                    i < 2 ? "text-slate-700 font-medium" : "text-slate-400"
                  }
                >
                  {message}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
