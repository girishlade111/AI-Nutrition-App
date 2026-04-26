import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PAGES } from '@/app/lib/constants';
import { IntakeProvider } from '@/app/context/IntakeContext';
import { useIntake } from '@/app/context/IntakeContext';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male' as const,
    height: '',
    weight: '',
    goal: 'loss' as const,
    activity: 'sedentary' as const,
    dietType: 'veg' as const,
    allergies: [] as string[],
    cheatFoods: '',
    medicalConditions: ''
  });
  const [error, setError] = useState<string | null>(null);
  const { setIntakeData } = useIntake();
  const router = useRouter();

  const validateStep = (stepNumber: number): boolean => {
    setError(null);
    switch (stepNumber) {
      case 1:
        if (!formData.age || !formData.height || !formData.weight) {
          setError('Please fill in all basic profile fields');
          return false;
        }
        const ageNum = parseInt(formData.age);
        const heightNum = parseInt(formData.height);
        const weightNum = parseInt(formData.weight);
        if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
          setError('Please enter a valid age between 13 and 120');
          return false;
        }
        if (isNaN(heightNum) || heightNum < 100 || heightNum > 250) {
          setError('Please enter a valid height between 100 and 250 cm');
          return false;
        }
        if (isNaN(weightNum) || weightNum < 30 || weightNum > 300) {
          setError('Please enter a valid weight between 30 and 300 kg');
          return false;
        }
        return true;
      case 2:
        if (!formData.goal || !formData.activity) {
          setError('Please select goal and activity level');
          return false;
        }
        return true;
      case 3:
        if (!formData.dietType || formData.cheatFoods === undefined) {
          setError('Please select diet type and enter cheat foods');
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const handleFieldChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAllergyChange = (allergy: string, checked: boolean) => {
    setFormData(prev => {
      const allergies = [...prev.allergies];
      if (checked) {
        if (!allergies.includes(allergy)) allergies.push(allergy);
      } else {
        const index = allergies.indexOf(allergy);
        if (index > -1) allergies.splice(index, 1);
      }
      return { ...prev, allergies };
    });
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep(step + 1);
      } else {
        // Final step: validate and submit
        if (validateStep(3)) {
          setIntakeData(formData);
          router.push('/generating');
        }
      }
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
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
              {error && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
                  {error}
                </div>
              )}
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
                      value={formData.age}
                      onChange={(e) => handleFieldChange('age', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleFieldChange('gender', e.target.value as const)}
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
                      value={formData.height}
                      onChange={(e) => handleFieldChange('height', e.target.value)}
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
                      value={formData.weight}
                      onChange={(e) => handleFieldChange('weight', e.target.value)}
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
                    value={formData.goal}
                    onChange={(e) => handleFieldChange('goal', e.target.value as const)}
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
                    value={formData.activity}
                    onChange={(e) => handleFieldChange('activity', e.target.value as const)}
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
                    value={formData.dietType}
                    onChange={(e) => handleFieldChange('dietType', e.target.value as const)}
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
                              checked={formData.allergies.includes(allergy)}
                              onChange={(e) => handleAllergyChange(allergy, e.target.checked)}
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
                    value={formData.cheatFoods}
                    onChange={(e) => handleFieldChange('cheatFoods', e.target.value)}
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
                    value={formData.medicalConditions}
                    onChange={(e) => handleFieldChange('medicalConditions', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-10 flex justify-end space-x-3">
            {step > 1 && (
              <button
                onClick={handlePrevious}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={step === 1 && !validateStep(1) || step === 2 && !validateStep(2) || step === 3 && !validateStep(3)}
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