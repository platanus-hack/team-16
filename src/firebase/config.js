import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBmgMgMTZwZWbWe-UU3hMyEUf7fPd7aA9w",
    authDomain: "scrapester-saas.firebaseapp.com",
    projectId: "scrapester-saas",
    storageBucket: "scrapester-saas.firebasestorage.app",
    messagingSenderId: "928617955779",
    appId: "1:928617955779:web:fd1ddd048057c9c0563d76",
    measurementId: "G-S874L34MZE"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);