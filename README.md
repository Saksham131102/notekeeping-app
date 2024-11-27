# Notekeeping Application
A feature-rich and user-friendly note-keeping app inspired by Google Keep. This app allows users to create, manage, and organize notes effortlessly with features like pinning, pagination, and a modern UI.

## Features
- **Create Notes:** Add new notes with titles and content.
- **Pinning:** Pin important notes to keep them prioritized.
- **Pagination:** Navigate through notes efficiently with a paginated view.
- **Searching:** Find your notes quickly.
- **Firebase Integration:** Securely store and fetch notes using Firebase Firestore.
- **Responsive Design:** Fully responsive and optimized for all devices.

## Technologies Used

### Frontend
- **React.js with Next.js:** For building a modern and efficient user interface.
- **Tailwind CSS:** For styling the application with a clean and consistent design.
- **React Context API:** For managing state across components.
- **Shadcn Components:** For reusable and customizable UI components.
- **React Toastify:** For notifications and alerts.

### Backend
- **Firebase Firestore:** For database storage and real-time synchronization.

## Installation and Setup

### Prerequisites
- Node.js installed on your machine.
- Firebase account and project setup.

### Steps

1.	Clone the repository:

```bash
git clone <repository-url>
cd notekeeping-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory and add your Firebase configuration:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

4. Start the development server:
```bash
npm run dev
```

5. Open the app in your browser at [http://localhost:3000](http://localhost:3000)

## Usage
1.	**Add Notes:** Click on the “Add Note” button to create a new note.
2.	**Pin Notes:** Use the pin icon to pin important notes.
3.	**Edit Notes:** Open a note and edit its title, content, or pin status.
4.	**Pagination:** Navigate through pages of notes seamlessly.
5.	**Search Notes** Use the search bar to find your notes quickly.

## Screenshots
1. Homepage
<img src="https://raw.githubusercontent.com/Saksham131102/Images/refs/heads/main/notekeeping-homepage.png">
2. Create new note
<img src="https://raw.githubusercontent.com/Saksham131102/Images/refs/heads/main/notekeeping-new-note.png">
3. Edit the note
<img src="https://raw.githubusercontent.com/Saksham131102/Images/refs/heads/main/notekeeping-edit-note.png">
