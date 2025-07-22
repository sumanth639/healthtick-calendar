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
  id: string;
  clientId: number;
  clientName: string;
  clientPhone: string;
  type: CallTypeKey;
  time: string;
  date: string;
  isRecurring?: boolean;
  recurringDayOfWeek?: number | null;
}

export interface CallsByDate {
  [date: string]: Call[];
}

export interface BookingModalProps {
  selectedSlot: Date | null;
  selectedClient: string;
  setSelectedClient: (clientId: string) => void;
  selectedCallType: CallTypeKey | '';
  setSelectedCallType: (callType: CallTypeKey | '') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredClients: Client[];
  handleBooking: () => void;
  setShowBookingModal: (show: boolean) => void;
  canBookSlot: (slotTime: Date | null, callType: CallTypeKey | '') => boolean;
}

export interface CalendarGridProps {
  timeSlots: Date[];
  selectedDate: Date;
  calls: CallsByDate;
  isSlotOccupied: (slotTime: Date) => boolean;
  getCallForSlot: (slotTime: Date) => Call | undefined;
  handleSlotClick: (slotTime: Date) => void;
  handleDeleteCall: (callToDelete: Call) => void;
}
