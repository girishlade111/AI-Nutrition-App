"use client";

import { useState } from "react";
import { useIntake } from "@/app/context/IntakeContext";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/app/components/animations";
import { cn } from "@/app/lib/utils";
import {
  Calendar,
  Clock,
  Dumbbell,
  Wheat,
  Droplets,
  Flame,
  ChevronDown,
  ChevronUp,
  Utensils,
  Filter,
} from "lucide-react";

type FilterPeriod = "all" | "7days" | "30days" | "month";

export default function HistoryPage() {
  const { state } = useIntake();
  const dailyLogs = state.dailyLogs;
  const [filter, setFilter] = useState<FilterPeriod>("all");
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

  const toggleDate = (date: string) => {
    setExpandedDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };

  const getFilteredLogs = () => {
    const sorted = [...dailyLogs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const now = new Date();
    switch (filter) {
      case "7days":
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        return sorted.filter((log) => new Date(log.date) >= sevenDaysAgo);
      case "30days":
        const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
        return sorted.filter((log) => new Date(log.date) >= thirtyDaysAgo);
      case "month":
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return sorted.filter((log) => new Date(log.date) >= startOfMonth);
      default:
        return sorted;
    }
  };

  const filteredLogs = getFilteredLogs();

  const filters: { value: FilterPeriod; label: string }[] = [
    { value: "all", label: "All Time" },
    { value: "7days", label: "Last 7 Days" },
    { value: "30days", label: "Last 30 Days" },
    { value: "month", label: "This Month" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="section-padding py-8 lg:py-10">
        <div className="container-narrow max-w-3xl">
          {/* Header */}
          <FadeInUp>
            <div className="mb-8">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                Nutrition History
              </h1>
              <p className="text-slate-500 mt-1">
                Review your past meals and nutrition trends
              </p>
            </div>
          </FadeInUp>

          {/* Filters */}
          <FadeInUp delay={0.1}>
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin">
              <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                    filter === f.value
                      ? "bg-primary text-white shadow-button"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </FadeInUp>

          {/* Empty State */}
          {filteredLogs.length === 0 && (
            <FadeInUp delay={0.2}>
              <Card>
                <CardContent className="p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Utensils className="w-6 h-6 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    No logs found
                  </h3>
                  <p className="text-sm text-slate-500 max-w-sm mx-auto">
                    Start tracking your meals to see your nutrition history here.
                  </p>
                </CardContent>
              </Card>
            </FadeInUp>
          )}

          {/* Logs Timeline */}
          <div className="space-y-4">
            {filteredLogs.map((log, logIndex) => {
              const isExpanded = expandedDates.has(log.date);
              const totalCalories = log.meals.reduce((sum, m) => sum + m.totalCalories, 0);
              const totalProtein = log.meals.reduce((sum, m) => sum + (m.totalProtein || 0), 0);
              const totalCarbs = log.meals.reduce((sum, m) => sum + (m.totalCarbs || 0), 0);
              const totalFats = log.meals.reduce((sum, m) => sum + (m.totalFats || 0), 0);

              return (
                <motion.div
                  key={log.date}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: logIndex * 0.05 + 0.2 }}
                >
                  <Card className="overflow-hidden">
                    {/* Date Header */}
                    <button
                      onClick={() => toggleDate(log.date)}
                      className="w-full"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                              <Calendar className="w-5 h-5" />
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-slate-900">
                                {format(new Date(log.date), "EEEE, MMM do")}
                              </h3>
                              <p className="text-xs text-slate-500">
                                {log.meals.length} meals logged
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="default">
                              <Flame className="w-3 h-3 mr-1" />
                              {totalCalories} kcal
                            </Badge>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                        </div>

                        {/* Macro Summary */}
                        <div className="flex items-center gap-4 mt-3 pl-[52px]">
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Dumbbell className="w-3 h-3 text-sky-500" />
                            {Math.round(totalProtein)}g
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Wheat className="w-3 h-3 text-amber-500" />
                            {Math.round(totalCarbs)}g
                          </span>
                          <span className="flex items-center gap-1 text-xs text-slate-500">
                            <Droplets className="w-3 h-3 text-rose-500" />
                            {Math.round(totalFats)}g
                          </span>
                        </div>
                      </CardContent>
                    </button>

                    {/* Expanded Meals */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-100">
                            {log.meals.map((meal, mealIndex) => (
                              <motion.div
                                key={`${log.date}-${mealIndex}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: mealIndex * 0.05 }}
                                className={cn(
                                  "px-5 py-4",
                                  mealIndex < log.meals.length - 1 && "border-b border-slate-50"
                                )}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                    <h4 className="font-medium text-slate-900 text-sm">
                                      {meal.meal}
                                    </h4>
                                    <span className="text-xs text-slate-400">{meal.time}</span>
                                  </div>
                                  <span className="text-sm font-semibold text-primary">
                                    {meal.totalCalories} kcal
                                  </span>
                                </div>
                                <div className="space-y-1.5 pl-5">
                                  {meal.items.map((item, itemIndex) => (
                                    <div
                                      key={itemIndex}
                                      className="flex items-center justify-between text-sm"
                                    >
                                      <span className="text-slate-600">{item.name}</span>
                                      <span className="text-slate-500 text-xs">
                                        {item.calories} kcal
                                      </span>
                                    </div>
                                  ))}
                                </div>
                                {(meal.totalProtein || meal.totalCarbs || meal.totalFats) && (
                                  <div className="mt-2 pl-5 flex gap-3 text-xs text-slate-400">
                                    {meal.totalProtein !== undefined && (
                                      <span className="flex items-center gap-1">
                                        <Dumbbell className="w-3 h-3 text-sky-400" />
                                        {Math.round(meal.totalProtein)}g P
                                      </span>
                                    )}
                                    {meal.totalCarbs !== undefined && (
                                      <span className="flex items-center gap-1">
                                        <Wheat className="w-3 h-3 text-amber-400" />
                                        {Math.round(meal.totalCarbs)}g C
                                      </span>
                                    )}
                                    {meal.totalFats !== undefined && (
                                      <span className="flex items-center gap-1">
                                        <Droplets className="w-3 h-3 text-rose-400" />
                                        {Math.round(meal.totalFats)}g F
                                      </span>
                                    )}
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
