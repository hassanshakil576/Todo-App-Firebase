
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBPiSlouQ6oKU3jhVWoMLdX4HnCjArO2GA",
  authDomain: "todo-app-d738a.firebaseapp.com",
  projectId: "todo-app-d738a",
  storageBucket: "todo-app-d738a.firebasestorage.app",
  messagingSenderId: "18977700241",
  appId: "1:18977700241:web:74f9fc9bfcde27f9188230",
  measurementId: "G-1CK5PPNYPF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);