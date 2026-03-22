// src/js/firebase-config.js
// =============================================
// STEP 1: Go to https://console.firebase.google.com
// STEP 2: Create a new project called "sharecircle"
// STEP 3: Enable Authentication > Email/Password
// STEP 4: Create Firestore Database (start in test mode)
// STEP 5: Go to Project Settings > Your Apps > Web App
// STEP 6: Copy your config and replace the values below
// =============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);