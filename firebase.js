import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRTlgt_WwkQM76JR_ksy2euZ-Y8f4Jhf0",
  authDomain: "sharecircle-a18c7.firebaseapp.com",
  projectId: "sharecircle-a18c7",
  storageBucket: "sharecircle-a18c7.firebasestorage.app",
  messagingSenderId: "133755997960",
  appId: "1:133755997960:web:62c031d55436403cbea6bd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);