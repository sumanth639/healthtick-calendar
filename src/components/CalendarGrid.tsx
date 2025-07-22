import { Clock, Plus, User, X } from 'lucide-react';
import { CALL_TYPES } from '../libs/constants'; // Adjust path if needed
import { formatTime } from '../libs/utils'; // Adjust path if needed
import { type Call, type CallTypeKey, type CallsByDate } from '../types'; // Import types

interface CalendarGridProps {
  timeSlots: Date[];
  selectedDate: Date;
  calls: CallsByDate; // Type calls as CallsByDate
  isSlotOccupied: (slotTime: Date) => boolean;
  getCallForSlot: (slotTime: Date) => Call | undefined;
  handleSlotClick: (slotTime: Date) => void;
  handleDeleteCall: (callToDelete: Call) => void;
}

export default function CalendarGrid({
  timeSlots,

  isSlotOccupied,
  getCallForSlot,
  handleSlotClick,
  handleDeleteCall,
}: CalendarGridProps) {
  return (
    <div className="bg-stone-900 rounded-xl p-6 shadow-lg border border-stone-800">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Time Slots (10:30 AM - 7:30 PM)
      </h3>

      <div className="grid gap-2">
        {timeSlots.map((slot, index) => {
          const occupied = isSlotOccupied(slot);
          const call = getCallForSlot(slot);

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                occupied
                  ? `${
                      CALL_TYPES[call?.type as CallTypeKey]?.color ||
                      'bg-stone-700'
                    } cursor-default`
                  : 'bg-stone-800 border-stone-700 hover:border-orange-500 cursor-pointer hover:bg-stone-750'
              }`}
              onClick={() => !occupied && handleSlotClick(slot)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-medium">
                    {formatTime(slot)}
                  </span>
                  {occupied && call && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{call.clientName}</span>
                      <span className="text-sm text-stone-300">
                        ({CALL_TYPES[call.type as CallTypeKey].name})
                      </span>
                    </div>
                  )}
                </div>

                {occupied && call ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCall(call);
                    }}
                    className="text-red-400 hover:text-red-300 p-1 rounded"
                    title="Delete booking"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : (
                  <Plus className="h-4 w-4 text-stone-500" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
