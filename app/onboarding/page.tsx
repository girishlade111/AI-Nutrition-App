import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PAGES } from '@/app/lib/constants';
import { IntakeProvider } from '@/app/context/IntakeContext';
import { useIntake } from '@/app/context/IntakeContext';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const { setIntakeData } = useIntake();
  const router = useRouter();

  const handleComplete = (data: any) => {
    setIntakeData(data);
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Navigate to generating page
      router.push('/generating');
    }
  };

  return (
    <IntakeProvider>
      <div className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Let's personalize your nutrition plan
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Step {step} of 3
              </p>
            </div>
            
            {/* Step 1: Basic Profile */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      min="13"
                      max="120"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      min="100"
                      max="250"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      min="30"
                      max="300"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Goals & Activity */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Goal
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="loss">Weight Loss</option>
                    <option value="maintain">Weight Maintenance</option>
                    <option value="gain">Weight Gain</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Activity Level
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="sedentary">Sedentary (little to no exercise)</option>
                    <option value="light">Lightly Active (light exercise 1-3 days/week)</option>
                    <option value="moderate">Moderately Active (moderate exercise 3-5 days/week)</option>
                    <option value="very">Very Active (hard exercise 6-7 days/week)</option>
                    <option value="extra">Extra Active (very hard exercise, physical job)</option>
                  </select>
                </div>
              </div>
            )}
            
            {/* Step 3: Dietary Preferences */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diet Type
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="jain">Jain</option>
                    <option value="maharashtrian">Maharashtrian Specific</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Allergies (select all that apply)
                  </label>
                  <div className="space-y-2">
                    {[ "Dairy", "Gluten", "Nuts", "Soy", "Shellfish", "Peanuts", "Eggs", "Fish" ].map(
                      (allergy) => (
                        <div key={allergy} className="flex items-start">
                          <div className="flex-shrink-0 h-5 w-5">
                            <input
                              type="checkbox"
                              value={allergy}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3">
                            <label className="text-sm font-medium text-gray-700">{allergy}</label>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Favorite Cheat Foods (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., misal pav, vada pav, biryani"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Conditions (optional)
                  </label>
                  <textarea
                    rows="3"
                    placeholder="e.g., diabetes, hypertension, thyroid"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-10 flex justify-end space-x-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            <button
              onClick={() => {
                // In a real app, we would collect form data here
                // For now, we'll simulate with dummy data
                const dummyData = {
                  age: "25",
                  gender: "male" as const,
                  height: "170",
                  weight: "70",
                  goal: "loss" as const,
                  activity: "moderate" as const,
                  dietType: "veg" as const,
                  allergies: [],
                  cheatFoods: "misal pav",
                  medicalConditions: ""
                };
                handleComplete(dummyData);
              }}
              className="px-5 py-2 rounded-md bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {step === 3 ? 'Get My Plan' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </IntakeProvider>
  );
}