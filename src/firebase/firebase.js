import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  initializeAuth, 
  getReactNativePersistence 
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAas5i2BaLdvIR9--bZGQTcNERY1Lo8uFY",
  authDomain: "bouquet-project-data.firebaseapp.com",
  projectId: "bouquet-project-data",
  storageBucket: "bouquet-project-data.appspot.com",
  messagingSenderId: "1008601956624",
  appId: "1:1008601956624:web:7651e2d37e3226a4566595"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth with AsyncStorage for session persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth, db };
