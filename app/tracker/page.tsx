import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIntake, useDailyProgress } from '@/app/context/IntakeContext';
import { searchFoodNutrition } from '@/app/services/nutritionApi';

export default function TrackerPage() {
  const { state } = useIntake();
  const { logMeal } = useDailyProgress();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [servingSize, setServingSize] = useState(1);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const nutritionData = await searchFoodNutrition(query);
      setResults(nutritionData.foods || []);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search for food. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFoodSelect = (food: any) => {
    setSelectedFood(food);
    setServingSize(1);
  };

  const handleServingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServingSize(parseFloat(e.target.value) || 1);
  };

  const handleAddMeal = () => {
    if (!selectedFood || !servingSize) return;

    const nutritionPerServing = {
      calories: selectedFood.nf_calories,
      protein: selectedFood.nf_protein,
      carbs: selectedFood.nf_total_carbohydrate,
      fats: selectedFood.nf_total_fat
    };

    const totalNutrition = {
      calories: Math.round(nutritionPerServing.calories * servingSize),
      protein: Math.round((nutritionPerServing.protein || 0) * servingSize * 10) / 10,
      carbs: Math.round((nutritionPerServing.carbs || 0) * servingSize * 10) / 10,
      fats: Math.round((nutritionPerServing.fats || 0) * servingSize * 10) / 10
    };

    logMeal(selectedFood.food_name, totalNutrition);

    setSelectedFood(null);
    setServingSize(1);
    setQuery('');
    setResults([]);
  };

  const handleCancel = () => {
    setSelectedFood(null);
    setServingSize(1);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Track Your Meals
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Search for foods and log your meals to track daily nutrition
            </p>
          </div>

          {/* Search Form */}
          <div className="mb-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search for a food
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., apple, chicken breast, brown rice"
                    className="w-full px-4 py-3 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 00-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-sm font-medium text-white rounded-md hover:bg-indigo-700"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Search Results
              </h2>
              <div className="space-y-3">
                {results.map((food: any) => (
                  <div
                    key={`${food.food_name}-${food.nf_calories}`}
                    onClick={() => handleFoodSelect(food)}
                    className={`cursor-pointer p-4 border rounded-md hover:bg-gray-50 ${selectedFood && selectedFood.food_name === food.food_name ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{food.food_name}</h3>
                        <p className="text-sm text-gray-500">
                          {food.serving_qty} {food.serving_unit} • 
                          {Math.round(food.nf_calories)} kcal
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm font-medium text-indigo-600">
                          {Math.round(food.nf_protein)}g P • 
                          {Math.round(food.nf_total_carbohydrate)}g C • 
                          {Math.round(food.nf_total_fat)}g F
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Food Selection Form */}
          {selectedFood && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Add "{selectedFood.food_name}" to your log
              </div>
              <div className="bg-white rounded-lg shadow sm:rounded-md p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    Serving size: {selectedFood.serving_qty} {selectedFood.serving_unit}
                  </p>
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of servings
                    </label>
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={servingSize}
                      onChange={handleServingChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Total: {Math.round(selectedFood.nf_calories * servingSize)} kcal
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMeal}
                    disabled={!servingSize || servingSize <= 0}
                    className="px-5 py-2 rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Add Meal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-10 flex justify-end space-x-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}