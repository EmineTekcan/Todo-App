import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCdR4DsFxA3gFEuUprNnh9nAiHapgj9NQg",
    authDomain: "todoapp-2a7f3.firebaseapp.com",
    projectId: "todoapp-2a7f3",
    storageBucket: "todoapp-2a7f3.appspot.com",
    messagingSenderId: "691025564299",
    appId: "1:691025564299:web:9260c7fafdcfcedb6fba8e"
  };

export default firebase_app = initializeApp(firebaseConfig);