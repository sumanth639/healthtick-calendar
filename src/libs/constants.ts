// src/lib/constants.js
export const DUMMY_CLIENTS = [
  { id: 1, name: 'Rahul Sharma', phone: '+91 98765 43210' },
  { id: 2, name: 'Priya Patel', phone: '+91 87654 32109' },
  { id: 3, name: 'Sriram Kumar', phone: '+91 76543 21098' },
  { id: 4, name: 'Shilpa Reddy', phone: '+91 65432 10987' },
  { id: 5, name: 'Arjun Singh', phone: '+91 54321 09876' },
  { id: 6, name: 'Kavya Nair', phone: '+91 43210 98765' },
  { id: 7, name: 'Vikram Gupta', phone: '+91 32109 87654' },
  { id: 8, name: 'Meera Joshi', phone: '+91 21098 76543' },
  { id: 9, name: 'Rohan Agarwal', phone: '+91 10987 65432' },
  { id: 10, name: 'Sneha Iyer', phone: '+91 09876 54321' },
  { id: 11, name: 'Karthik Menon', phone: '+91 98765 43211' },
  { id: 12, name: 'Deepika Roy', phone: '+91 87654 32110' },
  { id: 13, name: 'Ankit Verma', phone: '+91 76543 21099' },
  { id: 14, name: 'Ritu Bhatt', phone: '+91 65432 10988' },
  { id: 15, name: 'Suresh Pillai', phone: '+91 54321 09877' },
  { id: 16, name: 'Nisha Tiwari', phone: '+91 43210 98766' },
  { id: 17, name: 'Harsh Malhotra', phone: '+91 32109 87655' },
  { id: 18, name: 'Pooja Sinha', phone: '+91 21098 76544' },
  { id: 19, name: 'Amit Chopra', phone: '+91 10987 65433' },
  { id: 20, name: 'Divya Khanna', phone: '+91 09876 54322' },
];

export const CALL_TYPES = {
  ONBOARDING: {
    name: 'Onboarding Call',
    duration: 40,
    color: 'bg-amber-400',
    recurring: false,
  },
  FOLLOWUP: {
    name: 'Follow-up Call',
    duration: 20,
    color: 'bg-amber-200',
    recurring: true,
  },
};
