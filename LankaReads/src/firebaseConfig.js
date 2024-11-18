// src/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'; // Import Firebase storage

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh2_yENKqPWdKnTogdG6cMYzTg7ZkkLcw",
  authDomain: "lankareads-9ae56.firebaseapp.com",
  projectId: "lankareads-9ae56",
  storageBucket: "lankareads-9ae56.appspot.com",
  messagingSenderId: "1085146122075",
  appId: "1:1085146122075:web:32cc3ab7b6b635381dbc7e",
  measurementId: "G-2PLE56X8BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage and export it
const storage = getStorage(app);

export { storage };
