import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeoOW27wsRxUr4mBZX_GUoxRAFX2OvyWU",
  authDomain: "ai-powerd-student-assistent.firebaseapp.com",
  projectId: "ai-powerd-student-assistent",
  storageBucket: "ai-powerd-student-assistent.firebasestorage.app",
  messagingSenderId: "762656679987",
  appId: "1:762656679987:web:5f3fe0e1df54a88d369b46",
  measurementId: "G-79Y3FGJEY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
