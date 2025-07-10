// firebase-config.js

// Firebase v9+ using compat libraries for use with plain HTML
const firebaseConfig = {
  apiKey: "AIzaSyCTNYbgFCM8MZ-Z5rpxk8sAXMPGrFq-9Ns",
authDomain: "kampala-air-quality.firebaseapp.com",
  projectId: "kampala-air-quality",
storageBucket: "kampala-air-quality.firebasestorage.app",
  messagingSenderId: "743579984315",
  appId: "1:743579984315:web:09ad6997da10d4bf81e49e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Auth reference (used in login/signup)
const auth = firebase.auth();
