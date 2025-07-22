import { useContext } from 'react';
import {
  CalendarContext,
  type CalendarContextType,
} from '../context/calendarContextDefinition';

export function useCalendar(): CalendarContextType {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}
