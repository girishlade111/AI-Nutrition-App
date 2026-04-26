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