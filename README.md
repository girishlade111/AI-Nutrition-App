# AI-Nutrition-App

![Project Demo](./Screenshot.png)

> An intelligent nutrition tracking application built with **Next.js 14**, featuring AI-powered meal analysis and personalized diet recommendations.

---

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Stats & Analytics](#stats--analytics)

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14.2.3 |
| **Language** | TypeScript |
| **UI Runtime** | React 18 |
| **Styling** | Tailwind CSS 3.4.1 |
| **Validation** | Zod 3.23.8 |
| **Utilities** | clsx, tailwind-merge, date-fns |
| **Linting** | ESLint + eslint-config-next |

---

## Features

### Core Features
- **AI-Powered Meal Analysis**
  - Gemini API integration for intelligent nutrition insights
  - Mock AI service for development and testing
  - Natural language processing for food descriptions

- **User Onboarding**
  - Multi-step intake form (3 steps)
  - Goal setting (weight loss, maintenance, muscle gain)
  - Dietary preference collection (vegetarian, vegan, etc.)
  - Health condition tracking

- **Dashboard**
  - Daily calorie tracking
  - Macro nutrient breakdown (proteins, carbs, fats)
  - Visual progress indicators
  - Calorie goal comparison

- **Intake Tracking**
  - Log meals with nutritional data
  - Search and add food items
  - Portion size customization
  - Meal type categorization (breakfast, lunch, dinner, snacks)

### UI Components
- Accordion UI
- Badge UI
- Button UI
- Card UI
- Input UI
- Label UI
- Native Select UI
- Progress UI
- Radio Group UI
- Skeleton UI
- Tabs UI
- AI Helper Component

---

## Project Structure

```
AI-Nutrition-App/
├── app/
│   ├── globals.css              # Global styles
│   ├── lib/
│   │   ├── constants.ts       # App constants
│   │   ├── types.ts          # TypeScript types
│   │   ├── utils.ts          # Utility functions
│   │   └── validation.ts     # Zod validation schemas
│   ├── services/
│   │   └── gemini.ts         # Gemini API service
│   ├── (page components...)
├── public/
├── tailwind.config.ts        # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json            # Dependencies
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/girishlade111/AI-Nutrition-App.git
cd AI-Nutrition-App

# Install dependencies
npm install
```

### Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Gemini API (optional - uses mock service if not provided)
GEMINI_API_KEY=your_api_key_here
```

### Tailwind Configuration
The project uses custom Tailwind configuration with:
- Custom color palette
- Responsive design breakpoints
- Custom animation utilities

### TypeScript Configuration
- Strict mode enabled
- Path aliases configured (@/*)
- JSX preserved mode

---

## Stats & Analytics

### Build Stats
- **Total Dependencies**: 14 packages
- **Production Dependencies**: 6 packages
- **Development Dependencies**: 8 packages

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ syntax support

### Performance
- Server-side rendering with Next.js 14
- Optimized Tailwind CSS (content pruning)
- Code splitting enabled

---

## Development Status

> **Current Version**: 1.0.0

### Completed Pages
- [x] Landing Page
- [x] Loading Page
- [x] Onboarding Page (3 steps)
- [x] Main Dashboard
- [x] Intake Form Pages

### API Integrations
- [x] Gemini AI API (production)
- [x] Mock AI Service (development)

---

## License

MIT License - See LICENSE file for details

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with Next.js 14 & AI** | [View on GitHub](https://github.com/girishlade111/AI-Nutrition-App)