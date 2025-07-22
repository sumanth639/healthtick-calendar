// src/contexts/calendarContextDefinition.ts
import { createContext } from 'react';
import type { Call, CallTypeKey, CallsByDate, Client } from '../types/index';

export interface CalendarContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  calls: CallsByDate;
  showBookingModal: boolean;
  setShowBookingModal: (show: boolean) => void;
  selectedSlot: Date | null;
  setSelectedSlot: (slot: Date | null) => void;
  selectedClient: string;
  setSelectedClient: (clientId: string) => void;
  selectedCallType: CallTypeKey | '';
  setSelectedCallType: (callType: CallTypeKey | '') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredClients: Client[];
  timeSlots: Date[];
  navigateDate: (direction: number) => void;
  isSlotOccupied: (slotTime: Date) => boolean;
  getCallForSlot: (slotTime: Date) => Call | undefined;
  canBookSlot: (slotTime: Date | null, callType: CallTypeKey | '') => boolean;
  handleSlotClick: (slotTime: Date) => void;
  handleBooking: () => Promise<void>;
  handleDeleteCall: (callToDelete: Call) => Promise<void>;
  getCallsForDate: (date: Date) => Call[];
}

export const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);
