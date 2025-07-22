// src/libs/utils.ts

// Generate time slots from 10:30 AM to 7:30 PM (20-minute intervals)
export const generateTimeSlots = (): Date[] => {
  // Explicitly state that it returns an array of Date objects
  const slots: Date[] = []; // Initialize slots as an array of Date objects
  const currentTime = new Date();
  currentTime.setHours(10, 30, 0, 0);

  const endTime = new Date();
  endTime.setHours(19, 30, 0, 0);

  while (currentTime < endTime) {
    slots.push(new Date(currentTime));
    currentTime.setMinutes(currentTime.getMinutes() + 20);
  }
  return slots;
};

export const formatTime = (date: Date): string => {
  // 'date' parameter is a Date object, returns a string
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDate = (date: Date): string => {
  // 'date' parameter is a Date object, returns a string
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getDateString = (date: Date): string => {
  // 'date' parameter is a Date object, returns a string
  return date.toISOString().split('T')[0];
};

export const getDayOfWeek = (date: Date): number => {
  // 'date' parameter is a Date object, returns a number
  return date.getDay(); // 0 = Sunday, 1 = Monday, etc.
};
