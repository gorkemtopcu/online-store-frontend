import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AlzaSyAeAQ0QU756xp7JfGYEyo5b8EGASbMWeNE",
  authDomain: "cs308-onlinestore.firebaseapp.com",
  projectId: "cs308-onlinestore",
  storageBucket: "cs308-onlinestore.appspot.com",
  messagingSenderId: "741652565941",
  appId: "1:741652565941:web:a7700e36cd859af8c013fc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
