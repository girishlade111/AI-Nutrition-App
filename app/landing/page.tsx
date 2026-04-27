"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  staggerContainer,
} from "@/app/components/animations";
import { Button } from "@/app/components/ui/button";
import {
  Leaf,
  Brain,
  Activity,
  Utensils,
  TrendingUp,
  Shield,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Plans",
    description:
      "Personalized nutrition recommendations powered by advanced AI, tailored to your body and goals.",
  },
  {
    icon: Utensils,
    title: "Regional Cuisine",
    description:
      "Designed for Maharashtra with authentic local foods, from Misal Pav to Puran Poli.",
  },
  {
    icon: Activity,
    title: "Real-time Tracking",
    description:
      "Track calories, macros, and micronutrients with an intuitive, enterprise-grade dashboard.",
  },
  {
    icon: TrendingUp,
    title: "Progress Insights",
    description:
      "Visual analytics and trends to help you understand and optimize your nutrition journey.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your health data stays on your device. No cloud storage, complete privacy control.",
  },
  {
    icon: Sparkles,
    title: "Smart Adaptation",
    description:
      "Plans adapt as you progress, accounting for cheat days, allergies, and preferences.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 gradient-bg" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative section-padding pt-20 pb-24 lg:pt-32 lg:pb-40">
          <div className="container-narrow text-center">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                AI Nutrition, Made for Maharashtra
              </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Eat smarter with{" "}
                <span className="gradient-text">Swaad AI</span>
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                An enterprise-grade nutrition platform that combines artificial
                intelligence with authentic Maharashtra cuisine to deliver
                personalized meal plans and real-time health tracking.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/onboarding">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Get Started
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Demo Dashboard
                  </Button>
                </Link>
              </div>
            </FadeInUp>

            {/* Stats bar */}
            <FadeInUp delay={0.4}>
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
                {[
                  { value: "10K+", label: "Users" },
                  { value: "50+", label: "Local Foods" },
                  { value: "99%", label: "Accuracy" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeInUp>
