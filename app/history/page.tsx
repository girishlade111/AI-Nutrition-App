'use client';

import { useIntake } from '@/app/context/IntakeContext';
import { format } from 'date-fns';
import { Meal, MealItem } from '@/app/lib/types';

export default function HistoryPage() {
  const { state } = useIntake();
  const dailyLogs = state.dailyLogs;
  
  const logsByDate = [...dailyLogs].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Nutrition History
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              View your past meals and nutrition trends
            </p>
          </div>

          {/* Date Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  // Filter logic would go here in a real implementation
                }}
                className="px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200"
              >
                Last 7 Days
              </button>
              <button
                onClick={() => {
                  // Filter logic would go here in a real implementation
                }}
                className="px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200"
              >
                Last 30 Days
              </button>
              <button
                onClick={() => {
                  // Filter logic would go here in a real implementation
                }}
                className="px-3 py-1 bg-gray-100 text-sm rounded hover:bg-gray-200"
              >
                This Month
              </button>
            </div>
          </div>

          {/* Empty State */}
          {logsByDate.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500">
                No nutrition logs found. Start tracking your meals to see history here.
              </p>
            </div>
          )}

          {/* Logs List */}
          {logsByDate.length > 0 && (
            <div className="space-y-6">
              {logsByDate.map((log) => (
                <div key={log.date} className="border rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">
                        {format(new Date(log.date), 'PPP')}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {log.meals.length} meals
                      </span>
                    </div>
                  </div>
                  <div className="divide-y">
                    {log.meals.map((meal: Meal, index: number) => (
                      <div key={`${log.date}-${index}`} className="px-4 py-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-800">{meal.meal}</h4>
                            <p className="text-sm text-gray-500">{meal.time}</p>
                          </div>
                          <span className="text-sm font-semibold text-indigo-600">
                            {meal.totalCalories} kcal
                          </span>
                        </div>
                        <div className="mt-2 space-y-1 text-sm">
                          {meal.items.map((item: MealItem, itemIndex: number) => (
                            <div key={itemIndex} className="flex justify-between">
                              <span className="text-gray-600">{item.name}</span>
                              <span>{item.calories} kcal</span>
                            </div>
                          ))}
                        </div>
                        {meal.totalProtein !== undefined && (
                          <div className="mt-1 text-xs text-gray-500">
                            P: {meal.totalProtein}g • C: {meal.totalCarbs}g • F: {meal.totalFats}g
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}