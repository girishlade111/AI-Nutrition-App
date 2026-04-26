# 🍎 Swaad AI - AI Nutrition App for Maharashtra

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)


</div>

> An intelligent nutrition tracking application built with **Next.js 14**, featuring AI-powered meal analysis and personalized diet recommendations tailored for **Maharashtra** and **Indian regional cuisine**.

---

## 📋 Table of Contents

- [🚀 Tech Stack](#tech-stack)
- [✨ Features](#features)
- [📁 Project Structure](#project-structure)
- [🏁 Getting Started](#getting-started)
- [⚙️ Configuration](#configuration)
- [📊 Stats & Analytics](#stats--analytics)
- [🔧 Development Commands](#development-commands)
- [📋 API Reference](#api-reference)
- [🧮 Nutritional Science Logic](#nutritional-science-logic)
- [🔍 SEO Optimization](#seo-optimization)
- [🤝 Contributing](#contributing)
- [📄 License](#license)

---

## 🚀 Tech Stack

### **Framework & Language** 🔹
| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14.2.3 (App Router) |
| **Language** | TypeScript 5.x |
| **UI Runtime** | React 18.x |
| **Styling** | Tailwind CSS 3.4.1 |
| **Validation** | Zod 3.23.8 |

### **Core Dependencies** ⭐
| Package | Purpose |
|---------|---------|
| `react` | UI component library |
| `next` | React framework with SSR/SSG |
| `date-fns` | Date manipulation utilities |
| `clsx` | Conditional className utility |
| `tailwind-merge` | Tailwind class merging |
| `zod` | Schema validation |

### **Development Tools** 🛠️
| Tool | Purpose |
|------|---------|
| `ESLint` | Code linting & best practices |
| `TypeScript` | Type safety & IntelliSense |
| `PostCSS` | CSS processing |
| `Autoprefixer` | CSS vendor prefixes |

---

## ✨ Features

### 🔵 Core Features

#### 🤖 **AI-Powered Meal Analysis**
- ✨ **Gemini API Integration** - Intelligent nutrition insights using Google's Gemini AI
- ✨ **Mock AI Service** - Fallback service for development without API keys
- ✨ **Natural Language Processing** - Parse food descriptions into nutritional data
- ✨ **Smart Recommendations** - AI-generated diet suggestions based on user goals
- ✨ **Evidence-Based Advice** - Nutrition advice formatted as structured JSON

#### 👤 **User Onboarding** (3-Step Process)
- **Step 1: Basic Profile**
  - Age, Gender, Height (cm), Weight (kg)
  - BMI calculation with category classification
- **Step 2: Goal Setting**
  - Goals: Weight Loss | Maintenance | Muscle Gain
  - Activity Levels: Sedentary → Extra Active
- **Step 3: Dietary Preferences**
  - Diet Types: Vegetarian, Non-Veg, Vegan, Jain, Maharashtrian
  - Allergies: Dairy, Gluten, Nuts, Soy, Shellfish, etc.
  - Favorite cheat foods for moderation tips

#### 📊 **Dashboard & Analytics**
- ⭐ **Daily Calorie Tracking** - Real-time consumption monitoring
- ⭐ **Macro Nutrient Breakdown** - Protein, Carbs, Fats tracking
- ⭐ **Visual Progress Bars** - CSS-based animated progress indicators
- ⭐ **Calorie Goal Comparison** - Consumed vs Target with percentage
- ⭐ **Today's Meal Plan** - AI-generated meal suggestions

#### 🍽️ **Intake Tracking**
- 📌 **Meal Logging** - Log meals with complete nutritional data
- 📌 **Food Search** - Search from built-in Indian food database (500+ items)
- 📌 **Portion Control** - Customizable serving sizes (0.1 - 50 servings)
- 📌 **Meal Categorization** - Breakfast, Lunch, Snack, Dinner
- 📌 **Daily History** - View past meals organized by date

#### 🔗 **Social Media Integration**
- 🌐 **Instagram** - [girish_lade_](https://www.instagram.com/girish_lade_/)
- 💼 **LinkedIn** - [girish-lade-075bba201](https://www.linkedin.com/in/girish-lade-075bba201/)
- 💻 **GitHub** - [girishlade111](https://github.com/girishlade111)
- ✏️ **CodePen** - [Girish-Lade-the-looper](https://codepen.io/Girish-Lade-the-looper)
- 📧 **Email** - [admin@ladestack.in](mailto:admin@ladestack.in)
- 🌍 **Website** - [ladestack.in](https://ladestack.in)

---

### 🟢 UI Components

| Component | Status | Description |
|-----------|--------|-------------|
| **Button** | ✅ | Primary and secondary action buttons |
| **Card** | ✅ | Content containers with shadows |
| **Input** | ✅ | Form input fields with focus states |
| **Label** | ✅ | Form field labels |
| **Badge** | ✅ | Status and label indicators |
| **Accordion** | ✅ | Collapsible content sections |
| **Progress** | ✅ | Progress bar indicators |
| **Tabs** | ✅ | Tabbed navigation |
| **Radio Group** | ✅ | Option selection |
| **Skeleton** | ✅ | Loading placeholders |
| **Select** | ✅ | Native dropdown selectors |

---

## 📁 Project Structure

```
AI-Nutrition-App/
├── app/
│   ├── components/
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── button.tsx            # Button component
│   │   │   ├── card.tsx             # Card component
│   │   │   ├── input.tsx            # Input component
│   │   │   └── label.tsx            # Label component
│   │   └── social-icons.tsx         # Social media links
│   ├── context/
│   │   └── IntakeContext.tsx        # Global state (React Context API)
│   ├── lib/
│   │   ├── constants.ts             # App constants, diet types, activity levels
│   │   ├── types.ts                 # TypeScript interfaces (IntakeData, AiPlan, etc.)
│   │   ├── utils.ts                 # Utility functions (formatDate, storage, etc.)
│   │   ├── validation.ts            # Zod validation schemas
│   │   ├── nutrition.ts             # BMR, TDEE, macro calculations
│   │   └── errors.ts                # Custom error classes
│   ├── services/
│   │   ├── gemini.ts                # Gemini AI API integration
│   │   ├── mockAi.ts                # Mock AI service for fallback
│   │   ├── aiPlan.ts                # AI meal plan generation
│   │   ├── nutritionApi.ts          # Nutrition data search (500+ Indian foods)
│   │   └── fetchWithRetry.ts        # HTTP client with retry logic
│   ├── dashboard/
│   │   └── page.tsx                 # Main dashboard with progress tracking
│   ├── tracker/
│   │   └── page.tsx                 # Food search and meal logging
│   ├── history/
│   │   └── page.tsx                 # Historical meal logs
│   ├── onboarding/
│   │   └── page.tsx                 # 3-step user onboarding form
│   ├── generating/
│   │   └── page.tsx                 # AI plan generation loading screen
│   ├── landing/
│   │   └── page.tsx                 # Landing/welcome page
│   ├── globals.css                  # Global Tailwind styles
│   ├── layout.tsx                   # Root layout with providers
│   ├── page.tsx                     # Entry point
│   └── sitemap.ts                   # Dynamic sitemap.xml
├── public/
│   ├── robots.txt                   # SEO robots.txt
│   └── og-image.png                 # Open Graph image
├── tailwind.config.ts              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies
├── .gitignore                      # Git ignore rules
└── README.md                       # Project documentation
```

---

## 🏁 Getting Started

### ✅ Prerequisites

| Requirement | Version | Notes |
|-------------|---------|-------|
| **Node.js** | 18.x or higher | LTS recommended |
| **npm** | 9.x+ | Comes with Node.js |
| **Git** | 2.x+ | For version control |
| **Gemini API Key** | Optional | For AI features |

### 📥 Installation

```bash
# 1. Clone the repository
git clone https://github.com/girishlade111/AI-Nutrition-App.git

# 2. Navigate to project directory
cd AI-Nutrition-App

# 3. Install dependencies
npm install

# OR using yarn
yarn install
```

### 🚀 Quick Start

```bash
# Start development server
npm run dev

# Open browser and visit:
http://localhost:3000
```

### 🔨 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm run start

# Run linting checks
npm run lint
```

---

## ⚙️ Configuration

### 🌍 Environment Variables

Create a `.env.local` file in the root directory:

```env
# ===========================================
# Gemini API Configuration (Optional)
# ===========================================
# Get your API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# ===========================================
# Nutritionix API (Optional)
# ===========================================
NEXT_PUBLIC_NUTRITIONIX_APP_ID=your_app_id
NEXT_PUBLIC_NUTRITIONIX_API_KEY=your_api_key

# ===========================================
# Application Settings
# ===========================================
NEXT_PUBLIC_APP_NAME=Swaad AI
NEXT_PUBLIC_TIMEZONE=Asia/Kolkata
```

> **⚠️ Important**: The app works **without** `GEMINI_API_KEY` - it uses the Mock AI service as fallback.

### 🎨 Tailwind Configuration

The project uses **custom Tailwind configuration** with:

- ✅ **Custom Color Palette** - Indigo primary, gray neutrals
- ✅ **Responsive Breakpoints** - sm, md, lg, xl, 2xl
- ✅ **Custom Animations** - spin, fade utilities
- ✅ **Extended Utilities** - Custom spacing, typography

### 📘 TypeScript Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 📊 Stats & Analytics

### 📦 Build Statistics

| Metric | Value |
|--------|-------|
| **Total Dependencies** | 14 packages |
| **Production Dependencies** | 6 packages |
| **Development Dependencies** | 8 packages |
| **Node Version** | 18.x+ |
| **Next.js Version** | 14.2.3 |

### 🗂️ Code Statistics

| Category | Files | Lines |
|----------|-------|-------|
| TypeScript | 22 | ~3,000 |
| Components | 12 | ~1,500 |
| Services | 5 | ~1,200 |
| Utilities | 5 | ~800 |

### 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |

### ⚡ Performance Optimizations

- ✅ **Server-Side Rendering** - Next.js 14 SSR for SEO
- ✅ **Code Splitting** - Automatic route-based splitting
- ✅ **Tailwind Pruning** - Removes unused CSS
- ✅ **Image Optimization** - Next.js Image component
- ✅ **Bundle Optimization** - Tree shaking enabled
- ✅ **SEO Optimized** - Meta tags, Open Graph, sitemap, robots.txt

---

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |

---

## 📋 API Reference

### Services Layer

| File | Function | Description |
|------|----------|-------------|
| `gemini.ts` | `callGemini()` | Make requests to Gemini AI API |
| `mockAi.ts` | `getMockResponse()` | Generate mock AI responses |
| `aiPlan.ts` | `generateAiPlan()` | Create personalized meal plans |
| `nutritionApi.ts` | `searchFoodNutrition()` | Search food nutrition data |
| `fetchWithRetry.ts` | `fetchWithRetry()` | HTTP requests with retry logic |

### Context API

| Context | Provider | Description |
|---------|-----------|-------------|
| `IntakeContext` | `IntakeProvider` | Global state for user data, AI plan, daily logs |

### Utility Functions

| File | Functions |
|------|------------|
| `nutrition.ts` | `calculateBMR()`, `calculateTDEE()`, `calculateCalorieTarget()`, `calculateMacroTargets()`, `generateAlgorithmicMealPlan()` |
| `validation.ts` | `intakeStep1Schema`, `intakeStep2Schema`, `intakeStep3Schema`, `validateInput()` |
| `utils.ts` | `cn()`, `storage`, `formatDate()`, `calculatePercentage()`, `unitConversions` |
| `constants.ts` | `DIET_TYPES`, `ACTIVITY_LEVELS`, `GOALS`, `MACRO_RATIOS`, `LOCAL_STORAGE_KEYS` |

---

## 🧮 Nutritional Science Logic

### 🔬 BMR Calculation (Mifflin-St Jeor Equation)
```
For Males:   BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
For Females: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
```

### 📈 TDEE Calculation
```
TDEE = BMR × Activity Multiplier
- Sedentary: 1.2
- Light: 1.375
- Moderate: 1.55
- Very Active: 1.725
- Extra Active: 1.9
```

### 🎯 Calorie Targets
```
Weight Loss:    TDEE - 500 kcal
Maintenance:    TDEE + 0 kcal
Weight Gain:    TDEE + 300 kcal
```

### 🥗 Macro Ratios
```
Weight Loss:    Protein 35% | Carbs 35% | Fats 30%
Maintenance:    Protein 30% | Carbs 40% | Fats 30%
Weight Gain:    Protein 30% | Carbs 45% | Fats 25%
```

---

## 🔍 SEO Optimization

### ✅ Implemented SEO Features

- ✅ **Meta Tags** - Long and short form meta descriptions
- ✅ **Open Graph** - Social media preview images and cards
- ✅ **Twitter Cards** - Twitter preview functionality
- ✅ **Robots.txt** - Allows all crawlers
- ✅ **Sitemap.xml** - Auto-generated for all routes
- ✅ **Canonical URLs** - Prevents duplicate content
- ✅ **Structured Data** - Schema markup ready
- ✅ **Semantic HTML** - Proper heading hierarchy

### 📄 Sitemap Pages

| Route | Priority | Change Frequency |
|-------|----------|------------------|
| `/` | 1.0 | weekly |
| `/landing` | 0.8 | weekly |
| `/onboarding` | 0.6 | monthly |
| `/dashboard` | 0.9 | daily |
| `/tracker` | 0.9 | daily |
| `/history` | 0.7 | weekly |
| `/generating` | 0.5 | monthly |

---

## 🤝 Contributing

We welcome contributions! Here's how to help:

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/girishlade111/AI-Nutrition-App.git
   ```
3. **Create** a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make** your changes and commit:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push** to your branch:
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open** a Pull Request

### 🐛 Bug Reports

Please use GitHub Issues with:
- Detailed description
- Steps to reproduce
- Expected vs actual behavior

---

## 📄 License

**MIT License** - See [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Support

- 📧 **Email**: [girishlade111@gmail.com](mailto:girishlade111@gmail.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/girishlade111/AI-Nutrition-App/issues)
- 📖 **Wiki**: [Wiki](https://github.com/girishlade111/AI-Nutrition-App/wiki)

---

<div align="center">

**Built with ❤️ using Next.js 14, React 18 & Gemini AI**

🔗 [View on GitHub](https://github.com/girishlade111/AI-Nutrition-App) |
🔗 [Live Demo](https://swaad-ai.vercel.app) |
🔗 [Documentation](https://github.com/girishlade111/AI-Nutrition-App/wiki)

</div>
