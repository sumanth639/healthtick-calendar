# Healthtick Calendar Booking App

This is a web application for managing calendar bookings, specifically designed for scheduling client calls. It provides a clear overview of time slots, allows booking new calls, and manages recurring appointments.

The application is built with React and utilizes Firebase Firestore for backend data storage, providing a real-time and scalable solution for managing appointments.

## Live Demo

You can access the live deployed version of the application here:
[https://healthtick-calendar.vercel.app/](https://healthtick-calendar.vercel.app/)

## Screenshots

![Calendar View](/calendar.png)
![Booking Modal](/book-call.png)

## Features

- **Time Slot Visualization:** Clearly displays available and occupied time slots.
- **Call Booking:** Allows booking new calls by selecting a time slot, client, and call type.
- **Client Management:** Integrates with a dummy client list for easy selection.
- **Recurring Appointments:** Supports booking of recurring follow-up calls.
- **Call Deletion:** Provides functionality to delete existing bookings.
- **Date Navigation:** Easy navigation between different days using "Previous" and "Next" buttons, as well as a date picker.
- **Responsive Design:** Adapts to various screen sizes (implied by TailwindCSS usage).

## Technologies Used

- **React:** Frontend JavaScript library for building user interfaces.
- **TypeScript:** Superset of JavaScript that adds static types.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Lucide React Icons:** A collection of beautiful and customizable open-source icons.
- **Firebase Firestore:** NoSQL cloud database for storing and syncing data in real-time.
- **Firebase SDK:** JavaScript SDK for interacting with Firebase services.
- **Vercel/Netlify (Deployment):** Platform for static sites and serverless functions.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-github-repo-url>
    cd healthtick-calendar-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Set up Firebase:** - Go to the [Firebase Console](https://console.firebase.google.com/). - Create a new Firebase project. - Register a web app and copy your Firebase configuration object. - Create a `.env.local` file in the root of your project and add your Firebase credentials:

    ```
    VITE_FIREBASE_API_KEY=your_api_key_here
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    MODE=development
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Firebase Structure

The application uses a single Firestore collection named `calls` to store all booking information. Each document within this collection represents a single call booking.

**Collection Name:** `calls`

**Example Document Structure (for a single call):**

```json
// Example: A regular consultation call
{
  "id": "auto-generated-firestore-doc-id-1",
  "clientId": 101,
  "clientName": "Alice Wonderland",
  "clientPhone": "123-456-7890",
  "type": "ONBOARDING", // Enum: 'ONBOARDING', 'FOLLOWUP'
  "time": "14:00",         // String in "HH:MM" format
  "date": "2025-07-22",    // String in "YYYY-MM-DD" format
  "isRecurring": false,    // Boolean
  "recurringDayOfWeek": null // Number (0 for Sunday, 6 for Saturday) if isRecurring is true, otherwise null
}

// Example: A recurring follow-up call
{
  "id": "auto-generated-firestore-doc-id-2",
  "clientId": 102,
  "clientName": "Bob The Builder",
  "clientPhone": "987-654-3210",
  "type": "FOLLOWUP",
  "time": "10:30",
  "date": "2025-07-20",     // This date signifies the *start date* for recurrence.
  "isRecurring": true,      // This spescify that this is a recurring appointment
  "recurringDayOfWeek": 0   // For example, 0 for Sunday (if first booking was on Sunday)
}
```
