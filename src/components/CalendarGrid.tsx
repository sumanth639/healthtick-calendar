import { Clock, Plus, User, X } from 'lucide-react';
import { CALL_TYPES } from '../libs/constants';
import { formatTime } from '../libs/utils';
import { type CallTypeKey, type CalendarGridProps } from '../types';

export default function CalendarGrid({
  timeSlots,
  selectedDate,
  isSlotOccupied,
  getCallForSlot,
  handleSlotClick,
  handleDeleteCall,
}: CalendarGridProps) {
  const isSlotInPast = (slot: Date, date: Date): boolean => {
    const now = new Date();
    const slotDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      slot.getHours(),
      slot.getMinutes()
    );
    return slotDateTime < now;
  };

  const isDateInPast = (date: Date): boolean => {
    const today = new Date();
    const compareDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const compareToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return compareDate < compareToday;
  };

  return (
    <div className="bg-stone-900 rounded-xl p-6 shadow-lg border border-stone-800">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Time Slots (10:30 AM - 7:30 PM)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {timeSlots.map((slot, index) => {
          const occupied = isSlotOccupied(slot);
          const call = getCallForSlot(slot);
          const isPastSlot = isSlotInPast(slot, selectedDate);
          const isPastDate = isDateInPast(selectedDate);
          const isBookable = !occupied && !isPastSlot && !isPastDate;

          return (
            <div
              key={index}
              className={`
                relative p-3 rounded-lg border transition-all duration-200 
                h-32 flex flex-col
                ${
                  occupied
                    ? `${
                        CALL_TYPES[call?.type as CallTypeKey]?.color ||
                        'bg-stone-700'
                      } cursor-default shadow-md`
                    : isPastSlot || isPastDate
                    ? 'bg-stone-800 border-stone-600 cursor-not-allowed opacity-50'
                    : 'bg-stone-800 border-stone-700 hover:border-orange-500 cursor-pointer hover:bg-stone-750 hover:shadow-lg'
                }
              `}
              onClick={() => isBookable && handleSlotClick(slot)}
              title={
                isPastSlot || isPastDate
                  ? 'Cannot book past time slots'
                  : occupied
                  ? 'Slot already booked'
                  : 'Click to book'
              }
            >
              <div className="flex items-center justify-between mb-2 flex-shrink-0">
                <span
                  className={`font-mono text-sm font-bold ${
                    occupied
                      ? 'text-stone-900'
                      : isPastSlot || isPastDate
                      ? 'text-stone-500'
                      : 'text-orange-400'
                  }`}
                >
                  {formatTime(slot)}
                </span>

                {occupied && call ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCall(call);
                    }}
                    className="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-600/20 transition-colors flex-shrink-0"
                    title="Delete booking"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : isPastSlot || isPastDate ? (
                  <Clock className="h-4 w-4 text-stone-600 flex-shrink-0" />
                ) : (
                  <Plus className="h-4 w-4 text-stone-500 flex-shrink-0" />
                )}
              </div>

              <div className="flex-1 flex flex-col justify-center overflow-hidden">
                {occupied && call ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-stone-800 flex-shrink-0" />
                      <span className="font-medium text-stone-900 text-sm leading-tight truncate">
                        {call.clientName}
                      </span>
                    </div>

                    <div className="text-xs text-stone-800 font-medium truncate">
                      {CALL_TYPES[call.type as CallTypeKey].name}
                    </div>

                    <div className="text-xs text-stone-700 font-semibold">
                      {CALL_TYPES[call.type as CallTypeKey].duration} min
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-stone-500">
                    <div className="text-xs">
                      {occupied
                        ? 'Already Booked'
                        : isPastSlot || isPastDate
                        ? 'Past Time'
                        : 'Click to book'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
