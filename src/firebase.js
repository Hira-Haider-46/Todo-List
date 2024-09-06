import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "todo-list-2d587.firebaseapp.com",
  projectId: "todo-list-2d587",
  storageBucket: "todo-list-2d587.appspot.com",
  messagingSenderId: "361592135645",
  appId: "1:361592135645:web:20cc314087dc262ac1e034"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };