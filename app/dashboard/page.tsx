"use client";

import { useIntake, useDailyProgress } from "@/app/context/IntakeContext";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  AnimatedProgress,
} from "@/app/components/animations";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ProgressRing } from "@/app/components/ui/progress-ring";
import { Badge } from "@/app/components/ui/badge";
import { cn, calculatePercentage } from "@/app/lib/utils";
import {
  Flame,
  Dumbbell,
  Wheat,
  Droplets,
  Plus,
  History,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  const { state } = useIntake();
  const { dailyProgress } = useDailyProgress();
  const router = useRouter();

  const intakeData = state.intakeData;
  const aiPlan = state.aiPlan;

  if (!intakeData) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 animate-pulse-subtle">
            <Flame className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Loading your profile...</h2>
          <p className="text-sm text-slate-500">Please wait while we prepare your data</p>
        </div>
      </div>
    );
  }

  if (!aiPlan) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 animate-pulse-subtle">
            <Flame className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-1">Generating your plan...</h2>
          <p className="text-sm text-slate-500">AI is creating your personalized nutrition plan</p>
        </div>
      </div>
    );
  }

  const today = format(new Date(), "yyyy-MM-dd");
  const todayProgress = dailyProgress.find((p) => p.date === today);
  const calorieProgress = todayProgress
    ? calculatePercentage(todayProgress.caloriesConsumed, aiPlan.calorieTarget)
    : 0;

  const macroData = [
    {
      label: "Protein",
      icon: Dumbbell,
      current: todayProgress?.proteinConsumed ?? 0,
      target: aiPlan.macros.protein.target,
      color: "text-sky-600",
      bgColor: "bg-sky-500",
      lightColor: "bg-sky-50",
      unit: "g",
    },
    {
      label: "Carbs",
      icon: Wheat,
      current: todayProgress?.carbsConsumed ?? 0,
      target: aiPlan.macros.carbs.target,
      color: "text-amber-600",
      bgColor: "bg-amber-500",
      lightColor: "bg-amber-50",
      unit: "g",
    },
    {
      label: "Fats",
      icon: Droplets,
      current: todayProgress?.fatsConsumed ?? 0,
      target: aiPlan.macros.fats.target,
      color: "text-rose-600",
      bgColor: "bg-rose-500",
      lightColor: "bg-rose-50",
      unit: "g",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="section-padding py-8 lg:py-10">
        <div className="container-narrow max-w-4xl">
          {/* Header */}
          <FadeInUp>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                  Welcome back!
                </h1>
                <p className="text-slate-500 mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(), "EEEE, MMMM do")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => router.push("/tracker")}>
                  <Plus className="w-4 h-4" />
                  Log Meal
                </Button>
                <Button variant="ghost" size="sm" onClick={() => router.push("/history")}>
                  <History className="w-4 h-4" />
                  History
                </Button>
              </div>
            </div>
          </FadeInUp>

          {/* Calorie Overview */}
          <FadeInUp delay={0.1}>
            <Card className="mb-6">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <ProgressRing
                    progress={calorieProgress}
                    size={140}
                    strokeWidth={10}
                    progressColor="stroke-primary"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">
                        {todayProgress?.caloriesConsumed ?? 0}
                      </div>
                      <div className="text-xs text-slate-500">/ {aiPlan.calorieTarget} kcal</div>
                    </div>
                  </ProgressRing>
                  <div className="flex-1 w-full">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900">Daily Calorie Goal</h3>
                        <p className="text-sm text-slate-500">
                          {todayProgress
                            ? todayProgress.caloriesConsumed >= aiPlan.calorieTarget
                              ? "Goal exceeded! Great job!"
                              : `${aiPlan.calorieTarget - todayProgress.caloriesConsumed} kcal remaining`
                            : "No meals logged yet today"}
                        </p>
                      </div>
                      <Badge variant={calorieProgress >= 100 ? "success" : "default"}>
                        {calorieProgress}%
                      </Badge>
                    </div>
                    <AnimatedProgress
                      progress={calorieProgress}
                      className="h-3"
                      barClassName="bg-primary"
                    />
                    <div className="flex justify-between mt-2 text-xs text-slate-400">
                      <span>0 kcal</span>
                      <span>{aiPlan.calorieTarget} kcal</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInUp>

          {/* Macros Grid */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {macroData.map((macro) => {
              const Icon = macro.icon;
              const progress = calculatePercentage(macro.current, macro.target);
              return (
                <StaggerItem key={macro.label}>
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className={cn("p-2 rounded-lg", macro.lightColor)}>
                          <Icon className={cn("w-4 h-4", macro.color)} />
                        </div>
                        <Badge variant="secondary" size="sm">
                          {progress}%
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-slate-500">{macro.label}</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold text-slate-900">{macro.current}</span>
                          <span className="text-sm text-slate-500">/ {macro.target}{macro.unit}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <AnimatedProgress
                          progress={progress}
                          className="h-1.5"
                          barClassName={macro.bgColor}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Today's Meal Plan */}
          <FadeInUp delay={0.3}>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Today's Meal Plan
                </h2>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {aiPlan.dailyPlan.length} meals
                </Badge>
              </div>
              <div className="space-y-3">
                {aiPlan.dailyPlan.map((meal, i) => (
                  <motion.div
                    key={meal.meal}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 + 0.4 }}
                  >
                    <Card className="overflow-hidden">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                              <span className="text-sm font-bold">{i + 1}</span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{meal.meal}</h3>
                              <p className="text-xs text-slate-500">{meal.time}</p>
                            </div>
                          </div>
                          <Badge variant="default">{meal.totalCalories} kcal</Badge>
                        </div>
                        <div className="space-y-2 pl-[52px]">
                          {meal.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-slate-600">{item.name}</span>
                              <span className="text-slate-500">{item.calories} kcal</span>
                            </div>
                          ))}
                        </div>
                        {(meal.totalProtein || meal.totalCarbs || meal.totalFats) && (
                          <div className="mt-3 pt-3 border-t border-slate-50 pl-[52px] flex gap-4 text-xs text-slate-500">
                            {meal.totalProtein !== undefined && (
                              <span className="flex items-center gap-1">
                                <Dumbbell className="w-3 h-3 text-sky-500" />
                                {Math.round(meal.totalProtein)}g protein
                              </span>
                            )}
                            {meal.totalCarbs !== undefined && (
                              <span className="flex items-center gap-1">
                                <Wheat className="w-3 h-3 text-amber-500" />
                                {Math.round(meal.totalCarbs)}g carbs
                              </span>
                            )}
                            {meal.totalFats !== undefined && (
                              <span className="flex items-center gap-1">
                                <Droplets className="w-3 h-3 text-rose-500" />
                                {Math.round(meal.totalFats)}g fats
                              </span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Why This Plan */}
          {aiPlan.whyThis && (
            <FadeInUp delay={0.5}>
              <Card className="mb-8 bg-gradient-to-r from-primary-50/50 to-transparent border-primary/10">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Why this plan?</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{aiPlan.whyThis}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInUp>
          )}
        </div>
      </div>
    </div>
  );
}
