'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  IntakeData, 
  AiPlan, 
  DailyLog, 
  DailyProgress,
  LOCAL_STORAGE_KEYS
} from '@/lib/types';

// Define the state shape
interface IntakeState {
  intakeData: IntakeData | null;
  aiPlan: AiPlan | null;
  dailyLogs: DailyLog[];
  dailyProgress: DailyProgress[];
  loading: boolean;
  error: string | null;
}

// Define action types
type IntakeAction =
  | { type: 'SET_INTAKE_DATA'; payload: IntakeData }
  | { type: 'SET_AI_PLAN'; payload: AiPlan }
  | { type: 'ADD_DAILY_LOG'; payload: DailyLog }
  | { type: 'SET_DAILY_LOGS'; payload: DailyLog[] }
  | { type: 'ADD_DAILY_PROGRESS'; payload: DailyProgress }
  | { type: 'SET_DAILY_PROGRESS'; payload: DailyProgress[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ALL' };

// Initial state from localStorage or defaults
const getInitialState = (): IntakeState => {
  try {
    const intakeData = localStorage.getItem(LOCAL_STORAGE_KEYS.INTAKE_DATA);
    const aiPlan = localStorage.getItem(LOCAL_STORAGE_KEYS.AI_PLAN);
    const dailyLogs = localStorage.getItem(LOCAL_STORAGE_KEYS.DAILY_LOGS);
    const userProfile = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_PROFILE);

    return {
      intakeData: intakeData ? JSON.parse(intakeData) : null,
      aiPlan: aiPlan ? JSON.parse(aiPlan) : null,
      dailyLogs: dailyLogs ? JSON.parse(dailyLogs) : [],
      dailyProgress: [], // We'll compute this from dailyLogs or leave empty for now
      loading: false,
      error: null,
    };
  } catch (e) {
    console.error('Failed to parse initial state from localStorage', e);
    return {
      intakeData: null,
      aiPlan: null,
      dailyLogs: [],
      dailyProgress: [],
      loading: false,
      error: null,
    };
  }
};

// Reducer function
const intakeReducer = (state: IntakeState, action: IntakeAction): IntakeState => {
  switch (action.type) {
    case 'SET_INTAKE_DATA':
      return {
        ...state,
        intakeData: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_AI_PLAN':
      return {
        ...state,
        aiPlan: action.payload,
        loading: false,
        error: null,
      };
    case 'ADD_DAILY_LOG':
      const newLogs = [...state.dailyLogs, action.payload];
      return {
        ...state,
        dailyLogs: newLogs,
        loading: false,
        error: null,
      };
    case 'SET_DAILY_LOGS':
      return {
        ...state,
        dailyLogs: action.payload,
        loading: false,
        error: null,
      };
    case 'ADD_DAILY_PROGRESS':
      const newProgress = [...state.dailyProgress, action.payload];
      return {
        ...state,
        dailyProgress: newProgress,
        loading: false,
        error: null,
      };
    case 'SET_DAILY_PROGRESS':
      return {
        ...state,
        dailyProgress: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case 'CLEAR_ALL':
      return {
        intakeData: null,
        aiPlan: null,
        dailyLogs: [],
        dailyProgress: [],
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const IntakeContext = createContext<{
  state: IntakeState;
  dispatch: React.Dispatch<IntakeAction>;
} | undefined>(undefined);

// Provider component
export const IntakeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(intakeReducer, getInitialState());

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.INTAKE_DATA,
        JSON.stringify(state.intakeData)
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.AI_PLAN,
        JSON.stringify(state.aiPlan)
      );
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.DAILY_LOGS,
        JSON.stringify(state.dailyLogs)
      );
      // Note: We don't persist dailyProgress as it can be recomputed from logs if needed
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [state.intakeData, state.aiPlan, state.dailyLogs]);

  return (
    <IntakeContext.Provider value={{ state, dispatch }}>
      {children}
    </IntakeContext.Provider>
  );
};

// Custom hook to use the intake context
export const useIntake = () => {
  const context = useContext(IntakeContext);
  if (!context) {
    throw new Error('useIntake must be used within an IntakeProvider');
  }
  return context;
};

// Custom hook for daily progress functionality
export const useDailyProgress = () => {
  const { state, dispatch } = useIntake();
  
  const logMeal = (mealName: string, nutrition: { calories: number; protein: number; carbs: number; fats: number }) => {
    // Create a daily log entry for today
    const today = new Date().toISOString().split('T')[0];
    
    // Check if we already have a log for today
    const existingLogIndex = state.dailyLogs.findIndex(log => log.date === today);
    
    if (existingLogIndex >= 0) {
      // Update existing log
      const updatedLog = { ...state.dailyLogs[existingLogIndex] };
      
      // Find if meal already exists in this log
      const mealIndex = updatedLog.meals.findIndex(m => m.meal === mealName);
      
      if (mealIndex >= 0) {
        // Update existing meal
        const updatedMeal = { ...updatedLog.meals[mealIndex] };
        // Add nutrition to existing meal
        updatedMeal.items.push({
          name: mealName,
          calories: nutrition.calories,
          protein: nutrition.protein,
          carbs: nutrition.carbs,
          fats: nutrition.fats
        });
        
        // Recalculate meal totals
        updatedMeal.totalCalories = updatedMeal.items.reduce((sum, item) => sum + (item.calories || 0), 0);
        updatedMeal.totalProtein = updatedMeal.items.reduce((sum, item) => sum + (item.protein || 0), 0);
        updatedMeal.totalCarbs = updatedMeal.items.reduce((sum, item) => sum + (item.carbs || 0), 0);
        updatedMeal.totalFats = updatedMeal.items.reduce((sum, item) => sum + (item.fats || 0), 0);
        
        // Update the meal in the log
        updatedLog.meals[mealIndex] = updatedMeal;
      } else {
        // Add new meal
        updatedLog.meals.push({
          meal: mealName,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          items: [{
            name: mealName,
            calories: nutrition.calories,
            protein: nutrition.protein,
            carbs: nutrition.carbs,
            fats: nutrition.fats
          }],
          totalCalories: nutrition.calories,
          totalProtein: nutrition.protein,
          totalCarbs: nutrition.carbs,
          totalFats: nutrition.fats
        });
      }
      
      // Update water intake and notes if needed (keeping existing)
      const updatedLogs = [...state.dailyLogs];
      updatedLogs[existingLogIndex] = updatedLog;
      dispatch({ type: 'SET_DAILY_LOGS', payload: updatedLogs });
    } else {
      // Create new log for today
      const newLog: DailyLog = {
        date: today,
        meals: [{
          meal: mealName,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          items: [{
            name: mealName,
            calories: nutrition.calories,
            protein: nutrition.protein,
            carbs: nutrition.carbs,
            fats: nutrition.fats
          }],
          totalCalories: nutrition.calories,
          totalProtein: nutrition.protein,
          totalCarbs: nutrition.carbs,
          totalFats: nutrition.fats
        }],
        waterIntake: 0,
        notes: ''
      };
      
      dispatch({ type: 'ADD_DAILY_LOG', payload: newLog });
    }
    
    // Update daily progress
    updateDailyProgress();
  };
  
  const updateDailyProgress = () => {
    if (!state.aiPlan) return;
    
    // Group logs by date
    const progressByDate: Record<string, DailyProgress> = {};
    
    state.dailyLogs.forEach(log => {
      const date = log.date;
      if (!progressByDate[date]) {
        progressByDate[date] = {
          date,
          caloriesConsumed: 0,
          proteinConsumed: 0,
          carbsConsumed: 0,
          fatsConsumed: 0,
          caloriesTarget: state.aiPlan.calorieTarget,
          proteinTarget: state.aiPlan.macros.protein.target,
          carbsTarget: state.aiPlan.macros.carbs.target,
          fatsTarget: state.aiPlan.macros.fats.target
        };
      }
      
      // Sum up nutrition from all meals in this log
      log.meals.forEach(meal => {
        progressByDate[date].caloriesConsumed += meal.totalCalories;
        progressByDate[date].proteinConsumed += meal.totalProtein || 0;
        progressByDate[date].carbsConsumed += meal.totalCarbs || 0;
        progressByDate[date].fatsConsumed += meal.totalFats || 0;
      });
    });
    
    // Convert to array and sort by date (newest first)
    const progressArray = Object.values(progressByDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    dispatch({ type: 'SET_DAILY_PROGRESS', payload: progressArray });
  };
  
  const setDailyProgress = (progress: DailyProgress[]) => {
    dispatch({ type: 'SET_DAILY_PROGRESS', payload: progress });
  };
  
  // Initialize daily progress from existing logs
  useEffect(() => {
    updateDailyProgress();
  }, [state.dailyLogs, state.aiPlan]);
  
  return {
    dailyProgress: state.dailyProgress,
    setDailyProgress,
    logMeal
  };
};