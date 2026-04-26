# AI-Nutrition-App

![Project Demo](./Screenshot.png)

> An intelligent nutrition tracking application built with **Next.js 14**, featuring AI-powered meal analysis and personalized diet recommendations.

---

## Table of Contents
- [🚀 Tech Stack](#tech-stack)
- [✨ Features](#features)
- [📁 Project Structure](#project-structure)
- [🏁 Getting Started](#getting-started)
- [⚙️ Configuration](#configuration)
- [📊 Stats & Analytics](#stats--analytics)
- [🔧 Development Commands](#development-commands)
- [📋 API Reference](#api-reference)
- [🤝 Contributing](#contributing)
- [📄 License](#license)

---

## 🚀 Tech Stack

### **Development Stack**
| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14.2.3 |
| **Language** | TypeScript 5.x |
| **UI Runtime** | React 18.x |
| **Styling** | Tailwind CSS 3.4.1 |
| **Validation** | Zod 3.23.8 |

### **Core Dependencies**
- **React** - UI component library
- **Next.js** - React framework with SSR
- **date-fns** - Date manipulation utilities
- **clsx** - Conditional className utility
- **tailwind-merge** - Tailwind class merging

### **Development Tools**
- **ESLint** - Code linting
- **TypeScript** - Type safety
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## ✨ Features

### 🔵 Core Features

#### **AI-Powered Meal Analysis**
- **Gemini API Integration** - Intelligent nutrition insights using Google's Gemini AI
- **Mock AI Service** - Fallback service for development and testing without API keys
- **Natural Language Processing** - Parse food descriptions into nutritional data
- **Smart Recommendations** - AI-generated diet suggestions based on user goals

#### **User Onboarding**
- **Multi-step Intake Form** - 3-step onboarding process
  - Step 1: Basic profile (age, weight, height)
  - Step 2: Goal setting (weight loss, maintenance, muscle gain)
  - Step 3: Dietary preferences (vegetarian, vegan, etc.)
- **Health Condition Tracking** - Monitor dietary restrictions and health issues
- **Personalized Goals** - Custom calorie and macro targets

#### **Dashboard & Analytics**
- **Daily Calorie Tracking** - Real-time calorie consumption monitoring
- **Macro Nutrient Breakdown** - Proteins, Carbohydrates, Fats tracking
- **Visual Progress Indicators** - Charts and progress bars
- **Calorie Goal Comparison** - Actual vs target calorie intake

#### **Intake Tracking**
- **Meal Logging** - Log meals with complete nutritional data
- **Food Search** - Search and add food items from database
- **Portion Control** - Customizable serving sizes
- **Meal Categorization** - Breakfast, Lunch, Dinner, Snacks

---

### 🟢 UI Components

| Component | Description |
|-----------|-------------|
| **Accordion UI** | Collapsible content sections |
| **Badge UI** | Status and label indicators |
| **Button UI** | Primary and secondary actions |
| **Card UI** | Content containers |
| **Input UI** | Form input fields |
| **Label UI** | Form field labels |
| **Native Select UI** | Dropdown selectors |
| **Progress UI** | Progress indicators |
| **Radio Group UI** | Option selection |
| **Skeleton UI** | Loading placeholders |
| **Tabs UI** | Tabbed navigation |
| **AI Helper Component** | AI chat interface |

---

## 📁 Project Structure

```
AI-Nutrition-App/
├── app/
│   ├── components/
│   │   └── ui/                    # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── label.tsx
│   ├── context/
│   │   └── IntakeContext.tsx      # Global state management
│   ├── lib/
│   │   ├── constants.ts           # App constants & config
│   │   ├── types.ts               # TypeScript interfaces
│   │   ├── utils.ts               # Utility functions
│   │   ├── validation.ts          # Zod schemas
│   │   └── nutrition.ts           # Nutrition calculations
│   ├── services/
│   │   ├── gemini.ts              # Gemini AI API integration
│   │   ├── mockAi.ts              # Mock AI service
│   │   ├── nutritionApi.ts        # Nutrition data API
│   │   └── fetchWithRetry.ts     # API fetch utility
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── public/                        # Static assets
├── tailwind.config.ts             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
└── README.md                      # Project documentation
```

---

## 🏁 Getting Started

### ✅ Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Git** for version control
- **Gemini API Key** (optional - for AI features)

### 📥 Installation

```bash
# Clone the repository
git clone https://github.com/girishlade111/AI-Nutrition-App.git

# Navigate to project directory
cd AI-Nutrition-App

# Install dependencies
npm install

# OR using yarn
yarn install
```

### 🚀 Quick Start

```bash
# Start development server
npm run dev

# Open browser
# Visit: http://localhost:3000
```

---

## ⚙️ Configuration

### 🌍 Environment Variables

Create a `.env.local` file in the root directory:

```env
# ===========================================
# Gemini API Configuration (Optional)
# ===========================================

# Your Gemini API key from Google AI Studio
# Get it from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# ===========================================
# Application Settings
# ===========================================

# App name
NEXT_PUBLIC_APP_NAME=AI Nutrition App

# Default timezone
NEXT_PUBLIC_TIMEZONE=Asia/Kolkata
```

> **⚠️ Important**: The app works without `GEMINI_API_KEY` - it will use the Mock AI service instead for development.

### 🎨 Tailwind Configuration

The project includes **custom Tailwind configuration**:

- **Custom Color Palette** - Primary, secondary, and accent colors
- **Responsive Breakpoints** - Mobile, tablet, desktop
- **Custom Animations** - Fade, slide, pulse effects
- **Extended Utilities** - Custom spacing and typography

### 📘 TypeScript Configuration

- **Strict Mode** - Enabled for type safety
- **Path Aliases** - `@/*` maps to `app/*`
- **JSX Mode** - Preserved for Next.js compatibility
- **Module Resolution** - NodeNext

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

### 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### ⚡ Performance Optimizations

- ✅ **Server-Side Rendering** - Next.js 14 SSR
- ✅ **Code Splitting** - Automatic route-based splitting
- ✅ **Tailwind Pruning** - Remove unused styles
- ✅ **Image Optimization** - Next.js Image component
- ✅ **Bundle Analysis** - Optimized imports

---

## 🔧 Development Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run dev` | Start development server | `npm run dev` |
| `npm run build` | Build for production | `npm run build` |
| `npm run start` | Start production server | `npm run start` |
| `npm run lint` | Run ESLint checks | `npm run lint` |

### 📋 Available Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

---

## 📋 API Reference

### Services

| Service | Description |
|---------|-------------|
| **gemini.ts** | Gemini AI API client |
| **mockAi.ts** | Mock AI for development |
| **nutritionApi.ts** | Nutrition data fetching |
| **fetchWithRetry.ts** | HTTP client with retry logic |

### Context

| Context | Description |
|---------|-------------|
| **IntakeContext** | Global intake/meal tracking state |

### Utilities

| Utility | Description |
|---------|-------------|
| **nutrition.ts** | Calorie & macro calculations |
| **validation.ts** | Zod form validation schemas |
| **utils.ts** | General utility functions |
| **constants.ts** | App-wide constants |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Clone** your fork locally:
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

Please use GitHub Issues to report bugs. Include:
- Detailed description
- Steps to reproduce
- Expected vs actual behavior

---

## 📄 License

**MIT License** - See [LICENSE](LICENSE) file for details.

---

## 🙋‍♂️ Support

- 📧 Email: girishlade111@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/girishlade111/AI-Nutrition-App/issues)
- 📖 Documentation: [Wiki](https://github.com/girishlade111/AI-Nutrition-App/wiki)

---

**Built with ❤️ using Next.js 14 & Gemini AI** | [View on GitHub](https://github.com/girishlade111/AI-Nutrition-App)