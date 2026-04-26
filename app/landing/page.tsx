import { Link } from '@/components/ui/button';

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
        <div className="mt-10 space-x-4 space-x-6 lg:space-x-0 lg:flex">
          <Link
            href="/onboarding"
            className="w-full rounded-md bg-indigo-600 px-5 py-3 text-base font-medium text-white sm:w-auto lg:w-auto"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="w-full rounded-md border border-gray-300 px-5 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 sm:w-auto lg:w-auto"
          >
            View Demo
          </Link>
        </div>
      </div>
    </div>
  );
}