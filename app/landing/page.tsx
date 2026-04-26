'use client';

import Link from 'next/link';
import SocialIcons from '../components/social-icons';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Swaad AI
        </h1>
        <p className="text-lg leading-6 text-gray-600">
          AI Nutrition, Made for Maharashtra.
        </p>
        <div className="mt-10 space-x-4 space-y-4 lg:space-y-0 lg:flex lg:space-x-6">
          <Link
            href="/onboarding"
            className="w-full rounded-md bg-indigo-600 px-5 py-3 text-base font-medium text-white sm:w-auto lg:w-auto inline-block"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="w-full rounded-md bg-gray-100 px-5 py-3 text-base font-medium text-gray-700 sm:w-auto lg:w-auto inline-block"
          >
            View Demo
          </Link>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          Track your nutrition with AI-powered personalized meal plans
        </p>
        <SocialIcons />
      </div>
    </div>
  );
}