// src/App.tsx
import Header from './components/Header';
import CalendarGrid from './components/CalendarGrid';
import BookingModal from './components/BookingModal';
import { CalendarProvider } from './context/CalendarContext';
import { useCalendar } from './hooks/useCalendar';

function CalendarApp() {
  const {
    selectedDate,
    setSelectedDate,
    calls,
    showBookingModal,
    setShowBookingModal,
    selectedSlot,
    selectedClient,
    setSelectedClient,
    selectedCallType,
    setSelectedCallType,
    searchTerm,
    setSearchTerm,
    filteredClients,
    navigateDate,
    isSlotOccupied,
    getCallForSlot,
    canBookSlot,
    handleSlotClick,
    handleBooking,
    handleDeleteCall,
    timeSlots,
  } = useCalendar();

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Header />

      <main className="max-w-6xl mx-auto p-6">
        <div className="bg-stone-900 rounded-xl p-6 mb-6 shadow-lg border border-stone-800">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigateDate(-1)}
              className="bg-stone-800 hover:bg-orange-600 hover:bg-opacity-20 rounded-lg px-4 py-2 transition-all duration-200 border border-stone-700 hover:border-orange-500"
            >
              ← Previous
            </button>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="bg-stone-800 text-stone-100 rounded-lg px-4 py-2 border border-stone-700 focus:border-orange-500 focus:outline-none"
            />
            <button
              onClick={() => navigateDate(1)}
              className="bg-stone-800 hover:bg-orange-600 hover:bg-opacity-20 rounded-lg px-4 py-2 transition-all duration-200 border border-stone-700 hover:border-orange-500"
            >
              Next →
            </button>
          </div>
          <h2 className="text-xl font-semibold text-orange-500">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h2>
        </div>

        <CalendarGrid
          timeSlots={timeSlots}
          selectedDate={selectedDate}
          calls={calls}
          isSlotOccupied={isSlotOccupied}
          getCallForSlot={getCallForSlot}
          handleSlotClick={handleSlotClick}
          handleDeleteCall={handleDeleteCall}
        />

        {showBookingModal && (
          <BookingModal
            selectedSlot={selectedSlot}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
            selectedCallType={selectedCallType}
            setSelectedCallType={setSelectedCallType}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredClients={filteredClients}
            handleBooking={handleBooking}
            setShowBookingModal={setShowBookingModal}
            canBookSlot={canBookSlot}
          />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <CalendarProvider>
      <CalendarApp />
    </CalendarProvider>
  );
}
