import { useIntake } from '@/app/context/IntakeContext';
import { useDailyProgress } from '@/app/context/IntakeContext';
import { format } from 'date-fns';

export default function DashboardPage() {
  const { intakeData, aiPlan } = useIntake();
  const { dailyProgress, setDailyProgress, logMeal } = useDailyProgress();

  if (!intakeData) {
    return <div>Loading...</div>;
  }

  if (!aiPlan) {
    return <div>Generating plan...</div>;
  }

  const today = format(new Date(), 'yyyy-MM-dd');
  const todayProgress = dailyProgress.find(p => p.date === today);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back!
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Here's your nutrition overview for {format(new Date(), 'PPP')}
            </p>
          </div>
          
          {/* Calorie Progress */}
          <div className="mb-8">
            <h2 className="sr-only">Calorie Progress</h2>
            <div className="bg-white rounded-lg shadow sm:rounded-md">
              <div className="px-4 py-5 sm:p-6">
                <div className="mb-4 flex justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Daily Calorie Goal
                  </h3>
                  <p className="text-lg font-semibold text-indigo-600">
                    {aiPlan.calorieTarget} kcal
                  </p>
                </div>
                
                {todayProgress && (
                  <>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-600">Consumed</span>
                      <span className="font-medium">{todayProgress.caloriesConsumed} kcal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`bg-indigo-600 h-2.5 rounded-full ${
                          todayProgress.caloriesConsumed >= aiPlan.calorieTarget
                            ? 'w-full'
                            : `w-[${(todayProgress.caloriesConsumed / aiPlan.calorieTarget) * 100}%]`
                        }`}
                      ></div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {todayProgress.caloriesConsumed >= aiPlan.calorieTarget
                        ? 'Goal exceeded!'
                        : `${aiPlan.calorieTarget - todayProgress.caloriesConsumed} kcal remaining`}
                    </p>
                  </>
                )}
                
                {!todayProgress && (
                  <p className="text-sm text-gray-500">
                    No meals logged yet today. Start tracking to see your progress.
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Macronutrients */}
          <div className="grid gap-6 mb-8">
            <div className="sm:grid-cols-2 lg:grid-cols-3">
              {/* Protein */}
              <div className="bg-white rounded-lg shadow sm:rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Protein
                  </h3>
                  <div className="text-base font-semibold text-indigo-600">
                    {todayProgress?.proteinConsumed ?? 0}g / {aiPlan.macros.protein.target}g
                  </div>
                  {todayProgress && (
                    <p className="mt-2 text-sm text-gray-500">
                      {Math.round((todayProgress.proteinConsumed / aiPlan.macros.protein.target) * 100)}% of goal
                    </p>
                  )}
                </div>
              </div>
              
              {/* Carbs */}
              <div className="bg-white rounded-lg shadow sm:rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Carbohydrates
                  </h3>
                  <div className="text-base font-semibold text-indigo-600">
                    {todayProgress?.carbsConsumed ?? 0}g / {aiPlan.macros.carbs.target}g
                  </div>
                  {todayProgress && (
                    <p className="mt-2 text-sm text-gray-500">
                      {Math.round((todayProgress.carbsConsumed / aiPlan.macros.carbs.target) * 100)}% of goal
                    </p>
                  )}
                </div>
              </div>
              
              {/* Fats */}
              <div className="bg-white rounded-lg shadow sm:rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Fats
                  </h3>
                  <div className="text-base font-semibold text-indigo-600">
                    {todayProgress?.fatsConsumed ?? 0}g / {aiPlan.macros.fats.target}g
                  </div>
                  {todayProgress && (
                    <p className="mt-2 text-sm text-gray-500">
                      {Math.round((todayProgress.fatsConsumed / aiPlan.macros.fats.target) * 100)}% of goal
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Today's Meal Plan */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Today's Meal Plan
            </h2>
            <div className="space-y-4">
              {aiPlan.dailyPlan.map((meal) => (
                <div key={meal.meal} className="bg-white rounded-lg shadow sm:rounded-md">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {meal.meal}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {meal.time}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-indigo-600">
                        {meal.totalCalories} kcal
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {meal.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name}</span>
                          <span className="font-medium">{item.calories} kcal</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <button
              onClick={() => {
                // Navigate to tracker
              }}
              className="w-full sm:w-auto flex-1 px-4 py-3 bg-indigo-600 text-sm font-medium text-white rounded-lg hover:bg-indigo-700"
            >
              Track Meals
            </button>
            <button
              onClick={() => {
                // Navigate to history
              }}
              className="w-full sm:w-auto flex-1 px-4 py-3 border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
            >
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}