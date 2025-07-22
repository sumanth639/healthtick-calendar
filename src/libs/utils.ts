export const generateTimeSlots = (): Date[] => {
  const slots: Date[] = [];
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
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const getDayOfWeek = (date: Date): number => {
  return date.getDay();
};

export const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
