import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtmPsrL9XkfTXGyHItsEq2Ghw8oxH1VPA",
  authDomain: "acm-club-event-management.firebaseapp.com",
  projectId: "acm-club-event-management",
  storageBucket: "acm-club-event-management.firebasestorage.app",
  messagingSenderId: "148376233813",
  appId: "1:148376233813:web:d7c6edd49260fe357c71dc"
};

const app = initializeApp(firebaseConfig);

// Export Auth
export const auth = getAuth(app);

// Export Firestore
export const db = getFirestore(app);  