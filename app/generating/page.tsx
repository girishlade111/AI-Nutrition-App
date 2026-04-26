'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIntake } from '@/app/context/IntakeContext';
import { generateAiPlan } from '@/app/services/aiPlan';
import { generateAlgorithmicMealPlan } from '@/app/lib/nutrition';

export default function GeneratingPage() {
  const { state, setAiPlan } = useIntake();
  const intakeData = state.intakeData;
  const router = useRouter();

  useEffect(() => {
    let isCancelled = false;

    async function generatePlan() {
      try {
        const aiPlan = await generateAiPlan(intakeData);
        if (!isCancelled) {
          setAiPlan(aiPlan);
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Failed to generate AI plan:', error);
        try {
          const algorithmicPlan = generateAlgorithmicMealPlan(intakeData);
          if (!isCancelled) {
            setAiPlan(algorithmicPlan);
            router.push('/dashboard');
          }
        } catch (fallbackError) {
          console.error('Failed to generate fallback plan:', fallbackError);
          if (!isCancelled) {
            router.push('/dashboard');
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Generating your personalized plan...
        </h2>
        <p className="text-lg leading-6 text-gray-600">
          This may take a moment as we analyze your profile and create
          a tailored nutrition plan just for you.
        </p>
        <div className="flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600"></div>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Creating your meal plan with AI-powered insights
        </p>
      </div>
    </div>
  );
}