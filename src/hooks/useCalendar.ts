// src/hooks/useCalendar.ts
import { useState, useEffect } from 'react';
import { DUMMY_CLIENTS, CALL_TYPES } from '../libs/constants';
import { getDateString, getDayOfWeek, generateTimeSlots } from '../libs/utils';
import {
  type Call,
  type CallTypeKey,
  type CallsByDate,
  type Client,
} from '../types/index';

// Import Firestore specific functions and collection reference
import {
  callsCollection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from '../libs/firebase';

export function useCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calls, setCalls] = useState<CallsByDate>({});
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [selectedCallType, setSelectedCallType] = useState<CallTypeKey | ''>(
    ''
  );
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredClients, setFilteredClients] =
    useState<Client[]>(DUMMY_CLIENTS);

  const timeSlots: Date[] = generateTimeSlots();

  // --- Firestore Data Fetching ---
  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const querySnapshot = await getDocs(callsCollection);
        const fetchedCalls: CallsByDate = {};
        querySnapshot.forEach((document) => {
          // Type assertion with 'as Call' is fine here because you know the structure.
          // The 'any' was coming from the destructuring in the line below.
          const callData = {
            id: document.id,
            ...document.data(),
          } as Call;

          // Initialize array if it doesn't exist
          if (!fetchedCalls[callData.date]) {
            fetchedCalls[callData.date] = [];
          }
          fetchedCalls[callData.date].push(callData);
        });
        setCalls(fetchedCalls);
      } catch (error) {
        console.error('Error fetching calls from Firestore:', error);
      }
    };

    fetchCalls();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredClients(
        DUMMY_CLIENTS.filter(
          (client: Client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.phone.includes(searchTerm)
        )
      );
    } else {
      setFilteredClients(DUMMY_CLIENTS);
    }
  }, [searchTerm]);

  const navigateDate = (direction: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const getCallsForDate = (date: Date): Call[] => {
    const dateString = getDateString(date);
    const dayOfWeek = getDayOfWeek(date); // 0 (Sunday) to 6 (Saturday)
    const result: Call[] = [];

    // 1. Get one-time calls for this specific date
    if (calls[dateString]) {
      result.push(...calls[dateString].filter((c) => c.type !== 'FOLLOWUP'));
    }

    // 2. Get recurring calls that fall on this day of week
    // Iterate through all values in the 'calls' object, then flatten the arrays
    Object.values(calls)
      .flat()
      .forEach((call: Call) => {
        // Explicitly check for isRecurring and recurringDayOfWeek properties,
        // as they are optional in the Call interface.
        // Also, use optional chaining and nullish coalescing if you expect them to sometimes be undefined.
        if (
          call.isRecurring === true && // Check if it's explicitly true
          call.recurringDayOfWeek === dayOfWeek && // Check if the recurring day matches
          new Date(call.date).setHours(0, 0, 0, 0) <= date.setHours(0, 0, 0, 0) // Ensure it started on or before selected date
        ) {
          // Prevent adding duplicate if a specific one-time call for the exact slot already exists
          if (
            !result.some(
              (existingCall) =>
                existingCall.time === call.time &&
                existingCall.clientId === call.clientId
            )
          ) {
            result.push(call);
          }
        }
      });

    result.sort((a, b) => a.time.localeCompare(b.time));

    return result;
  };

  const isSlotOccupied = (slotTime: Date): boolean => {
    const callsForDate = getCallsForDate(selectedDate);

    return callsForDate.some((call: Call) => {
      const callTime = new Date(`1970-01-01T${call.time}`);
      const callEndTime = new Date(callTime);
      callEndTime.setMinutes(
        callEndTime.getMinutes() + CALL_TYPES[call.type].duration
      );

      const slotEndTime = new Date(slotTime);
      slotEndTime.setMinutes(slotEndTime.getMinutes() + 20);

      const slotStart = slotTime.getHours() * 60 + slotTime.getMinutes();
      const slotEnd = slotEndTime.getHours() * 60 + slotEndTime.getMinutes();
      const callStart = callTime.getHours() * 60 + callTime.getMinutes(); // FIX: Changed 'callStartTime' to 'callTime'
      const callEnd = callEndTime.getHours() * 60 + callEndTime.getMinutes();

      return slotStart < callEnd && slotEnd > callStart;
    });
  };

  const getCallForSlot = (slotTime: Date): Call | undefined => {
    const callsForDate = getCallsForDate(selectedDate);
    return callsForDate.find((call: Call) => {
      const callTime = new Date(`1970-01-01T${call.time}`);
      return (
        callTime.getHours() === slotTime.getHours() &&
        callTime.getMinutes() === slotTime.getMinutes()
      );
    });
  };

  const canBookSlot = (
    slotTime: Date | null,
    callType: CallTypeKey | ''
  ): boolean => {
    if (!callType || slotTime === null) return false;

    const duration = CALL_TYPES[callType].duration;

    for (let i = 0; i < duration; i += 20) {
      const checkTime = new Date(slotTime);
      checkTime.setMinutes(checkTime.getMinutes() + i);

      if (isSlotOccupied(checkTime)) {
        return false;
      }
    }
    return true;
  };

  const handleSlotClick = (slotTime: Date) => {
    if (isSlotOccupied(slotTime)) {
      return;
    }

    setSelectedSlot(slotTime);
    setShowBookingModal(true);
    setSelectedClient('');
    setSelectedCallType('');
    setSearchTerm('');
  };

  const handleBooking = async () => {
    if (!selectedClient || !selectedCallType || selectedSlot === null) {
      alert('Please select a client, call type, and a valid slot.');
      return;
    }

    if (!canBookSlot(selectedSlot, selectedCallType)) {
      alert('This slot conflicts with existing bookings');
      return;
    }

    const client = DUMMY_CLIENTS.find((c) => c.id === parseInt(selectedClient));
    if (!client) {
      alert('Selected client not found.');
      return;
    }

    const dateString = getDateString(selectedDate);
    const isRecurring = selectedCallType === 'FOLLOWUP';

    const newCallData = {
      clientId: parseInt(selectedClient),
      clientName: client.name,
      clientPhone: client.phone,
      type: selectedCallType,
      time: selectedSlot.toTimeString().slice(0, 5),
      date: dateString,
      isRecurring: isRecurring,
      recurringDayOfWeek: isRecurring ? getDayOfWeek(selectedDate) : null,
    };

    try {
      const docRef = await addDoc(callsCollection, newCallData);
      console.log('Document written with ID:', docRef.id);

      // Create a Call object including the Firestore-generated ID
      // No 'as Call' needed here if newCallData already matches the structure
      // and id is added correctly.
      const newCall: Call = { ...newCallData, id: docRef.id };
      setCalls((prev) => ({
        ...prev,
        [dateString]: [...(prev[dateString] || []), newCall],
      }));

      setShowBookingModal(false);
      setSelectedSlot(null);
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('Failed to book call. Please try again.');
    }
  };

  const handleDeleteCall = async (callToDelete: Call) => {
    if (!callToDelete.id) {
      console.error('Call to delete has no ID:', callToDelete);
      alert('Cannot delete call: Missing ID.');
      return;
    }

    try {
      await deleteDoc(doc(callsCollection, callToDelete.id));
      console.log('Document successfully deleted:', callToDelete.id);

      const dateString = getDateString(selectedDate);
      setCalls((prev) => ({
        ...prev,
        [dateString]: (prev[dateString] || []).filter(
          (c: Call) => c.id !== callToDelete.id
        ),
      }));
    } catch (e) {
      console.error('Error deleting document: ', e);
      alert('Failed to delete call. Please try again.');
    }
  };

  return {
    selectedDate,
    setSelectedDate,
    calls,
    showBookingModal,
    setShowBookingModal,
    selectedSlot,
    setSelectedSlot,
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
  };
}
