import { X, Search, User, Phone } from 'lucide-react';
import { CALL_TYPES } from '../libs/constants';
import { formatTime } from '../libs/utils';
import { type CallTypeKey, type Client } from '../types'; // Import types

interface BookingModalProps {
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
  canBookSlot: (slotTime: Date | null, callType: CallTypeKey | '') => boolean; // Add type for canBookSlot
}

export default function BookingModal({
  selectedSlot,
  selectedClient,
  setSelectedClient,
  selectedCallType,
  setSelectedCallType,
  searchTerm,
  setSearchTerm,
  filteredClients,
  handleBooking,
  setShowBookingModal,
  canBookSlot,
}: BookingModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-stone-900 rounded-xl p-6 w-full max-w-md border border-stone-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Book Call</h3>
          <button
            onClick={() => setShowBookingModal(false)}
            className="text-stone-400 hover:text-stone-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Time Slot</label>
            <div className="bg-stone-800 rounded-lg p-3 border border-stone-700">
              {selectedSlot && formatTime(selectedSlot)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Call Type</label>
            <select
              value={selectedCallType}
              onChange={(e) =>
                setSelectedCallType(e.target.value as CallTypeKey | '')
              }
              className="w-full bg-stone-800 text-stone-100 rounded-lg px-3 py-2 border border-stone-700 focus:border-orange-500 focus:outline-none"
            >
              <option value="">Select call type</option>
              {Object.entries(CALL_TYPES).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.name} ({value.duration} min
                  {value.recurring ? ', recurring' : ''})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Client</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-stone-800 text-stone-100 rounded-lg pl-10 pr-3 py-2 border border-stone-700 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div className="mt-2 max-h-40 overflow-y-auto border border-stone-700 rounded-lg">
              {filteredClients.map((client: Client) => (
                <button
                  key={client.id}
                  onClick={() => {
                    setSelectedClient(client.id.toString());
                    setSearchTerm(client.name);
                  }}
                  className={`w-full text-left p-3 hover:bg-stone-800 transition-colors ${
                    selectedClient === client.id.toString()
                      ? 'bg-stone-800'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-stone-400" />
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-stone-400 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowBookingModal(false)}
              className="flex-1 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg px-4 py-2 transition-colors border border-stone-700"
            >
              Cancel
            </button>
            <button
              onClick={handleBooking}
              disabled={
                !selectedClient ||
                !selectedCallType ||
                !canBookSlot(selectedSlot, selectedCallType)
              }
              className="flex-1 bg-orange-600 hover:bg-orange-500 disabled:bg-stone-700 disabled:text-stone-500 text-white rounded-lg px-4 py-2 transition-colors disabled:cursor-not-allowed"
            >
              Book Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
