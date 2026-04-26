'use client';

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { 
  IntakeData, 
  AiPlan, 
  DailyLog, 
  DailyProgress,
  LOCAL_STORAGE_KEYS
} from '@/app/lib/types';

interface IntakeState {
  intakeData: IntakeData | null;
  aiPlan: AiPlan | null;
  dailyLogs: DailyLog[];
  dailyProgress: DailyProgress[];
  loading: boolean;
  error: string | null;
}

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

const getInitialState = (): IntakeState => {
  if (typeof window === 'undefined') {
    return {
      intakeData: null,
      aiPlan: null,
      dailyLogs: [],
      dailyProgress: [],
      loading: false,
      error: null,
    };
  }
  
  try {
    const intakeData = localStorage.getItem(LOCAL_STORAGE_KEYS.INTAKE_DATA);
    const aiPlan = localStorage.getItem(LOCAL_STORAGE_KEYS.AI_PLAN);
    const dailyLogs = localStorage.getItem(LOCAL_STORAGE_KEYS.DAILY_LOGS);

    return {
      intakeData: intakeData ? JSON.parse(intakeData) : null,
      aiPlan: aiPlan ? JSON.parse(aiPlan) : null,
      dailyLogs: dailyLogs ? JSON.parse(dailyLogs) : [],
      dailyProgress: [],
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
      return {
        ...state,
        dailyLogs: [...state.dailyLogs, action.payload],
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
      return {
        ...state,
        dailyProgress: [...state.dailyProgress, action.payload],
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
      if (typeof window !== 'undefined') {
        Object.values(LOCAL_STORAGE_KEYS).forEach(key => {
          localStorage.removeItem(key);
        });
      }
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

interface IntakeContextValue {
  state: IntakeState;
  dispatch: React.Dispatch<IntakeAction>;
  setIntakeData: (data: IntakeData) => void;
  setAiPlan: (plan: AiPlan) => void;
  clearAll: () => void;
}

const IntakeContext = createContext<IntakeContextValue | undefined>(undefined);

export const IntakeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(intakeReducer, null, getInitialState);

  const setIntakeData = useCallback((data: IntakeData) => {
    dispatch({ type: 'SET_INTAKE_DATA', payload: data });
  }, []);

  const setAiPlan = useCallback((plan: AiPlan) => {
    dispatch({ type: 'SET_AI_PLAN', payload: plan });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      if (state.intakeData) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.INTAKE_DATA, JSON.stringify(state.intakeData));
      }
      if (state.aiPlan) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.AI_PLAN, JSON.stringify(state.aiPlan));
      }
      if (state.dailyLogs.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.DAILY_LOGS, JSON.stringify(state.dailyLogs));
      }
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [state.intakeData, state.aiPlan, state.dailyLogs]);

  const value: IntakeContextValue = {
    state,
    dispatch,
    setIntakeData,
    setAiPlan,
    clearAll,
  };

  return (
    <IntakeContext.Provider value={value}>
      {children}
    </IntakeContext.Provider>
  );
};

export const useIntake = () => {
  const context = useContext(IntakeContext);
  if (!context) {
    throw new Error('useIntake must be used within an IntakeProvider');
  }
  return context;
};

export const useDailyProgress = () => {
  const { state, dispatch } = useIntake();
  
  const logMeal = useCallback((mealName: string, nutrition: { calories: number; protein: number; carbs: number; fats: number }) => {
    const today = new Date().toISOString().split('T')[0];
    const existingLogIndex = state.dailyLogs.findIndex(log => log.date === today);
    
    if (existingLogIndex >= 0) {
      const updatedLogs = [...state.dailyLogs];
      const updatedLog = { ...updatedLogs[existingLogIndex] };
      
      const mealIndex = updatedLog.meals.findIndex(m => m.meal === mealName);
      
      if (mealIndex >= 0) {
        const updatedMeal = { ...updatedLog.meals[mealIndex] };
        updatedMeal.items.push({
          name: mealName,
          calories: nutrition.calories,
          protein: nutrition.protein,
          carbs: nutrition.carbs,
          fats: nutrition.fats
        });
        
        updatedMeal.totalCalories = updatedMeal.items.reduce((sum, item) => sum + (item.calories || 0), 0);
        updatedMeal.totalProtein = updatedMeal.items.reduce((sum, item) => sum + (item.protein || 0), 0);
        updatedMeal.totalCarbs = updatedMeal.items.reduce((sum, item) => sum + (item.carbs || 0), 0);
        updatedMeal.totalFats = updatedMeal.items.reduce((sum, item) => sum + (item.fats || 0), 0);
        
        updatedLog.meals[mealIndex] = updatedMeal;
      } else {
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
      
      updatedLogs[existingLogIndex] = updatedLog;
      dispatch({ type: 'SET_DAILY_LOGS', payload: updatedLogs });
    } else {
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
  }, [state.dailyLogs, dispatch]);
  
  const updateDailyProgress = useCallback(() => {
    if (!state.aiPlan) return;
    
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
      
      log.meals.forEach(meal => {
        progressByDate[date].caloriesConsumed += meal.totalCalories;
        progressByDate[date].proteinConsumed += meal.totalProtein || 0;
        progressByDate[date].carbsConsumed += meal.totalCarbs || 0;
        progressByDate[date].fatsConsumed += meal.totalFats || 0;
      });
    });
    
    const progressArray = Object.values(progressByDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    dispatch({ type: 'SET_DAILY_PROGRESS', payload: progressArray });
  }, [state.dailyLogs, state.aiPlan, dispatch]);
  
  const setDailyProgress = useCallback((progress: DailyProgress[]) => {
    dispatch({ type: 'SET_DAILY_PROGRESS', payload: progress });
  }, [dispatch]);
  
  useEffect(() => {
    updateDailyProgress();
  }, [updateDailyProgress]);
  
  return {
    dailyProgress: state.dailyProgress,
    setDailyProgress,
    logMeal
  };
};