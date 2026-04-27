"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useIntake, useDailyProgress } from "@/app/context/IntakeContext";
import { searchFoodNutrition } from "@/app/services/nutritionApi";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { FadeInUp } from "@/app/components/animations";
import { cn } from "@/app/lib/utils";
import {
  Search,
  X,
  Plus,
  Minus,
  Flame,
  Dumbbell,
  Wheat,
  Droplets,
  AlertCircle,
  ChevronLeft,
  Check,
} from "lucide-react";

export default function TrackerPage() {
  const { state } = useIntake();
  const { logMeal } = useDailyProgress();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [servingSize, setServingSize] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setSelectedFood(null);

    try {
      const nutritionData = await searchFoodNutrition(query);
      setResults(nutritionData.foods || []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to search for food. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFoodSelect = (food: any) => {
    setSelectedFood(food);
    setServingSize(1);
    setAddedSuccess(false);
  };

  const handleAddMeal = () => {
    if (!selectedFood || !servingSize) return;

    const nutritionPerServing = {
      calories: selectedFood.nf_calories,
      protein: selectedFood.nf_protein,
      carbs: selectedFood.nf_total_carbohydrate,
      fats: selectedFood.nf_total_fat,
    };

    const totalNutrition = {
      calories: Math.round(nutritionPerServing.calories * servingSize),
      protein: Math.round((nutritionPerServing.protein || 0) * servingSize * 10) / 10,
      carbs: Math.round((nutritionPerServing.carbs || 0) * servingSize * 10) / 10,
      fats: Math.round((nutritionPerServing.fats || 0) * servingSize * 10) / 10,
    };

    logMeal(selectedFood.food_name, totalNutrition);
    setAddedSuccess(true);

    setTimeout(() => {
      setSelectedFood(null);
      setServingSize(1);
      setQuery("");
      setResults([]);
      setAddedSuccess(false);
    }, 1500);
  };

  const handleCancel = () => {
    setSelectedFood(null);
    setServingSize(1);
    setResults([]);
    setAddedSuccess(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="section-padding py-8 lg:py-10">
        <div className="container-narrow max-w-2xl">
          {/* Header */}
          <FadeInUp>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                  Track Your Meals
                </h1>
                <p className="text-slate-500 mt-1">
                  Search for foods and log your daily nutrition
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            </div>
          </FadeInUp>

          {/* Search */}
          <FadeInUp delay={0.1}>
            <Card className="mb-6">
              <CardContent className="p-5">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search for a food (e.g., apple, chicken, rice)..."
                      className="input-enhanced pl-11 pr-10"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          setResults([]);
                          setSelectedFood(null);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={loading || !query.trim()}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Search className="w-4 h-4" />
                        </motion.div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Search Foods
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeInUp>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {results.length > 0 && !selectedFood && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-slate-900">Search Results</h2>
                  <Badge variant="secondary">{results.length} found</Badge>
                </div>
                <div className="space-y-2">
                  {results.map((food: any, i: number) => (
                    <motion.div
                      key={`${food.food_name}-${food.nf_calories}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card
                        hover
                        onClick={() => handleFoodSelect(food)}
                        className="cursor-pointer"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-slate-900 text-sm">
                                {food.food_name}
                              </h3>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {food.serving_qty} {food.serving_unit}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-semibold text-primary">
                                {Math.round(food.nf_calories)} kcal
                              </span>
                              <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                                <span className="flex items-center gap-0.5">
                                  <Dumbbell className="w-3 h-3 text-sky-500" />
                                  {Math.round(food.nf_protein)}g
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <Wheat className="w-3 h-3 text-amber-500" />
                                  {Math.round(food.nf_total_carbohydrate)}g
                                </span>
                                <span className="flex items-center gap-0.5">
                                  <Droplets className="w-3 h-3 text-rose-500" />
                                  {Math.round(food.nf_total_fat)}g
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Food Selection Form */}
          <AnimatePresence>
            {selectedFood && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="overflow-hidden border-primary/20 shadow-glow">
                  <CardContent className="p-6">
                    {addedSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-8"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", duration: 0.5 }}
                          className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4"
                        >
                          <Check className="w-8 h-8" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                          Meal Added!
                        </h3>
                        <p className="text-sm text-slate-500">
                          {selectedFood.food_name} has been logged to your daily intake.
                        </p>
                      </motion.div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="font-semibold text-slate-900">
                              {selectedFood.food_name}
                            </h3>
                            <p className="text-sm text-slate-500">
                              {selectedFood.serving_qty} {selectedFood.serving_unit} per serving
                            </p>
                          </div>
                          <Badge variant="default">
                            <Flame className="w-3 h-3 mr-1" />
                            {Math.round(selectedFood.nf_calories)} kcal
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                          <div className="text-center p-3 bg-sky-50 rounded-lg">
                            <Dumbbell className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                            <div className="text-sm font-semibold text-slate-900">
                              {Math.round(selectedFood.nf_protein)}g
                            </div>
                            <div className="text-xs text-slate-500">Protein</div>
                          </div>
                          <div className="text-center p-3 bg-amber-50 rounded-lg">
                            <Wheat className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                            <div className="text-sm font-semibold text-slate-900">
                              {Math.round(selectedFood.nf_total_carbohydrate)}g
                            </div>
                            <div className="text-xs text-slate-500">Carbs</div>
                          </div>
                          <div className="text-center p-3 bg-rose-50 rounded-lg">
                            <Droplets className="w-4 h-4 text-rose-600 mx-auto mb-1" />
                            <div className="text-sm font-semibold text-slate-900">
                              {Math.round(selectedFood.nf_total_fat)}g
                            </div>
                            <div className="text-xs text-slate-500">Fats</div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <label className="text-sm font-medium text-slate-700">
                            Number of servings
                          </label>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setServingSize(Math.max(0.1, servingSize - 0.5))}
                              className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <input
                              type="number"
                              min="0.1"
                              step="0.1"
                              value={servingSize}
                              onChange={(e) => setServingSize(parseFloat(e.target.value) || 1)}
                              className="input-enhanced text-center flex-1"
                            />
                            <button
                              onClick={() => setServingSize(servingSize + 0.5)}
                              className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-slate-500 text-center">
                            Total:{" "}
                            <span className="font-semibold text-slate-900">
                              {Math.round(selectedFood.nf_calories * servingSize)} kcal
                            </span>
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <Button variant="outline" className="flex-1" onClick={handleCancel}>
                            Cancel
                          </Button>
                          <Button
                            className="flex-1"
                            onClick={handleAddMeal}
                            disabled={!servingSize || servingSize <= 0}
                          >
                            <Plus className="w-4 h-4" />
                            Add to Log
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
