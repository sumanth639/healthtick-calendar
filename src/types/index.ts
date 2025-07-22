// src/types/index.ts

export interface Client {
  id: number;
  name: string;
  phone: string;
}

export type CallTypeKey = 'ONBOARDING' | 'FOLLOWUP';

export interface CallType {
  name: string;
  duration: number;
  color: string;
  recurring: boolean;
}

export interface Call {
  id: string; // Changed from 'number' to 'string' to match Firestore's doc.id
  clientId: number;
  clientName: string;
  clientPhone: string;
  type: CallTypeKey;
  time: string; // "HH:MM"
  date: string; // "YYYY-MM-DD"
  isRecurring?: boolean; // New: Optional field for recurring calls
  recurringDayOfWeek?: number | null; // New: Optional field for the day of week (0-6)
}

export interface CallsByDate {
  [date: string]: Call[];
}
